class Util{

	constructor(){
	}

	static hello(){
		console.log("Hello");
	}

	static getHtml(url, f){
		$.get(url, (d) => {
			f(d.responseText);
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
