/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2016-03-16 10:10:26
 * @version $Id$
 */

function chara(){
	 var self=this;
	 base(self,LSprite,[]);
	 var list=LGlobal.divideCoordinate(960,50,1,24);
	 var data=new LBitmapData(imgList["hero"],0,0,40,50);
	self.anime = new LAnimation(self,data,[
		[list[0][0]],
		[list[0][1]],
		[list[0][2],list[0][3],list[0][4],list[0][5],list[0][6],list[0][7],list[0][8],list[0][9],list[0][10],list[0][11],list[0][12]],
		[list[0][13],list[0][14],list[0][15],list[0][16],list[0][17],list[0][18],list[0][19],list[0][20],list[0][21],list[0][22],list[0][23]]
	]);
	self.isDown=true;
	// self.isStand=false;
	self.moveType=null;
	self.index = 0;
	self.x=150;
}
chara.prototype.onframe=function(){
	var self=this;
	if(self.isDown){
		self.y+=speed;
	}else{
		self.y-=speed;
	}
	if(self.hd){
		LTweenLite.to(self,0.8,{y:self.y-80,onComplete:function(){
			self.isDown=true;
		}})
	}
	if(self.moveType=="left"){
		if(self.x<=0){
			return;
		}
		self.x-=MOVE_STEP;
		// console.log(self.x)
	}else if(self.moveType=="right"){
		if(self.x>=280){
			return;
		}
		self.x+=MOVE_STEP;
	}
	if(self.index-- >0){
		return; 
	}
	self.index=10;
	self.anime.onframe();
}
chara.prototype.state=function(){
	var self=this;
	// if(self.isDown){
	// 	self.anime.setAction(1,0)
	// }else if(self.moveType=="stand"){
	// 	self.anime.setAction(0,0)
	// }else if(self.moveType=="right"){
	// 	self.anime.setAction(2)
	// }else if(self.moveType=="left"){
	// 	self.anime.setAction(3)
	// 	console.log("lefts")
	// }
	if(self.moveType=="left"){
		self.anime.setAction(3)
	}else if(self.moveType=="right"){
		self.anime.setAction(2)
	}else if(self.isStand){
		self.anime.setAction(1,0)
	}else{
		self.anime.setAction(0,0)
	}
}