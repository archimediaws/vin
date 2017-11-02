import { Model } from './Model';
import {Category} from "./Category";

export class Product extends Model {


    private name: string;
    private category: Category;
    protected $dom: JQuery;

	constructor( id:number, name: string, category: Category) {
        super(id);
		this.name = name;
		this.category = category;
	}
    

	public getName(): string {
		return this.name;
	}

	public setName(value: string) {
		this.name = value;
	}


	public getCategory(): Category {
		return this.category;
	}


    
    display( $parent: JQuery ): void {
        
                let category_name: string = this.category.getName();
                let data_id: number = this.getId();
                let div : string = "<div class='item "+category_name+"' id='item"+data_id+"' draggable ='true' data-product="+this.id+"><span>"+this.name+"</span></div>"
                 
                this.$dom = $(div);
                $parent.append( this.$dom);
        
            }


}