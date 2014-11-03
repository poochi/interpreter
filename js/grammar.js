function PRODUCTION() {
this.combinators = [];
this.times = 0;
}
PRODUCTION.prototype.combinatorpush= function(combinator) {
		this.combinators.push(combinator);
}

PRODUCTION.prototype.result= function(pos,tokens) {
this.times+=1;
console.log(pos);
if(this.times >10)
	return null;
var curpos = pos;
var errorcollector =[];
	for(var i=0;i<this.combinators.length;i++) {
		var x = this.combinators[0].result(pos,tokens);
		//combinator's result return ASTNODE
		if(x.tag != null)
			return x; //I guess it ll be alive till its being used ?
		else
			errorcollector.push(x);
	}	
var maxi;
for(var i=0;i<errorcollector.length;i++) {
		if( maxi.tokenpos <errorcollector[i].tokenpos)
			maxi = errorcollector[i];
}
return maxi;
}

//LOP
function GRAMMAR() {

//GRAMMAR and PRODUCTION
this.E = new PRODUCTION();
//E->(E+E)|INTVAR|INT
var adderterminals = [];
var asignmentterminals = [];
adderterminals.push(new TERMINAL('INT',null));
adderterminals.push(new TERMINAL('VAR',null));
this.adder1 = new ADDERS(this.E,this.E,adderterminals);
//E->(INTVAR=E)|INTVAR|INT
asignmentterminals.push(new TERMINAL('INTVAR',null));
asignmentterminals.push(new TERMINAL('INT',null));

this.assignment = new ASSIGNERS(null,this.E,null);
this.print = new PRINT(null,this.E,null);


//your GRAMMAR rule is broken into simpler rules (combinators like adders etc.,)
this.E.combinatorpush(this.E,this.E,this.adder1);
this.E.combinatorpush(this.E,this.E,this.assignment);


this.memorymanager = new MEMORYMANAGER();
}

//callbacks return terminals

//these callbacks define 'variable variable addition etc.,' Note all are strings you need to convert them properly!
GRAMMAR.prototype.registercallbacks= function() {

//just prints the value in the console
function print_val(uoperand) {
	var x = this.memorymanager.findvariable(uoperand.terminal.value);
		console.log(x);
}

//5+5,5+x,x+y
//accepts operands and returns a terminal
function add_var_var(boperand) {
var x,y;
//x and y are memoryiden
	if(boperand.leftTerminal.tag == 'INT')
		x = int(boperand.leftTerminal.value);
	if(boperand.rightTerminal.tag == 'INT')
		y = int(boperand.rightTerminal.value);

	if(boperand.leftTerminal.tag == 'VAR') {
		x = this.memorymanager.findvariable(boperand.leftTerminal.value);
		if(x == null)
			return null;		
	}
	if(boperand.rightTerminal.tag == 'VAR') {
		y = this.memorymanager.findvariable(boperand.rightTerminal.value);
		if(y == null)
			return null;
	}
	if(x.identifyer !=y.identifyer){
			if(x.identifyer == 'Integer')
				return new TERMINAL ('INT',string(x.value+y.value));
			else
				return null;
	}

return null;
}

this.adder1.registercallbackoperation(new BINARYOPERAND({tag:'INT',value:null},{tag:'INT',value:null}),add_intvar_intvar)
this.adder1.registercallbackoperation(new BINARYOPERAND({tag:'INT',value:null},{tag:'VAR',value:null}),add_intvar_intvar)
this.adder1.registercallbackoperation(new BINARYOPERAND({tag:'VAR',value:null},{tag:'VAR',value:null}),add_intvar_intvar)
this.adder1.registercallbackoperation(new BINARYOPERAND({tag:'VAR',value:null},{tag:'INT',value:null}),add_intvar_intvar)

this.assignment.registermemorycallback(this.memorymanager.updatevar);

this.print.registercallbackoperation(new UOPERAND(new TERMINAL('VAR',null)),print_val);
}
//We hande report error as the one which proceeded the highest among all productions.
GRAMMAR.prototype.run= function(tokens) {
var pos = 0;
astnode = this.E.result(0,tokens);
if(astnode.error != null)
	return "INTERPRETATION TERMINATED "+ astnode.error+" BEFORE THIS :: "+ tokenlist[astnode.tokenpos];
else
	return "SUCCESS";
}

