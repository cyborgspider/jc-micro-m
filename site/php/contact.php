<?php
$to = 'jchung@jclawcpa.com';
if($_POST){
    $name     = $_POST['name'];
    $email    = $_POST['email'];
    $location = $_POST['location'];
    $phone    = $_POST['phone'];
    $subject  = $_POST['subject'];
    $message  = $_POST['message'];

//send email
    $email_body = "You have received a new message from the FBAR/FATCA website. ".
    " Here are the details:\n Name: $name \n Email: $email \n Phone: $phone  \n Location: $location \n Message: \n $message";
    mail($to,$subject,$email_body);
}
?>

