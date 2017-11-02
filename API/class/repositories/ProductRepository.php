<?php 
class ProductRepository extends Repository {

    function getAll(){
        $query = "SELECT * FROM products";
        $result = $this->connection->query( $query );
        $result = $result->fetchAll( PDO::FETCH_ASSOC );

        $products = [];
        foreach( $result as $data ){
            $products[] = new Product( $data );
        }

        return $products;  
    }

    function getById( Product $product ){

        $query = "SELECT * FROM products WHERE id=:id";
        $prep = $this->connection->prepare( $query );
        $prep->execute([
            "id" => $product->getId()
        ]);
        $result = $prep->fetch(PDO::FETCH_ASSOC);

        if( empty( $result ) ){
            return false;
        }
        else {
            return new Product( $result );
        }
        
    }



    function save( Product $product ){
        if( empty( $product->getId() ) ){
            return $this->insert( $product );
        }
        else {
            return $this->update( $product );
        }
    }

    private function insert( Product $product ){

        $query = "INSERT INTO products SET productname=:productname, content=:content, categoryId=:categoryId  ";
        $prep = $this->connection->prepare( $query );
        $prep->execute( [
            "productname" => $product->getProductname(),
            "content" => $product->getContent(),
            "categoryId" => $product->getCategoryId()
        ] );
        return $this->connection->lastInsertId();

    }

    private function update( Product $product ){

        $query = "UPDATE products SET productname=:productname, content=:content WHERE id=:id";
        $prep = $this->connection->prepare( $query );
        $prep->execute( [
            "productname" => $product->getProductname(),
            "content" => $product->getContent(),
            "id" => $product->getId()
        ] );
        return $prep->rowCount();

    }

    function delete( Product $product ) {

        $query = "DELETE FROM products WHERE id=:id";
        $prep = $this->connection->prepare( $query );
        $prep->execute([
            "id" => $product->getId()
        ]);
        return $prep->rowCount();

    }

  
}