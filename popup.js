$(function(){
  $("#title").on("click", function(){
    chrome.tabs.getSelected(null, function(tab){
      $("#text").val("[{0}]({1})".replace("{0}", tab.title).replace("{1}", tab.url));
      $("#text").select();
      document.execCommand('copy');
    });
  });
});