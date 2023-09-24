import { map, of, tap } from "rxjs";
import { Snake } from "../models/snake";
import { dataAPI, getFruit, Response } from "../observables/apiservice";

export function createGameLayout(body: HTMLElement) {
  
    //main layout
    const upperContainer = document.createElement('div');
    upperContainer.classList.add('upper-container');
    body.appendChild(upperContainer);

    const title1 = document.createElement('h1');
    title1.textContent = 'rxj';
    upperContainer.appendChild(title1);

    const sss = document.createElement('img');
    sss.src = 'src\\assets\\snake (1).png';
    sss.alt = 'snake';
    sss.classList.add('sss');
    upperContainer.appendChild(sss);

    const title2 = document.createElement('h1');
    title2.textContent = 'nake';
    upperContainer.appendChild(title2);

    const lowerContainer = document.createElement('div');
    lowerContainer.classList.add('lower-container');
    body.appendChild(lowerContainer);

    const leftContainer = document.createElement('div');
    leftContainer.classList.add('left-container');
    lowerContainer.appendChild(leftContainer);
  
    //div za igricu
    const gameContainer = document.createElement('div');
    gameContainer.classList.add('game-container'); 
    lowerContainer.appendChild(gameContainer);
  
    const canvas = document.createElement('canvas');
    canvas.id = 'game-canvas'; 
    gameContainer.appendChild(canvas);

    //inicijalno iscrtavanje
    draw(canvas, 10, new Snake(), true);

    const rightContainer = document.createElement('div');
    rightContainer.classList.add('right-container');
    lowerContainer.appendChild(rightContainer);

    const settingsSection = document.createElement('div');
    settingsSection.classList.add('settings-section'); 

//
    createSettings(settingsSection);

    const returnObservable = dataAPI.pipe(
        tap((response: Response) => {
            createShapes(response.shapes, 'shapeDiv');
            createFood(response.food, response.fruit, response.vegetable, 'foodDiv');
        })
    );

    leftContainer.appendChild(settingsSection);
  
//  
    const startButton = document.createElement('button');
    startButton.textContent = 'START GAME';
    startButton.id = 'start-button';
    leftContainer.appendChild(startButton);

    const showResultsButton = document.createElement('button');
    showResultsButton.textContent = 'Show Results';
    showResultsButton.id = 'show-results-button'; 
    rightContainer.appendChild(showResultsButton);
  
    const resultsSection = document.createElement('div');
    resultsSection.classList.add('results-section');
    resultsSection.id = 'results-section';
    resultsSection.style.display = 'none';
  
    //display results
    createResults(resultsSection);

    rightContainer.appendChild(resultsSection);

    return returnObservable;
}

function createResults(resultsSection: HTMLDivElement){
    const currentScoreDiv = document.createElement('div');
    currentScoreDiv.classList.add('current-score-div');
    currentScoreDiv.id = 'current-score-div';
    resultsSection.appendChild(currentScoreDiv);

    const bestScoreDiv = document.createElement('div');
    bestScoreDiv.classList.add('best-score-div');
    bestScoreDiv.id = 'best-score-div';
    resultsSection.appendChild(bestScoreDiv);

    const currentScore = document.createElement('h3');
    currentScore.classList.add('current-score');
    currentScore.textContent = 'Current Score';
    currentScoreDiv.appendChild(currentScore);

    const csDiv = document.createElement('div');
    csDiv.classList.add('cs-div');
    currentScoreDiv.appendChild(csDiv);

    const csImg = document.createElement('img');
    csImg.classList.add('cs-img');
    csImg.id = 'cs-img';
    csImg.src = 'src\\assets\\apple.png';
    csImg.alt = 'apple';
    csDiv.appendChild(csImg);
    
    const currentScoreValue = document.createElement('span');
    currentScoreValue.classList.add('current-score-value');
    currentScoreValue.id = 'current-score-value';
    currentScoreValue.textContent = '0';
    csDiv.appendChild(currentScoreValue);

    const bestScore = document.createElement('h3');
    bestScore.classList.add('best-score');
    bestScore.textContent = 'Best Score';
    bestScoreDiv.appendChild(bestScore);

    const bsDiv = document.createElement('div');
    bsDiv.classList.add('bs-div');
    bestScoreDiv.appendChild(bsDiv);

    const bsImg = document.createElement('img');
    bsImg.classList.add('bs-img');
    bsImg.id = 'bs-img';
    bsImg.src = 'src\\assets\\king.png';
    bsImg.alt = 'crown';
    bsDiv.appendChild(bsImg);

    const bestScoreValue = document.createElement('span');
    bestScoreValue.classList.add('best-score-value');
    bestScoreValue.id = 'best-score-value';
    bestScoreValue.textContent = '0';
    bsDiv.appendChild(bestScoreValue);

    const rulesDiv = document.createElement('div');
    rulesDiv.classList.add('rules-div');
    resultsSection.appendChild(rulesDiv);

    const rules = document.createElement('h3');
    rules.classList.add('rules');
    rules.textContent = 'Rules';
    rulesDiv.appendChild(rules);

    const rulesList = document.createElement('ul');
    rulesList.classList.add('rules-list');
    rulesDiv.appendChild(rulesList);

    const rule1 = document.createElement('li');
    rule1.classList.add('rule1');
    rule1.textContent = 'Eat food to grow';
    rulesList.appendChild(rule1);

    const rule2 = document.createElement('li');
    rule2.classList.add('rule2');
    rule2.textContent = 'Avoid walls and your tail';
    rulesList.appendChild(rule2);

    const rule3 = document.createElement('li');
    rule3.classList.add('rule3');
    rule3.textContent = 'Change settings to make the game more interesting';
    rulesList.appendChild(rule3);

    const rule4 = document.createElement('li');
    rule4.classList.add('rule4');
    rule4.textContent = 'Have fun!';
    rulesList.appendChild(rule4);
    
}

function createSettings(settingsSection : HTMLDivElement){
    const dimDiv = document.createElement('div');
    dimDiv.classList.add('dimDiv');
    dimDiv.id = 'dimDiv';
    settingsSection.appendChild(dimDiv);

    const shapeDiv = document.createElement('div');
    shapeDiv.classList.add('shapeDiv');
    shapeDiv.id = 'shapeDiv';
    settingsSection.appendChild(shapeDiv);

    const foodDiv = document.createElement('div');
    foodDiv.classList.add('foodDiv');
    foodDiv.id = 'foodDiv';
    settingsSection.appendChild(foodDiv);

    const fruitDiv = document.createElement('div');
    fruitDiv.classList.add('fruitDiv');
    fruitDiv.id = 'fruitDiv';
    settingsSection.appendChild(fruitDiv); 
    
    const vegetableDiv = document.createElement('div');
    vegetableDiv.classList.add('vegetableDiv');
    vegetableDiv.id = 'vegetableDiv';
    settingsSection.appendChild(vegetableDiv);

    const dimension = document.createElement('h3');
    dimension.classList.add('dimension');
    dimension.textContent = 'Dimension';
    dimDiv.appendChild(dimension);

    const slider = document.createElement('input');
    slider.type = 'range';
    slider.min = '5';
    slider.max = '10';
    slider.step = '1';
    slider.classList.add('slider');
    slider.id = 'slider';
    dimDiv.appendChild(slider);

    const sliderValue = document.createElement('text');
    sliderValue.classList.add('sliderValue');
    sliderValue.id = 'sliderValue';
    sliderValue.textContent = '10';
    dimDiv.appendChild(sliderValue);
   
}

 function createShapes(shapes: { id: number; type: string }[], containerID: string) { 
    const shapeDiv = document.getElementById(containerID) as HTMLDivElement;

    const shape = document.createElement('h3');
    shape.classList.add('shape');
    shape.textContent = 'Snake shape';
    shapeDiv.appendChild(shape);

    const shapeRadioButtons = document.createElement('div');
    shapeRadioButtons.classList.add('shapeRadioButtons');
    shapeDiv.appendChild(shapeRadioButtons);


    const shapeLabels: { [key: string]: string } = {
        round: '\u25CF',
        square: '\u25A0'
    };

    shapes.forEach((shape) => {
        const shapeRadioContainer = document.createElement('div');
        shapeRadioContainer.classList.add('shapeRadioContainer');

        const shapeRadio = document.createElement('input');
        shapeRadio.type = 'radio';
        shapeRadio.name = 'shapes';
        shapeRadio.value = shape.type;
        shapeRadio.id = 'shape'+shape.id.toString();

        const shapeLabel = document.createElement('label');
        shapeLabel.classList.add('shapeLabel');
        shapeLabel.innerHTML = `${shapeLabels[shape.type]}`;

        shapeRadioContainer.appendChild(shapeLabel);
        shapeRadioContainer.appendChild(shapeRadio);

        shapeRadioButtons.appendChild(shapeRadioContainer);
    });

}

function createFood(food: {id: number; type: string}[],
    fruit:{id: number; type: string}[],
    vegetable:{id: number; type: string}[],
    containerID : string){
    const foodDiv = document.getElementById(containerID) as HTMLDivElement;

    const foodType = document.createElement('h3');
    foodType.classList.add('foodType');
    foodType.textContent = 'Food';
    foodDiv.appendChild(foodType);

    const foodRadioButtons = document.createElement('div');
    foodRadioButtons.classList.add('foodRadioButtons');
    foodDiv.appendChild(foodRadioButtons);

    
    food.forEach((food) => {
        const foodRadioContainer = document.createElement('div');
        foodRadioContainer.classList.add('foodRadioContainer');

        const foodRadio = document.createElement('input');
        foodRadio.type = 'radio';
        foodRadio.name = 'food';
        foodRadio.value = food.type;
        foodRadio.id = 'food'+food.id.toString();
    
        const foodLabel = document.createElement('label');
        foodLabel.classList.add('foodLabel');
        foodLabel.innerHTML = `${food.type}`;

        foodRadioContainer.appendChild(foodLabel);
        foodRadioContainer.appendChild(foodRadio);
    
        foodRadioButtons.appendChild(foodRadioContainer);
    });

    const fruitDiv = document.getElementById('fruitDiv') as HTMLDivElement;

    fruit.forEach((fruit) => {
        const fruitCheckboxContainer = document.createElement('div');
        fruitCheckboxContainer.classList.add('fruitCheckboxContainer');

        const fruitCheckbox = document.createElement('input');
        fruitCheckbox.type = 'checkbox';
        fruitCheckbox.name = 'fruit';
        fruitCheckbox.value = fruit.type;

        const fruitLabel = document.createElement('img');
        fruitLabel.classList.add('fruitLabel');
        fruitLabel.src = `src\\assets\\${fruit.type}.png`;

        fruitCheckboxContainer.appendChild(fruitLabel);
        fruitCheckboxContainer.appendChild(fruitCheckbox);
        fruitDiv.appendChild(fruitCheckboxContainer);
    });

    fruitDiv.style.display = 'none';

    const vegetableDiv = document.getElementById('vegetableDiv') as HTMLDivElement;

    vegetable.forEach((vegetable) => {
        const vegetableCheckboxContainer = document.createElement('div');
        vegetableCheckboxContainer.classList.add('vegetableCheckboxContainer');

        const vegetableCheckbox = document.createElement('input');
        vegetableCheckbox.type = 'checkbox';
        vegetableCheckbox.name = 'vegetable';
        vegetableCheckbox.value = vegetable.type;

        const vegetableLabel = document.createElement('img');
        vegetableLabel.classList.add('vegetableLabel');
        vegetableLabel.src = `src\\assets\\${vegetable.type}.png`;

        vegetableCheckboxContainer.appendChild(vegetableLabel);
        vegetableCheckboxContainer.appendChild(vegetableCheckbox);

        vegetableDiv.appendChild(vegetableCheckboxContainer);
    });

    vegetableDiv.style.display = 'none';
}

export function draw(canvas: HTMLCanvasElement, dimension: number, snake: Snake, drawNewFood: boolean){
    const width = canvas.width / dimension;
    const height = canvas.height / dimension;

    const ctx = canvas.getContext('2d');

    if(!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawGrid(ctx, canvas.width, canvas.height, width, height);
    drawFood(ctx, width, height, dimension, snake, drawNewFood);
    drawSnake(ctx, canvas.width, canvas.height, width, height, dimension, snake);
}

function drawGrid(ctx: CanvasRenderingContext2D, cw: number, ch: number, width: number, height: number){
    ctx.strokeStyle = 'green';
    ctx.lineWidth = 1.2;

    for(let x = 0; x < cw; x += width){
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, ch);
        ctx.stroke();
    }

    for(let y = 0; y < ch; y += height){
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(cw, y);
        ctx.stroke();
    }
}

function drawFood(ctx: CanvasRenderingContext2D, width: number, height: number, dimension: number, snake: Snake, drawNewFood: boolean)
{ 
    let x = 0;
    let y = 0;

    let type : string;
  
    const food = new Image();


    //ukoliko nema potrebe za generisanje nove hrane
    if(!drawNewFood){
        x = snake.getCurrentFood().x;
        y = snake.getCurrentFood().y;
        type = snake.getCurrentFood().type;

        food.src = "src\\assets\\" + type + ".png";
        food.onload = () => {
            ctx.drawImage(food, x * width, y * height, width, height);
        }
        return;
    }
    else{ 

        if(snake.getFood().length === 0){
            type = snake.getFoodType() === 'fruit' ? 'apple' : 'carrot';
        }
        else if(snake.getFood().length === 1){
            type = snake.getFood()[0].type;
        }
        else{
            const random = Math.floor(Math.random() * snake.getFood().length);
            type = snake.getFood()[random].type;
        }

        food.src = "src\\assets\\" + type + ".png";

        food.onload = () => {
            var rand1;
            var rand2;
            let taken;

            do{
                taken = false;
                rand1 = Math.floor(Math.random() * dimension) ;
                rand2 = Math.floor(Math.random() * dimension) ; 

                //ako je zmija na tom polju, ponovo generisanje            
                x = rand1;
                y = rand2;

                snake.setCurrentFood({x, y, type});
                
                for(const segment of snake.getBody()){
                    if(segment){
                        if(segment.x === rand1 && segment.y === rand2){
                            taken = true;
                            break;
                        }
                    }
                }

            }while(taken);

        ctx.drawImage(food, rand1 * width, rand2 * height, width, height);
        }
    }
}

function drawSnake(ctx: CanvasRenderingContext2D, cw: number, ch: number, width: number, height: number, dimension: number, snake: Snake) 
{
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 1.5;

    let i = 0;

    for(const segment of snake.getBody()){
        if(segment){

            const x = segment.x * width;
            const y = segment.y * height;

            if( i == 0)
                ctx.fillStyle = 'dimgray';
            else
                ctx.fillStyle = snake.getColor();

            if(snake.getShape() === 'round'){
                const cornerRadius = Math.min(width, height) / 1.5;
                
                ctx.beginPath();
                ctx.moveTo(x + cornerRadius, y);
                ctx.lineTo(x + width - cornerRadius, y);
                ctx.quadraticCurveTo(x + width, y, x + width, y + cornerRadius);
                ctx.lineTo(x + width, y + height - cornerRadius);
                ctx.quadraticCurveTo(x + width, y + height, x + width - cornerRadius, y + height);
                ctx.lineTo(x + cornerRadius, y + height);
                ctx.quadraticCurveTo(x, y + height, x, y + height - cornerRadius);
                ctx.lineTo(x, y + cornerRadius);
                ctx.quadraticCurveTo(x, y, x + cornerRadius, y);
                ctx.closePath();
                
                ctx.fill();
                ctx.stroke();
            } 
            else{
                ctx.fillRect(x, y, width, height);
                ctx.strokeRect(x, y, width, height);
            }

            i++;
        }
    } 
}