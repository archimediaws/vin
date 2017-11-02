<?php
class RegisterService extends Service
{
    private $params;
    private $error;
    private $vendor;
    public function getParams()
    {
        return $this->params;
    }
    public function setParams($params)
    {
        $this->params=$params;
    }
    public function getError()
    {
        return $this->error;
    }
    public function setError($error)
    {
        $this->error=$error;
    }
    public function getVendor()
    {
        return $this->vendor;
    }
    public function setVendor($vendor)
    {
        $this->vendor=$vendor;
    }
    public function launchControls()
        {
   
        if(empty($this->params['vendorname'])){
            $this->error['vendorname'] = 'Le nom de l\'utilisateur n\'est pas renseigner';
        }
       
       
        if(empty($this->params['uPassword'])){
            $this->error['uPassword'] = 'Le mot de passe n\'est pas renseigner' ;
        }
        
    
        $pass = $this->params['uPassword'];
        $pass = strlen($pass);
        if($pass<3 || $pass>16){
            $this->error['uPasswordLength'] = 'Votre mot de passe doit avoir entre 3 a 16 caractere';
        }
        
        if(empty($this->error) == false)
        {
        ;
        return $this->error;
        }
        $this->vendor = $this->checkAll();
        if(empty($this->vendor)){
            $this->error['identifiant'] = 'vendeur deja existant';
            return $this->error;
        }
        else
        {
            return $this->vendor;
        }
        }
        
        public function checkAll(){
            $vendorname = $this->params['vendorname'];

            $prep = $this->connection->prepare('SELECT vendorname FROM vendors WHERE vendorname=:vendorname ');

            $prep->execute(array(
                
                'vendorname' => $this->params['vendorname'],
            ));
            $vendor = $prep->fetchAll(PDO::FETCH_ASSOC);
            if(empty($vendor)){
                        
                        $uPassword = $this->params['uPassword'];
                        
                        $objet = $this->connection->prepare('INSERT INTO vendors SET 
                            vendorname=:vendorname,
                            uPassword=:uPassword
                            ');
                        $objet->execute(array(
                        'vendorname' => $vendorname,
                        'uPassword' => $uPassword
                        ));
                        $vendor = true;
                return $vendor;
            }
            return false;
        }
}