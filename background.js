chrome.contextMenus.create({title: "コピー", onclick: (info)=>{
  chrome.tabs.getSelected(null, function(tab) {
    chrome.tabs.sendRequest(tab.id, {command: "test", data: "hoge" }, (response)=>{
  	  console.log(response);
    });
  });
}});
//chrome.contextMenus.create({title: "Test2", onclick: ()=>{
//  console.log("Test2");
//}});
