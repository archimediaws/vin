import {Product} from './Product';
import {Vendor} from './Vendor';
import {App} from './App';


var app:App = new App();


 app.$form.submit( function(event){
       
        event.preventDefault();
                
        // let selectedvendorId:number = app.$vendeur.val() as number;
        let selectedvendorName:string = app.$vendeurname.val() as string;
        let selectedvendorPassword:string = app.$uPassword.val() as string;
        let vendor = app.VendorLogin(selectedvendorName, selectedvendorPassword);
        
        
});

         
$(document).on("click", ".container", function(event){ 

     
        event.stopPropagation();
        
                
            let id:number = $(this).data("category");
            console.log(id);
            app.$containermain.hide();
            app.$containermaincat.show();
            app.getCategoryById(id);
            
        
        });

$(document).on("click", ".item", function(event){ 
                      
        
        event.stopPropagation();
        let id:number = $(this).data("product");
        console.log(id);
        app.getProductById(id);
        
                        
                        
        });
