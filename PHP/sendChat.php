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

// Create connection
$conn = mysqli_connect($servername, $username, $password, $dbname);

// Check connection
if (!$conn)
{
    die("Connection failed: " . mysqli_connect_error());
}

$nickname = $conn -> real_escape_string($_POST['Nickname']);
$text = $conn -> real_escape_string($_POST['Text']);
$serverDate = date('Y-m-j h:i:s', $_SERVER['REQUEST_TIME']);

$sql = 'SELECT * FROM Account WHERE Nickname = "' . $nickname . '";';

$result = $conn -> query($sql);

$return = "";

if ($result -> num_rows <= 0)
{
    $return = 0;
}
else
{
    while($row = $result -> fetch_assoc())
    {
         $sql = 'INSERT INTO Chat (AccID, Text, Date) VALUES ("' . $row['ID'] . '", "' . $text . '", "' . $serverDate . '");';
    }

    $conn -> query($sql);
    $return = $text;
}

echo json_encode($return);

$conn -> close();

?>
