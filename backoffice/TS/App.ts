import {Category} from './Category';
import { BDD } from './BDD';
import {Vendor} from './Vendor';
import {Product} from './Product';

export class App {        


    private vendors: Vendor[];
    private products: Product[];
    private all_products: Product[];
    private categorys: Category[];
    private currentVendor: Vendor;

    public $form: JQuery;
    public $vendor: JQuery;
    public $vendorname: JQuery;
    public $vendeur: JQuery;
    public $categoriesproduit: JQuery;
    public $item: JQuery;
    public $container: JQuery;
    public $containermain: JQuery;


	constructor() {

        this.$item = $(".item");
        this.$item.prop("draggable", true);
        this.$container = $(".container");

        this.vendors = [];
        this.$vendor = $("#vendeur");
        this.$form = $("form");
        this.$vendorname = $("#vendorname");
        this.$vendeur = $("#vendeur");

        this.products = [];
        this.all_products = [];
        this.$containermain = $("#containermain");

        this.categorys = [];
        this.$categoriesproduit = $("#categoriesproduit");

        this.getAllcategories();
        this.getAllProducts();
        this.getAllvendors();
        this.selectVendor();
        this.displayCategorys();
        if( this.vendors.length >0){
            this.currentVendor = this.vendors[0];
        this.displayProductByVendor(this.currentVendor); 
        }// met le 1er vendeur pas default vendeur du tableau vendors à l'index 0
        
    
    }
    




	public getCurrentVendor(): Vendor {
		return this.currentVendor;
	}

	public setCurrentVendor(value: Vendor) {
		this.currentVendor = value;
	}
    

     getAllcategories(): void {
                let categories:any = BDD.categories;
                for ( let category of categories){
                    let the_category: Category = new Category(
                        category.id,
                        category.name
                    );
                    this.categorys.push (the_category);
                }
        
        }
               

    getAllProducts(): void {
        let products:any = BDD.products;
        for ( let product of products){
            let the_product: Product = new Product(
                product.id,
                product.name,
                this.getCategoryById(product.categoryId)
            );
            this.all_products.push(the_product);
        }

    }
    
    getCategoryById(id:number): Category{

        for ( let category of this.categorys){

            if( id == category.getId() ){

            return category;
            }
            
           
        }
        return null;
    }

    getAllvendors(): void {

        // on recupere le vendor de la BDD
        let vendors:any = BDD.vendors;
        // on boucle sur cette liste de vendeurs
        for ( let vendor of vendors){
            // on a besoin d'un tableau de produit
            let vendors_products:Product[] = [];

            //je oucle sur le tableau d'id de vendor.products
            for( let product_id of vendor.products){
                //je cherche le produit correspondant, grace a son id dans ma liste de produit
                let the_product:Product = this.getProductById( product_id);
                //je pousse mon tableau d'objet
                vendors_products.push( the_product);
            }

            //ici on creer le vendeur avec sa classe et le tableau de produit cree
            let the_vendor: Vendor = new Vendor(
                vendor.id,
                vendor.name,
                vendors_products
                 
            );
            //j'ajoute mon vendeur a ma liste de vendeur de mon app
            this.vendors.push ( the_vendor);
        }
    }

    getProductById(id:number): Product{

        for ( let product of this.all_products){
            
                    if( id == product.getId() ){
            
                    return product;
                    }
                        
                }
                return null;
  
    }


    selectVendor(): void {
        
                for( let name of this.vendors){
        
                    const optionHtml:string = "<option value='" + name.getId() + "' > " +name.getName() + "</option>";
                    const option:JQuery = $(optionHtml);
                    this.$vendor.append(option);
                }
        
            }

    getVendorById(id:number): Vendor{
                
            for ( let vendor of this.vendors){
                            
                if( id == vendor.getId() ){
                            
                     return vendor;
                 }
                                        
             }
            return null;
                  
    }   

    displayCategorys(){

        for (let category of this.categorys){
            category.display( this.$categoriesproduit);
        }
    }

    clearBoard(){
        this.$containermain.html("");
        for ( let category of this.categorys){
            category.get$dom().html("");
        }
    }

    displayProductByVendor(vendor:Vendor): void{

        this.clearBoard();

        //on cherche quels sont les produits vendu et non vendu
        for (let product of this.all_products){

           let  flag: boolean = false; // true = vendu, false = non vendu

            for ( let vproduct of  vendor.getProducts()){

                if( vproduct.getId() == product.getId()){
                    // on a trouvé l'element 
                    flag = true;
                }
                
            }

            if( flag == true){
                // affichage colonne de droite
                product.display( this.$containermain);
            }
            else{
                // affichage colonne de gauche
                let category: Category = product.getCategory();
                product.display(category.get$dom());
            }
        }
        
    }

}

