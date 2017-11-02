<?php
class LoginService extends Service
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
        if(empty($this->params['username'])){
            $this->error['username'] = 'nom utilisateur manquant';
        }
        if(empty($this->params['password'])){
            $this->error['password'] = 'mot de passe manquant';
        }
        
        if(empty($this->error) == false)
        {
        return $this->error;
        }
        $this->vendor = $this->checkUsernamePassword();
        if(empty($this->vendor)){
            $this->error['identifiant'] = 'Nom utilisateur ou le mot de passe incorrect';
            
            return $this->error;
        }
        else
        { 
            
            return $this->vendor;
        }
        }
        
    public function checkUsernamePassword(){
            $nom = $this->params['username'];
            $password = $this->params['password'];

            // $connexion = new PDO('mysql:host=localhost;dbname=vins;charset=UTF8','root','');
            // $connexion->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            // $connexion->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);

            $objet = $this->connection->prepare('SELECT id, vendorname FROM vendors WHERE vendorname=:vendorname AND uPassword=:uPassword');
            $objet->execute(array(
                'vendorname' => $nom,
                'uPassword' => $password
                
            ));
            $vendor = $objet->fetch(PDO::FETCH_ASSOC);
            if(empty($vendor)==false){           
                return new Vendor($vendor);
            }
            return false;
        }







}


