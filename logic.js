// From Mozilla fire Fox developer tabs
// Loading a JSON file from your local drive
function bodyDidLoad() {

    const inputElement = document.getElementById("fileUploader");
    inputElement.addEventListener("change", handleFiles, false);
    function handleFiles() {
        const fileList = this.files; /* now you can work with the file list */
        file0 = this.files[0];
        var myFileReader = new FileReader(); // From some random stack overflow
        myFileReader.onload = function(fileLoadedEvent){
            var textFromFileLoaded = fileLoadedEvent.target.result;
            fileDidFinishGettingRead(textFromFileLoaded);
        };
        myFileReader.readAsText(file0);
    }

}

//Reading the file
function fileDidFinishGettingRead(textFromFileLoaded) {
    console.log(textFromFileLoaded);
    myNewList = JSON.parse(textFromFileLoaded);
    redrawTableFromList(myNewList);
}

// Drawing the table after the file gets read using above
function redrawTableFromList(myNewList) {
    tbodyForTasks.innerHTML ="" ;
    myNewList.forEach(element => createTable(element));
}

var listItems = [];
var pkWeAreUpto = 1;

//adding all 4 elements into the list to allow for downloading
function captureDate () {
    var dateEntry = document.getElementById("input_newEntry");
    var userDate = dateEntry.value;
    return userDate;
}
function captureMinTemp () {
    var minTempEntry = document.getElementById("input_newEntry2");
    var userTemp1 = minTempEntry.value;
    return userTemp1;
}
function captureMaxTemp () {
    var maxTempEntry = document.getElementById("input_newEntry3");
    var userTemp2 = maxTempEntry.value;
    return userTemp2;
}
function captureConditions () {
    var conditionsEntry = document.getElementById("input_newEntry4");
    var userConditions = conditionsEntry.value;
    return userConditions;
}

// all 4 elements completed

function userDidClickCreate() {
    var listDate = captureDate();
    var listMinTemp = captureMinTemp();
    var listMaxTemp = captureMaxTemp();
    var listConditions = captureConditions();

    var newItemDictionary = {
        "id": pkWeAreUpto
        ,"Date":listDate
        ,"Min. Temp.": listMinTemp
        ,"Max Temp.": listMaxTemp
        ,"Conditions": listConditions
    };

    listItems.push(newItemDictionary);
    pkWeAreUpto++;

    createTable(newItemDictionary)

    //console.log(listItems)

}



function createTable(newItemDictionary) {


    var myActions = "<a onclick='deleteItem(" + newItemDictionary["id"] + ")' href='#' > Delete This One </a>";

    var preparedRowHTML = "<tr id='rowForItem_" + newItemDictionary["id"] + "'>";
    preparedRowHTML += "<td>" + newItemDictionary["Date"] + "</td>";
    preparedRowHTML += "<td>" + newItemDictionary["Min. Temp."] + "</td>";
    preparedRowHTML += "<td>" + newItemDictionary["Max Temp."] + "</td>";
    preparedRowHTML += "<td>" + newItemDictionary["Conditions"] + "</td>";
    preparedRowHTML += "<td>" + myActions + "</td>";
    preparedRowHTML += "</tr>";

    console.log(preparedRowHTML)

    tbodyForTasks.innerHTML += preparedRowHTML;
    
}

function deleteItem(rowToDelete) {
    // go to listItems and delete the row
    // Implement Later - I need to have udnerscore and then run two lines of code as 22 mins

    //go to DOM and delete the riw
    document.getElementById("rowForItem_" + rowToDelete).innerHTML = "";
}

// How to download a Json File and name it as "data". This will download the listItems as a string
function downloadJSON() {
    download("data.json", JSON.stringify(listItems, null, '\t'));
}


//https://ourcodeworld.com/articles/read/189/how-to-create-a-file-and-generate-a-download-with-javascript-in-the-browser-without-a-server 
// copied from here


function download(filename, text) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
}
