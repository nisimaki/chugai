//commom.js



//**********************************************************************
//  言語判定
//**********************************************************************
$(function(){
	if ( navigator.language.indexOf('ja') === -1){
		$('#toEnglishBtn').show();
		$('#toEnglishBtnWrap').show();
	}
});





//**********************************************************************
//  ページの先頭へ移動
//**********************************************************************
$(function(e) {
	$('#toPageTop').find('a').each(function() {
		$(this).attr('href', 'javascript:void(0);');
	});
	
	$('#toPageTop').click(function(e) {
		$(window).scrollTop(0);
		return false;
	});
});






//**********************************************************************
//  タブ切り替え
//**********************************************************************
$(function(e) {
	$('#tab li').click(function() {
		var indexThis = $('#tab li').index(this);
		if ( $(this).attr('class') !== 'tabOn' ) {
			$(this).addClass('tabOn').siblings().removeClass('tabOn');
			$(this).parent().parent().siblings().not('#tab').eq(indexThis).show().siblings().not('#tab').hide();
		}
	});
});




//**********************************************************************
//  クッキー制御
//**********************************************************************
function Read_Cookie(key) {
	var data = document.cookie.split(';');
	var value = undefined;
	
	for (var i in data) {
		var item = data[i].split('=');
		if (key == $.trim(item[0])) {
			value = unescape(item[1])
			break;
		}
	}
	
	return value;
}

function Write_Cookie(key, value, path, exp_date) {
	var str = key + '=' + escape(value) + ';';
	
	if (path) {
		str += 'path=' + escape(path) + ';';
	}
	
	if (exp_date) {
		str += 'expires=' + exp_date.toGMTString() + ';';
	}
	
	document.cookie = str;
}




//**********************************************************************
//  ダイアログウィンドウをjsで書き出し
//**********************************************************************
$(function(){
	var mojiDialog = '<div id="moji_dialog" class="dialog"><div class="moji"><h4>文字サイズ<span class="close"><img src="/sp/common/img/iconClose.png" alt="" /></span></h4><ul><li class="size_0"><a href="javascript:void(0);">最小</a></li><li class="size_1"><a href="javascript:void(0);">小</a></li><li class="currentFontSize size_2"><a href="javascript:void(0);">標準</a></li><li class="size_3"><a href="javascript:void(0);">大</a></li><li class="size_4"><a href="javascript:void(0);">最大</a></li></ul></div><!-- /moji --></div>';
	var SearchDialog = '<div id="search_dialog" class="dialog"><div class="search"><h4>サイト内検索<span class="close"><img src="/sp/common/img/iconClose.png" alt="" /></span></h4><form action="http://search.chugai-pharm.co.jp/" id="insiteSearch" target="_blank"><p class="popTermArea"><input name="q" type="text" class="searchWord" id="q" placeholder="キーワード" /><input name="site[]" type="hidden" value="jp" /><input name="sid" type="hidden" value="jp" /><input name="#" type="image" src="/sp/common/img/iconSearchDialog.gif" alt="検索" /></p></form></div><!-- /search --></div>';
	var menuDialog = '<div id="menu_dialog" class="dialog"><div class="menu"><h4>メニュー<span class="close"><img src="/sp/common/img/iconClose.png" alt="" /></span></h4><ul class="linkList"><li><a href="/sp/index.html"><p>ホーム</p><span class="iconLink"></span></a></li><li><a href="/sp/profile/index.html"><p>会社情報</p><span class="iconLink"></span></a></li><li class="second"><a href="/sp/profile/message/index.html"><p>トップメッセージ</p><span class="iconLink"></span></a></li><li class="second"><a href="/sp/profile/mission/index.html"><p>企業理念</p><span class="iconLink"></span></a></li><li class="second"><a href="/sp/profile/about/outline.html"><p>会社概要</p><span class="iconLink"></span></a></li><li class="second"><a href="/sp/profile/group/index.html"><p>事業所一覧</p><span class="iconLink"></span></a></li><li><a href="/sp/news/index.html"><p>ニュースリリース一覧</p><span class="iconLink"></span></a></li><li><a href="/sp/csr/index.html"><p>CSR情報</p><span class="iconLink"></span></a></li><li><a href="/sp/ir/index.html"><p>株主・投資家向け情報</p><span class="iconLink"></span></a></li><li><a href="/sp/recruit/index.html"><p>採用情報</p><span class="iconLink"></span></a></li><li class="patient"><a href="http://chugai-pharm.info/" target="_blank"><p>患者さん・一般の皆さま</p><span class="iconWindow"></span></a></li><li class="paramedic"><a href="http://chugai-pharm.jp/"><p>医療従事者の皆さま</p><span class="iconLink"></span></a></li><li class="press"><a href="https://contact.chugai-pharm.co.jp/nf/nf_entry.php" target="_blank"><p>報道関係者の皆さま</p><span class="iconWindow"></span></a></li></ul><div id="menuFooter"><p class="toRss"><a href="http://www.chugai-pharm.co.jp/hc/ss/rss.html" target="_blank">RSS配信</a></p><div id="menuContact"><a href="/sp/rule/contact/index.html">お問合せ<span class="iconLink"></span></a></div><ul id="menuPCEnglishWrap"><li><div id="menuToPCPage"><a href="http://www.chugai-pharm.co.jp/hc/ss/index.html">PC版</a></div></li><li><div id="menuToEnglishPage"><a href="http://www.chugai-pharm.co.jp/hc/ss/english/index.html">English</a></div></li></ul></div><!-- /menuFooter  --></div><!-- /menu --></div>';
	var dialogBgLayer = '<div id="dialogBgLayer"></div>';
	
	if($('body').attr('id') !== 'map'){
		$('body').append(mojiDialog).append(SearchDialog).append(menuDialog).append(dialogBgLayer);
	} else {
		$('body').append(mojiDialog).append(dialogBgLayer);
	}
	
});




//**********************************************************************
//  文字サイズ変更 & ダイアログウィンドウ表示制御
//**********************************************************************
$(function(e) {
	var dialog = $('#moji_dialog');
	if (!dialog.length) return;
	
	var lis = dialog.find('.moji li');	// ダイアログのボタン
	var size_index_default = 2;
	var size_index = size_index_default;
	var size_arr = [
		'12px',
		'14px',
		'16px',
		'18px',
		'22px'
	];
	var cookie_key = 'fontsize';
	var cookie_exp = new Date();
	cookie_exp = new Date(cookie_exp.getFullYear() + 1, cookie_exp.getMonth(), cookie_exp.getDate());	// １年後
	
	// Cookie 読み込み
	(function() {
		var value = Read_Cookie(cookie_key);
		if (value !== undefined) {
			size_index = value - 0;
		}
	})();
	
	// Aa ボタン
	(function() {
		var btn = $('#textCtlBtn');
		
		function Hide_Dialog(e) {
			dialog.hide();
			$('#dialogBgLayer').hide();
		}
		
		$('#textCtlBtn').click(function(e) {
			if (dialog.is(':hidden')) {
				// 位置調整
				$('div.dialog').hide();
				dialog.show();	// Android 4.0.4: 先に show() しないと，２回目以降表示されなくなることがある。
				dialog.css('top', btn.offset().top + 34 + 'px');	// 高さがずれる？
				$('#dialogBgLayer').show();
				
				e.stopPropagation();
				
				return false; //リンク遷移をキャンセル。
			} else {
				Hide_Dialog();
			}
		});
		
		$('#moji_dialog span.close, #dialogBgLayer').click(function() {
			Hide_Dialog();
		});

	})();
	
	// ダイアログ
	// 最小 小 標準 大 最大
	lis.click(function() {
		var li = $(this);
		
		// 選択済みなら何もしない。
		if (li.is('.currentFontSize')) return;
		
		// 
		lis.removeClass('currentFontSize');
		li.addClass('currentFontSize');
		
		// 
		     if (li.is('.size_0'))	size_index = 0;
		else if (li.is('.size_1'))	size_index = 1;
		else if (li.is('.size_2'))	size_index = 2;
		else if (li.is('.size_3'))	size_index = 3;
		else if (li.is('.size_4'))	size_index = 4;
		
		$('div.moji_target').css('font-size', size_arr[size_index]);
		
		Write_Cookie(cookie_key, size_index, '/', cookie_exp);
	});
	
	// 初期化
	lis.removeClass('currentFontSize');
	lis.eq(size_index).click();
});



//**********************************************************************
//  サイト内検索ダイアログウィンドウ表示制御
//**********************************************************************
$(function(e) {
	var dialog = $('#search_dialog');
	if (!dialog.length) return;
	
	// search ボタン
	(function() {
		var btn = $('#infoSrchBtn');
		
		function Hide_Dialog(e) {
			dialog.hide();
			$('#dialogBgLayer').hide();
		}
		
		$('#infoSrchBtn').click(function(e) {
			if (dialog.is(':hidden')) {
				// 位置調整
				$('div.dialog').hide();
				dialog.show();	// Android 4.0.4: 先に show() しないと，２回目以降表示されなくなることがある。
				dialog.css('top', btn.offset().top + 34 + 'px');	// 高さがずれる？
				$('#dialogBgLayer').show();
				
				e.stopPropagation();
				
				return false; //リンク遷移をキャンセル。
			} else {
				Hide_Dialog();
			}
		});
		
		$('#search_dialog span.close, #dialogBgLayer').click(function() {
			Hide_Dialog();
		});

	})();
	
});



//**********************************************************************
//  メニューダイアログウィンドウ表示制御
//**********************************************************************
$(function(e) {
	var dialog = $('#menu_dialog');
	if (!dialog.length) return;
	
	// search ボタン
	(function() {
		var btn = $('#menuBtn');
		
		function Hide_Dialog(e) {
			dialog.hide();
			$('#dialogBgLayer').css({'background':'none', 'opacity':'1'}).hide();
		}
		
		$('#menuBtn').click(function(e) {
			if (dialog.is(':hidden')) {
				// 位置調整
				$('div.dialog').hide();
				$('#dialogBgLayer').css({'background-color':'#000', 'opacity':'0.6'}).show();
				dialog.show();	// Android 4.0.4: 先に show() しないと，２回目以降表示されなくなることがある。
				dialog.css('top', btn.offset().top + 34 + 'px');
				
				e.stopPropagation();
				
				return false; //リンク遷移をキャンセル。
			} else {
				Hide_Dialog();
			}
		});
		
		$('#menu_dialog span.close, #dialogBgLayer').click(function() {
			Hide_Dialog();
		});

	})();
	
});



//**********************************************************************
//  アコーディオン制御
//**********************************************************************
$(function() {
	$('li.acdLi > a').click(function(e) {
		var acdLi = $(this).parent();
		var innerUl = acdLi.find('ul');
		var iconSpan = acdLi.find('span.PlusMinus');	//  + - アイコン
		//var acdLiID = acdLi.attr('id');

		// Close
		if (iconSpan.is('.iconMinus')) {
			iconSpan.removeClass('iconMinus').addClass('iconPlus');
			innerUl.slideUp(100, function() {
			});
			//$.removeCookie(acdLiID);
			return false;
		}
		// Open
		else {
			iconSpan.removeClass('iconPlus').addClass('iconMinus');
			innerUl.slideDown(100, function() {
			});
			//$.cookie(acdLiID, 1);
			return false;
		}
	});
	
	
	//ページを開いたときに、アコーディオン展開履歴が残っていれば、そこを開く。
	//var cookieAcdInPage = $('[id^="cookieAcd_"]');
	//var cookieAll = document.cookie;
	//cookieAcdInPage.each(function(){
	//	var cookieAcdID = $(this).attr('id');
	//	if (cookieAll.indexOf(cookieAcdID) !== -1) {
	//		$('#' + cookieAcdID).find('span.PlusMinus').removeClass('iconPlus').addClass('iconMinus');
	//		$('#' + cookieAcdID).find('ul').slideDown(100, function() {
	//		});
	//	}
	//})
	
});



//**********************************************************************
//  PCディスプレイモード記憶
//**********************************************************************
$(function(){
	$('#toPCPage, #menuToPCPage, #toEnglishPage, #menuToEnglishPage').click(function(){
		if ($.cookie('displayMode')) {$.removeCookie('displayMode');}
		$.cookie('displayMode', 'PC', { path: '/' });
	});
});



//**********************************************************************
//  パーツ表示判定
//**********************************************************************
$(function(){
	//ホーム
	if ($('body').attr('id') === 'index'){
		$('#footerDetail').prepend('<ul id="PCEnglishWrap"><li><div id="toPCPage"><a href="http://www.chugai-pharm.co.jp/hc/ss/index.html">PC版</a></div></li><li><div id="toEnglishPage"><a href="http://www.chugai-pharm.co.jp/hc/ss/english/index.html">English</a></div></li></ul>');
		$('#toSiteTop').hide();
	}
	
	//お問合せページ
		if ($('body').attr('id') === 'contact'){
		$('#contactBtn, #menuContact').hide();
	}
});



//**********************************************************************
//  サイトTOP index.html flexslider
//**********************************************************************
$(function() {
	$('body#index .flexslider').flexslider({
	animation: "slide"
	});
});



//**********************************************************************
//  ニュースリリース一覧 news/index.html セレクトフォームで表示を切り替え
//**********************************************************************
$(function() {
	$('body#news select').change(function() {
		var selectedOptionIndex = this.options.selectedIndex;
		var selectedOptionValue = this.options[selectedOptionIndex].value;
		var selectedOptionText = $('form option[value=' + this.options[selectedOptionIndex].value + ']').text();
		
		if (selectedOptionValue === 'newsTagAll') { //「すべてを表示」を選択した場合
			$('p#newsDisplayState').remove();
			$('form ~ h3').show();
			$('ul.linkList li').not('#menu_dialog ul.linkList li').show();
		} else {
			if ($('span.' + selectedOptionValue).length === 0){ //選択したカテゴリがニュース一覧に無かった時
				if ($('p#newsDisplayState').length > 0){ //ニュースカテゴリ説明文のリセット
					$('p#newsDisplayState').remove();
					$('form').after('<p id="newsDisplayState"></p>');
				} else {
					$('form').after('<p id="newsDisplayState"></p>');
				}
				$('form ~ h3').hide();
				$('ul.linkList li').not('#menu_dialog ul.linkList li').hide();
				$('p#newsDisplayState').text('過去1年間に [' + selectedOptionText + '] のニュースリリースはありません'); //ニュースカテゴリ説明文の表示
			} else { //選択したカテゴリがニュース一覧にあった時、それらを抜き出して表示
				$('form ~ h3').show();
				$('ul.linkList li').not('#menu_dialog ul.linkList li').hide();
				$('span.' + selectedOptionValue).parent().parent().parent().parent().show();
				if ($('p#newsDisplayState').length > 0){ //ニュースカテゴリ説明文のリセット
					$('p#newsDisplayState').remove();
					$('form').after('<p id="newsDisplayState"></p>');
				} else {
					$('form').after('<p id="newsDisplayState"></p>');
				}
				$('p#newsDisplayState').text('現在、[' + selectedOptionText + '] を表示しています'); //ニュースカテゴリ説明文の表示
			}
		}
	});
});