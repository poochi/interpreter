//Symbol table and memory manager
//uses datastructure
function MEMORYMANAGER() {
//table type memory no recycling
this.table = [];

}

//x is of type token
MEMORYMANAGER.prototype.addtotable(x,memval) {
this.table.push(new memiden(x.tag,x.value,memval));
}

//get var-
MEMORYMANAGER.prototype.getvar(t) {
for(i=0;i<this.table.length;i++)
	if(this.table[i].tag == t.tag && this.table[i].value = t.value)
		return new memiden(this.table[i]);
return null;
}

