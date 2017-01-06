//Mouse orver
//$("*").hover(
//  function(e){
//    let elm = e.target;
//  	console.log(elm.innerText);
//  	//elm.innerText.select();
//    //document.execCommand("copy");
//  },
//  function(e){
//  }
//);

//chrome.runtime.onMessage.addListener(
//	function(request, sender, sendResponse){
//		alert("hoge");
//		switch(request.type){
//			case 'add':
//				console.log("add");
//				break;
//		}
//	}
//);

//[chrome.runtime.sendMessageでcontent_scriptsとbackground間で通信する方法 | Black Everyday Company](http://kuroeveryday.blogspot.jp/2015/06/ChromeExtensionssendMessage.html)
//[chrome拡張機能 > background.jsからcontentscript.jsにメッセージを送る方法 · For myself tomorrow](https://tigawa.github.io/blog/2013/10/13/chrome-extensions-message/)
//[Chrome Extensionの作り方講座その４・popupとContent Scriptを連携させてみる | ogatism](https://ogatism.jp/chrome_ext_4/)
chrome.extension.onRequest.addListener(
	function (request, sender, sendResponse) {
		sendResponse($(":hover"));
		//sendRequest({A: $(":hover"), B: "hoge"});
	}
);


//chrome.extension.onRequest.addListener(
//    function (request, sender, sendResponse) {
//        if (request.command != "copyfixerCopy")
//        	return;
//        let e = document.getElementById('clipboardArea');
//        e.value = request.data;
//        e.select();
//        document.execCommand("copy");
//    }
//);

//(function(callback){
//	let script = document.createElement("script");
//	script.textContent = "(" + callback.toString() + ")();";
//	document.body.appendChild(script);
//})(function(){
//	function canselEvent(e){
//		e.stopPropagation();
//		e.preventDefault();
//		return false;
//	}
//	document.addEventListener("keydown", function(e){
//		switch(e.which){
//			case 0:
//				console.log("hoge");
//				break;
//		}
//		console.log(e.which);
//	})
//})

//window.addEventListener('keydown', copyfixer, true);
//function copyfixer(event) {
//    if (event.keyCode != 67) return;
//    var isWin = (navigator.platform.indexOf("Win") != -1);
//    var isMac = (navigator.platform.indexOf("Mac") != -1);
//    if ((! isMac && ! event.ctrlKey) || (isMac && ! event.metaKey)) return;
//    if (isSelected()) return;
//    var crlf  = isWin ? "\r\n" : "\n";
//    var txt   = document.title + crlf + document.location.href + crlf + crlf;
//    chrome.extension.sendRequest({command: "copyfixerCopy", data: txt });
//}
//function isSelected() {
//    var sel = window.getSelection();
//    if (sel.rangeCount <= 0) return false;
//    if (sel.rangeCount > 1)  return true;
//
//    var range = sel.getRangeAt(0);
//    if (! range.collapsed) return true;
//    if (range.startContainer != range.endContainer) return true;
//    if (range.startOffset    != range.endOffset)    return true;
//    if (document.activeElement.tagName.toLowerCase() != "body") return true;
//
//    return false;
//}
