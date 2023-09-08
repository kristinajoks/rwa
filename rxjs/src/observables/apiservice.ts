import {Observable, from} from "rxjs";
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

export function getData(){
    
}