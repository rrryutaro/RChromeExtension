let selectionTarget;
let selectionText;
$("*").hover(e=>{
  selectionTarget = e.target;
},e=>{});
$("*").bind("contextmenu",()=>{
  selectionText = selectionTarget.innerText;
});
chrome.extension.onRequest.addListener((request, sender, sendResponse)=>{
  if (request.command==="Copy")
    sendResponse({"text": selectionText});
});
