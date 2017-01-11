$(()=>{
  chrome.storage.sync.get(["CopyData"],items=>{
    items.CopyData.reverse().forEach(x=>{
      const tbl = $("#copyTable");
      switch (x.Type){
        case "TITLE":
          tbl.append(formatString("<tr><td><a href={0}>{1}</a></td></tr>", [x.Data.Url, x.Data.Title]));
          break;
      	case "IMG":
      	  tbl.append(formatString("<tr><td>{0}</td></tr>", [x.Data]));
      	  break;
      	default:
      	  tbl.append(formatString("<tr><td><pre>{0}</pre></td></tr>", [x.Data]));
      	  break;
      }
    });
  });
});
