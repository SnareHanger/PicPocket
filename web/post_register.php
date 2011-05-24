<?php
include 'config.php';

$con = mysql_connect($host, $db_user, $db_pwd);

if(!$con)
{
	echo "Failed to make connection.";
	exit;
}

$db = mysql_select_db($db_name);

if(!$db)
{
	echo "Failed to select db.";
	exit;
}

$username 	= $_POST['username'];
$password	= $_POST['password'];
$email		= $_POST['email'];

$sql 		= "SELECT username,email FROM Users WHERE username = '" . $username ."' OR email = '" . $email . "'";
$query		= mysql_query($sql);
if(mysql_num_rows($query) > 0)
{
	echo "That username or email already exists";
}
else
{
	$insert = "INSERT INTO Users (username,password,email) VALUES ('" . $username . "','" . $password . "','" . $email . "')";
	$query = mysql_query($insert);
	if($query)
	{
		echo "Thanks for registering. You may now login.";		
	}
	else
	{
		echo "Insert failed";		
	}
}	
?>