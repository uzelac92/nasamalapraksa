<?php
class Database{
 
    // specify your own database credentials
    private $host = "db770021752.hosting-data.io";
    private $db_name = "db770021752";
    private $username = "dbo770021752";
    private $password = "92.Black.92";
    public $conn;
 
    // get the database connection
    public function getConnection(){
 
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