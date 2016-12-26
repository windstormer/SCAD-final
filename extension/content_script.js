console.log("test!!!");



var popup = document.createElement("div");
popup.className = "image_box";
popup.style.top = "10%";
popup.style.left = "25%";
popup.style.position = "fixed";
popup.style.height = "50%";
popup.style.width = "50%";
popup.style.zIndex = "999";
popup.style.backgroundColor = "blue";
popup.style.visibility = "hidden";
var keyword = document.createElement("input");
keyword.id="input";
var button = document.createElement("button");
button.onclick = search;
button.innerHTML = "Go!"
popup.appendChild(keyword);
popup.appendChild(button);





function check(event){
  if(popup.style.visibility === 'hidden'){
    popup.style.visibility = 'visible';
  } else {
    popup.style.visibility = 'hidden';
  }
  console.log(event.target.parentElement.parentElement);

}

var list = document.getElementsByClassName("UFICommentAttachmentButtons");

for(var i =0 ;i<list.length;i++)
{
  var output = document.createElement("button");
  output.innerHTML = "test";
  output.className = "picture_talk";
  if(list[i].childNodes.length==2)  //prevent from append more than one time
    list[i].appendChild(output);
}

$("body").append(popup);

input = document.getElementsByClassName("picture_talk");
for (var i = input.length - 1; i >= 0; i--) {
	input[i].onclick = check;
}


function search()
{
  var tag = document.getElementById("input").value;
  console.log(tag);

var jsontree = null;
$.ajax({
    url: "https://coldegarage.tech/~demo1/curl.php",
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
  $(".image_box").append(img);
  }
  

  //parse json
}else
  alert("No result");

}

