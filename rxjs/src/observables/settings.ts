import { fromEvent, map, startWith} from "rxjs";

const shapeCheckboxes = document.getElementsByClassName("shapeCheckboxes");
const foodCheckboxes = document.getElementsByClassName("foodCheckboxes");
const speedCheckboxes = document.getElementsByClassName("speedCheckboxes");
const fruitCheckboxes = document.getElementsByClassName("fruitCheckboxes");
const vegetableCheckboxes = document.getElementsByClassName("vegetableCheckboxes");


export const shapeValue$ = fromEvent(shapeCheckboxes, 'change').pipe(
    map((event: Event) => (event.target as HTMLInputElement).value),
    startWith('round')    
);


export const foodValue$ = fromEvent(foodCheckboxes, 'change').pipe(
    map((event: Event) => {
        const selectedFood = document.querySelector('input[name="food"]:checked') as HTMLInputElement;
        return selectedFood.value ? selectedFood.value : 'fruit';
    }),
    startWith('fruit')
);

const fruitRadio = document.querySelector('input[name="food"][value="fruit"]') as HTMLInputElement;
const vegetableRadio = document.querySelector('input[name="food"][value="vegetable"]') as HTMLInputElement;


export const foodSelectionObservable = fromEvent(document.querySelectorAll('input[name="food"]'), 'change').pipe(
  map(() => {
    if (fruitRadio.checked) {
      return 'fruit';
    } else if (vegetableRadio.checked) {
      return 'vegetable';
    } else {
      return 'none';
    }
  }),
  startWith('none')
);

const fruitDiv = document.getElementById('fruitDiv') as HTMLDivElement;
const vegetableDiv = document.getElementById('vegetableDiv') as HTMLDivElement;


  
export const speedValue$ = fromEvent(speedCheckboxes, 'change').pipe(
    map((event: Event) => (event.target as HTMLInputElement).value),
    startWith('normal')
);

export const fruitValue$ = fromEvent(fruitCheckboxes, 'change').pipe(  
    map((event: Event) => (event.target as HTMLInputElement).value),
    startWith('plum')
);

export const vegetableValue$ = fromEvent(vegetableCheckboxes, 'change').pipe(
    map((event: Event) => (event.target as HTMLInputElement).value),
    startWith('carrot')
);