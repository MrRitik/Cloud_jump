const home = document.querySelector(".home");
const doodler = document.createElement('div');
const btn = document.getElementById('btn');
let leftSpace = 50
let startPoint = 150
let bottomSpace = startPoint
let isGameOver = false
let platformCount = 5
let platformArray = []
let upTimeId
let downTimeId
let leftTimeId 
let rightTimeId
let isJumping = true
let isGoingLeft = false
let isGoingRight = false
let score = 0
let speed = 4


class Platform{
    constructor(newPlatformBottom){
        this.bottom = newPlatformBottom
        this.left = Math.random() * 520
        this.visual = document.createElement('div')

        const visual = this.visual
        visual.classList.add('platform')
        visual.style.left = this.left + 'px'
        visual.style.bottom = this.bottom + 'px'
        home.appendChild(visual)
       
    }
}

function createDoodle(){
    home.appendChild(doodler)
    doodler.classList.add('doodler')
    leftSpace = platformArray[0].left
    doodler.style.left = leftSpace + 'px'
    doodler.style.bottom = bottomSpace + 'px'
}


function createPlatform(){
    for(let i=0; i< platformCount ; i++){
        let platformgap = 600 / platformCount
        let newPlatformBottom = 100 + i * platformgap
        let newPlatform = new Platform(newPlatformBottom) 
        platformArray.push(newPlatform)
    
    }
}

function movePlatform(){
    if(bottomSpace > 200){
        platformArray.forEach(platform =>{
            platform.bottom -= speed //speed by which the platform falls 
            let visual = platform.visual 
            visual.style.bottom = platform.bottom + 'px'
            
            if(platform.bottom < 10) {
                let firstPlatform = platformArray[0].visual
                firstPlatform.classList.remove('platform')
                platformArray.shift()
                // console.log(platformArray)
                score++
                var newPlatform = new Platform(700)
                platformArray.push(newPlatform)
              }
        })
    }
}

function jump(){
    clearInterval(downTimeId)
    isJumping = true
    upTimeId = setInterval(()=>{
        bottomSpace += 20
        doodler.style.bottom = bottomSpace + 'px'
        if(bottomSpace > startPoint + 200){
            fall()
        }
    },30)
}

function fall(){
    clearInterval(upTimeId)
    isJumping = false
    downTimeId = setInterval(()=>{
        bottomSpace -= 4
        doodler.style.bottom = bottomSpace + 'px'
        if(bottomSpace <= 0){
            gameOver()
        }


        platformArray.forEach(platform => {
            if(
                (bottomSpace >= platform.bottom) &&
                (bottomSpace <= platform.bottom + 15) &&
                ((leftSpace + 60)>= platform.left) &&
                (leftSpace <= (platform.left + 85)) &&
                !isJumping
            ){
        
                startPoint = bottomSpace
                jump()
            }
            
        })  
        
    },30)
}

    function gameOver(){
  
        // alert("game Over")
        isGameOver = true
        while(home.firstChild){
            home.removeChild(home.firstChild)
        }
        home.innerHTML = `YOUR SCORE : ${score}`
        clearInterval(upTimeId)
        clearInterval(downTimeId)
        clearInterval(leftTimeId)
        clearInterval(rightTimeId)

    }

    function control(e){
        if(e.key === "ArrowLeft"){
            moveLeft()
        }else if(e.key === "ArrowRight"){
            moveRight()
        }else if (e.key === "ArrowUp"){
            moveUp()
        }
    }

    function moveLeft(){
        if(isGoingRight){
            clearInterval(rightTimeId)
            isGoingRight = false
        }
        isGoingLeft = true
        leftTimeId = setInterval(()=>{
            if(leftSpace>=0){
                leftSpace -= 5
                doodler.style.left = leftSpace + 'px'
            }else moveRight()
        },30)
    }

    function moveRight(){
        if(isGoingLeft){
            clearInterval(leftTimeId)
            isGoingLeft = false
        }
        isGoingRight = true
        rightTimeId = setInterval(()=>{
            if(leftSpace <= 540){
                 leftSpace += 5
                 doodler.style.left = leftSpace + 'px'
            }else moveLeft()
        },30)
    }

    function playAgain(){
        location.reload()
    }

    function moveUp(){
        isGoingLeft = false
        isGoingRight = false
        clearInterval(rightTimeId)
        clearInterval(leftTimeId)
    }
function gameStart(){
    if (!isGameOver ){
        createPlatform()
        createDoodle()
        setInterval(movePlatform,30)
        jump()
        document.addEventListener('keyup',control)

    }
}

gameStart()
