<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
include "connections.php";

$transaction_id = $_POST["transaction_id"];
$type = $_POST['type'];
$category = $_POST['category'];
$amount = $_POST['amount'];
$date = $_POST['date'];
$notes = $_POST['notes'];

$query = $connection->prepare("UPDATE transactions SET type=?, category=?,amount = ?, date = ?, notes = ? WHERE transaction_id = ?");
$query->bind_param("ssdssi", $type,$category,$amount,$date,$notes,$transaction_id);
$query->execute();

$result = $query->get_result();
if($result -> affected_rows>0){
    echo json_encode([
        "status" => "Success",
        "message" => "Updated row"
    ])
}else{
    echo json_encode([
        "status" => "Error updating"
    ])
}
