function showModal(n){
    //alert("algo");
    var g = localStorage.getItem("audio");
    var vec = JSON.parse(g)
    vec = vec.reverse();
    // Get the modal
    var modal = document.getElementById('myModal');
    //alert(vec[1]);
    // Get the button that opens the modal
    var btn = document.getElementsByTagName('a');
    
    //alert(btn[n]);
    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];

    // When the user clicks the button, open the modal 
    btn[n].onclick = function() {
        //alert("Boton click");
        modal.style.display = "block";
        document.getElementById('displayAudio').innerHTML = 'Reproducir Audio: <audio controls><source src="' + vec[n][2] + '" type="audio/mpeg">Your browser does not support the audio element. </audio>';
        
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


function showItems(){
    
    //alert("Show Audios");
    var g = localStorage.getItem("audio");
    var vec = JSON.parse(g);
    //alert(vec);
    var x=0
    for(i=vec.length-1; i>=0; i--){
        
        document.getElementById("opciones").innerHTML += '<a href="javascript: showModal('+i+');" class="list-group-item allow-badge widget uib_w_3" data-uib="twitter%20bootstrap/list_item" data-ver="1" id="">' 
            +'<h4 class="list-group-item-heading">'+vec[i][1]+'</h4>' 
            +'<p class="list-group-item-text">'+vec[i][0]+'</p>'
        +'</a>';
        x++;
    }
    fixclick(vec.length);
    //alert(JSON.stringify(g));
}

function fixclick(rep){
    //alert("Fix Click")
    var btn = document.getElementsByTagName('a');
    
    
    for(i=rep-1; i>=0; i--){
        btn[i].click();
        document.getElementsByTagName("body")[0].click();
    }
    
    //document.getElementById("myBtn").style.display = "none";
    
}


function deleteLocal(){
    
}