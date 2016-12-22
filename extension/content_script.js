console.log("test!!!");

var output = document.createElement("button");
output.innerHTML = "test";
output.className = "picture_talk";


function check(){
  //alert("hello");
  var popup = document.createElement("div");
  popup.className = "hi";
  popup.style.top = "0";
  popup.style.position = "fixed";
  popup.style.height = "50%";
  popup.style.width = "50%";
  popup.style.zIndex = "999";
  popup.style.backgroundColor = "blue";

  $("body").append(popup);
}


var buttons = $(".UFICommentAttachmentButtons");
buttons.append(output);

input = document.getElementsByClassName("picture_talk");
for (var i = input.length - 1; i >= 0; i--) {
	input[i].onclick = check;
}


function search()
{
  var tag = document.getElementById("input").value;

var jsontree = null;
$.ajax({
    url: "http://coldegarage.tech/~demo1/curl.php",
    //url: "http://140.114.206.88/curl.php",
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
