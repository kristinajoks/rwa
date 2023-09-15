import { createGameLayout, draw} from "./view/initialView";
import { fromEvent, filter, tap, map, distinctUntilChanged, scan, interval, combineLatest, Subject, BehaviorSubject, switchMap, takeUntil, pluck, merge, of } from "rxjs";
import { mapTo, merge as mergeOperator } from "rxjs/operators";
import { Snake } from "./models/snake";
import { getFruit, getVegetable } from "./observables/apiservice";

var snake = new Snake();

let canvas : HTMLCanvasElement;
let slider : HTMLInputElement;
let csImg : HTMLImageElement;
let startButton : HTMLButtonElement;
let csSpan : HTMLSpanElement;
let bsSpan : HTMLSpanElement;
let showResultsButton : HTMLButtonElement;
let resultsSection : HTMLDivElement;
let shapeRadioButtons : NodeListOf<HTMLInputElement>;
let foodRadioButtons : NodeListOf<HTMLInputElement>;
let fruitDiv : HTMLDivElement;
let vegetableDiv : HTMLDivElement;
let fruitCheckboxes : NodeListOf<HTMLInputElement>;
let vegetableCheckboxes : NodeListOf<HTMLInputElement>;

createGameLayout(document.body).pipe(
    tap((x) => {
        shapeRadioButtons = document.querySelectorAll('input[name="shapes"]'); 
        foodRadioButtons = document.querySelectorAll('input[name="food"]'); 
        fruitDiv = document.getElementById('fruitDiv') as HTMLDivElement;
        vegetableDiv = document.getElementById('vegetableDiv') as HTMLDivElement;
        fruitCheckboxes = document.querySelectorAll('input[name="fruit"]'); 
        vegetableCheckboxes = document.querySelectorAll('input[name="vegetable"]'); 
        
        slider = document.getElementById('slider') as HTMLInputElement; 
        canvas = document.getElementById('game-canvas') as HTMLCanvasElement;
        csImg = document.getElementById('cs-img') as HTMLImageElement;

        //observing settings

        const slider$ = fromEvent(slider, 'input')
        .pipe(
            pluck('target', 'value'),
            tap((sliderValue : number) => {
                const sliderVal = document.getElementById('sliderValue') as HTMLSpanElement;
                sliderVal.innerText = sliderValue.toString();

                snake.setDimension(sliderValue);
            })
        ) 

        const shape$ = fromEvent(shapeRadioButtons, 'change')
        .pipe(
            pluck('target', 'value'),
            tap((selectedShape : string) => {
                snake.setShape(selectedShape);    
            })
        )

        const food$ = fromEvent(foodRadioButtons, 'change')
        .pipe(
            pluck('target', 'value'),
            tap((selectedFood : string) => {
                snake.setFoodType(selectedFood);
                snake.clearFood();

                if(selectedFood === 'fruit'){
                    fruitDiv.style.display = 'flex';
                    vegetableDiv.style.display = 'none'; 

                    csImg.src = 'src\\assets\\apple.png';
                }
                else{
                    fruitDiv.style.display = 'none';
                    vegetableDiv.style.display = 'flex';
                    
                    csImg.src = 'src\\assets\\carrot.png';
                }
            })
        )

        const fruitCheckboxes$ = fromEvent(fruitCheckboxes, 'change') 
        .pipe(
            pluck('target', 'value')            
        )

        const vegetableCheckboxes$ = fromEvent(vegetableCheckboxes, 'change')
        .pipe(
            pluck('target', 'value')
        )

        const fruitVeg$ = fruitCheckboxes$.pipe(
            mergeOperator(vegetableCheckboxes$),
            tap((checkedFood : string) => {
                if(snake.getFood().some(f => f.type === checkedFood)){ 
                    snake.removeFood(checkedFood);
                }
            }),
            switchMap((checkedFood) => {
                if(snake.getFoodType() == 'fruit'){
                    return getFruit(checkedFood).pipe(
                        tap((fruit) => {
                            snake.addFood(fruit);
                        })
                    );
                }
                else{
                    return getVegetable(checkedFood).pipe(
                        tap((vegetable) => {
                            snake.addFood(vegetable);
                        })
                    );
                }
            })            
        );


       const draw$ = merge(
            slider$,
            shape$,
            food$,
            fruitVeg$
        )
        .subscribe(() => {            
            draw(canvas, slider.value as unknown as number, snake, true);
        });
    })
).subscribe();


//logika pomeranja zmije

const gameControlFlow = new Subject();
var currentPoints = new Subject();
var currentPoints$ = currentPoints.asObservable();

const restartGameSignal = new Subject();

var bestScore = new BehaviorSubject(0);
var bestScore$ = bestScore.asObservable();

const keyDown$ = fromEvent<KeyboardEvent>(document, 'keydown').pipe(
    map((event) => event.key),
    distinctUntilChanged()
  )

const interval$ = interval(600);
const snakeMovement$ = combineLatest([keyDown$, interval$]).pipe(
    map(([key, interval]) => key),
    takeUntil(gameControlFlow)
)

startButton = document.getElementById('start-button') as HTMLButtonElement;

const start$ = fromEvent(startButton, 'click').pipe(
    tap( () => {
        disableControls();
    }),
    switchMap(() => snakeMovement$)
).subscribe( 
    (key) => {
        if(key === 'ArrowUp' && snake.getDirection() !== 'down'){
            snake.changeDirection('up');
        }
        else if(key === 'ArrowDown' && snake.getDirection() !== 'up'){
            snake.changeDirection('down');
        }
        else if(key === 'ArrowLeft' && snake.getDirection() !== 'right'){
            snake.changeDirection('left');
        }
        else if(key === 'ArrowRight' && snake.getDirection() !== 'left'){
            snake.changeDirection('right');
        }

        gameLoop();
    }
);

//prikazivanje rezultata

showResultsButton = document.getElementById('show-results-button') as HTMLButtonElement;
const showResults$ = fromEvent(showResultsButton, 'click').pipe(
    tap(() => {
        resultsSection = document.getElementById('results-section') as HTMLDivElement;
        resultsSection.style.display = resultsSection.style.display === 'none' ? 'block' : 'none';
    })
).subscribe();


let currentScore = 0;
let currentMaxScore = 0;

function gameLoop(){
    const {eaten, collided} = snake.move(canvas);
        
    currentPoints.next(eaten);

    csSpan = document.getElementById('current-score-value') as HTMLSpanElement;
    currentScore = parseInt(csSpan.innerText);

    shapeRadioButtons = document.querySelectorAll('input[name="shapes"]'); 
    foodRadioButtons = document.querySelectorAll('input[name="food"]'); 
    fruitDiv = document.getElementById('fruitDiv') as HTMLDivElement;
    vegetableDiv = document.getElementById('vegetableDiv') as HTMLDivElement;
    fruitCheckboxes = document.querySelectorAll('input[name="fruit"]'); 
    vegetableCheckboxes = document.querySelectorAll('input[name="vegetable"]'); 


    if(collided){
        alert('GAME OVER');
        gameControlFlow.next(null);

        //prvo se posalje vrednost, a zatim gasi tok
        bestScore.next(currentScore);
        
        restartGameSignal.next(null); 

        snake = new Snake();
        snake.setDimension(slider.value as unknown as number);

        enableControls();
        
        draw(canvas, slider.value as unknown as number, snake, true); 
    }
    else{
        draw(canvas, slider.value as unknown as number, snake, eaten);
    }
}

const points$ = currentPoints$.pipe(
    filter((eaten) => eaten == true),
    mapTo(1)
);

const resetCurrentPoints$ = restartGameSignal.pipe(
    switchMap(() => of(0))
);

const mergedPoints$ = merge(
    points$,
    resetCurrentPoints$
).pipe(
    scan((acc, curr) => (curr === 0 ? curr: acc + curr), 0)
);

const subForPoints = mergedPoints$.subscribe((points) => {
    currentScore = points; 

    csSpan = document.getElementById('current-score-value') as HTMLSpanElement;
    csSpan.innerText = points.toString();
});

const subForBest = bestScore$.pipe(
    filter((bestScore) => bestScore > currentMaxScore)
).subscribe((bestScore) => {
    currentMaxScore = bestScore;

    bsSpan = document.getElementById('best-score-value') as HTMLSpanElement;
    bsSpan.innerText = bestScore.toString();
});


function disableControls() { 
    startButton.disabled = true;

    slider.disabled = true;

    shapeRadioButtons.forEach((shape) => {
        shape.disabled = true;
    });

    foodRadioButtons.forEach((food) => {
        food.disabled = true;
    });

    fruitCheckboxes.forEach((fruit) => {
        fruit.disabled = true;
    });

    vegetableCheckboxes.forEach((vegetable) => {
        vegetable.disabled = true;
    });
}

function enableControls(){
    startButton.disabled = false;

    slider.disabled = false;

    shapeRadioButtons.forEach((shape) => {
        shape.disabled = false;
        shape.checked = false;
    });

    foodRadioButtons.forEach((food) => {
        food.disabled = false;
        food.checked = false;
    });

    fruitCheckboxes.forEach((fruit) => {
        fruit.disabled = false;
        fruit.checked = false;
    });

    vegetableCheckboxes.forEach((vegetable) => {
        vegetable.disabled = false;
        vegetable.checked = false;
    });

    shapeRadioButtons[0].checked = true;

    vegetableDiv.style.display = 'none';
    fruitDiv.style.display = 'none';
}