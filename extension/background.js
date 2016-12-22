chrome.browserAction.onClicked.addListener(function(tab) {
  //window.postMessage({ type: "FROM_PAGE", text: "Hello from the webpage!" }, "*");
  chrome.tabs.executeScript({
        file: 'jquery-3.1.1.js'
    });
  chrome.tabs.executeScript(null,{
  	file: "content_script.js"
    //code: 'document.body.style.backgroundColor="blue"'
  });

});
