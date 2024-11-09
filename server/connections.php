<?php


$host = "localhost";
$username = "root";
$pass ="";
$dbname = "expense_tracker";

$connection = new mysqli($host, $username, $pass, $dbname);

if($connection->connect_error){
    die("Connection Eroor");
};
