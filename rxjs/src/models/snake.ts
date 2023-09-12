import { Food } from "./food";

export class Snake {
    private shape: string;
    private color: string;
    private body: { x: number; y: number }[];
    private length: number;
    private direction: 'up' | 'down' | 'left' | 'right';
    private foodType : string;
    private food: {id: number, type: string, color: string}[];
    private dimension: number;
  
    constructor() {
        this.shape = 'round';
        this.color = 'green';
        this.body = [{ x: 1, y: 0 }, { x: 0, y: 0 }]; 
        this.length = 2;
        this.direction = 'right'; 
        this.foodType = 'fruit';
        this.food = []; 
        this.dimension = 10;
    }
  
    move() {
        //znaci treba da mi bude na 1 ono sto je bilo na 0

        //ako je hrana pojedena, dodajemo novi element na pocetak
        
        //ako nije, samo pomeramo glavu i brisemo rep

        console.log(this.body.length);
        for(let i = this.body.length - 1; i > 0; i--){
            this.body[i] = this.body[i - 1];
        }

        this.body[0] = this.getNextPosition();
        // console.log(this.body);

    //   this.body.unshift(this.getNextPosition());
    //   this.body.pop();
    }
  
    changeDirection(newDirection: 'up' | 'down' | 'left' | 'right') {
        this.direction = newDirection;
    }

    getNextPosition() : {x: number, y: number}{
        const i = this.body.length - 1;
        switch(this.direction){
            case 'up':
                return {x: this.body[i].x, y: this.body[i].y - 1};

            case 'down':
                return {x: this.body[i].x, y: this.body[i].y + 1};

            case 'left':
                return {x: this.body[i].x - 1, y: this.body[i].y};
            
            case 'right':
                return {x: this.body[i].x + 1, y: this.body[i].y};

        }
    }

    getShape() {
        return this.shape;
    }

    setShape(shape: string) {
        this.shape = shape;
    }

    getColor() {
        return this.color;
    }

    setColor(color: string) {
        this.color = color;
    }
  
    getBody() {
      return this.body;
    }
  
    getLength() {
      return this.length;
    }
  
    getDirection() {
      return this.direction;
    }

    getFoodType(){
        return this.foodType;
    }

    setFoodType(foodType: string){
        this.foodType = foodType;
    }

    getFood(){  
        return this.food;
    }

    addFood(food: {id: number, type: string, color: string}){
        this.food.push(food);
    }

    removeFood(food: string){
        this.food = this.food.filter(f => f.type !== food);
    }

    clearFood(){
        this.food = [];
    }

    getDimension(){
        return this.dimension;
    }

    setDimension(dimension: number){
        this.dimension = dimension;
    }

}
  