<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include "connections.php";

$username = $_POST["username"];
$password = $_POST["password"];


$query = $connection->prepare("SELECT * FROM users WHERE username = ?");
$query->bind_param("s",$username);
$query->execute();

$result = $query->get_result();    

if($result->num_rows != 0){
    $user = $result->fetch_assoc();  //since we know we have to get 1 row from the user

    $check = password_verify($password, $user["password"]);
    
    if (!$check) {
        echo json_encode([
            "status" => "Login Successful",
            "user" => $user,
        ]);
    }else{
    echo json_encode([
        "status"=> "Invalid Credentials",
    ]);
    }
}else{
    echo json_encode([
        "status"=> "Invalid fd Credentials",
    ]);
}