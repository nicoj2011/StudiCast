<?php
/* Empfänger und Sender E-Mail */
$to = "info@ratatosk.me";

$from = "From: Info <" . $to . ">";

$contact = $_POST['Mail'];

/* Betreff */

$request = 'Kontakt: ' . $_POST['Nachname'] . ', ' . $_POST['Vorname'] . ': ' . $_POST['Betreff'];

/* Nachricht */

$text = $_POST['Text'] . ' <br> Kontaktmail: ' . $contact;

/* Mail senden */

mail($test, $request, $text, $from);

echo 'Empfaenger: ' . $o . ' | Absender: ' . $from . ' | Betreff: ' . $request . ' | Text: ' . $test . ' | Mail: ';
?>
