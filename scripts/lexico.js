let tabla = document.getElementById("tabla");
let input;
let btnAnalizar = document.getElementById("analizar");
var lexemas = [];

var lines = [];
let tokens = [];
let tok = [];
let IDs = [];


//Expresiones Regulares /\+|\-|\/|\*|\=/
let aritmeticas = "(\\+|-|\\*|\\/|%){1,1}";
let asignacion = "=";
let opLog = "((\\|{2,2})|&&|!){1,1}";
let blockCodeChar = "(\\(|\\)|\\{|\\}){1,1}";
let numeros = "([0-9])+";
let numerosF = "[0-9]*\\.[0-9]+"
let entero = "int";
let flotante = "float";
let relacionales = "(>=|<=|==|!=|>|<)";
let variables = /((VAR_)[_|a-z|A-Z])+([a-z]|[A-Z]|[0-9]|_)*/;
let delimitador = ";{1,1}";
let Switch = "switch";
let Case =  "case";


btnAnalizar.addEventListener("click", function() {
    lines = [];
    lexemas = [];

    input = document.getElementById("inputCode").value;
    line_separator(input).forEach(function(lx){
        lines.push(getIDs(lx, variables)[0]);
    })
    
    console.log(lines);
});


function getIDs(lexem, regex){
    return getAllMatches(lexem, regex);
}
//Separa el la entrada de texto por salto de linea
function line_separator(code) {
    code.split(/\n+/)
        .filter(function (t) { return t.length > 0 })
        .map(function (t) {
            this.lexemas.push(t);
        })
    // lexemas.forEach(function(lex){
    //     lex.codigo.split(/\s+/)
    //     .filter(function (t) { return t.length > 0 })
    //     .map(function (t) {
    //       tokens.push({linea: lex.lineNumber, lexema: t });
          
    //     })
    // })
    return this.lexemas;
}

function tokenizador(token) {    
    tok = [];
    while(token.length>0){

        let str = token.shift();
        switch(str) {
            case (str.match(flotante) || {}).input:
                tok.push("flotante");
                break;
            case (str.match(entero) || {}).input:
                tok.push("entero")
                break;
            case (str.match(relacionales) || {}).input:
                tok.push("OPREL");
                break;
            case (str.match(aritmeticas) || {}).input:
                tok.push("OPAR");
                break;
            case (str.match(variables) || {}).input:
                tok.push("ID");
                break
            case (str.match(delimitador) || {}).input:
                tok.push("DEL");
                break
        }
    }
}