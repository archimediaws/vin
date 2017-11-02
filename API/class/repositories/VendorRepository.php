<?php 
class VendorRepository extends Repository {

    function getAllVendor(){
        $query = "SELECT * FROM vendors";
        $result = $this->connection->query( $query );
        $result = $result->fetchAll( PDO::FETCH_ASSOC );

        $vendors = [];
        foreach( $result as $data ){
            $vendors[] = new Vendor( $data );
        }

        return $vendors;  
    }

    function getVendorById( Vendor $vendor ){

        $query = "SELECT * FROM vendors WHERE id=:id";
        $prep = $this->connection->prepare( $query );
        $prep->execute([
            "id" => $vendor->getId()
        ]);
        $result = $prep->fetch(PDO::FETCH_ASSOC);

        if( empty( $result ) ){
            return false;
        }
        else {
            return new Vendor( $result );
        }
        
    }

    public function getVendorByVendorname(Vendor $vendor){
        $prep = $this->connection->prepare('SELECT * FROM vendors WHERE vendorname=:vendorname');
        $prep->execute(array(
            'vendorname'=> $vendor->getVendorname()
            
        ));
        $result = $prep->fetch(PDO::FETCH_ASSOC);

        if( empty( $result)){
            return false;
        }
        else{
            return new Vendor($result);
        }

        
    }

    public function getAllProductsByVendorId(Vendor $vendor){
        
                // recupérer l'id du vendeur en cours
                $vendorId = $vendor->getId();

                //SELECT product.* FROM product
                //JOIN user_product ON user_product.id_user = 1
                //WHERE product.id = user_product.id_product

                $object = $this->connection->prepare('SELECT products.* FROM products JOIN vendorproduct ON vendorproduct.vendorId=:vendorId  WHERE products.id = vendorproduct.productId');
                $object->execute(array(
                    'vendorId'=> $vendorId
                ));
                $productSvendor = $object->fetchAll(PDO::FETCH_ASSOC);
                
                // $arrayObjet = [];
                foreach ($productSvendor as $productvendor){
                    // $arrayObjet[] = new Product($productvendor);
                    $product =new Product($productvendor);
                    $vendor->addProduct( $product);
                }
       
                // return $arrayObjet;
                
            }


    function save( Vendor $vendor ){
        if( empty( $vendor->getId() ) ){
            return $this->insert( $vendor );
        }
        else {
            return $this->update( $vendor );
        }
    }

    private function insert( Vendor $vendor ){

        $query = "INSERT INTO vendors SET vendorname=:vendorname, uPassword=:uPassword";
        $prep = $this->connection->prepare( $query );
        $prep->execute( [
            "vendorname" => $vendor->getVendorname(),
            "uPassword" => $vendor->getUPassword()
        ] );
        return $this->connection->lastInsertId();

    }

    private function update( Vendor $vendor ){

        $query = "UPDATE vendors SET vendorname=:vendorname, uPassword=:uPassword WHERE id=:id";
        $prep = $this->connection->prepare( $query );
        $prep->execute( [
            "vendorname" => $vendor->getVendorname(),
            "uPassword" => $vendor->getUPassword(),
            "id" => $vendor->getId()
        ] );
        return $prep->rowCount();

    }

    function delete( Vendor $vendor ) {

        $query = "DELETE FROM vendors WHERE id=:id";
        $prep = $this->connection->prepare( $query );
        $prep->execute([
            "id" => $vendor->getId()
        ]);
        return $prep->rowCount();

    }

// function getVendorById(): Vendeur {

// }
// function getProductsByvendeur (Vendor $vendor){
//     $result =$prep->fetchAll();
//     foreach ($result as $data){
//         $product =new Product($data);
//         $vendor->addProduct( $product);
//     }
// }

}