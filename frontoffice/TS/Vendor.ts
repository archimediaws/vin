import { Model } from './Model';
import { Product } from './Product';

export class Vendor extends Model {

   
    private name: string;
    private products: Product[];
    protected $dom: JQuery;


	constructor(id:number, name:string ) {
        super(id);
        this.name = name;
        this.products = [];
		
	}

	public getProducts(): Product[] {
		return this.products;
	}

	public setProducts(value: Product[]) {
		this.products = value;
	}


	public getName(): string {
		return this.name;
	}

	public setName(value: string) {
		this.name = value;
	}

    

    display( $parent: JQuery ): void {

        let span: string = "<span>" + this.name + "</span>";

        this.$dom = $(span);

        $parent.append( this.$dom);

    }



    removeProductById( id:number){
        for( let key in this.products){

            let product: Product = this.products[key];
            if( product.getId() == id) {
                let nkey:number = parseInt(key);
                this.products.slice( nkey, 1);
            }
        }

    }

    addProduct( product: Product): void{
        this.products.push(product);
    }


    removeProduct( product: Product): void{

        for( let key in this.products){
            let vproduct: Product = this.products[key];

            if( vproduct.getId() == product.getId() ){
                this.products.splice( parseInt(key),1)
            }
            return;
        }
    }
}