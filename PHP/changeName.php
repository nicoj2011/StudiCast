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

$newNickname = $_POST['newNickname'];
$oldNickname = $_POST['oldNickname'];

$sql = 'SELECT * FROM Account WHERE Nickname = "' . $oldNickname . '";';

$result = $conn->query($sql);

$return = "";

if ($result->num_rows > 0)
{
    $return = 0;
}
else
{
    //$sql = 'UPDATE Account SET Nickname = "' . $newNickname . '" WHERE Nickname = "' . $oldNickname . '";';
    $return = 1;
    //$result = $conn->query($sql);
}


echo json_encode($return);

?>
