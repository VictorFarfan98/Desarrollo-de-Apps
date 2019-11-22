function reiniciarjuego(){
    document.getElementById("misvidas").value = 3;
    //document.getElementById("lasmerasvidas").innerHTML= 3;
    document.getElementById("vidas").setAttribute("src","images/corazones_3.fw.png");
    document.getElementById("miscore").value = 0;
    document.getElementById("elmeroscore").innerHTML= '<span style="color:#FF0000;">score:</span> 0';
    nopresiono = 1;
    duracion = 2000;
    valorluz = 1000;    
    faltan = 10;
    nivel = 1;
    numluces = 9;
    document.getElementById("mensajes").innerHTML="Nivel: 1";
    document.getElementById("distractores").innerHTML="";
    repetir();
    location.hash = "#juego";
}

function falla(){
    //alert("PRESIONASTE UNA LUZ APAGADA"); 
    document.getElementById("sonidomal").play();
    var vidasactual = Math.abs(document.getElementById("misvidas").value) - 1;
    document.getElementById("misvidas").value = vidasactual;
    //document.getElementById("lasmerasvidas").innerHTML= vidasactual;
    document.getElementById("vidas").setAttribute("src","images/corazones_"+vidasactual+".fw.png");
    if (vidasactual == 0){
        detenerjuego();
        //var punteoinfinito = 0;
        //localStorage.setItem('htl_topscore',punteoinfinito);
        var mayorpunteo = localStorage.getItem('htl_topscore');
        var nivelpunteo = localStorage.getItem('htl_nivel');
        var punteoactual = Math.abs(document.getElementById("miscore").value);
        mensajefinal = "";
        if (mayorpunteo == null){
            localStorage.setItem('htl_topscore',punteoactual); 
            localStorage.setItem('htl_nivel',nivel);
            mayorpunteo = 0;
        }
        if (punteoactual > Math.abs(mayorpunteo)){
            localStorage.setItem('htl_topscore',punteoactual); 
            localStorage.setItem('htl_nivel',nivel);
            mensajefinal += '<h1>¡COOL!</h1>';
            mensajefinal += '<h3  style="color:red;">NUEVO RECORD</h3>';
            mensajefinal += 'Punteo: <span style="font-size:16px;color:red;">'+ punteoactual +'</span>';
            mensajefinal += '<br />Nivel: <span style="font-size:14px;color:#F1592A;">'+ nivel +'</span>';
            mensajefinal += '<br /><a href="javascript:reiniciarHighScore()"> Reiniciar Puntajes </a>';
        } else {
            mensajefinal += '<h2 style="color:red;">Buen Juego</h2>';
            mensajefinal += '<br />Punteo: <span>'+ punteoactual +'</span>';
            mensajefinal += '<br />Nivel: <span style="font-size:14px;color:#F1592A;">'+ nivel +'</span>';
            mensajefinal += '<br />Mejor Punteo: <span style="font-size:16px;color:red;">'+ mayorpunteo +'</span>';
            mensajefinal += '<br />Nivel de Mejor Punteo: <span style="font-size:16px;color:red;">'+ nivelpunteo +'</span>';
            mensajefinal += '<br /><a href="javascript:reiniciarHighScore()"> Reiniciar Puntajes </a>';
            
        }
        //
        mensajefinal +='<br /><a href="javascript:reiniciarjuego();" data-transition="flip" ><img src="images/bjugar_final.fw.png" /></a>';
        mensajefinal += '<br /><a href="javascript:Inicio()"> Menu Principal </a>';
        document.getElementById("puntuacionfinal").innerHTML = mensajefinal;
        document.getElementById("misvidas").value = 3;
        //document.getElementById("lasmerasvidas").innerHTML= 3;
        document.getElementById("vidas").setAttribute("src","images/corazones_3.fw.png");
        document.getElementById("miscore").value = 0;
        document.getElementById("elmeroscore").innerHTML= '<span style="color:#FF0000;">score:</span> 0';
        nopresiono = 1;
        duracion = 2000;
        valorluz = 10;
        faltan = 10;
        nivel = 1;
        numluces = 9;
        document.getElementById("mensajes").innerHTML="Nivel: 1";
        document.getElementById("distractores").innerHTML="";
        detenerjuego();
        document.getElementById("sphares").innerHTML = "";
        location.hash = "#perdiste";    
    }
}

function sonarfondo(){
    document.getElementById("sonidofondo").play();
    document.getElementById("botonsonido").innerHTML = '<a href="javascript:apagarfondo();"><img src="images/boton_music.png" /></a>';
}

function apagarfondo(){
    document.getElementById("sonidofondo").pause();
    document.getElementById("botonsonido").innerHTML = '<a href="javascript:sonarfondo();"><img src="images/boton_nomusic.png" /></a>';
}

function sonidobien(valor){
    document.getElementById("sonidobien"+valor).play();   
}

function sumapuntos(luzpresionada){
    var scoreactual = Math.abs(document.getElementById("miscore").value) + valorluz;
    document.getElementById("miscore").value = scoreactual;
    document.getElementById("elmeroscore").innerHTML= '<span style="color:#FF0000;">score:</span> ' + scoreactual; 
    document.getElementById("cluz"+luzpresionada).innerHTML = '<a href="javascript:falla();" ><img id="miluz'+luzpresionada+'" src="images/luz_off.png" /></a>';
    nopresiono = 1;
}

function pantalla(){
    var esferas = '<div class="row1">';
    for (var i=1;i<=numluces;i++){  
        esferas += '<div id="cluz'+i+'" class="dluz" ><a href="javascript:falla();" ><img id="miluz'
        +i+'" src="images/luz_off.png" /></a></div>';
        if (i==3){
            esferas += '</div><div class="row2">';
        }
        if (i==6){
            esferas += '</div><div class="row3">';
        }
        if (numluces < 12){
            if (i==9){
                esferas += '</div>';
            }
        } else {
          if (i==9){
            esferas += '</div><div class="row4">';
          }
          if (i==12){
            esferas += '</div>';
          }
        }
    }
    document.getElementById("sphares").innerHTML = esferas;
    // seleccionamos aleatoriamente 3 luces de las 9 o de las 12 segun el nivel
    if (nivel >= 5){
        numluces = 12;
    }
    var aleatoria01 = Math.floor((Math.random() * numluces) + 1);
    var aleatoria02 = Math.floor((Math.random() * numluces) + 1);
    var aleatoria03 = Math.floor((Math.random() * numluces) + 1);
    var aleatoria04 = Math.floor((Math.random() * numluces) + 1);
    
    while ((aleatoria01 == aleatoria02) || (aleatoria01 == aleatoria03)){
        var aleatoria01 = Math.floor((Math.random() * numluces) + 1);
    }
    while ((aleatoria01 == aleatoria02) || (aleatoria02 == aleatoria03)){
        var aleatoria02 = Math.floor((Math.random() * numluces) + 1);
    }
    var color01 = Math.floor((Math.random() * 9) + 1);
    var color02 = Math.floor((Math.random() * 9) + 1);
    var color03 = Math.floor((Math.random() * 9) + 1);
    var color04 = Math.floor((Math.random() * 9) + 1);
    document.getElementById("cluz"+aleatoria01).innerHTML = '<a href="javascript:sonidobien(1);sumapuntos('+aleatoria01+');" ><img id="miluz'+aleatoria01+'" src="images/luz_off.png" /></a>';
    document.getElementById("miluz"+aleatoria01).setAttribute("src","images/boton_color" +color01+".gif");
    document.getElementById("cluz"+aleatoria02).innerHTML = '<a href="javascript:sonidobien(2);sumapuntos('+aleatoria02+');" ><img id="miluz'+aleatoria02+'" src="images/luz_off.png" /></a>'; 
    document.getElementById("miluz"+aleatoria02).setAttribute("src","images/boton_color"+color02+".gif");
    document.getElementById("cluz"+aleatoria03).innerHTML = '<a href="javascript:sonidobien(3);sumapuntos('+aleatoria03+');" ><img id="miluz'+aleatoria03+'" src="images/luz_off.png" /></a>';
    document.getElementById("miluz"+aleatoria03).setAttribute("src","images/boton_color"+color03+".gif");
    if (nivel >= 5){
        document.getElementById("cluz"+aleatoria04).innerHTML = '<a href="javascript:sonidobien(3);sumapuntos('+aleatoria04+');" ><img id="miluz'+aleatoria04+'" src="images/luz_off.png" /></a>';
        document.getElementById("miluz"+aleatoria04).setAttribute("src","images/boton_color"+color04+".gif");  
    }
    if (faltan==10){
        document.getElementById("mensajes").innerHTML="Level: " + nivel;
        faltan = 10;
    }
    faltan = faltan - 1;
    nopresiono = nopresiono + 1;
    if (nopresiono == 3){
        nopresiono = 1;
        falla();
    }
    if (faltan==0){
        document.getElementById("mensajes").innerHTML="Level: " + nivel +" Level Up!";
        faltan = 10;
        nopresiono = 1;
        duracion = duracion - 200;
        if (duracion < 800){
            duracion = 800;
        }
        nivel = nivel + 1;
        valorluz = valorluz + 1;
        clearInterval(myVarJuego);
        repetir();
    }
    if (nivel >= 4) {
        document.getElementById("distractores").innerHTML = "";
        var distrae = Math.floor((Math.random() * 5) + 1);
        if ((distrae == 2) || (distrae == 3)){
            navigator.vibrate(200);   
        }
        if (distrae == 4){
            var unalinea = Math.floor((Math.random() * 3) + 1);            document.getElementById("distractores").setAttribute("class","enlinea"+unalinea);
            document.getElementById("distractores").innerHTML = '<img src="images/animado_distractor.gif" width="100%" />';  
        }
        if (distrae == 5){
            var unalinea = Math.floor((Math.random() * 3) + 1);            document.getElementById("distractores").setAttribute("class","enlinea"+unalinea);
            document.getElementById("distractores").innerHTML = '<img src="images/animado_distractor.gif" width="100%" />';
            navigator.vibrate(200); 
        } 
    }
}
function repetir() {
    myVarJuego = setInterval(function () {pantalla()}, duracion);
	//setInterval('pantalla()',2000);
}
function detenerjuego(){
    //alert("0 vidas");
    clearInterval(myVarJuego);
}

function reiniciarHighScore(){
    //var confirmado = 
    //alert(confirmado)
    if(confirm("Desea reiniciar el HighScore?")){
        localStorage.setItem('htl_topscore',0); 
        localStorage.setItem('htl_nivel',1);    
        Inicio();
    }
}

function Inicio(){
    location.hash = ""
}