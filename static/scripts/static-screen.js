
function normaliseLeadingSpaces(arr){
    var small = 1000;
    for(var i = 0; i< arr.length;i++){
        var num = arr[i].search(/\S/);
        if(small > num && num >= 0){
            small = num;
        }
    }
    for(var i =0; i< arr.length;i++){
        // console.log(arr[i]);
        arr[i] = arr[i].slice(small - 1); //keep a space
        // console.log(arr[i]);
    }
    return arr;
}


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
    var iSpeed = speed; // time delay of print out
    var iIndex = 0; // start printing array at this posision
    var iArrLength = aText[0].length; // the length of the text array
    var iScrollAt = 38; // start scrolling up at this many lines

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
        destination.innerHTML = sContents + aText[iIndex].substring(0, iTextPos) + '_';
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
    lines = normaliseLeadingSpaces(lines);
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

function screenGlitch(){
    console.log('screenGlitch()');
    $('body').queue(function(){
        $(this).addClass('wtf2');
        $(this).dequeue();
    }).delay(500).queue(function(){
        $(this).removeClass('wtf2');
        $(this).dequeue();
    });
}
function incoming(){
    console.log('incoming()');
    var delay1 = 5000;
    var delay2 = 3000;
    var delay3 = 1000;
    var count = (delay1 / 1000);

    var interval = setInterval(function(){
        $('.ring').html(count--);
        if(count < 0){
            clearInterval(interval);
            $('.ring').html("IMPACT!!!");
        }
    },1000);

    $('#glowring').queue(function(){
        $(this).css('visibility','visible');
        $(this).dequeue();
    }).delay(delay1).queue(function(){
        $('body').addClass('shakeit');
        $(this).dequeue();
    }).delay(delay2).queue(function(){
        $('#glowring').css('visibility','hidden');
        $(this).dequeue();
    }).delay(delay3).queue(function(){
        $('body').removeClass('shakeit');
        $(this).dequeue();
    });
}
// stackoverflow functions to chain queue, might use
$.fn.queueAddClass = function(className) {
    this.queue('fx', function(next) {
        $(this).addClass(className);
        next();
    });
    return this;
};
// stackoverflow functions to chain queue, might use
$.fn.queueRemoveClass = function(className) {
    this.queue('fx', function(next) {
        $(this).removeClass(className);
        next();
    });
    return this;
};
var loopCount = 0;
var myInterval = setInterval(function(){
    var rand = Math.floor(Math.random() * 100);
    //console.log(loopCount);
    if(loopCount == 100 || loopCount == 0){
        incoming();
        loopCount = 0;
    }
    loopCount++;
    if(rand % 100 == 0){
        screenGlitch();
    }
}, 1000);
