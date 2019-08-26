import {ingredient} from '../shared/ingredient.model';

export class Recipe{
    public name: string;
    public description:string;
    public imagePath:string;

    public ingredients : ingredient[];

    constructor(name:string,description:string,imagepath:string, ingredients: ingredient[]){

        this.name=name;
        this.description=description;
        this.imagePath=imagepath;
        this.ingredients=ingredients;
    }
}
