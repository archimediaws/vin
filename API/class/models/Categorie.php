<?php

class Categorie extends Model implements JsonSerializable
{
    
    private $categoryname;
    
   
 
    public function getCategoryname()
    {
        return $this->categoryname;
    }

   
    public function setCategoryname($categoryname)
    {
        $this->categoryname = $categoryname;
    }




      // JSON SERIALIZE 

      function jsonSerialize(){
        return [
            "id" => $this->id,
            "categoryname" => $this->categoryname
            
        ];
    }
  
    
}