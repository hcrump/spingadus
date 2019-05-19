
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
        arr[i] = '\u2b9e' + arr[i];
        // console.log(arr[i]);
    }
    return arr;
}

function staticScreenInit() {
    console.log('staticScreenInit()');
    var filename = '/media/alienScript.txt';
    loadDoc(filename,typeWriter);
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

function divBordersOn(){
    $('div').toggleClass("div");
}

function fixArray(arr){
    let tmp = arr;
    while(tmp[0] == ''){
        tmp.shift();
    }
    return tmp;
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
    var deaths= lvl * Math.floor(Math.pow(10,i) * lvl);
    all['Attack Level']=lvl;
    all['Deaths'] = (deaths).toLocaleString();
    all['Wounded'] = (deaths * rand/10).toLocaleString();
    all['Status'] = status[i];

    for (var i of Object.keys(all)){
        sendArray.push(i+':\t'+all[i]);
    }
    $("#centerTopRightDiv").contents().filter(function(){ return this.nodeType == 3; }).first().replaceWith("Post-Mortem Briefing:");
    $('#centerTopRightDiv ul').html("");

    //only for manually printing to the div
    // for(var i in all){
    //     $('#centerTopRightDiv ul').append('<li>' + i + ': ' + all[i] + '</li>');
    // }
    charWrite(sendArray,100,'#centerTopRightDiv');
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

        //console.log(count);
        if(count<1){
            clearInterval(interval);
            $('.spantest').html('\u27ea'+" ALL CLEAR "+'\u27eb');
            $('.ringtxt2').html("");
        }
        count--;
        countdown--;
    },1000);
    // $('#glowring').toggleClass('shrink');
    // $('#centerTopLeftDiv').toggleClass('shrink');
    $('#glowring').queue(function(){
        $(this).css('visibility','visible');
        $('.ring').css('visibility','hidden');
        $('.spantest').html('\u27ea'+" WARNING "+'\u27eb');
        // $('#centerTopLeftDiv').toggleClass('grow');
        // $(this).toggleClass('grow');
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
        $(this).dequeue();
    }).delay(delay3).queue(function(){
        $('.ring').offsetWidth;
        // $('#centerTopLeftDiv').toggleClass('shrink');
        // $('#glowring').css('visibility','hidden');
        casualties();
        // $('.ring').addClass('ring-animation');
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

function charWrite(myArray, speed = 100, element){
	console.log('charWrite()');
    var txtArray = myArray || ['this','is','a','test'];
	var arrIndex = 0;
    var contents = '';
    var charIndex = 0;
	// var speed = mySpeed;
	var piece = "";
    var date = new Date();
    txtArray.unshift(date,"");
	contents += txtArray[arrIndex] + '<br>';

	var interval = setInterval(function(){
		if(arrIndex < txtArray.length){
			if(charIndex < contents.length){
				piece = contents.substring(0,charIndex+1) + '_';
				// $('#iframeDivCenter').html(piece);
                $(element).html(piece);
				charIndex++;
			}else{
				arrIndex++;
				contents += txtArray[arrIndex] + '<br>';
				// charIndex = 0; NO!!! keep increasing since we do +=
			}
		}else{
			clearInterval(interval);
		}
	},speed);
}
var loopCount = 0;
var myInterval = setInterval(function(){
    var rand = Math.floor(Math.random() * 100);
    // console.log(rand);
    if(loopCount % 60 == 0){
        incoming();
    }
    if(loopCount % 30 == 0){

    }
    loopCount++;
    if(rand % 100 == 0){
        screenGlitch();
    }
}, 1000);
/*---------------------------------*/
