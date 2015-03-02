<?php
	require($_SERVER['DOCUMENT_ROOT'].'/session.php');
	if(isset($redirect) && $redirect) {
		echo "session expired";
		die();
	}
	echo $redirect;
	if(isset($_GET['initial']) && $_GET['initial'] == "true") {
		echo "/blank/blank.png";
		die();
	}
	$dir = $_SERVER['DOCUMENT_ROOT'].'/images';
	$files = glob($dir . '/*.*');
	$file = array_rand($files);
	echo "/images/".substr($files[$file], strlen($dir)+1);
?>