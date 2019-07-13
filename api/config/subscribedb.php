<?php
class SubscribeDB{
 
    // specify your own database credentials
    private $host = "localhost:8889";
    private $db_name = "subscribe";
    private $username = "root";
    private $password = "root";
    public $conn;
 
    // get the database connection
    public function getSubscribeConnection(){
 
        $this->conn = null;
 
        try{
            $this->conn = new PDO("mysql:host=" . $this->host . ";dbname=" . $this->db_name, $this->username, $this->password);
            $this->conn->exec("set names utf8");
        }catch(PDOException $exception){
            echo "Connection error: " . $exception->getMessage();
        }
 
        return $this->conn;
    }
}
?>