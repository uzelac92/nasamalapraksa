<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Credentials: true");
header('Content-Type: application/json');
 
// include database and object files
include_once '../config/database.php';
include_once '../objects/post.php';
 
// get database connection
$database = new Database();
$db = $database->getConnection();
 
// prepare post object
$post = new post($db);
 
// set ID property of record to read
$post->ID = isset($_GET['id']) ? $_GET['id'] : die();
 
// read the details of post to be edited
$post->readOne();
 
if($post->NASLOV!=null){
    // create array
    $post_arr = array(
        "ID" =>  $post->ID,
        "NASLOV" => $post->NASLOV,
        "INTRO" => $post->INTRO,
        "SLIKA" => $post->SLIKA,
        "PUTANJA" => $post->PUTANJA,
        "KLIK" => $post->KLIK,
        "KEYWORDS" => $post->KEYWORDS,
        "NASLOV_A" => $post->NASLOV_A,
        "NASLOV_B" => $post->NASLOV_B
 
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