//テキストエリアに文字列を貼りつけて、選択状態にしてクリップボードへコピーする
const copyText = val=>{
  const txt = $("#text");
  txt.val(val);
  txt.select();
  document.execCommand("copy");
}
//数値変換
//TODO: 配列要素の扱いで絶対にエラーを起こさないような対処が必要
const pi = x=>{
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
//オートコピーのデータを保存し、クリップボードへコピーする
const AddSaveData = (typeName, addData)=>{
  chrome.storage.sync.get(["CopyData"],items=>{
  	let saveData = items.CopyData;
    if (saveData==null)
      saveData = [{}];
    saveData.push({Type: typeName, Data: addData});
    chrome.storage.sync.set({ CopyData: saveData });
  });
  copyText(addData);
}