let hoverTarget;
let selectionTarget;
$("*").hover(e=>{
  hoverTarget = e.target;
},e=>{});
$("*").bind("contextmenu",()=>{
  if (selectionTarget !== hoverTarget){
    selectionTarget = hoverTarget;
  }
});
chrome.extension.onRequest.addListener((request, sender, sendResponse)=>{
  if (request.command==="Copy" & selectionTarget != null){
    sendResponse({"obj": $(selectionTarget)[0].outerHTML});
  }
});
