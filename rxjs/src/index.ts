import { createGameLayout, draw} from "./view/initialView";
import { fromEvent, filter, tap, map, distinctUntilChanged, scan, interval, combineLatest } from "rxjs";
import { Snake } from "./models/snake";
import { getFruit, getVegetable } from "./observables/apiservice";

const snake = new Snake();
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
        .subscribe((event: Event) => {
            const sliderValue = (event.target as HTMLInputElement).value as unknown as number;
            const sliderVal = document.getElementById('sliderValue') as HTMLSpanElement;
            sliderVal.innerText = sliderValue.toString();
            
            snake.setDimension(sliderValue);
            draw(canvas, sliderValue, snake);
        });


        const shape$ = fromEvent(shapeRadioButtons, 'change')
        .subscribe((event: Event) => {
            const selectedShape = (event.target as HTMLInputElement).value;

            snake.setShape(selectedShape);    
            
            draw(canvas, slider.value as unknown as number, snake);
        });


        const food$ = fromEvent(foodRadioButtons, 'change')
        .subscribe((event: Event) => {
            const selectedFood = (event.target as HTMLInputElement).value;

            if(selectedFood === 'fruit'){
                snake.setFoodType('fruit');
                fruitDiv.style.display = 'flex';
                vegetableDiv.style.display = 'none'; 
            }
            else{
                snake.setFoodType('vegetable');
                fruitDiv.style.display = 'none';
                vegetableDiv.style.display = 'flex'; 
            }

            snake.clearFood(); //resetuje se hrana zbog promene tipa
            draw(canvas, slider.value as unknown as number, snake);
        });

        const fruitCheckboxes$ = fromEvent(fruitCheckboxes, 'change')
        .subscribe(() => {
            const checkedFruit = (event.target as HTMLInputElement).value;

            if(snake.getFood().some(f => f.type === checkedFruit)){
                snake.removeFood(checkedFruit);
                draw(canvas, slider.value as unknown as number, snake);
            }
            else{
                getFruit(checkedFruit).subscribe((fruit) => {
                    snake.addFood(fruit);
                    draw(canvas, slider.value as unknown as number, snake);
                });
            }
        });

        const vegetableCheckboxes$ = fromEvent(vegetableCheckboxes, 'change')
        .subscribe(() => {
            const checkedVegetable = (event.target as HTMLInputElement).value;

            if(snake.getFood().some(f => f.type === checkedVegetable)){
                snake.removeFood(checkedVegetable);
                draw(canvas, slider.value as unknown as number, snake);

            }
            else{
                getVegetable(checkedVegetable).subscribe((vegetable) => {
                    snake.addFood(vegetable);
                    draw(canvas, slider.value as unknown as number, snake);
                });
            }        
        });

})
).subscribe();




//logika pomeranja zmije

const canvas = document.getElementById('game-canvas') as HTMLCanvasElement;
const slider = document.getElementById('slider') as HTMLInputElement;
console.log(slider);
console.log(slider.value);

console.log(snake.getDimension());

const keyDown$ = fromEvent<KeyboardEvent>(document, 'keydown').pipe(
    map((event) => event.key),
    distinctUntilChanged()
  )

keyDown$.subscribe((key) => {
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

    // console.log(snake.getBody());
    // console.log(snake.getDirection());
    // console.log(snake.getNextPosition());

    snake.move();
    console.log(snake.getBody());
    draw(canvas, slider.value as unknown as number, snake);

    if(checkCollision(snake)){
        console.log('game over');
        // clearInterval(slv);
    }
});
    

function checkCollision(snake: Snake) : boolean{
    if(snake.getNextPosition().x === canvas.width / snake.getDimension() 
    || snake.getNextPosition().y === canvas.height / snake.getDimension() 
    || snake.getNextPosition().x < 0 
    || snake.getNextPosition().y < 0)
        return true;
    else
        return false;
}