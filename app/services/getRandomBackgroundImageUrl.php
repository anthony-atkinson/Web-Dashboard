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
	
	$imageurl = "http://{$_SERVER['SERVER_NAME']}/images/" . rawurlencode(substr($files[$file], strlen($dir)+1) );
	// $json = {'{$imageurl}'};
	$data = file_get_contents($files[$file]);
	$type = pathinfo($files[$file], PATHINFO_EXTENSION);
	$json = array(
        'imageURL' => $imageurl,
				'encodedImage' => encodeImageToBase64($files[$file])
	);
	$json_str = json_encode($json);
	// echo $json_str;
	//header("Content-Type: application/json");
    // echo $_GET['callback'] . '(' . "{'image' : '{$imageurl}'}" . ')';
    echo $_GET['callback'] . '(' . json_encode($json) . ')';
	// echo $imageurl;
	
	function encodeImageToBase64($path) {
		$data = file_get_contents($path);
		$type = pathinfo($path, PATHINFO_EXTENSION);
		$image = base64_encode($data);
		return array(
			'data:image/' . $type . ';base64,' . $image
		);
	}
?>
