$(function() {
	var url = window.location.pathname;
	var urlArray = url.split('/');
	var panelBCategory; //class="here"を付けるBパネルのカテゴリ名

	if(urlArray[1] + urlArray[2] === 'hcss'){ //リニューアル前のURL対応、「/hc/ss/」があった場合
		if(urlArray[3] === 'english'){
			panelBCategory = urlArray[4];
		} else {
			panelBCategory = urlArray[3];
		};
	} else { //リニューアル後のURLの場合
		if(urlArray[1] === 'english'){
			panelBCategory = urlArray[2];
		} else {
			panelBCategory = urlArray[1];
		};
	};

	if (panelBCategory.indexOf("profile") >= 0){
		$('li#panelBprofile').addClass("here");
	} else if (panelBCategory.indexOf("news") >= 0){
		$('li#panelBnews').addClass("here");
	} else if (panelBCategory.indexOf("csr") >= 0){
		$('li#panelBcsr').addClass("here");
	} else if (panelBCategory.indexOf("ir") >= 0){
		$('li#panelBir').addClass("here");
	} else if (panelBCategory.indexOf("recruit") >= 0){
		$('li#panelBrecruit').addClass("here");
	}
	
	//採用（日英）配下のページの中に一部、urlがパラメータだけのページがある為の処理	
	if($('p#topicPath a')[1]){
		var topicPath2ndAHref = $('p#topicPath a:nth-child(2)').attr('href');
		if (topicPath2ndAHref.indexOf('/recruit/index.html') >= 0){
		$('li#panelBrecruit').addClass("here");
		}
	}
});