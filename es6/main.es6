//import {UIinit} from './UIinit.es5';

( ()=>{


var vm = UIinit(null, null);

$("#add").click( ()=>{
	vm.pX.push(new PartsLine({mo_No:114514, model_No:"Hello", position:"1,1,1", amount:3}))
});

vm.pX.push(new PartsLine({mo_No:"i34", amount:3}));
vm.pX.push(new PartsLine({mo_No:"i185", amount:3}));
vm.pX.push(new PartsLine({mo_No:"i186", amount:3}));
vm.pX.push(new PartsLine({mo_No:"m1804", amount:3}));

})();
