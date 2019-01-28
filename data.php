<?php
ini_set('display_errors', 0);
ini_set('display_startup_errors', 0);
error_reporting(E_ALL);
header('Content-Type: application/json');




switch ($_GET['page']) {
    case 551:
        $result = getData('https://api.www.svenskaspel.se/external/draw/stryktipset/draws/result');
       	checkForcast((intval($result->result->drawNumber)+1),'stryktipset',48);
       	showResult($result->result,'/result');
		break;
    case 552:
        $result = getData('https://api.www.svenskaspel.se/external/draw/stryktipset/draws/');
        //print_r($result);
        showResult($result->draws[0],'/draws');
        break;
     case 553:
        $result = getData('https://api.www.svenskaspel.se/external/draw/europatipset/draws/result');
        checkForcast((intval($result->result->drawNumber)+1),'europatipset',48);
       	showResult($result->result,'/result');
        break;
     case 554:
        $result = getData('https://api.www.svenskaspel.se/external/draw/europatipset/draws/');
        showResult($result->draws[0],'/draws');
        break;
     case 590:
     	if(date('w') == 6 && date('H') > 19)
     		$d = date('Y-m-d');
     	else
     		$d =  date('Y-m-d', strtotime("last Saturday"));
        $result = getData('https://api.www.svenskaspel.se/external/draw/sportkrysset/draws/resultbydate/'.$d);
        showResult($result->result,'/sportkrysset');
        break;
     case 888:
        $result = getData('https://api.www.svenskaspel.se/external/draw/topptipsetstryk/draws/result');
        showResult($result->results,'/result');
        break;
      case 999:
        $result = getData('https://api.www.svenskaspel.se/external/draw/topptipseteuropa/draws/result');
        showResult($result->results,'/result');
        break;
}


function checkForcast($drawNumber,$league,$hours){
	$forecast = getData('https://api.www.svenskaspel.se/external/draw/'.$league.'/draws/'.$drawNumber.'/forecast');
	//$forecast = getData('https://api.spela.svenskaspel.se/external/draw/stryktipset/draws/4580/forecast');
	
	//print_r($forecast );

	if(!isset($forecast->error->code))
		showResult($forecast->forecast,'/forecast');

	$draws =getData('https://api.www.svenskaspel.se/external/draw/'.$league.'/draws/');
	if(timeDiff(date("Y-m-d H:i:s"),$draws->draws[0]->closeTime) < $hours)
		showResult($draws->draws[0],'/draws');
 

}



function showResult($result,$type){
	$result->dataType = $type;
	$long = ["Manchester U", "Sheffield W", "Manchester C","Huddersfield","Birmingham","Wolverhampton","Aston Villa", "Middlesbrough", "Bournemouth","Valladolid","Mönchengladbach", "Rayo Vallecano","Real Sociedad"];
	$short   = ["Manch.U", "Sheff.W", "Manch.C","Huddersf.","Birmingh.","Wolverh.", "Aston V.","Middlesbr","Bournem.","Valladol.","M gladb.","Vallecano","Sociedad"];
	


	echo str_replace($long, $short, json_encode($result));
	exit;
}


//print_r(json_decode($result)->draws[0]->drawNumber);

//



function getData($url){

	$url .= '?accesskey=848b972f-422b-4618-add0-1071841f601e';
	//echo($url);
	$ch = curl_init();
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
	curl_setopt($ch, CURLOPT_URL,$url);
	$result=curl_exec($ch);
	curl_close($ch);

	return json_decode($result);

}



function timeDiff($firstTime,$lastTime) {
    $firstTime=strtotime($firstTime);
    $lastTime=strtotime($lastTime);
    $timeDiff=$lastTime-$firstTime;
    return round($timeDiff/3600);
}


/*
if($_GET['page'] == '552' && $_GET['getDraw'] == 'true')
	 saveDrawNumber('stryktipset',json_decode($result)->draws[0]->drawNumber);

if($_GET['page'] == '554' && $_GET['getDraw'] == 'true')
	 saveDrawNumber('europatipset',json_decode($result)->draws[0]->drawNumber);




function saveDrawNumber($file,$drawNumber){
	 $file = 'vars/'.$file .'.txt';
	 $fp = fopen($file, 'w');
	 fwrite($fp, $drawNumber);
	 fclose($fp);
}


function getDrawNumber($file){
	$file = 'vars/'.$file .'.txt';
	return file_get_contents($file, true);
}
*/
?>