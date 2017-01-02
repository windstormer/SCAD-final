//document.body.style.backgroundColor="red";
console.log("test");



var popup = document.createElement("div");
popup.className = "image_box";
popup.style.visibility = "hidden";



var keyword = document.createElement("input");
keyword.id = "input";
keyword.className = "form-control";
keyword.setAttribute("placeholder","Search picture from 鄉民來圖戰")
keyword.addEventListener('keypress', function (e) {
    var key = e.which || e.keyCode;
    if (key === 13) { // 13 is enter
      // code for enter
      search();
    }
});
var title = document.createElement("div");
top.className = "title";
var button = document.createElement("button");
button.className = "btn btn-primary btn-sm";
button.onclick = search;
button.innerHTML = "GO"

var close = document.createElement("button");
close.className = "close";
close.setAttribute("data-dismiss", "modal");
close.onclick = check;
close.innerHTML = '&times;';
title.appendChild(close);
title.appendChild(keyword);
title.appendChild(button);
var pic_list = document.createElement("div");
pic_list.className = "pic_list";
popup.appendChild(title)
popup.appendChild(pic_list);
// console.log(popup);

var cur_place;


function check() {
	var ss = document.getElementsByClassName("_1osa mentionsHidden");

	for (var i = 0; i < ss.length; i++) {
		ss[i].focus();
	}
	if (popup.style.visibility === 'hidden') {
		popup.style.visibility = 'visible';
		popup.style.overflowY = 'scroll';
		document.getElementById("mainContainer").style.webkitFilter = "blur(10px)";
	} else {
		popup.style.visibility = 'hidden';
		popup.style.overflowY = 'hidden';
		document.getElementById("mainContainer").style.webkitFilter = "blur(0px)";
		// $(".pic_list")[0].innerHTML = "";
		// var myNode = document.getElementsByClassName("image_box")[0];
	 //    while (myNode.firstChild) {
	 //      myNode.removeChild(myNode.firstChild);
	 //    }
	 //    myNode.appendChild(close);
	 //    myNode.appendChild(keyword);
	 //    myNode.appendChild(button);

	}
}

$("body").append(popup);
var clipboard;
function addButton() {
	var list = document.getElementsByClassName("UFICommentAttachmentButtons");


	for (var i = 0; i < list.length; i++) {
		var output = document.createElement("button");
		output.innerHTML = "PIC";
		output.className = "picture_talk";// btn-info";
		// output.setAttribute("data-toggle","modal");
		// output.setAttribute("data-target","#myModal");
		if (list[i].childNodes.length == 2) //prevent from append more than one time
			list[i].appendChild(output);
	}


	input = document.getElementsByClassName("picture_talk");
	for (var i = input.length - 1; i >= 0; i--) {
		input[i].onclick = check;
	}
}

var interval = setInterval(addButton, 500);

function search() {
	$(".pic_list")[0].innerHTML = "";
	var tag = document.getElementById("input").value;
	console.log(tag);

	var jsontree = null;
	if(clipboard!=null)
		delete clipboard;
	$.ajax({
		url: "https://coldegarage.tech/~demo1/curl.php",
		type: "GET",
		data: {
			"tag": tag
		},
		dataType: 'JSON',
		success: function(result) {
			jsontree = result;
			display(jsontree);
		},
		error: function() {
			alert('fail');
		}
	});


}

function display(jsontree) {
	if (jsontree != null) {
		var json = jsontree = JSON.stringify(jsontree);
		var obj = jQuery.parseJSON(json);
		var images = obj["images"];
		var keyword = obj["keyword"];

		var list = document.getElementById("list");

		for (var i = 0; i < images.length; i++) {
			var img = document.createElement('img');
			img.className = "img-rounded";
			img.src = images[i]["src"];
			img.setAttribute("data-clipboard-text",images[i]["src"]);
			img.onclick=check;
			$(".pic_list").append(img);
		}
		if(clipboard==null)
			clipboard = new Clipboard(".img-rounded");
	// clipboard.on('success', function(e) {
	//     console.info('Action:', e.action);
	//     console.info('Text:', e.text);
	//     console.info('Trigger:', e.trigger);

	//     e.clearSelection();

	// });

	// clipboard.on('error', function(e) {
	//     console.error('Action:', e.action);
	//     console.error('Trigger:', e.trigger);
	// });

	} else
		alert("No result");

}

