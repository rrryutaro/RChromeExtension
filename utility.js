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
      saveData = [];
    saveData.push({Type: typeName, Data: addData});
    chrome.storage.sync.set({ CopyData: saveData });
  });
  copyText(addData);
}

const removeCopyData = index=>{
  chrome.storage.sync.get(["CopyData"],items=>{
  	let saveData = items.CopyData;
    saveData.splice(index, 1);
    chrome.storage.sync.set({ CopyData: saveData });
 });
}

//以下のサイトよりコードを拝借しています。
//[jQuery(JavaScript)でHTMLエスケープするときの注意点と対処法 | iwb.jp](https://iwb.jp/jquery-javascript-html-escape/)
var escapeHtml = (function (String) {
  var escapeMap = {
    '&': '&amp;',
    "'": '&#x27;',
    '`': '&#x60;',
    '"': '&quot;',
    '<': '&lt;',
    '>': '&gt;'
  };
  var escapeReg = '[';
  var reg;
  for (var p in escapeMap) {
    if (escapeMap.hasOwnProperty(p)) {
      escapeReg += p;
    }
  }
  escapeReg += ']';
  reg = new RegExp(escapeReg, 'g');
 
  return function escapeHtml (str) {
    str = (str === null || str === undefined) ? '' : '' + str;
    return str.replace(reg, function (match) {
      return escapeMap[match];
    });
  };
}(String));