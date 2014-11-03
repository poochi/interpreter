//Combinators 
//function PRINT(leftproduction,rightproduction,terminals) 
//PRINT(E) -> (PRINT E)|T

//
function PRINT(leftproduction,rightproduction,terminals) {
//Left production is a type of production
this.leftproduction  = leftproduction;
this.rightproduction  = rightproduction;

//accepted terminals
this.terminals = terminals;

//callbacks for operation (string+string etc.,)
this.printcallback=[];
}

//parameter should be of type UOPERAND
PRINT.prototype.registercallbackoperation= function(UOperand,callback) {
	this.printcallback.push({operand:UOperand,callback:callback});
}


PRINT.prototype.evaluate= function(UOperand) {
		this.checkcallback(UOperand);
}

//parameter should be BinaryOperand and callback
PRINT.prototype.checkcallback= function(UOperand) {
	for(var i=0;i<printcallback.length;i++) {
	//what kinda check reference ?
		if (this.printcallback[i].operand.terminal.tag == UOperand.terminal.tag)
			return this.printcallback[i].operand.callback(UOperand);
	}
	return null;
		
}

//the result of a combinator/production is an ASTNODE
PRINT.prototype.result = function(position,tokenlist) {
var current_pos = position;
	if(tokenlist[current_pos++].tag == 'PARAN OPEN' ) {
		if(tokenlist[current_pos++].tag == 'PRINT' )  {
			var x = this.rightproduction.result(current_pos,tokenlist);							
			var tokenpos = x.tokenpos;
			// x is an AST NODE
				if ( x.tag!= null) {
					//returns a TERMINAL
					var res = this.evaluate(x);
					if(tokenlist[x.tokenpos].tag == 'PARAN CLOSE') {					
						return new ASTNODE(res.tag,res.value,null,x.tokenpos+1);
					}
					else{
						//failed to parse with this combinator because of closing brace
						return new ASTNODE(null,null,"Missing closing brace",x.tokenpos);
					}
						
				} else {
					//failed to parse right production due return the reason back
					return x;
					
				}
		} else {
			//its not a print type (its not an error!)
			return new ASTNODE(null,null,null,position);			
		}	
		
	}else {
		//BRACE MISSING
		return new ASTNODE(null,null,"Missing OPEN brace",position);
	}
}

