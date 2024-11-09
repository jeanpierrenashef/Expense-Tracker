<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
include "connections.php";

$id = $_GET["id"];

$query = $connection->prepare("SELECT * FROM transactions WHERE user_id = ?");
$query->bind_param("i",$id);

$query->execute();

$result = $query->get_result();

if ($result->num_rows != 0){
    $array = [];

    while($resultObject = $result->fetch_assoc()){
        $array[] = $resultObject;
    }

    echo json_encode($array);
    } 
    else {
    echo json_encode ([
        "message" => "No Transactions"
    ]);
}