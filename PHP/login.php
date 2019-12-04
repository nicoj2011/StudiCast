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

$nickname = $conn -> real_escape_string($_POST['nickname']);
$password = $conn -> real_escape_string($_POST['password']);

$sql = 'SELECT * FROM Account WHERE Nickname = "' . $nickname . '";';

$result = $conn -> query($sql);

$return = 0;

if ($result -> num_rows <= 0)
{
    $return = 0;
}
else
{
    while($row = $result -> fetch_assoc())
    {
       if ($row["Passwort"] == $password)
       {
           session_start();
           $_SESSION['nickname'] = $nickname;
           $_SESSION['date'] = date('Y-m-j h:i:s', $_SERVER['REQUEST_TIME']);
           $return = "|" . $row['Nickname'] . "|" . $row['Mail'] . "|" . $row['Bild'] . "|" . $row['Rolle'] . "|" . $_SESSION['nickname'] . "|";
       }
    }
}

echo json_encode($return);

$conn -> close();

?>


