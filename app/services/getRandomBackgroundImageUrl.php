<?php
//	require($_SERVER['DOCUMENT_ROOT'].'/session.php');
//	if(isset($redirect) && $redirect) {
//		echo "session expired";
//		die();
//	}
//	echo $redirect;
//	if(isset($_GET['initial']) && $_GET['initial'] == "true") {
//		echo "/blank/blank.png";
//		die();
//	}
	$dir = $_SERVER['DOCUMENT_ROOT'].'/images';
	$files = glob($dir . '/*.*');
	$file = array_rand($files);
	
	$imageurl = "http://{$_SERVER['SERVER_NAME']}/images/".substr($files[$file], strlen($dir)+1);
	// $json = {'{$imageurl}'};
	$json = array(
        'image' => $imageurl
	);
	$json_str = json_encode($json);
	// echo $json_str;
	//header("Content-Type: application/json");
    echo $_GET['callback'] . '(' . "{'image' : '{$imageurl}'}" . ')';
	// echo $imageurl;
?>
