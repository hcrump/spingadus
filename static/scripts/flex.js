var DEBUG = true;
if(!DEBUG){
    console.log('console.log has been disabled.');
    console.log = function(t){};
}
function staticScreenInit() {
    console.log('staticScreenInit()');
    // var filename = '/media/docs/alienScript.txt';
    // loadDoc(filename,typeWriter);
}
function divBordersOn(){
    $('div').toggleClass("div");
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

function delayme(arr,speed,a){
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
        // var destination = document.getElementById("scrollTextDiv");
        var destination = document.getElementById(a);

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

function typeWriter(xhttp,a) {
    console.log('typeWriter()');
    var txt = xhttp;
    var lines = txt.split(/\r\n|\n|\r/);
    lines = fixArray(lines);
    lines = normaliseLeadingSpaces(lines);
    var speed = 50; //ms
    // var lines = ['aaaaaa','bbbbbb','cccwcccc'];
    delayme(lines,speed,a);
}

//typeWriter without arrows
function typeWriterNa(txt,element) {
    console.log('typeWriterNa()');
    var lines = txt.split(/\r\n|\n|\r/);
    lines = fixArray(lines);
    lines = normaliseLeadingSpaces(lines);
    var speed = 50; //ms
    charWrite(lines,speed,element);
}

function loadDoc(filename,callback,params) {
    console.log('loadDoc()');
    var httpRequest = new XMLHttpRequest();

    httpRequest.onreadystatechange = function () {
        if(httpRequest.readyState === 4) {
            if(httpRequest.status === 200) {
                // callback(httpRequest.responseText);
                callback(httpRequest.responseText,params);
            }
        }
    }
    httpRequest.open('GET', filename,true);
    httpRequest.send();
}

//remove empty lines before first line
function fixArray(arr){
    let tmp = arr;
    while(tmp[0] == ''){
        tmp.shift();
    }
    while(tmp[tmp.length-1] == ''){
        tmp.pop();
    }
    return tmp;
}
//rids empty spaces up to smallest amount, keeps form
function normaliseLeadingSpaces(arr){
    console.log('normaliseLeadingSpaces()');
    var small = 1000;
    for(var i = 0; i< arr.length;i++){
        var num = arr[i].search(/\S/);
        if(small > num && num >= 0){
            small = num;
        }
    }
    if(small != 0){  // 0=no spaces; slice -1 is bad
        for(var i =0; i< arr.length;i++){
            // console.log(arr[i]);
            arr[i] = arr[i].slice(small - 1); //keep a space
            // arr[i] = '\u2b9e' + arr[i];
            // console.log(arr[i]);
        }
    }
    return arr;
}

function casualties(){
    console.log('casualties()');
    var lvl = Math.floor(Math.random()*100);
    var rand = Math.floor(Math.random()*100);
    var news = [];
    var msg = [];
    var all = {};
    var sendArray = []; // if sending to typewriter function
    var status = ["Pfft!","Shields Held!","Minor damage to sections 18, 39 and 34!",
    "Shields are down!","Better to burn out than to fade away?", "Revenge is a dish best served cold!",
    "Severe damage sustained!","We got our asses kicked!","Do you want to live forever?!",
    "WE DEAD!","..."];

    var i = Math.floor(lvl / 10);
    var deaths= lvl * Math.floor(Math.pow(10,i));
    all['Attack Level']=lvl;
    all['Deaths'] = (deaths).toLocaleString();
    all['Wounded'] = (deaths * rand/10).toLocaleString();
    all['Status'] = status[i];

    for (var i of Object.keys(all)){
        sendArray.push(i + ':  ' + all[i]);
    }
    var date = new Date();
    sendArray.unshift(date,"");
    $("#centerTopRightDiv").contents().filter(function(){ return this.nodeType == 3; }).first().replaceWith("Post-Mortem Briefing:");
    charWrite(sendArray,100,'#centerTopRightDiv');
}
var number = 0;
var toggle = 0;

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
    var delay1 = 5000; //wait for shaking + delay4
    var delay2 = 7000; //wait to hide planet
    var delay3 = 5000; //wait to stop shaking
    var delay4 = 2000; //wait to show incoming
    var count = (delay1 + delay2 + delay4) / 1000;
    var countdown = count - (delay2/1000)


    $('.spantest').html("");
    $('.ring').html("");

    $('.ring').css('visibility','visible');
    $('.ring').css('font-size','28');
    $('.ringtxt2').html("INCOMING!!");
    var interval = setInterval(function(){
        $('.ringtxt1').html(countdown-1);
        if(countdown < 1){
            $('.ring').html("");
            $('.ring').css('font-size','38');
            $('.ringtxt2').html("IMPACT!!!");
        }
        if(count<0){
            clearInterval(interval);
            $('.spantest').html('\u27ea'+" ALL CLEAR "+'\u27eb');
            $('.ringtxt2').html("");
        }
        count--;
        countdown--;
    },1000);

    $('#glowring').queue(function(){
        $(this).css('visibility','visible');
        $('.ring').css('visibility','hidden');
        $('.spantest').html('\u27ea'+" WARNING "+'\u27eb');
        $('#aimH').addClass('horLine');
        $('#aimV').addClass('vertLine');
        // $('#centerTopLeftDiv').toggleClass('grow');
        $(this).dequeue();
    }).delay(2000).queue(function(){
        $('.ring').css('visibility','visible');
        $(this).dequeue();
    }).delay(5000).queue(function(){
        $('body').addClass('shakeit');
        $(this).dequeue();
    }).delay(8000).queue(function(){
        $('body').removeClass('shakeit');
        $(this).dequeue();
    }).delay(1000).queue(function(){
        $('.ring').css('visibility','hidden');
        $('.spantest').html('Warping out of orbit');
        $(this).dequeue();
    }).delay(delay3).queue(function(){
        $('#centerTopLeftDiv').addClass('shrink');
        $('.spantest').html('');
        $('#aimH').removeClass('horLine');
        $('#aimV').removeClass('vertLine');
        // $('.ring').addClass('ring-animation');
        $(this).dequeue();
    }).delay(delay3).queue(function(){
        $('#centerTopLeftDiv').addClass('grow');
        $('.spantest').html('We have returned!');
        $(this).dequeue();
    }).delay(delay3).queue(function(){
        casualties();
        $('.spantest').html('');
        $(this).dequeue();
    });

}
function rotatePhotos(myJson){
    console.log('rotatePhotos()');
    var newJson = JSON.parse(myJson);
    var lines = Object.keys(newJson);
    var i = 0;
    var speed = 20000;
    var newval = setInterval(function(){
        if(i<lines.length){
            var src = '/media/images/slideshow/' + lines[i];
            $('#centerCenterDivImage').attr('src',src);
            var a = newJson[lines[i]];
            var c = []
            for(var b of Object.keys(a)){
                c.push(b + ": " + a[b]);
            }
            charWrite(c,50,'#centerBottomDiv');
            i++;
        }else{
            i=0;
        }
    },speed);
}

function getPicList(){
    console.log('getPicList()');
    var fn = '/json/slideshow.json';
    loadDoc(fn ,rotatePhotos);

}
function myRandomGen(min,max){
    return Math.floor(Math.random() * (max-min + 1)) + min;
}
function writeRepeat(){
    console.log('writeRepeat()');
    var episode= myRandomGen(1,8);
    var fn2 = '/media/docs/smallText/starwars'+episode+'.txt';
    loadDoc(fn2,typeWriterNa,'#iframeDivCenter'); //needs #
}
function writeOnce(){
    console.log('writeOnce()');
    var fn1 = '/media/docs/alienScript.txt';
    loadDoc(fn1,typeWriter,'scrollTextDiv'); //no #
}
function charWrite(myArray, speed = 100, element){
	console.log('charWrite()');
    var txtArray = myArray || ['this','is','a','test'];
	var arrIndex = 0;
    var contents = '';
    var charIndex = 0;
	var piece = "";
    var date = new Date();

    $(element).html("");
    // txtArray.unshift(date,"");
	contents += txtArray[arrIndex] + '<br>';

	var interval = setInterval(function(){
		if(arrIndex < txtArray.length){
			if(charIndex < contents.length){
				piece = contents.substring(0,charIndex+1) + '_';
                $(element).html(piece);
				charIndex++;
			}else{
				arrIndex++;
				contents += txtArray[arrIndex] + '<br>';
				// charIndex = 0; NO!!! keep increasing since we do +=
			}
		}else{
            $(element).html(contents.substring(0,charIndex-1) + '_');
			clearInterval(interval);
		}
	},speed);
}

var loopCount = 0;
var once = true;
var myInterval = setInterval(function(){
    var rand = Math.floor(Math.random() * 100);
    // console.log(rand);
    if(once){
        writeOnce();
        getPicList();
        once = false;
    }
    if(loopCount % 300 == 0){
        incoming();
    }
    if(loopCount % 200 == 0){
        writeRepeat();
    }
    loopCount++;
    if(rand % 100 == 0){
        screenGlitch();
    }
}, 1000);
/*---------------------------------*/
