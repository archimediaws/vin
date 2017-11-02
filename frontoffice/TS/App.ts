import {APIService} from './APIService';
import {Category} from './Category';
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
    public $vendeurname: JQuery;
    public $uPassword: JQuery;
    public $vendeur: JQuery;
    public $categoriesproduit: JQuery;
    public $item: JQuery;
    public $container: JQuery;
    public $containermain: JQuery;
    public $containermaincat: JQuery;
    public $detail: JQuery;


	constructor() {

        this.$item = $(".item");
        this.$container = $(".container");

        this.vendors = [];
        this.$vendor = $("#vendeur");

        this.$form = $("form");
        this.$vendorname = $("#vendorname");
        this.$vendeurname = $("#vendeurname");
        this.$uPassword = $("#password");
        this.$vendeur = $("#vendeur");

        this.products = [];
        this.all_products = [];
        this.$containermain = $("#containermain");
        this.$containermaincat = $("#containermaincat");
        this.$detail = $("#detail");

        this.categorys = [];
        this.$categoriesproduit = $("#categoriesproduit");

        this.getAllcategories();
        this.getAllProducts();
        
        // this.getAllvendors();
       

        // if( this.vendors.length >0){
        //     this.currentVendor = this.vendors[0];
        // this.displayProductByVendor(this.currentVendor); 
        // }// met le 1er vendeur pas default vendeur du tableau vendors à l'index 0
        
    
    }
    


	public getProducts(): Product[] {
		return this.products;
	}
    

	public getCategorys(): Category[] {
		return this.categorys;
	}

	public getCurrentVendor(): Vendor {
		return this.currentVendor;
	}

	public setCurrentVendor(value: Vendor) {
		this.currentVendor = value;
	}
    
          

    getAllProducts(): void {

        var api:APIService = APIService.getService();
        let products:Promise<any> = api.getAllProducts();
        
        products
            .then(( products ) => {
                
                for ( let product of products ){
                    let the_product: Product = new Product(
                        product.id,
                        product.productname,
                        product.categoryId
                    );
                    this.all_products.push( the_product );
                }
                
                
            })
            .catch((error) => {
                console.log(error);
            })

    }

    getProductById(id:number): void{
        
                var api:APIService = APIService.getService();
                let productId:Promise<any> = api.getProductById(id);
        
                productId
                .then(( productId ) => {
                    
                   

                    for ( let product of this.products){
        
                    if( id == product.getId() ){
        
                    product.displaydetails(this.$detail);
                    }
                    
                   
                }
                
                    
                })
                .catch((error) => {
                    console.log(error);
                })
            }
        

   

     getAllcategories(): void {
                
             var api:APIService = APIService.getService();
             let categories:Promise<any> = api.getAllcategories();
                
            categories
            .then(( categories ) => {
                            
                            for ( let category of categories){
                                    let the_category: Category = new Category(
                                        category.id,
                                        category.categoryname
                                    );
                                    this.categorys.push (the_category);
                                }
                          
                 
                        })
                .catch((error) => {
                console.log(error);
                })   
                                                  
             }       
           

    getCategoryById(id:number): void{


        var api:APIService = APIService.getService();
        let categoryId:Promise<any> = api.getCategoryById(id);

        categoryId
        .then(( categoryId ) => {
            
            for ( let category of this.categorys){

            if( id == category.getId() ){
                console.log(category);
                
            this.displayProductByCategory(category);
            
            
            }   
          
        }  
            
        })
        .catch((error) => {
            console.log(error);
        })

    }


   

    VendorLogin($vendeurname:string, $uPassword:string): void{
        
        var api:APIService = APIService.getService();
        let vendeur:Promise<any> = api.VendorLogin($vendeurname, $uPassword);

        vendeur
        .then(( vendeur ) => {
            
            let the_vendor:Vendor = new Vendor( vendeur.id, vendeur.vendorname );
             
            

            for ( let vproduct of vendeur.products ){
                let the_product: Product = new Product(
                    vproduct.id,
                    vproduct.productname,
                    vproduct.categoryId
                    
                );
                the_vendor.addProduct( the_product );
                this.products.push( the_product );
            }
            

            this.setCurrentVendor(the_vendor);

            the_vendor.display(this.$vendorname);
            
           this.displayProductByVendor();
           this.displayCategorys();
            
        
            
        })

        .catch((error) => {
            console.log(error);
        })
    }

    

    displayCategorys(){
       
        for (let category of this.categorys){
            category.display( this.$categoriesproduit);
        }
    }


     displayProductByCategory(category:Category): void{
           
            console.log(this.products);
            for (let vproduct of this.products){
                
                    if(vproduct.getCategory() == category.getId() ){
                                      
                            vproduct.display( this.$containermaincat);
                               
                    }
                     
                } 
                                      
            this.$containermain.hide();
                    
        }   
       
    displayProductByVendor(): void{
                        
             for (let product of this.products){
                        
                     product.display( this.$containermain);
                                    
                        }
                                          
        }
                  
     // getAllvendors(): void {

    //     // on recupere le vendor de la BDD
    //     let vendors:any = BDD.vendors;
    //     // on boucle sur cette liste de vendeurs
    //     for ( let vendor of vendors){
    //         // on a besoin d'un tableau de produit
    //         let vendors_products:Product[] = [];

    //         //je oucle sur le tableau d'id de vendor.products
    //         for( let product_id of vendor.products){
    //             //je cherche le produit correspondant, grace a son id dans ma liste de produit
    //             let the_product:Product = this.getProductById( product_id);
    //             //je pousse mon tableau d'objet
    //             vendors_products.push( the_product);
    //         }

    //         //ici on creer le vendeur avec sa classe et le tableau de produit cree
    //         let the_vendor: Vendor = new Vendor(
    //             vendor.id,
    //             vendor.name,
    //             vendors_products
                 
    //         );
    //         //j'ajoute mon vendeur a ma liste de vendeur de mon app
    //         this.vendors.push ( the_vendor);
    //     }
    // }


        // getVendorById(id:number): void{

    //     var api:APIService = APIService.getService();
    //     let vendor:Promise<any> = api.getVendorById(id);
                

    //     vendor
    //     .then(( vendor ) => {
            
    //         for ( let vendor of this.vendors){
                        
    //         if( id == vendor.getId() ){
                        
    //             return vendor;
    //         }
                                    
    //         }
    //      return null;
      
            
    //     })
    //     .catch((error) => {
    //         console.log(error);
    //     })
           
    // }   

}

