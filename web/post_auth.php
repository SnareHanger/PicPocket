<?php

include 'config.php';

//Connection to DB
$con = mysql_connect($host,$db_user,$db_pwd) or die("MySQL Error: " . mysql_error());

if(!$con)
{
	echo "Failed to make connection.";
	// echo json_encode(array('logged' => true, 'message' => "Failed to make connection."));
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

// $username = $_GET['username'];
// $password = $_GET['password'];

$sql = sprintf("SELECT * FROM Users WHERE username = '%s' AND password = '%s'", 
	mysql_real_escape_string($username), 
	mysql_real_escape_string($password));

// echo $sql;
	
$query = mysql_query($sql);

// echo "num rows: " . mysql_num_rows($query);

if(mysql_num_rows($query) > 0)
{
	$row = mysql_fetch_array($query);
	$response = array(
		'logged' => true,
		'username' => $row['username'],
		'email' => $row['email']
		);
	
	echo json_encode($response);
}
else
{
	$response = array(
		'logged' => false,
		'message' => 'Invalid Username and/or Password'	. $sql
	);
	echo json_encode($response);
}

?>