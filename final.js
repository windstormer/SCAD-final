
function search()
{
	var tag = document.getElementById("input").value;

var jsontree = null;
$.ajax({
    url: "http://coldegarage.tech/~demo1/curl.php",
    type: "GET",
    data:{
    	"tag":tag
    },
    dataType: 'JSON',
    success: function(result){
        jsontree = result;
        //console.log(jsontree);
        display(jsontree);
    },
    error:function(){
        alert('fail');
    }
});


}

function display(jsontree)
{
	if(jsontree!=null)
{
	var json = jsontree = JSON.stringify(jsontree);
	var obj = jQuery.parseJSON(json);
	var images = obj["images"];
	var keyword = obj["keyword"];

	var list = document.getElementById("list");
	
	for(var i =0; i < images.length; i++)
	{
	var img = document.createElement('img');
	img.src = images[i]["src"];
	$("#list").append(img);
	}
	

	//parse json
}else
	alert("No result");

}
