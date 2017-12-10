//現在マウスホバー中の要素
let hoverTarget;
//コンテキストメニューを開いた際にマウスホバーしていた要素
let selectionTarget;
//アンカー追加用のカウント
let addAnchorCount = 0;

//マウスホバー中の要素を保持する
$("*").hover(e=>{
  hoverTarget = e.target;
},e=>{});

//コンテキストメニューを開いた際にマウスホバー中の要素を保持する
$("*").bind("contextmenu",()=>{
  if (selectionTarget !== hoverTarget){
    selectionTarget = hoverTarget;
  }
});

//オートコピー
chrome.extension.onRequest.addListener((request, sender, sendResponse)=>{
  if (request.command === "Copy" & selectionTarget != null){
    sendResponse({"html": $(selectionTarget)[0].outerHTML});
  }
});

chrome.extension.onRequest.addListener((request, sender, sendResponse)=>{
  //アンカーを追加する
  if (request.command === "AddAnchor" & selectionTarget != null){
    var target = $(selectionTarget)[0];

    var linkName = "AddAnchor" + ++addAnchorCount;
    var displayName = target.outerText.substr(0, 10);

    target.innerHTML = "<a name='" + linkName + "'></a>" + target.innerHTML;

    var newAnchor = document.createElement("a");
    newAnchor.innerHTML = "<a href=#" + linkName + ">" + displayName + "</a>";
    $(document.body).before(newAnchor)
  }
  //ディスクロージャー・ウィジェットを追加する
  if (request.command === "AddDetails" & selectionTarget != null){
    var target = $(selectionTarget)[0];
    var summary = target.outerText.substr(0, 20);
    target.innerHTML = "<details><summary>" + summary + "</summary><div>" + target.innerHTML + "</div></details>";
  }
});
