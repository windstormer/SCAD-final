<?php 
$token = "12d373694649e2e696c52a5cf453f7e1e6dafd25";
$problemCode = $_POST['qid'];
$source = $_POST['code'];
$tag = $_GET['tag'];
$compilerId = "11";
$userId = "";

	// Post Submission
	header('Access-Control-Allow-Origin: *');  
	$ch = curl_init("http://www.ghostisland.com.tw/picwar/?keyword=".$tag."&page=1");
	curl_setopt($ch, CURLOPT_POST, TRUE);
	curl_setopt($ch, CURLOPT_HTTPHEADER, array("Content-Type: application/json"));
	curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode(array(
		"problemCode"=>$problemCode,
		"compilerId"=>$compilerId,
		"source"=>$source
	)));
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);
	$result = curl_exec($ch);
	if(curl_errno($ch)){
		echo("Err_Submission_Post");
		echo curl_errno($ch);
	}
	curl_close($ch);
	echo $result;
/*

	$result=json_decode($result, true);
	$id = $result['id'];

	sleep(10);
	$processed = false;
	$cnt = 0;

	// Get Submission Result 
	while(!$processed){
		$ch = curl_init("http://problems.sphere-engine.com/api/v3/submissions/".$id."?access_token=".$token);
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
		curl_setopt($ch, CURLOPT_HTTPHEADER, array("Content-Type: application/json"));
		
		$result = curl_exec($ch);
		if(curl_errno($ch)){
			echo("Err_Submission_Get");
			echo curl_errno($ch);
		}
		$result = json_decode($result, true);
		curl_close($ch);
		
		if($result["status"]>10){
			$processed = true;
		}
		if($cnt >= 5){
			break;
		}

		sleep(5);
		$cnt++;
	}

	if($result["status"]==15){
		echo "true";
	}
	else{
		echo "false";
	}
*/
	?>