//Combinators 
//function adders(leftproduction,rightproduction,terminals) 
//function assigners(leftproduction,rightproduction,terminals) 


//ADDGRAMMAR(E,E) -> (E+E)|T
function adders(leftproduction,rightproduction,terminals) {
this.operator = '+';
//Left production is a type of production
this.leftproduction  = leftproduction;
this.rightproduction  = rightproduction;

//accepted terminals
this.terminals = terminals;

//callbacks for operation (string+string etc.,)
this.addercallback=[];

}
adders.prototype.isterminal(token) {
	for(var i=0;i<this.terminals.length;i++)
		if(token[tag] == terminals[i].tag)
			return true;
	return false;

}

//parameter should be BinaryOperand and callback
adders.prototype.registercallbackoperation(BOperand,callback) {
this.addercallback.push({operand:BOperand,callback:callback});
}

//parameter should be BinaryOperand and callback
adders.prototype.checkcallback(BOperand) {
for(var i=0;i<addercallback.length;i++) {
//what kinda check reference ?
	if (this.addercallback[i].operand.leftTerminal.tag == BOperand.leftTerminal.tag && this.addercallback[i].operand.rightTerminal.tag == BOperand.rightTerminal.tag)
		return this.addercallback[i].operand.callback;
}
return null;
		
}
//evaluates and returns a token
adders.prototype.evaluate(Ltoken,RToken) {
//Distinguish string string adition, can be done based on terminals registering a call back etc.,
				var temp = new BinaryOperand(x.tag,y.tag);
				var cbk = this.checkcallback(temp);
				if(cbk == null)
					return null;
				return cbk(Ltoken,RToken);
}

//result should return a token (or null) if there is an error it should
adders.prototype.result(position,tokenlist) {
var current_pos = position;
	//somehow terminal grammar should be specified
	if(this.isterminal(tokenlist[current_pos]))
		return tokenlist[current_pos];	
	if(tokenlist[current_pos] == '(' ) {
		var x = this.leftproduction.result(current_pos++,tokenlist);							
			if ( x!= null) {
				if(!tokenlist[current_pos++] == '+' ) 
					return null;
				var y = this.rightproduction.result(current_pos++,tokenlist);
				//evaluate expression
				var res = this.evaluate(x,y);
				//ERROR IN CODE
				//handle res == null
				return res;
					
			}else
				return null;
		
			
		
	}else
		return null;


}


//L->(T=L)|(T=INTVAR)|(T=INT)
function assigners(leftproduction,rightproduction,terminals) {
//Left production is a type of production
this.leftproduction  = leftproduction;
this.rightproduction  = rightproduction;

//accepted terminals
this.terminals = terminals;

//callbacks for operation (string+string etc.,)
this.callback=[];

}