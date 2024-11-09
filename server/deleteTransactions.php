<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
include "connections.php";

$transaction_id = $_GET["transaction_id"];

$query = $connection->prepare("DELETE FROM transactions WHERE transaction_id = ?");
$query-bind_param("i", $transaction_id);
$query->execute();

$result = $query->get_result();

if($result -> affected_rows > 0){
    $user = $result->fetch_assoc();
    echo json_encode([
        "status" => "Row deleted successfully",
    ])
}else{
    echo json_encode([
        "status" => "Row didnt delete"
    ])
}