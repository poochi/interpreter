assigners.prototype.isterminal(token) {
	for(var i=0;i<this.terminals.length;i++)
		if(token[tag] == terminals[i].tag)
			return true;
	return false;

}

//parameter should be BinaryOperand and callback
assigners.prototype.registercallbackoperation(BOperand,callback) {
this.addercallback.push({operand:BOperand,callback:callback});
}

//parameter should be BinaryOperand and callback
assigners.prototype.checkcallback(BOperand) {
for(var i=0;i<addercallback.length;i++) {
//what kinda check reference ?
	if (this.addercallback[i].operand.leftTerminal.tag == BOperand.leftTerminal.tag && this.addercallback[i].operand.rightTerminal.tag == BOperand.rightTerminal.tag)
		return this.addercallback[i].operand.callback;
}
return null;
		
}
//evaluates and returns a token
assigners.prototype.evaluate(Ltoken,RToken) {
//Distinguish string string adition, can be done based on terminals registering a call back etc.,
				var temp = new BinaryOperand(x.tag,y.tag);
				var cbk = this.checkcallback(temp);
				if(cbk == null)
					return null;
				return cbk(Ltoken,RToken);
}

//result should return a token (or null) if there is an error it should
assigners.prototype.result(position,tokenlist) {
var current_pos = position;
var y ;

	if(tokenlist[current_pos++].tag == 'PARAN OPEN' ) {
		if(tokenlist[current_pos].tag == 'VAR' ) {		
			tokenlist[current_pos].value
			if(tokenlist[current_pos++].tag == 'EQUAL' ) {
				y = this.rightproduction.result(current_pos,tokenlist);
			}
		}
	}
			
			
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