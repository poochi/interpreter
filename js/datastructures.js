

//Datastructures
//takes in tokens
function BinaryOperand(leftTerminal,rightTerminal) {
this.leftTerminal = leftTerminal;
this.rightTerminal = rightTerminal;

}


function TERMINAL(tag,value) {
this.tag = tag;
this.value = value; //can be dummy
}
//memory
function memiden(tag,identifier,value) {
this.tag = tag;
this.identifier = identifier; //name of the variable
this.value = value;

}