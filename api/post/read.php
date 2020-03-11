<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
 
// database connection will be here
// include database and object files
include_once '../config/database.php';
 
// instantiate database and post object
$database = new Database();
$db = $database->getConnection();

$query = "SELECT * FROM post ORDER BY ID DESC";

$stmt = $db->prepare($query);

$stmt->execute();

$num = $stmt->rowCount();
 
// check if more than 0 record found
if($num>0){
 
    // posts array
    $posts_arr=array();
    $posts_arr["records"]=array();
 
    // retrieve our table contents
    // fetch() is faster than fetchAll()
    // http://stackoverflow.com/questions/2770630/pdofetchall-vs-pdofetch-in-a-loop
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
        // extract row
        // this will make $row['name'] to
        // just $name only

        $post_item=array(
            "ID" => html_entity_decode($row['ID']),
            "NASLOV" => html_entity_decode($row['NASLOV']),
            "INTRO" => html_entity_decode($row['INTRO']),
            "SLIKA" => html_entity_decode($row['SLIKA']),
            "ALT" => html_entity_decode($row['ALT']),
            "KLIK" => html_entity_decode($row['KLIK']),
            "KEYWORDS" => html_entity_decode($row['KEYWORDS']),
        );
 
        array_push($posts_arr["records"], $post_item);
    }
 
    // set response code - 200 OK
    http_response_code(200);
 
    // show posts data in json format
    echo json_encode($posts_arr);
}
 
// no posts found will be here
else{
 
    // set response code - 404 Not found
    http_response_code(404);
 
    // tell the user no products found
    echo json_encode(
        array("message" => "No posts found.")
    );
}