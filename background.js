chrome.contextMenus.create({title: "コピー", onclick: info=>{
  chrome.tabs.getSelected(null, tab=>{
    chrome.tabs.sendRequest(tab.id, {command: "Copy"}, response=>{
      console.log(response.text);
      const txt = $("#text");
      txt.val(response.text);
      txt.select();
      document.execCommand("copy");
    });
  });
}});