chrome.runtime.onInstalled.addListener(function() {
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    chrome.declarativeContent.onPageChanged.addRules([
      {
        conditions: [
          new chrome.declarativeContent.PageStateMatcher({
            pageUrl: { hostEquals: 'e621.net', pathPrefix: '/post/show' },
          })
        ],
        actions: [ new chrome.declarativeContent.ShowPageAction() ]
      }
    ]);
  });
});

chrome.runtime.onMessage.addListener(function(msg) {
	var name = msg.url.replace(/.*\//, '');

	if(msg.artists.length > 0)
		name = msg.artists.join('+') + '/' + name;
	
	name = 'e621/' + name;

	chrome.downloads.download({ url: msg.url, filename: name });
});

chrome.pageAction.onClicked.addListener(function(tab) {
	chrome.tabs.executeScript(null, { file: "content.js" });
});
