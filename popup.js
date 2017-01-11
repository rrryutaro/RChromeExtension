const saveDataName = "SaveData";
$(function(){
  //クリップボードへのコピーボタンクリック {0}:URL　{1}:タイトル
  $("#Copy").on("click", ()=>{
    chrome.tabs.getSelected(null, function(tab){
      copyText(formatString($("#CopyFormat > option:selected").text(), [tab.url, tab.title]));
    });
  });
  //リストへの要素の追加
  const addCopyFormat = (str)=>{
    const list = $("#CopyFormat");
    list.append($("<option>").text(str).val(list.children().length+1));
  }
  $("#Add").on("click", ()=>{
    console.log($("#text").val());
    addCopyFormat($("#text").val());
  });
  //リストへの要素の削除
  $("#Delete").on("click", ()=>{
    $("#CopyFormat > option:selected").remove();
  });
  //リストの内容を保存
  $("#Save").on("click", ()=>{
    let saveData = {"CopyFormat":[], "SelectedIndex":"1"};
    console.log(saveData);
    for (const option of $("#CopyFormat").children())
    {
      saveData.CopyFormat.push(option.text);
    }
    saveData.SelectedIndex = $("#CopyFormat").val();
    chrome.storage.sync.set({
      "CopyFormat": saveData
    });
  });
  //設定データをクリアする
  $("#Clear").on("click", ()=>{
    chrome.storage.sync.clear(()=>{});
  });
  //保存データの読み込み
  const loadData = ()=>{
    chrome.storage.sync.get(["CopyFormat"],items=>{
      const data = items.CopyFormat;
	  if (data == null){
	    //設定データがない場合、リストに初期値を指定
	    addCopyFormat("[{1}]({0})");
	    $("#CopyFormat").val("1");
	  } else {
	    data.CopyFormat.forEach((x)=>{ addCopyFormat(x); });
	    $("#CopyFormat").val(data.SelectedIndex);
	  }
    });
  }
  loadData();
});
