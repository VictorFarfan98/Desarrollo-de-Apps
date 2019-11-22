<!DOCTYPE html>
<html>
<!--
  * Please see the included README.md file for license terms and conditions.
  -->
<head>
    <title>Blank Cordova Mobile App Project Template (Lite)</title>
    <meta http-equiv="Content-type" content="text/html; charset=utf-8">

    <!-- see http://webdesign.tutsplus.com/tutorials/htmlcss-tutorials/quick-tip-dont-forget-the-viewport-meta-tag -->
    <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no">
    <style>
        /* following two viewport lines are equivalent to the meta viewport statement above, needed for Windows */
        /* see http://www.quirksmode.org/blog/archives/2014/05/html5_dev_conf.html and http://dev.w3.org/csswg/css-device-adapt/ */
        @-ms-viewport { width: 100 vw ; zoom: 100% ; }  @viewport { width: 100vw ; zoom: 100% ; }
        @-ms-viewport { user-zoom: fixed ; }           @viewport { user-zoom: fixed ; }
    </style>

    <script src="cordova.js"></script>          <!-- phantom library, needed for Cordova api calls, added during build -->
    <script src="js/app.js"></script>           <!-- recommended location of your JavaScript code relative to other JS files -->
    <script src="xdk/init-dev.js"></script>     <!-- normalizes device and document ready events, see README for details -->
</head>

<body>

    <p>Grabadora de audio</p>
    <div id ="botones">Empezar a grabar sonido: <a href="javascript:grabar();"><img src="images/mic.png" /></a></div>
    <div id="salida"></div>
    <script>
    // capture callback
        var ruta_audio = "";
var captureSuccess = function(mediaFiles) {
    var vec = [];
    v = [ruta_audio];
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
    
    
    var i, len;
    for (i = 0, len = mediaFiles.length; i < len; i += 1) {
        ruta_audio = mediaFiles[i].fullPath;
        //document.getElementById("salida").innerHTML = 'Reproducir Audio: <audio controls><source src="' + ruta_audio + '" type="audio/mpeg">Your browser does not support the audio element. </audio>';
    }
    
    var g = localStorage.getItem("audio");
    var vec = JSON.parse(g);
    //alert(vec);
    var x=0
    for(i=vec.length-1; i>=0; i--){
        
        document.getElementById('salida').innerHTML = 'Reproducir Audio: <audio controls><source src="' + vec[n] + '" type="audio/mpeg">Your browser does not support the audio element. </audio> <br>';
    }
    
};

// capture error callback
var captureError = function(error) {
    navigator.notification.alert( 'Error code: ' + error.code, null, 'Capture Error');
};

// start audio capture
function grabar() {
navigator.device.capture.captureAudio(captureSuccess, captureError, {limit:1});
}
    </script>

</body>
</html>