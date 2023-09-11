import { dataAPI, getFruit, Response } from "../observables/apiservice";

export async function createGameLayout(body: HTMLElement) {
  
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

    //probno
    drawGrid(canvas, 10);
    drawFood(canvas, 10, 'apple');

    const rightContainer = document.createElement('div');
    rightContainer.classList.add('right-container');
    lowerContainer.appendChild(rightContainer);

    const settingsSection = document.createElement('div');
    settingsSection.classList.add('settings-section'); 

//

//
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

    
    //kreirani divovi

    //nevezano za bazu, popunjeno odmah
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

    var w = slider.value as unknown as number;

 //
 
    // const response : Response = await new Promise((resolve)=>{
    //     dataAPI.subscribe((data) => {
    //     // const shapes = response.shapes;
    //     // const food = response.food;
    //     // const fruit = response.fruit;
    //     // const vegetable = response.vegetable;
    //     resolve(data);
    // });
    // });


    dataAPI.subscribe((response) => {
        createShapes(response.shapes, 'shapeDiv');
        createFood(response.food, response.fruit, response.vegetable, 'foodDiv');
    });

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
    resultsSection.style.display = 'none';
  
    //display results
  

    rightContainer.appendChild(resultsSection);
  

    showResultsButton.addEventListener('click', () => {
      resultsSection.style.display = resultsSection.style.display === 'none' ? 'block' : 'none';
    });
  
}


 function createShapes(shapes: { id: number; type: string }[], containerID: string) { //async
    // return new Promise<void>((resolve) => {
        const shapeDiv = document.getElementById(containerID) as HTMLDivElement;

        const shape = document.createElement('h3');
    shape.classList.add('shape');
    shape.textContent = 'Snake shape';
    shapeDiv.appendChild(shape);

    const shapeCheckboxes = document.createElement('div');
    shapeCheckboxes.classList.add('shapeCheckboxes');
    shapeDiv.appendChild(shapeCheckboxes);


        const shapeLabels: { [key: string]: string } = {
            round: '\u25CF',
            square: '\u25A0'
        };

        shapes.forEach((shape) => {
            const shapeCheckboxContainer = document.createElement('div');
            shapeCheckboxContainer.classList.add('shapeCheckboxContainer');

            const shapeCheckbox = document.createElement('input');
            shapeCheckbox.type = 'radio';
            shapeCheckbox.name = 'shapes';
            shapeCheckbox.value = shape.type;
            shapeCheckbox.id = shape.id.toString();

            const shapeLabel = document.createElement('label');
            shapeLabel.classList.add('shapeLabel');
            shapeLabel.innerHTML = `${shapeLabels[shape.type]}`;

            shapeCheckboxContainer.appendChild(shapeLabel);
            shapeCheckboxContainer.appendChild(shapeCheckbox);

            shapeCheckboxes.appendChild(shapeCheckboxContainer);
        });

    //     resolve();
    // });
}

   function createFood(food: {id: number; type: string}[], //async
    fruit:{id: number; type: string}[],
    vegetable:{id: number; type: string}[],
    containerID : string){
    // return new Promise<void>((resolve) => {
    const foodDiv = document.getElementById(containerID) as HTMLDivElement;

    const foodType = document.createElement('h3');
    foodType.classList.add('foodType');
    foodType.textContent = 'Food';
    foodDiv.appendChild(foodType);

    const foodCheckboxes = document.createElement('div');
    foodCheckboxes.classList.add('foodCheckboxes');
    foodDiv.appendChild(foodCheckboxes);

    
    food.forEach((food) => {
        const foodCheckboxContainer = document.createElement('div');
        foodCheckboxContainer.classList.add('foodCheckboxContainer');

        const foodCheckbox = document.createElement('input');
        foodCheckbox.type = 'radio';
        foodCheckbox.name = 'food';
        foodCheckbox.value = food.type;
        foodCheckbox.id = food.id.toString();
    
        const foodLabel = document.createElement('label');
        foodLabel.classList.add('foodLabel');
        foodLabel.innerHTML = `${food.type}`;

        foodCheckboxContainer.appendChild(foodLabel);
        foodCheckboxContainer.appendChild(foodCheckbox);
    
        foodCheckboxes.appendChild(foodCheckboxContainer);
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
        // fruitLabel.innerHTML = `${fruit.type}`;
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
    
    const fruitRadio = document.querySelector('input[name="food"][value="fruit"]') as HTMLInputElement;
    fruitRadio.addEventListener('change', () => {
        if(fruitRadio.checked){
            fruitDiv.style.display = 'flex';
            vegetableDiv.style.display = 'none';
        }
        else{
            fruitDiv.style.display = 'none';
        }
    });

    const vegetableRadio = document.querySelector('input[name="food"][value="vegetable"]') as HTMLInputElement;
    vegetableRadio.addEventListener('change', () => {
        if(vegetableRadio.checked){
            vegetableDiv.style.display = 'flex';
            fruitDiv.style.display = 'none';
        }
        else{
            vegetableDiv.style.display = 'none';
        }
    });

    // resolve();
    // });
}


function drawGrid(canvas: HTMLCanvasElement, dimension: number){
    const cellW = canvas.width / dimension;
    const cellH = canvas.height / dimension;

    const cvRect = canvas.getBoundingClientRect();

    const ctx = canvas.getContext('2d');

    if(!ctx)
        return;

    ctx.clearRect(cvRect.left, cvRect.top, canvas.width, canvas.height);


    ctx.strokeStyle = 'green';
    ctx.lineWidth = 1.2;
    for(let x = 0; x < canvas.width; x += cellW){
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
    }

    for(let y = 0; y < canvas.height; y += cellH){
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
    }


}

function drawFood(canvas: HTMLCanvasElement, dimension: number, src: string) : {x: number, y: number}
{
    let x = 0;
    let y = 0;

    const slider = document.getElementById('slider') as HTMLInputElement; //NULL
    // const val =  slider.value as unknown as number;
    // console.log(val);

    const width = canvas.width / dimension;
    const height = canvas.height / dimension;

    const ctx = canvas.getContext('2d');
    
    if(!ctx)
        return;

    const food = new Image();
    food.src = "src\\assets\\" + src + ".png";

    food.onload = () => {
        var rand1 = Math.floor(Math.random() * dimension) * width;
        var rand2 = Math.floor(Math.random() * dimension) * height; 

        x = rand1;
        y = rand2;

        ctx.drawImage(food, rand1, rand2, width, height);
    }

    //vraca i boju nacrtane hrane da bi zmija nakon pojedenog voca/povrca promenila boju
    const fruitColor = getFruit(src).subscribe((fruit) => {
        return fruit.color;
    });

    const vegetableColor = getFruit(src).subscribe((vegetable) => {
        return vegetable.color;
    });

    //doraditi
    
    return {x, y};
}

function drawSnake(canvas: HTMLCanvasElement, dimension: number, shape: string, color: string, length: number, head: {x: number, y: number})
{
    const width = canvas.width / dimension;
    const height = canvas.height / dimension;

    const ctx = canvas.getContext('2d');

    if(!ctx)
        return;

    ctx.fillStyle = color;
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 2;

    const cvRect = canvas.getBoundingClientRect(); 

    ctx.clearRect(cvRect.left, cvRect.top, canvas.width, canvas.height);

    if(shape === 'round'){
        ctx.arc(head.x, head.y, width/2, 0, 2 * Math.PI);
    }
    
    //doraditi logiku za pomeranje zmije, pravac kao parametar? 
}