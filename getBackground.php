<?php
	if(isset($_GET['initial']) && $_GET['initial'] == "true") {
		echo "/blank/blank.png";
		die();
	}
	$dir = $_SERVER['DOCUMENT_ROOT'].'/images';
	$files = glob($dir . '/*.*');
	$file = array_rand($files);
	echo "/images/".substr($files[$file], strlen($dir)+1);
?>