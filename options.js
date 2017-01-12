const tagTbl1 = "<tr><td>{0}</td><td>{1}</td></tr>"
const fsTbl1 = '<input type="image" id="btnCopy" src="copy_16.png" alt="コピー" value="{0}"><input type="image" id="btnRemove" src="trash_16.png" alt="削除" value="{1}">'
const fs = (fmt, ary)=>{ return formatString(fmt, ary); }
$(()=>{
  chrome.storage.sync.get(["CopyData"],items=>{
    let index = items.CopyData.length - 1;
    items.CopyData.reverse().forEach(x=>{
      const tbl = $("#copyTable");
      switch (x.Type){
        case "TITLE":
          tbl.append(fs(tagTbl1, [fs(fsTbl1, [fs("[{0}]({1})", [x.Data.Url, x.Data.Title]), index--]), fs("<a href={0}>{1}</a>", [x.Data.Url, x.Data.Title])]));
          break;
      	case "IMG":
      	  tbl.append(fs(tagTbl1, [fs(fsTbl1, [x.Data, index--]), x.Data]));
      	  break;
      	default:
      	  tbl.append(fs(tagTbl1, [fs(fsTbl1, [escapeHtml(x.Data), index--]), fs("<pre>{0}</pre>", [escapeHtml(x.Data)])]));
      	  break;
      }
    });
    $("input[type='image']").on("click", (x)=>{
      if (x.target.id==="btnCopy") {
        //copyText(x.target.value);
        chrome.extension.getBackgroundPage().copyToClipboard(x.target.value);
      } else {
        removeCopyData(x.target.value);
        location.reload();
      }
    });
  });
});
