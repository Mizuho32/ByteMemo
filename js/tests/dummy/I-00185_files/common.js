var Dom_NN4		= false;
var Dom_NN6		= false;

//Mac or Win����
var Dom_mac = false;
var Dom_win = false;

Dom_mac=navigator.userAgent.indexOf('Mac')!=-1;
if(!Dom_mac)
{
	Dom_win = true;
}

//NN or IE����
var Dom_IE = false;
var Dom_NN = false;

Dom_IE= navigator.userAgent.indexOf('MSIE') != -1;
if(!Dom_IE)
{
	Dom_NN= navigator.userAgent.indexOf('Mozilla') != -1;
}

if(Dom_NN)
{
	//NN Version����
	Dom_NN4= navigator.userAgent.indexOf('Mozilla/4') != -1;
	//Netscape6.2�ȏ�̏ꍇDom_NN6��true
	Dom_NN6= navigator.userAgent.indexOf('Netscape6') != -1;
	//NN4.x,6.x�ȊO��NN��NN6�Ƃ��ď���
	if(Dom_NN4 != true && Dom_NN6 != true)
	{
		Dom_NN6=true;
	}
}



function openWin(url) {
     window.open(url,"_blank","width=420,height=420,toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=no,favorites=no,resizable=yes");
}

// �_�u���N���b�N�̐���
var dblClickControl = false;

function checkDblClick() {
  if(!dblClickControl) {
    dblClickControl = true;
    return true;
  }
  else {
    return false;
  }
}

// �_�u���N���b�N���������m�F�_�C�A���O
function checkDblClickConfirm(msg) {
    if(!dblClickControl && window.confirm(msg)) {
        dblClickControl = true;
        return true;
    }
    return false;
}


function getElement(id)
{
	if(document.all) return document.all(id);
	if(document.getElementById) return document.getElementById(id);
}

//�e�m�F�`�F�b�N
window.onload = function ()
{
	var npwd1 = getElement("npwd1");
	var npwd2 = getElement("npwd2");
	var newid1 = getElement("newid1");
	var newid2 = getElement("newid2");
	var mail = getElement("mail");
	var cmail = getElement("cmail");
	// �����񃁁[���A�h���X�`�F�b�N
	if(mail && cmail)
	{
		cmail.form.onsubmit = function() { return checkMail(mail,cmail); }
	}
	// �V�p�X���[�h�Ɗm�F�p�X���[�h�̃`�F�b�N
	if(npwd1 && npwd2)
	{
		npwd2.form.onsubmit = function() { return checkpass(npwd1,npwd2); }
	}
	// �VID�Ɗm�FID�̃`�F�b�N
		if(newid1 && newid2)
	{
		newid2.form.onsubmit = function() { return checkid(newid1,newid2); }
	}
}


function checkMail(mail, cmail)
{
	if(mail.value != cmail.value)
	{
		alert ("���[���A�h���X�ƃ��[���A�h���X�i�m�F�j����v���܂���");
    	dblClickControl = false;
		return false;
	}
	return true;
}

function checkpass(npwd1, npwd2)
{
	if(npwd1.value != npwd2.value)
	{
		alert ("���͂��ꂽ�p�X���[�h�Ɗm�F�p�p�X���[�h����v���܂���");
		return false;
	}
	return true;
}

function checkid(newid1, newid2)
{
	if(newid1.value != newid2.value)
	{
		alert ("���͂��ꂽID�Ɗm�F�pID����v���܂���");
		return false;
	}
	return true;
}

function checkidpass(arg1,arg2)
{
	var arg1v = document.getElementById(arg1).value;
	var arg2v = document.getElementById(arg2).value;

	if(arg1v != "" && arg2v != "")
		{
		if(arg1v == arg2v)
			{
			alert("���q�lID�ƃp�X���[�h�͕ʁX�̂��̂��w�肵�Ă�������");
			document.getElementById(arg2).value = "";
			return false;
			}
		}
}

function checkidpass(arg1,arg2,arg3)
{
	var arg1v = document.getElementById(arg1).value;
	var arg2v = document.getElementById(arg2).value;

	if(arg1v != "" && arg2v != "")
		{
		if(arg1v == arg2v)
			{
			alert("���q�lID�ƃp�X���[�h�͕ʁX�̂��̂��w�肵�Ă�������");
			document.getElementById(arg2).value = "";
			if(arg3){document.getElementById(arg3).value = "";}
			return false;
			}
		}

	//��2010.10.05 [natakahashi] �m�F�p�p�X���[�h�`�F�b�N
	if(arg3){
		return checkpass(document.getElementById(arg2), document.getElementById(arg3));
	}
}


//�A���P�[�g�p
//�_�u���N���b�N�֎~����
var iPrevTime = null;
function formSubmit() {
	if( iPrevTime == null ) {
		iPrevTime = 1;
		return true;
	} else {
		return false;
	}
}

//���p<->�S�p�ϊ�
function StrConvert(obj, isHanToZen){
	var str = obj.value;
	var conv = "";
	var map = isHanToZen ? convmap.hanMap : convmap.zenMap;
	
	for (var i = 0; i < str.length; i++) {
		var tmp = "";
		if (i < str.length - 1 ){
			tmp = str.substring(i,i+2);	
		}
		if (map[tmp]) {
			conv += map[tmp];
			i++;
			continue;
		} else {
			tmp = str.substring(i, i + 1);
			conv += map[tmp] ? map[tmp] : tmp;
		}
	}
	obj.value = conv;
	return true;
}

//���p<->�S�p�ϊ��}�b�s���O�N���X
function ConvertMaps() {
	this.hanMap = {};
	this.zenMap = {};
	this.Init = function(){
		//�S�p->���p�}�b�v
		this.zenMap = {
			'��' : 'a',
			'��' : 'b',
			'��' : 'c',
			'��' : 'd',
			'��' : 'e',
			'��' : 'f',
			'��' : 'g',
			'��' : 'h',
			'��' : 'i',
			'��' : 'j',
			'��' : 'k',
			'��' : 'l',
			'��' : 'm',
			'��' : 'n',
			'��' : 'o',
			'��' : 'p',
			'��' : 'q',
			'��' : 'r',
			'��' : 's',
			'��' : 't',
			'��' : 'u',
			'��' : 'v',
			'��' : 'w',
			'��' : 'x',
			'��' : 'y',
			'��' : 'z',
			'�`' : 'A',
			'�a' : 'B',
			'�b' : 'C',
			'�c' : 'D',
			'�d' : 'E',
			'�e' : 'F',
			'�f' : 'G',
			'�g' : 'H',
			'�h' : 'I',
			'�i' : 'J',
			'�j' : 'K',
			'�k' : 'L',
			'�l' : 'M',
			'�m' : 'N',
			'�n' : 'O',
			'�o' : 'P',
			'�p' : 'Q',
			'�q' : 'R',
			'�r' : 'S',
			'�s' : 'T',
			'�t' : 'U',
			'�u' : 'V',
			'�v' : 'W',
			'�w' : 'X',
			'�x' : 'Y',
			'�y' : 'Z',
			'�O' : '0',
			'�P' : '1',
			'�Q' : '2',
			'�R' : '3',
			'�S' : '4',
			'�T' : '5',
			'�U' : '6',
			'�V' : '7',
			'�W' : '8',
			'�X' : '9',
			'�I' : '!',
			'��' : '@',
			'��' : '#',
			'��' : '$',
			'��' : '%',
			'�O' : '^',
			'��' : '&',
			'��' : '*',
			'�i' : '(',
			'�j' : ')',
			'�Q' : '_',
			'�{' : '+',
			'�b' : '|',
			'�P' : '~',
			'�|' : '-',
			'��' : '=',
			'��' : '\\',
			'�M' : '`',
			'�o' : '{',
			'�p' : '}',
			'�m' : '[',
			'�n' : ']',
			'�F' : ':',
			'�h' : '"',
			'�G' : ';',
			'�f' : '\'',
			'��' : '<',
			'��' : '>',
			'�H' : '?',
			'�C' : ',',
			'�D' : '.',
			'�^' : '/',
			'�B' : '�',
			'�u' : '�',
			'�v' : '�',
			'�A' : '�',
			'�E' : '�',
			'��' : '�',
			'�@' : '�',
			'�B' : '�',
			'�D' : '�',
			'�F' : '�',
			'�H' : '�',
			'��' : '�',
			'��' : '�',
			'��' : '�',
			'�b' : '�',
			'�[' : '�',
			'�A' : '�',
			'�C' : '�',
			'�E' : '�',
			'�G' : '�',
			'�I' : '�',
			'�J' : '�',
			'�L' : '�',
			'�N' : '�',
			'�P' : '�',
			'�R' : '�',
			'�T' : '�',
			'�V' : '�',
			'�X' : '�',
			'�Z' : '�',
			'�\' : '�',
			'�^' : '�',
			'�`' : '�',
			'�c' : '�',
			'�e' : '�',
			'�g' : '�',
			'�i' : '�',
			'�j' : '�',
			'�k' : '�',
			'�l' : '�',
			'�m' : '�',
			'�n' : '�',
			'�q' : '�',
			'�t' : '�',
			'�w' : '�',
			'�z' : '�',
			'�}' : '�',
			'�~' : '�',
			'��' : '�',
			'��' : '�',
			'��' : '�',
			'��' : '�',
			'��' : '�',
			'��' : '�',
			'��' : '�',
			'��' : '�',
			'��' : '�',
			'��' : '�',
			'��' : '�',
			'��' : '�',
			'��' : '�',
			'�K' : '��',
			'�M' : '��',
			'�O' : '��',
			'�Q' : '��',
			'�S' : '��',
			'�U' : '��',
			'�W' : '��',
			'�Y' : '��',
			'�[' : '��',
			'�]' : '��',
			'�_' : '��',
			'�a' : '��',
			'�d' : '��',
			'�f' : '��',
			'�h' : '��',
			'�o' : '��',
			'�p' : '��',
			'�r' : '��',
			'�s' : '��',
			'�u' : '��',
			'�v' : '��',
			'�x' : '��',
			'�y' : '��',
			'�{' : '��',
			'�|' : '��',
			'��' : '��',
			'�J' : '�',
			'�K' : '�',
			'�@' : ' '
		};
		
		//���p->�S�p�}�b�v
		for (var key in this.zenMap) {
			if(!this.hanMap[this.zenMap[key]]){
				this.hanMap[this.zenMap[key]] = key;
			}
		}
	}
}
var convmap = new ConvertMaps();
convmap.Init();


<!--
function MM_preloadImages() { //v3.0
  var d=document; if(d.images){ if(!d.MM_p) d.MM_p=new Array();
    var i,j=d.MM_p.length,a=MM_preloadImages.arguments; for(i=0; i<a.length; i++)
    if (a[i].indexOf("#")!=0){ d.MM_p[j]=new Image; d.MM_p[j++].src=a[i];}}
}

function MM_swapImgRestore() { //v3.0
  var i,x,a=document.MM_sr; for(i=0;a&&i<a.length&&(x=a[i])&&x.oSrc;i++) x.src=x.oSrc;
}

function MM_findObj(n, d) { //v4.01
  var p,i,x;  if(!d) d=document; if((p=n.indexOf("?"))>0&&parent.frames.length) {
    d=parent.frames[n.substring(p+1)].document; n=n.substring(0,p);}
  if(!(x=d[n])&&d.all) x=d.all[n]; for (i=0;!x&&i<d.forms.length;i++) x=d.forms[i][n];
  for(i=0;!x&&d.layers&&i<d.layers.length;i++) x=MM_findObj(n,d.layers[i].document);
  if(!x && d.getElementById) x=d.getElementById(n); return x;
}

function MM_swapImage() { //v3.0
  var i,j=0,x,a=MM_swapImage.arguments; document.MM_sr=new Array; for(i=0;i<(a.length-2);i+=3)
   if ((x=MM_findObj(a[i]))!=null){document.MM_sr[j++]=x; if(!x.oSrc) x.oSrc=x.src; x.src=a[i+2];}
}
//-->

<!--
function MM_openBrWindow(theURL,winName,features) { //v2.0
  window.open(theURL,winName,features);
}
//-->

<!--
function MM_reloadPage(init) {  //reloads the window if Nav4 resized
  if (init==true) with (navigator) {if ((appName=="Netscape")&&(parseInt(appVersion)==4)) {
    document.MM_pgW=innerWidth; document.MM_pgH=innerHeight; onresize=MM_reloadPage; }}
  else if (innerWidth!=document.MM_pgW || innerHeight!=document.MM_pgH) location.reload();
}
MM_reloadPage(true);
// -->

function opw(url, windowname, width, height, toolbar) {
    window.status='Loading...';
    var t=new Date();
    var oWin = window.open(url,windowname,'width=' + width + ',height=' + height + ',toolbar=' + toolbar + ',location=no,directories=no,scrollbars=yes,resizable=yes,status=yes');
    if (oWin == null) { window.alert('�ēx�N���b�N���Ă�������'); return false; };
    oWin.focus();window.self.status='';
    return false;
}

function selectMethod(method) {
	if (method == 1) {			//��s�U��
		if(document.getElementById('method_dest') != null) {
			document.getElementById('dest1office').checked = false;
			document.getElementById('method_dest').style.display = "none";
		}
//		2014/10/30
//		document.getElementById('export_0').checked = false;
//		document.getElementById('export_s').style.display = "inline";
//		document.getElementById('export_y').style.display = "inline";
		return;

	//���������Ή��o�b�N�A�b�v
	//} else if (method == 2) {	//�����
	//	var total_price = document.getElementById('method_total_price').value;
	//	var min_price = parseInt(document.getElementById('method_min_price').value);
	//	var max_price = parseInt(document.getElementById('method_max_price').value);
	//	var min_price2 = parseInt(document.getElementById('method_min_price2').value);
	//	var max_price2 = parseInt(document.getElementById('method_max_price2').value);
	//	document.getElementById('export_s').style.display = "block";
	//	document.getElementById('export_y').style.display = "block";
	//	if (min_price <= total_price && total_price <= max_price) {
	//		document.getElementById('export_s').style.display = "block";
	//	} else {
	//		document.getElementById('export_0').checked = false;
	//		document.getElementById('export_s').style.display = "none";
	//	}
	//	if (min_price2 <= total_price && total_price <= max_price2) {
	//		//document.getElementById('export_y').style.display = "block";
	//	} else {
	//		document.getElementById('export_1').checked = false;
	//		document.getElementById('export_y').style.display = "none";
	//	}
	} else if (method == 2) {	//�����
		var total_price = document.getElementById('method_total_price').value;
		var min_price = parseInt(document.getElementById('method_min_price').value);
		var max_price = parseInt(document.getElementById('method_max_price').value);
		var min_price2 = parseInt(document.getElementById('method_min_price2').value);
		var max_price2 = parseInt(document.getElementById('method_max_price2').value);
		
		document.getElementById('export_s').style.display = "inline";
		document.getElementById('export_y').style.display = "inline";
		
		if (min_price <= total_price && total_price <= max_price) {
			document.getElementById('export_s').style.display = "inline";
		} else {
			document.getElementById('export_0').checked = false;
			document.getElementById('export_s').style.display = "none";
		}
		if (min_price2 <= total_price && total_price <= max_price2) {
			document.getElementById('export_y').style.display = "inline";
		} else {
			document.getElementById('export_1').checked = false;
			document.getElementById('export_y').style.display = "none";
		}
	} else if (method == 4) {			//�N���W�b�g�J�[�h(����̂�)
		document.getElementById('export_s').style.display = "inline";
		document.getElementById('export_y').style.display = "inline";
	} else {
		document.getElementById('export_s').style.display = "inline";
		document.getElementById('export_y').style.display = "inline";
	}
	if (document.getElementById('export_y').style.display == "inline" && document.getElementById('export_1').checked) {
		document.getElementById('time_spec').style.display = "none";
		document.getElementById('time_specy').style.display = "block";
		if(document.getElementById('method_dest') != null) {
			document.getElementById('dest1office').checked = false;
			document.getElementById('method_dest').style.display = "none";
		}
	} else {
		document.getElementById('time_spec').style.display = "block";
		document.getElementById('time_specy').style.display = "none";
		if(document.getElementById('method_dest') != null) {
			document.getElementById('method_dest').style.display = "block";
		}
	}
}

function selectExport(export_) {
	if(export_ == 1) {
		document.getElementById('time_spec').style.display = "none";
		document.getElementById('time_specy').style.display = "block";
		if(document.getElementById('method_dest') != null) {
			document.getElementById('dest1office').checked = false;
			document.getElementById('method_dest').style.display = "none";
		}
	} else {
		document.getElementById('time_spec').style.display = "block";
		document.getElementById('time_specy').style.display = "none";
		if(document.getElementById('method_dest') != null) {
			document.getElementById('method_dest').style.display = "block";
		}
	}
}

function UpdateLink(link) {

 document.getElementById("imglink").href = link;

}

// util
function _ecUtil() {
    // �_�u���N���b�N�֎~����
    this.ignoreDblClickFlag = null;
    
    // �_�u���N���b�N�i�A���|�X�g�j�̐���
    this.ignoreDblClick = function() {
        if (this.ignoreDblClickFlag == null) {
            this.ignoreDblClickFlag = 1;
            return true;
        } else {
            return false;
        }
    }
    
    // �ėp���̓`�F�b�N
    this.confirmInputCheck = function() {
        // �p�X���[�h�`�F�b�N
        if (jQuery('#npwd1').size() == 1 && jQuery('#npwd2').size() == 1) {
            if (jQuery('#npwd1').val() != jQuery('#npwd2').val()) {
                alert('���͂��ꂽ�p�X���[�h�Ɗm�F�p�p�X���[�h����v���܂���');
                ecUtil.ignoreDblClickFlag = false;
                return false;
            }
        }

        // ID��PASS�̕s��v�m�F
        if (jQuery('#oldid').size() == 1 && jQuery('#npwd1').size() == 1) {
            if (jQuery('#oldid').val() != "" && jQuery('#npwd1').val() != "" ) {
	            if (jQuery('#oldid').val() == jQuery('#npwd1').val()) {
	                alert('���[���A�h���X�Ɠ��l�̃p�X���[�h�͓��͂ł��܂���');
	                jQuery('#npwd1').val('');
	                jQuery('#npwd2').val('');
	                ecUtil.ignoreDblClickFlag = false;
	                return false;
	            }
			}
	    }
        
        return true;
    }

}

var ecUtil = new _ecUtil();