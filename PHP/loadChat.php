<?php
session_start();

$servername = "vweb10.nitrado.net";
$username = "ni1243592_1sql1";
$password = "meiner";
$dbName = "ni1243592_1sql1";

// Create connection
$conn = mysqli_connect($servername, $username, $password, $dbName);

// Check connection
if (!$conn)
{
    die("Connection failed: " . mysqli_connect_error());
}

if (!$_SESSION['date'])
{
}
else
{
$sessionDate = $_SESSION['date'];
$serverDate = date('Y-m-j h:i:s', $_SERVER['REQUEST_TIME']);

$sql = 'SELECT a.Nickname, c.Text, c.Date FROM Chat c, Account a WHERE c.AccID = a.ID AND c.Date BETWEEN "' . $sessionDate . '" AND "' . $serverDate . '" ORDER BY Date ASC;';

$result = $conn->query($sql);

$return = "0";

if ($result->num_rows <= 0)
{
    $return = 0;
}
else
{
    while($row = $result->fetch_assoc())
    {
          $return = $return . "~" . $row["Nickname"]  . "|" . $row["Date"] . "|" . $row["Text"] . "|" . date('Y-m-j h:i:s', $_SERVER['REQUEST_TIME']) . "|";
    }
}

echo json_encode($return . "~0");

}
?>
