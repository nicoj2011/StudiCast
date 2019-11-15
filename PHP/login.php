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

$sql = 'SELECT Passwort FROM Account WHERE Nickname = "' . $nickname . '";';

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
        $test = $row['Passwort'];
       if ($row["Passwort"] == $password)
       {
           $return = 1;
       }
    }
}

echo json_encode($return);

?>


