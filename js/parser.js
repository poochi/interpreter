function assert(condition,message) {
	if (!condition)
		throw "Assertion Failure" + message ;
}
function min(a,b) {
	if(a<b)
		return a;
	return b;
}
//array of tokens 
//each token struct should have tag and regexp
function TOKENIZER(tokens) {

	this.tokenexpr = tokens;
	this.parsedtokens = [];
	for (var i=0;i<tokens.length;i++) {
		assert(tokens[i].re, "Invalid token RE specified while parsing");
		assert(tokens[i].tag, "Invalid token tag specified while parsing");
	}

}
//tokenizer
// the given string of words are segmented into tokens and returned 
// if an incorrect token is encountered the parser returns assertion failure , true otherwise
TOKENIZER.prototype.TagToken = function (string) {

console.log(string.length);
var pos =0;
while(string.length>0) {

	var incorrectstream = true;
	console.log("To match " + string);
	//var t = /\+/g.exec(string);
	//console.log(t);
	for (var i=0;i<tokens.length;i++) {	
		var match = tokens[i].re.exec(string);
		console.log(tokens[i].tag);
		//console.log(match);
		if (match) {
			if (match.index == 0) {
					this.parsedtokens.push({tag:tokens[i].tag, value:string.slice(0, match[0].length)});
					string = string.slice(match[0].length, string.length);
					pos += match[0].length;
					console.log("matched with '"+tokens[i].tag+"'" +"length "+match[0].length);
					incorrectstream = false;
					break;
			}
		}
	}
	if(incorrectstream == true)
		return 'Error keyword/token at '+ string.slice(0,min(string.length,4))+" in "+pos;
	
}
	return 0;
}

