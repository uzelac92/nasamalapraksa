<?php
  $host_name = 'localhost:8889';
  $database = 'db770021752';
  $user_name = 'root';
  $password = 'root';

  $dbh = null;
  try {
    $dbh = new PDO("mysql:host=$host_name; dbname=$database;", $user_name, $password);
    $dbh->exec("SET NAMES 'utf8';");
  } catch (PDOException $e) {
    echo "Error!: " . $e->getMessage() . "<br/>";
    die();
  }

  $sql = "SELECT * from `post` ORDER BY ID DESC";  
  $result = $dbh->query($sql);

  if ($result > 0) {
    $output = array();  
    while($row=$result->fetch(PDO::FETCH_ASSOC)) {
      $output[] = $row;
    }
  } else {
    echo "0 Results ";
  }

  echo json_encode($output);
?>