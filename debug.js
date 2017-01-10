const debugTabProperties = ()=>{
	chrome.tabs.getSelected(null, function(tab){
		console.log([{
			id:tab.id,
			index:tab.index,
			windowId:tab.windowId,
			openerTabld:tab.openerTabld,
			selected:tab.selected,
			highlighted:tab.highlighted,
			active:tab.active,
			pinned:tab.pinned,
			audible:tab.audible,
			discarded:tab.discarded,
			autoDiscardable:tab.autoDiscardable,
			mutedInfo:tab.mutedInfo,
			url:tab.url,
			title:tab.title,
			favlconUrl:tab.favlconUrl,
			satatus:tab.satatus,
			incognito:tab.incognito,
			width:tab.width,
			height:tab.height,
			sessionId:tab.sessionId,
		}]);
	});
}
