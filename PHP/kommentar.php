<?php
$servername = "vweb10.nitrado.net";
$username = "ni1243592_1sql1";
$password = "meiner";
$dbname = "ni1243592_1sql1";

// Create connection
$conn = mysqli_connect($servername, $username, $password, $dbname);

// Check connection
if (!$conn)
{
    die("Connection failed: " . mysqli_connect_error());
}

$sql = "SELECT a.Nickname, a.Bild, k.Text, k.Date FROM Kommentar k, Account a;";
$result = $conn->query($sql);

$return = "0";

if ($result->num_rows > 0)
{
    // output data of each row
    while($row = $result->fetch_assoc())
    {
        $return = $return . "~" . $row["Nickname"]  . "|" . $row["Bild"] . "|" . $row["Text"] . "|" . $row["Date"];
    }

    $return = $return . "~0";

    echo json_encode($return);
}
else
{
    echo json_encode('0 Ergebnisse');
}
?>
