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

function delayme(arr,speed=50,a){
    console.log('delayme()');

    var aText = arr;
    var iSpeed = speed; // time delay of print out
    var iIndex = 0; // start printing array at this posision
    var iArrLength = aText[0].length; // the length of the text array
    var iScrollAt = 43; // start scrolling up at this many lines

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

//remove empty elements at beginning and end
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
    var deaths= Math.floor(lvl * Math.floor(Math.pow(10,i-1)));
    all['Damage Level']=lvl;
    all['Deaths'] = (deaths).toLocaleString();
    all['Wounded'] = Math.floor(deaths * 3.14).toLocaleString();
    all['Status'] = status[i];

    for (var i of Object.keys(all)){
        sendArray.push(i + ':  ' + all[i]);
    }
    var date = new Date();
    sendArray.unshift(date,"","PLANETARY ASSESSMENT","");
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
function initScenario() {
    console.log('initScenario()');
    $('.ring').css('visibility','hidden');
    $('.ring').css('font-size','28');
    $('.horLine').hide();
    $('.vertLine').hide();
    // $('#aimH').removeClass('horLine');
    // $('#aimV').removeClass('vertLine');
    $('#aimH').css('border-color','blue');
    $('#aimV').css('border-color','blue');
    $('.ring').html = "";
    $('.spantest').html('');
    $('#glowring').css('visibility','visible');
}
comms = [
    ['','','','Standard Orbit','...','... Orbit decaying','...','... Drag coeficient','...','... calculated','...','... compensated'],
    ['','','','Preparing Scans','...','... Asthenospheric depth','...','... selected'],
    ['','','','Scans in progress','...','... Scanning','...','... Scanning'],
    ['','','','Scanning Results','...','... No anomalies detected','...','... disable scanning'],
    ['','','','ALL CLEAR','...','... Continue standard operations'],
    ['','','','DETECTION','...','... GRAVITY ANOMALY','...','... GRAVITY ANOMALY'],
    ['','','','RED ALERT','...','... MULTIPLE','... GRAVITY WELLS','...','... INCOMING'],
    ['','','','INCOMING','...','... GRAVITY WAVES','...','... BRACE FOR IMPACT','...','... EVASIVE ACTIONS'],
    ['','','','IMPLOSION','...','... SHIELDS DOWN','...','... WARPING OUT'],
    ['','','','WARPING OUT','...','... WARPING OUT','...','... OK STOP','...','... DUDE STOP!'],
    ['','','','POSITION','...','... MIN SAFE DISTANCE','...','... 1 PARSEC','...','... REAPPROCHING PLANET'],
    ['','','','ESTABLISHING ORBIT','...','... SCANNING','...','... ALL CLEAR','...','... Stand Down']
]
function attackOrbit() {
    console.log('attackOrbit()');
    $('#c').html("Attack Orbit"); //div solely for a counter display
    var count = 0;
    var speed = 50;
    charWrite(comms[0],speed,'#centerTopRightDiv');
    initScenario();
    var interval = setInterval(function(){
        if(count == 2){
            charWrite(comms[1],speed,'#centerTopRightDiv');
        }else if(count == 4){
            charWrite(comms[2],speed,'#centerTopRightDiv');
            $('.spantest').css('color','blue');
            $('.spantest').html('\u27ea'+" Scanning "+'\u27eb');
            $('#aimH').css('border-color','blue');
            $('#aimV').css('border-color','blue');
            $('.horLine').show();
            $('.vertLine').show();
            // $('#aimH').toggleClass('horLine');
            // $('#aimV').toggleClass('vertLine');
            $('.ring').html("INCOMING!!");
        }else if(count == 6){
            charWrite(comms[5],speed,'#centerTopRightDiv');
            $('.spantest').css('color','red');
            $('.spantest').html('\u27ea'+" DETECTION "+'\u27eb');
            $('#aimH').css('border-color','red');
            $('#aimV').css('border-color','red');
        }else if(count == 8){
            charWrite(comms[6],speed,'#centerTopRightDiv');
            $('.spantest').html('\u27ea'+" RED ALERT "+'\u27eb');
            $('#aimH').css('display','block');//wtf manually change from
            $('#aimV').css('display','block');//display none to block
        }else if(count == 10){
            charWrite(comms[7],speed,'#centerTopRightDiv');
            $('.ring').css('visibility','visible');
            $('.ring').html("INCOMING!!");
        }else if(count == 12){
            charWrite(comms[8],speed,'#centerTopRightDiv');
            $('.spantest').html('\u27ea'+" WARPING OUT "+'\u27eb');
            $('body').addClass('shakeit');
            $('.ring').html("IMPLOSION!!");
        }else if(count == 14){
            charWrite(comms[9],speed,'#centerTopRightDiv');
            $('body').removeClass('shakeit');
            $('#centerTopLeftDiv').toggleClass('shrink');
        }else if(count == 16){
            charWrite(comms[10],speed,'#centerTopRightDiv');
            $('.spantest').html('');
            // $('.ring').css('visibility','hidden');
            $('.ring').hide();
            $('.ring').html("");
        }else if(count == 18){
            charWrite(comms[11],speed,'#centerTopRightDiv');
            $('#centerTopLeftDiv').toggleClass('grow');
        }else if(count >= 21){
            // $('#aimH').removeClass('horLine');
            // $('#aimV').removeClass('vertLine');
            $('.horLine').hide();
            $('.vertLine').hide();
            // count = 0;
            clearInterval(interval);
            casualties();
        }
        $('#num').html(count);
        count++;
    },3000);

}
function standardOrbit() {
    console.log('standardOrbit()');
    $('#c').html("Standard Orbit");
    var count = 0;
    charWrite(comms[0],50,'#centerTopRightDiv');
    initScenario();
    var interval = setInterval(function(){
        if(count == 2){
            charWrite(comms[1],50,'#centerTopRightDiv');
        }else if(count == 4){
            charWrite(comms[2],50,'#centerTopRightDiv');
            $('.spantest').css('color','blue');
            $('.spantest').html('\u27ea'+" Scanning "+'\u27eb');
            $('#aimH').css('border-color','blue');
            $('#aimV').css('border-color','blue');
            $('.horLine').show();
            $('.vertLine').show();
            // $('#aimH').addClass('horLine');
            // $('#aimV').addClass('vertLine');
        }else if(count == 6){
            charWrite(comms[3],50,'#centerTopRightDiv');
            $('.spantest').html('');
        }else if(count == 8){
            charWrite(comms[4],50,'#centerTopRightDiv');
            $('.horLine').hide();
            $('.vertLine').hide();
            // $('#aimH').removeClass('horLine');
            // $('#aimV').removeClass('vertLine');
        }else if(count >= 10){
            // count = 0;
            clearInterval(interval);  //must turn on after code done
        }
        $('#num').html(count);
        count++;
    },3000);
}
function weather(){
    var weather = ['Weather report for today is grim',
    'Tuskan raiders are out in force',
    'so please stay inside.']
    charWrite(weather,50,'#centerTopRightDiv');
}
function incoming(){
    console.log('incoming()');
    var rand = myRandomGen(0,1);
    standardOrbit();
    if(rand == 0){
        standardOrbit();
    }else if(rand == 1){
        attackOrbit();
    }else {
        weather();
    }
}
function oldincoming(){
    console.log('oldincoming()');
    var delay1 = 5000; //wait for shaking + delay4
    var delay2 = 7000; //wait to hide planet
    var delay3 = 5000; //wait to stop shaking
    var delay4 = 2000; //wait to show incoming
    var count = (delay1 + delay2 + delay4) / 1000;
    var countdown = count - (delay2/1000)


    $('.spantest').html("");
    $('.ring').html("");
    // $('#centerTopLeftDiv').addClass('grow');
    // $('.ring').css('visibility','hidden');
    // $('.ring').css('font-size','28');
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
            var c = [];
            for(var b of Object.keys(a)){
                c.push(b + ": " + a[b]);
            }
            charWrite(c,50,'#centerBottomDiv');
            // tracker(c);
            i++;
        }else{
            i=0;
        }
    },speed);
}
function doLargeText(){
    console.log('doLargeText()');
    var fn1 = '/media/docs/largeText/alienScript.txt';
    loadDoc(fn1,typeWriter,'scrollTextDiv'); //no #
}
function doPicList(){
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


// functions that start once. only change on refresh
function writeOnce(){
    console.log('writeOnce()');
    doPicList();
    doLargeText();
    tracker();
}
function tracker(l=0){
    var len = "";
    var buh = setInterval(function(){

        for(var i =0; i < 220;i++){
            len += myRandomGen(0,1);
            len += " ";
        }
        $('#leftBottomDiv').html(len);
        len="";
    },500);
    // len.push(l);
    // $('#leftBottomDiv').html(':DEBUG:' + '<br>' + l);
}
function charWrite(myArray, speed = 50, el=""){
	console.log('charWrite()');
    var txtArray = myArray || ['charWrite():','received','empty','myArray','var.'];
	var arrIndex = 0;
    var contents = '';
    var charIndex = 0;
	var piece = "";
    var date = new Date();
    var element = el;

    // tracker(myArray.length);
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
