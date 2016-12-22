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



function check(){
  if(popup.style.visibility === 'hidden'){
    popup.style.visibility = 'visible';
  } else {
    popup.style.visibility = 'hidden';
  }
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

