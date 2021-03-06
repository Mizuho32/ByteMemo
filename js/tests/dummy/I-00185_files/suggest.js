var httpObj;
var timerId;
var timeout_sec = 5;
var timeInterval = 400;
var code_list = new Array();
var item_list = new Array();
var createIdChar = 'c';
var maxNum = -1;
var oldNum = -1;
var num;
var outputIdChar = 'item';
var dlBgColor = '#dddddd';
var dlColor = '#000000';
var hlBgColor = '#ffffff';
var hlColor = '#00dd00';
var queryurl = '../search/lookupzip.aspx?zip=';
var inputIdChar;
var outputFormIdChar1;
var outputFormIdChar2;
var outputFormIdChar3;
var leftoffset = 5;

function init(i,o1,o2,o3,cnt,ofs)
{
if(window.navigator.userAgent.indexOf("Safari") != -1){return false;}
if(window.navigator.userAgent.indexOf("MSIE 4") != -1){return false;}
if(window.navigator.userAgent.indexOf("MSIE 5") != -1){return false;}
inputIdChar = i + cnt;
outputFormIdChar1 = o1 + cnt;
outputFormIdChar2 = o2 + cnt;
outputFormIdChar3 = o3 + cnt;
leftoffset = ofs;

var code = document.getElementById(inputIdChar);

addListener(code, 'keyup', printItemList, false);
addListener(code, 'blur', eliminateDropdownList,false);
}

function address_input(str)
{
var arr = str.split(" ");
for( var j = 0; j < document.getElementById(outputFormIdChar1).length; j++ )
{
if ( document.getElementById(outputFormIdChar1).options[j].value == arr[0] )
{document.getElementById(outputFormIdChar1).options[j].selected = true;}
}
document.getElementById(outputFormIdChar2).value = arr[1] + arr[2];

/* 住所２は住所１とくっつけて表示
if(arr[2]){
document.getElementById(outputFormIdChar3).value = arr[2];
}
else{
document.getElementById(outputFormIdChar3).value = '';
}
*/

document.getElementById(inputIdChar).blur();
//document.getElementById(outputFormIdChar3).focus();
document.getElementById(outputFormIdChar2).focus();
}
function callMenu(e) {
eliminateDropdownList();
var target_node = getTargetNode(e);
var target_node_id = target_node.id;
setVar(target_node_id);
}
function callMenuKey(e) {
eliminateDropdownList();
if(num != -1){
setVar(createIdChar + num);
}
}
function setVar(str)
{
address_input(item_list[str]);
document.getElementById(inputIdChar).value = "";
document.getElementById(inputIdChar).value = code_list[str];
}
function eliminateDropdownList() {
if( document.getElementById('dropframe') ) {
var dropframe = document.getElementById('dropframe');
dropframe.parentNode.removeChild(dropframe);
}
}
function getTargetNode(e){
var target_node;
if(e.target)
{target_node = e.target;}
else
{target_node = e.srcElement;}
if (target_node.nodeType == 3)
{target_node = target_node.parentNode;}
return target_node;
}
function getElemPos(elem) {
var obj = new Object();
obj.x = elem.offsetLeft;
obj.y = elem.offsetTop;
while(elem.offsetParent) {
elem = elem.offsetParent;
obj.x += elem.offsetLeft;
obj.y += elem.offsetTop;
obj.x += leftoffset;
}
return obj;
}
function generateDropdownList(text_data) {
var lines = text_data.split("\n");
var dropframe = document.createElement('div');
oldNum = -1;
num = -1;
maxNum = lines.length - 1;
if(lines.length <= 1){return false;}
dropframe.id = 'dropframe';
for(i=0; i<lines.length; i++) {
if(lines[i] == '') {
break;
}
var parts = lines[i].split(",");
var code = parts[0];
var item = parts[1];
var id_value = createIdChar + i;
code_list[id_value] = code;
item_list[id_value] = item;
var child_div = document.createElement('div');
child_div.id = id_value;
var caption = document.createTextNode('[' + code + '] ' + item + ' ');
child_div.appendChild(caption);
dropframe.appendChild(child_div);
addListener(child_div,'mouseover',moverRef(i),false);
addListener(child_div, 'mousedown', callMenu, false);
}
if(lines.length == 2)
{
eliminateDropdownList();
setVar(createIdChar + 0);
return;
}
var code_elem = document.getElementById(inputIdChar);
var pos_obj = getElemPos(code_elem);
pos_obj.y += document.getElementById(inputIdChar).offsetHeight;
dropframe.style.left = pos_obj.x + 'px';
dropframe.style.top = pos_obj.y + 'px';
document.body.appendChild(dropframe);
}
function moverRef(param){
return function(){ mover(param); }
}
function mover(num){
if(oldNum >= 0){
document.getElementById(createIdChar + oldNum).style.color = dlColor;
document.getElementById(createIdChar + oldNum).style.backgroundColor = dlBgColor;
}
if(num >= 0 && num < maxNum ){
document.getElementById(createIdChar + num).style.color = hlColor;
document.getElementById(createIdChar + num).style.backgroundColor = hlBgColor;	
}
oldNum = num;
}
function printItemList(e) {
if(e && isPrintItemList())
{
var code = e.keyCode;
if( code == 27 )
{
num = -1;
maxNum = -1;
oldNum = -1;
eliminateDropdownList();
}
/* 上下キーで移動を行う場合はここのコメントアウトを外す
else if(code == 38)
{moveup();}
else if(code == 40)
{movedown();}
else if( code == 37 || code == 39 )
{callMenuKey(e);}
*/
else if( code >= 37 && code <= 40 ){return;}
else if( code == 9 ){return;}
else if( code == 16 || code == 17 || code == 35 || code == 36 ){return;}
else
{
eliminateDropdownList();
maxNum = -1;
num = -1;
var in_code = document.getElementById(inputIdChar).value;
var target_url;
if(isPrintItemList()){
target_url = queryurl + in_code;
httpRequest(target_url, generateDropdownList);
}
}
}
else
{eliminateDropdownList();}
}
function isDelPrintItemList()
{
var in_code = document.getElementById(inputIdChar).value;
in_code = in_code.replace(/\-/,"");
if( !in_code.match(/^[0-9]{3,7}$/))
{
return true;
}
}
function isPrintItemList()
{
var in_code = document.getElementById(inputIdChar).value;
in_code = in_code.replace(/\-/,"");
if( in_code.match(/^[0-9]{3,7}$/))
{
return true;
}
else{
}
}

function httpRequest(target_url, funcitonReference) {
try
{httpObj = new ActiveXObject("Msxml2.XMLHTTP")}
catch(e)
{try
{httpObj = new ActiveXObject("Microsoft.XMLHTTP")}
catch(sc)
{httpObj = null}
}
if(!httpObj&&typeof XMLHttpRequest!="undefined")
{httpObj = new XMLHttpRequest()}
if(!httpObj)
{httpObjGenerateFail();}
timerId = setInterval('timeoutCheck()', timeInterval);
httpObj.open("GET", target_url, true);
httpObj.onreadystatechange = function()
{
if (httpObj.readyState == 4)
{
clearInterval(timerId);
if(httpObj.status == 200)
{funcitonReference(httpObj.responseText);}
else{return false;}
}
}
httpObj.send('');
}

function httpObjGenerateFail() {
return false;
}
function timeoutCheck() {
timeout_sec --;
if(timeout_sec <= 0) {
clearInterval(timerId);
httpObj.abort();
return false;
}
}
function setListeners(e) {
var code = document.getElementById(inputIdChar);
//alert(inputIdChar);
addListener(code, 'keyup', printItemList, false);
addListener(code, 'blur', eliminateDropdownList,false);
}
function addListener(elem, eventType, func, cap) {

if(elem.removeEventListener) {
elem.removeEventListener(eventType, func, cap);
} else if(elem.detachEvent) {
elem.detachEvent('on' + eventType, func);
} else {}

if(elem.addEventListener) {
elem.addEventListener(eventType, func, cap);
} else if(elem.attachEvent) {
elem.attachEvent('on' + eventType, func);
} else {
return false;
}
}
function moveup(){
if( maxNum <= 0 ){return;}
if( num == 0){num = maxNum - 1;}
else{num = oldNum - 1;}
mover(num);
}
function movedown(){
if( maxNum <= 0 ){return;}
if( num == maxNum - 1){num = 0;}
else{num = oldNum + 1;}
mover(num);    
}
