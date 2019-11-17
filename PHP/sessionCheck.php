<?php
session_start();

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
if(!isset($_SESSION['nickname']))
{
    $return = 0;
}
else
{
    $nickname = $_SESSION['nickname'];
    $_SESSION['date'] = date('Y-m-j h:i:s', $_SERVER['REQUEST_TIME']);

    $sql = 'SELECT * FROM Account WHERE Nickname = "' . $nickname . '";';

    $result = $conn->query($sql);

    $return = "";

    if ($result->num_rows <= 0)
    {
        $return = $_SESSION['nickname'];
    }
    else
    {
        while($row = $result->fetch_assoc())
        {
        $return = "|" . $row['Nickname'] . "|" . $row['Mail'] . "|" . $row['Bild'] . "|" . $row['Rolle'] . "|" . $_SESSION['nickname'] . "|" . $nickname . "|" . $_SESSION['date'] . "|";
        }
    }

    echo $return;
}
?>

