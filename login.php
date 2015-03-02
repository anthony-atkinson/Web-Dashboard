<!DOCTYPE html>
<?php
	$username = "pi";
	$password = "piIsAwesome";
	session_start();
	if(isset($_POST['submit']) && $_POST['submit']) {
		if($_POST['username'] == $username) {
			$_SESSION['username'] = $_POST['username'];
		}
		if($_POST['password'] == $password) {
			$_SESSION['password'] = $_POST['password'];
		}
		if($_POST['username'] == $username && $_POST['password'] == $password) {
			header('Location: /'); // Redirecting To Main Page
		}
		//echo "Username: {$_SESSION['username']} <br/>Password: {$_SESSION['password']} <br/>";
	} ?>
<head>
	<title>Login -- Pi Web Interface</title>
	<meta name="robots" content="noindex">
  <meta name="description" content="Pi Web Interface">
	<meta name="keywords" content="HTML,html,htm,PHP,php,JavaScript,Javascript,javascript,pi,Pi,Web,web,Interface,interface,Project,project">
	<meta name="author" content="Anthony Atkinson">
	<link rel="stylesheet" type="text/css" href="default.css">
</head>
<script src="http://code.jquery.com/jquery-1.9.1.js"></script>
<script src="scripts.js"></script>
<body>
	<style>
		body {
			background-color:white;
		}
	</style>
	<h3 style="text-align:center;">Session expired. Please login.</h3>
	<div id="homeContent">
		<div id="homeTitle">
			<form class="login" action="" method="post">
				<div class="form_align">
					<label>Username: </label>
					<input type="text" name="username">
				</div>
				<div class="form_align">
					<label>Password: </label>
					<input type="password" name="password">
				</div>
				<div id="center_button">
					<input type="reset" value="Reset">
					<input type="submit" name="submit" value="Submit">
				</div>
			</form>
		</div>
	</div> <!-- homeContent end -->
</body>