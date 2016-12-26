chrome.browserAction.onClicked.addListener(function(tab) {
  //window.postMessage({ type: "FROM_PAGE", text: "Hello from the webpage!" }, "*");
  chrome.tabs.executeScript({
        file: 'jquery-3.1.1.js'
    });
  chrome.tabs.executeScript(null,{
  	file: "content_script.js"
    //code: 'document.body.style.backgroundColor="blue"'
  	});
  chrome.tabs.insertCSS(null, {
  	file: "mystyle.css"
  	});
  chrome.tabs.executeScript({
        file: 'js/bootstrap.js'
  	});
  chrome.tabs.executeScript({
        file: 'js/bootstrap.min.js'
  	});
  // chrome.tabs.insertCSS(null, {
  // 	file: "css/bootstrap.css"
  // 	});
  // chrome.tabs.insertCSS(null, {
  // 	file: "css/bootstrap.min.css"
  // 	});
  chrome.tabs.insertCSS(null, {
  	file: "css/bootstrap-theme.css"
  	});
  chrome.tabs.insertCSS(null, {
  	file: "css/bootstrap-theme.min.css"
  	});

});
