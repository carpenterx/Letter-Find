var letters = Array.from(document.getElementsByClassName("circle-border"));
var validLettersTextarea = document.getElementById("all-letters");
var letterToFindInput = document.getElementById("find-letter");
var useLowercaseCheckbox = document.getElementById("allow-lowercase");
var correctLettersCounter = document.getElementById("correct-letters");
var refreshButton = document.getElementById("refresh");
var helpButton = document.getElementById("help");
var helpModal = document.getElementById("help-modal");
var closeSpan = document.getElementsByClassName("close")[0];
var printButton = document.getElementById("print");

var largeLetter = document.getElementById("large-letter");
var validLetters;

refreshButton.addEventListener("click", SetupPage);
helpButton.addEventListener("click", ShowHelp);
closeSpan.addEventListener("click", HideHelp);
window.onclick = function (event) {
    if (event.target == helpModal) {
        HideHelp();
    }
}
printButton.addEventListener("click", ShowPrintDialog);
letters.forEach(letter => letter.addEventListener("click", ToggleFill));

SetupPage();

function ShowHelp() {
    helpModal.style.display = "block";
}

function HideHelp() {
    helpModal.style.display = "none";
}

function ShowPrintDialog() {
    window.print();
}

function ToggleFill() {
    if (this.classList.contains("fill")) {
        this.classList.remove("fill");
    } else {
        this.classList.add("fill");
    }
}

function RemoveFills() {
    letters.forEach(letter => letter.classList.remove("fill"));
}

function SetupPage() {
    RemoveFills();

    validLetters = validLettersTextarea.value.toUpperCase();
    var letterToFind = letterToFindInput.value.toUpperCase();
    var useLowercase = useLowercaseCheckbox.checked;
    var correctLetters = correctLettersCounter.value;
    var pageLetters = [];

    if (letterToFind.length == 1 && validLetters.length > 1) {
        if (useLowercase) {
            largeLetter.innerHTML = letterToFind + " " + letterToFind.toLowerCase();
        } else {
            largeLetter.innerHTML = letterToFind;
        }

        var i;
        for (i = 0; i < correctLetters; i++) {
            if (useLowercase) {
                pageLetters.push(GetRandomCaseLetter(letterToFind));
            } else {
                pageLetters.push(letterToFind);
            }
        }
        for (i = correctLetters; i < letters.length; i++) {
            pageLetters.push(GetRandomLetter(letterToFind, useLowercase));
        }

        Shuffle(pageLetters);
        for (i = 0; i < letters.length; i++) {
            letters[i].innerHTML = pageLetters[i];
        }


    } else {
        largeLetter.innerHTML = "ERROR";
        letters.forEach(letter => letter.innerHTML = "");
    }
}

function GetRandomLetter(letterToFind, useLowercase) {
    var fillerLetters = validLetters.replace(letterToFind, "");
    var lettersCount = fillerLetters.length;
    var randomLetterIndex = Math.floor(Math.random() * lettersCount);
    var randomLetter;
    if (useLowercase) {
        randomLetter = GetRandomCaseLetter(fillerLetters[randomLetterIndex]);
    } else {
        randomLetter = fillerLetters[randomLetterIndex];
    }

    if (randomLetter != undefined) {
        return randomLetter;
    } else {
        return "";
    }
}

function GetRandomCaseLetter(letter) {
    var randomNumber = Math.floor(Math.random() * 100);
    var randomLetter;
    if (randomNumber < 50) {
        randomLetter = letter;
    } else {
        randomLetter = letter.toLowerCase();
    }

    if (randomLetter != undefined) {
        return randomLetter;
    } else {
        return "";
    }
}

function Shuffle(array) {
    var currentIndex = array.length,
        temporaryValue, randomIndex;

    while (0 !== currentIndex) {

        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}