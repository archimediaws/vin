<?php
class Product extends Model implements JsonSerializable {

    private $productname;
    private $content;
    private $categoryId;

    // GETTER

    function getProductname(){
        return $this->productname;
    }

    function getContent(){
        return $this->content;
    }


    function getCategoryId(){
        return $this->categoryId;
    }
    // SETTER

    function setProductname( $productname ){
        $this->productname = $productname;
    }

    function setContent( $content ){
        $this->content = $content;
    }


    function setCategoryId( $categoryId){
        $this->categoryId = $categoryId;
    }

    // JSON SERIALIZE 

    function jsonSerialize(){
        return [
            "id" => $this->id,
            "productname" => $this->productname,
            "content" => $this->content,
            "categoryId" => $this->categoryId
        ];
    }

}