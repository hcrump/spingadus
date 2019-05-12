


function staticScreenInit() {
    console.log('staticScreenInit()');
    var filename = '/media/alienScript.txt';
    loadDoc(filename,typeWriter);
    // loadDoc(filename,testwriter);
}

function testwriter(xhttp){
    console.log('testwriter()');
    var txt = xhttp;
    var i = 0;
    var lines = txt.split(/\r\r|\n/);
    lines.forEach(line => {
        console.log(line);
    });

    document.getElementById('scrollTextP').innerHTML = line;
}
function typeWriter(xhttp) {
    console.log('typeWriter()');
    var txt = xhttp;
    var lines = txt.split(/\r\n|\n/);
    var speed = 2000; //ms
    var lines = ['aaaaaa','bbbbbb','cccwcccc'];
    var myPre = document.getElementById('scrollTextPre');
    for (var i = 0; i < lines.length; i++) {
        setTimeout((function(i){
            return function() {
                document.getElementById('scrollTextPre').innerHTML += lines[i];
            }
        })(i),speed*i);
        document.getElementById('scrollTextPre').innerHTML += '<br>';
    }
}

function loadDoc(filename,callback) {
    httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = function () {
        if(httpRequest.readyState === 4) {
            if(httpRequest.status === 200) {
                callback(httpRequest.responseText);
            }
        }
    }
    httpRequest.open('GET', filename,true);
    httpRequest.send();
}

var number = 0;
var toggle = 0;
//document.body.className = 'myColor';

function bgColorOff(){
    console.log('dark');
    document.body.style.background='0';
    //document.body.style.backgroundImage= 'cat1-tp.png';
}
function bgColorOn(){
    document.body.style.background= 'blue';
}
function staticOn(){
    console.log('staticOn');
    document.body.style.backgroundImage = 'url('+static+')';
}
function staticOff(){
    console.log('staticOff');
    document.body.style.backgroundImage = 'none';
}

// var myInterval = setInterval(function(){
//     number++;
//     console.log(number + ":" + toggle);
//     if(number % 2 == 0){
//         if(toggle == 0){
//             toggle = 1;
//             //document.body.className = 'myColor';
//             //bgColorOn();
//             staticOff();
//         } else {
//             toggle=0;
//             //document.body.className = 'myImage';
//             staticOn();
//             //document.body.style.backgroundImage="url('/cat1-tp.png')";
//         }
//     }
// }, 1000);
