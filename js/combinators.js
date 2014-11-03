//Combinators 
//function ADDERS(leftproduction,rightproduction,terminals) 
//function ASSIGNERS(leftproduction,rightproduction,terminals) 

//Combinators are 'smaller' parsers that return ASTNODE



//ADDGRAMMAR(E,E) -> (E+E)|T
function ADDERS(leftproduction,rightproduction,terminals) {
this.operator = '+';
//Left production is a type of production
this.leftproduction  = leftproduction;
this.rightproduction  = rightproduction;

//accepted terminals
this.terminals = terminals;

//callbacks for operation (string+string etc.,)
this.addercallback=[];

}




ADDERS.prototype.isterminal= function(token) {
	for(var i=0;i<this.terminals.length;i++) {
		if(token[tag] == terminals[i].tag)
			return true;
	}
	return false;

}




//parameter should be BinaryOperand and callback
ADDERS.prototype.registercallbackoperation= function(BOperand,callback) {
this.addercallback.push({operand:BOperand,callback:callback});
}

//parameter should be BinaryOperand and callback
ADDERS.prototype.checkcallback= function(BOperand) {
for(var i=0;i<addercallback.length;i++) {
//what kinda check reference ?
	if (this.addercallback[i].operand.leftTerminal.tag == BOperand.leftTerminal.tag && this.addercallback[i].operand.rightTerminal.tag == BOperand.rightTerminal.tag)
		return this.addercallback[i].operand.callback;
}
return null;
		
}
//evaluates and returns a terminal
ADDERS.prototype.evaluate= function(Ltoken,RToken) {
//Distinguish string string adition, can be done based on terminals registering a call back etc.,
				var temp = new BinaryOperand(x.tag,y.tag);
				var cbk = this.checkcallback(temp);
				if(cbk == null)
					return null;
				return cbk(Ltoken,RToken);
}

//the result of a production is an ASTNODE
ADDERS.prototype.result= function(position,tokenlist) {
var current_pos = position;
	//somehow terminal grammar should be specified
	if(this.isterminal(tokenlist[current_pos])) {
		return new ASTNODE(tokenlist.tag,tokenlist.value,null,current_pos+1);	
	}
	if(tokenlist[current_pos] == '(' ) {
		var x = this.leftproduction.result(current_pos+1,tokenlist);
		// x is an ASTNODE
			if ( x.tag!= null) {
				if(!tokenlist[x.tokenpos+1] == '+') {					
					return new ASTNODE(null,null,"Missing +",x.tokenpos+1);
				}
				var y = this.rightproduction.result(x.tokenpos+1,tokenlist);
				//evaluate expression
				if ( y.tag!= null) {
					var res = this.evaluate(x,y);
					//res is a terminal
					if (res == null)
						return new ASTNODE(null,null," + Operation undefined ",y.tokenpos+1);					
					
				} else {
					//some error with y
					return y;
				
				}
				if(!tokenlist[y.tokenpos+1].tag == 'PARAN CLOSE')
					return new ASTNODE(null,null,"Missing closing brace",y.tokenpos+2);
				return new ASTNODE(res.tag,res.value,null,y.tokenpos+2);
			}else {
				//some error with x
				return x;
			}
		
			
		
	}else {
		return new ASTNODE(null,null,"Missing OPEN brace",current_pos);
	}


}


//E->(T=E)
function ASSIGNERS(leftproduction,rightproduction,terminals) {
//Left production is a type of production
this.leftproduction  = leftproduction;
this.rightproduction  = rightproduction;

//accepted terminals
this.terminals = terminals;

//callbacks for operation (string+string etc.,)
this.assignercallback=[];


//interfaces for memory related operation.
this.findvariablecbk = 0;
this.addvariablecbk = 0;
this.updatevariablecbk = 0;

}



ASSIGNERS.prototype.registermemorycallback= function(updatevar) {
this.updatevariablecbk = updatevar;
}

//the result of a combinator/production is an ASTNODE
ASSIGNERS.prototype.result= function(position,tokenlist) {
var current_pos = position;	
	if(tokenlist[current_pos].tag == 'PARAN OPEN' ) {
		current_pos+=1;
		if(tokenlist[current_pos].tag == 'VAR' ) {
			variable_name = tokenlist[current_pos].value;
		} else
			return new ASTNODE(null,null,"Missing L variable",current_pos); 
		current_pos +=1;
		if(tokenlist[current_pos].tag == 'EQUAL' ) {
			current_pos+=1;
			var x = this.rightproduction.result(current_pos,tokenlist);
			current_pos = x.tokenpos;
			// x is an ASTNODE
				if ( x.tag!= null) {
					//res returns an AST NODE
					var res = this.updatevariablecbk(variable_name,x)
					if(res.tag != null) {
						if(!tokenlist[current_pos+1].tag == 'PARAN CLOSE')
							return new ASTNODE(null,null,"Missing closing brace",current_pos+1);
						return new ASTNODE(res.tag,res.value,null,current_pos+2);
					}	
				
				
				}else {
					//something was wrong in the right production
					return x;
				}
				
				
			
		} else {
			return new ASTNODE(null,null,"Missing Equal variable",current_pos); 
		
		}		
	}else
		return new ASTNODE(null,null,"Missing OPEN brace",current_pos);


}