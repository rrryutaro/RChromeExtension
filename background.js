chrome.contextMenus.create({title: "コピー", id: "RCopy", contexts: ["all"]});

chrome.contextMenus.create({title: "タイトルコピー", parentId: "RCopy", contexts: ["all"], onclick: info=>{
  chrome.tabs.getSelected(null, tab=>{
	//const val = formatString("{0}", [tab.url, tab.title]);
	const val = {Url: tab.url, Title: tab.title};
	console.log(val);
  	AddSaveData("TITLE", val);
  });
}});

chrome.contextMenus.create({title: "オートコピー", parentId: "RCopy", contexts: ["all"], onclick: info=>{
  chrome.tabs.getSelected(null, tab=>{
    chrome.tabs.sendRequest(tab.id, {command: "Copy"}, response=>{
      const html = $(response.html)[0];
      switch (html.nodeName){
      	case "IMG":
      	  console.log(html.outerHTML);
      	  AddSaveData("IMG", html.outerHTML);
      	  break;
      	default:
      	  console.log(html.nodeName);
      	  if (html.innerText != null)
      	  	AddSaveData("TEXT", html.innerText);
      	  else
      	  	console.log(html.outerHTML);
      }
    });
  });
}});

chrome.contextMenus.create({title: "ここにアンカーを追加", contexts: ["all"], onclick: info=>{
  chrome.tabs.getSelected(null, tab=>{
    chrome.tabs.sendRequest(tab.id, {command: "AddAnchor"});
  });
}});

chrome.contextMenus.create({title: "ここを折りたたみ", contexts: ["all"], onclick: info=>{
  chrome.tabs.getSelected(null, tab=>{
    chrome.tabs.sendRequest(tab.id, {command: "AddDetails"});
  });
}});

chrome.extension.onRequest.addListener((request, sender, sendResponse)=>{
  if (request.command === "copyOptionPageData"){
  	console.log("hogehoge");
    sendResponse({});
  }
});

var copyToClipboard = val=>{ copyText(val); console.log(val); };