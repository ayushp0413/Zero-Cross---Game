const newBtn = document.querySelector(".btn");
const boxes = document.querySelectorAll(".box");
const gameInfo = document.querySelector(".game-info");

let currentPlayer;
let gridGame; // it is an array to store each value of grid

winningPositions = [

    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]


function initGame()
{
    currentPlayer = "X";
    gridGame=["","","","","","","","",""];
    newBtn.classList.remove("active");
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
    // UI to reset
    boxes.forEach((box,index)=>{
        box.innerText = "";
        boxes[index].style.pointerEvents = "all";
        // color green ko remove kro :  ek kaaam kro boxes wali div ki saari poperties ko default krdo
        box.classList = `box box${index+1}`; 
    });

}
initGame();

function toogleCurrentPlayer()
{
    if(currentPlayer=="X") currentPlayer = "0";
    else currentPlayer = "X";

}

function checkGameOver() {

    let answer="";

    // loop on winningPosition array and check it

    winningPositions.forEach((position)=>{

        // if it is non-empty and all three values are same then its our answer
        if( (gridGame[position[0]] !==""  || gridGame[position[1]]!=="" || gridGame
            [position[2]]!=="") && (gridGame[position[0]]===gridGame[position[1]]) && (gridGame[position[1]]===gridGame[position[2]]) )
        {
            // yes there is a winner
            if(gridGame[position[0]] === "X") answer = "X";
            else answer = "0";


            // disable all pointer 
            boxes.forEach(box => {
                box.style.pointerEvents = "none";
            })



            // we got our answer
            // 
            // add green color
            boxes[position[0]].classList.add("win");
            boxes[position[1]].classList.add("win");
            boxes[position[2]].classList.add("win");
            
        }
    });

    if(answer !== "")
    {
        gameInfo.innerText = `Winner ${answer}`;
        newBtn.classList.add("active");
        return ;
    }
    // ab TIE wala case handle krlo
    // kya saare boxes fill ho gaye hai or answer abhi bhi empty hai ?

    let fillCount = 0;
    gridGame.forEach((box)=> {
        if(box !== "") fillCount++;
    });

    if(fillCount === 9) 
    {
        gameInfo.innerText = "Game Tied !";
        newBtn.classList.add("active");
    }
}

function handleClick(index) {

    if(gridGame[index]==="")  // to bhaiya chlo apni chaaal
    {
        boxes[index].innerText = `${currentPlayer}`;
        boxes[index].style.pointerEvents = "none";
        // update array and marked it clicked  -- hence it will not "" 
        gridGame[index]=`${currentPlayer}`;
        toogleCurrentPlayer();
        gameInfo.innerText = `Current Player - ${currentPlayer}`;
        checkGameOver();
    }

    else {
        return;
    }
}   

boxes.forEach((box,index)=>{

    box.addEventListener("click",()=> {
        handleClick(index);
    })

});


newBtn.addEventListener("click",()=>{
    initGame(); // it will only update Current Player - x but not grid on UI to vo init me likh diya hai
})