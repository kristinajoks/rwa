// import {ajax} from 'rxjs/ajax';
import { fromEvent, map, startWith } from 'rxjs';
import {dataAPI, Response} from '../observables/apiservice';
import {shapeValue$} from '../observables/settings';

export function createGameLayout(body: HTMLElement): void {
  
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
    // createGridCanvas(canvas, 10);

    fillDefault();

    const rightContainer = document.createElement('div');
    rightContainer.classList.add('right-container');
    lowerContainer.appendChild(rightContainer);

    const settingsSection = document.createElement('div');
    settingsSection.classList.add('settings-section'); 

    //rxjs
    dataAPI.subscribe({
        next: (response: Response) => {
            const {shapes, food, speed, fruit, vegetable} = response;
            createSettings(settingsSection, shapes, food, speed, fruit, vegetable);
        }
    });
  
    leftContainer.appendChild(settingsSection);
  
    const startButton = document.createElement('button');
    startButton.textContent = 'START GAME';
    startButton.id = 'start-button';
    leftContainer.appendChild(startButton);


    const showResultsButton = document.createElement('button');
    showResultsButton.textContent = 'Show Results';
    showResultsButton.id = 'show-results-button'; 
    rightContainer.appendChild(showResultsButton);
  
    // Create the results section (hidden by default)
    const resultsSection = document.createElement('div');
    resultsSection.classList.add('results-section');
    resultsSection.style.display = 'none';
  
    // Create elements for displaying game results
    // Add these elements to the resultsSection
  

    rightContainer.appendChild(resultsSection);
  

    showResultsButton.addEventListener('click', () => {
      resultsSection.style.display = resultsSection.style.display === 'none' ? 'block' : 'none';
    });
  
    // You can return references to important elements (e.g., canvas) for later use
    // Return { canvas, settingsSection, resultsSection } or other elements you need
  }


  function createGridCanvas(canvas: HTMLCanvasElement, canvDim: number) : HTMLCanvasElement{
    const cellSize1 = canvas.width / canvDim;
    const cellSize2 = canvas.height / canvDim;
  
    const ctx = canvas.getContext('2d');
  
    if (!ctx) {
      throw new Error('Canvas not supported in this browser.');
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
  
    ctx.strokeStyle = 'green'; 
    ctx.lineWidth = 1.2; 
    ctx.lineCap = 'square';
    ctx.lineJoin = 'miter';
    
    for (let x = 0; x <= canvas.width; x += cellSize1) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, canvas.height);
      ctx.stroke();
    }
  
    for (let y = 0; y <= canvas.height; y += cellSize2) {

      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(canvas.width, y);
      ctx.stroke();
    }

    return canvas;
}
  
function fillDefault(){
    const canvas = document.getElementById('game-canvas') as HTMLCanvasElement;
    createGridCanvas(canvas, 10);
    // drawFruit(canvas, canvas.width/10, canvas.height/10, 'src\\assets\\plum.png', 10);
    //drawSnake
    drawSnake(canvas, 'round', 'yellow', canvas.width/10 *0.8, canvas.height/10 * 0.8, [{x: 0, y: 0}, {x: 1, y: 0}])
}

function createSettings(container : HTMLDivElement,
    shapes: { id: number; type: string }[],
    food: { id: number; type: string }[],
    speed: { id: number; type: string }[],
    fruit: { id: number; type: string }[],
    vegetable: { id: number; type: string }[])
{
    const dimDiv = document.createElement('div');
    dimDiv.classList.add('dimDiv');
    container.appendChild(dimDiv);

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


    // slider.onchange = function() {
    //     sliderValue.textContent = slider.value;
    //     createGridCanvas(document.getElementById('game-canvas') as HTMLCanvasElement, parseInt(slider.value));
    //     drawFruit(canvas, canvas.width/(slider.value as unknown as number), canvas.height/(slider.value as unknown as number), 'src\\assets\\plum.png', slider.value as unknown as number);
    // }

   

    const shapeDiv = document.createElement('div');
    shapeDiv.classList.add('shapeDiv');
    container.appendChild(shapeDiv);

    const shape = document.createElement('h3');
    shape.classList.add('shape');
    shape.textContent = 'Snake shape';
    shapeDiv.appendChild(shape);

    const shapeCheckboxes = document.createElement('div');
    shapeCheckboxes.classList.add('shapeCheckboxes');
    shapeDiv.appendChild(shapeCheckboxes);


    const shapeLabels: { [key: string]: string } = {
        round: '\u25CF', 
        square: '\u25A0', 
        zigzag: '\u25B2', 
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


    const foodDiv = document.createElement('div');
    foodDiv.classList.add('foodDiv');
    container.appendChild(foodDiv);

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

    //foodCheckboxes.addEventListener('onchange', () => drawFruit(document.getElementById('game-canvas') as HTMLCanvasElement,) );

    const fruitDiv = document.createElement('div');
    fruitDiv.classList.add('fruitDiv');
    fruitDiv.id = 'fruitDiv';
    container.appendChild(fruitDiv);

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

    const fruitRadio = document.querySelector('input[name="food"][value="fruit"]') as HTMLInputElement;
    const vegetableRadio = document.querySelector('input[name="food"][value="vegetable"]') as HTMLInputElement;

    
    fruitRadio.addEventListener('change', () => {
        if(fruitRadio.checked){
            fruitDiv.style.display = 'flex';
            vegetableDiv.style.display = 'none';
        }
        else{
            fruitDiv.style.display = 'none';
        }
    });


    vegetableRadio.addEventListener('change', () => {
        if(vegetableRadio.checked){
            vegetableDiv.style.display = 'flex';
            fruitDiv.style.display = 'none';
        }
        else{
            vegetableDiv.style.display = 'none';
        }
    });

    const vegetableDiv = document.createElement('div');
    vegetableDiv.classList.add('vegetableDiv');
    vegetableDiv.id = 'vegetableDiv';
    container.appendChild(vegetableDiv);

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

    

    const canvas = document.getElementById('game-canvas') as HTMLCanvasElement;
    var w = slider.value as unknown as number;
    
    const speedDiv = document.createElement('div');
    speedDiv.classList.add('speedDiv');
    container.appendChild(speedDiv);

    const speedType = document.createElement('h3');
    speedType.classList.add('speed');
    speedType.textContent = 'Speed';
    speedDiv.appendChild(speedType);

    const speedCheckboxes = document.createElement('div');
    speedCheckboxes.classList.add('speedCheckboxes');
    speedDiv.appendChild(speedCheckboxes);

    speed.forEach((speed) => {
        const speedCheckboxContainer = document.createElement('div');
        speedCheckboxContainer.classList.add('speedCheckboxContainer');

        const speedCheckbox = document.createElement('input');
        speedCheckbox.type = 'radio';
        speedCheckbox.name = 'speed';
        speedCheckbox.value = speed.type;
        speedCheckbox.id = 'shapeChbx';
    
        const speedLabel = document.createElement('label');
        speedLabel.classList.add('speedLabel');
        speedLabel.innerHTML = `${speed.type}`;

        speedCheckboxContainer.appendChild(speedLabel);
        speedCheckboxContainer.appendChild(speedCheckbox);
    
        speedCheckboxes.appendChild(speedCheckboxContainer);
    });


    //rxjs
    const sliderValue$ = fromEvent(slider, 'input').pipe(
            map((event: Event) => (event.target as HTMLInputElement).value),
            startWith(slider.value)
        );

    sliderValue$.subscribe((value) => {
        sliderValue.textContent = value;
        const canv = createGridCanvas(document.getElementById('game-canvas') as HTMLCanvasElement, parseInt(value));
        drawFruit(canv, canv.width/(value as unknown as number), canv.height/(value as unknown as number), 'src\\assets\\plum.png', value as unknown as number);
    });   

    //pomerice se u index.ts
    shapeValue$.subscribe((value) => {
        console.log(value);
    });
    
}

function drawFruit(canvas: HTMLCanvasElement, width: number, height: number, src : string, sliderValue: number){    
    //mozda nepotrebno
    console.log('drawFruit');
    const ctx = canvas.getContext('2d');

    if (!ctx) {
        throw new Error('Canvas not supported in this browser.');
    }

    const canvasRect = canvas.getBoundingClientRect();
    ctx.clearRect(canvasRect.left, canvasRect.top, canvasRect.width, canvasRect.height)
    // const fruit = document.createElement('img');

    const fruit = new Image();
    // fruit.src = 'src\\assets\\plum.png';
    fruit.src = src;
    

    fruit.onload = () =>{
        
        var rand1 = Math.floor(Math.random() * (sliderValue)) * width;
        var rand2 = Math.floor(Math.random() * (sliderValue)) * height;

        ctx.drawImage(fruit, rand1, rand2, width, height);
    };

    fruit.alt = 'apple';
    fruit.classList.add('fruit');
}

function drawSnake(canvas: HTMLCanvasElement, shape: String, color: string, segmentSizeX: number, segmentSizeY: number, snake: { x: number; y: number }[]) {
    const ctx = canvas.getContext('2d');
    const canvasRect = canvas.getBoundingClientRect();

    ctx.clearRect(canvasRect.left, canvasRect.top, canvas.width, canvas.height); //izmeniti malo da bi isla po sredini 
  
    ctx.fillStyle = 'green';
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 2;
  
    // Loop through the snake's segments and draw each one
    for (const segment of snake) {
      // Calculate the position of the segment on the canvas
      const x = segment.x * segmentSizeX; // Assuming segmentSize is the size of each segment
      const y = segment.y * segmentSizeY;
  
      // Draw the snake segment as a filled rectangle
      ctx.fillRect(x, y, segmentSizeX, segmentSizeY);
  
      // Draw a border around the snake segment
      ctx.strokeRect(x, y, segmentSizeX, segmentSizeY);
    }
}

// function drawSnake(ctx, snake) {
//   const snakeColor = 'green';
//   const eyeColor = 'white';
//   const eyeRadius = 3;

//   // Draw the snake's body
//   ctx.fillStyle = snakeColor;
//   for (let i = 0; i < snake.length; i++) {
//     const segment = snake[i];
//     const x = segment.x;
//     const y = segment.y;
//     const radius = 10; // Adjust the radius as needed
//     ctx.beginPath();
//     ctx.arc(x, y, radius, 0, Math.PI * 2);
//     ctx.fill();
//     ctx.closePath();
//   }

//   // Draw the snake's head with eyes
//   const head = snake[0];
//   ctx.fillStyle = snakeColor;
//   ctx.beginPath();
//   ctx.arc(head.x, head.y, 10, 0, Math.PI * 2);
//   ctx.fill();
//   ctx.closePath();

//   // Draw the eyes
//   const eyeOffsetX = 5; // Offset from the head's center
//   const eyeOffsetY = -5;
//   ctx.fillStyle = eyeColor;
//   ctx.beginPath();
//   ctx.arc(head.x + eyeOffsetX, head.y + eyeOffsetY, eyeRadius, 0, Math.PI * 2);
//   ctx.arc(head.x - eyeOffsetX, head.y + eyeOffsetY, eyeRadius, 0, Math.PI * 2);
//   ctx.fill();
//   ctx.closePath();
// }


async function fetchData() {
    try {
      const response = await fetch('db.json');
      if (!response.ok) {
        throw new Error('Network response was not ok.');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching data:', error);
      return null;
    }
  }
  
