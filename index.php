<!DOCTYPE html>
<head>
	<title>Pi Web Interface</title>
	<meta name="robots" content="noindex">
  <meta name="description" content="Pi Web Interface">
	<meta name="keywords" content="HTML,html,htm,PHP,php,JavaScript,Javascript,javascript,pi,Pi,Web,web,Interface,interface,Project,project">
	<meta name="author" content="Anthony Atkinson">
  <meta charset="UTF-8">
	<link rel="stylesheet" type="text/css" href="default.css">
</head>
<script src="http://code.jquery.com/jquery-1.9.1.js"></script>
<script src="scripts.js"></script>
<body>
	<?php require($_SERVER['DOCUMENT_ROOT'].'/session.php'); ?>
	<?php require($_SERVER['DOCUMENT_ROOT'].'/background.php'); ?>
	<?php require($_SERVER['DOCUMENT_ROOT'].'/overlay.php'); ?>
	<span id="session_expired"></span>
</body>