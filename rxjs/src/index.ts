import { createGameLayout, draw} from "./view/initialView";
import { fromEvent, filter, tap, map, distinctUntilChanged, scan, interval, combineLatest, Subject, BehaviorSubject, switchMap, takeUntil, pluck, merge } from "rxjs";
import { merge as mergeOperator } from "rxjs/operators";
import { Snake } from "./models/snake";
import { getFruit, getVegetable } from "./observables/apiservice";

var snake = new Snake();
let slv;

createGameLayout(document.body).pipe(
    tap((x) => {

        const slider = document.getElementById('slider') as HTMLInputElement; 
        const shapeRadioButtons = document.querySelectorAll('input[name="shapes"]'); 
        const foodRadioButtons = document.querySelectorAll('input[name="food"]'); 

        const fruitDiv = document.getElementById('fruitDiv') as HTMLDivElement;
        const vegetableDiv = document.getElementById('vegetableDiv') as HTMLDivElement;
        const fruitCheckboxes = document.querySelectorAll('input[name="fruit"]'); 
        const vegetableCheckboxes = document.querySelectorAll('input[name="vegetable"]'); 

        const canvas = document.getElementById('game-canvas') as HTMLCanvasElement;

        //observing settings

        const slider$ = fromEvent(slider, 'input')
        .pipe(
            pluck('target', 'value'),
            tap((sliderValue : number) => {
                const sliderVal = document.getElementById('sliderValue') as HTMLSpanElement;
                sliderVal.innerText = sliderValue.toString();
                console.log("izmenjena vrednost slider");

                snake.setDimension(sliderValue);
            })
        ) 

        const shape$ = fromEvent(shapeRadioButtons, 'change')
        .pipe(
            pluck('target', 'value'),
            tap((selectedShape : string) => {
                console.log("izmenjena vrednost shape");

                snake.setShape(selectedShape);    
            })
        )

        const food$ = fromEvent(foodRadioButtons, 'change')
        .pipe(
            pluck('target', 'value'),
            tap((selectedFood : string) => {
                console.log("izmenjena vrednost food");

                snake.setFoodType(selectedFood);
                snake.clearFood();

                if(selectedFood === 'fruit'){
                    fruitDiv.style.display = 'flex';
                    vegetableDiv.style.display = 'none'; 
                }
                else{
                    fruitDiv.style.display = 'none';
                    vegetableDiv.style.display = 'flex'; 
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
                console.log("izmenjena vrednost fruit/vegetable");

                if(snake.getFood().some(f => f.type === checkedFood)){
                    snake.removeFood(checkedFood);
                }
                else{
                    if(snake.getFoodType() === 'fruit'){
                        getFruit(checkedFood).subscribe((fruit) => {
                            snake.addFood(fruit);
                        });
                    }
                    else{
                        getVegetable(checkedFood).subscribe((vegetable) => {
                            snake.addFood(vegetable);
                        });
                    }
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

const canvas = document.getElementById('game-canvas') as HTMLCanvasElement;
const slider = document.getElementById('slider') as HTMLInputElement;


console.log(snake.getDimension());

const gameControlFlow = new Subject();

const keyDown$ = fromEvent<KeyboardEvent>(document, 'keydown').pipe(
    map((event) => event.key),
    distinctUntilChanged()
    // takeUntil(gameControlFlow) 
  )

const interval$ = interval(600);
const snakeMovement$ = combineLatest([keyDown$, interval$]).pipe(
    map(([key, interval]) => key),
    takeUntil(gameControlFlow)
)


const startButton = document.getElementById('start-button') as HTMLButtonElement;

//na klik dugmeta pocinje osluskivanje tastature
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

        const {eaten, collided} = snake.move(canvas);

        if(collided){
            alert('game over');
            gameControlFlow.next(null);

            enableControls();

            snake = new Snake();
            draw(canvas, slider.value as unknown as number, snake, true); 
        }
        else{
            //ako se nije sudarila, proveri da li je pojedena hrana, ako jeste onda se salje signal da se crta voce
            draw(canvas, slider.value as unknown as number, snake, eaten);
        }

        //NE STAJE NA GRANICI CANVASA I VOCE NESTAJE CIM SE POMERI ZMIJA


        // if(snake.checkCollision(canvas)){
        //     //mogu da izmenim snake move da proveri koliziju prvo i da vraca true ili false i onda ovde da izmenim to
        //     //a u move kad se proverava kolizija taman da se proveri da li je sudar sa telom pre nego sto se pomeri
        //     //i u snake da dodam metodu koja proverava da li je nextPosition pozicija currentFood, pa ako jeste
        //     //da se ne brise rep nego da se samo doda novi element na kraj niza i da se nekako oznaci da je pojedeno voce,
        //     //npr ili polje u klasi kao eaten pa da se ono prosledi i na osnovu njega u draw fji zove drawFood 
        //     //ili da postoji neki observable koji ce da prati da li je se voce jede
            
        //     alert('game over');
        //     gameControlFlow.next(null);

        //     enableControls();

        //     snake = new Snake();
        //     draw(canvas, slider.value as unknown as number, snake); 
        // }
        // else{
        //     snake.move(canvas);
        //     // console.log(snake.getBody());
        //     draw(canvas, slider.value as unknown as number, snake); //podesiti da se ne crta voce ako nije pojedeno

        //     // console.log(snake.getCurrentFood());
        // }
    }
);


//za sada duplirani kod za preuzimanje elemenata ali isprobacu kasnije da ih podignem na vrh i izbacim def iz prvog obs
const shapeRadioButtons = document.querySelectorAll('input[name="shapes"]') as unknown as HTMLInputElement[];
const foodRadioButtons = document.querySelectorAll('input[name="food"]') as unknown as HTMLInputElement[];
const fruitCheckboxes = document.querySelectorAll('input[name="fruit"]') as unknown as HTMLInputElement[];
const vegetableCheckboxes = document.querySelectorAll('input[name="vegetable"]') as unknown as HTMLInputElement[];

function disableControls() { //tu nesto ne radi za ostale odjednom ali tako je kako je
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
    });

    foodRadioButtons.forEach((food) => {
        food.disabled = false;
    });

    fruitCheckboxes.forEach((fruit) => {
        fruit.disabled = false;
    });

    vegetableCheckboxes.forEach((vegetable) => {
        vegetable.disabled = false;
    });
}