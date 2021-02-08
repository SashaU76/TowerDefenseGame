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
let winningScore = 8000
let adjust=100
let cellLimiter=5
let activeMenuCell=undefined
let sliderVisible=false
let gamePaused=true
let speedMod=false
let flag=true
let isMage=false
let buildingType, towers, houses
let muchMana=false

function initialState(){
    retreat.pause(), runAway.pause()
    playMusic = false
    frame=0
    score=0
    numberOfResources=900
    enemiesInterval=600
    gameOver = false
    winningScore = 5000
    adjust=100
    cellLimiter=3
    activeMenuCell=undefined
    sliderVisible=false
    speedMod=false
    flag=true
    defenders.length = 0
    buildings.length = 0
    enemies.length = 0
    projectiles.length = 0
    enemyPosition.length = 0
    resourses.length = 0
    casts.length=0
    bosses.length=0
    startAnimating(60)
    document.getElementById('looseBtn').style.visibility='hidden'
    goblin.src = 'img/characters/css_sprites2.png'
    ork.src = 'img/characters/enemy22.png'
    isMage=false
    
}



const gameGrid = []
const headerGrid = []
const defenders = []
const buildings = []
const enemies= []
const projectiles = []
const enemyPosition = []
const resourses = []
const casts = []
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
building.src = 'img/buildings/human-city2.png'
const coin =new Image();
coin.src = 'img/coin_gold.png'
const gold =new Image();
gold.src = 'img/gold.png'
const church =new Image();
church.src = 'img/buildings/myHouse5.png'
const tower =new Image();
tower.src = 'img/buildings/myTower2.png'
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
const lightning =new Image();
lightning.src = 'img/lightning.png'
const boss1 =new Image();
boss1.src = 'img/boss11.png'
const cast2 =new Image();
cast2.src = 'img/casts/cast2.png'
const cast1 =new Image();
cast1.src = 'img/casts/myCast.png'

//audio
var bowSound = new Audio();
bowSound.src ="audio/strelba3.mp3";
bowSound.volume=0.1
var boi = new Audio();
boi.src ="audio/boi2.mp3";
boi.volume=0.2
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
orcLaugh.volume=0.1
var retreat = new Audio();
retreat.src ="audio/retreat.mp3";
retreat.volume=0.2
var runAway = new Audio();
runAway.src ="audio/runAway2.mp3";
runAway.volume=0.3
var buildingFall = new Audio();
buildingFall.src ="audio/buildingFall.mp3";
buildingFall.volume=0.3
var electro = new Audio();
electro.src ="audio/electro.mp3";
electro.volume=0.1
var zaklinanie = new Audio();
zaklinanie.src ="audio/zaklinanie.mp3";
zaklinanie.volume=0.2
var bossCast = new Audio(); 
bossCast.src ="audio/bossCast.mp3"; bossCast.volume=0.5
var bossDie = new Audio();
bossDie.src ="audio/bossDie.mp3";bossDie.volume=0.4
var bossMagic = new Audio();
bossMagic.src ="audio/bossMagic.mp3";bossMagic.volume=0.3
var bossWalk = new Audio();
bossWalk.src ="audio/bossWalk.mp3";bossWalk.volume=0.4
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
            if(x<canvas.width-cellLimiter*cellSize) headerGrid.push(new Cell(x,10, true))
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
    if(activeMenuCell===3){
        ctx.fillStyle = "rgba(100,150,185,0.5)"
        ctx.fillRect(960, 10, 100, 100) 
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
            if(enemies[j] && projectiles[i]&& enemies[j].death==false && collisian(enemies[j], projectiles[i])){
                enemies[j].health -= projectiles[i].power
                orkCrys[Math.floor(Math.random()*orkCrys.length)].play()
                orkCry2.volume=0.1,orkCry.volume=0.1,orkCry3.volume=0.1,orkCry4.volume=0.1
                projectiles.splice(i,1)
                i--
            }
        }
        for(let k = 0; k < bosses.length; k++){
            if(bosses[k] && projectiles[i] && collisian(bosses[k], projectiles[i])){
                bosses[k].health -= projectiles[i].power
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
        this.project= []; //возможно лишняя
        this.timer = 0;
        this.shooting = false;
        this.frame=0;
        this.frameHeight=392;
        this.fight=false
        if(activeCell==1)this.type='warrior'
        if(activeCell==0)this.type='archer'
        if(activeCell==3)this.type='mage', this.health =80, this.cast=false,
        this.frameSize=192, this.increment, this.maxMana=180, this.mana=this.maxMana
        if(this.type==='warrior')this.health = 250, this.frameHeight=367;
    }
    draw(){
        //ctx.fillStyle = 'blue';
        
        // ctx.fillRect(this.x, this.y, this.width, this.height)
        //ctx.drawImage(archer, 300, 15, 100, 140, this.x+40, this.y+27, 60,70);
        if(this.type==='mage'){
            ctx.drawImage(mageSprite, 0,720,  720,720, this.x+12, this.y+18, 75,75)
            if(this.cast){
                ctx.drawImage(lightning, this.frameSize*this.frame, 0, this.frameSize, this.frameSize, this.x+23, this.y+40, this.frameSize*0.35,this.frameSize*0.35)
                //ctx.drawImage(lightning, this.frameSize*this.frame, 0, this.frameSize, this.frameSize, this.x+40, this.y+60, this.frameSize*0.15,this.frameSize*0.15)
            }
            ctx.fillStyle = 'rgba(0, 149, 255, 0.7)';
            ctx.font = '20px Aldrich';
            ctx.fillText(Math.floor(this.mana), this.x+55, this.y+25)
        }
        if(this.type==='archer'){
            !this.shooting ? ctx.drawImage(archer, 50, this.frame*this.frameHeight, 300, 392, this.x+27, this.y+23, 65,70)
            : ctx.drawImage(archer, 50, (this.frame)*this.frameHeight, 300, 392, this.x+27, this.y+23, 60,70);
        }
        if(this.type==='warrior'){
            this.fight ? ctx.drawImage(warrior, 0, this.frame*this.frameHeight, 297, 367, this.x+40, this.y+23, 55,65)
            : ctx.drawImage(warrior, 0, (this.frame+20)*this.frameHeight, 297, 367, this.x+40, this.y+23, 55,65)
        }  
        ctx.fillStyle = 'gold';
        ctx.font = '18px Aldrich';
        ctx.fillText(Math.floor(this.health), this.x+20, this.y+25)
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
        if(this.type==='mage'){
            if(frame % 25 ===0){
                this.increment?this.frame++:this.frame--
                if(this.frame>2)this.increment=false
                if(this.frame<1)this.increment=true
                if(casts.length>0)this.mana-- 
                if(casts.length>3)this.mana-=2
                if(muchMana)this.mana-=4
                if(casts.length==0&& this.mana<this.maxMana)this.mana+=2
                if(casts.length>0&&electro.pause)electro.play()
            }
        if(this.mana<0)casts.length=0, this.cast=false, electro.pause()
        if(casts.length==0)this.cast=false, electro.pause()
        }
        
    }
}
canvas.addEventListener('click', function(e){
    const gridPositionX = mouse.x - (mouse.x % cellSize);
    const gridPositionY = mouse.y - (mouse.y % cellSize);
    //console.log(gridPositionX,gridPositionY);
    //if(gridPositionY < cellSize) return;
    let greaterArray= defenders.length>=buildings.length ? defenders.length : buildings.length
    for(let i=0; i < greaterArray; i++){
        if(activeMenuCell==-1){
            if(defenders[i] && defenders[i].x == gridPositionX && defenders[i].y ==gridPositionY) {
                if(defenders[i].type=='mage')isMage=false
                defenders.splice(i,1)
                i--
            }
            if(buildings[i] && buildings[i].x == gridPositionX && (buildings[i].y ==gridPositionY || buildings[i].y ==gridPositionY-100)) {
                buildings.splice(i,1)
                i--
            }
        }else{
            if(defenders[i] && defenders[i].x == gridPositionX && defenders[i].y ==gridPositionY&&activeMenuCell!=undefined) return
            if(buildings[i] && buildings[i].x == gridPositionX && (buildings[i].y ==gridPositionY || buildings[i].y ==gridPositionY-100)&&activeMenuCell!=undefined) return
            }
    }
    for(let i=0; i < casts.length; i++){
        if(casts[i] && casts[i].x == gridPositionX && (casts[i].y ==gridPositionY || casts[i].y ==gridPositionY-100)) {
                casts.splice(i,3)
                i--
            }
    }

    if(activeMenuCell===0){  // если выбран лучник
        let defenderCost = 120;
        if(numberOfResources >= defenderCost && mouse.y>cellSize+adjust && mouse.y<800 
            && mouse.x<canvas.width-cellLimiter*cellSize){
            defenders.push(new Defender(gridPositionX, gridPositionY+100,activeMenuCell))
            
            numberOfResources -=defenderCost
        }
    }
    if(activeMenuCell===1|| activeMenuCell===3&& !isMage){  // если выбран воин или маг
        let defenderCost = 180;
        if(activeMenuCell===3)defenderCost = 0
        if(numberOfResources >= defenderCost && mouse.y>cellSize+adjust && mouse.y<800 
            && mouse.x<canvas.width-cellLimiter*cellSize){
            defenders.push(new Defender(gridPositionX, gridPositionY+100,activeMenuCell))
            numberOfResources -=defenderCost
            if(activeMenuCell===3)isMage=true
        }
    }
    if(gridPositionY==0){
        if(gridPositionX==600)activeMenuCell=0
        if(mouse.x>720&& mouse.x<820)activeMenuCell=1
        if(mouse.x>840&& mouse.x<940)activeMenuCell=2, document.getElementById('buildings').style.visibility='visible'
        if(mouse.x>960&& mouse.x<1060)activeMenuCell=3
        if(mouse.x>480&& mouse.x<580)activeMenuCell=-1
        if(gridPositionX==1400){toggleSlider()}
    }
    if(activeMenuCell===2){ // если выбрано здание 
        for(let i=0; i < greaterArray; i++){
            if(defenders[i] && defenders[i].x == gridPositionX && defenders[i].y ==gridPositionY-100 ||
            buildings[i]&&  buildings[i].y ==gridPositionY-200) return //проверка не стоит ли за зданием лучник или здание
        }
        let buildingCost = 300;
        if(numberOfResources >= buildingCost && mouse.y>cellSize+adjust && mouse.y<800 
            && mouse.x<100&& buildingType){
            buildings.push(new Building(gridPositionX, gridPositionY, buildingType))
            builSound.play()
            numberOfResources -=buildingCost
        }
    }
    if(activeMenuCell===undefined){  // кастуем магическую стену
        
        //let defenderCost = 180;
        if( mouse.y>cellSize+adjust && mouse.y<800 
            && mouse.x<canvas.width-cellLimiter*cellSize&& isMage && casts.length<4){
                defenders.map(i=>{if(i.type=='mage')i.cast=true})
            casts.push(new Cast(gridPositionX, gridPositionY))
            setTimeout(()=>{
                casts.push(new Cast(gridPositionX, gridPositionY))
            },1000)
            setTimeout(()=>{
                casts.push(new Cast(gridPositionX, gridPositionY))
            },2000)
            zaklinanie.play()
        }
    }
    if(gameOver)document.getElementById("looseBtn").style.visibility='visible'
    if(towers.length>0&&activeMenuCell===undefined){
        for(let i=0; i < towers.length; i++){
            if(towers[0].x == gridPositionX && towers[0].y+100 ==gridPositionY) console.log("клацнули на башню");
        }
    }
})


function handleDefenders(){
    for(let i = 0; i < defenders.length; i++){
        defenders[i].draw()
        defenders[i].update()
        if(enemyPosition.indexOf(defenders[i].y+adjust) !==-1 && defenders[i].type==='archer'){
            defenders[i].shooting=true
        }else if(bosses[0]&&(bosses[0].y==defenders[i].y|| bosses[0].y+adjust==defenders[i].y) && defenders[i].type==='archer'){
            defenders[i].shooting=true //косячная проверка, предпологает наличие только одного босса. надо думать
        }else{
            defenders[i].shooting=false
        }
        for(let j =0; j<enemies.length; j++){
            if(defenders[i]&& enemies[j].type=='magic'&& collisian(defenders[i], enemies[j])){ // столкновение с магическим кастом
                defenders.splice(i, 1)
                i--;
                enemies.splice(j,1)
                j--;
                bossMagic.pause()
                return
            }
            if(defenders[i]&&  enemies[j].death==false&& enemies[j].type!='magic' && collisian(defenders[i], enemies[j])){
                enemies[j].movement=0
                defenders[i].health -= 0.2;
                if(defenders[i].type==='warrior') enemies[j].health -=0.2
                defenders[i].fight=true
                enemies[j].fight=true
                boi.play()
            }
            if(enemies[j].health<=0)defenders[i].fight=false
            if(defenders[i] && defenders[i].health <=0){
                defenders.splice(i, 1)
                i--;
                enemies[j].fight=false
                boi.pause()
                enemies[j].movement = enemies[j].speed;
            }
        }
    }
    for(let i = 0; i < casts.length; i++){
        for(let j =0; j<enemies.length; j++){
            if(casts[i]&& !enemies[j].death && collisian(casts[i], enemies[j])){
                enemies[j].movement=0
                enemies[j].health -=0.1
            }
        }
        for(let k =0; k<bosses.length; k++){
            if(casts[i]&& bosses[k] && collisian(casts[i], bosses[k])){
                bosses[k].movement=0
                bosses[k].health -=0.1
                
                muchMana=true
            }
        }
    }
}
//enemies
class Enemy {
    constructor(verticalPosition, magicCast){
        this.x = canvas.width;
        this.y = verticalPosition-adjust;
        this.width = cellSize;
        this.height = cellSize;
        if(magicCast){
            this.speed=3
            this.frame=0
            this.type='magic'
        }else{
            this.speed = speedMod? Math.random()*0.2+0.7 :Math.random()*0.2+0.4;
            this.movement = this.speed;
            this.health = 160;
            this.maxHealth = this.health;
            this.fight=false;
            this.frameHeight=299;
            this.frame=23;
            this.death= false
            this.flag=false
            this.type= enemyTypes[Math.floor(Math.random()*enemyTypes.length)]
            if(this.type==='orc')this.health = 250, this.frame=0, this.frameHeight=275;
        }
    }
    update(){
        if(this.type!='magic'&&!this.death){
            (score>= winningScore) ?this.x += this.movement*1.7 : this.x -= this.movement;
        }
        if(this.type!='magic'&&frame % 3 ==0){
            this.frame++
        }
        if(this.type=='magic'&&frame % 5 ==0){
            this.frame++
        }
        if(this.type=='magic')this.x -= this.speed, bossMagic.play()
    }
    draw(){
        
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
        if(this.type==='magic') {
            ctx.drawImage(cast1, 0,500*this.frame, 500, 500, this.x-40, this.y+7, 80,90)
        }  
        
        //health bar
        if(!this.death && this.type!='magic'){
            ctx.fillStyle= 'black';
            ctx.font = '20px Aldrich';
            ctx.fillText(Math.floor(this.health), this.x+10, this.y+20)
        }
    }
}

function handleEnimies(){
    for(let i=0; i<enemies.length; i++){
        enemies[i].update()
        enemies[i].draw()
        if(enemies[i].type=='magic'&& enemies[i].frame>9)enemies[i].frame=0
        if(enemies[i].type=='magic'&& enemies[i].x<0)enemies.splice(i,1), bossMagic.pause()
        if(!enemies[i].death && enemies[i].type!='magic'){
            if(enemies[i].type==='goblin' && enemies[i].frame>39 && enemies[i].fight)enemies[i].frame=23, enemies[i].fight=false, enemies[i].movement=enemies[i].speed
            if(enemies[i].type==='goblin' && enemies[i].frame>41 && !enemies[i].fight)enemies[i].frame=23,enemies[i].movement=enemies[i].speed
            if(enemies[i].type==='orc' && enemies[i].frame===19)enemies[i].frame=0, enemies[i].fight=false, enemies[i].movement=enemies[i].speed
        }else{
            if(enemies[i].type==='goblin'&& enemies[i].flag==false&& enemies[i].fight)enemies[i].frame=-9, enemies[i].flag=true
            if(enemies[i].type==='goblin'&& enemies[i].flag==false&& !enemies[i].fight)enemies[i].frame=11, enemies[i].flag=true
            if(enemies[i].type==='orc'&& enemies[i].flag==false && !enemies[i].fight)enemies[i].frame=-12, enemies[i].flag=true
            if(enemies[i].type==='orc'&& enemies[i].flag==false && enemies[i].fight)enemies[i].frame=28, enemies[i].flag=true
        }
        
        if(enemies[i]&& enemies[i].type!='magic' && enemies[i].health <=0){
            enemies[i].death=true
            if(enemies[i].type==='goblin'&&enemies[i].frame==21 && !enemies[i].fight ||enemies[i].type==='goblin'&&enemies[i].frame==1 && enemies[i].fight
            ||enemies[i].type==='orc'&& !enemies[i].fight &&enemies[i].frame==-2
            ||enemies[i].type==='orc'&& enemies[i].fight &&enemies[i].frame==38){
                let gainedResources = enemies[i].maxHealth/5
                if(score>3000)gainedResources=30
                const findThisPosition = enemyPosition.indexOf(enemies[i].y+adjust)
                numberOfResources+=gainedResources
                score+=gainedResources
                enemyPosition.splice(findThisPosition,1)
                enemies.splice(i,1)
                i--
            }
            boi.pause()
        }
        if(enemies[i]&& enemies[i].type!='magic' && enemies[i].x < 0){
            gameOver = true;
        }
    }
    if(frame % enemiesInterval === 0){
        let verticalPosition = Math.floor(Math.random()*6+1)*cellSize+200
        enemies.push(new Enemy(verticalPosition, false))
        if(bosses.length<1&&  score>3000 && score<3500)bosses.push(new Boss()), enemiesInterval=60
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
        this.buildingIndex = Math.floor(Math.random() * houses.length)
        this.x = houses[this.buildingIndex].x+35
        this.y = houses[this.buildingIndex].y+10
        this.width= cellSize*0.5
        this.height = cellSize*0.5
        this.amount = amounts[Math.floor(Math.random()*amounts.length)]*modificator*0.6
        this.frame=0
        this.frameWidth=32
    }
    draw(){
        
        /* ctx.fillStyle = 'yellow'
        ctx.fillRect(this.x, this.y, this.width, this.height) */
        if(frame % 9 === 0 && score < winningScore){
        this.frame++
        if(this.frame>7)this.frame=0
        }
        ctx.drawImage(coin, this.frame*this.frameWidth, 0, 30, 32, this.x+8, this.y+13, 40,42)
        ctx.fillStyle = 'black'
        ctx.font = '20px Aldrich'
        
        ctx.fillStyle = 'yellow'
        ctx.fillText(this.amount, this.x+15, this.y+10)
        
    }
}

function handleResources(){
    houses=buildings.filter((i)=>{ // складываем в массив здания типа 'house'
        return i.type=='house'
    })
    towers=buildings.filter((i)=>{ // тоже для зданий типа 'tower'
        return i.type=='tower'
    })
    if(houses.length>0 && frame % 500 === 0 && score < winningScore){
        resourses.push(new Resource(houses.length))
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

class Cast{
    constructor(x,y){
        this.x=x
        this.y=y
        this.width= cellSize
        this.height = cellSize
        this.frameX=-3
        this.frameY=0
        this.frameSize=192
        this.increment=true
    }
    draw(){
        
    if(frame % 9 === 0 && score < winningScore){
        if(this.frameY==0&&this.frameX==0) this.increment=true
        if(this.increment&&this.frameX>3)this.frameY++,this.frameX=0
        if(this.increment&&this.frameY>3)this.frameY=0
        if(this.frameY==3&&this.frameX>2)this.increment=false
        if(!this.increment&&this.frameX<1)this.frameX=4,this.frameY--
        this.increment ? this.frameX++ : this.frameX--
    }
    ctx.drawImage(lightning, this.frameSize*this.frameX, this.frameSize*this.frameY, this.frameSize, this.frameSize, this.x-40, this.y-40, this.frameSize,this.frameSize)
    }
}
function handleCasts(){
    
    for (let i = 0;i<casts.length; i++){
        casts[i].draw();
        /* if(resourses[i] && mouse.x && mouse.y && collisian(resourses[i], mouse)){
            numberOfResources += resourses[i].amount
            resourses.splice(i,1)
            i--
        } */
    }
}
//utiltties
function handelGameStatus(){
    ctx.shadowColor = "white";
    //ctx.shadowBlur = 20;
    //ctx.shadowBlur=20;
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
        setTimeout(() => { gamePaused=true },16000);
        
        ctx.fillStyle = 'black'
        ctx.font = '80px Aldrich'
        ctx.fillText('Level complite', canvas.width/2-250,canvas.height/2)
        document.getElementById("looseBtn").style.visibility='visible'
    }
    if(score>1400&&flag){
        speedMod=true
        orcLaugh.play(), flag=false
    }
    ctx.shadowColor = "white";
    ctx.shadowBlur=0;
    ctx.lineWidth = 2
    if(activeMenuCell===2)  ctx.strokeRect(2, 200, 100, 700);
    ctx.lineWidth = 1
}

let fps, fpsInterval, startTime, now, then, elapsed;

function startAnimating(fps){
    fpsInterval = 1000/fps;
    //then = Math.floor(performance.now());
    then=1
    startTime = then;
    animate();
}
function animate(){
    now = Math.floor(performance.now());
    elapsed = now - then;
    if(elapsed > fpsInterval){
        then =Math.floor(now - (elapsed % fpsInterval));
        ctx.clearRect(0,0, canvas.width, canvas.height)
        //ctx.fillStyle='rgb(250, 177, 67)'
        //ctx.fillRect(0,0,controlsBar.width, controlsBar.height)
        clouds()
        
        handelGameGrid()
        handleBuildings()
        handleDefenders()
        handleEnimies()
        handleProjectiles()
        
        handleResources()
        header()
        handelGameStatus()
        handelBoss()
        handleCasts()
    }
    if(!gameOver && !gamePaused){requestAnimationFrame(animate)}
    
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
    if(activeMenuCell==3)cost=0
    ctx.drawImage(archer, 50, 0, 300, 392, 630, 30, 65,70)
    ctx.drawImage(building, 0, 0, 80, 140, 840, 20, 110,150)
    ctx.drawImage(warrior, 0, 0, 297, 367, 740, 30, 60,70)
    if(towers.length>0)ctx.drawImage(mageSprite, 0, 720,  720, 720, 971, 27, 75,75)
    ctx.drawImage(delBtn, 0, 0, 900, 900, 510, 40, 45, 45)
    ctx.drawImage(musicBtn, 0, 0, 128, 128, 1410, 30, 55, 55)
    if(activeMenuCell!=2)document.getElementById('buildings').style.visibility='hidden'//скрываем меню зданий
    if(activeMenuCell!=undefined){
        if(activeMenuCell!=-1){
            ctx.fillStyle = "rgba(100,150,185,0.5)"
            ctx.fillRect(675, 120, 200, 50) 
            ctx.shadowColor='white'
            ctx.fillStyle = 'black';
            ctx.font = '30px Aldrich';
            ctx.fillText('Cost: ' + cost,700,160)
        }
    }
    //enviroment
    //
    ctx.drawImage(tree, 0, 0, 218, 172, 570, 490, 218*0.7,172*0.7)
    ctx.drawImage(tree, 0, 0, 218, 172, 700, 290, 218*0.7,172*0.7)
    ctx.drawImage(tree, 0, 0, 218, 172, 1240, 190, 218*0.7,172*0.7)
    ctx.drawImage(stone, 0, 0, 218, 172, 1040, 640, 218*0.7,172*0.7)
    ctx.drawImage(tree3, 0, 0, 224, 281, 840, 675, 224*0.4, 281*0.55)
    ctx.drawImage(tree, 0, 0, 218, 172, 1340, 590, 218*0.7,172*0.7)
    ctx.drawImage(tree2, 0, 0, 206, 367, 930, 370, 206*0.45, 367*0.4)
    ctx.drawImage(greenery, 0, 0, 85, 72, 440, 470, 85*0.6, 72*0.6)
    ctx.drawImage(greenery, 0, 0, 85, 72, 1240, 470, 85*0.6, 72*0.6)
    ctx.drawImage(greenery, 0, 0, 85, 72, 340, 350, 85*0.7, 72*0.8)
    ctx.drawImage(greenery, 0, 0, 85, 72, 240, 665, 85*0.5, 72*0.7)
}


window.addEventListener('resize', function(){
    canvasPosition = canvas.getBoundingClientRect();
    audioplayerPositionleft=canvasPosition.right - 120
    audioplayerPositionTop=canvasPosition.top +130
    audioplayer.style.left = `${audioplayerPositionleft}px`;
    audioplayer.style.top = `${audioplayerPositionTop}px`;
    help.style.left = `${audioplayerPositionleft-50}px`;
    help.style.top = `${audioplayerPositionTop-100}px`;
    /* fogWrapper.style.left = `${audioplayerPositionleft}px`;
    fogWrapper.style.top=canvasPosition.y
    */
}) 

//buildings

class Building {
    constructor(x,y, type){
        this.x = x;
        this.y = y-adjust;
        this.width = cellSize;
        this.height = cellSize*2;
        this.health = 100;
        this.timer = 0;
        this.type=type
    }
    draw(){
        
        if(this.type=='tower')ctx.drawImage(tower, 0, 0, 1000, 1500, this.x-78, this.y-30, 250,230)
        //if(this.type=='house')ctx.drawImage(church, 0, 0,608, 485, this.x-5, this.y+20, 220,280)
        if(this.type=='house')ctx.drawImage(church, 0,0, 609,340, this.x-10,this.y+27, 170,160)
        ctx.fillStyle = 'black';
        ctx.font = '20px Aldrich';
        ctx.fillText(Math.floor(this.health), this.x+10, this.y+40)
        
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
            if(buildings[i]&& enemies[j].death==false && collisian(buildings[i], enemies[j])){
                enemies[j].movement = 0
                buildings[i].health -= 0.2;
                enemies[j].fight=true
                if(boi.played.length<1)boi.play()
            }
            if(buildings[i] && buildings[i].health <=0){
                buildingFall.play()
                buildings.splice(i, 1)
                i--;
                enemies[j].fight=false
                boi.pause()
                enemies[j].movement = enemies[j].speed;
            }
        }
    }
}
const bosses=[]
//defenders
class Boss {
    constructor(){
        this.x = canvas.width-200;
        this.y = 500;
        this.initialY=this.y
        this.width = cellSize*2;
        this.height = cellSize*2;
        this.health = 8000;
        this.frame=0;
        this.timer=0;
        this.frameHeight=510;
        this.walking=true
        this.dying=false
        this.cast = false;
        this.movement=1
        this.fight=false
        this.direction=Math.random()
        this.step4=false
    }
    draw(){
        ctx.drawImage(boss1, 0,this.frameHeight*this.frame, 740,this.frameHeight, this.x-50,this.y, this.width,this.height) //170,160
        if(this.cast)ctx.drawImage(cast2, 192*(Math.floor(this.timer/20)),0, 192,188, this.x-50,this.y, this.width,this.height)
        ctx.fillStyle = 'black';
        ctx.font = '20px Aldrich';
        ctx.fillText(Math.floor(this.health), this.x+10, this.y+40)
    }
    update(){
        //frame update
        if(this.cast)this.timer++
        if(this.timer==180||this.timer==200){
            enemies.push(new Enemy(Math.floor(Math.random()*6+1)*cellSize+200, true))
        }
        if(frame % 6 ===0){
            this.frame++
        }
        if(!this.walking===true)bossWalk.pause()
        if(this.movement==0)muchMana=true
        if(this.movement!=0)muchMana=false
        if(this.walking===true){
            bossWalk.play()
            
            if(this.frame>51||this.frame<38)this.frame=38}
        if(this.dying===true){
            this.walking=false, this.cast=false, this.fight=false
            if(this.frame>15)bosses.slice(0,1)} //из расчета что босс будет только один
        if(this.fight===true){
            this.cast=false
            if(this.frame>61&&!this.dying)this.walking=true, this.step4=true //здесь может быть ошибка если он не будет успевать убить за 10 фреймов
            if(this.frame<52)this.frame=52}
        if(this.cast===true){
            muchMana=false
            bossCast.play()
            if(this.frame<16||this.frame>30)this.frame=16}
        // moving logic
        if(this.step4){
            this.timer=0
            this.fight=false
            this.x+=this.movement
            if(this.x>900)this.step4=false
        }else{
            if(this.fight){
                this.walking=false
                this.initialY=this.y; if(this.initialY>600)this.initialY=300;if(this.initialY<200)this.initialY=400
                this.direction=Math.random()
            }else{
                if(this.x>800 && this.timer===0)this.x-=this.movement              //step1
                if(this.x==800 && this.timer<10)this.walking=false, this.cast=true //step2
                if(this.timer>240&&!this.dying){                                   //step3
                this.cast=false, this.walking=true, this.x-=this.movement 
                if(this.direction>0.5&& this.y<this.initialY+100)this.y+=this.movement
                if(this.direction<0.5&& this.y>this.initialY-100)this.y-=this.movement
                }
            }
        }
    }
}
function handelBoss(){
    for(let i = 0; i < bosses.length; i++){
        bosses[i].draw()
        bosses[i].update()
        if(!bosses[i].dying)bosses[i].movement=1 
        for(let j = 0; j < defenders.length; j++){
            if(bosses[i]&& defenders[j] && collisian( bosses[i], defenders[j])){
                bosses[i].fight=true
                defenders[j].health -= 4;
                if(defenders[j].type==='warrior') bosses[i].health -=0.2
                defenders[j].fight=true
                if(defenders[j].health <=0){
                defenders.splice(j, 1)
                j--;
                }
            }else{
                //bosses[i].fight=false
            }
            //if(bosses[i].health<=0)defenders[j].fight=false
        }
        if(bosses[i] && bosses[i].x < 0){
            gameOver = true;
        }
        if(bosses[i] && bosses[i].health <= 0){
            bosses[i].dying=true
            bossDie.play()
            bosses.splice(i,1)
            i--
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

function skipBrif(){
    if(firstClick){
    skipBriffing=true
    ctx3.clearRect(0,0, canvas2.width, canvas2.height)
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
        //setTimeout(() => { skipBrif() },26000);
    }else{
        endBriffing = true
        ctx3.clearRect(0,0, canvas2.width, canvas2.height)
        ctx2.clearRect(0,0, canvas2.width, canvas2.height)
        gamePaused=false
        startAnimating(60);
        canvas2.remove()
        canvas3.remove()
        document.getElementById('skipDiv').style.visibility='hidden'
        document.getElementById('help').style.visibility='visible'
        toggleInfo()
    }
    document.getElementById('skipDiv').style.visibility='hidden'
}
canvas3.addEventListener('click', function(){
        document.getElementById('skipDiv').style.visibility='visible'
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

function mage(){ //функция называется маг, но отвечает за изменение сцены
    setTimeout(() => { if(!skipBriffing)act1=true },2000);
    setTimeout(() => { act1=false},5000);
    setTimeout(() => { if(!skipBriffing)act2=true },8000);
    setTimeout(() => { act2=false},12000);
    setTimeout(() => { if(!skipBriffing)act3=true },15000);
    setTimeout(() => { act3=false },19000);
    setTimeout(() => { if(!skipBriffing)act4=true},21000);
    setTimeout(() => { if(!skipBriffing)act5=true},23000);//23000
    setTimeout(() => { if(act5)typeText()},24000);//24000
    setTimeout(() => { if(act5)document.getElementById('skipDiv').style.visibility='visible'},39000);
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
        }, 68);
    
}
function typeText() {
    ctx3.fillStyle = '#000000';
    ctx3.font = '24px Pangolin';
    //var str = `Your Highness ...                    I've just had some disturbing reports... \n The Orcs army has appeared at the borders. \n Tomorrow they will be on South Bridge. \n We need to hurry. `;
    var str = `Ваше величество ...                                 До меня дошли тревожные известия. Разведчики докладывают о появлении армии орков возле наших границ... Завтра они будут на Южном Мосту. \n Мы должны поспешить. `;
    typeOut(str); 
};
function typeText2() {
    ctx3.fillStyle = '#000000';
    ctx3.font = '24px Pangolin';
    var str2 =`Your Highness ...  we are just in time.    They are about to be here. You must lead the defense. Construct a building and place archers on positions.                            Our lives are in your hands.`
    var str2 =`Ваше величество ...   мы успели.                             Орки вот-вот будут здесь. Чем быстрее вы возглавите оборону, тем лучше. Важно успеть возвести сооружения и расставить стрелков на позиции. Судьба королевства в ваших руках.`
    typeOut(str2, 290, 210, 830, 20 );
}


let cloudPos=0
let cloudInitialPos=Math.random()*1000

function clouds(){
    if(frame%10==0)cloudPos+=0.3
    if(cloudPos>canvas2.width)cloudPos=0
    ctx.drawImage(cloud3, 0, 0, 1920, 1047, cloudInitialPos-cloudPos, 0, canvas2.width, controlsBar.height-20)
    ctx.drawImage(cloud2, 0, 0, 1920, 1047, canvas2.width-cloudPos, 0, canvas2.width, controlsBar.height-20)
}

function selectBuilding(type){
    buildingType=type
    document.getElementById('buildings').style.visibility='hidden'
}
let help = document.getElementById('help')
    help.style.left = `${audioplayerPositionleft-50}px`;
    help.style.top = `${audioplayerPositionTop-100}px`;
function toggleInfo(){
    gamePaused=!gamePaused
    if(gamePaused)document.getElementById('info').style.visibility='visible'
    if(!gamePaused)document.getElementById('info').style.visibility='hidden', startAnimating(60);

}