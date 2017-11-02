import {Product} from './Product';
import {Vendor} from './Vendor';
import {App} from './App';


var app:App = new App();

//autorise un element a recevoir un drag
$(document).on("dragover",".container", function(event){
event.preventDefault();
});

$(document).on("dragstart", ".item", function(event){
    

let dragEvent: DragEvent = event.originalEvent as DragEvent;
        dragEvent.dataTransfer.setData( "id", $(this).data("product")); // dans l'evenement enregostre id de l'event qu'on est entrain de dragger

});

//event container fixe de droite
app.$containermain.on("drop", function(event){

        const dragEvent: DragEvent = event.originalEvent as DragEvent;
        let id_product: number = parseInt( dragEvent.dataTransfer.getData( "id" ));
        console.log(id_product);
        let product: Product = app.getProductById (id_product);
        app.getCurrentVendor().addProduct(product);
        
        $(this).append(product.get$dom());

});

//event container de gauche categories
$(document).on("drop","#categoriesproduit", function(event){
        
        const dragEvent: DragEvent = event.originalEvent as DragEvent;
        let id_product: number = parseInt( dragEvent.dataTransfer.getData( "id" ));
        let product: Product = app.getProductById (id_product);
        app.getCurrentVendor().removeProduct(product);
        product.getCategory().get$dom()
        .append(product.get$dom());
        
});

// $(document).on("drop", ".container", function(event){
    
//             const dragEvent: DragEvent = event.originalEvent as DragEvent;
//             const id:string = dragEvent.dataTransfer.getData( "id" );
//             const $element: JQuery = $("#" + id);
//             const containerId: string = $(this).attr("id");

         
//          if($(this).hasClass("vendor")){
//                  $(this).append($element);
//          }
//          else if ($element.hasClass(containerId)){
                 
//                 $(this).append($element);


//          }
// });


 app.$form.submit( function(event){
       
        event.preventDefault();
                
        let selectedvendorId:number = app.$vendeur.val() as number;
        let vendor: Vendor = app.getVendorById(selectedvendorId);
        vendor.display(app.$vendorname);
        app.setCurrentVendor(vendor);
        app.displayProductByVendor(app.getCurrentVendor());

});
         

////////////
// var elements: Promise<number[]> = new Promise(function( resolve: Function, reject: Function ){
        
//         /*setTimeout(function(){
//             resolve( [1, 2, 3, 4] );
//         }, 3000);
    
//         setTimeout(function(){
//             reject( "Erreur !" );
//         }, 2000);*/
    
//         $.ajax({
//             success: function(data){ //data = [ 1, 2, 3, 4 ]
//                 resolve( data );
//             },
//             error: function(error){
//                 reject(error);
//             }
//         })
    
    
//     });
    
//     elements
//         .then( function( data ){
            
//             for( let item of data ){
//                 console.log( item );
//             }
//         })
//         .catch( function(error){
//             console.log(error);
//         });