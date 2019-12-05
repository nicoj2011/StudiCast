<?php
session_start();

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

if(!isset($_SESSION['nickname']))
{
    $return = 0;
}
else
{
    $nickname = $_SESSION['nickname'];

    $sql = 'SELECT * FROM Account WHERE Nickname = "' . $nickname . '";';

    $result = $conn -> query($sql);

    $return = "";

    if ($result -> num_rows <= 0)
    {
        $return = $_SESSION['nickname'];
    }
    else
    {
        while($row = $result -> fetch_assoc())
        {
        $return = "|" . $row['Nickname'] . "|" . $row['Mail'] . "|" . $row['Bild'] . "|" . $row['Rolle'] . "|" . $_SESSION['nickname'] . "|" . $nickname . "|" . $_SESSION['date'] . "|";
        }
    }

    echo $return;
}

$conn -> close();
?>

