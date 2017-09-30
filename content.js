(function() {
	var url = (function() {
		for(var e of document.querySelectorAll('a'))
			if(e.innerHTML == 'Download')
				return e.getAttribute('href');
		return null;
	})();

	var artists = (function() {
		var list = [ ];
		for(var e of document.querySelectorAll('li.tag-type-artist')) {
			var eas = e.getElementsByTagName('A');
			if(eas.length != 2)
				continue;
			var name = eas[1].innerText;

			name = name.replace(/\s+/, '_');
			name = name.replace(/_\(artist\)$/, '');
			name = name.replace(/[\/:]+/, '');

			list.push(name);
		}
		return list;
	})();

	if(!url) return;

	chrome.runtime.sendMessage({ url: url, artists: artists });
})();

