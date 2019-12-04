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

/* Getting file name */
$filenameOld = $conn -> real_escape_string($_FILES['file']['name']);
$nickname = $conn -> real_escape_string($_POST['Nickname']);

$datatyp = explode(".", $filenameOld)[1];

$filename = $nickname . "." . $datatyp;

/* Location */
$location = "../IMG/Profil/" . $filename;
$uploadOk = 1;
$imageFileType = pathinfo($location,PATHINFO_EXTENSION);

/* Valid Extensions */
$valid_extensions = array("jpg","jpeg","png");
/* Check file extension */
if ( !in_array(strtolower($imageFileType),$valid_extensions) )
{
   $uploadOk = 0;
}

if ($uploadOk == 0)
{
   echo json_encode(0);
}
else
{
   /* Upload file */
    if(move_uploaded_file($_FILES['file']['tmp_name'],$location))
    {

        $sql = 'SELECT * FROM Account WHERE Nickname = "' . $nickname . '";';

        $result = $conn->query($sql);

        $return = "";

        if ($result -> num_rows <= 0)
        {
            echo json_encode(0);
        }
        else
        {
            $sql = 'UPDATE Account SET Bild = "' . $filename . '" WHERE Nickname = "' . $nickname . '";';

            $conn -> query($sql);

            echo json_encode($filename);
        }

    }
    else
    {
      echo json_encode(0);
    }
}

$conn -> close();

?>
