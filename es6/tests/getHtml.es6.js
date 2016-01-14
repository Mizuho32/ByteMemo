import { Util } from '../Util.es6';

Util.hello();

Util.getHtml("www.google.co.jp", (text)=>{
	console.log(text);
});
