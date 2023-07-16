//Waits for the DOM to finish loading before running the game
// Get the button elements  and add event listeners to hem
document.addEventListener("DOMContentLoaded", function () {
    let buttons = document.getElementsByTagName("button");
    // sets the cursor to be in the box, so you can immediately type your answer without clicking on it first.
    document.getElementById('uname-input').focus();
    var player = new Player('', 0, 0)
    for (let button of buttons) {
        button.addEventListener("click", function () {
            switch (this.getAttribute("data-type")) {
                case "username":
                    // Check input code based off snd example snippet on https://www.w3schools.com/howto/howto_js_validation_empty_input.asp
                    let input = document.getElementById('uname-input').value;
                    if (input === "") {
                        alert("Name must be filled out");
                        document.getElementById('uname-input').focus();
                        break;
                    }
                    createPlayer();
                    playGame();
                    break;
                case "answer":
                    let answerInput = document.getElementById('answer-input').value;
                    if (answerInput === "") {
                        alert("An answer must be filled in");
                        document.getElementById('answer-input').focus();
                        break;
                    }
                    checkAnswer();
                    break;
                case "skip":
                    //showAnswer(); 
                    //nextRiddle(); < name??
                    break;
                case "next":
                    // something to get new riddle with number form random number array
                    break;
                case "forfeit":
                    forfeitGame();
                    break;
                default:
                    alert(`Unimplemented button ${this.getAttribute("data-type")}`);
                    throw (`Unimplemented button ${this.getAttribute("data-type")}". Aborting!"`);
            }
        });
    }
    // listens for the user to press "Enter" to submit their username as opposed to clicking the button.
    document.getElementById('uname-input').addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            let input = document.getElementById('uname-input').value;
            if (input === "") {
                alert("Name must be filled out");
            } else {
                createPlayer();
                playGame();
            }
        }
    });
    // listens for the user to press "Enter" to submit their answer as opposed to clicking the button.
    document.getElementById('answer-input').addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            let answerInput = document.getElementById('answer-input').value;
            if (answerInput === "") {
                alert("An answer must be filled in");
                document.getElementById('answer-input').focus();
            } else {
                if (document.getElementById('answer-btn').disabled === true) {
                    alert('You have already answered correctly! Please proceed to the next riddle by clicking the "Next" button.');
                } else {
                    checkAnswer();
                };
            };
        }
    });
});
/**
 * Creates the player account object including name, score, amount of wrong answers
 */
function createPlayer() {
    player = new Player('', 0, 0);
    player.name = document.getElementById('uname-input').value;
    document.getElementById('pbox').style.visibility = 'visible';
    currentUsername = document.getElementById('crt-uname');
    currentUsername.innerHTML = player.name;
    // Clears user input for when they return to this screen
    let clearInput = document.getElementById('uname-input');
    clearInput.value = "";
    console.log("1 - Player created");
}

function Player(username, startScore, newWrongAnswers) {
    this.name = username;
    this.score = startScore;
    this.wrongAnswers = newWrongAnswers;
}

/**
 * Prepares game area by clearing greeting messages and instruction. 
 * Generates 5 random numbers which are used to slect the riddles and gets the 1st of the 5 riddles.
 */
function playGame() {
    document.getElementById('greeting-area').style.display = 'none';
    document.getElementById('username-input-area').style.display = 'none';
    let revealGame = document.getElementsByClassName('game-area');
    for (let i = 0; i < revealGame.length; i++) {
        revealGame[i].style.display = 'block';
    }
    console.log("2 - Game started");
    // Calls a function to "select" 5 random numbers and displays riddle on screen
    let rdmRiddleArray = [];
    rdmRiddleArray = riddleSelection();
    //Gets a new riddle a puts it on screen. Then stores the answer value of the riddle object in the riddleAnswer variable which is declared at the top of this document.
    riddleAnswer = getRiddle(rdmRiddleArray[0]);
    alert(riddleAnswer);
    // sets the cursor to be in the box, so you can immediately type your answer without clicking on it first.
    document.getElementById('answer-input').focus();
}

function checkAnswer() {
    let userAnswer = document.getElementById('answer-input').value;
    let inputString = checkInputType(userAnswer);
    // Next 2 codelines from https://bobbyhadz.com/blog/javascript-clear-input-field-after-submit
    // Clears the input field.
    let clearInput = document.getElementById('answer-input');
    clearInput.value = "";
    if (inputString) {
        if (userAnswer.toLowerCase() === riddleAnswer) {
            alert("this answer is correct! (string)");
            incrScore();
            // let playerScore = document.getElementById('crt-score').innertHTML;
            let answerButton = document.getElementById('answer-btn');
            answerButton.disabled = true;
        } else {
            alert("this answer is incorrect! (string)");
            incrWrongAnswers();
        }
    } else {
        // Codeline below created from theory on https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/parseInt
        let parsed = parseInt(userAnswer);
        if (parsed === riddleAnswer) {
            alert("this answer is correct! (number)");
            incrScore();
            //Code from https://www.scaler.com/topics/javascript-disable-button/
            let answerButton = document.getElementById('answer-btn');
            answerButton.disabled = true;
        } else {
            alert("This answer is incorrect! (number)");
            incrWrongAnswers();
        }
    }
}

// Checks if code is actually a number or string so it can be compared with the answer accordingly.
function checkInputType(userInputAnswer) {
    let isNan = parseInt(userInputAnswer);
    if (isNaN(isNan)) {
        return true;
    } else {
        return false;
    }
}

// reuses code from Love Maths project.
function incrScore() {
    let oldScore = parseInt(document.getElementById('crt-score').innerText);
    document.getElementById('crt-score').innerText = (oldScore + 500);
    player.score = oldScore + 500;
    console.log(player.score);
}

// reuses code from Love Maths project.
function incrWrongAnswers() {
    let oldWrongAnswers = parseInt(document.getElementById('crt-wa').innerText);
    document.getElementById('crt-wa').innerText = ++oldWrongAnswers;
    player.wrongAnswers = oldWrongAnswers;
    console.log(player.wrongAnswers);
}

function forfeitGame() {
    //Code on confirmation pop-up comes from https://www.tutorialsteacher.com/javascript/display-popup-message-in-javascript
    forfeitConf = window.confirm(["Are you sure you want to forfeit your run? Your score will still be posted to the leaderboard."]);
    if (forfeitConf) {
        pushToLeaderboard();
        document.getElementById('greeting-area').style.display = 'block';
        document.getElementById('username-input-area').style.display = 'block';
        let revealGame = document.getElementsByClassName('game-area');
        for (let i = 0; i < revealGame.length; i++) {
            revealGame[i].style.display = 'none';
        }
        document.getElementById('pbox').style.visibility = 'hidden';
        resetPlayer();
    }
}
//Resets player
function resetPlayer() {
    console.log('resetting player')
    document.getElementById('crt-score').innerText = '0';
    document.getElementById('crt-wa').innerText = '0';
    let answerButton = document.getElementById('answer-btn');
    answerButton.disabled = false;
    console.log(player.score);
    console.log(player.wrongAnswers);
}
//Pushes player data to leaderboard. Then updates the leaderboard.
function pushToLeaderboard() {
    leaderboardArray.push(player);
    console.log("I've pushed player into array.");
    // Code to sort leaderboard Array from https://flaviocopes.com/how-to-sort-array-of-objects-by-property-javascript/
    leaderboardArray.sort((a, b) => (a.score > b.score) ? 1 : (a.score === b.score) ? ((a.wrongAnswers > b.wrongAnswers) ? 1 : -1) : -1);
    leaderboardArray.pop();
    alert(JSON.stringify(leaderboardArray));
    updateLeaderboard();
}

function updateLeaderboard() {
    for (let i = 0; i < leaderboardArray.length; i++) {
        let entry = leaderboardArray[i];
        console.log(entry);
        switch (i) {
            case 0:
                if (entry === undefined) {
                    break;
                }
                document.getElementById('first-user').innerHTML = entry.name;
                document.getElementById('first-score').innerHTML = entry.score;
                break;
            case 1:
                if (entry === undefined) {
                    break;
                }
                document.getElementById('second-user').innerHTML = entry.name;
                document.getElementById('second-score').innerHTML = entry.score;
                break;
            case 2:
                if (entry === undefined) {
                    break;
                }
                document.getElementById('third-user').innerHTML = entry.name;
                document.getElementById('third-score').innerHTML = entry.score;
                break;
            case 3:
                if (entry === undefined) {
                    break;
                }
                document.getElementById('fourth-user').innerHTML = entry.name;
                document.getElementById('fourth-score').innerHTML = entry.score;
                break;
            case 4:
                if (entry === undefined) {
                    break;
                }
                document.getElementById('fifth-user').innerHTML = entry.name;
                document.getElementById('fifth-score').innerHTML = entry.score;
                break;
            case 5:
                if (entry === undefined) {
                    break;
                }
                document.getElementById('sixth-user').innerHTML = entry.name;
                document.getElementById('sixth-score').innerHTML = entry.score;
                break;
            case 6:
                if (entry === undefined) {
                    break;
                }
                document.getElementById('seventh-user').innerHTML = entry.name;
                document.getElementById('seventh-score').innerHTML = entry.score;
                break;
            case 7:
                if (entry === undefined) {
                    break;
                }
                document.getElementById('eighth-user').innerHTML = entry.name;
                document.getElementById('eighth-score').innerHTML = entry.score;
                break;
            case 8:
                if (entry === undefined) {
                    break;
                }
                document.getElementById('nineth-user').innerHTML = entry.name;
                document.getElementById('nineth-score').innerHTML = entry.score;
                break;
            case 9:
                if (entry === undefined) {
                    break;
                }
                document.getElementById('tenth-user').innerHTML = entry.name;
                document.getElementById('tenth-score').innerHTML = entry.score;
                break;
            default:
                alert(`Unknown entry ${entry}`);
                throw (`Unknown entry ${entry}". Aborting!"`);
        }
    }
}

// reuses code from the Love maths project. 
/**
 * Generate 5 random numbers between 0 and 49 without repeating any number
 */
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

    alert(JSON.stringify(rdmNrsArray));
    return rdmNrsArray;
}

/**
 * Checks for doubles numbers in the rdmNrsArray
 */
function checkDouble(rdmNum, numArray) {
    console.log("4 - Check for double started");
    let containsDouble = numArray.includes(rdmNum);
    while (containsDouble) {
        rdmNum++;
        if (rdmNum >= 50) {
            rdmNum = 0;
        } else {
            containsDouble = numArray.includes(rdmNum);
        }
    }
    return rdmNum;
}

// gets a riddle from the riddles array and displays it on screen.
function getRiddle(riddleNr) {
    let number = riddleNr;
    let selected = riddle[number];
    // document.getElementById('riddle-imgage').innerHTML = selected.image; <-- gewoon html met link naar de afbeelding <img src="link" alt="alt-text">
    replaceText = document.getElementById('riddle-text');
    replaceText.innerHTML = selected.text;
    replaceHint = document.getElementById('riddle-hint');
    replaceHint.innerHTML = selected.hint;
    let answer = selected.answer;
    console.log("5 - Riddle retreived for play");
    return answer;
}
// Player object
// var player = {
//     name: 'new',
//     score: 0,
//     wrongAnswers: 0
// };   

//Creates the array for the leaderboard that can be called upon by functions.
var leaderboardArray = new Array(10);

// Array of objects that stores all riddles
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
    answer: 'automobile',
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
}, {
    id: 10,
    image: '',
    text: 'What is able to go up a chimney when down but unable to go down a chimney when up?',
    answer: 'umbrella',
    hint: 'a word'
}, {
    id: 11,
    image: '',
    text: 'What English word retains the same pronunciation, even after you take away four of its five letters?',
    answer: 'queue',
    hint: 'a word'
}, {
    id: 12,
    image: '',
    text: 'What jumps when walking and sits when standing?',
    answer: 'kangaroo',
    hint: 'a word'
}, {
    id: 13,
    image: '',
    text: 'If you eat me, my sender will eat you. What am I?',
    answer: 'fishhook',
    hint: 'a word'
}, {
    id: 14,
    image: '',
    text: 'I can shave every day but my beard never changes. What am I?',
    answer: 'barber',
    hint: 'a word'
}, {
    id: 15,
    image: '',
    text: 'Three different doctors said that Paul is their brother yet Paul claims he has no brothers. Who is lying?',
    answer: 'nobody',
    hint: 'one word'
}, {
    id: 16,
    image: '',
    text: 'I exemplify a rare case where today comes before yesterday. What am I?',
    answer: 'dictionary',
    hint: 'a word'
}, {
    id: 17,
    image: '',
    text: 'Which English word is the odd one out: Stun, Ton, Evil, Letter, Mood, Bad, Strap, Snap, and Straw?',
    answer: 'letter',
    hint: 'a word'
}, {
    id: 18,
    image: '',
    text: 'I am born tall and grow short with age. What could I be?',
    answer: 'pencil',
    hint: 'a word'
}, {
    id: 19,
    image: '',
    text: 'The person who makes it and the person who buys it have no use for it and the person who uses it never knows they are using it. What is it?',
    answer: 'coffin',
    hint: 'a word'
}, {
    id: 20,
    image: '',
    text: 'My buddies and I were inseparable mates until one by one we were split. My teacher then gave me a smack on the head so off in the corner I sit. What am I?',
    answer: 'staple',
    hint: 'a word'
}, {
    id: 21,
    image: '',
    text: 'The more these are taken, the more they are left behind. What are they?',
    answer: 'footstep',
    hint: 'a word'
}, {
    id: 22,
    image: '',
    text: 'I eat to live and drink to die. What could I be?',
    answer: 'fire',
    hint: 'a word'
}, {
    id: 23,
    image: '',
    text: 'I promise, I offend, I direct, and I fight. What am I?',
    answer: 'hand',
    hint: 'a word'
}, {
    id: 24,
    image: '',
    text: 'I am a five-letter word. I sound the same when you remove my first letter. I sound the same when you remove my third letter. I sound the same when my last letter is removed and I sound the same when all three are removed. What word am I?',
    answer: 'empty',
    hint: 'a word'
}, {
    id: 25,
    image: '',
    text: 'What is caught but never thrown?',
    answer: 'cold',
    hint: 'a word'
}, {
    id: 26,
    image: '',
    text: 'When I am needed by you, you throw me away, but when I’m of no use, you take me back. What am I?',
    answer: 'anchor',
    hint: 'a word'
}, {
    id: 27,
    image: '',
    text: 'I fly without wings and cry without eyes. Wherever I lead, darkness follows. What could I be?',
    answer: 'cloud',
    hint: 'a word'
}, {
    id: 28,
    image: '',
    text: 'What is it that no one wants but no one wants to lose?',
    answer: 'lawsuit',
    hint: 'a word'
}, {
    id: 29,
    image: '',
    text: 'I am a five-letter word and people eat me. If you remove the first letter I become an energy form. If you remove the first two letters, I am needed to live. Scramble the last three letters and I am a drink. What word am I?',
    answer: 'wheat',
    hint: 'a word'
}, {
    id: 30,
    image: '',
    text: 'We hurt without moving and poison without touching. We bear truth and lies but are no judged by size. What are we?',
    answer: 'word',
    hint: 'a word'
}, {
    id: 31,
    image: '',
    text: 'WMy first is in chocolate but no in ham. My second is in cake and also in jam. My third at tea-time is easily found. Altogether, this is a friend who is often around. What is it?',
    answer: 'cat',
    hint: 'a word'
}, {
    id: 32,
    image: '',
    text: 'What word becomes shorter when you add two letters to it?',
    answer: 'short',
    hint: 'a word'
}, {
    id: 33,
    image: '',
    text: 'What word in the English language has three consecutive double letters?',
    answer: 'Bookkeeper',
    hint: 'a word'
}, {
    id: 34,
    image: '',
    text: 'A man is asked what his daughters look like. He answers, “they are all blondes, but two, all brunettes, but two, and all redheads, but two.” How many daughters does he have?',
    answer: 3,
    hint: 'a number'
}, {
    id: 35,
    image: '',
    text: 'You always find me in the past, I can be created in the present, but the future can never taint me. What am I?',
    answer: 'history',
    hint: 'a word'
}, {
    id: 36,
    image: '',
    text: 'If you multiply me by any other number, the answer will always remain the same. What number am I?',
    answer: 0,
    hint: 'a number'
}, {
    id: 37,
    image: '',
    text: 'If there are three cups of sugar and you take one away, how many do you have?',
    answer: 1,
    hint: 'a number'
}, {
    id: 38,
    image: '',
    text: 'Two hens can lay two eggs in two minutes. If this is the maximum speed possible, what is the total number of hens needed to get 500 eggs in 500 minutes?',
    answer: 2,
    hint: 'a number'
}, {
    id: 39,
    image: '',
    text: 'Paul the Polar Bear had a birthday party and had each guest bringing five fish. A penguin stole two fish but there were still 198 left. How many people came to the party?',
    answer: 40,
    hint: 'a number'
}, {
    id: 40,
    image: '',
    text: 'Ten copycats were sitting on a boat when one jumped out. How many were left?',
    answer: 0,
    hint: 'a number'
}, {
    id: 41,
    image: '',
    text: 'If Tom and his father are put together, they weigh 280 pounds. Tom his dad weighs three times as much as he does. How much pounds does Tom weigh?',
    answer: 70,
    hint: 'a number'
}, {
    id: 42,
    image: '',
    text: 'I am a three-digit number. My tens digit is six more than my ones digit. My hundreds digit is eight less than my tens digit. What number am I?',
    answer: 193,
    hint: 'a number'
}, {
    id: 43,
    image: '',
    text: 'When shipping something, Tom can place ten small boxes or eight large boxes into a carton. A total of 96 boxes were sent in one shipment and the number of small boxes was less than large boxes. How many cartons did he ship?',
    answer: 11,
    hint: 'a number'
}, {
    id: 44,
    image: '',
    text: 'Seven brothers were born two years apart. The youngest brother is seven. How old is the oldest brother?',
    answer: 19,
    hint: 'a number'
}, {
    id: 45,
    image: '',
    text: 'Which letter of the alphabet has the most water?',
    answer: 'c',
    hint: 'a word'
}, {
    id: 46,
    image: '',
    text: 'What is so fragile that saying its name breaks it?',
    answer: 'silence',
    hint: 'a word'
}, {
    id: 47,
    image: '',
    text: 'What type of cheese is made backward?',
    answer: 'edam',
    hint: 'a word'
}, {
    id: 48,
    image: '',
    text: 'When asked how old she was, Suzie replied, “In two years I will be twice as old as I was five years ago.” How old is she?',
    answer: 12,
    hint: 'a number'
}, {
    id: 49,
    image: '',
    text: 'What is it that when you take away the whole, you still have some leftover?',
    answer: 'wholesome',
    hint: 'a word'
}];