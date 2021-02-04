//import {Enemy2} from './enemies.js';

const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width=1500;
canvas.height=940;


//global variables
const cellSize = 100
const cellGap = 3
let frame=0
let score=0
let numberOfResources=900
let enemiesInterval=600
let gameOver = false
let winningScore = 5000
let adjust=100
let cellLimiter=3
let activeMenuCell=undefined
let sliderVisible=false
let gamePaused=true
let speedMod=false

const gameGrid = []
const headerGrid = []
const defenders = []
const buildings = []
const enemies= []
const projectiles = []
const enemyPosition = []
const resourses = []
const enemyTypes= ['orc', 'goblin','goblin']
const defendersTypes= ['warrior', 'archer']
const musicArr=["audio/music/Sweet-Armenia.mp3","audio/music/Note.mp3",
"audio/music/mixguerchoeurs.mp3", "audio/music/L-erreur.mp3"]

//sprites
const archer =new Image();
archer.src = 'img/characters/archer2.png'
const warrior =new Image();
warrior.src = 'img/characters/warrior2.png'
const arrow = new Image();
arrow.src='img/PC_HMM_archer2.png'
const goblin =new Image();
goblin.src = 'img/characters/css_sprites2.png'
const ork =new Image();
ork.src = 'img/characters/enemy22.png'
const building =new Image();
building.src = 'img/human-city2.png'
const coin =new Image();
coin.src = 'img/coin_gold.png'
const gold =new Image();
gold.src = 'img/gold.png'
const church =new Image();
church.src = 'img/house.png'
const tree =new Image();
tree.src = 'img/tree_10.png'
const tree2 =new Image();
tree2.src = 'img/tree_11.png'
const tree3 =new Image();
tree3.src = 'img/tree_7.png'
const stone =new Image();
stone.src = 'img/stones_7.png'
const greenery =new Image();
greenery.src = 'img/greenery_10.png'
const delBtn =new Image();
delBtn.src = 'img/delBtn.png'
const musicBtn =new Image();
musicBtn.src = 'img/musicBtn.png'
const mageSprite =new Image();
mageSprite.src = 'img/MageSprites.png'
const popUp =new Image();
popUp.src = 'img/popUp.png'
const popUp2 =new Image();
popUp2.src = 'img/popUp2.png'
const fog1 =new Image();
fog1.src = 'img/fog-1.png'
const fog2 =new Image();
fog2.src = 'img/fog-2.png'
const cloud1 =new Image();
cloud1.src = 'img/clouds/cloud-01.png'
const cloud2 =new Image();
cloud2.src = 'img/clouds/cloud-02.png'
const cloud3 =new Image();
cloud3.src = 'img/clouds/cloud-03.png'
const cloud4 =new Image();
cloud4.src = 'img/clouds/cloud-04.png'

//audio
var bowSound = new Audio();
bowSound.src ="audio/strelba3.mp3";
bowSound.volume=0.3
var boi = new Audio();
boi.src ="audio/boi2.mp3";
boi.volume=0.4
var orkCry = new Audio();
orkCry.src ="audio/ork/orkCry.mp3";
var orkCry2 = new Audio();
orkCry2.src ="audio/ork/orkCry2.mp3";
var orkCry3 = new Audio();
orkCry3.src ="audio/ork/orkCry3.mp3";
var orkCry4 = new Audio();
orkCry4.src ="audio/ork/orkCry4.mp3";
var song = new Audio();
var forest = new Audio();
forest.src ="audio/forest.mp3";
var builSound = new Audio();
builSound.src ="audio/building.mp3";
var orcLaugh = new Audio();
orcLaugh.src ="audio/orcLaugh.mp3";
orcLaugh.volume=0.4
var retreat = new Audio();
retreat.src ="audio/retreat.mp3";
retreat.volume=0.3
var runAway = new Audio();
runAway.src ="audio/runAway.mp3";

const orkCrys=[orkCry, orkCry2, orkCry3, orkCry4]

//mouse
const mouse = {
    x: undefined,
    y: undefined,
    width: 0.1,
    height: 0.1,
}
canvas.addEventListener('mouseleave', function(){
    mouse.x= undefined,
    mouse.y= undefined
})
let canvasPosition = canvas.getBoundingClientRect();
canvas.addEventListener('mousemove', function(e){
    mouse.x = e.x - canvasPosition.left;
    mouse.y = e.y - canvasPosition.top;
})
/* //положение тумана
let fogWrapper = document.getElementById('fogWrapper')
    fogWrapper.style.left=canvasPosition.x
    fogWrapper.style.top=canvasPosition.y
 */
//game board
const controlsBar ={
    width: canvas.width,
    height: cellSize+100,
}
class Cell {
    constructor(x,y, isHead){
        this.x = x;
        this.y = y;
        this.width = cellSize;
        this.height = cellSize;
        this.type=isHead
    }
    draw(){
        
        if(mouse.x && mouse.y && collisian(this, mouse) && !this.type){
            //ctx.strokeStule = 'black'
            activeMenuCell===2 ? ctx.strokeRect(this.x, this.y-100, this.width, this.height*2)
            : ctx.strokeRect(this.x, this.y, this.width, this.height);
        }
        if(this.type){
            ctx.strokeRect(this.x, this.y, this.width, this.height);
        }
    }
}

function createGrid(){
    for(let y = controlsBar.height; y < canvas.height; y+=cellSize){
        for(let x = 0; x < canvas.width; x+=cellSize){
            if(y<900 && x<canvas.width-cellLimiter*cellSize) gameGrid.push(new Cell(x,y))
        }
    }
    //header grid
        for(let x = 480; x < canvas.width; x+=cellSize+20){
            if(x<canvas.width-cellLimiter*cellSize*2) headerGrid.push(new Cell(x,10, true))
        }
}

createGrid();
function handelGameGrid(){
    for (let i = 0; i < gameGrid.length; i++){
        gameGrid[i].draw();
    }
    for (let j = 0; j < headerGrid.length; j++){
        headerGrid[j].draw();
    }
    if(activeMenuCell===-1){
        ctx.fillStyle = "rgba(100,150,185,0.5)"
        ctx.fillRect(480, 10, 100, 100) 
    }
    if(activeMenuCell===0){
        ctx.fillStyle = "rgba(100,150,185,0.5)"
        ctx.fillRect(600, 10, 100, 100) 
    }
    if(activeMenuCell===1){
        ctx.fillStyle = "rgba(100,150,185,0.5)"
        ctx.fillRect(720, 10, 100, 100) 
    }
    if(activeMenuCell===2){
        ctx.fillStyle = "rgba(100,150,185,0.5)"
        ctx.fillRect(840, 10, 100, 100) 
    }
}
//projectiles
class Projectiles {
    constructor(x,y){
        this.x = x+50
        this.y = y+50
        this.width = 10
        this.height = 10
        this.power = 20
        this.speed = 5
    }
    update(){
        this.x += this.speed
    }
    draw(){
        /* ctx.fillStyle = 'black'
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.width, 0, Math.PI*2)
        ctx.fill() */
        ctx.drawImage(arrow, 690, 125, 70, 5, this.x, this.y+12, 40,5);
    }
}
function handleProjectiles(){
    for(let i = 0; i < projectiles.length; i++){
        projectiles[i].update()
        projectiles[i].draw()
        for(let j = 0; j < enemies.length; j++){
            if(enemies[j] && projectiles[i] && collisian(enemies[j], projectiles[i])){
                enemies[j].health -= projectiles[i].power
                orkCrys[Math.floor(Math.random()*orkCrys.length)].play()
                orkCry2.volume=0.25,orkCry.volume=0.25,orkCry3.volume=0.25,orkCry4.volume=0.25
                projectiles.splice(i,1)
                i--
            }
        }
        if(projectiles[i] && projectiles[i].x > canvas.width - cellSize){
            projectiles.splice(i, 1)
            i--
        }
    }
}
//defenders
class Defender {
    constructor(x,y, activeCell){
        this.x = x;
        this.y = y-adjust;
        this.width = cellSize;
        this.height = cellSize;
        this.health = 100;
        this.project= [];
        this.timer = 0;
        this.shooting = false;
        this.frame=0;
        this.frameHeight=392;
        this.fight=false
        if(activeCell==1)this.type='warrior'
        if(activeCell==0)this.type='archer'
        if(this.type==='warrior')this.health = 250, this.frameHeight=367;
    }
    draw(){
        //ctx.fillStyle = 'blue';
        ctx.shadowBlur=0
        // ctx.fillRect(this.x, this.y, this.width, this.height)
        //ctx.drawImage(archer, 300, 15, 100, 140, this.x+40, this.y+27, 60,70);
        if(this.type==='archer'){
            !this.shooting ? ctx.drawImage(archer, 50, this.frame*this.frameHeight, 300, 392, this.x+27, this.y+23, 65,70)
            : ctx.drawImage(archer, 50, (this.frame)*this.frameHeight, 300, 392, this.x+27, this.y+23, 60,70);
        }
        if(this.type==='warrior'){
            this.fight ? ctx.drawImage(warrior, 0, this.frame*this.frameHeight, 297, 367, this.x+40, this.y+23, 55,65)
            : ctx.drawImage(warrior, 0, (this.frame+20)*this.frameHeight, 297, 367, this.x+40, this.y+23, 55,65)
        }  
        ctx.fillStyle = 'gold';
        ctx.font = '20px Aldrich';
        ctx.fillText(Math.floor(this.health), this.x+25, this.y+25)
    }
    update(){
        if(this.frame>17 && !this.shooting)this.frame=0
        if(this.type==='warrior'){
            if(frame % 3 ===0){
            this.frame++
            }
        }
        if(this.type==='archer'){
            if(frame % 3 ===0){
            this.frame++
            }
        }
        if(this.shooting){
            this.timer++;
            if(this.frame>39)this.frame=0
            if(this.timer % 3 ===0){
                if(this.type==='archer'&& this.frame===30)projectiles.push(new Projectiles(this.x, this.y)), bowSound.play()
            }
            /*  if(this.timer % 100 ===0){
                projectiles.push(new Projectiles(this.x, this.y))
            } */
        }else{
            this.timer = 0
        }
        
    }
}
canvas.addEventListener('click', function(e){
    const gridPositionX = mouse.x - (mouse.x % cellSize);
    const gridPositionY = mouse.y - (mouse.y % cellSize);
    console.log(buildings);
    console.log(gridPositionX+ 'GP X');
    console.log(gridPositionY+ 'GP Y');
    //if(gridPositionY < cellSize) return;
    let greaterArray= defenders.length>=buildings.length ? defenders.length : buildings.length
    for(let i=0; i < greaterArray; i++){
        if(activeMenuCell==-1){
            if(defenders[i] && defenders[i].x == gridPositionX && defenders[i].y ==gridPositionY) {
                defenders.splice(i,1)
                i--
            }
            if(buildings[i] && buildings[i].x == gridPositionX && (buildings[i].y ==gridPositionY || buildings[i].y ==gridPositionY-100)) {
                buildings.splice(i,1)
                i--
            }
        }else{
            if(defenders[i] && defenders[i].x == gridPositionX && defenders[i].y ==gridPositionY) return
            if(buildings[i] && buildings[i].x == gridPositionX && (buildings[i].y ==gridPositionY || buildings[i].y ==gridPositionY-100)) return
            }
    }
    if(activeMenuCell===0){  // если выбран лучник
        let defenderCost = 120;
        if(numberOfResources >= defenderCost && mouse.y>cellSize+adjust && mouse.y<900 
            && mouse.x<canvas.width-cellLimiter*cellSize){
            defenders.push(new Defender(gridPositionX, gridPositionY+100,activeMenuCell))
            numberOfResources -=defenderCost
        }
    }
    if(activeMenuCell===1){  // если выбран воин
        let defenderCost = 180;
        if(numberOfResources >= defenderCost && mouse.y>cellSize+adjust && mouse.y<900 
            && mouse.x<canvas.width-cellLimiter*cellSize){
            defenders.push(new Defender(gridPositionX, gridPositionY+100,activeMenuCell))
            numberOfResources -=defenderCost
        }
    }
    if(gridPositionY==0){
        if(gridPositionX==600)activeMenuCell=0
        if(mouse.x>720&& mouse.x<820)activeMenuCell=1
        if(mouse.x>840&& mouse.x<940)activeMenuCell=2
        if(mouse.x>480&& mouse.x<580)activeMenuCell=-1
        if(gridPositionX==1400){toggleSlider()}
    }
    if(activeMenuCell===2){ // если выбрано здание 
        for(let i=0; i < greaterArray; i++){
            if(defenders[i] && defenders[i].x == gridPositionX && defenders[i].y ==gridPositionY-100 ||
            buildings[i]&&  buildings[i].y ==gridPositionY-200) return //проверка не стоит ли за зданием лучник или здание
        }
        let buildingCost = 300;
        if(numberOfResources >= buildingCost && mouse.y>cellSize+adjust && mouse.y<900 
            && mouse.x<100){
            buildings.push(new Building(gridPositionX, gridPositionY))
            builSound.play()
            numberOfResources -=buildingCost
        }
    }
    if(gameOver)document.getElementById("looseBtn").style.visibility='visible'
})

function handleDefenders(){
    for(let i = 0; i < defenders.length; i++){
        defenders[i].draw()
        defenders[i].update()
        if(enemyPosition.indexOf(defenders[i].y+adjust) !==-1 && defenders[i].type==='archer'){
            defenders[i].shooting=true
        }else{
            defenders[i].shooting=false
        }
        for(let j =0; j<enemies.length; j++){
            if(defenders[i] && collisian(defenders[i], enemies[j])){
                enemies[j].movement=0
                defenders[i].health -= 0.2;
                if(defenders[i].type==='warrior') enemies[j].health -=0.2
                defenders[i].fight=true
                enemies[j].fight=true
                boi.play()
                if(enemies[j].health<=0)defenders[i].fight=false
            }
            if(defenders[i] && defenders[i].health <=0){
                defenders.splice(i, 1)
                i--;
                enemies[j].fight=false
                boi.pause()
                enemies[j].movement = enemies[j].speed;
            }
        }
    }
}
//enemies
class Enemy {
    constructor(verticalPosition){
        this.x = canvas.width;
        this.y = verticalPosition-adjust;
        this.width = cellSize;
        this.height = cellSize;
        this.speed = speedMod? Math.random()*0.2+0.7 :Math.random()*0.2+0.4;
        this.movement = this.speed;
        this.health = 200;
        this.maxHealth = this.health;
        this.fight=false;
        this.frameHeight=299;
        this.frame=23;
        this.type= enemyTypes[Math.floor(Math.random()*enemyTypes.length)]
        if(this.type==='orc')this.health = 300, this.frame=0, this.frameHeight=275;
    }
    update(){
        (score>= winningScore) ?this.x += this.movement*1.7 : this.x -= this.movement;
        if(frame % 3 ==0){
            this.frame++
        }
    }
    draw(){
        ctx.shadowColor = "red";
        ctx.shadowBlur = 0;
        /* ctx.fillStyle= 'red';
        ctx.fillRect(this.x, this.y, this.width, this.height) */
        
        if(this.type==='goblin') {  //goblin
        this.fight===false ? ctx.drawImage(goblin, 50, this.frame*this.frameHeight, 235, 300, this.x-20, this.y, 70,90)
        :  ctx.drawImage(goblin, 50, (this.frame+20)*this.frameHeight, 275, 300, this.x-40, this.y, 70,90)//299
        }
        if(this.type==='orc') {  //orc
            this.fight===false? ctx.drawImage(ork, 50, (this.frame+40)*this.frameHeight, 235, 300, this.x-20, this.y+7, 80,90)
        :  ctx.drawImage(ork, 50, this.frame*this.frameHeight, 265, 300, this.x-40, this.y+7, 80,90); 
        }     
        
        //health bar
        ctx.fillStyle= 'black';
        ctx.font = '20px Aldrich';
        ctx.fillText(Math.floor(this.health), this.x+10, this.y+20)
    }
}

function handleEnimies(){
    for(let i=0; i<enemies.length; i++){
        enemies[i].update()
        enemies[i].draw()
        if(enemies[i].type==='goblin' && enemies[i].frame===40 && enemies[i].fight)enemies[i].frame=23, enemies[i].fight=false, enemies[i].movement=enemies[i].speed
        if(enemies[i].type==='goblin' && enemies[i].frame===42 && !enemies[i].fight)enemies[i].frame=23
        if(enemies[i].type==='orc' && enemies[i].frame===19)enemies[i].frame=0, enemies[i].fight=false, enemies[i].movement=enemies[i].speed
        if(enemies[i] && enemies[i].health <=0){
            let gainedResources = enemies[i].maxHealth/5
            numberOfResources+=gainedResources
            score+=gainedResources
            const findThisPosition = enemyPosition.indexOf(enemies[i].y+adjust)
            enemyPosition.splice(findThisPosition,1)
            enemies.splice(i,1)
            i--
            boi.pause()
        }
        if(enemies[i] && enemies[i].x < 0){
            gameOver = true;
        }
    }
    if(frame % enemiesInterval === 0){
        let verticalPosition = Math.floor(Math.random()*6+1)*cellSize+200
        console.log(verticalPosition);
        enemies.push(new Enemy(verticalPosition))
        enemyPosition.push(verticalPosition)
        if(enemiesInterval > 100) enemiesInterval -=20;
    }
}

//resources
const amounts = [30,40,50];
class Resource{
    constructor(modificator){
        /* this.x = Math.random() * canvas.width-cellSize
        this.y = (Math.floor(Math.random() * 6)+1)*cellSize+200 */
        this.buildingIndex = Math.floor(Math.random() * buildings.length)
        this.x = buildings[this.buildingIndex].x+35
        this.y = buildings[this.buildingIndex].y+10
        this.width= cellSize*0.5
        this.height = cellSize*0.5
        this.amount = amounts[Math.floor(Math.random()*amounts.length)]*modificator*0.6
        this.frame=0
        this.frameWidth=32
    }
    draw(){
        ctx.shadowBlur=0;
        /* ctx.fillStyle = 'yellow'
        ctx.fillRect(this.x, this.y, this.width, this.height) */
        if(frame % 9 === 0 && score < winningScore){
        this.frame++
        if(this.frame>7)this.frame=0
        }
        ctx.drawImage(coin, this.frame*this.frameWidth, 0, 30, 32, this.x+8, this.y+13, 40,42)
        ctx.fillStyle = 'black'
        ctx.font = '20px Aldrich'
        ctx.shadowBlur=20;
        ctx.fillStyle = 'yellow'
        ctx.fillText(this.amount, this.x+15, this.y+10)
        ctx.shadowBlur=0;
    }
}
function handleResources(){
    if(buildings.length>0 && frame % 500 === 0 && score < winningScore){
        resourses.push(new Resource(buildings.length))
    }
    for (let i = 0;i<resourses.length; i++){
        resourses[i].draw();
        if(resourses[i] && mouse.x && mouse.y && collisian(resourses[i], mouse)){
            numberOfResources += resourses[i].amount
            resourses.splice(i,1)
            i--
        }
    }
}
//utiltties
function handelGameStatus(){
    ctx.shadowColor = "white";
    //ctx.shadowBlur = 20;
    ctx.shadowBlur=20;
    ctx.fillStyle = 'black';
    ctx.font = '50px Yusei Magic';
    //ctx.fillText('Score: ' + score,1220,80)
    ctx.fillStyle = "rgba(100,150,185,0.2)"
    ctx.fillRect(140, 20, 250, 90) 
    ctx.fillStyle = 'black';
    ctx.fillText( numberOfResources,180,80)
    ctx.drawImage(gold, 0, 0, 512, 512, 300, 30, 65,70)
    if(gameOver){
        ctx.fillStyle= 'black'
        ctx.font = '80px Aldrich'
        ctx.fillText('GAME OVER', canvas.width/2-250,canvas.height/2)
    }
    if(score>= winningScore){
        goblin.src = 'img/characters/css_sprites.png'
        ork.src = 'img/characters/enemy2.png'
        retreat.play(), runAway.play()
        setTimeout(() => { gamePaused=true },18000);
        
        ctx.fillStyle = 'black'
        ctx.font = '80px Aldrich'
        ctx.fillText('Level complite', canvas.width/2-250,canvas.height/2)
    }
    let flag
    if(score>1000){
        speedMod=true
        if(flag) orcLaugh.play(), flag=false}
    ctx.shadowColor = "white";
        ctx.shadowBlur=2;
        ctx.lineWidth = 2
        if(activeMenuCell===2)  ctx.strokeRect(2, 200, 100, 700);
        ctx.lineWidth = 1
}

function animate(){
    ctx.clearRect(0,0, canvas.width, canvas.height)
    //ctx.fillStyle='rgb(250, 177, 67)'
    //ctx.fillRect(0,0,controlsBar.width, controlsBar.height)
    clouds()
    handleBuildings()
    handelGameGrid()
    handleDefenders()
    handleEnimies()
    handleProjectiles()
    
    handleResources()
    header()
    handelGameStatus()
    if(!gameOver && !gamePaused)requestAnimationFrame(animate)
    frame++
}


function collisian(first, second){
    if(first && second){
        if(!(first.x > second.x + second.width || 
        first.x + first.width < second.x ||
        first.y+4 > second.y + second.height ||
        first.y + first.height < second.y+4
        )){
            return true;
        }
    }
}
function header(){
    let cost=120
    if(activeMenuCell==1)cost=180
    if(activeMenuCell==2)cost=300
    ctx.drawImage(archer, 50, 0, 300, 392, 630, 30, 65,70)
    ctx.drawImage(building, 0, 0, 80, 140, 840, 20, 110,150)
    ctx.drawImage(warrior, 0, 0, 297, 367, 740, 30, 60,70)
    ctx.drawImage(delBtn, 0, 0, 900, 900, 510, 40, 45, 45)
    ctx.drawImage(musicBtn, 0, 0, 128, 128, 1410, 30, 55, 55)
    if(activeMenuCell!=undefined){
        if(activeMenuCell!=-1){
            ctx.fillStyle = "rgba(100,150,185,0.3)"
            ctx.fillRect(675, 120, 200, 50) 
            ctx.shadowColor='white'
            ctx.shadowBlur=2
            ctx.fillStyle = 'black';
            ctx.font = '30px Aldrich';
            ctx.fillText('Cost: ' + cost,700,160)
        }
    }
    //enviroment
    ctx.shadowBlur=0
    //
    ctx.drawImage(tree, 0, 0, 218, 172, 570, 490, 218*0.7,172*0.7)
    ctx.drawImage(tree, 0, 0, 218, 172, 700, 290, 218*0.7,172*0.7)
    ctx.drawImage(tree, 0, 0, 218, 172, 1240, 200, 218*0.7,172*0.7)
    ctx.drawImage(stone, 0, 0, 218, 172, 1040, 640, 218*0.7,172*0.7)
    ctx.drawImage(tree3, 0, 0, 224, 281, 840, 675, 224*0.4, 281*0.55)
    ctx.drawImage(tree, 0, 0, 218, 172, 1340, 590, 218*0.7,172*0.7)
    ctx.drawImage(tree2, 0, 0, 206, 367, 930, 370, 206*0.45, 367*0.4)
    ctx.drawImage(greenery, 0, 0, 85, 72, 440, 470, 85*0.6, 72*0.6)
    ctx.drawImage(greenery, 0, 0, 85, 72, 1240, 470, 85*0.6, 72*0.6)
    ctx.drawImage(greenery, 0, 0, 85, 72, 340, 370, 85*0.7, 72*0.8)
    ctx.drawImage(greenery, 0, 0, 85, 72, 240, 670, 85*0.5, 72*0.7)
}


window.addEventListener('resize', function(){
    canvasPosition = canvas.getBoundingClientRect();
    audioplayerPositionleft=canvasPosition.right - 120
    audioplayerPositionTop=canvasPosition.top +130
    audioplayer.style.left = `${audioplayerPositionleft}px`;
    audioplayer.style.top = `${audioplayerPositionTop}px`;
    /* fogWrapper.style.left = `${audioplayerPositionleft}px`;
    fogWrapper.style.top=canvasPosition.y
    console.log(canvasPosition.right+ 'canvas');
    console.log(fogWrapper.getBoundingClientRect());
    */
}) 

//buildings

class Building {
    constructor(x,y){
        this.x = x;
        this.y = y-adjust;
        this.width = cellSize;
        this.height = cellSize*2;
        this.health = 100;
        this.timer = 0;
    }
    draw(){
        ctx.shadowBlur=0;
        //ctx.drawImage(building, 0, 0, 80, 140, this.x-40, this.y+30, 170,330)
        ctx.drawImage(church, 0, 0, 358, 493, this.x-30, this.y+20, 290,550)
        ctx.fillStyle = 'black';
        ctx.font = '20px Aldrich';
        ctx.fillText(Math.floor(this.health), this.x, this.y+40)
        
    }
    update(){
        /*  if(this.timer % 100 ===0){
                projectiles.push(new Projectiles(this.x, this.y))
            } */
    }
}
function handleBuildings(){
    for(let i = 0; i < buildings.length; i++){
        buildings[i].draw()
        for(let j =0; j<enemies.length; j++){
            if(buildings[i] && collisian(buildings[i], enemies[j])){
                enemies[j].movement = 0
                buildings[i].health -= 0.2;
                enemies[j].fight=true
                boi.play()
            }
            if(buildings[i] && buildings[i].health <=0){
                buildings.splice(i, 1)
                i--;
                enemies[j].fight=false
                boi.pause()
                enemies[j].movement = enemies[j].speed;
            }
        }
    }
}

//отменяем дефолтное поведение мышки(райтклик)
document.oncontextmenu = rightClick; 
        function rightClick(clickEvent) { 
            clickEvent.preventDefault(); 
            activeMenuCell=undefined
        } 

//audio player

let audioplayer = document.getElementById('audio')
    let audioplayerPositionleft=canvasPosition.right - 120
    let audioplayerPositionTop=canvasPosition.top +130
    audioplayer.style.position = "absolute";
    audioplayer.style.left = `${audioplayerPositionleft}px`;
    audioplayer.style.top = `${audioplayerPositionTop}px`;


let slider=document.getElementById('myRange')
slider.addEventListener('mousemove', function(){
    let x = slider.value
    let color ='linear-gradient(90deg,rgb(117, 252, 117)'+x+'%,rgb(214, 214, 214) '+x+'%)';
    slider.style.background = color
    song.volume=slider.value/100*0.5
    
})
let playMusic = false
let currentSong = 0
musicArr
function changeSong(){
    currentSong++
    if(currentSong==4)currentSong=0
    song.pause()
    song.src=musicArr[currentSong]
    song.play()
}
song.addEventListener('ended', function() {
    this.currentTime = 0;
    changeSong()
    }, false);

function toggleMusic(){
    song.src=musicArr[currentSong]
    playMusic=!playMusic
    song.volume=0.1
    return playMusic ? song.play() : song.pause();
}
function toggleSlider(){
    sliderVisible=!sliderVisible
    console.log(sliderVisible);
    if(!sliderVisible)audioplayer.style.visibility='hidden'
    else audioplayer.style.visibility='visible'
}



//canvas2 briffing /////// заставка!
const canvas2 = document.getElementById('canvas2'); //канвас для анимации
const ctx2 = canvas2.getContext('2d');
canvas2.width=1500;
canvas2.height=940;
const canvas3 = document.getElementById('canvas3');  //канвас для печатающегося текста
const ctx3 = canvas3.getContext('2d');
canvas3.width=1500;
canvas3.height=940;
let endBriffing = false
let firstClick=true
canvas3.addEventListener('click', function(){
    if(firstClick){
        ctx3.clearRect(0,0, canvas2.width, canvas2.height)
        skipBriffing=true
        act5=false, act4=false,act3=false,act2=false,act1=false
        document.getElementById('nextday1').style.visibility='visible'
        setTimeout(() => { 
                document.getElementById('nextday1').style.visibility='hidden'
                toggleMusic(), secondDialog=true},1500);
        canvas2.style.background='transparent';
        canvas.style.visibility='visible'
        forest.pause()
        setTimeout(() => { act6=true },3000);
        setTimeout(() => { act7=true },5000);
        setTimeout(() => { typeText2() },6000);
        firstClick=false
    }else{
        endBriffing = true
        ctx3.clearRect(0,0, canvas2.width, canvas2.height)
        ctx2.clearRect(0,0, canvas2.width, canvas2.height)
        gamePaused=false
        animate();
        canvas2.remove()
        canvas3.remove()
    }
})
let secondDialog=false
let brifingFrames=0
let fogPosition=0
let fogPosition2=0
let mageFrame=0
let skipBriffing=false
let act1=false
let act2=false
let act3=false
let act4=false
let act5=false
let act6=false
let act7=false
function animate2(){
    ctx2.clearRect(0,0, canvas2.width, canvas2.height)
    if(firstClick){
        ctx2.drawImage(fog1, 0, 0, 1000, 600, 0-fogPosition, 0, canvas2.width, canvas2.height)
        ctx2.drawImage(fog2, 0, 0, 1000, 600, 0-fogPosition2, 0, canvas2.width, canvas2.height)
        ctx2.drawImage(fog1, 0, 0, 1000, 600, canvas2.width-fogPosition, 0, canvas2.width, canvas2.height)
        ctx2.drawImage(fog2, 0, 0, 1000, 600, canvas2.width-fogPosition2, 0, canvas2.width, canvas2.height)
    }
    
    if(act1)ctx2.drawImage(mageSprite, 0, 720*mageFrame,  720, 720, 300, 400, 300,400)
    if(act2)ctx2.drawImage(mageSprite, 0, 720*mageFrame,  720, 720, 300, 400, 400,500)
    if(act3)ctx2.drawImage(mageSprite, 0, 720*mageFrame,  720, 720, 400, 400, 500,600)
    if(act4)ctx2.drawImage(mageSprite, 0, 720*mageFrame,  720, 720, 200, 210, 700,800)
    if(act5)ctx2.drawImage(popUp, 0, 0, 600, 511, 650, 150, 600,511)

    if(act6){ctx2.drawImage(mageSprite, 0, 720*mageFrame,  720, 720, 600, 400, 600,700)}
    if(act7){ctx2.drawImage(popUp2, 0, 0, 600, 511, 250, 150, 850,550)}
    if(!endBriffing)requestAnimationFrame(animate2)
    if(brifingFrames%5 ==0){
        fogPosition2=fogPosition
        mageFrame++
        console.log(mageFrame);
        if(act5 &&mageFrame==15||secondDialog &&mageFrame==15)mageFrame=50
        if(mageFrame>=90)mageFrame=0
    }
        fogPosition++
        if(fogPosition>canvas2.width)fogPosition=0
    brifingFrames++
}


function start(){
    forest.play()
    forest.volume=0.4
    const startDiv = document.getElementById('start');
    startDiv.style.visibility='hidden'
    canvas2.style.visibility='visible'
    mage()
    animate2();
}

function mage(){
    setTimeout(() => { if(!skipBriffing)act1=true },2000);
    setTimeout(() => { act1=false},5000);
    setTimeout(() => { if(!skipBriffing)act2=true },8000);
    setTimeout(() => { act2=false},12000);
    setTimeout(() => { if(!skipBriffing)act3=true },15000);
    setTimeout(() => { act3=false },19000);
    setTimeout(() => { if(!skipBriffing)act4=true},21000);
    setTimeout(() => { if(!skipBriffing)act5=true},23000);
    setTimeout(() => { if(act5)typeText()},24000);
    
}

function typeOut(str, a,b,c, g) {
    var cursorX = a || 750 
    var cursorY = b|| 260 
    var lineHeight = 30
    d = c || 1150
    e = cursorX-10
    padding = g || 10;
    var i = 0;
    //if(firstClick && secondDialog){  
        $_inter = setInterval(function() {
            var rem = str.substr(i);
            var space = rem.indexOf(' ');
            space = (space === -1)?str.length:space;
            var wordwidth = ctx3.measureText(rem.substring(0, space)).width;
            var w = ctx3.measureText(str.charAt(i)).width;
            if(cursorX + wordwidth >= d - padding) {
                cursorX = e ;
                cursorY += lineHeight;
            }
            ctx3.fillText(str.charAt(i), cursorX, cursorY);
            i++;
            cursorX += w;
            if(i === str.length) {
                clearInterval($_inter);
            }
            if(!firstClick && !secondDialog) return ctx3.clearRect(0,0, canvas2.width, canvas2.height), clearInterval($_inter);
        }, 85);
    
}
function typeText() {
    ctx3.fillStyle = '#000000';
    ctx3.font = '24px Yusei Magic';
    var str = `Your Highness ...                    I've just had some disturbing reports... \n The Orcs army has appearance at the borders.\n Tomorrow they will be on South Bridge. \n We need to hurry. `;
    typeOut(str);
};
function typeText2() {
    ctx3.fillStyle = '#000000';
    ctx3.font = '24px Yusei Magic';
    var str2 =`Your Highness ...  we are just in time.    They are about to be here. You must lead the defense. Construct a building and place archers on positions.                            Our lives are in your hands.`
    typeOut(str2, 290, 210, 830, 20 );
}


//clouds
let cloudPos=0
let cloudInitialPos=Math.random()*1000
function clouds(){
    if(frame%10==0)cloudPos+=0.3
    if(cloudPos>canvas2.width)cloudPos=0
    ctx.drawImage(cloud3, 0, 0, 1920, 1047, cloudInitialPos-cloudPos, 0, canvas2.width, controlsBar.height-20)
    ctx.drawImage(cloud2, 0, 0, 1920, 1047, canvas2.width-cloudPos, 0, canvas2.width, controlsBar.height-20)
}