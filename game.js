var playArea = document.getElementsByClassName('playArea')[0]
function createGrid(rows, cols)
{
    for(var r = 0 ; r < rows; r++)
    {
        for(var c = 0 ; c < cols  ; c++)
        {
            var dot = document.createElement('div')
            dot.className = 'dot'
            dot.style.bottom = (40 * r).toString() + "px"   //ycoordinate
            dot.style.left = (40 * c).toString() + "px"     //xcoordinate
            playArea.appendChild(dot)

            var horizontalLine = document.createElement('div')
            horizontalLine.className = "h line unclicked"
            horizontalLine.setAttribute("id",(2*c+1).toString() + ',' + (2*r).toString())
            horizontalLine.style.bottom = (40 * r).toString() + "px"   //ycoordinate
            horizontalLine.style.left = (40 * c).toString() + "px"     //xcoordinate
            playArea.appendChild(horizontalLine)
    
            var verticalLine = document.createElement('div')
            verticalLine.className = "v line unclicked"
            verticalLine.setAttribute("id",(2*c).toString() + ',' + (2*r + 1).toString())
            verticalLine.style.bottom = (40 * r).toString() + "px"      //ycoordinate
            verticalLine.style.left = (40 * c).toString() + "px"        //xcoordinate
            playArea.appendChild(verticalLine)
        }   
    }
    for(let i = 0; i<cols;i++){
        var dot = document.createElement('div')
        dot.className = 'dot'
        dot.style.bottom = (40 * r).toString() + "px"   //ycoordinate
        dot.style.left = (40 * i).toString() + "px"     //xcoordinate
        playArea.appendChild(dot)

        var horizontalLine = document.createElement('div')
        horizontalLine.className = "h line unclicked"
        horizontalLine.setAttribute("id",(2*i+1).toString() + ',' + (2*r).toString() )
        horizontalLine.style.bottom = (40 * r).toString() + "px"   //ycoordinate
        horizontalLine.style.left = (40 * i).toString() + "px"     //xcoordinate
        playArea.appendChild(horizontalLine)
    }
    for(let i = 0; i<rows;i++){
        var dot = document.createElement('div')
        dot.className = 'dot'
        dot.style.bottom = (40 * i).toString() + "px"   //ycoordinate
        dot.style.left = (40 * c).toString() + "px"     //xcoordinate
        playArea.appendChild(dot)

        var verticalLine = document.createElement('div')
        verticalLine.className = "v line unclicked"
        verticalLine.setAttribute("id",(2*c).toString() + ',' + (2*i + 1).toString() )
        verticalLine.style.bottom = (40 * i).toString() + "px"      //ycoordinate
        verticalLine.style.left = (40 * c).toString() + "px"        //xcoordinate
        playArea.appendChild(verticalLine)
    }   
    var dot = document.createElement('div')
    dot.className = 'dot'
    dot.style.bottom = (40 * rows).toString() + "px"   //ycoordinate
    dot.style.left = (40 * cols).toString() + "px"     //xcoordinate
    playArea.appendChild(dot) 
}
function makePlayerQueue(playerQueue, num = 2)
{
    for(let pindex = 0; pindex<playerQueue.length; pindex++){
    if(pindex === playerQueue.length - 1)
    playerQueue[pindex].next = playerQueue[0]
    else
    playerQueue[pindex].next = playerQueue[pindex + 1]
}
}
function checkcoSquares(line, completesSquare){
    var cood = line.getAttribute('id').split(",");
    cood[0]=parseInt(cood[0])
    cood[1]=parseInt(cood[1])
    var cosSquares
    if(cood[0]%2!==0)        //horizontal line
    {   if(cood[1] > 0 && cood[1] < 2 * rows)
        cosSquares = [[cood[0],cood[1]+1],[cood[0],cood[1]-1]]
        else if(cood[1] === 0)
        cosSquares = [[cood[0],cood[1]+1]]
        else if(cood[1] === 2*rows)
        cosSquares = [[cood[0],cood[1]-1]]
    }else{
        if(cood[0] > 0 && cood[0] < 2*cols)
        cosSquares = [[cood[0]+1,cood[1]],[cood[0]-1,cood[1]]]      //vertical line   
        else if(cood[0] === 0)
        cosSquares = [[cood[0]+1,cood[1]]] 
        else if(cood[0] === 2*cols)
        cosSquares = [[cood[0]-1,cood[1]]] 
    }
    //console.log(cosSquares);
    cosSquares.forEach(square => {
        checkcoLines(square, completesSquare)        
    })
}
function checkcoLines(square){
    let coLines = [[square[0],square[1]+1],[square[0],square[1]-1],[square[0]+1,square[1]],[square[0]-1,square[1]]]
    //console.log(coLines)
    let check = true
    coLines.forEach(line =>{
        let lineid = line[0] + ',' + line[1]
        check = check && document.getElementById(lineid.toString()).classList.contains('clicked')
        })
    //console.log(check);
    if(check){
        completesSquare = true;
        total--
        currPlayer.count++
        drawSquare(square)
    }
    //currPlayer = currPlayer.next
}
function drawSquare(square){
    let sq = document.createElement('div')
    sq.className = 'square'
    sq.style.backgroundColor = currPlayer.color
    sq.style.left = (20 * square[0]).toString() + "px"     //xcoordinate
    sq.style.bottom = (20 * square[1]).toString() + "px"   //ycoordinate
    playArea.appendChild(sq)    
}
var rows = 12
var cols = 30
createGrid(rows,cols);
let num = parseInt(prompt('Enter number of players <6:'))
var playerQueue=[]
let colors = ["red", "blue", "green", "orange", "pink", "purple"]
for(let i=0;i<num;i++){
    playerQueue.push({color: colors[i], count: 0})
}
let currPlayer = playerQueue[0]
makePlayerQueue(playerQueue)
let total = rows * cols
let completesSquare = false
var lines = document.querySelectorAll('.line.unclicked')

//console.log(lines);
document.getElementById('ref-box').style.backgroundColor = currPlayer.color
lines.forEach(line => {
    line.addEventListener('click', (e) => {
        console.log(currPlayer.color);
        line.classList.add('clicked')
        line.classList.remove('unclicked')
        line.style.backgroundColor = currPlayer.color
        //line.setAttribute('clicked', 'true')
        //console.log(line.getAttribute('id'));
        //console.log(line.className);
        checkcoSquares(line, completesSquare)
        //currPlayer = currPlayer.next
        console.log(completesSquare);
        if(!completesSquare){
        currPlayer = currPlayer.next
        document.getElementById('ref-box').style.backgroundColor = currPlayer.color
    }
    else{
            completesSquare = false
        }
        console.log(total)
        if(total === 0){
            let winner = playerQueue[0]
            for(let i=1;i<playerQueue.length;i++){
                if(playerQueue[i].count > winner.count)
                winner = playerQueue[i]
            }
            console.log(winner.color)
            document.getElementById('ref-text').innerHTML = 'Winner! :'
            document.getElementById('ref-box').style.backgroundColor = winner.color
        }
    })
    })

//while(game.length(no. of lines))
