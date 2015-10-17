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
	$blurDir = $_SERVER['DOCUMENT_ROOT'].'/images/blur';
	$files = glob($dir . '/*.*');
	$file = array_rand($files);
	
	$imageurl = "http://{$_SERVER['SERVER_NAME']}/images/" . rawurlencode(substr($files[$file], strlen($dir)+1) );
	// $json = {'{$imageurl}'};
	$data = file_get_contents($files[$file]);
	$type = pathinfo($files[$file], PATHINFO_EXTENSION);
	$json = array(
        'imageURL' => $imageurl,
				'encodedImage' => encodeImageToBase64($files[$file]),
				'bluredImage' => getBluredImage($files[$file], substr($files[$file], strlen($dir)+1), $blurDir)
	);
	$json_str = json_encode($json);
	echo $_GET['callback'] . '(' . json_encode($json) . ')';
	
	function encodeImageToBase64($path) {
		$data = file_get_contents($path);
		$type = pathinfo($path, PATHINFO_EXTENSION);
		$image = base64_encode($data);
		return array(
			'data:image/' . $type . ';base64,' . $image
		);
	}
	
	// Path is the full path to the file
	// Filename is the name of the file
	// blurPath is the directory where the generated blurred files are stored
	function getBluredImage($path, $filename, $blurPath) {
		// If the blurred image has not been generated yet, generate it
		if( !file_exists($blurPath . '/' . $filename)) {
			$type = pathinfo($path, PATHINFO_EXTENSION);
			
			$image = new Imagick($path);
			$blurAmount = $image->getImageWidth() * 0.08;
			
			$imageWidth = $image->getImageWidth();

			$image->scaleImage($imageWidth * 0.5, 0);
			$image->blurImage($blurAmount, 40);
			// brightness, saturation, hue
			// $image->modulateImage(150, 100, 100);
			$image->scaleImage($imageWidth, 0);
			$image->writeImage($blurPath . '/' . $filename);
		}
		
		return encodeImageToBase64($blurPath . '/' . $filename);
	}
?>
