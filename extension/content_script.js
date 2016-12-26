//document.body.style.backgroundColor="red";
console.log("test");



var popup = document.createElement("div");
popup.className = "image_box";
popup.style.visibility="hidden";

// popup.className = "modal fade";
// popup.id = "myModal";
// popup.setAttribute("role","dialog");
// var dialog = document.createElement("div");
// dialog.className = "modal-dialog";
// var content = document.createElement("div");
// content.className = "modal-content";

// var header_1 = document.createElement("div");
// header_1.className = "modal-header";
// var close = document.createElement("button")
// close.className = "close";
// close.setAttribute("data-dismiss","modal");
// close.onclick = check;
// close.innerHTML = '&times;';
// var title = document.createElement("h4");
// title.className = "modal-title";
// title.innerHTML = "Modal Header";
// header_1.appendChild(close);
// header_1.appendChild(title);

// var body = document.createElement("div");
// body.className = "modal-body";
// var text = document.createElement("p");
// text.innerHTML = "Some text in the modal";
// body.appendChild(text);

// var footer = document.createElement("div");
// footer.className = "modal-footer";

// content.appendChild(header_1);
// content.appendChild(body);
// content.appendChild(footer);

// dialog.appendChild(content);
// popup.appendChild(dialog)

 // popup.style.top = "10%";
 // popup.style.left = "25%";
 // popup.style.position = "fixed";
 // popup.style.height = "50%";
 // popup.style.width = "50%";
 // popup.style.zIndex = "999";
 // popup.style.backgroundColor = "blue";
 // popup.style.visibility = "hidden";

 //popup.innerHTML = '  <div class="modal fade" id="myModal" role="dialog"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><button type="button" class="close" data-dismiss="modal">&times;</button><h4 class="modal-title">Modal Header</h4></div><div class="modal-body"><p>Some text in the modal.</p></div><div class="modal-footer"><button type="button" class="btn btn-default" data-dismiss="modal">Close</button></div></div></div></div>';
// modal_temp = document.createElement("div");
// modal_temp.className = "modal fade";
// modal_temp.id = "myModal";
// modal_temp.setAttribute("role","dialog");
// modal_temp.innerHTML = '<div class="modal-dialog"><div class="modal-content"><div class="modal-header"><button type="button" class="close" data-dismiss="modal">&times;</button><h4 class="modal-title">Modal Header</h4></div><div class="modal-body"><p>Some text in the modal.</p></div><div class="modal-footer"><button type="button" class="btn btn-default" data-dismiss="modal">Close</button></div></div></div>';

var keyword = document.createElement("input");
keyword.id="input";
keyword.className = "form-control";
var button = document.createElement("button");
button.className = "btn btn-primary btn-sm";
button.onclick = search;
button.innerHTML = "Go!"
var close = document.createElement("button")
close.className = "close";
close.setAttribute("data-dismiss","modal");
close.onclick = check;
close.innerHTML = '&times;';
popup.appendChild(close);
popup.appendChild(keyword);
popup.appendChild(button);
 console.log(popup);




function check(event){
    var ss = document.getElementsByClassName("_1osa mentionsHidden");
      
  for(var i = 0; i<ss.length;i++)
    {
      ss[i].focus();
    }
  if(popup.style.visibility === 'hidden'){
    popup.style.visibility = 'visible';
    document.getElementById("mainContainer").style.webkitFilter = "blur(10px)";
  } else {
    popup.style.visibility = 'hidden';
    document.getElementById("mainContainer").style.webkitFilter = "blur(0px)";
  }
    console.log(event.target.parentElement.parentElement);
}

var list = document.getElementsByClassName("UFICommentAttachmentButtons");


for(var i =0 ;i<list.length;i++)
{
  var output = document.createElement("button");
  output.innerHTML = "test";
  output.className = "picture_talk";
  // output.setAttribute("data-toggle","modal");
  // output.setAttribute("data-target","#myModal");
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

