
function search()
{
	var tag = document.getElementById("input").value;
var jsontree = [];
$.ajax({
    url: "http://coldegarage.tech/~demo1/curl.php",
    type: "GET",
    dataType: 'JSONP',
    success: function(result){
    	alert("success");
        jsontree = result;
    },
    error:function(){
        alert('fail');
    }
});


	

}
