// turned async off so i can return values from
// within callback functions. pain in the butt.
$.ajaxSetup({
    async: false
});

// global vars since I'm a newb
var right=0;
var wrong=0;
var answersLength=0;

//global html text
//any text that I call a lot. For easy use
function msgInnerData () {
    $('#innerData').css('innerData');
    $('#innerData').html('<p>This is the start page for many fun and interesting tests!' +
    ' They are all drag and drop without any scoring. You can test all you want until you' +
    ' get them all right.</p><p> Start by choosing a test from the Tests menu button. </p>');
}

function insertMainTable () {
    $('#data').append('<table id="mainTable"><thead id="thead1">'+
    '<tr></tr></thead><tbody id="tbody1"></tbody></table>');
}
//keeps global
var setGlobal = (function(global) {
    return function(value) {
        global.someVarName = makeMyObject(value);
    }
}(this));

var readGlobal = (function(global) {
    return function() {
        return global.someVarName;
    }
}(this));

//experimenting
var testGlobal = (function(first) {
    return {
        add: function(second) {
            buh = makeMyObject(second);
            return buh;
        }
    }
}());

function shuffleArray(array){
    for(let i = array.length - 1; i > 0; i--){
        const j = Math.floor(Math.random() * (i + 1));
        [array[i],array[j]] = [array[j], array[i]];
    }
}

// Creates main object structure that each page reads
// called by mainStartScript
// Called by setGlobal
function makeMyObject(theObject) {
    console.log('makeMyObject');
    var map = {};
    subject = "";
    arr = theObject;
    for (var i in arr) {
        for (var j in arr[i]) {
            var key = j;
            var value = arr[i][j];
            if (key === 'subject') {
                subject = value;
                if (!(subject in map)) {
                    map[subject] = {};
                }
            } else {
                if (key in map[subject]) {
                    map[subject][key].push(value);
                } else {
                    map[subject][key] = [value];
                }
            }
        }
    }
    return map;
}

// gets json file
function getMyJSON(jsonFileName) {
    console.log('getMyJSON:' + jsonFileName);
    var myJson;
    $.getJSON('json/' + jsonFileName, function(json) {
        //console.log(json);
        myJson = json;
    }).fail(function(json, textstatus, error) {
        console.error("getJSON failed, status: " + textstatus + ", error: " + error)
    });
    b = JSON.stringify(myJson);
    console.log('myJson:'+b);
    return myJson;
}

function clearHtml(options){
    if(options.includes('topicsMenu'.toLowerCase())){
        $('#topicsMenu ul li').remove();
        console.log('clearHtml:topicsmenu');
    }
    if(options.includes('table'.toLowerCase())){
        $('#mainTable').remove();
        $('#answersTable').remove();
        $('#innerData p').remove();
        $('#instructionsP').empty();
        console.log('clearHtml:table');
    }
}

// simple stats for each test.
function keepTrack(){
    console.log("right:wrong:"+right+":"+wrong);
    var totalCount = right + wrong;
    var percentCorrect = right / totalCount;
    var words = "";
    words += "Congratulations! You Finished!<br>";
    words += right +" out of " + (totalCount) + "<br>";
    words += "Correct Attempts: " + (percentCorrect * 100).toFixed(2) + "%";
    $('#instructionsP').html(words);
    $('#mainpagecat').css('animation-play-state', 'running');
}

function allowDrop(ev) {
    ev.preventDefault();
    ev.dataTransfer.dropEffect = "move"
}

var dragSrcEl = null;
function drag(ev) {
    console.log("dragstart");
    //this.style.opacity = '.4';
    dragSrcEl = ev.srcElement;
    ev.currentTarget.style.border = "dashed";
    ev.dataTransfer.effectAllowed = 'move';
    ev.dataTransfer.setData('text/html', ev.target.innerHTML);
    ev.dataTransfer.setData("source",ev.srcElement.id);
}

// on drop attempt, match innerhtml of src and dest to allow drop
// then del src element and unhide target to see interval
// must make sure to change tar for dup srcs.
function drop(ev,target) {
    ev.preventDefault();
    var source = ev.dataTransfer.getData("source");
    var tarhtml = ev.dataTransfer.getData("text/html");
    console.log('evtarhtml:'+ ev.target.innerHTML);
    var srcEl = document.getElementById(source);
    //var tarEl = document.getElementById(tarhtml);
    tarid = document.getElementById(tarhtml.id);
    console.log('id of dragged item is:', source);
    //console.log('id of target:', tarid);
    console.log(srcEl.innerHTML + ":" +ev.target.innerHTML);

    if(srcEl.innerHTML == ev.target.innerHTML) {
        ev.target.innerHTML = ev.dataTransfer.getData("text/html");

        console.log('matched');
        var tarid = document.getElementById(ev.target.id);
        //console.log('tarid:'+tarid);
        tarid.classList.remove('tdHidden');
        $(ev.target).attr('ondrop',"");
        console.log('buh:'+ $(ev.target).attr('ondrop'));

        srcEl.remove();
        console.log('matched:'+ev.target.innerHTML);
        right++;
        if(right == answersLength){
            console.log("right:length:"+right+":"+answersLength);
            keepTrack();
        }
    }else {
        console.log('missed');
        wrong++;
    }

    ev.dataTransfer.clearData();
}
function buildTable(topEl) {
    console.log('buildTable:'+topEl);
    myMap = readGlobal(); //recalls my data
    answersLength=0; //resetting global...yeah i know, but i'm newb.
    right = 0; //global
    wrong = 0; //global
    var answers = [];
    if (!(topEl == null)) {
        var tHeaders = Object.keys(myMap[topEl]); //verified same subject
        //var cols = Object.keys(myMap[topEl]).length;
        cols = tHeaders.length;
        var rows = myMap[topEl][Object.keys(myMap[topEl])[0]].length;

        clearHtml(['table']);

        // instructions
        $('#instructions').html('<p id="instructionsP">');
        $('#instructionsP').html('Just drag the answers from the right to the appropriate place on the left');

        insertMainTable();
        // create table headers
        for (var j = 0; j < tHeaders.length; j++) {
            console.log('create table headers:' + tHeaders[j]);
            $('#thead1').append('<th>' + tHeaders[j].toUpperCase() + '</th>');
        }

        //build table rows first, so [0],[0,[1][1],etc
        for (var i = 0; i < rows; i++) {
            var tr = $('<tr>');
            $('#tbody1').append(tr);
            var myRows = "";
            for (var j = 0; j < cols; j++) {
                var tabData;
                tabData = myMap[topEl][tHeaders[j]][i];
                if(j == 0){
                    myRows = '<td class="tdNoDrag" id='+tabData+'>'+ tabData + '</td>';
                } else {
                    console.log('id:'+tabData+":");
                    myRows += '<td class="tdNoDrag tdHidden" id=' + 'hidden' +
                    '_row'+ i + '_col' + j + ' ondrop="drop(event)"' +
                    ' ondragover="allowDrop(event)">' + tabData + '</td>';
                    answers.push(tabData);
                }
            }
            shuffleArray(answers);
            answersLength = answers.length; //global for counting
            tr.append(myRows);
        }
        //$('#innerData').html('Good Luck!');
        $('#answerDiv').append('<table id="answersTable">');
        for(var i =0;i<answers.length;i++){
            $('#answersTable').append('<td class="tdDrag" id='+'answer'+i+' draggable="true"'+
            'ondragstart="drag(event)">'+answers[i]+'</td>');
        }
    }
}

// receives json file, ex. small.jsonlist
// creates topicmenu sub links from xlsx sheetnames
// created every click on topicsmenu pulldown
function mainStartScript(jsonFileName) {
    console.log('mainStartScript:' + jsonFileName);
    var json = getMyJSON(jsonFileName);
    setGlobal(json); //saves my structured data
    var myMap = readGlobal(json); //recalls my data
    var topElList = Object.keys(myMap); //same as sheetname[0]
    var topEl = topElList[0];

    //builds topicsMenu
    if (!(topEl == null)) {
        i = topEl;

        clearHtml(['topicsmenu','table']);

        // Create menu and topic links
        var subjectTitle = fixNames(jsonFileName.toUpperCase(),true);
        $('#topicsMenu h3').html(subjectTitle);
        for (var i in topElList) {
            //console.log('buh:'+topElList[i]);
            var newLink = fixLink(topElList[i], 'buildTable');
            //console.log('newLink:'+newLink);
            $('#topicsMenu ul').append('<li>' + newLink + '</li>');
        }
        msgInnerData();
    }
}

//remove extension if a filename
//convert _ to space. looks better for link text
function fixNames(string,isFilename) {
    console.log('fixnames:'+string);
    string = string.replace(/_/g, ' ');
    if(isFilename){  //filename, so remove extension
        string = string.replace(/\.[^/.]+$/, "");
    }
    //console.log('fixnames:'+string);
    return string;
}

// create sub topics links
function fixLink(string, funcName) {
    console.log('fixLink:'+string);
    var a = '<a href="#" onclick="' + funcName + '(';
    var b = "'" + string + "'";
    var c = ');return false;">';
    var d = fixNames(string,false);
    var e = '</a>';
    var scrunch = a + b + c + d + e;
    //console.log('fixLink:'+a+b+c+d+e);
    return scrunch;
}

// hide pulldown menu when button clicked again
function clickHide() {
    document.getElementById("myDropdown").classList.toggle("show");
}

// on click checks if outside of button, if so, close button
window.onclick = function(event) {
    if (!event.target.matches('.dropbtn')) {
        var dropdowns = document.getElementsByClassName("dropdown-content");
        var i;
        for (i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
};

function footer() {
    var d = new Date();
    var year = d.getFullYear();
    msg = '\u00A9' + year + " Made by Horacecrump.com";
    $('footer').html(msg);
}

function getFileToHtml(element, filename) {
    $(element).load(filename, function() {
        console.log('Loaded ' + filename + ' to' + element);
    });
}

function getFileToVar(filename) {
    var dt;
    $.get(filename, function(data) {
        dt = data;
        buildButtons(dt);
    });
    return dt;
}

//makes topicsmenu  pulldown links to mainStartScript and json files
//only happens on main page refresh
function buildButtons(text) {
    text = text.split("\n");
    for (var i = 0; i < text.length; i++) {
        text[i] = text[i].replace(/\.[^/.]+$/, "");
    }
    for (var i = 0; i < text.length; i++) {
        var a = '<a href="#" onclick="mainStartScript(';
        var b = "'" + text[i];
        var c = '.json\');return false;">';
        var d = fixNames(text[i].toUpperCase(),false);
        var e = '</a>';
        var scrunch = a + b + c + d + e;
        console.log('build:'+ scrunch);

        // build dropdown buttons
        $('#myDropdown').append(scrunch);
        msgInnerData();
    }
}

function getFilez() {
    var dt = $.get("http://localhost/testing/json/jsonlist.txt", function(data) {
        console.log('data:' + data);
        dt = data;
    });
}

function getDirList() {
    $.get('json/', (data) => {
        //console.log(data);
        let listing = parseDirectoryListing(data);
        //$('body').append(JSON.stringify(listing));

    });

    function parseDirectoryListing(text) {
        let docs = text
            .match(/href="([\w]+)/g) // pull out the hrefs
            .map((x) => x.replace('href="', '')); // clean up
        //console.log(docs);
        return docs;
    }
}

// Main start script, base page, no tests
function mainInitScript() {
    console.log("mainInitScript: started");

    footer();
    //getFileToVar('json/jsonlist.txt');
    var files = getFileToVar('/json/jsonlist.txt');
    console.log('files:'+files);
}
