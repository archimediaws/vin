<?php 
header("Access-Control-Allow-Origin:*", false);
// header("Access-Control-Allow-Origin: *", false);

require "flight/Flight.php"; 
require "autoload.php";

//Enregistre en global dans Flight le BddManager
Flight::set("BddManager", new BddManager());



// routes CATEGORIES


//CATEGORIES GET ALL Lire toutes les categories
Flight::route("GET /categories", function(){
    
        $bddManager = Flight::get("BddManager");
        $repoCat = $bddManager->getCategorieRepository();
        $categories = $repoCat->getAllCategories();
    
        echo json_encode ( $categories );
    
    });


//CATEGORIES GET CATEGORIE par id
Flight::route("GET /categorie/@id", function( $id ){
    
    $status = [
        "success" => false,
        "categoryId" => false
    ];

    $categorie = new Categorie();
    $categorie->setId( $id );

    $bddManager = Flight::get("BddManager");
    $repoCat = $bddManager->getCategorieRepository();
    $categorie = $repoCat->getCategoryById( $categorie );

    if( $categorie != false ){
        $status["success"] = true;
        $status["categoryId"] = $categorie;
    }

    echo json_encode( $status );

});


// CATEGORIE POST  / Créer une categorie
Flight::route("POST /categorie", function(){
    
        $categoryname = Flight::request()->data["categoryname"];
        // $userId = Flight::request()->data["userId"];
        
    
        $status = [
            "success" => false
            // "userId" => 0
        ];
    
        if( strlen( $categoryname ) > 0  ) {
    
            $categorie = new Categorie();
            
            $categorie->setCategoryname( $categoryname );
            // $categorie->setUserId( $userId );
            
    
            $bddManager = Flight::get("BddManager");
            $repoCat = $bddManager->getCategorieRepository();
            $id = $repoCat->save( $categorie );
    
            if( $id != 0 ){
                $status["success"] = true;
                // $status["userId"] = $id;
            }
    
        }
    
        echo json_encode( $status ); 
        
    });


// CATEGORIE DELETE / Supprimer la categorie à l'@id
Flight::route("DELETE /categorie/@id", function( $id ){
    
        $status = [
            "success" => false
        ];
    
        $categorie = new Categorie();
        $categorie->setId( $id );
    
        $bddManager = Flight::get("BddManager");
        $repoCat = $bddManager->getCategorieRepository();
        $rowCount = $repoCat->delete( $categorie );
    
        if( $rowCount == 1 ){
            $status["success"] = true;
        }
    
        echo json_encode( $status );
        
    });  


    //CATEGORIE GET PRODUCTS / Récupere les produits de la categorie @id

    Flight::route("GET /products/cat/@id", function( $id ){
        
        $status = [
            "success" => false,
            "products" => false
        ];

        $categorie = new Categorie();
        $categorie->setId( $id );

        $bddManager = Flight::get("BddManager");
        $repoCat = $bddManager->getCategorieRepository();
        $products = $repoCat->getAllProductByCategorieId($categorie);

        if( $products != false ){
            $status["success"] = true;
            $status["products"] = $products;
        }

        echo json_encode( $status );

    });



// routes PRODUCTS

//PRODUCTS GET PRODUCTS Lire tous les produits
Flight::route("GET /products", function(){

    $bddManager = Flight::get("BddManager");
    $repo = $bddManager->getProductRepository();
    $products = $repo->getAll();

    echo json_encode ( $products );

});

//PRODUCTS GET PRODUCT Récuperer le produit @id
Flight::route("GET /product/@id", function( $id ){
    
    $status = [
        "success" => false,
        "product" => false
    ];

    $product = new Product();
    $product->setId( $id );

    $bddManager = Flight::get("BddManager");
    $repo = $bddManager->getProductRepository();
    $produit = $repo->getById( $product );

    if( $produit != false ){
        $status["success"] = true;
        $status["product"] = $produit;
    }

    echo json_encode( $status );

});



// PRODUCTS POST PRODUCT / Créer un produit
Flight::route("POST /product", function(){

    $productname = Flight::request()->data["productname"];
    $content = Flight::request()->data["content"];
    // $userId = Flight::request()->data["userId"];
    $categoryId = Flight::request()->data["categoryId"];

    $status = [
        "success" => false,
        "id" => 0
    ];

    if( strlen( $productname ) > 0 && strlen( $content ) > 0  && strlen( $categoryId ) > 0 ) {

        $product = new Product();
        
        $product->setProductname( $productname );
        $product->setContent( $content );
       
        // $product->setUserId( $userId );
        $product->setCategoryId( $categoryId );

        $bddManager = Flight::get("BddManager");
        $repo = $bddManager->getProductRepository();
        $id = $repo->save( $product );

        if( $id != 0 ){
            $status["success"] = true;
            $status["id"] = $id;
        }

    }

    echo json_encode( $status ); 
    
});

// PRODUCT POST updater = modifier les datas d'un produit  = en POST 

Flight::route("POST /product/@id", function($id){
    
        $productname = Flight::request()->data["productname"];
        $content = Flight::request()->data["content"];
        
        // $userId = Flight::request()->data["userId"];
        

        $status = [
            "success" => false,
        
        ];
    
        if( strlen( $productname ) > 0 && strlen( $content ) > 0  ) {
    
            $product = new Product();

            $product->setId($id);
            $product->setProductname( $productname );
            $product->setContent( $content );
            
            // $product->setUserId( $userId );
    
            $bddManager = Flight::get("BddManager");
            $repo = $bddManager->getProductRepository();
            $rowCount = $repo->save( $product );
    
            
            if( $rowCount == 1 ){
                $status["success"] = true;
            }
    
        }
    
        echo json_encode( $status ); 
        
    });


// PRODUCTS PUT updater = modifier les datas d'un produit  = en PUT 
Flight::route("PUT /product/@id", function( $id ){
    
        //Pour récuperer des données PUT -> les données sont encodées en json string
        //avec ajax, puis décodées ici en php
        $json = Flight::request()->getBody();
        $_PUT = json_decode( $json , true);//true pour tableau associatif
    
        $status = [
            "success" => false
        ];
    
        if( isset( $_PUT["productname"] ) && isset( $_PUT["content"] )   ){
    
            $productname = $_PUT["productname"];
            $content = $_PUT["content"];
            
    
            $product = new Product();
    
            $product->setId( $id );
            $product->setProductname( $productname );
            $product->setContent( $content );
            
    
            $bddManager = Flight::get("BddManager");
            $repo = $bddManager->getProductRepository();
            $rowCount = $repo->save( $product );
    
            if( $rowCount == 1 ){
                $status["success"] = true;
            }
    
        }
    
        echo json_encode( $status );
    
    });

// PRODUCTS DELETE / Supprimer le produit à l'@id
Flight::route("DELETE /product/@id", function( $id ){

    $status = [
        "success" => false
    ];

    $product = new Product();
    $product->setId( $id );

    $bddManager = Flight::get("BddManager");
    $repo = $bddManager->getProductRepository();
    $rowCount = $repo->delete( $product );

    if( $rowCount == 1 ){
        $status["success"] = true;
    }

    echo json_encode( $status );
    
});


// ROUTES VENDORS

// VENDOR LOGIN 

Flight::route("POST /vendor/login", function(){ // route login vendor 
    
        $vendorname = Flight::request()->data['vendorname'];
        $uPassword = Flight::request()->data['uPassword'];

        
        $vendor = new Vendor();
        $vendor->setVendorname ($vendorname);
        $vendor->setUPassword ($uPassword);
    
        $bddManager = Flight::get("BddManager");
        $repo = $bddManager->getVendorRepository();
        $findedVendor = $repo->getVendorByVendorname($vendor);
        $repo->getAllProductsByVendorId($findedVendor);
    
        $status = [
            "success" => "",
            "error" => "",
            "vendor" => ""
        ];
    
        if( $findedVendor == false ){
            $status["success"] = false;
            $status["error"] = "identifiant incorrect";
        }
        else if( $findedVendor->getUPassword()  != $vendor->getUPassword()){
            
            $status["success"] = false;
            $status["error"] = "mot de passe incorrect";
        }
        else {
            
            $status["success"] = true;
            $status["vendor"] = $findedVendor;
        }
    
    
        echo json_encode($status); 
    
    });

    // VENDORS REGISTER utilise le registerservice

Flight::route("POST /vendor/register", function(){ 
    
       

        $param = Flight::request()->data->getData();
        $service = new RegisterService($param);
        $service->launchControls();

        $status = [
            "success" => "",
            "error" => "",
            "vendor" => ""
        ];


        if($service->getError()){
        
            $status["success"] = false;
            $status["error"] = "il y a des erreurs dans le formulaire d'enregistrement";
        }
        else
        {

        $vendorname = $service->getParams()['vendorname'];
        $uPassword = $service->getParams()['uPassword'];

        $vendor = new Vendor();
        $vendor->setVendorname ($vendorname);
        $vendor->setUPassword ($uPassword);
    
        $bddManager = Flight::get("BddManager");
        $repo = $bddManager->getVendorRepository();
        $createdVendor = $repo->getVendorByVendorname($vendor);
    
    
            
            $status["success"] = true;
            $status["vendor"] = $createdVendor;
        }
    
    
        echo json_encode($status); 
    
    });

 //VENDORS GET BY ID / Récupere le vendeur et produitdu vendeur par son id@id

    Flight::route("GET /vendor/@id/products", function( $id ){
        
        $status = [
            "success" => false,
            "vendor" => ""
        ];

        $vendor = new Vendor();
        $vendor->setId( $id );

        $bddManager = Flight::get("BddManager");
        $repoVendor = $bddManager->getVendorRepository();
        $vendeur = $repoVendor->getVendorById($vendor);
        $repoVendor->getAllProductsByVendorId($vendeur);

        if( $vendeur->getId() != false ){
            $status["success"] = true;
            $status["vendor"] = $vendeur;
            
            
        }

        echo json_encode( $status );

    });

//VENDORS GET BY ID / Récupere le vendeur par son id@id

Flight::route("GET /vendor/@id", function( $id ){
    
    $status = [
        "success" => false,
        "id" => false
    ];

    $vendor = new Vendor();
    $vendor->setId( $id );

    $bddManager = Flight::get("BddManager");
    $repoVendor = $bddManager->getVendorRepository();
    $vendeur = $repoVendor->getVendorById($vendor);
   

    if( $vendeur != false ){
        $status["success"] = true;
        $status["id"] = $vendeur->getId();
        
        
    }

    echo json_encode( $status );

});


    // /vendor/@i
    // $vendeur = $repository->getVendorById($id);
    // $products = $repository->getProductsByVendor($vendeur); // est aussi hydraté par la methode addProduct de la class Vendor

Flight::start();