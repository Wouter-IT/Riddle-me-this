//Waits for the DOM to finish loading before running the game
// Get the button elements  and add event listeners to hem
document.addEventListener("DOMContentLoaded", function() {
    let buttons = document.getElementsByTagName("button");

    for (let button of buttons) {
        button.addEventListener("click", function() {
            if (this.getAttribute("data-type") === "username") { //Collects the data-type value of the button that is clicked and checks if it it the confirm button.
                createPlayer();
                startGame();
            } else if (this.getAttribute("data-type") === "forfeit") { // if it's not submit it's one of the game modes, "this" takes the value of the button clicked (and it's data-type) and notifies the user accordingly
                // returnMenu();
            }
            else {
                // nextGame();
            }
        })
    }
    document.getElementById('uname-input').addEventListener("keydown", function(event) {
        if (event.key === "Enter") {
            createPlayer();
            startGame();
        }
    })    
})

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

function startGame() {
    document.getElementById('greeting-area').style.display = 'none';
    document.getElementById('username-input-area').style.display = 'none';
    let revealGame = document.getElementsByClassName('game-area');
    for(let i = 0; i < revealGame.length; i++) {
        revealGame[i].style.display = 'block';
    }
    // moet game & answer area visible maken
    getRiddle();
}
// get riddle moet: new riddle pakken


let riddle = [{
    id: 1,
    image: '',
    text: 'Mr. Taylor has four daughters and each has a brother. In total, how many children does Mr. Taylor have?',
    answer: '5',
    hint: 'a number'
}, {
    id: 2,
    image: '',
    text: 'I possess a halo of water, walls of stone, and a tongue of wood. Long I have stood; what am I?',
    answer: 'castle',
    hint: 'a word'
}, {
    id: 3,
    image: '',
    text: 'What can run but never walk, have a mouth but never talk, have a head that never weeps, and a bed that never sleeps?',
    answer: 'river',
    hint: 'a word'
}, {
    id: 4,
    image: '',
    text: 'What has only two words, but thousands of letters?',
    answer: 'post office',
    hint: 'two words'
}, {
    id: 5,
    image: '',
    text: 'What can fill an entire room without taking up any space?',
    answer: 'light',
    hint: 'a word'
}, {
    id: 6,
    image: '',
    text: 'The first two letters signify a male, the first three letters signify a female, the first four letters signify a great person, while the entire word signifies a great woman.',
    answer: 'heroine',
    hint: 'a word'
}, {
    id: 7,
    image: '',
    text: 'What has ten letters and starts with gas?',
    answer: 'Automobile',
    hint: 'a word'
}, {
    id: 8,
    image: '',
    text: 'People in poverty have this. If you eat this you will die. What is it?',
    answer: 'nothing',
    hint: 'a word'
}, {
    id: 9,
    image: '',
    text: 'What has roots that no one sees and looms much taller than trees? Up it goes but yet it never grows; what is it?',
    answer: 'mountain',
    hint: 'a word'
}, {
    id: 10,
    image: '',
    text: 'What gets wet while drying?',
    answer: 'towel',
    hint: 'a word'
}];


// riddles[] rdl;
// rdl = new riddles[50];

// obj[0] = new riddle(23907,"Dell Laptop");  
// obj[1] = new Product(91240,"HP 630");  
// obj[2] = new Product(29823,"LG OLED TV");  
// obj[3] = new Product(11908,"MI Note Pro Max 9");  
// obj[4] = new Product(43590,"Kingston USB"); 


// const riddle = {
//     image: '',
//     text: '',
//     answer: ''


// }