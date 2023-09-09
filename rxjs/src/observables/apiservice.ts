import {Observable, catchError, from, map} from "rxjs";
import {ajax} from "rxjs/ajax";
import {Food} from "../models/food";


const API_URL = "http://localhost:3000";

export function getFood(type:string):Observable<Food[]>{
    return from(
        fetch(`${API_URL}/food/?type=${type}`)
            .then(response => 
            {
                if(response.ok) 
                    return response.json()
                else
                    console.log(response.statusText)
            })
            .catch(error => console.log(error))
    )
}

export interface Response{
    shapes: any[];
    food: any[];
    speed: any[];
    fruit: any[];
    vegetable: any[];
}

export const dataAPI = ajax.getJSON(`${API_URL}/db`).pipe(
    map((response:Response) => {
        return response;
    }),
    catchError (err => {   
        console.error(err);   
        throw err; 
    })
);