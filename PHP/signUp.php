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

$nickname = $conn -> real_escape_string($_POST['nickname']);
$password = $conn -> real_escape_string($_POST['password']);
$mail = $conn -> real_escape_string($_POST['mail']);

$sql = 'SELECT * FROM Account WHERE Nickname = "' . $nickname . '";';

$result = $conn -> query($sql);

$return = "";

if ($result -> num_rows > 0)
{
    $return = 0;
}
else
{
    $sql = 'INSERT INTO Account (Nickname, Passwort, Mail, Bild, Rolle) VALUES ("' . $nickname . '", "' . $password . '", "' . $mail . '", "default.png", "User");';

    $result = $conn -> query($sql);

    $return = 1;
}

echo json_encode($return);

$conn -> close();

?>


