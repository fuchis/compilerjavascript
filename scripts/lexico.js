let tabla = document.getElementById("tabla");
let input;
let btnAnalizar = document.getElementById("analizar");
let lexemas = [];
let tokens = [];

//Expresiones Regulares /\+|\-|\/|\*|\=/
let aritmeticas = "\\-|\\+|\\+|\\*|\\/|\\=";
let entero = "int";
let flotante = "float";
let relacionales = "<=|>=|==|!="
let variables = "([a-zA-Z]+[0-9]*)";


btnAnalizar.addEventListener("click", () => {
    input = document.getElementById("inputCode").value;
    lexer(input);
    console.log(lexemas);
    console.log(tokens);
    tokenizador(tokens);
    console.log(tok);
    
});


function lexer (code) {
    lexemas = [];
    tokens = [];
    tok = [];
    code.split(/\n+/)
            .filter(function (t) { return t.length > 0 })
            .map(function (t) {
              lexemas.push(t);
              
            })
    
    lexemas.forEach(function(lex){
        let rows = document.createElement("tr");
        lex.split(/\s+/)
        .filter(function (t) { return t.length > 0 })
        .map(function (t) {
            tokens.push(t);
            let cell = document.createElement("td");
            let textCell = document.createTextNode(t);
            cell.appendChild(textCell);
            rows.appendChild(cell);
          
        })
        tabla.appendChild(rows);
    })

    
    // lexemas.forEach(function(lex){
    //     lex.split(/\s+/)
    //     .filter(function (t) { return t.length > 0 })
    //     .map(function (t) {
    //       tokens.push(t);
          
    //     })
    // })
}

function tokenizador(token) {
    while(token.length>0){
        let str = token.shift();
        console.log(str);
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
        }
    }

    
    
}