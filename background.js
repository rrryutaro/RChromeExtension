chrome.contextMenus.create({title: "コピー", id: "RCopy", contexts: ["all"]});

chrome.contextMenus.create({title: "タイトルコピー", parentId: "RCopy", contexts: ["all"], onclick: info=>{
  chrome.tabs.getSelected(null, tab=>{
  	let format="[{1}]({0})";
  	//chrome.storage.sync.get(["CopyFormat"],items=>{
  	//  const data = items.CopyFormat;
  	//  if (data == null){ format = "[{1}]({0})"; }
  	//  else { format = data.CopyFormat[data.SelectedIndex]; }
  	//});
	const val = formatString(format, [tab.url, tab.title]);
  	//console.log(val);
  	AddSaveData(val);
  	const txt = $("#text");
  	txt.val(val);
  	txt.select();
  	document.execCommand("copy");
  });
}});

chrome.contextMenus.create({title: "オートコピー", parentId: "RCopy", contexts: ["all"], onclick: info=>{
  chrome.tabs.getSelected(null, tab=>{
    chrome.tabs.sendRequest(tab.id, {command: "Copy"}, response=>{
      const html = $(response.obj)[0]; 
      console.log(html);
      console.log(html.innerText);
      switch (html.nodeName){
      	case "IMG":
      	  console.log(html.outerHTML);
      	  AddSaveData("IMG", html.outerHTML);
      	  break;
      	default:
      	  console.log(html.nodeName);
      	  if (html.innerText != null)
      	  	AddSaveData("TEXT", html.innerText);
      }
    });
  });
}});
