const saveDataName = "SaveData";
$(function(){
  //テキストエリアに文字列を貼りつけて、選択状態にしてクリップボードへコピーする
  const copyText = (val)=>{
    const txt = $("#text");
    txt.val(val);
    txt.select();
    document.execCommand("copy");
  }
  //数値変換
  //TODO: 配列要素の扱いで絶対にエラーを起こさないような対処が必要
  const pi = (x)=>{
    return parseInt(x.substr(1, x.length-2), 10);
  }
  //文字列フォーマット "{}"で囲われた範囲を中の数値と対応する配列の文字列で置き換え
  //TODO: エスケープや例外への対処が必要
  const formatString = (formatValue, replaceStringArray)=>{
    formatValue.match(/({(\d)+})/g).forEach((x)=>{
      formatValue = formatValue.replace(x, replaceStringArray[pi(x)]);
    });
    return formatValue;
  }
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
    localStorage.setItem(saveDataName, JSON.stringify(saveData));
    console.log(saveData);
  });
  //設定データをクリアする
  $("#Clear").on("click", ()=>{
    localStorage.clear();
  });
  //保存データの読み込み
  const loadData = ()=>{
    const data = JSON.parse(localStorage.getItem(saveDataName));
    console.log(data);
    if (data == null){
      //設定データがない場合、リストに初期値を指定
      addCopyFormat("[{1}]({0})");
      $("#CopyFormat").val("1");
    } else {
      data.CopyFormat.forEach((x)=>{ addCopyFormat(x); });
      $("#CopyFormat").val(data.SelectedIndex);
    }
  }
  loadData();
});
