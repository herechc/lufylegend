/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2016-03-16 10:10:02
 * @version $Id$
 */
var backLayer,floorLayer,playerLayer,background,floor,hero;//主层，障碍层
var imgList={};
var floorList=[];
var speed=1;//总体的控制速度
var isHit;//是否撞击
var MOVE_STEP=2;//主角移动速度
var imgData=[
	{name:"back",path:"./images/back.png"},
	{name:"f0",path:"./images/floor0.png"},
	{name:"f1",path:"./images/floor1.png"},
	{name:"f2",path:"./images/floor2.png"},
	{name:"f3",path:"./images/floor3.png"},
	{name:"hero",path:"./images/hero.png"},
	{name:"mai",path:"./images/mai.png"},
	{name:"ue",path:"./images/ue.png"},
	{name:"wheel",path:"./images/wheel.png"},
]



function main(){
	//背景层初始化
	backLayer=new LSprite();
	//背景层显示
	addChild(backLayer);
	//障碍初始化
	 floorLayer=new LSprite();
	 addChild(floorLayer)
	//加载
	LLoadManage.load(imgData,function(progress){

	},gameInit)
}
function gameInit(result){
	 imgList=result;
	 //背景初始化
	 background=new background();
	 backLayer.addChild(background);
	 //阶梯初始化
	 // floor=new floor()
	 // floorLayer.addChild(floor)
	 for(var i=0;i<4;i++){
	 	var  fType=Math.floor(Math.random()*4);
	 	 if(i==0) {fType=0};
	 	  floorList[i]=new floor({
	 	  	idx:i+1,
	 	  	te:fType,
	 	  })
		  floorLayer.addChild(floorList[i])
	 }
	 //主角
	 playerLayer=new LSprite();
	 addChild(playerLayer)
	 hero=new chara();
	 playerLayer.addChild(hero)
	 backLayer.addEventListener(LEvent.ENTER_FRAME,onframe)

	backLayer.addEventListener(LMouseEvent.MOUSE_DOWN,mousedown);
	backLayer.addEventListener(LMouseEvent.MOUSE_UP,mouseup);

	if(!LGlobal.canTouch){
		LEvent.addEventListener(window,LKeyboardEvent.KEY_DOWN,down);
		LEvent.addEventListener(window,LKeyboardEvent.KEY_UP,up);
	}

	 addChild(new FPS())
}
function mouseup(event){
	if(!hero)return;
	hero.moveType = null;
	hero.state();
}
function mousedown(event){
	if(event.offsetX <= LGlobal.width*0.5){
		down({keyCode:37});
	}else{
		down({keyCode:39});
	}
}
function up(event){
	if(!hero)return;
	hero.moveType = null;
	hero.state();
}
function down(event){
	if(!hero || hero.moveType)return;
	if(event.keyCode == 37){
		hero.moveType = "left";
	}else if(event.keyCode == 39){
		hero.moveType = "right";
	}
	hero.state();
}
function onframe(){
	background.run();
	hero.isDown=true;///这个重要
	hero.isStand=true;////
	for(var i=0;i<floorLayer.childList.length;i++){
		floorLayer.childList[i].run();
		var _child=floorLayer.childList[i];
		if(hero.x >= _child.bitmap.x-25 && hero.x <= _child.bitmap.x+85 && hero.y >= _child.y+_child.bitmap.y-45 && hero.y <= _child.y+_child.bitmap.y-40){
			 hero.isDown=false;
			 hero.isStand=false;
			 // console.log(i)
		}
		if(floorLayer.childList[i].isDie){
			floorLayer.removeChild(floorLayer.childList[i]);
			i--;
		}

	}

	hero.onframe()
	hero.state();
	if(hero.isStand){
		hero.anime.setAction(1,0)
	}
}