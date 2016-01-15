class Util{

	constructor(){
	}

	static hello(){
		console.log("Hello");
	}

	static Failed(t){
			if (t.search("ご指定の商品は販売終了か、ただ今お取扱いできない商品です") > -1) {
				console.log("Failed");
				return true;
			}else return false;
	}
	static getHtml(url, f){
			console.log(url);
		$.get(url, (d) => {
			if(Util.Failed(d.responseText || d))
				f(null);
			else
				f(d.responseText || d);
		});
	}

	static H2JQ(html){
		var e = $('<div></div>');
		e.html(html);
		return e;
	}

	static chars(ch, num){
		return (Array(num+1).join(ch));
	}

	static moNo(line){
		var length = 5;
		var reg = /^([a-zA-Z])-?(\d{0,5})$/;

		var match = line.match(reg);
		if(match === null) return null;

		return `${match[1].toUpperCase()}-${Util.chars('0', length-match[2].length)}${match[2]}`;
	}

	static filter(dom){
		var obj = {};
		//型番 
		var model = $("title", dom);
		var match = model[0].innerHTML.match(/(.+):/); 
		if(match === null) return null
		obj.model_No = match[1];
		
		return obj;
	}

}// End of Util
