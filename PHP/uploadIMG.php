<?php
$servername = "vweb10.nitrado.net";
$username = "ni1243592_1sql1";
$password = "meiner";
$dbName = "ni1243592_1sql1";

// Create connection
$conn = mysqli_connect($servername, $username, $password, $dbName);

// Check connection
if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}

/* Getting file name */
$filenameOld = $_FILES['file']['name'];
$nickname = $_POST['Nickname'];

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

        if ($result->num_rows <= 0)
        {
            echo json_encode(0);
        }
        else
        {
            $sql = 'UPDATE Account SET Bild = "' . $filename . '" WHERE Nickname = "' . $nickname . '";';

            $conn->query($sql);

            echo json_encode($filename);
        }

    }
    else
    {
      echo json_encode(0);
    }
}
