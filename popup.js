$(function(){
  function copyText(val){
      $("#text").val(val);
      $("#text").select();
      document.execCommand('copy');
  }
  $("#Qiita").on("click", function(){
    chrome.tabs.getSelected(null, function(tab){
      copyText("[{0}]({1})".replace("{0}", tab.title).replace("{1}", tab.url));
    });
  });
  $("#はてな").on("click", function(){
    chrome.tabs.getSelected(null, function(tab){
      copyText("[{1}:title={0}]".replace("{0}", tab.title).replace("{1}", tab.url));
    });
  });
});
