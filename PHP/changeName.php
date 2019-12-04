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

$newNickname = $conn -> real_escape_string($_POST['newNickname']);
$oldNickname = $conn -> real_escape_string($_POST['oldNickname']);

$sql = 'SELECT * FROM Account WHERE Nickname = "' . $newNickname . '";';

$result = $conn->query($sql);

$return = "";

if ($result -> num_rows > 0)
{
    $return =0;
}
else
{
    $sql = 'UPDATE Account SET Nickname = "' . $newNickname . '" WHERE Nickname = "' . $oldNickname . '";';

    $conn -> query($sql);
    $return = 1;
    session_start();
    $_SESSION['nickname'] = $newNickname;
}


echo json_encode($return);

$conn -> close();

?>
