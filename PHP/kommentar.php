<?php

$connInfos = fopen ("connection.txt", "r");

while ( $connInfo = fgets ($connInfos, 4096 ))
{
    if (explode(':', $connInfo)[0] == 'server')
    {
        $servername = explode(';', explode(':', $connInfo)[1])[0];
    }
    elseif (explode(':', $connInfo)[0] == 'username')
    {
        $username = explode(';', explode(':', $connInfo)[1])[0];
    }
    elseif (explode(':', $connInfo)[0] == 'password')
    {
        $password = explode(';', explode(':', $connInfo)[1])[0];
    }
    elseif (explode(':', $connInfo)[0] == 'db')
    {
        $dbname = explode(';', explode(':', $connInfo)[1])[0];
    }
}

fclose($connInfos);


// Create connection
$conn = mysqli_connect($servername, $username, $password, $dbname);

// Check connection
if (!$conn)
{
    die("Connection failed: " . mysqli_connect_error());
}

$sql = "SELECT a.Nickname, a.Bild, k.Text, k.Date FROM Kommentar k, Account a WHERE k.AccID = a.ID ORDER BY Date DESC;";
$result = $conn -> query($sql);

$return = "0";
$count = $conn -> real_escape_string($_POST['count']);
$i = 1;

if ($result -> num_rows > 0)
{
    // output data of each row
    while($row = $result -> fetch_assoc() and $i <= $count)
    {
        $return = $return . "~" . $row["Nickname"]  . "|" . $row["Bild"] . "|" . $row["Text"] . "|" . $row["Date"];
        $i = $i + 1;
    }

    $return = $return . "~0";

    echo json_encode($return);
}
else
{
   // echo '0"';
    echo 'Servername: ' . $servername . '| User: ' . $username . ' | Passwort: ' . $password . ' | DB: ' . $dbName;
}

$conn -> close();
?>
