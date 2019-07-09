<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Credentials: true");
header('Content-Type: application/json');
 
// include database and object files
include_once '../config/database.php';
 
// get database connection
$database = new Database();
$db = $database->getConnection();
 
// set ID property of record to read
$id = $_GET['id'];

$query = "SELECT * FROM POST WHERE ID = ? LIMIT 0,1";
     
// prepare query statement
$stmt = $db->prepare( $query );

// bind id of product to be updated
$stmt->bindParam(1, $id);

// execute query
$stmt->execute();

// get retrieved row
$row = $stmt->fetch(PDO::FETCH_ASSOC);

// set values to object properties
$NASLOV = $row['NASLOV'];
$INTRO = $row['INTRO'];
$SLIKA = $row['SLIKA'];
$PUTANJA = $row['PUTANJA'];
$KLIK = $row['KLIK'];
$KEYWORDS = $row['KEYWORDS'];
$NASLOV_A = $row['NASLOV_A'];
$NASLOV_B = $row['NASLOV_B'];
 
if($NASLOV!=null){
    // create array
    $post_arr = array(
        "ID" =>  $id,
        "NASLOV" => $NASLOV,
        "INTRO" => $INTRO,
        "SLIKA" => $SLIKA,
        "PUTANJA" => $PUTANJA,
        "KLIK" => $KLIK,
        "KEYWORDS" => $KEYWORDS,
        "NASLOV_A" => $NASLOV_A,
        "NASLOV_B" => $NASLOV_B
 
    );
 
    // set response code - 200 OK
    http_response_code(200);
 
    // make it json format
    echo json_encode($post_arr);
}
 
else{
    // set response code - 404 Not found
    http_response_code(404);
 
    // tell the user post does not exist
    echo json_encode(array("message" => "post does not exist."));
}
?>