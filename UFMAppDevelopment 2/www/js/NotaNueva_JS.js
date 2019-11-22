function showTextModal(){
    // Get the modal
    var modal = document.getElementById('myTextModal');

    // Get the button that opens the modal
    var btn = document.getElementById("myTextBtn");

    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];

    // When the user clicks the button, open the modal 
    btn.onclick = function() {
        modal.style.display = "block";
    };

    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
        modal.style.display = "none";
    };

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    };

    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    document.getElementById("date").innerHTML = date;
}

function showAudioModal(){
    // Get the modal
    var modal = document.getElementById('myAudioModal');

    // Get the button that opens the modal
    var btn = document.getElementById("myAudioBtn");

    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];

    // When the user clicks the button, open the modal 
    btn.onclick = function() {
        modal.style.display = "block";
    };

    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
        modal.style.display = "none";
    };

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    };
}

function showVideoModal(){
    // Get the modal
    var modal = document.getElementById('myVideoModal');

    // Get the button that opens the modal
    var btn = document.getElementById("myVideoBtn");

    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];

    // When the user clicks the button, open the modal 
    btn.onclick = function() {
        modal.style.display = "block";
    };

    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
        modal.style.display = "none";
    };

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    };
}

function fixclick(){
    //alert("Fix Click")
    document.getElementById("myTextBtn").click();
    document.getElementsByTagName("body")[0].click();
    
    document.getElementById("myAudioBtn").click();
    document.getElementsByTagName("body")[0].click();
    
    document.getElementById("myVideoBtn").click();
    document.getElementsByTagName("body")[0].click();
    getDate();
}


function saveEntry(tipo, fecha, titulo, descripcion){
    var vec = [];
    v = [tipo,fecha,titulo,descripcion];
    var oldvec = localStorage.getItem("textos");
    oldvec = JSON.parse(oldvec);
    if(oldvec != null){
        oldvec.push(v);
        vec = oldvec;
        localStorage.setItem("textos",JSON.stringify(vec));
    }else{
        vec.push(v)
        localStorage.setItem("textos",JSON.stringify(vec));
    }
    
}


function validateEntry(){
    var date = getDate();
    var titulo = document.getElementById("title").value
    var texto = document.getElementById("entry").value
    

    if(date == "" || titulo == "" || texto == ""){
        alert("Faltan campos por llenar")
        if (date == ""){
            document.getElementById('date').style.borderColor = 'red';
            document.getElementById('date').focus();
        }else{
            document.getElementById('date').style.border = '1px solid #000';  
            
        }
        if (titulo == ""){
            document.getElementById('title').style.borderColor = 'red';
            document.getElementById('title').focus();
        }else{
            document.getElementById('title').style.border = '1px solid #000';    
        }
        if (texto == ""){
            document.getElementById('entry').style.borderColor = 'red';
            document.getElementById('entry').focus();
        }else{
            document.getElementById('entry').style.border = '1px solid #000';
        }
    }else{
        document.getElementById('entry').style.border = '1px solid #000';
        document.getElementById('title').style.border = '1px solid #000'; 
        document.getElementById('date').style.border = '1px solid #000';  
        
        saveEntry("texto",date,titulo,texto);
        
        //alert("Date: " + date + "\n"
        // +"Title: " + titulo + "\n"
        // +"Text: " + texto);
        window.location.reload();
        
        
        //j = JSON.parse(log)
        //localStorage.setItem("x", log);
        
    }
}

function getDate(){
    var dt = new Date();  

    // Display the month, day, and year. getMonth() returns a 0-based number.  
    var month = dt.getMonth()+1;  
    var day = dt.getDate();  
    var year = dt.getFullYear();
    var hours = dt.getHours();
    var minutes = dt.getMinutes();
    //alert(month + '-' + day + '-' + year + '   '+ hours +':'+minutes);  

    return dt; 
}


function showItems(){
    //alert("Show Items");
    var g = localStorage.getItem("textos");
    var vec = JSON.parse(g)
    document.getElementById("salida").innerHTML = vec;
    //alert(JSON.stringify(g));
}






var ruta_audio="";
var hayaudio = false;
// capture callback
var captureSuccess = function(mediaFiles) {
    var i, len;
    for (i = 0, len = mediaFiles.length; i < len; i++) {
        ruta_audio = mediaFiles[i].fullPath;
        document.getElementById("displayAudio").innerHTML = 'Reproducir Audio: <audio controls><source class="audio" src="' + ruta_audio + '" type="audio/mpeg">Your browser does not support the audio element. </audio>';
        hayaudio = true;
    }
};

// capture error callback
var captureError = function(error) {
    navigator.notification.alert('Error code: ' + error.code, null, 'Capture Error');
};

// start audio capture
function grabar() {
    navigator.device.capture.captureAudio(captureSuccess, captureError, {limit:1});
}

function validateAudio(){
    var date = getDate();
    var titulo = document.getElementById("titleAudio").value;
    
    if(titulo == "" || hayaudio == false){
        if (titulo == ""){
            document.getElementById('titleAudio').style.borderColor = 'red';
            document.getElementById('titleAudio').focus();
        }else{
            document.getElementById('titleAudio').style.border = '1px solid #000';    
        }
        if(hayaudio == false){
            alert("Debe grabar un audio")
        }
    }else{
        document.getElementById('titleAudio').style.border = '1px solid #000';
        //alert("Date: " + date + "\n"
        // +"Title: " + titulo + "\n");
        saveAudio(date,titulo);
        window.location.reload();
        
    }
}

function saveAudio(fecha,titulo){
    //alert(ruta_audio);
    
    var vec = [];
    v = [fecha,titulo,ruta_audio];
    var oldvec = localStorage.getItem("audio");
    oldvec = JSON.parse(oldvec);
    if(oldvec != null){
        oldvec.push(v);
        vec = oldvec;
        localStorage.setItem("audio",JSON.stringify(vec));
    }else{
        vec.push(v);
        localStorage.setItem("audio",JSON.stringify(vec));
    }
}



var video_path = "";
var hayvideo = false;
// capture callback
var captureSuccessVideo = function(mediaFiles) {
    var i, len;
    for (i = 0, len = mediaFiles.length; i < len; i += 1) {
        video_path = mediaFiles[i].fullPath;
        // do something interesting with the file
        document.getElementById("displayVideo").innerHTML = 'Reproducir Video: <video width="320" height="240" controls>'
                                                            +'<source src="'+video_path+'" type="video/mp4">'
                                                            +'Your browser does not support the video tag.'
                                                            +'</video>';
        hayvideo = true;
    }
};

// capture error callback
var captureErrorVideo = function(error) {
    navigator.notification.alert('Error code: ' + error.code, null, 'Capture Error');
};

// start video capture
function recordVideo(){
    navigator.device.capture.captureVideo(captureSuccessVideo, captureErrorVideo, {limit:1});
}

function validateVideo(){
    var date = getDate();
    var titulo = document.getElementById("titleVideo").value;
    
    if(titulo == "" || hayvideo == false){
        if (titulo == ""){
            document.getElementById('titleVideo').style.borderColor = 'red';
            document.getElementById('titleVideo').focus();
        }else{
            document.getElementById('titleVideo').style.border = '1px solid #000';    
        }
        if(hayaudio == false){
            alert("Debe grabar un video")
        }
    }else{
        document.getElementById('titleVideo').style.border = '1px solid #000';
        //alert("Date: " + date + "\n"
        // +"Title: " + titulo + "\n");
        saveVideo(date,titulo);
        window.location.reload();
        
    }
}

function saveVideo(fecha,titulo){
    //alert(ruta_audio);
    
    var vec = [];
    v = [fecha,titulo,video_path];
    var oldvec = localStorage.getItem("video");
    oldvec = JSON.parse(oldvec);
    if(oldvec != null){
        oldvec.push(v);
        vec = oldvec;
        localStorage.setItem("video",JSON.stringify(vec));
    }else{
        vec.push(v);
        localStorage.setItem("video",JSON.stringify(vec));
    }
}

