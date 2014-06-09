$(function() {
	var url = window.location.pathname; //ドメイン名を含まない現在ページのurl（例：htpp://abc.com/ddd/eee/fff.html → /ddd/eee/fff.html）
	var urlArray = url.split('/');
	var fileName = urlArray[urlArray.length -1]; //fff.html
	var cpanelHrefArray = [];
	var here_li;
	var parent_li;
	var active_ul;

	///特定のurlの場合、urlを差し替え
	if(url.indexOf('/news/index.html') != -1){ //「/news/index.html」→「最新年のurl」
		url = $('#localNav li').eq(0).find('a').attr('href');
	} else if(url.indexOf('/news/past.html') != -1){ //「/news/past.html」→「過去のニュースリリースの最新年」
		url = $('#localNav li a[href$=/news/past.html]').closest('li').children('ul').find('li').eq(0).find('a').attr('href');
	} else if(url.indexOf('/ir/reports_downloads/part_download.html') != -1){ //「過去の一括ダウンロード」→「一括ダウンロード」
		url = url.replace("part_download.html", "all_download.html");
	} else if(url.indexOf('/ir/reports_downloads/annual_reports_past.html') != -1){ //「過去のアニュアルレポート」→「アニュアルレポート」
		url = url.replace("annual_reports_past.html", "annual_reports.html");
	}

	//IE8以下用、配列.indexOf関数
	if(!Array.prototype.indexOf){
		Array.prototype.indexOf = function(obj, start) {
			for (var i = (start || 0), j = this.length; i < j; i++) {
				if (this[i] === obj) { return i; }
			}
				return -1;
		}
	}

	//ファイル名に"_"があった場合
	if((fileName.search("_")) != -1 ){
		$('#localNav a').each(function(){
			cpanelHrefArray.push($(this).attr('href'));
		})
		if(cpanelHrefArray.indexOf(url) == -1){ //Cpanelリンク達に現在ページと同じURLが無ければ、ファイル名の"_"から後を削除（例：fff_001.html → fff.html）
			fileName = fileName.replace(/_.+?\./, '\.');
			urlArray.splice(urlArray.length -1, 1, fileName)
			url = urlArray.join('/');
		}
	}

	//C2,C3を消す
	$('#localNav li ul').css("display","none");
	
	//現在ページurlをhrefに入れている<li>に.hereを付与
	here_li = $('#localNav li a[href="'+url+'"]').closest('li');
	here_li.addClass('here');
	
	//C1(C2)とC2(C3)のひとつめのurlが違っている場合と、そうでない場合を分けて、それぞれclassを付与
	if((here_li.children('ul').length >= 1) && (here_li.children('ul').find('li').eq(0).find('a').attr('href') !== url)){
		here_li.addClass('parent').addClass('indexLi').parents('li').addClass('parent');
	} else {
		parent_li = here_li.parents('li');
		parent_li.addClass('parent');
	}
	
	//here_liの全親要素<ul>に.activeを付与
	here_li.closest('ul').addClass('active');
	here_li.parents('li').closest('ul').addClass('active');
	//here_liの子に<ul>があった場合、それにも.activeを付与
	here_li.children('ul').addClass('active');

	//ul.activeを表示
	$('#localNav ul.active').css("display","block");
});