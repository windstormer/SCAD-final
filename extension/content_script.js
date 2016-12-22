console.log("test!!!");

var output = document.createElement("button");
output.innerHTML = "test";
output.className = "picture_talk";


function check(){
  alert("hello");
}



$(".UFICommentAttachmentButtons").append(output);

input = document.getElementsByClassName("picture_talk");
for (var i = input.length - 1; i >= 0; i--) {
	input[i].onclick = check;
}
