chrome.contextMenus.create({title: "コピー", onclick: ()=>{
  //const elm = $(":hover");
  //console.log(elm.prevObject[0]);
  //document.execCommand("copy");
  chrome.extension.sendRequest({command: "test", data: "hoge" });
  chrome.runtime.sendMessage(
  	{type: "add", value: "hoge"},
  	function(response){
  		if(response){
  			console.log("hogegege");
  		}
  	}
  );
}});
//chrome.contextMenus.create({title: "Test2", onclick: ()=>{
//  console.log("Test2");
//}});
