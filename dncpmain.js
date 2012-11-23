(function() {

var dncpversion = 'v 0.2.75';

$(document).ready(init);

console.log('DnC+ : Main start ' + dncpversion);

function init() {
	
	console.log('DnC+ : Document ready');
	if (window.location.pathname.indexOf('/communicator/')!=-1) { tab_communicator(); return; }
	if (window.location.pathname.indexOf('/about/scripting/')!=-1) { tab_about_scripting(); return; }


        
}

function tab_communicator(){ // вкладка коммуникатор
	console.log('DnC+ : communicatortab');
	$('div.comm_chanell a').dblclick(chanaldblclick);  // вешаем на двойной клик функцию управления подпиской на канал 
	$("a[href*='/gist.github.com/']");
	//<table width="100%" cellpadding="1" cellspacing="0" border="0" class="spoiler"><tbody><tr><td width="1%" valign="middle"><a href="javascript:ExpandNewsItem('idm23092320')"><img src="/static/img/expand.gif" alt="" width="15" height="18" border="0" id="msg_expander_idm23092320"></a></td><td width="97%"><strong><a href="javascript:ExpandNewsItem('idm23092320')" class="nounder">Заголовок</a></strong></td></tr><tr><td><img src="/static/img/z.gif" alt="" width="1" height="1"></td><td><img src="/static/img/z.gif" alt="" width="1" height="1"><br><div class="spoiler" id="news_body_row_idm23092320"><p>2</p></div></td></tr></tbody></table>
 	

}

function tab_about_scripting(){  // вкладка /about/scripting/
	console.log('DnC+ : abouttoc');
	$.each($('h2:not(:has(a[name]))').not('h2+h2'),function() {$(this).prepend($('<a name="'+uid()+'"></a>'))});
	$('<div id=ogl style="position:fixed; left:800px; top:75px; padding:5px; border:1px dashed gray">').appendTo('body');
	$('#ogl').append('<ul>');

	if (!$('div#body h2:first-child').length) {$('<a name=top></a><span style="visibility:hidden;">&nbsp;&#9650;&nbsp; top</span></a>').prependTo($('div#body'));}
	$.each($("#body p strong").parents().get(),
		function (i,d){ if (d.innerHTML.search(/^\s*<strong>[^<]{4,}<\/strong>/i)!=-1) 
			{d.innerHTML=d.innerHTML.replace(/(<strong>)([^<]*)(<\/strong>)/i,'<a name="'+uid()+'" class="sub"></a>$1$2$3');}
		});
	var toplv=true;
	var cursor=$('#ogl ul');
	$.each($('a[name]'),function() {if ($(this).hasClass('sub')) {
                                     if (toplv) {cursor=$('<ul>').appendTo(cursor);}
					} else {
                                          if (!toplv) {cursor=$('#ogl ul:first');}
					}
                                   toplv=!$(this).hasClass('sub');   
				var t=$(this).next().text()||$(this).parent().text();
				t=t.replace(/^\s*Q:\s*/,'');
                                if (t.length>50) {console.log(t.length); t=t.slice(0,40)+'...';} 
				cursor.append('<li><a href="#'+$(this).attr('name')+'">'+t+'</a></li>')});
	console.log('DnC+ : TOC added');
}

// фича - двойной клик на названии канала
function chanaldblclick(e){
	//console.log(e.target.id);
	var chid=e.target.id.split('box_')[1];
     //console.log('ch id='+chid);
     if (!chid||chid < 1||chid=='search') return;
     $('.chan_mngmnt').remove();

     $('<a href="?action=subscribe_me_to&channel='+chid+'&mode=-2" class="dbnd" title="Отписаться">X</a>')
     .add('<a href="?action=add_to_digest&channel='+chid+'&mode=1" title="В дайджест">&#9829;</a>')
     .add('<a href="?action=add_to_digest&channel='+chid+'&mode=0" class="dbnd" title="Из дайжеста">&#9825;</a>')
     .addClass('chan_mngmnt')
     .insertBefore($(this));
     $('.chan_mngmnt').after('<span class="chan_mngmnt">&nbsp;</span>');
 }

var uidnum=1;
function uid(){
	return 'L'+(uidnum++)+'_'+Math.round(Math.random()*100000);
	}


})();
