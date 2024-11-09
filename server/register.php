<?php

include "connections.php";

$username = $_POST["username"];
$password = $_POST["password"];

$hash = password_hash($password, PASSWORD_DEFAULT);

$query = $connection->prepare("INSERT INTO USERS(username, password) VALUES (?,?)");
$query->bind_param("ss",$username,$hash);
$query->execute();
$result = $query->affected_rows;    

if($result!=0){
    echo json_encode([
        "status" => "Successful",
        "message" => "$result users created",
    ]);
}else{
    echo json_encode([
        "status" => "Failure",
        "message" => "Could not create records"
    ]);
}