//import {Util} from './Util.js';
	class PartsLine{
		constructor(param){
			param = param || {model_No:null, position:null, model_No:null, amount:null};
			this.mo_No = ko.observable(param.mo_No);
			this.position = ko.observable(param.position);
			this.model_No = ko.observable(param.model_No);
			this.amount = ko.observable(param.amount);
			
			this.B = ko.observable();
		}
	}

	class Parts{
		constructor(params){
			this.lines = params.lines || ko.observableArray([]);
			this.addLine = ()=>{ this.lines.push(new PartsLine()) };
			this.removeLine = (line) =>{ this.lines.remove( line ) };
			this.onMouseOver = (record)=>{
//				console.log(record);
			};
		}
	}

	var temp = document.getElementById("parts");
	ko.components.register('parts',{
		viewModel:Parts,
		template: { element: temp }
	});

	class VM{
		constructor(){
			this.pX = ko.observableArray([new PartsLine()]);
			this.nX = ko.observableArray([new PartsLine()]);

			this.pY = ko.observableArray([new PartsLine()]);
			this.nY = ko.observableArray([new PartsLine()]);

			this.pZ = ko.observableArray([new PartsLine()]);
			this.nZ = ko.observableArray([new PartsLine()]);

//			this.view3Dclick = ()=>{ console.log("hello 3d"); this.selectclick(); };
/*			this.selectclick = ()=>{ 
				console.log(" select clicked ", $(".cropper-container.cropper-bg"));
				$(".cropper-container.cropper-bg").css({
					height: '100%',
					width: '100%'
				}); 
				$("#picture").cropper("hello")				
			}*/

		}
	}

function UIinit( ocr, view ){
	var vm = new VM();
	vm.pX.push(new PartsLine());
	vm.pX.push(new PartsLine());

	ko.applyBindings(vm);

/*
	$("#read").click( ()=>{
		view.camControl.addParts( data );
		switch(quad){
			case 'X' : 
				ko.pX.push(new PartsLine(data.MoNo, null, new THREE.Vector3(0, 0, 0)));
			break;
		}
	});*/

	return vm;

}
