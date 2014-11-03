

//Datastructures
function TERMINAL(tag,value) {
this.tag = tag;
this.value = value; //can be dummy
}


//takes in tokens
function BINARYOPERAND(leftTerminal,rightTerminal) {
this.leftTerminal = new TERMINAL(leftTerminal.tag,leftTerminal.value);
this.rightTerminal = new TERMINAL(rightTerminal.tag,rightTerminal.value);
}

//memory
function MEMIDEN(tag,identifier,value) {
this.tag = tag;
this.identifier = identifier; //name of the variable
this.value = value; //value of the varaiable
var m ="/[0-9]+/".exec(x.identifier);
	if(m.index == 0)
		this.type = 'Integer';
	m ="/\"[.*]\"/".exec(x.identifier);
	if(m.index == 0)
		this.type = 'string';	

}
MEMIDEN.prototype.memidenset= function(x) {
	this.tag = x.tag
	this.identifier = x.identifier
	this.value = x.value
	//determine type based on RE
	var m ="/[0-9]+/".exec(x.identifier);
	if(m.index == 0)
		this.type = 'Integer';
	m ="/\"[.*]\"/".exec(x.identifier);
	if(m.index == 0)
		this.type = 'string';	
}

function UOPERAND(terminal) {
this.terminal = new TERMINAL(terminal.tag,terminal.value);
}

function ASTNODE(tag,value,error,tokenpos) {
this.tag = tag;
this.value = value;
this.error = error;
this.tokenpos = tokenpos;

}
/*
ERROR CODES

*/