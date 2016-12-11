<?php
header('Access-Control-Allow-Origin: *');
include('simple_html_dom.php');

$tag = $_GET['tag'];

$html = file_get_html('http://www.ghostisland.com.tw/picwar/?keyword='.$tag);

$js_array = array();
$js_array["keyword"] = $tag;

$img_array = array();
foreach($html->find('div.grid-item div.ibox div.ibox-content') as $e){
	foreach($e->find('a img') as $image)
		$img["src"] = "http://www.ghostisland.com.tw" . $image->src;
	foreach($e->find('h4') as $text){
    	$img["name"] = $text->innertext;
    	$img["name"] = trim($img["name"]);
	}
    array_push($img_array, $img);
}
$js_array["images"] = $img_array;

echo(json_encode($js_array));
?>