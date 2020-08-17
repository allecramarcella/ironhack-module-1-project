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
jorgClicked.src = './images/jorgclicked.png'

const guidoClicked = new Image()
guidoClicked.src =  './images/guidoclicked.png'

//introduction pictures teachers
const jorgIntro = new Image()
jorgIntro.src = './images/introductionJorg.png'

const guidoIntro = new Image()
guidoIntro.src =  './images/introductionGuido.png'

// canvas and ctx
const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')

//function reload Breakout Room without starting screen and loading screen
function playAgain(){
    sessionStorage.setItem('reloading',"false");
    window.location.reload(false);
}


// class game board
class GameBoard {
    constructor() {
        this.width = canvas.width
        this.height = canvas.height
        this.statusSelfView = true
        this.statusSound = true
    }

    initialise() {
        window.addEventListener('resize', this.resizeCanvas, false);
        this.resizeCanvas()
        if (sessionStorage.getItem('reloading') === "false") {
            sessionStorage.clear()
            game.inBreakOutRoom()
        } else {
            sessionStorage.clear()
            this.startScreen()
        }
        this.buttonLeave()
        this.askForHelpButton()
        this.reactionsButton()
        this.screenSharingButton()
        this.noVideoButton()
        this.noSoundbutton()
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
        titelGame.innerHTML = 'Hit me, <span>Spaghetti</span>,' + '</br>' + 'one more time...'
        const parentMiddlePart= document.getElementById('middle-part')
        parentMiddlePart.appendChild(titelGame)

        const explanationText = document.createElement('p')      
        const gameMechanicsExpl = document.createElement('p')
        explanationText.innerHTML = 'In a Breakout Room far far away......6 brave students gave up their summer.....and autumn.....to become the next best coding ninjas.' + '</br>' +  '</br>' + 'Since teaching is like throwing spaghetti and hoping some will stick (read: quote teacher)......all you have to do is to throw as much spaghetti at the students as you can. But <i>BE AWARE</i>.....once in a while the teacher and teacher assistant join the Breakout Room......and as you might guess......hitting them will get you into trouble!!'
       
        gameMechanicsExpl.innerHTML = '<span><i>Game mechanics</i></span>' + '</br>' +  '<span>//</span> Make it to the end of level 6 to win <span>//</span>  Click with your mouse to throw spaghetti <span>//</span> ' + '</br>' + '<span>//</span> Student not hit =  1 life lost <span>//</span>  Teacher hit = 2 lives lost <span>//</span> '


        parentMiddlePart.appendChild(explanationText)
        parentMiddlePart.appendChild(gameMechanicsExpl)


        const button = document.createElement('button')
        button.innerHTML = 'Join Breakout Room'
        parentMiddlePart.appendChild(button)

        button.addEventListener('click', () => {
            parentMiddlePart.removeChild(titelGame)
            parentMiddlePart.removeChild(explanationText)
            parentMiddlePart.removeChild(gameMechanicsExpl)
            parentMiddlePart.removeChild(button)
            this.breakoutRoomLoading()
        })
    }

    breakoutRoomLoading(){
        const joinBreakoutRoom = document.createElement('h2')
        joinBreakoutRoom.innerHTML = 'Please wait, the hosts will let you in soon.'
        const parentMiddlePart = document.getElementById('middle-part')
        parentMiddlePart.appendChild(joinBreakoutRoom)

        const divImages = document.createElement('div')
        divImages.setAttribute('id', 'div-images')
        parentMiddlePart.appendChild(divImages)

        const host1 = document.createElement('img')
        host1.src = './images/introductionJorg.png'
        const host2 = document.createElement('img')
        host2.src = './images/introductionGuido.png'

        const parentImages = document.getElementById('div-images')
        parentImages.appendChild(host1)
        parentImages.appendChild(host2)

        const fewSecondsMessages = document.createElement('h4')
        fewSecondsMessages.innerHTML = 'It may take a few moments...'
        parentMiddlePart.appendChild( fewSecondsMessages)
 
        function timeout(){
            setTimeout(function(){
                const parentContainer = document.getElementById('container')
                const startScreen = document.getElementById('start-screen')
                parentContainer.removeChild(startScreen)
                game.inBreakOutRoom()
             }, 2000)
        }
        timeout()
    }

    noSoundbutton(){
        const buttonMute = document.getElementById('sound-icon')
        const textMute = document.getElementById('sound-text')
        buttonMute.addEventListener('click', () => {
            if(this.statusSound === true) {
                soundInBreakoutRoom.stop()
                this.statusSound = false
                buttonMute.src = './icons/mute stop.png'
                textMute.innerHTML = 'Unmute'
            } else {
                soundInBreakoutRoom.play()
                this.statusSound = true
                buttonMute.src = './icons/mute.png'
                textMute.innerHTML = 'Mute'
            }
        })
    }

    selfViewOn(){
        const selfViewDiv = document.createElement('div')
        selfViewDiv.setAttribute('id', 'self-view')
    
        const divBefore = document.getElementsByClassName('game-border-top')[0]
        const parentContainer = document.getElementById('container')
        parentContainer.insertBefore(selfViewDiv, divBefore)
    
        const parentGameRoom= document.getElementById('self-view')
        const playerSelfView = document.createElement('img')
        playerSelfView.setAttribute('id', 'img-player')
        playerSelfView.src = './images/selfViewkopie.png'

        const buttonVideo = document.getElementById('video-icon')
        buttonVideo.src = './icons/stop video.png'

        parentGameRoom.appendChild(playerSelfView)
        return this.statusSelfView = true
    }

    selfviewOff(){
        const parentGameRoom= document.getElementById('self-view')
        const playerImg = document.getElementById('img-player')
        parentGameRoom.removeChild(playerImg)

        const buttonVideo = document.getElementById('video-icon')
        buttonVideo.src = './icons/stop video stop.png'
        return this.statusSelfView = false
    }

    noVideoButton(){
        const buttonStopVideo =document.getElementById('video-icon')
        const textStopVideo = document.getElementById('video-text')
        buttonStopVideo.addEventListener('click', () => {
            if(this.statusSelfView === true) {
                this.selfviewOff()
                textStopVideo.innerHTML = 'Start video'
            } else {
                this.selfViewOn()
                textStopVideo.innerHTML = 'Stop video'
            }
        })
    }

    screenSharingButton(){
        const screenSharing =document.getElementById('screen-sharing-button')
        screenSharing.addEventListener('click', () => {
            alert("Screen sharing denied. No one want to see your screen.....");
        })
    }

    askForHelpButton(){
        const askForHelp =document.getElementById('help-button')
        askForHelp.addEventListener('click', () => {
            alert("Sorry, no help available...but don't worry...you can do this!!");
        })
    }

    reactionsButton(){
        const reactions = document.getElementById('reactions-button')
        reactions.addEventListener('click', () => {
            alert("Thank you for your reaction. You are awesome too ;)!");
        })
    }

    buttonLeave(){
        const buttonLeave = document.getElementById('leave-button')
        buttonLeave.addEventListener('click', () => {
            document.location.reload();
        })
    }
}

//class ironhackers (students or teahcers)
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

//class countes (lives, levels, missed students, hit teachers)
class Counter {
    constructor(){
        this.students = 0
        this.missedStudents = 0
        this.hitTeachers = 0
        this.levels = 0
        this.lives = 6
    }

    addLevels() {
        this.students += 1
        if(this.students % 6 === 0) {
            this.levels += 1
            soundLevelUp.play()
        }
    }

    studentsNotHit(){
        this.missedStudents += 1
    }

    teachersHit(){
        this.hitTeachers += 1
    }

    subtractLives(isStudent){
        if(isStudent === true) {
            this.lives -= 1
        } else if (isStudent === false){
            if(this.lives >= 2){
                this.lives -= 2
            } else if (this.lives === 1) {
                this.lives -= 1
            }
        } 
        soundLiveDown.play()
    }

    drawLivesCounter(ctx) {
        ctx.fillStyle = '#f1a725'
        ctx.font = '22px Slackey'
        ctx.fillText(`Lives: ${this.lives}`, 30, 50)
    }

    drawLevelCounter(ctx){
        ctx.fillStyle = '#54c968'
        ctx.font = '22px Slackey'
        ctx.fillText(`Level: ${this.levels}`, window.innerWidth - 120, 50)
    }
}

//class game
class Game {
    constructor(){
        this.gameBoard = new GameBoard()
        this.counterLevels = new Counter()
        this.counterLives = new Counter()

        this.randomIronhackers = []
        this.shuffledIronhackersImgArr
        this.ironhackers = []
        this.teachersClicked = []
        this.randomImg
        this.randomSpeed = 3.5 + (Math.random() * 3) 
        this.randomX 
        this.randomXArr = []
        this.statusStop = false
    }

    start() {
        this.gameBoard.initialise()
    }

    inBreakOutRoom(){
        soundInBreakoutRoom.play()
        this.gameBoard.selfViewOn()

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
        const randomNumber = 0 + Math.floor(Math.random() * 7)
        if(randomNumber === 1) {
            this.shuffleIronhackersImgArray(teachersImgArray)
            this.randomImg = this.shuffledIronhackersImgArr[0]

            this.randomX =  230 + (Math.random() * (window.innerWidth - 680))
            this.newIronhacker = new Ironhacker(this.randomImg, false, this.randomX, 0, this.randomSpeed, 250, 141)
            this.ironhackers.push(this.newIronhacker) 
            this.teachersClicked.push(this.newIronhacker)    
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

    updateCounters(ctx){
        this.counterLevels.drawLevelCounter(ctx)
        this.counterLives.drawLivesCounter(ctx)

        this.teachersClicked.forEach((element,index) => {
            if(element.img.src.indexOf('clicked') >= 0 && element.isStudent === false) {
                this.counterLives.subtractLives(false)
                this.counterLives.drawLivesCounter(ctx)
                this.counterLives.teachersHit()
                this.teachersClicked.splice(index, 1)
            }
        })

        this.ironhackers.forEach((element, index) => {
            if(element.y > window.innerHeight -100) {
                if(element.isStudent === true) {
                    this.counterLevels.addLevels()
                    this.counterLevels.drawLevelCounter(ctx)
                }
                if (element.img.src.indexOf('clicked') <= 0 && element.isStudent === true){
                    this.counterLives.subtractLives(true)
                    this.counterLives.drawLivesCounter(ctx)
                    this.counterLives.studentsNotHit()
                } 
                this.ironhackers.splice(index, 1)
            }
        })
    }

    moreSpeedEachLevel (){
            switch(this.counterLevels.levels) {
                case 1:
                    this.randomSpeed = 4.5 + (Math.random() * 3)
                    break;
                case 2: 
                    this.randomSpeed = 5.5 + (Math.random() * 3)
                    break
                case 3: 
                    this.randomSpeed = 6.5 + (Math.random() * 3)
                    break
                case 4: 
                    this.randomSpeed = 7.5 + (Math.random() * 3)
                    break
                case 5: 
                    this.randomSpeed = 8.5 + (Math.random() * 3)
                    break
                case 6: 
                    this.randomSpeed = 9.5 + (Math.random() * 3)
                    break
            }
    }

    stop(ctx){
        if(this.counterLives.lives === 0) {
            clearInterval(this.intervalID)
            this.statusStop = true
            soundInBreakoutRoom.stop()
            soundJorg.stop()
            soundGuido.stop()
            soundLevelUp.stop()
            soundLiveDown.stop()
            if(this.gameBoard.statusSelfView === true){
                this.gameBoard.selfviewOff()
            }
            this.gameOver(ctx)
        } else if (this.counterLevels.levels >= 6 && this.counterLevels.students % 5 === 0) {
            clearInterval(this.intervalID)
            this.statusStop = true
            soundInBreakoutRoom.stop()
            soundJorg.stop()
            soundGuido.stop()
            soundLevelUp.stop()
            soundLiveDown.stop()
            if(this.gameBoard.statusSelfView === true){
                this.gameBoard.selfviewOff()
            }
            this.winner(ctx)
        } 
    }

    gameOver(ctx){
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
        const text = document.createElement('p')
        text.innerHTML = 'Nobody said it was easy...but OH MY SPAGHETTI.....' 
        const missedStudents = document.createElement('h4')
        const hitTeachers = document.createElement('h4')


        if(this.counterLives.missedStudents > 1 && this.counterLives.hitTeachers > 1) {
            missedStudents.innerHTML = `You missed to hit <span>${this.counterLives.missedStudents}</span>  students....`   
            hitTeachers.innerHTML = `...and on top of that, you hit the teachers <span>${this.counterLives.hitTeachers}</span> times`  
        } else if (this.counterLives.missedStudents === 1 && this.counterLives.hitTeachers > 1 ) {
            missedStudents.innerHTML = `You missed to hit <span>${this.counterLives.missedStudents}</span> student....`   
            hitTeachers.innerHTML = `...and on top of that, you hit the teachers <span>${this.counterLives.hitTeachers}</span> times`  
        } else if (this.counterLives.missedStudents > 1 && this.counterLives.hitTeachers === 1 ) {
            missedStudents.innerHTML = `You missed to hit <span>${this.counterLives.missedStudents}</span> students....`   
            hitTeachers.innerHTML = `...and on top of that, you hit <span>${this.counterLives.hitTeachers} </span>of the teachers` 
        } else if (this.counterLives.missedStudents > 0 && this.counterLives.hitTeachers === 0) {
            missedStudents.innerHTML = `You missed to hit <span>${this.counterLives.missedStudents}</span> students....`   
            hitTeachers.innerHTML = `...but well done, <span>no</span> teachers were harmed in this game ;)`
        } else if (this.counterLives.missedStudents === 0 && this.counterLives.hitTeachers >0){
            missedStudents.innerHTML = `Well done hitting  <span>all</span> the students...`
            hitTeachers.innerHTML = `....stop builing the teachers though (<span>${this.counterLives.hitTeachers}</span> times to be precise!)`  
        }
         
        gameOverScreen.appendChild(title)


        function timeout(){
            setTimeout(function(){
                const divScores = document.createElement('div')
                divScores.setAttribute('class', 'div-scores')
                gameOverScreen.appendChild(divScores)

                divScores.appendChild(text)
                divScores.appendChild(missedStudents)
                divScores.appendChild(hitTeachers)

                const divButtons = document.createElement('div')
                divButtons.setAttribute('id', 'div-buttons')
                gameOverScreen.appendChild(divButtons)

                const buttonPlayAgain = document.createElement('button')
                buttonPlayAgain.innerHTML = 'Try again'
                divButtons.appendChild(buttonPlayAgain)

                buttonPlayAgain.addEventListener('click', () => {
                    playAgain()
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
        soundWinner.play()
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
        text.innerHTML = 'I can see somebody knows how to throw some spaghetti ;) ;) ..... ' 
        const text3 = document.createElement('h4')
     

        const missedStudents = document.createElement('h4')
        const hitTeachers = document.createElement('h4')

        if(this.counterLives.missedStudents > 0 && this.counterLives.missedStudents <= 1 &&  this.counterLives.hitTeachers > 1 && this.counterLives.hitTeachers <=2) {
            missedStudents.innerHTML = `You missed to hit <span>${this.counterLives.missedStudents}</span> student though....`   
            hitTeachers.innerHTML = `...and on top of that, you hit the teachers <span>${this.counterLives.hitTeachers}</span> times...`  
            text3.innerHTML = '..but hey..who gives a spaghetti...you won!'
        }else if (this.counterLives.missedStudents > 1 && this.counterLives.missedStudents <= 5 &&  this.counterLives.hitTeachers > 1 && this.counterLives.hitTeachers <=2) {
            missedStudents.innerHTML = `You missed to hit <span>${this.counterLives.missedStudents}</span>  students though....`   
            hitTeachers.innerHTML = `...and on top of that, you hit the teachers <span>${this.counterLives.hitTeachers}</span>  times...`  
            text3.innerHTML = '..but hey..who gives a spaghetti...you won!'
        }else if (this.counterLives.missedStudents > 1 && this.counterLives.missedStudents <= 5 &&  this.counterLives.hitTeachers > 0 && this.counterLives.hitTeachers <=1) {
            missedStudents.innerHTML = `You missed to hit <span>${this.counterLives.missedStudents}</span>  students though....`   
            hitTeachers.innerHTML = `...and on top of that, you hit <span>${this.counterLives.hitTeachers}</span>  of the teachers...`  
            text3.innerHTML = '..but hey..who gives a spaghetti...you won!'
        } else if (this.counterLives.missedStudents > 0 && this.counterLives.missedStudents <= 1 && this.counterLives.hitTeachers === 0) {
            missedStudents.innerHTML = `As a true champ, you (only) missed to hit <span>${this.counterLives.missedStudents}</span> student....`   
            hitTeachers.innerHTML = `...and even better, <span>no</span>teachers were harmed in this game ;)`
        } else if (this.counterLives.missedStudents > 1 && this.counterLives.missedStudents <= 5 && this.counterLives.hitTeachers === 0) {
                missedStudents.innerHTML = `As a true champ, you (only) missed to hit <span>${this.counterLives.missedStudents}</span>  students....`   
                hitTeachers.innerHTML = `...and even better, <span>no</span> teachers were harmed in this game ;)`
        } else if (this.counterLives.missedStudents === 0 && this.counterLives.hitTeachers <= 2){
            missedStudents.innerHTML = `Like a real spaghetti royal, you were able to hit <span>all</span> the students...`
            hitTeachers.innerHTML = `....you were a bit annoying to the teachers though (<span>${this.counterLives.hitTeachers}</span>  time(s) to be precise!)`  
        }

    
        winnerScreen.appendChild(title)

        function timeout(){
            setTimeout(function(){
                const divScores = document.createElement('div')
                divScores.setAttribute('class', 'div-scores')
                winnerScreen.appendChild(divScores)

                divScores.appendChild(text)
                divScores.appendChild(missedStudents)
                divScores.appendChild(hitTeachers)
                divScores.appendChild(text3)

                const divButtons = document.createElement('div')
                divButtons.setAttribute('id', 'div-buttons')
                winnerScreen.appendChild(divButtons)
        
                const buttonPlayAgain = document.createElement('button')
                buttonPlayAgain.innerHTML = 'Play again'
                divButtons.appendChild(buttonPlayAgain)
        
                buttonPlayAgain.addEventListener('click', () => {
                    playAgain()
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
                            soundJorg.play()
                            ironhacker.img = jorgClicked
                            img1secBigAfterClick()
                            break
                        case guido: 
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

//class add sounds
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
const nextGame = new Game ()

//sounds
const soundInBreakoutRoom = new AddSound('./Sounds/gameSoundtrack-loop.mp3')
const soundLevelUp = new AddSound('./Sounds/levelup.mp3')
const soundLiveDown = new AddSound('./Sounds/livesdown.mp3')
const soundJorg= new AddSound('./Sounds/oh-no.mp3')
const soundGuido = new AddSound('./Sounds/mamamia.mp3')
const soundGameOver = new AddSound('./Sounds/pac-man-dies.mp3')
const soundWinner = new AddSound('./Sounds/rescued-kings.mp3')


//start game
game.start()



