


function staticScreenInit() {
    console.log('staticScreenInit()');
    var filename = '/media/alienScript.txt';
    loadDoc(filename,typeWriter);
    // loadDoc(filename,testwriter);
    var lines = ['what the happs','get out fo the room','its the end'];
    //delayme(lines,2000);
    //typeWriter();
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

function delayme(arr,speed){
    console.log('delayme()');
    var aText = new Array(
    "There ",
    "Those","what","asdf", "fuckk","noway","buh","bb","cc"
    );
    aText = arr;
    console.log(aText);
    var iSpeed = speed; // time delay of print out
    var iIndex = 0; // start printing array at this posision
    var iArrLength = aText[0].length; // the length of the text array
    var iScrollAt = 20; // start scrolling up at this many lines

    var iTextPos = 0; // initialise text position
    var sContents = ''; // initialise contents variable
    var iRow; // initialise current row

    var typewriter2 = function() {
        sContents =  ' ';
        iRow = Math.max(0, iIndex-iScrollAt);
        var destination = document.getElementById("scrollTextDiv");
        while ( iRow < iIndex ) {
            sContents += aText[iRow++] + '<br />';
        }
        destination.innerHTML = sContents + aText[iIndex].substring(0, iTextPos) + "_";
        if ( iTextPos++ == iArrLength ) {
            iTextPos = 0;
            iIndex++;
            if ( iIndex != aText.length ) {
                iArrLength = aText[iIndex].length;
                setTimeout(typewriter2, iSpeed);
            }
        } else {
            setTimeout(typewriter2, iSpeed);
        }
    };
    typewriter2();
}

// function delayme(arr,speed){
//     //console.log(arr);
//     arr.forEach(function(el,i){
//         console.log(arr.length);
//         setTimeout(function(){
//             document.getElementById('scrollTextPre').innerHTML += arr[i];
//             if(i = el.length-1){
//                 console.log('br');
//                 document.getElementById('scrollTextPre').innerHTML += '<br>';
//             }
//         },(speed*i));
//     })
// }

function typeWriter(xhttp) {
    console.log('typeWriter()');
    var txt = xhttp;
    var lines = txt.split(/\r\n|\n|\r/);
    lines = fixArray(lines);
    //console.log(lines);
    var speed = 50; //ms
    // var lines = ['aaaaaa','bbbbbb','cccwcccc'];
    delayme(lines,speed);
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

function fixArray(arr){
    let tmp = arr;
    while(tmp[0] == ''){
        tmp.shift();
    }
    return tmp;
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
