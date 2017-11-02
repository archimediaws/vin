<?php
class Vendor extends Model implements JsonSerializable {

    private $vendorname;
    private $uPassword;
    
    private $products = []; // tableau des produits du vendeur

    function getVendorname(){
        return $this->vendorname;
    }

    function getUPassword(){
        return $this->uPassword;
    }


    function setVendorname( $vendorname ){
        $this->vendorname = $vendorname;
    }

    function setUPassword( $uPassword ){
        $this->uPassword = $uPassword;
    }

    function addProduct(Product $product){
        $this->products[] = $product;

    }

    function jsonSerialize(){
        return [
            "id" => $this->id,
            "vendorname" => $this->vendorname,
            "uPassword" => $this->uPassword,
            "products" => $this->products
        ];
    }

    
}