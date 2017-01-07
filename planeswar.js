/*飞机大战*/

var score = 0;             //初始计分
var difficult = 1;         //初始难度
var planesspeed = 60;      //初始敌机速度
var stopflag = 1;          //初始暂停标
var timeProduce = null;    //初始子弹生成计时器
var timeShoot = null;      //初始射击子弹移动计时器
var timePlanes = null;     //初始敌机移动计时器


var scorebox;              //定义计分框
var difficultbox;          //定义难度框
var planes;                //定义敌机
var dead;                  //定义死亡组
var person;                //定义你的飞机
var bullets;               //定义子弹
var resetbtn;              //定义复位按钮
var stopbtn;               //定义暂停按钮
var overbox;               //定义结束框

window.onload = function(){
  scorebox = document.getElementById("score");            //获取计分框
  difficultbox = document.getElementById("difficultbox"); //获取难度框
  planes = document.getElementsByClassName("planes");     //获取敌机
  dead = document.getElementsByClassName("dead");         //获取死亡组
  person = document.getElementById("person");             //获取你的飞机
  bullets = document.getElementsByClassName("bullets");   //获取子弹
  resetbtn = document.getElementById("resetbtn");         //获取复位按钮
  stopbtn = document.getElementById("stopbtn");           //获取暂停按钮
  overbox = document.getElementById("overbox");           //获取结束框

  alert("用方向键控制您的飞机！Good lucky!")
  planesPlace();                                          //初始化敌机位置
  startGame();                                            //开始游戏


  //控制你的飞机
  document.onkeydown = function(event){
    event = event || window.event;
    if(stopflag==1){
      if(event.keyCode == 37 || event.keyCode == 65){
        person.style.left = person.offsetLeft - 10 + "px";
      }else if(event.keyCode == 39 || event.keyCode == 68){
        person.style.left = person.offsetLeft + 10 + "px";
      }else if(event.keyCode == 38 || event.keyCode == 87){
        person.style.top = person.offsetTop - 10 + "px";
      }else if(event.keyCode == 40 || event.keyCode == 83){
        person.style.top = person.offsetTop + 10 + "px";
      }
      if(person.offsetLeft <= 0 ){
        person.style.left = 0 + "px";
      }
      if(person.offsetLeft >= 900){
        person.style.left = 900 + "px";
      }
      if(person.offsetTop <= 0 ){
        person.style.top = 0 + "px";
      }
      if(person.offsetTop >= 550){
        person.style.top = 550 + "px";
      }
    }
  }

  //重新开始
  resetbtn.onclick = function resetStart(){
    score = 0;
    difficult = 1;
    planesspeed = 60;
    for(var i=0;i<dead.length;i++){
      dead[i].innerHTML = "&#xeb67;";
      dead[i].className = "planes";
    }
    planesPlace();
    clearAll();
    startGame();
    scorebox.innerHTML = score;
    difficultbox.innerHTML = difficult;
    person.innerHTML = "&#xeb72;";
    person.className = "iconfont";
    person.style.left = 450 + "px";
    person.style.top = 550 + "px";
  }

  //暂停和开始
  stopbtn.onclick = function(){
    if(stopflag == 1){
      this.innerHTML = '<i class="iconfont">&#xe608;</i>';  //更换按钮
      clearAll();
    }else if(stopflag == 2){
      this.innerHTML = '<i class="iconfont">&#xe600;</i>';  //更换按钮
      startGame();
    }
  }
}

//定义开始游戏
function startGame(){
  timeProduce = setInterval("produceBullets()",400);          //产生子弹
  timeShoot = setInterval("shootBullets()",20);               //移动子弹
  timePlanes = setInterval("movePlanes()",planesspeed);       //移动敌机
  overbox.style.display = "none";
  stopflag = 1;
}

//定义暂停游戏
function clearAll(){
    clearInterval(timeProduce);
    clearInterval(timeShoot);
    clearInterval(timePlanes);
    stopflag = 2;
}

//定义敌机位置初始化
function planesPlace(){
  for(var i=0;i<planes.length;i++){
    planes[i].style.left = Math.floor(Math.random() * 900) + "px";
    planes[i].style.top = -Math.floor(Math.random() * 600) - 50 + "px";
  }
}

//定义移动敌机
function movePlanes(){
  for(var i=0;i<planes.length;i++){
    planes[i].style.top = planes[i].offsetTop + 3 + difficult + "px";
    //撞击判定
    if(Math.abs(planes[i].offsetTop - person.offsetTop) < 25 && Math.abs(planes[i].offsetLeft - person.offsetLeft) < 30){
      planes[i].className = "dead";
      gameOver();
    }else if(planes[i].offsetTop>=595){
      planes[i].style.left = Math.floor(Math.random() * 900) + "px";
      planes[i].style.top = -Math.floor(Math.random() * 600) - 50 + "px";
    }
  }
}


//定义生成子弹
function produceBullets(){
  var warplace = document.getElementById("warplace");
  var text = document.createTextNode(".");
  var bullet = document.createElement("span");
  bullet.appendChild(text);
  warplace.appendChild(bullet);
  bullet.className = "bullets";
  bullet.style.top = person.offsetTop - 25 + "px";
  bullet.style.left = person.offsetLeft + 14 +"px";
  var bullets = document.getElementsByClassName("bullets");
}

//定义移动子弹
function shootBullets(){
for(var i=0;i<bullets.length;i++){
  for(var a=0;a<planes.length;a++){
    //击中判定
    if(bullets[i] && (planes[a].offsetLeft+37)>bullets[i].offsetLeft && bullets[i].offsetLeft>(planes[a].offsetLeft-8)){
      if((planes[a].offsetTop+2) > bullets[i].offsetTop && (planes[a].offsetTop-30) < bullets[i].offsetTop){  
            //移除子弹，敌机移入死亡组
            bullets[i].parentNode.removeChild(bullets[i]);
            var top = planes[a].offsetTop;
            var left = planes[a].offsetLeft;
            planes[a].className = "dead";
              for(var i=0;i<dead.length;i++){
                dead[i].style.top = top + "px";
                dead[i].style.left = left + "px";
                dead[i].innerHTML = "&#xe602;";
              }
            score += 1;                                                            
            scorebox.innerHTML = score;                               //更新得分
            //难度升级
            if(Math.ceil(score/10) > difficult){
              difficult = Math.ceil(score/10);
              difficultbox.innerHTML = difficult;
              clearInterval(timePlanes);
              difficult>11?planesspeed=1:planesspeed=60-difficult*5;  //
              timePlanes = setInterval("movePlanes()",planesspeed);
            }
            setTimeout("deadReset()",400);                            //死亡组复位
          }
        }
  }
  //删除边界外的子弹
  if(bullets[i] && bullets[i].offsetTop <= -27){
    bullets[i].parentNode.removeChild(bullets[i]);
  }else if(bullets[i]){ 
    bullets[i].style.top = bullets[i].offsetTop - 8 + "px";
  }
  }
}



//定义死亡组敌机复位
function deadReset(){
  for(var i=0;i<dead.length;i++){
    dead[i].style.top = -Math.floor(Math.random() * 600) - 50 + "px";
    dead[i].style.left = Math.floor(Math.random() * 900) + "px";
    dead[i].innerHTML = "&#xeb67;";
    dead[i].className = "planes";
    }
}

//定义游戏结束
function gameOver(){
  person.innerHTML = "&#xeb74;";
  person.className = "died";
  clearAll();
  stopflag = 3;
  overbox.style.display = "block";
  overbox.innerHTML = "游戏结束！得分：" + score;
}