// images Ironhackers
const marcella = new Image()
marcella.src = './images/marcella.png'

const yuka = new Image()
yuka.src = './images/yuka.png'

const lisette = new Image()
lisette.src = './images/lisette.png'

const anna = new Image()
anna.src = './images/anna.png'

const mahmut = new Image()
mahmut.src = './images/mahmut.png'

const kenouly = new Image()
kenouly.src = './images/kenouly.png'

const ironhackersImgArray = [marcella, yuka, lisette, anna, mahmut, kenouly]

// images teachers
const jorg = new Image()
jorg.src = './images/jorg.png'

const guido = new Image()
guido.src = './images/guido.png'

const teachersImgArray = [guido, jorg]


// clicked Images ironhackers
const mahmutClicked = new Image()
mahmutClicked.src = './images/mahmutclicked.png'

const annaClicked = new Image()
annaClicked.src = './images/annaclicked.png'

const kenoulyClicked = new Image()
kenoulyClicked.src = './images/kenoulyclicked.png'

const marcellaClicked = new Image()
marcellaClicked.src = './images/marcellaclicked.png'

const lisetteClicked = new Image()
lisetteClicked.src = './images/lisetteclicked.png'

const yukaClicked = new Image()
yukaClicked.src = './images/yukaclicked.png'

// clicked Images teachers
const jorgClicked = new Image()
jorgClicked.src = './images/guidoclicked.png'

const guidoClicked = new Image()
guidoClicked.src =  './images/guidoclicked.png'

//introduction pictures teachers
const jorgIntro = new Image()
jorgIntro.src = './images/introductionJorg.png'

const guidoIntro = new Image()
guidoIntro.src =  './images/introductionGuido.png'

// sounds



// canvas and ctx
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
        this.buttonLeave()
        this.askForHelpButton()
    }

    initialiseTryAgain() {
        window.addEventListener('resize', this.resizeCanvas, false);
        this.resizeCanvas()
        this.buttonLeave()
        this.askForHelpButton()
    }


    resizeCanvas(){
        canvas.width = window.innerWidth
        canvas.height = window.innerHeight - 100
    }

    startScreen(){
        const startScreen = document.createElement('div')
        startScreen.setAttribute('id', 'start-screen')

        const divBefore = document.getElementsByClassName('game-border-top')[0]
        const parentContainer = document.getElementById('container')
        parentContainer.insertBefore(startScreen, divBefore)


        const parentStartScreen = document.getElementById('start-screen')
        const middlepart = document.createElement('div')
        parentStartScreen.appendChild(middlepart)
        middlepart.setAttribute('id', 'middle-part')
        const titelGame = document.createElement('h1')
        titelGame.innerHTML = 'Hit me, Spaghetti, one more time...'
        const parentMiddlePart= document.getElementById('middle-part')
        parentMiddlePart.appendChild(titelGame)

        const explanationText1 = document.createElement('p')
        const explanationText2 = document.createElement('p')
        const explanationText3 = document.createElement('h3')
        explanationText1.innerHTML = 'In a Breakout Room far far away......six brave students gave up their summer.....and autumn.....to become the next best coding ninjas.' 
        explanationText2.innerHTML = 'Since teaching is like throwing spaghetti and hoping some will stick (read: quote teacher)......all you have to do is to throw as much spaghetti at the students as you can. But BE AWARE.....once in a while the teacher and teacher assistant join the Breakout Room......and as you might guess......hitting them will get you into trouble!!'
        explanationText3.innerHTML = '[You can throw spaghetti by clicking with your mouse]'
       
        parentMiddlePart.appendChild(explanationText1)
        parentMiddlePart.appendChild(explanationText2)
        parentMiddlePart.appendChild(explanationText3)

        const button = document.createElement('button')
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

    buttonLeave(){
        let buttonLeave = document.getElementById('leave-button')
        buttonLeave.addEventListener('click', () => {
            document.location.reload();
        })
    }

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
        if(isStudent === true) {
            this.lives -= 1
        } else if (isStudent === false){
            if(this.lives >= 2){
                this.lives -= 2
            } else {
                this.lives -= 1
            }
        } 
        // let soundLivesDown = new AddSound('./Sounds/livesdown.mp3')
        // soundLivesDown.play()
    }

    drawLivesCounter(ctx) {
        ctx.fillStyle = '#f1a725'
        ctx.font = '22px Slackey'
        ctx.fillText(`Lives: ${this.lives}`, 30, 50)
    }

    drawLevelCounter(ctx){
        ctx.fillStyle = '#f1a725'
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
        this.called     
    }

    start() {
        this.gameBoard.initialise()
    }

    inBreakOutRoom(){
        soundInBreakoutRoom.play()
        requestAnimationFrame(this.gameLoop.bind(this))
        this.intervalID = window.setInterval(this.addStudent.bind(this), 1000)
    }

    gameLoop(){
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        this.addListeners()

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
        const randomNumber = 0 + Math.floor(Math.random() * 10)
        if(randomNumber === 1) {
            this.shuffleIronhackersImgArray(teachersImgArray)
            this.randomImg = this.shuffledIronhackersImgArr[0]

            this.randomX =  230 + (Math.random() * (window.innerWidth - 680))
            this.newIronhacker = new Ironhacker(this.randomImg, false, this.randomX, 0, this.randomSpeed, 250, 141)
            this.ironhackers.push(this.newIronhacker)     
        } else {
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
        }
        
    }

    // addTeachers(called){
    //     this.called = called
    //     const randomNumber = 0 + Math.floor(Math.random() * 7)
    //     if(randomNumber === 1) {
    //         this.shuffleIronhackersImgArray(teachersImgArray)
    //         this.randomImg = this.shuffledIronhackersImgArr[0]

    //         this.randomX =  230 + (Math.random() * (window.innerWidth - 680))
    //         this.newIronhacker = new Ironhacker(this.randomImg, false, this.randomX, 0, this.randomSpeed, 250, 141)
    //         this.ironhackers.push(this.newIronhacker)     

    //         return  this.called === true   
    //     } 
    // }


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
            soundInBreakoutRoom.stop()
            this.gameOver(ctx)
        } else if (this.counterLevels.levels >= 2 && this.counterLevels.students % 5 === 0) {
            clearInterval(this.intervalID)
            this.statusStop = true
            this.winner(ctx)
        } 
    }

    gameOver(ctx){
        const soundGameOver = new AddSound('./Sounds/gemeover.swf.mp3')
        soundGameOver.play()

        ctx.clearRect(0,0, window.innerWidth, window.innerHeight)
        this.updateCounters(ctx)

        const gameOverScreen = document.createElement('div')
        gameOverScreen.setAttribute('id', 'gameOver-screen')

        const divBefore = document.getElementsByClassName('game-border-top')[0]
        const parentContainer = document.getElementById('container')
        parentContainer.insertBefore(gameOverScreen, divBefore)

        const title = document.createElement('h2')
        title.innerHTML = 'Game Over' 
       
        gameOverScreen.appendChild(title)


        function timeout(){
            setTimeout(function(){
                const divButtons = document.createElement('div')
                divButtons.setAttribute('id', 'div-buttons')
                gameOverScreen.appendChild(divButtons)

                const buttonPlayAgain = document.createElement('button')
                buttonPlayAgain.innerHTML = 'Try again'
                divButtons.appendChild(buttonPlayAgain)

                buttonPlayAgain.addEventListener('click', () => {
                    document.location.reload();
                    // this.gameBoard.initialiseTryAgain()
                    this.inBreakOutRoom()
                })

                const buttonQuite = document.createElement('button')
                buttonQuite.innerHTML = 'Quite game'
                divButtons.appendChild(buttonQuite)

                buttonQuite.addEventListener('click', () => {
                    document.location.reload();
                })
             }, 2000)
        }
        timeout()

    }
    
    winner(ctx){
        ctx.clearRect(0,0, window.innerWidth, window.innerHeight)
        this.updateCounters(ctx)

        const winnerScreen  = document.createElement('div')
        winnerScreen.setAttribute('id', 'winner-screen')

        const divBefore = document.getElementsByClassName('game-border-top')[0]
        const parentContainer = document.getElementById('container')
        parentContainer.insertBefore(winnerScreen, divBefore)

        const title = document.createElement('h2')
        title.innerHTML = 'You rock!' 
        const text = document.createElement('p')
        text.innerHTML = 'Thank you for making us even smarter!' 
       
        winnerScreen.appendChild(title)
    
        function timeout(){
            setTimeout(function(){
                winnerScreen.appendChild(text)
                const divButtons = document.createElement('div')
                divButtons.setAttribute('id', 'div-buttons')
                winnerScreen.appendChild(divButtons)
        
                const buttonPlayAgain = document.createElement('button')
                buttonPlayAgain.innerHTML = 'Play again'
                divButtons.appendChild(buttonPlayAgain)
        
                buttonPlayAgain.addEventListener('click', () => {
                    document.location.reload();
                    // this.gameBoard.initialiseTryAgain()
                    this.inBreakOutRoom()
                })
        
                const buttonQuite = document.createElement('button')
                buttonQuite.innerHTML = 'Quite game'
                divButtons.appendChild(buttonQuite)
        
                buttonQuite.addEventListener('click', () => {
                    document.location.reload();
                })
             }, 2000)
        }
        timeout()
    }


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
const soundInBreakoutRoom = new AddSound('./Sounds/title.mp3')

game.start()
// nextGame.start()


