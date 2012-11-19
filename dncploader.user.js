// ==UserScript==
// @name DnC+ Loader
// @description for D&C
// @author jlblc
// @version 0.5.8
// @namespace https://raw.github.com/JlblC/dncplus/
// @homepage  https://raw.github.com/JlblC/dncplus/
// @source https://raw.github.com/JlblC/dncplus/master/dncploader.user.js
// @icon https://raw.github.com/JlblC/dncplus/master/ico48x48.gif
// @icon48 https://raw.github.com/JlblC/dncplus/master/ico48x48.gif
// @include        http://*.the-game.ru/*
// ==/UserScript==

(function (window, undefined) {
	var version = 'v 0.5.8';
	var w = window.unsafeWindow || window;
		// включаем кнопку подсветки планет для стратегической карты
        if (w.location.pathname.indexOf('/skymap_ajax/')!=-1) {document.getElementById('bgcolorBtn').style.display = 'table-cell';};
        
	createtag('link',
		document.head, {
		type : 'text/css',
		rel : 'stylesheet',
		href : 'https://raw.github.com/JlblC/dncplus/master/dncp.css'
	});
        console.log('DnC+ : Insert CSS in '+w.self.document.baseURI);
	if (w.self != w.top) return;  // выходим если не верхний фрейм
	console.time('DnC+ ');
	console.log('DnC+ : Start loader ' + version);
	createtag('script',
		document.head, {
		type : 'text/javascript',
		src : 'https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js'
	},
		function () {
		console.log('DnC+ : load jquery ok');
		createtag('script',
			document.head, {
			type : 'text/javascript',
			src : 'https://raw.github.com/JlblC/dncplus/master/dncpmain.js'
		},
			function () {
			console.log('DnC+ : load script ok');
		});
	});
	

	function createtag(tag, parent, attributes, onloadfunction) {
		var result = document.createElement(tag);
		if (attributes)
			for (var a in attributes)
				result.setAttribute(a, attributes[a]);
		if (onloadfunction)
			result.onload = onloadfunction;
		if (parent)
			parent.appendChild(result);
		return result;
	}
	
})(window);
