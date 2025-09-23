// elements or tages set to a variable for easy access..
const btn = document.querySelectorAll('.box');
const result = document.querySelector('#res');
// used to display both result and turns of the player..
const reset = document.querySelector('#reset');
const newgame = document.querySelector('#newgame');
const PlayerX = document.querySelector('#playerX');
const PlayerO = document.querySelector('#playerO');
const draw = document.querySelector('#draw');
// counts the wins of X , O and Draw...
let countX = 0;
let countO = 0;
let countD = 0;
// winning patterns
let win_ptn =[
    [0,1,2],[0,4,8],
    [0,3,6],[1,4,7],
    [2,5,8],[2,4,6],
    [3,4,5],[6,7,8]
]
let turn = true;

// mark X and Y turns
btn.forEach(function(b){
    b.addEventListener('click',function(){
        if(turn){
            b.innerHTML="X";
            turn = false;
            result.innerText="Player O turn";
        }
        else{
            b.innerHTML="O";
            turn = true;
            result.innerText="Player X turn";

        }
        b.disabled=true;
        check_win();
    })
})

// check for the winner..
const check_win = ()=>{
    let isWinner = false;   
    // check winning patterns
    for(let ptn of win_ptn){
        let pos1 = btn[ptn[0]].innerHTML;
        let pos2 = btn[ptn[1]].innerHTML;
        let pos3 = btn[ptn[2]].innerHTML;

        if(pos1 != "" && pos2 != "" && pos3 != ""){
            if(pos1 === pos2 && pos2 === pos3){
                isWinner = true;  //winner found...
                if(pos1 === "X"){
                    countX++;
                } 
                else{
                    countO++;
                }
                display_win(pos1,countX,countO);
                playerTurn.innerText="";
                disable();
                break; // berk's after winner is found...
            }
        }
    }
    // check's for draw 
    if(!isWinner){
        let filled = true;
        for (let b of btn) {
            if (b.innerHTML === "") {
                filled = false;
                break;
            }
        }
        //counts the number of draw
        if(filled){
            countD++;
            draw.innerText = `Draw: ${countD}`;
            result.innerText = "It's a Draw!";
        }
    }
}

// function to disable all the buttons...
function disable(){
    for(let b of btn){
        b.disabled = true;
    }
}

// display winner and score...
function display_win(winner,countX,countO){
    result.innerText = `Player '${winner}' WON !!`
    PlayerX.innerText = `Player X: ${countX}`
    PlayerO.innerText = `Player O: ${countO}`
}

//resets the tic-tac-toe chart to continue the game.....
reset.addEventListener('click',function(){
    turn = true;
    btn.forEach((bn)=>{
        bn.disabled = false;
        bn.innerText = "";
    })
    result.innerText = "Player X turn";

})

// this will restart the game from 0 points....
newgame.addEventListener('click',function(){
    turn = true;
    btn.forEach((bn)=>{
        bn.disabled = false;
        bn.innerText = "";
    })
    // updates the result and the counts of the player to 0...
    result.innerText = "Player X turn";
    countX = 0;
    countO = 0;
    countD = 0;
    PlayerX.innerText = `Player X: ${countX}`;
    PlayerO.innerText = `Player O: ${countO}`;
    draw.innerText = `draw: ${countD}`;
})