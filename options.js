$(()=>{
  chrome.storage.sync.get(["CopyData"],items=>{
    items.CopyData.forEach(x=>{
      const tbl = $("#copyTable");
      switch (x.Type){
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
