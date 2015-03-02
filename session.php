<?php
	$client_ip = $_SERVER['REMOTE_ADDR'];
	$ip_array = explode('.', $client_ip);
	$match = $ip_array[0].".".$ip_array[1];
	if($match != "192.168") {
		$username = "pi";
		$password = "piIsAwesome";
		session_start();
		if($_SESSION['username'] != $username || $_SESSION['password'] != $password) {
			session_destroy();
			$redirect = true;
		}
	}
?>