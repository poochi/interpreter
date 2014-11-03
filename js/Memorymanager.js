//Symbol table and memory manager
//uses datastructure

//accepts an AST NODE and returns an AST NODE
function MEMORYMANAGER() {
//manual garbage collection
//table type memory no recycling
this.table = [];

}

//accepts variablename and returns astnode
MEMORYMANAGER.prototype.findvariable= function(variablename) {
for(i=0;i<this.table.length;i++)
	if(this.table[i].identifyer == variablename)
		return this.table[i];
return null;
}

MEMORYMANAGER.prototype.updatevar= function(vname,astnode) {
var x = new MEMIDEN(astnode.tag,vname,astnode.value);
for(i=0;i<this.table.length;i++)
	if(this.table[i].vname == x.tag) {		
		this.table[i].memidenset(x);		
		return true;
	}
this.table.push(x);
//change it based on value
	return astnode;
}
