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

$Nickname = $_POST['Nickname'];
$Mail = $_POST['Mail'];

$sql = 'SELECT * FROM Account WHERE Nickname = "' . $Nickname . '";';

$result = $conn->query($sql);

$return = "";

if ($result->num_rows <= 0
{
    $return = 0;
}
else
{
    $sql = 'UPDATE Account SET Mail = "' . $Mail . '" WHERE Nickname = "' . $Nickname . '";';

    $conn->query($sql);
    $return = 1;
}

echo json_encode($return);

?>
