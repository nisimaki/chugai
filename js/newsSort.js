$(function(){


//■■■ /news/配下 ■■■
if(location.pathname.indexOf('/news/') != -1){
	//フォームHTML書き出し
	if(location.pathname.match(/\/news\/200[0-4]\.html|\/news\/199[7-9]\.html/)){ // /news/1997～2004.htmlまでのフォームは一要素多い
	$('p.newsLead').after('<form action="" class="newsCategorySelect" id="selectNewsTag"><p><select name=""><option selected="selected" value="newsTagAll">すべてを表示</option><option value="newsTagKeiei">経営・財務</option><option value="newsTagKankyo">環境・社会貢献</option><option value="newsTagIyaku">医薬品</option><option value="newsTagIppan">一般医薬品</option><option value="newsTagSeisan">生産</option><option value="newsTagKenkyu">研究開発</option><option value="newsTagWayaku">ロシュリリース和訳</option></select></p></form>');
	} else {
	$('p.newsLead').after('<form action="" class="newsCategorySelect" id="selectNewsTag"><p><select name=""><option selected="selected" value="newsTagAll">すべてを表示</option><option value="newsTagKeiei">経営・財務</option><option value="newsTagKankyo">環境・社会貢献</option><option value="newsTagIyaku">医薬品</option><option value="newsTagSeisan">生産</option><option value="newsTagKenkyu">研究開発</option><option value="newsTagWayaku">ロシュリリース和訳</option></select></p></form>');
	}

	//カテゴリアイコン名を見て、直近上dd.categoryに該当のクラス名を付与
	$('dd.category').find('li > img').each(function(){
		var src = $(this).attr('src');
		if(src.indexOf('icon_news_finance.gif') != -1){ //経営・財務
			$(this).parent('li').parent('ul').parent('dd.category').addClass('newsTagKeiei');
		} else if(src.indexOf('icon_news_environment.gif') != -1){ //環境・社会貢献
			$(this).parent('li').parent('ul').parent('dd.category').addClass('newsTagKankyo');
		} else if(src.indexOf('icon_news_medicine.gif') != -1){ //医薬品
			$(this).parent('li').parent('ul').parent('dd.category').addClass('newsTagIyaku');
		} else if(src.indexOf('icon_news_production.gif') != -1){ //生産
			$(this).parent('li').parent('ul').parent('dd.category').addClass('newsTagSeisan');
		} else if(src.indexOf('icon_news_rd.gif') != -1){ //研究開発
			$(this).parent('li').parent('ul').parent('dd.category').addClass('newsTagKenkyu');
		} else if(src.indexOf('icon_news_roche-release.gif') != -1){ //ロシュリリース和訳
			$(this).parent('li').parent('ul').parent('dd.category').addClass('newsTagWayaku');
		} else if(src.indexOf('icon_news_otc.gif') != -1){ //一般医薬品
			$(this).parent('li').parent('ul').parent('dd.category').addClass('newsTagIppan');
		}
	});


	//変数一覧
	var selectedOptionIndex; //選択したプルダウンの番号
	var selectedOptionValue; //選択したプルダウンの値
	var selectedOptionText; //選択したプルダウンのテキスト
	var ddCategorySelected; //選択したプルダウンの値がclassとして入っているdd
	var pNewsLead; //現在のカテゴリ説明文＋RSSの表示

	//ファンクション一覧
	function currentCategoryCaptionReset(){ //現在のカテゴリ説明文のリセット
		pNewsLead = $('p.newsLead').html();
		if(pNewsLead.match(/現在、.+?を表示しています/)){
			pNewsLead = pNewsLead.replace(/現在、.+?を表示しています/,'');
		}
	}

	function newsSortNonFunc(){ //選択したカテゴリがニュース一覧に無かった時
		$('p#newsDisplayState').remove(); //該当なしの説明文のリセット
		$('#mainContents div.sectionLv01').hide();
		$('form#selectNewsTag').after('<p id="newsDisplayState">当年には指定されたカテゴリに属するニュースリリースがありません</p>'); //ニュースカテゴリ説明文の表示
		currentCategoryCaptionReset();
		$('p.newsLead').html('現在、［' + selectedOptionText + '］を表示しています' + pNewsLead); //現在のカテゴリ説明文＋RSSの表示
	}

	function newsSortFunc(){ //選択したカテゴリがニュース一覧にあった時、それらを抜き出して表示
		$('p#newsDisplayState').remove(); //該当なしの説明文のリセット
		$('#mainContents div.sectionLv01').hide().children().children().hide().children().hide().children().hide(); //全部隠す
		ddCategorySelected.parent().parent().parent().parent().show(); //.sectionLv01
		ddCategorySelected.parent().parent().parent().children().show(); //.sttl, .sectionIndent
		ddCategorySelected.parent().parent().parent().children('.sttl').find('h2').show();
		ddCategorySelected.parent().show(); //dl.newsList
		ddCategorySelected.prev().show(); //該当の日付dtだけ表示
		ddCategorySelected.show(); //該当のカテゴリddだけ表示
		ddCategorySelected.next().show(); //該当の記事ddだけ表示
		currentCategoryCaptionReset();
		$('p.newsLead').html('現在、［' + selectedOptionText + '］を表示しています' + pNewsLead); //現在のカテゴリ説明文＋RSSの表示
	}


	//ページ読み込み時にCookie:newsSortCategoryを持っていた場合、そのカテゴリでソート
	if($.cookie('newsSortCategory')){
		selectedOptionValue = $.cookie('newsSortCategory');
		if(selectedOptionValue === 'newsTagIppan'){ //「一般医薬品」のCookieがあった場合
			selectedOptionText = '一般医薬品';
		} else {
			selectedOptionText = $('form#selectNewsTag option[value=' + selectedOptionValue + ']').text();
		}
		ddCategorySelected = $('dd.category.' + selectedOptionValue);
		if (ddCategorySelected.length === 0){ //選択したカテゴリがニュース一覧に無かった時
			newsSortNonFunc();
		} else { //選択したカテゴリがニュース一覧にあった時、それらを抜き出して表示
			newsSortFunc();
		}
		$('form#selectNewsTag option[value=' + selectedOptionValue + ']').attr('selected', 'selected'); //フォームのプルダウンを選択したカテゴリへ変更
		if(selectedOptionValue === 'newsTagIppan' && !(location.pathname.match(/\/news\/200[0-4]\.html|\/news\/199[7-9]\.html/))){ //「一般医薬品」のCookieがあった場合、かつ2005年以降のページの場合
			$('p#newsDisplayState').remove(); //該当なしの説明文のリセット
			$('form#selectNewsTag').after('<p id="newsDisplayState">「一般用医薬品」のニュースリリースについては、2005年以降はありません</p>'); //ニュースカテゴリ説明文の表示
		}
	};

	//イベントハンドラ
	$('form#selectNewsTag select').change(function() {
		selectedOptionIndex = this.options.selectedIndex;
		selectedOptionValue = this.options[selectedOptionIndex].value;
		selectedOptionText = $('form#selectNewsTag option[value=' + selectedOptionValue + ']').text();
		ddCategorySelected = $('dd.category.' + selectedOptionValue);
		if (selectedOptionValue === 'newsTagAll') { //「すべてを表示」を選択した場合
			$('p#newsDisplayState').remove(); //該当なしの説明文のリセット
			currentCategoryCaptionReset();
			$('p.newsLead').html(pNewsLead); //RSSの表示
			$('#mainContents div.sectionLv01').show().children().children().show().children().show().children().show();
			$.removeCookie('newsSortCategory', { path: '/' }); //カテゴリソート保存用Cookieを削除
		} else {
			if (ddCategorySelected.length === 0){ //選択したカテゴリがニュース一覧に無かった時
				newsSortNonFunc();
				$.cookie('newsSortCategory', selectedOptionValue, { path: '/' }); //ソートしたカテゴリをCookieに保存
			} else { //選択したカテゴリがニュース一覧にあった時、それらを抜き出して表示
				newsSortFunc();
				$.cookie('newsSortCategory', selectedOptionValue, { path: '/' }); //ソートしたカテゴリをCookieに保存
			}
		}
	});
}





//■■■ /ir/reports_downloads/配下 ■■■
if(location.pathname.indexOf('/ir/reports_downloads/') != -1){
	//フォームHTML書き出し
	$('div.irReportsDownloadSelect').append('<form id="selectIrNewsTag" class="" action=""><p><select name=""><option selected="selected" value="irNewsTagAll">すべてを表示</option><option  value="irNewsTagKessan">決算</option><option  value="irNewsTagKeiei">経営</option><option  value="irNewsTagSeihin">製品・R&amp;D</option><option  value="irNewsTagConf">外部カンファレンス</option></select></p></form>');


	//カテゴリアイコン名を見て、直近上dd.categoryに該当のクラス名を付与
	$('table.irReportsDownloadTable td.category li > img').each(function(){
		var src = $(this).attr('src');
		if(src.indexOf('icon_settlement.gif') != -1){ //決算
			$(this).parent('li').parent('ul').parent('td.category').addClass('irNewsTagKessan');
		} else if(src.indexOf('icon_management.gif') != -1){ //経営
			$(this).parent('li').parent('ul').parent('td.category').addClass('irNewsTagKeiei');
		} else if(src.indexOf('icon_products.gif') != -1){ //製品・R&D
			$(this).parent('li').parent('ul').parent('td.category').addClass('irNewsTagSeihin');
		} else if(src.indexOf('icon_conference.gif') != -1){ //外部カンファレンス
			$(this).parent('li').parent('ul').parent('td.category').addClass('irNewsTagConf');
		}
	});

	//変数一覧
	var selectedOptionIndex; //選択したプルダウンの番号
	var selectedOptionValue; //選択したプルダウンの値
	var selectedOptionText; //選択したプルダウンのテキスト
	var tdCategorySelected; //選択したプルダウンの値がclassとして入っているdd


	//ファンクション一覧
	function irNewsSortNonFunc(){ //選択したカテゴリがニュース一覧に無かった時
		$('p#irNewsDisplayState').remove(); //該当なしの説明文のリセット
		$('td.category').parent().hide().parent().parent().parent().hide().prev().hide().parent().parent().hide(); //全部隠す
		$('div.irReportsDownloadSelect').after('<p id="irNewsDisplayState">指定されたカテゴリに属するニュースリリースがありません</p>'); //ニュースカテゴリ説明文の表示
		$('div.irReportsDownloadSelect p.text').text('現在、［' + selectedOptionText + '］を表示しています'); //現在のカテゴリ説明文
	}

	function irNewsSortFunc(){ //選択したカテゴリがニュース一覧にあった時、それらを抜き出して表示
		$('p#irNewsDisplayState').remove(); //該当なしの説明文のリセット
		$('td.category').parent().hide().parent().parent().parent().hide().prev().hide().parent().parent().hide(); //全部隠す
		tdCategorySelected.parent().show().parent().parent().parent().show().prev().show().parent().parent().show();
		$('div.irReportsDownloadSelect p.text').text('現在、［' + selectedOptionText + '］を表示しています'); //現在のカテゴリ説明文
	}


	//ページ読み込み時にCookie:irNewsSortCategoryを持っていた場合、そのカテゴリでソート
	if($.cookie('irNewsSortCategory')){
		selectedOptionValue = $.cookie('irNewsSortCategory');
		selectedOptionText = $('form#selectIrNewsTag option[value=' + selectedOptionValue + ']').text();
		tdCategorySelected = $('td.category.' + selectedOptionValue);
		if (tdCategorySelected.length === 0){ //選択したカテゴリがニュース一覧に無かった時
			irNewsSortNonFunc();
		} else { //選択したカテゴリがニュース一覧にあった時、それらを抜き出して表示
			irNewsSortFunc();
		}
		$('form#selectIrNewsTag option[value=' + selectedOptionValue + ']').attr('selected', 'selected'); //フォームのプルダウンを選択したカテゴリへ変更
	};

	//イベントハンドラ
	$('form#selectIrNewsTag select').change(function() {
		selectedOptionIndex = this.options.selectedIndex;
		selectedOptionValue = this.options[selectedOptionIndex].value;
		selectedOptionText = $('form#selectIrNewsTag option[value=' + this.options[selectedOptionIndex].value + ']').text();
		tdCategorySelected = $('td.category.' + selectedOptionValue);
		
		if (selectedOptionValue === 'irNewsTagAll') { //「すべてを表示」を選択した場合
			$('p#irNewsDisplayState').remove(); //該当なしの説明文のリセット
			$('div.irReportsDownloadSelect p.text').text(''); //カテゴリ説明文のリセット
			$('td.category').parent().show().parent().parent().parent().show().prev().show().parent().parent().show(); //全部表示
			$.removeCookie('irNewsSortCategory', { path: '/' }); //カテゴリソート保存用Cookieを削除
		} else {
			if (tdCategorySelected.length === 0){ //選択したカテゴリがニュース一覧に無かった時
				irNewsSortNonFunc();
				$.cookie('irNewsSortCategory', selectedOptionValue, { path: '/' }); //ソートしたカテゴリをCookieに保存
			} else { //選択したカテゴリがニュース一覧にあった時、それらを抜き出して表示
				irNewsSortFunc();
				$.cookie('irNewsSortCategory', selectedOptionValue, { path: '/' }); //ソートしたカテゴリをCookieに保存
			}
		}
	});
}


});
