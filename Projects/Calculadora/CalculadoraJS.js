var resultado = 0;
var op = "";
var historia = "";
var n1 = "";
var n2 = "";
var cadena = "";
var hasOp = false;
var bot = "";
var signo = "";
var recienOperado = false;

function refreshOp(cadOp) {
    document.getElementById("op").value = cadOp;
    //alert("Op refrescado");
}

function refreshHistory(cadHistoria) {
    document.getElementById("historia").value = cadHistoria;
    //alert("Historia refrescada")
}

function reset(){
        op = "";
        cadena = "";
        historia = "";
        hasOp = false;
        resultado = 0;
        n1 = "";
        n2 = "";
        refreshOp("0");
        refreshHistory(historia);
        signo = "";
        recienOperado = false;
}

function checkCadena(cad){
    for(x=1; x<cad.length; x++){
        if(cad.charAt(x) === "+"){
            signo = "sumar";
            break;
        }
        if(cad.charAt(x) === "-"){
            signo = "restar";
            break;
        }
        if(cad.charAt(x) === "x"){
            signo = "multiplicar";
            break;
        }
        if(cad.charAt(x) === "÷"){
            signo = "dividir";
            break;
        }
    }
}

function puntoExist(cad){
    for(x=0; x<cad.length; x++){
       if(cad.charAt(x) === "."){
            return true;
        }     
    }
    return false;
}

function Operar(strg) {
    checkCadena(cadena);
    if (signo === "sumar") {
        resultado = Number(n1) + Number(n2);
        historia = cadena;
        cadena = resultado;
        refreshHistory(historia);
        refreshOp(cadena);
        hasOp = false;
        n2 = ""
        n1 = resultado;
        recienOperado = true;
    }
    if (signo === "restar") { 
        resultado = Number(n1) - Number(n2);
        historia = cadena;
        cadena = resultado;
        refreshHistory(historia);
        refreshOp(cadena);
        hasOp = false;
        n2 = ""
        n1 = resultado;
        recienOperado = true;
    }
    if (signo === "multiplicar") {
        resultado = Number(n1) * Number(n2);
        historia = cadena;
        cadena = resultado;
        refreshHistory(historia);
        refreshOp(cadena);
        hasOp = false;
        n2 = ""
        n1 = resultado;
        recienOperado = true;
    }
    if (signo === "dividir") {
        resultado = Number(n1) / Number(n2);
        historia = cadena;
        cadena = resultado;
        refreshHistory(historia);
        refreshOp(cadena);
        hasOp = false;
        n2 = ""
        n1 = resultado;
        recienOperado = true;
    }
}


function negativeExist(cadN){
    if(cadN.charAt(0) != "-"){
        return false;
    }
    return true;
}

function analizeInput(value) {
    if(value == 1 || value == 2 || value == 3 || value == 4 || value == 5 || value == 6 || value == 7 || value == 8 || value == 9 || value == 0){
        return "numero";
    }
    
    if(value === "C"){
        return "reiniciar";
    }
    if(value === "←"){
        return "retroceso";
    }
    if(value === "÷"){
        return "dividir";
    }
    if(value === "x"){
        return "multiplicar";
    }
    if(value === "-"){
        return "restar";
    }
    if(value === "+"){
        return "sumar";
    }
    if(value === "="){
        return "igual";
    }
    if(value === "."){
        return "punto";
    }
}

function detectInput(button) {
    bot = button.value;
    //alert(button.value);
    op = analizeInput(bot);
    //alert(op);
    noOperado();
        
}


function noOperado(){
    var longitud = cadena.length;
    if(op === "reiniciar"){
        reset();
    }else{
        if(op === "restar"){
            if(n1 === ""){
                //alert()
                n1 = n1 + bot;
                cadena = "-";
                refreshOp(cadena);
                hasOp = false;
            }else{
                if(hasOp == false){
                    if(cadena.charAt(longitud-1) === "-"){
                        
                    }else{
                        hasOp = true; 
                        cadena = cadena + bot;
                        refreshOp(cadena);
                        recienOperado = false;    
                    }
                    
                }else{
                    if(cadena.charAt(longitud-1) === "-"){
                        cadena = cadena.substring(0, cadena.length-1);
                        cadena = cadena + bot;
                        refreshOp(cadena);
                        recienOperado = false;
                    }else{
                        if(cadena.charAt(longitud-1) === "+" ||  cadena.charAt(longitud-1) === "x" ||       cadena.charAt(longitud-1) === "÷"){
                            if(negativeExist(n2) == false){
                                n2 = n2 + bot;
                                cadena = cadena + "-";
                                refreshOp(cadena);    
                            }
                            
                        }else{
                            Operar(cadena);    
                        }
                            
                    }
                
                }
            }
        }else{
            if(op === "dividir" || op === "multiplicar" || op === "sumar"){
            //alert(hasOp);
            if(hasOp == false && cadena != "" && cadena.charAt(longitud-1) != "-" && n1 != ""){
                hasOp = true; 
                cadena = cadena + bot;
                refreshOp(cadena);
                recienOperado = false;
            }else{
                if(cadena.charAt(longitud-1) === "+" || cadena.charAt(longitud-1) === "-" || cadena.charAt(longitud-1) === "x" ||       cadena.charAt(longitud-1) === "÷"){
                    //alert(n1);
                    if(n1 === "-"){
                        n1 = "";
                    }
                    if(n2.charAt(0) != "-"){
                        cadena = cadena.substring(0, cadena.length-1);
                        cadena = cadena + bot;
                        refreshOp(cadena);
                        recienOperado = false;    
                    }else{
                        
                    }
                    
                }else{
                    Operar(cadena);    
                }
                
            }
            
        }else{
            if(op === "igual"){
                Operar(cadena);
            }else{
                if(op === "retroceso"){
                    if(recienOperado == true){
                        refreshOp("0");
                        n1 = "";
                        cadena = "";
                        recienOperado = false;
                        hasOp = false;
                    }else{
                        if((cadena.charAt(longitud-1) === "+" || cadena.charAt(longitud-1) === "x" ||       cadena.charAt(longitud-1) === "÷") && hasOp == true) {
                            hasOp = false;
                        }else{
                            if(cadena.charAt(longitud-1) === "-"){
                                if(hasOp == true && n2.charAt(0) == "-"){
                                    n2 = "";
                                }
                            }else{
                                if(hasOp == false){
                                    n1 = n1.substring(0, n1.length-1);
                                }else{
                                    n2 = n2.substring(0, n2.length-1);
                                }    
                            }
                                
                        } 
                        if(cadena.charAt(longitud-1) != 0){
                            cadena = cadena.substring(0, cadena.length-1);
                            refreshOp(cadena);    
                        }
                    }
                    
                }else{
                    if(op === "punto"){
                        if(recienOperado == true){
                            cadena = ".";
                            n1 = ".";
                            n2 = "";
                            refreshOp(cadena);
                            recienOperado = false;
                            hasOp = false;
                        }else{
                            if(hasOp == false){
                                if(cadena.charAt(longitud-1) === "+" || cadena.charAt(longitud-1) === "x" || cadena.charAt(longitud-1) === "÷"){
                                      cadena = cadena.substring(0, cadena.length-1);  
                                }
                                if(puntoExist(n1) == false){
                                    n1 = n1 + bot;
                                    cadena = cadena + bot;
                                    refreshOp(cadena);
                                    recienOperado = false;
                                }
                            }else{
                                if(puntoExist(n2) == false){
                                    n2 = n2 + bot;
                                    cadena = cadena + bot;
                                    refreshOp(cadena);
                                    recienOperado = false;
                                }
                            }
                        }
                    }else{// Ingreso de numeros
                        if(recienOperado == true) {
                            cadena = "";
                            n1 = "";
                            n2 = "";
                            refreshOp(cadena);
                            recienOperado = false;
                            cadena = cadena + bot;
                            n1 = n1 + bot;
                            hasOp = false;
                            refreshOp(cadena)
                        }else{
                            if(hasOp == false){
                                if(cadena.charAt(longitud-1) === "+" || cadena.charAt(longitud-1) === "x" || cadena.charAt(longitud-1) === "÷"){
                                      cadena = cadena.substring(0, cadena.length-1);  
                                }
                                n1 = n1 + bot;
                                cadena = cadena + bot;
                                refreshOp(cadena);
                                recienOperado = false;  
                            }else{
                                n2 = n2 + bot;
                                cadena = cadena + bot;
                                refreshOp(cadena);
                                recienOperado = false;
                            }
                        }   
                    }
                    
                }    
            }
        }    
        }
        
    }
}


function showCadena(){
    alert("Cadena:" + cadena
         +"\n n1:" + n1
         +"\n n2:" + n2
         +"\n hasOp:" +hasOp
         +"\n resultado:" +resultado
         +"\n operado:" +recienOperado);
}
