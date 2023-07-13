//Waits for the DOM to finish loading before running the game
// Get the button elements  and add event listeners to hem
document.addEventListener("DOMContentLoaded", function() {
    let buttons = document.getElementsByTagName("button");

    for (let button of buttons) {
        button.addEventListener("click", function() {
            if (this.getAttribute("data-type") === "username") { //Collects the data-type value of the button that is clicked and checks if it it the confirm button.
                createPlayer();
                runGame();
            } else if (this.getAttribute("data-type") === "forfeit") { // if it's not submit it's one of the game modes, "this" takes the value of the button clicked (and it's data-type) and notifies the user accordingly
                // returnMenu();
            }
            else {
                // nextGame();
            }
        })
    }
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

function runGame() {
    document.getElementById('greeting-area').style.display = 'none';
    document.getElementById('username-input-area').style.display = 'none';
}
