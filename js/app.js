var tokens =[];
//Define your langue syntax ('how does your language look') here
//Keywords of language , arrange them based on reverse priority

//keywords
tokens.push({re:/\(/,tag:'PARAN_OPEN'});
tokens.push({re:/\)/,tag:'PARAN_CLOSE'});
tokens.push({re:/while/,tag:'while'});
tokens.push({re:/for/,tag:'for'});
tokens.push({re:/if/,tag:'if'});
tokens.push({re:/end/,tag:'end'});
tokens.push({re:/\(/,tag:'open paran'});
tokens.push({re:/\)/,tag:'close paran'});
//logical operators
tokens.push({re:/\>\=/,tag:'GE'});
tokens.push({re:/\<\=/,tag:'LE'});
tokens.push({re:/\>/,tag:'L'});
tokens.push({re:/\</,tag:'G'});
tokens.push({re:/\=\=/,tag:'isEQ'});
//number
//tokens.push({re:/[0-9]+\.[0-9]+/,tag:'float'});
tokens.push({re:/[0-9]+/,tag:'INT'});
//operators
tokens.push({re:/\*/,tag:'multiply'});
tokens.push({re:/\//,tag:'divide'});
tokens.push({re:/\-/,tag:'subtract'});
tokens.push({re:/\+/,tag:'plus'});
tokens.push({re:/[\=]/,tag:'equal'});

//words
tokens.push({re:/[ \t\n\r]/,tag:'whitespace'});
tokens.push({re:/[a-zA-z0-9_]+/,tag:'VAR'});


function myFunction() {
	var string = document.getElementById("myTextarea");
	parser = new PARSER(tokens);
	//read line by line
	r = parser.TagToken(string.value);
	var val="";
	if(r == 0) {
		for(var i=0;i<parser.parsedtokens.length;i++)
			val +=parser.parsedtokens[i].value+" matched as " + parser.parsedtokens[i].tag+"<br>";			
	} else
		val = r;
	document.getElementById("demo").innerHTML = val;
}