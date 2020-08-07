// images Ironhackers
const marcella = new Image()
marcella.src = './images/Marcella.png'

const yuka = new Image()
yuka.src = './images/Yuka.png'

const lisette = new Image()
lisette.src = './images/Lisette.png'

const anna = new Image()
anna.src = './images/Anna.png'

const mahmut = new Image()
mahmut.src = './images/Mahmut.png'

const kenouly = new Image()
kenouly.src = './images/Kenouly.png'

const ironhackersImgArray = [marcella, yuka, lisette, anna, mahmut, kenouly]

// images teachers
const jorg = new Image()
jorg.src = './images/Jorg.png'

const guido = new Image()
guido.src = './images/Guido.png'

const teachersImgArray = [guido, jorg]


// clicked Images ironhackers
const mahmutClicked = new Image()
mahmutClicked.src = './images/Mahmut clicked.png'

const annaClicked = new Image()
annaClicked.src = './images/anna clicked.png'

const kenoulyClicked = new Image()
kenoulyClicked.src = './images/kenouly clicked.png'

const marcellaClicked = new Image()
marcellaClicked.src = './images/marcella clicked.png'

const lisetteClicked = new Image()
lisetteClicked.src = './images/Lisette clicked.png'

const yukaClicked = new Image()
yukaClicked.src = './images/yuka clicked.png'

// clicked Images teachers
const jorgClicked = new Image()
jorgClicked.src = './images/jorg clicked.png'

// const guidoClicked = new Image()
// guidoClicked.src = 

// //background img
// const backgroundImg = new Image()
// backgroundImg.src = './images/background.jpg'


class GameBoard {
    constructor() {
        this.width = canvas.width
        this.height = canvas.height
        this.x = (window.innerWidth / 2) - (window.innerWidth / 3)
        this.y = ((window.innerHeight - 100) / 2 ) - (window.innerHeight / 3)
        this.ctx
        this.startScreenWidth = window.innerWidth / 2 + (window.innerWidth / 6)
        this.startScreenHeight = ((window.innerHeight - 100) / 2) + ((window.innerHeight -100) / 6)

        
    }

    resizeCanvas(){
        canvas.width = window.innerWidth
        canvas.height = window.innerHeight - 100
    }

    initialise() {
        const canvas = document.getElementById('canvas')


        window.addEventListener('resize', this.resizeCanvas, false);
        this.setCtx(canvas)
        this.resizeCanvas()
        this.drawTitle()
        this.drawLongText()
    }
    
    setCtx(canvas) {
        this.ctx = canvas.getContext('2d')
    }

    drawTitle(ctx){
        const maxWidth = this.startScreenWidth - 100
        let lineHeight = 50
        
        let title = 'Hit me, spaghetti, one more time...'              

        this.ctx.beginPath()
        this.ctx.strokeStyle ='white'
        this.ctx.strokeRect(this.x, this.y, this.startScreenWidth, this.startScreenHeight)

        this.ctx.font = '3vw Early_gameboyregular'
        this.ctx.fillStyle = "pink"

        this.wrapText(ctx, title, this.x + 50, this.y + 80, maxWidth, lineHeight);
    
        
    }

    wrapText(ctx, text, x, y, maxWidth, lineHeight) {
        this.ctx = canvas.getContext('2d')
        let cars = text.split("\n");

        for (let ii = 0; ii < cars.length; ii++) {

            let line = "";
            let words = cars[ii].split(" ");

            for (let n = 0; n < words.length; n++) {
                let testLine = line + words[n] + " ";
                let metrics = this.ctx.measureText(testLine);
                let testWidth = metrics.width;

                if (testWidth > maxWidth) {
                    this.ctx.fillText(line, x, y);
                    line = words[n] + " ";
                    y += lineHeight;
                }
                else {
                    line = testLine;
                }
            }

            this.ctx.fillText(line, x, y);
            y += lineHeight;
        }
     }

     drawLongText(ctx) {
        const maxWidth = this.startScreenWidth - 100
        const lineHeight = 50;
        
        const text = 'In a Breakout Room far far away...six brave students gave up there summer (and Autom) to be come the next best coding ninja'              

        // this.ctx.beginPath()
        // this.ctx.strokeStyle ='white'
        // this.ctx.strokeRect(this.x, this.y, this.startScreenWidth, this.startScreenHeight)

        this.ctx.font = '2vw Early_gameboyregular'
        this.ctx.fillStyle = "pink"

        this.wrapText(ctx, text, this.x + 50, this.y + 230, maxWidth, lineHeight);
    }
     
}

// class Background {
//     constructor(img, x, y, speed, width, height){
//         this.img = img
//         this.x = x
//         this.y = y
//         this.speed = speed
//         this.width = width
//         this.height = height
//     }

//     moveBackground(){
//         this.y += this.speed
//         this.y %= window.innerHeight
//     }

//     drawBackground(ctx){
//         ctx.drawImage(this.img, 0, this.y)
//         if(this.speed < 0) {
//             ctx.drawImage(this.img, 0 , this.y + this.img.height)
//         } else {
//             ctx.drawImage(this.img, 0, this.y - window.innerHeight)
//         }
//     }
// }

class Ironhacker {
    constructor(img, isStudent, x, y, speed, width, height){
        this.img = img
        this.isStudent = isStudent
        this.x = x
        this.y = y
        this.speed = speed
        this.width = width 
        this.height = height
    }

    move(){
        this.y += this.speed
    }

    draw(ctx){
        let x = this.x
        let y = this.y
        let width = this.width
        let height = this.height
        let img = this.img 
        ctx.drawImage(img, x, y, width, height)
    }
}

class Counter {
    constructor(){
        this.students =0
        this.levels = 0
        this.lives = 6
    }

    addLevels() {
        this.students += 1
        if(this.students % 6 === 0) {
            this.levels += 1
        }
    }

    subtractLives(isStudent){
        if(isStudent === true) {
            this.lives -= 1
        } else {
            this.lives -= 2
        } 
    }

    drawLivesCounter(ctx) {
        ctx.fillStyle = 'pink'
        ctx.font = '22px Early_gameboyregular'
        ctx.fillText(`Lives: ${this.lives}`, 30, 50)
    }

    drawLevelCounter(ctx){
        ctx.fillStyle = 'yellow'
        ctx.font = '22px Early_gameboyregular'
        ctx.fillText(`Level: ${this.levels}`, window.innerWidth - 200, 50)
    }
}

class Game {
    constructor(){
        this.gameBoard = new GameBoard()
        this.counterLevels = new Counter()
        this.counterLives = new Counter()
        // this.background = new Background()
        this.randomIronhackers = []
        this.shuffledIronhackersImgArr
        this.ironhackers = []
        this.ironhackersClicked = []
        this.randomTeacherImg
        this.randomImg
        this.randomSpeed
        this.randomX 
        this.statusStop = false
    }

    start() {
        this.gameBoard.initialise()

        // requestAnimationFrame(this.gameLoop.bind(this))
        // this.intervalID = window.setInterval(this.addIronhacker.bind(this), 2500)
    }

    gameLoop(){
        const ctx = this.gameBoard.ctx
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        this.addListeners()

        // this.background.moveBackground()
        // this.background.drawBackground(backgroundImg, 0, 0, -1, window.innerWidth, window.innerHeight)

        this.ironhackers.forEach(ironhacker => {
            ironhacker.draw(ctx)
            ironhacker.move() 
        })

        this.updateLeves(ctx)
        this.updateLives(ctx)
        this.moreSpeedEachLevel()
        this.stop(ctx)

        if (!this.statusStop) {
            requestAnimationFrame(this.gameLoop.bind(this))
        }
    }

    shuffleIronhackersImgArray(array) {
        for (let i = array.length -1 ; i >= 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            let temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
        return this.shuffledIronhackersImgArr = array
    }
  
    
    addIronhacker(){
        this.shuffleIronhackersImgArray(ironhackersImgArray)
        
        for(let i= 0; i < this.shuffledIronhackersImgArr.length; i++) {
            if(!this.randomIronhackers.includes(this.shuffledIronhackersImgArr[i]) && this.randomIronhackers.length < this.shuffledIronhackersImgArr.length) {
                this.randomIronhackers.push(this.shuffledIronhackersImgArr[i])
                // console.log(this.randomIronhackers)
                this.randomImg = this.shuffledIronhackersImgArr[i]
                // console.log(this.randomImg)
                break
            } else if(this.randomIronhackers.includes(this.shuffledIronhackersImgArr[i]) && this.randomIronhackers.length < this.shuffledIronhackersImgArr.length) {
                continue
            } else if(this.randomIronhackers.length === this.shuffledIronhackersImgArr.length) {
                this.randomIronhackers.splice(0,this.randomIronhackers.length)
            }
        }
    
        this.randomSpeed = 1.5 + (Math.random() * 2) 
        this.randomX =  30 + (Math.random() * (window.innerWidth - 310))
        this.newIronhacker = new Ironhacker(this.randomImg, true, this.randomX, 0, this.randomSpeed, 250, 141)
        
        this.ironhackers.push(this.newIronhacker)  
        this.ironhackersClicked.push(this.newIronhacker)
        this.addTeachers()
        
    }

    addTeachers(){
        const randomNumber = 0 + Math.floor(Math.random() * 2)
        if(randomNumber === 1) {

            this.shuffleIronhackersImgArray(teachersImgArray)

            this.randomImg = this.shuffledIronhackersImgArr[0]

            this.randomSpeed = 1 + (Math.random() * 3)
            this.randomX =  30 + (Math.random() * (window.innerWidth - 310))
            this.newIronhacker = new Ironhacker(this.randomImg, false, this.randomX, 0, this.randomSpeed, 250, 141)
        
            this.ironhackers.push(this.newIronhacker)  
            this.ironhackersClicked.push(this.newIronhacker)
        } 
    }


    updateLeves(ctx){
        this.counterLevels.drawLevelCounter(ctx)

        this.ironhackers.forEach((element, index) => {
            if(element.y > window.innerHeight -100) {
                if(element.isStudent === true) {
                    this.counterLevels.addLevels()
                    this.counterLevels.drawLevelCounter(ctx)
                    this.ironhackers.splice(index, 1)
                } 
            }
        })
    }

    updateLives(ctx){
        this.counterLives.drawLivesCounter(ctx)

        const clickedImgOnScreen = []
        this.ironhackersClicked.forEach(element => {
            clickedImgOnScreen.push(element)
        })

        clickedImgOnScreen.forEach((element, index) => {
            if(element.y > window.innerHeight - 100 && element.img.src.indexOf('clicked') <= 0 && element.isStudent === true) {
                this.counterLives.subtractLives(true)
                this.counterLives.drawLivesCounter(ctx)
                this.ironhackersClicked.splice(index, 1)
            } else if (element.y > window.innerHeight - 100 && element.img.src.indexOf('clicked') >= 0 && element.isStudent === false) {
                this.counterLives.subtractLives(false)
                this.counterLives.drawLivesCounter(ctx)
                this.ironhackersClicked.splice(index, 1)
            }
        })
    }
    
    moreSpeedEachLevel (){
        this.ironhackers.forEach(element => {
            switch(this.counterLevels.levels) {
                case 1:
                    this.randomSpeed = 2.5 + (Math.random() * 2)
                    element.speed = this.randomSpeed
                    break;
                case 2: 
                    this.randomSpeed = 3.5 + (Math.random() * 2)
                    element.speed = this.randomSpeed
                    break
                case 3: 
                    this.randomSpeed = 4.5 + (Math.random() * 2)
                    element.speed = this.randomSpeed
                    break
                case 4: 
                    this.randomSpeed = 5.5 + (Math.random() * 2)
                    element.speed = this.randomSpeed
                    break
                case 5: 
                    this.randomSpeed = 6.5 + (Math.random() * 2)
                    element.speed = this.randomSpeed
                    break
                case 6: 
                    this.randomSpeed = 7.5 + (Math.random() * 2)
                    element.speed = this.randomSpeed
                    break
            }
        })
    }

    stop(ctx){
        if(this.counterLives.lives === 0) {
            clearInterval(this.intervalID)
            this.statusStop = true
            this.gameOver(ctx)
        }
    }

    gameOver(ctx){
        ctx.font = '8vw Early_gameboyregular'
       

        let dashLen = 220
        let dashOffset = dashLen
        const speed = 10
        const txt = "Game Over"
        const lineWidth = 3
        let txtWidth = ctx.measureText(txt).width + (lineWidth * 8) 
        let x = (window.innerWidth / 2) - (txtWidth / 2)
        const y = window.innerHeight / 2 - 10
        let i = 0
        
        ctx.lineWidth = 3
        ctx.lineJoin = "miter"
        ctx.globalAlpha = 2/3
        ctx.strokeStyle = 'red'
        ctx.fillStyle = 'rgb(0,255,0)';
       

        (function loop() {
            ctx.setLineDash([dashLen - dashOffset, dashOffset - speed]) 
            dashOffset -= speed                                  
            ctx.strokeText(txt[i], x, y)                             

            if (dashOffset > 0) requestAnimationFrame(loop)        
            else {
                ctx.fillText(txt[i], x, y)                               
                dashOffset = dashLen                                   
                x += ctx.measureText(txt[i++]).width + ctx.lineWidth 
                ctx.setTransform(1, 0, 0, 1, 0, 3 * Math.random())        
                ctx.rotate(Math.random() * 0.005)                        
                if (i < txt.length) requestAnimationFrame(loop)
            }
            })();
    }
    
    addListeners() {
        const canvas = document.getElementById('canvas')
        const canvasLeft = canvas.offsetLeft + canvas.clientLeft
        const canvasTop = canvas.offsetTop + canvas.clientTop
  
        const imgOnscreen = []
        this.ironhackers.forEach(element =>{
            imgOnscreen.push(element)
        })

        canvas.addEventListener('click', function(event) {
            const x = event.pageX - canvasLeft
            const y = event.pageY - canvasTop;
    
            imgOnscreen.forEach(function(ironhacker) {
                if (y > ironhacker.y && y < ironhacker.y + ironhacker.height 
                    && x > ironhacker.x && x < ironhacker.x + ironhacker.width) {
                    
                    switch(ironhacker.img) {
                        case mahmut:
                            ironhacker.img = mahmutClicked
                            break;
                        case yuka: 
                            ironhacker.img = yukaClicked
                            break
                        case marcella: 
                            ironhacker.img = marcellaClicked
                            break
                        case lisette: 
                            ironhacker.img = lisetteClicked
                            break
                        case anna: 
                            ironhacker.img = annaClicked
                            break
                        case kenouly: 
                            ironhacker.img = kenoulyClicked
                            break
                        case jorg: 
                            ironhacker.img = jorgClicked
                            img1secBigAfterClick()
                            break
                        case guido: 
                            ironhacker.img = guidoClicked
                            img1secBigAfterClick()
                            break
                    }

                    function img1secBigAfterClick() {
                        ironhacker.x -= 60
                        ironhacker.width += 120
                        ironhacker.height += 120

                        setTimeout(function(){
                            ironhacker.x += 50
                            ironhacker.width -= 100
                            ironhacker.height -= 100
                         }, 250)
                    } 
                }
            });
        
        }, false);
    }

   
}

const game = new Game()
game.start()



