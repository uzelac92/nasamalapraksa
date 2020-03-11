<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json; charset=UTF-8");
 
// database connection will be here
// include database and object files
include_once '../config/database.php';
 
// instantiate database and post object
$database = new Database();
$db = $database->getConnection();

$id = $_GET['id'];

$query = "SELECT * FROM `KOMENTAR` WHERE POSTID = $id ORDER BY KOMENTARID DESC";
$stmt = $db->prepare( $query );
$stmt->execute();
$num = $stmt->rowCount();
 
// check if more than 0 record found
if($num>0){
 
    // posts array
    $posts_arr=array();
    $posts_arr["komentari"]=array();
 
    // retrieve our table contents
    // fetch() is faster than fetchAll()
    // http://stackoverflow.com/questions/2770630/pdofetchall-vs-pdofetch-in-a-loop
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
        // extract row
        // this will make $row['name'] to
        // just $name only

        $KOMENTARID = html_entity_decode($row['KOMENTARID']);

        $query2 = "SELECT * FROM `PODKOMENTAR` WHERE KOMENTARID = $KOMENTARID
            ORDER BY PODKOMID DESC";
        $stmt2 = $db->prepare($query2);
        $stmt2->execute();
        $comm_arr=array();
        $comm_arr["podkomentar"]=array();
        while ($row2 = $stmt2->fetch(PDO::FETCH_ASSOC)){

            $comm_item=array(
                "PODKOMID" => html_entity_decode($row2['PODKOMID']),
                "DATUM" => html_entity_decode($row2['DATUM']),
                "TEKST" => html_entity_decode($row2['TEKST']),
                "KOMENTARID" => html_entity_decode($row2['KOMENTARID']),
            );
    
            array_push($comm_arr["podkomentar"], $comm_item);
        }

        $post_item=array(
            "KOMENTARID" => $KOMENTARID,
            "DATUM" => html_entity_decode($row['DATUM']),
            "TEKST" => html_entity_decode($row['TEKST']),
            "POSTID" => html_entity_decode($row['POSTID']),
            "PODKOMENTARI" => $comm_arr,
        );
 
        array_push($posts_arr["komentari"], $post_item);
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