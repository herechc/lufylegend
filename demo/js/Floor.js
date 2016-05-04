/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2016-03-16 10:11:05
 * @version $Id$
 */

function floor(para){
	// console.log(para*120 )
	var self=this;
	base(self,LSprite,[])
	var positionX=Math.floor(Math.random()*250);
	if(para){
		var positionY=para.idx*100;
		var floorType=para.te;
	}else{
		var positionY=460;
		var floorType=Math.floor(Math.random()*5);
	}
	// var positionY=para.idx ? (para.idx*200) : 400;
	// var floorType=para.te==0 ? 0 : Math.floor(Math.random()*4);//这里当para.te为0，这个判断是否的，floorType=2;
	// console.log(floorType)
	switch(floorType){
		case 0:
			self.bitmap=new LBitmap(new LBitmapData(imgList["f0"]));
			self.type=0;
			break;
		case 1:
			self.nolist=LGlobal.divideCoordinate(200,20,1,2);
			self.nodata=new LBitmapData(imgList["f1"],0,0,100,20);
			self.bitmap=new LAnimationTimeline(self.nodata,self.nolist);
			self.bitmap.setAction(0,0,0);
			self.type=1;
			break;
		case 2:
			self.nolist=LGlobal.divideCoordinate(200,20,1,2);
			self.nodata=new LBitmapData(imgList["f2"],0,0,100,20);
			self.bitmap=new LAnimationTimeline(self.nodata,self.nolist);
			self.bitmap.setAction(0,0,0);
			self.type=2;
			break;
		case 3:
			self.bitmap=new LBitmap(new LBitmapData(imgList["f3"]));
			self.type=3;
			break;
		case 4:
			 self.bitmap=new LBitmap(new LBitmapData(imgList["wheel"]));
		  	 var bitmap1=self.bitmap.clone();
			 LTweenLite.to(self.bitmap,1,{rotate:360,onComplete:function(){
			 	  var deg=360;
			 	  function adg(){
			 	  	  deg+=360;
			 	  	  LTweenLite.to(self.bitmap,1,{rotate:deg,onComplete:function(){
				        adg()
				      }})
			 	  }
			 	  adg()
			 }})
			  LTweenLite.to(bitmap1,1,{rotate:360,onComplete:function(){
			 	  var deg=360;
			 	  function adg(){
			 	  	  deg+=360;
			 	  	  LTweenLite.to(bitmap1,1,{rotate:deg,onComplete:function(){
				        adg()
				      }})
			 	  }
			 	  adg()
			 }});


			  break;
	}
	// console.log(positionY)
	self.bitmap.x=positionX;
	self.bitmap.y=positionY;
	self.addChild(self.bitmap)
	if(bitmap1){
		bitmap1.x=positionX+70;
		bitmap1.y=positionY;
		var shape=new LShape();
		shape.graphics.drawLine(1, "#a3b8b8", [positionX+12, positionY+2, positionX+77,positionY+2]);
		var shape1=shape.clone();
		shape1.graphics.drawLine(1, "#a3b8b8", [positionX+12, positionY+18, positionX+77,positionY+18]);
		self.addChild(bitmap1)
		self.addChild(shape)
		self.addChild(shape1)
	}
	self.isDie=false;
	self.isAdd=false;
}
floor.prototype.run=function(){
	var self=this;
	self.y-=speed;
	// console.log(self.y)
	if(!self.isAdd && self.y + self.bitmap.y<50){
		 var itemBitmap=new floor();
		 floorLayer.addChild(itemBitmap);
		 self.isAdd=true;
	}
	if(!self.isDie && self.y+self.bitmap.y<=-50){
		self.isDie=true;
	}
	// if(hero.hitTestObject(self)){
	// 	isHit=true;
	// 	console.log("hit")
	// }
}
