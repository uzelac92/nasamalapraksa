<?php
class Post{
 
    // database connection and table name
    private $conn;
    private $table_name = "post";
 
    // object properties
    public $ID;
    public $NASLOV;
    public $INTRO;
    public $SLIKA;
    public $PUTANJA;
    public $KLIK;
    public $KEYWORDS;
    public $NASLOV_A;
    public $NASLOV_B;
 
    // constructor with $db as database connection
    public function __construct($db){
        $this->conn = $db;
    }

    function read(){
 
        // select all query
        $query = "SELECT * FROM post ORDER BY ID DESC";
     
        // prepare query statement
        $stmt = $this->conn->prepare($query);
     
        // execute query
        $stmt->execute();
     
        return $stmt;
    }

    function readOne(){
 
        // query to read single record
        $query = "SELECT * FROM POST WHERE ID = ? LIMIT 0,1";
     
        // prepare query statement
        $stmt = $this->conn->prepare( $query );
     
        // bind id of product to be updated
        $stmt->bindParam(1, $this->ID);
     
        // execute query
        $stmt->execute();
     
        // get retrieved row
        $row = $stmt->fetch(PDO::FETCH_ASSOC);
     
        // set values to object properties
        $this->NASLOV = $row['NASLOV'];
        $this->INTRO = $row['INTRO'];
        $this->SLIKA = $row['SLIKA'];
        $this->PUTANJA = $row['PUTANJA'];
        $this->KLIK = $row['KLIK'];
        $this->KEYWORDS = $row['KEYWORDS'];
        $this->NASLOV_A = $row['NASLOV_A'];
        $this->NASLOV_B = $row['NASLOV_B'];
    }
}