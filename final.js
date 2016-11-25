
function search()
{
	var tag = document.getElementById("input").value;
	var targeturl = "http://www.ghostisland.com.tw/picwar/?keyword="+tag+"&page=1";
	console.log(targeturl);

	
		$.ajax({
	url: "http://www.google.com",
	dataType: 'jsonp',
	crossDomain: true,
	headers: { 'Access-Control-Allow-Origin': '*' },
	success:function(json){
        alert("Success");
    },
	error:function(){
        alert("Error");
    }  
});

}
