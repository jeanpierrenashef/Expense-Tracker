<?php

include "connections.php";

$type = $_POST['type'];
$category = $_POST['category'];
$amount = $_POST['amount'];
$date = $_POST['date'];
$notes = $_POST['notes'];


$query = $connection->prepare("INSERT INTO transactions (type,category,amount,date,notes) VALUES (?,?,?,?,?)");
$query->bind_param("ssids", $type, $category, $amount, $date, $notes)
$query->execute();

$result = $query->affected_rows;

if($result != 0){
    echo json_encode([
        "status" => "Successful"
        "message" => "$result users created"
    ]);
}else{
    echo json_encode([
        "status" => "Failed"
        "message" => "This whole thing failed"
    ])
}