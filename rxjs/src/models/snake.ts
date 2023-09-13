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
    private currentFood: {x: number, y: number, type: string};
  
    constructor() {
        this.shape = 'round';
        this.color = 'green';
        this.body = [{ x: 1, y: 0 }, { x: 0, y: 0 }]; 
        this.length = 2;
        this.direction = 'right'; 
        this.foodType = 'fruit';
        this.food = []; 
        this.dimension = 10;
        this.currentFood = {x: 0, y: 0, type: 'apple'};
    }
  
     //mogu da izmenim snake move da proveri koliziju prvo i da vraca true ili false i onda ovde da izmenim to
            //a u move kad se proverava kolizija taman da se proveri da li je sudar sa telom pre nego sto se pomeri
            //i u snake da dodam metodu koja proverava da li je nextPosition pozicija currentFood, pa ako jeste
            //da se ne brise rep nego da se samo doda novi element na kraj niza i da se nekako oznaci da je pojedeno voce,
            //npr ili polje u klasi kao eaten pa da se ono prosledi i na osnovu njega u draw fji zove drawFood 
            //ili da postoji neki observable koji ce da prati da li je se voce jede
            //ZA SADA NIJE OBS

    move(canvas: HTMLCanvasElement) : {eaten: boolean, collided: boolean}{ //vraca da li je pojela hranu ili ne
        //znaci treba da mi bude na 1 ono sto je bilo na 0
        //ako je hrana pojedena, dodajemo novi element na pocetak
        //ako nije, samo pomeramo glavu i brisemo rep

        let eaten = false;
        let collided = false;

        if(this.checkCollision(canvas)){
            //revise
            collided = true;
            return {eaten, collided};
        }

        console.log(this.body.length);
        
        //znaci ako sam imala {x: 1, y: 0}, {x: 0, y: 0} i ako je pojedena hrana, treba da se doda {x: 2, y: 0} i da bude
        // {x:2, y:0} {x: 1, y: 0} {x: 0, y: 0} znaci ukoliko je pojedena hrana radicu push nova pozicija MOZE UNSHIFT PA REVERSE 
        //a ako ne onda se shiftuju za jedno mesto

        //pomeri se, a nakon pomeranja ukoliko je pojedena hrana zmija raste
        for(let i = this.body.length - 1; i > 0; i--){
            this.body[i] = this.body[i - 1];
        }
        
        this.body[0] = this.getNextPosition();
        

        //provera da li je pojedena hrana
        if(this.checkFood()){
            console.log("pojedena hrana");
            console.log(this.body.length);

            //treba da se namesti da se na kraj dodaje novi element takav da 
            this.body.push(this.body[this.body.length]);

            eaten = true;
        }

        console.log({eaten, collided});

        return {eaten, collided};
    }

    checkFood() : boolean{
        if(this.body[0].x === this.currentFood.x && this.body[0].y === this.currentFood.y){
            return true;
        }
        return false;
    }   
  
    changeDirection(newDirection: 'up' | 'down' | 'left' | 'right') {
        this.direction = newDirection;
    }

    getNextPosition() : {x: number, y: number}{
        switch(this.direction){
            case 'up':
                return {x: this.body[0].x, y: this.body[0].y - 1};

            case 'down':
                return {x: this.body[0].x, y: this.body[0].y + 1};

            case 'left':
                return {x: this.body[0].x - 1, y: this.body[0].y};
            
            case 'right':
                return {x: this.body[0].x + 1, y: this.body[0].y};

        }
    }

    checkCollision(canvas: HTMLCanvasElement) : boolean{
        console.log("check collision");
        console.log(this.getNextPosition());

        
        const next = this.getNextPosition();
        
        //sada bi trebalo da je ok provera sudara sa telom jer proveravam pre nego sto se pomeri
        
        console.log(this.dimension, next.x, next.y)

        if(next.x ===  this.dimension ||   //sudar sa zidom 
            next.y === this.dimension || 
            next.x < 0  || next.y < 0)
            {
                console.log("sudar sa zidom");
                return true;
            }
        // else if(this.body.some((element) => element.x === next.x && element.y === next.y)) //sudar sa telom, ali morace da se proveri pre nego sto se pozove snake.move()
        //     return true;
        else
            return false;
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

    getCurrentFood(){
        return this.currentFood;
    }

    setCurrentFood(currentFood: {x: number, y: number, type: string}){
        this.currentFood = currentFood;
    }
}
  