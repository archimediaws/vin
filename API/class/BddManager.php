<?php 

class BddManager {

    private $productRepository;
    private $categorieRepository;
    private $vendorRepository;
    private $connection;

    function __construct(){
        $this->connection = Connection::getConnection();
        $this->productRepository = new ProductRepository( $this->connection );
        $this->categorieRepository = new CategorieRepository( $this->connection );
        $this->vendorRepository = new VendorRepository( $this->connection );
    }

    function getProductRepository(){
        return $this->productRepository;
    }

    function getCategorieRepository(){
        return $this->categorieRepository;
    }

    function getVendorRepository(){
        return $this->vendorRepository;
    }

}