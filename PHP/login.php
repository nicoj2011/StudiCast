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

$nickname = $_POST['nickname'];
$password = $_POST['password'];

$sql = 'SELECT * FROM Account WHERE Nickname = "' . $nickname . '";';

$result = $conn->query($sql);

$return = 0;

if ($result->num_rows <= 0)
{
    $return = 0;
}
else
{
    while($row = $result->fetch_assoc())
    {
       if ($row["Passwort"] == $password)
       {
           $return = "|" . $row['Nickname'] . "|" . $row['Mail'] . "|" . $row['Bild'] . "|" . $row['Rolle'] . "|";
       }
    }
}

echo json_encode($return);

?>

