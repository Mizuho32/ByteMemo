/*
--------------------------------------------------------
rmd.js
Version 2.0.2 (Update 2011/11/28)
Copyright 2011 KOTOHACO, Inc. (http://www.kotoha.co.jp)
--------------------------------------------------------
*/
/*-- KotohacoRecommend ---------------------------------*/
KotohacoRecommend = {}

/*-- KotohacoRecommend.Request ------------------------*/
KotohacoRecommend.Request = {
	sendItem : function(item) {
		if (typeof item == "undefined")
			return;
		if (typeof item.mode == "undefined")
			return;

		if (item.mode==="send") {
			if (typeof item.accountid == "undefined" || item.accountid==="")
				return;
			if (typeof item.itemid == "undefined" || item.itemid==="")
				return;
			var aid = item.accountid;
			var iid = encodeURIComponent(item.itemid);

			var q = "";
			var cols = new Array("title","url","image","data1","data2","data3","data4","data5","data6","data7","data8","data9","data10","deleted","floor");
			for ( var i in cols )
				if (!(typeof item[cols[i]] == "undefined" || item[cols[i]]===""))
					q += "&"+cols[i]+"="+encodeURIComponent(item[cols[i]]);
			var url = document.location.protocol + "//rc.kotoha.co.jp/~" + aid + "/?action=access&itemid=" + iid + q;
			var script = document.createElement("script");
			script.setAttribute("type", "text/javascript");
			script.setAttribute("language", "JavaScript");
			script.setAttribute("src", url);
			script.setAttribute("charset", "UTF-8");
			var tmp = document.createElement("div");
			tmp.appendChild(script);
			document.write(tmp.innerHTML);

		}
	},
	callid : String((new Date()).getFullYear()).substr(-2) + ("0"+((new Date()).getMonth()+1)).substr(-2) + ("0"+((new Date()).getDate())).substr(-2)
				+ "-" + ("0"+((new Date()).getSeconds())).substr(-2)
				+ "-" + ("000000"+Math.floor(Math.random()*1000000+1)).substr(-6),
	callno : 0,
	trackConversion : function(item) {
		if (typeof item == "undefined")
			return;
		if (typeof item.mode == "undefined")
			return;

		if (item.mode==="send") {
			if (typeof item.accountid == "undefined" || item.accountid==="")
				return;
			if (typeof item.itemid == "undefined" || item.itemid==="")
				return;
			var aid = item.accountid;
			var iid = encodeURIComponent(item.itemid);
			var q = "";
			// Default Order ID
			if (typeof item.orderid == "undefined" || item.orderid==="")
				q += "&orderid="+encodeURIComponent(this.callid);
			// Default Line No
			q += "&lineno="+encodeURIComponent(this.callno++);
			// Other Param
			var cols = new Array("quantity","price","orderid");
			for ( var i in cols )
				if (!(typeof item[cols[i]] == "undefined" || item[cols[i]]===""))
					q += "&"+cols[i]+"="+encodeURIComponent(item[cols[i]]);
			var url = document.location.protocol + "//rc.kotoha.co.jp/~" + aid + "/?action=cv&itemid=" + iid + q + "&dummy="+String(new Date().getTime());
			var script = document.createElement("script");
			script.setAttribute("type", "text/javascript");
			script.setAttribute("language", "JavaScript");
			script.setAttribute("src", url);
			script.setAttribute("charset", "UTF-8");
			if (document.getElementsByTagName("head").length==1) {
				document.getElementsByTagName("head")[0].appendChild(script);
			} else {
				var tmp = document.createElement("div");
				tmp.appendChild(script);
				document.write(tmp.innerHTML);
			}
		}
	}
}
