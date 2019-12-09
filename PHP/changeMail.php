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

$Nickname = $conn -> real_escape_string($_POST['Nickname']);
$Mail = $conn -> real_escape_string($_POST['Mail']);

$sql = 'SELECT * FROM Account WHERE Nickname = "' . $Nickname . '";';

$result = $conn -> query($sql);

$return = "";

if ($result -> num_rows <= 0)
{
    $return = 0;
}
else
{
    $sql = 'UPDATE Account SET Mail = "' . $Mail . '" WHERE Nickname = "' . $Nickname . '";';

    $conn -> query($sql);
    $return = 1;
}

echo $return;

$conn -> close();

?>
