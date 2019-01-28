<?php

$domain = explode(".",$_SERVER['SERVER_NAME']);
$page = $domain[count($domain)-3];



?>

<!doctype html>
<html class="no-js" lang="">

<head>
  <meta charset="utf-8">
  <meta http-equiv="x-ua-compatible" content="ie=edge">
  <title>SvS Text <?php echo $page ?></title>
  <meta name="description" content="">
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=yes">
  <link rel="apple-touch-icon" href="icon.png">
  <link rel="stylesheet" href="css/normalize.css">
  <link rel="stylesheet" href="css/main.css">

</head>

<body onload="init_<?php echo $page ?>()">
  

    <div class="container">
	    <div class="coupon" id="coupon">
	    	<div class="tableTop" id="tableTop">
	    		<div class="left"><?php echo $page ?> SvS Text</div>
	    		<div class="right" id="today"></div>
	    	</div>

        <div class="main_coupon" id="main"></div>

	    

	    </div>
  </div>

  <script src="js/vendor/modernizr-3.6.0.min.js"></script>
  <script src="https://code.jquery.com/jquery-3.3.1.min.js" integrity="sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8=" crossorigin="anonymous"></script>
  <script>window.jQuery || document.write('<script src="js/vendor/jquery-3.3.1.min.js"><\/script>')</script>
  <script src="js/moment.js"></script>
  <script src="js/main.js"></script>

<!-- Global site tag (gtag.js) - Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=UA-122321102-3"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'UA-122321102-3');
  var page = <?php echo $page ?>
  //intV = setInterval(init_<?php echo $page ?>, 60000);

</script>


</body>

</html>






