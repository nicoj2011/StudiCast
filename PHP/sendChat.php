<?php
$servername = "vweb10.nitrado.net";
$username = "ni1243592_1sql1";
$password = "meiner";
$dbName = "ni1243592_1sql1";

// Create connection
$conn = mysqli_connect($servername, $username, $password, $dbName);

// Check connection
if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}

$nickname = $_POST['Nickname'];
$text = $_POST['Text'];
$serverDate = date('Y-m-j h:i:s', $_SERVER['REQUEST_TIME']);

$sql = 'SELECT * FROM Account WHERE Nickname = "' . $nickname . '";';

$result = $conn->query($sql);

$return = "";

if ($result->num_rows <= 0)
{
    $return = 0;
}
else
{
    while($row = $result->fetch_assoc())
    {
         $sql = 'INSERT INTO Chat (AccID, Text, Date) VALUES ("' . $row['ID'] . '", "' . $text . '", "' . $serverDate . '");';
    }

    $conn->query($sql);
    $return = $text;
}

echo json_encode($return);

?>
