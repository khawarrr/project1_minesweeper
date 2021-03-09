

/*----- constants -----*/

const icon = {
    
    flag: "url('http://gph.is/1ODUtJB)'",
    bomb: "url('http://gph.is/2vzX29Y')",
}

 /*----- app's state (variables) -----*/

 let grid, winner, revealed;



  /*----- cached element references -----*/


  const gridEl = document.getElementById('grid');

  const msgEl = document.getElementById('msg');

  const resetBtn = document.getElementById('reset');



  /*----- event listeners -----*/
resetBtn.addEventListener('click', init);

gridEl.addEventListener('click', handleClick), addEventListener('contextmenu', flagIt);



/*----- functions -----*/
init();

function init(){
    grid = new Array(100).fill().map(cells => ({mine: false, adjMines: 0, revealed: false, flagged: false, boom: false}));
    // assign bombs to random squares
    // console.log(grid);
    winner = null;
    render();
}

function render() {

    // const bombsArr = Array(bombCount).fill('bomb');

    // // render the grid

    grid.forEach(function (boxVal, boxIdx) {
        boxVal.forEach(function (cellVal, rowIdx){
            const div = document.getElementById(`c${boxIdx}r${rowIdx}`)
        //     document.getElementById(boxIdx).innerHTML = playerIcon[boxVal];
            console.log(div);
        });

    });


    // render the message

    if (winner) {
        msg.textContent = "Wow, look at you!!!"
    }


}


function handleClick(evt) {
    console.log(evt.target);
}


function flagIt() {

}