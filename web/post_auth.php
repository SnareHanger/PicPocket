<?php

include 'config.php';

//Connection to DB
$con = mysql_connect($host,$db_user,$db_pwd) or die("MySQL Error: " . mysql_error());

if(!$con)
{
	echo "Failed to make connection.";
	echo json_encode(array('logged' => true, 'message' => "Failed to make connection."));
	exit;	
}

$db = mysql_select_db($db_name);
if(!$db)
{
	echo "Failed to select db.";
	exit;
}

$username = $_POST['username'];
$password = $_POST['password'];

$sql = "SELECT * FROM users WHERE username = '" . $username . "' AND password = '" . $password . "'";
$query = mysql_query($sql);

if(mysql_num_rows($query) > 0)
{
	$row = mysql_fetch_array($query);
	$response = array(
		'logged' => true,
		'name' => $row['name'],
		'email' => $row['email']
		);
	
	echo json_encode($response);
}
else
{
	$response = array(
		'logged' => false,
		'message' => 'Invalid Username and/or Password'	
	);
	echo json_encode($response);
}

?>