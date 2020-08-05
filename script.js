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

const jorg = new Image()
jorg.src = './images/Jorg.png'

const guido = new Image()
guido.src = './images/Guido.png'

const ironhackersImgArray = [marcella, yuka, lisette, anna, mahmut, kenouly]


// //background img
// const backgroundImg = new Image()
// backgroundImg.src = './images/background.jpg'


class GameBoard {
    constructor() {
        this.width = canvas.width
        this.height = canvas.heigth
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
      }
    
      setCtx(canvas) {
        this.ctx = canvas.getContext('2d')
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

class Game {
    constructor(){
        this.gameBoard = new GameBoard()
        // this.background = new Background()
        this.randomIronhackers = []
        this.shuffledIronhackersImgArr
        this.ironhackers = []
        this.randomImg
        this.levels = 0
        this.lives = 6
    }

    start() {
        this.gameBoard.initialise()
        // this.addListeners()

        requestAnimationFrame(this.gameLoop.bind(this))

        window.setInterval(this.addIronhacker.bind(this), 2000)
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

        this.livesUpdate(ctx)
        this.levelsUpdate(ctx)

        requestAnimationFrame(this.gameLoop.bind(this))
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
  
    // randomizeIronhackerImg(){
    //     for (let i = 0; i < ironhackersImgArray.length; i++ ){
    //         let randomIronhackImg = ironhackersImgArray[Math.floor(Math.random()*ironhackersImgArray.length)];
            // if(!this.randomIronhackers.includes(randomIronhackImg) && this.randomIronhackers.length < 6) {
            //     this.randomIronhackers.push(randomIronhackImg)
            //     console.log(this.randomIronhackers)
            //     this.randomImg = randomIronhackImg
            //     console.log(this.randomImg)
            //     break
            // } else if(this.randomIronhackers.includes(randomIronhackImg) && this.randomIronhackers.length < 6) {
            //     continue
            // } else if(this.randomIronhackers.length = 6) {
            //     this.randomIronhackers.splice(0,this.randomIronhackers.length)
            // }
    //     }
    // }   

    
    
    addIronhacker(){
        this.shuffleIronhackersImgArray(ironhackersImgArray)
        
        for(let i= 0; i < this.shuffledIronhackersImgArr.length; i++) {
            if(!this.randomIronhackers.includes(this.shuffledIronhackersImgArr[i]) && this.randomIronhackers.length < 6) {
                this.randomIronhackers.push(this.shuffledIronhackersImgArr[i])
                // console.log(this.randomIronhackers)
                this.randomImg = this.shuffledIronhackersImgArr[i]
                // console.log(this.randomImg)
                break
            } else if(this.randomIronhackers.includes(this.shuffledIronhackersImgArr[i]) && this.randomIronhackers.length < 6) {
                continue
            } else if(this.randomIronhackers.length = 6) {
                this.randomIronhackers.splice(0,this.randomIronhackers.length)
            }
        }

        
        const randomSpeed = 1 + (Math.random() * 1)
        const randomX =  30 + (Math.random() * (window.innerWidth - 310))
        this.newIronhacker = new Ironhacker(this.randomImg, true, randomX, 0, randomSpeed, 250, 141)
        
        this.ironhackers.push(this.newIronhacker)  
    }

    // subtractLives(
    //     if(img not clicked) {
    //         this.lives -= 1s
    //     } 

    //     if(teachers clicked){
    //         this.lives -= 2
    //     }
    // )

    // addLevels() {
    //     this.levels += 1
    // }

    livesUpdate(ctx) {
        ctx.fillStyle ='pink'
        ctx.font = '3vw Early_gameboyregular'
        ctx.fillText(`Lives: ${this.lives}`, 30, 50)
    }

    levelsUpdate(ctx){
        ctx.fillStyle ='yellow'
        ctx.font = '3vw Early_gameboyregular'
        ctx.fillText(`Level: ${this.levels}`, window.innerWidth - 280, 50)
    }
    
    addListeners() {
        const canvas = document.getElementById('canvas')
        const canvasLeft = canvas.offsetLeft + canvas.clientLeft
        const canvasTop = canvas.offsetTop + canvas.clientTop
        const context = canvas.getContext('2d')
        const imgOnscreen = []
        this.ironhackers.forEach(element =>{
            imgOnscreen.push(element)
        })
        console.log(imgOnscreen)

        canvas.addEventListener('click', function(event) {
            const x = event.pageX - canvasLeft
            const y = event.pageY - canvasTop;
        
            // Collision detection between clicked offset and element.
            imgOnscreen.forEach(function(ironhacker) {
                console.log('kittie kattie')
                if (y > ironhacker.y && y < ironhacker.y + ironhacker.height 
                    && x > ironhacker.x && x < ironhacker.x + ironhacker.width) {
                    console.log('i have been clicked!!');
                }
            });
        
        }, false);
    }


    // clickFunction(ironhacker){
    //     ironhacker.forEach(ironhacker => {
    //         const imgX = ironhacker.x
    //         const imgY = ironhacker.y
    //         const imgSurface= ironhacker.width * ironhacker.height



    //     })
    // }

   
}

const game = new Game()
game.start()



