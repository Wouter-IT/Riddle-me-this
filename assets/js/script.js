//Waits for the DOM to finish loading before running the game
// Get the button elements  and add event listeners to hem
document.addEventListener("DOMContentLoaded", function() {
    let buttons = document.getElementsByTagName("button");
    
    // sets the cursor to be in the box, so you can immediately type your answer without clicking on it first.
    document.getElementById('uname-input').focus();

    for (let button of buttons) {
        button.addEventListener("click", function() {
            if (this.getAttribute("data-type") === "username") { //Collects the data-type value of the button that is clicked and checks if it it the confirm button.
                createPlayer();
                playGame();
            } else if (this.getAttribute("data-type") === "forfeit") { // if it's not submit it's one of the game modes, "this" takes the value of the button clicked (and it's data-type) and notifies the user accordingly
                // returnMenu();
            }
            else {
                // nextGame();
            }
        })
    }
    // listens for the user to press "Enter" to submit their username as opposed to clicking the button.
    document.getElementById('uname-input').addEventListener("keydown", function(event) {
        if (event.key === "Enter") {
            createPlayer();
            playGame();
        }
    })    
})

// creates a new player for a game round.
 function createPlayer() {
    var player = {
        name: 'new',
        score: 0,
        wrongAnswers: 0
    }   
    player.name = document.getElementById('uname-input').value;
    document.getElementById('pbox').style.visibility = 'visible';
    currentUsername = document.getElementById('crt-uname');
    currentUsername.innerHTML = player.name;
}

// Clears greeting messages and instruction from screen and displays html elements needed to play the game. 
// Then generates 5 random numbers which are used to slect the riddles and gets the 1st of the 5 riddles. 
function playGame() {
    document.getElementById('greeting-area').style.display = 'none';
    document.getElementById('username-input-area').style.display = 'none';
    let revealGame = document.getElementsByClassName('game-area');
    for(let i = 0; i < revealGame.length; i++) {
        revealGame[i].style.display = 'block';
    }
    // Calls a function to "select" 5 random numbers
    let rdmRiddleArray = [];
    rdmRiddleArray = riddleSelection();
    getRiddle(rdmRiddleArray[0]);    
}

// reuses code from the Lovemath project to generate 5 random numbers between 0 and 49 without repeating any number
function riddleSelection() {
    let rdmNrsArray = [];
    let num1 = Math.floor(Math.random() * 50);
    rdmNrsArray.push(num1);

    let num2 = Math.floor(Math.random() * 50);
    num2 = checkDouble(num2, rdmNrsArray);
    rdmNrsArray.push(num2);
    
    let num3 = Math.floor(Math.random() * 50);
    num2 = checkDouble(num3, rdmNrsArray);
    rdmNrsArray.push(num3);

    let num4 = Math.floor(Math.random() * 50);
    num2 = checkDouble(num4, rdmNrsArray);
    rdmNrsArray.push(num4);

    let num5 = Math.floor(Math.random() * 50);
    num2 = checkDouble(num5, rdmNrsArray);
    rdmNrsArray.push(num5);

    return rdmNrsArray;
}
// Checks for doubles numbers in the rdmNrsArray
function checkDouble(rdmNum, numArray) {
    let containsDouble = numArray.includes(rdmNum);
    while (containsDouble) {
        ++rdmNum;
        if (rdmNum === 50) {
            rdmNum - 50;
        }
    }
    return rdmNum;
}

// get riddle moet: new riddle pakken
function getRiddle(riddleNr) {
    let number = riddleNr;
    alert(number);
    let selected = riddle[number];
    alert(selected);
// document.getElementById('riddle-imgage').innerHTML = selector.image;
    document.getElementById('riddle-text').innerHTML = selector.text;
    document.getElementById('riddle-hint').innerHTML = selector.hint;
    let answer = selected.answer;
}


let riddle = [{
    id: 0,
    image: '',
    text: 'Mr. Taylor has four daughters and each has a brother. In total, how many children does Mr. Taylor have?',
    answer: '5',
    hint: 'a number'
}, {
    id: 1,
    image: '',
    text: 'I possess a halo of water, walls of stone, and a tongue of wood. Long I have stood; what am I?',
    answer: 'castle',
    hint: 'a word'
}, {
    id: 2,
    image: '',
    text: 'What can run but never walk, have a mouth but never talk, have a head that never weeps, and a bed that never sleeps?',
    answer: 'river',
    hint: 'a word'
}, {
    id: 3,
    image: '',
    text: 'What has only two words, but thousands of letters?',
    answer: 'post office',
    hint: 'two words'
}, {
    id: 4,
    image: '',
    text: 'What can fill an entire room without taking up any space?',
    answer: 'light',
    hint: 'a word'
}, {
    id: 5,
    image: '',
    text: 'The first two letters signify a male, the first three letters signify a female, the first four letters signify a great person, while the entire word signifies a great woman.',
    answer: 'heroine',
    hint: 'a word'
}, {
    id: 6,
    image: '',
    text: 'What has ten letters and starts with gas?',
    answer: 'Automobile',
    hint: 'a word'
}, {
    id: 7,
    image: '',
    text: 'People in poverty have this. If you eat this you will die. What is it?',
    answer: 'nothing',
    hint: 'a word'
}, {
    id: 8,
    image: '',
    text: 'What has roots that no one sees and looms much taller than trees? Up it goes but yet it never grows; what is it?',
    answer: 'mountain',
    hint: 'a word'
}, {
    id: 9,
    image: '',
    text: 'What gets wet while drying?',
    answer: 'towel',
    hint: 'a word'
}];

