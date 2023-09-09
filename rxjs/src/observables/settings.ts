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
    map((event: Event) => (event.target as HTMLInputElement).value),
    startWith('fruit')
);

export const speedValue$ = fromEvent(speedCheckboxes, 'change').pipe(
    map((event: Event) => (event.target as HTMLInputElement).value),
    startWith('normal')
);