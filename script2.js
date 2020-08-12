// images Ironhackers
const marcella = new Image()
marcella.src = './images/Marcella2.png'

const yuka = new Image()
yuka.src = './images/Yuka.png'

const lisette = new Image()
lisette.src = './images/Lisette2.png'

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
jorgClicked.src = './images/jorgclicked.png'

const guidoClicked = new Image()
guidoClicked.src =  './images/guidoclicked.png'

//introduction pictures teachers
const jorgIntro = new Image()
jorgIntro.src = './images/introductionJorg.png'

const guidoIntro = new Image()
guidoIntro.src =  './images/introductionGuido.png'


// //background img
// const backgroundImg = new Image()
// backgroundImg.src = './images/background.jpg'


const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')

class GameBoard {
    constructor() {
        this.width = canvas.width
        this.height = canvas.height
    }

    initialise() {
        window.addEventListener('resize', this.resizeCanvas, false);
        this.resizeCanvas()
        this.startScreen()
        // this.buttonLeave()
        this.askForHelpButton()
    }

    resizeCanvas(){
        canvas.width = window.innerWidth
        canvas.height = window.innerHeight - 100
    }

    startScreen(){
        let startScreen = document.createElement('div')
        startScreen.setAttribute('id', 'start-screen')

        let divBefore = document.getElementsByClassName('game-border-top')[0]
        let parentContainer = document.getElementById('container')
        parentContainer.insertBefore(startScreen, divBefore)

        let nav = document.createElement('nav')
        nav.setAttribute('id', 'nav-bar')
        let parentStartScreen = document.getElementById('start-screen')
        parentStartScreen.appendChild(nav)
        let navTitle = document.createElement('p')
        navTitle.setAttribute('id', 'nav-title')
        navTitle.innerHTML = 'Hit me, Spaghetti, one more time...'
        let parentNav = document.getElementById('nav-bar')
        parentNav.appendChild(navTitle)

        let middlepart = document.createElement('div')
        parentStartScreen.appendChild(middlepart)
        middlepart.setAttribute('id', 'middle-part')
        let titelGame = document.createElement('h1')
        titelGame.innerHTML = 'Hit me, Spaghetti, one more time...'
        let parentMiddlePart= document.getElementById('middle-part')
        parentMiddlePart.appendChild(titelGame)

        let explanationText1 = document.createElement('p')
        let explanationText2 = document.createElement('p')
        let explanationText3 = document.createElement('h3')
        explanationText1.innerHTML = 'In a Breakout Room far far away......six brave students gave up their summer.....and autumn.....to become the next best coding ninjas.' 
        explanationText2.innerHTML = 'Since teaching is like throwing spaghetti and hoping some will stick (read: quote teacher)......all you have to do is to throw as much spaghetti at the students as you can. But BE AWARE.....once in a while the teacher and teacher assistant join the Breakout Room......and as you might guess......hitting them will get you into trouble!!'
        explanationText3.innerHTML = '[You can throw spaghetti by clicking with your mouse]'
       
        parentMiddlePart.appendChild(explanationText1)
        parentMiddlePart.appendChild(explanationText2)
        parentMiddlePart.appendChild(explanationText3)

        let button = document.createElement('button')
        button.innerHTML = 'Join Breakout Room'
        parentMiddlePart.appendChild(button)

        button.addEventListener('click', () => {
            parentMiddlePart.removeChild(titelGame)
            parentMiddlePart.removeChild(explanationText1)
            parentMiddlePart.removeChild(explanationText2)
            parentMiddlePart.removeChild(explanationText3)
            parentMiddlePart.removeChild(button)
            this.breakoutRoomLoading()
        })
    }

    breakoutRoomLoading(){
        let joinBreakoutRoom = document.createElement('h2')
        joinBreakoutRoom.innerHTML = 'Please wait, the hosts will let you in soon.'
        let parentMiddlePart = document.getElementById('middle-part')
        parentMiddlePart.appendChild(joinBreakoutRoom)

        let divImages = document.createElement('div')
        divImages.setAttribute('id', 'div-images')
        parentMiddlePart.appendChild(divImages)

        let host1 = document.createElement('img')
        host1.src = './images/introductionJorg.png'
        let host2 = document.createElement('img')
        host2.src = './images/introductionGuido.png'

        let parentImages = document.getElementById('div-images')
        parentImages.appendChild(host1)
        parentImages.appendChild(host2)


        let fewSecondsMessages = document.createElement('h4')
        fewSecondsMessages.innerHTML = 'It may take a few moments...'
        parentMiddlePart.appendChild( fewSecondsMessages)
 

        function timeout(){
            setTimeout(function(){
                let parentContainer = document.getElementById('container')
                let startScreen = document.getElementById('start-screen')
                parentContainer.removeChild(startScreen)
                game.inBreakOutRoom()
             }, 2000)
        }
        timeout()
    }


    askForHelpButton(){
        let askForHelp =document.getElementById('help-button')
        askForHelp.addEventListener('click', () => {
            alert("Sorry, no help available...don't worry...you can do this!!");
        })
    }

    // buttonLeave(){
    //     let buttonLeave = document.getElementById('leave-button')
    //     buttonLeave.addEventListener('click', () => {
    //         const canvas = document.getElementById('canvas')
    //         this.ctx = canvas.getContext('2d')
    //         game.statusStop = true
    //         this.ctx.clearRect(0, 0, canvas.width, canvas.height)
    //         clearInterval(this.intervalID)
    //         nextGame.start()
    //     })
    // }

}

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
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height)
    }
}

class Counter {
    constructor(){
        this.students = 0
        this.levels = 0
        this.lives = 6
    }

    addLevels() {
        this.students += 1
        if(this.students % 6 === 0) {
            this.levels += 1
            let soundLevelUp = new AddSound('./Sounds/levelup.mp3')
            soundLevelUp.play()

        }
    }

    subtractLives(isStudent){
        if(isStudent) {
            this.lives -= 1
        } else if (!isStudent){
            this.lives -= 2
        } 
        // let soundLivesDown = new AddSound('./Sounds/livesdown.mp3')
        // soundLivesDown.play()
    }

    drawLivesCounter(ctx) {
        ctx.fillStyle = 'white'
        ctx.font = '22px Slackey'
        ctx.fillText(`Lives: ${this.lives}`, 30, 50)
    }

    drawLevelCounter(ctx){
        ctx.fillStyle = 'white'
        ctx.font = '22px Slackey'
        ctx.fillText(`Level: ${this.levels}`, window.innerWidth - 120, 50)
    }
}

class Game {
    constructor(){
        this.gameBoard = new GameBoard()
        this.counterLevels = new Counter()
        this.counterLives = new Counter()

        this.randomIronhackers = []
        this.shuffledIronhackersImgArr
        this.ironhackers = []
        this.randomImg
        this.randomSpeed = 2.5 + (Math.random() * 4) 
        this.randomX 
        this.randomXArr = []
        this.statusStop = false
        this.mySound        
    }

    start() {
        this.gameBoard.initialise()
    }

    inBreakOutRoom(){
        requestAnimationFrame(this.gameLoop.bind(this))
        this.intervalID = window.setInterval(this.addStudent.bind(this), 1000)
    }

    gameLoop(){
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        this.addListeners()

        console.log(this.ironhackers)
        this.ironhackers.forEach(ironhacker => {
            ironhacker.draw(ctx)
            ironhacker.move() 
        })

        this.updateCounters(ctx)
        this.moreSpeedEachLevel()
        this.stop(ctx)

        if (!this.statusStop) {
            requestAnimationFrame(this.gameLoop.bind(this))
        } 
    }

    // clearIronhackersArr (){
    //     for(let i = 0; i < this.ironhackers.length; i ++){
    //         let numberOfTeachers = 0
    //         if(this.newIronhacker.isStudent === false) {
    //             numberOfTeachers += 1
    //         }
    //         console.log(`number of Teachers : ${numberOfTeachers}`)

    //         if(this.ironhackers.length <= 6 + numberOfTeachers){
    //             this.ironhackers[i].draw(ctx)
    //             this.ironhackers[i].move() 
    //         } else {
    //             console.log(`ironhackers length: ${this.ironhackers.length}`)
    //             this.ironhackers.splice(0, this.ironhackers.length)
    //             console.log(`clear arr: ${this.ironhackers.length}`)
    //         }
    //     }
    // }


    shuffleIronhackersImgArray(array) {
        for (let i = array.length -1 ; i >= 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            let temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
        return this.shuffledIronhackersImgArr = array
    }
  
    
    addStudent(){
        this.shuffleIronhackersImgArray(ironhackersImgArray)
        
        for(let i= 0; i < this.shuffledIronhackersImgArr.length; i++) {
            if(!this.randomIronhackers.includes(this.shuffledIronhackersImgArr[i]) && this.randomIronhackers.length < this.shuffledIronhackersImgArr.length) {
                this.randomIronhackers.push(this.shuffledIronhackersImgArr[i])
                this.randomImg = this.shuffledIronhackersImgArr[i]
                break
            } else if(this.randomIronhackers.includes(this.shuffledIronhackersImgArr[i]) && this.randomIronhackers.length < this.shuffledIronhackersImgArr.length) {
                continue
            } else if(this.randomIronhackers.length === this.shuffledIronhackersImgArr.length) {
                this.randomIronhackers.splice(0,this.randomIronhackers.length)
            }
        }
    
  
        this.randomX =  30 + (Math.random() * (window.innerWidth - 310))

        this.newIronhacker = new Ironhacker(this.randomImg, true, this.randomX, 0, this.randomSpeed, 250, 141)

        this.ironhackers.push(this.newIronhacker)  
        this.ironhackersClicked.push(this.newIronhacker)
        this.ironhackersSpeedUp.push(this.newIronhacker)
        this.addTeachers()
    }

    addTeachers(){
        const randomNumber = 0 + Math.floor(Math.random() * 7)
        if(randomNumber === 1) {
            this.shuffleIronhackersImgArray(teachersImgArray)
            this.randomImg = this.shuffledIronhackersImgArr[0]

            // this.randomSpeed = 2 + (Math.random() * 4)
            this.randomX =  230 + (Math.random() * (window.innerWidth - 680))
 
            this.newIronhacker = new Ironhacker(this.randomImg, false, this.randomX, 0, this.randomSpeed, 250, 141)
  
            this.ironhackers.push(this.newIronhacker)        
            this.ironhackersClicked.push(this.newIronhacker)
            this.ironhackersSpeedUp.push(this.newIronhacker)
        } 
    }


    updateCounters(ctx){
        this.counterLevels.drawLevelCounter(ctx)
        this.counterLives.drawLivesCounter(ctx)

        this.ironhackers.forEach((element, index) => {
            if(element.y > window.innerHeight -100) {
                if(element.isStudent === true) {
                    this.counterLevels.addLevels()
                    this.counterLevels.drawLevelCounter(ctx)
                }
                if (element.img.src.indexOf('clicked') <= 0 && element.isStudent === true){
                    this.counterLives.subtractLives(true)
                    this.counterLives.drawLivesCounter(ctx)
                } 
                
                if (element.img.src.indexOf('clicked') >= 0 && element.isStudent === false) {
                    this.counterLives.subtractLives(false)
                    this.counterLives.drawLivesCounter(ctx)
                }
                this.ironhackers.splice(index, 1)
            }
        })
    }

    moreSpeedEachLevel (){
            switch(this.counterLevels.levels) {
                case 1:
                    this.randomSpeed = 3.5 + (Math.random() * 4)
                    break;
                case 2: 
                    this.randomSpeed = 4.5 + (Math.random() * 4)
                    break
                case 3: 
                    this.randomSpeed = 5.5 + (Math.random() * 4)
                    break
                case 4: 
                    this.randomSpeed = 6.5 + (Math.random() * 4)
                    break
                case 5: 
                    this.randomSpeed = 7.5 + (Math.random() * 4)
                    break
                case 6: 
                    this.randomSpeed = 8.5 + (Math.random() * 4)
                    break
            }
    }

    stop(ctx){
        if(this.counterLives.lives === 0) {
            clearInterval(this.intervalID)
            this.statusStop = true
            this.gameOver(ctx)
        } else if (this.counterLevels.levels >= 6 && this.counterLevels.students % 5 === 0) {
            clearInterval(this.intervalID)
            this.statusStop = true
            this.winner(ctx)
        } 
    }

    // gameOver(ctx){
    //     let soundGameOver = new AddSound('./Sounds/gemeover.swf.mp3')
    //     soundGameOver.play()

    //     ctx.clearRect(0,0, window.innerWidth, window.innerHeight)
    //     this.updateLeves(ctx)
    //     // this.updateLives(ctx)
    //     ctx.font = '8vw Slackey'
    
    //     let dashLen = 220
    //     let dashOffset = dashLen
    //     const speed = 10
    //     const txt = "Game Over"
    //     const lineWidth = 3
    //     let txtWidth = ctx.measureText(txt).width + (lineWidth * 8) 
    //     let x = (window.innerWidth / 2) - (txtWidth / 2)
    //     const y = window.innerHeight / 2 - 100
    //     let i = 0
        
    //     ctx.lineWidth = 3
    //     ctx.lineJoin = "miter"
    //     ctx.globalAlpha = 2/3
    //     ctx.strokeStyle = '#ef861f'
    //     ctx.fillStyle = '#ef861f';
       

    //     (function loop() {
    //         ctx.setLineDash([dashLen - dashOffset, dashOffset - speed]) 
    //         dashOffset -= speed                                  
    //         ctx.strokeText(txt[i], x, y)                             

    //         if (dashOffset > 0) requestAnimationFrame(loop)        
    //         else {
    //             ctx.fillText(txt[i], x, y)                               
    //             dashOffset = dashLen                                   
    //             x += ctx.measureText(txt[i++]).width + ctx.lineWidth 
    //             ctx.setTransform(1, 0, 0, 1, 0, 3 * Math.random())        
    //             ctx.rotate(Math.random() * 0.005)                        
    //             if (i < txt.length) requestAnimationFrame(loop)
    //         }
    //         })();
    // }
    
    // winner(ctx){
    //     ctx.clearRect(0,0, window.innerWidth, window.innerHeight)
    //     this.updateLeves(ctx)
    //     // this.updateLives(ctx)
    //     ctx.font = '8vw Slackey'
    
    //     let dashLen = 220
    //     let dashOffset = dashLen
    //     const speed = 10
    //     const txt = "You Rock!"
    //     const lineWidth = 3
    //     let txtWidth = ctx.measureText(txt).width + (lineWidth * 8) 
    //     let x = (window.innerWidth / 2) - (txtWidth / 2)
    //     const y = window.innerHeight / 2 - 100
    //     let i = 0
        
    //     ctx.lineWidth = 3
    //     ctx.lineJoin = "miter"
    //     ctx.globalAlpha = 2/3
    //     ctx.strokeStyle = '#ef861f'
    //     ctx.fillStyle = '#ef861f';
       

    //     (function loop() {
    //         ctx.setLineDash([dashLen - dashOffset, dashOffset - speed]) 
    //         dashOffset -= speed                                  
    //         ctx.strokeText(txt[i], x, y)                             

    //         if (dashOffset > 0) requestAnimationFrame(loop)        
    //         else {
    //             ctx.fillText(txt[i], x, y)                               
    //             dashOffset = dashLen                                   
    //             x += ctx.measureText(txt[i++]).width + ctx.lineWidth 
    //             ctx.setTransform(1, 0, 0, 1, 0, 3 * Math.random())        
    //             ctx.rotate(Math.random() * 0.005)                        
    //             if (i < txt.length) requestAnimationFrame(loop)
    //         }
    //         })();
    // }


    addListeners() {

        const canvasLeft = canvas.offsetLeft + canvas.clientLeft
        const canvasTop = canvas.offsetTop + canvas.clientTop

        canvas.addEventListener('click', function(event) {
            const x = event.pageX - canvasLeft
            const y = event.pageY - canvasTop;

            game.ironhackers.forEach(function(ironhacker) {
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
                            let soundJorg= new AddSound('./Sounds/scream.mp3')
                            soundJorg.play()
                            ironhacker.img = jorgClicked
                            img1secBigAfterClick()
                            break
                        case guido: 

                            let soundGuido = new AddSound('./Sounds/mamamia.mp3')
                            soundGuido.play()
                            ironhacker.img = guidoClicked
                            img1secBigAfterClick()
                            break
                    }

                    function img1secBigAfterClick() {
                        ironhacker.x -= 150
                        ironhacker.width += 300
                        ironhacker.height += 300

                        setTimeout(function(){
                            ironhacker.x += 150
                            ironhacker.width -= 300
                            ironhacker.height -= 300
                         }, 150)
                    } 
                }
            })
        
        })
    }
}

class AddSound {
    constructor(src) {
        this.sound = document.createElement("audio");
        this.sound.src = src;
        this.sound.setAttribute("preload", "auto");
        this.sound.setAttribute("controls", "none");
        this.sound.style.display = "none";
        document.body.appendChild(this.sound);
    

    this.play = function(){
      this.sound.play();
    }
    this.stop = function(){
      this.sound.pause();
    }

    }
  }

const game = new Game()
const nextGame = new Game()

game.start()
// nextGame.start()


