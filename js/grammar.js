//DEP
//datastructures.js

//grammar production (language) specifier

//E->(E+E)|T
//E->(T=E)

//T is included 
//E->ADDGRAMMAR(E,E)
//E->ASSIGNMENT(E)
//No respect to SE principles ., Im sorry ! I just want it quickly ., cant read JS for now.
//Binary operators
//These are parsers of smaller language
//Specific language CFG

//left production and right production to create an adder object and add them to the production rule of object
//generation is via result.
function production() {
this.combinators = [];
}
production.prototype.combinatorpush(l,r,terminal) {
		this.combinators.push(adders(this,this,terminals));
}

production.prototype.result(pos,tokens) {
var curpos = pos;
	for(var i=0;i<combinators.length;i++) {
		var x = combinators[0].result(pos,tokens);
		if(x)
			return x; //I guess it ll be alive till its being used ?
	}
	return null;
}

//LOP
function grammar() {

//grammar and production
this.E = new production();
//E->(E+E)|INTVAR|INT
var adderterminals = [];
var asignmentterminals = [];
adderterminals.push(new TERMINAL('INT',null));
adderterminals.push(new TERMINAL('INTVAR',null));
this.adder1 = new adder(this.E,this.E,adderterminals);
//E->(INTVAR=E)|INTVAR|INT
asignmentterminals.push(new TERMINAL('INTVAR',null));
asignmentterminals.push(new TERMINAL('INT',null));

this.assignment = new assignment(null,this.E,asignmentterminals);
//your grammar rule is broken into simpler rules (combinators like adders etc.,)
this.E.combinatorpush(this.E,this.E,this.adder1);
this.E.combinatorpush(this.E,this.E,this.assignment);

this.memorymanager = new MEMORYMANAGER();
}

//these callbacks define 'variable variable addition etc.,' Note all are strings you need to convert them properly!
grammar.prototype.registercallbacks() {
//write code to register callbacks for different combinators
//eg,. if you want string string addition then define it here and register it with the corresponding adder
// currently int int addition is only supported
//should return token


//5+5,5+x,x+y
function add_intvar_intvar(boperand) {
var x,y;
	if(boperand.leftTerminal == 'INT')
		x = int(boperand.leftTerminal.value);
	if(boperand.rightTerminal == 'INT')
		y = int(boperand.rightTerminal.value);

	if(boperand.leftTerminal == 'INTVAR')
		x = this.memorymanager.lookupvar(boperand.leftTerminal.value);
	if(boperand.rightTerminal == 'INTVAR')
		y = this.memorymanager.lookupvar(boperand.rightTerminal.value);
	if(x!=null && y!= null)
		return {tag:'INT',value:string(x+y)};
return null;
}

//note the non associativity in general
this.adder1.registercallbackoperation(new BOperand({tag:'INT',value:null},{tag:'INT',value:null}),add_intvar_intvar)
this.adder1.registercallbackoperation(new BOperand({tag:'INT',value:null},{tag:'INTVAR',value:null}),add_intvar_intvar)
this.adder1.registercallbackoperation(new BOperand({tag:'INTVAR',value:null},{tag:'INTVAR',value:null}),add_intvar_intvar)
this.adder1.registercallbackoperation(new BOperand({tag:'INTVAR',value:null},{tag:'INT',value:null}),add_intvar_intvar)




}

grammar.prototype.run(tokens) {
var pos = 0;
this.result
}