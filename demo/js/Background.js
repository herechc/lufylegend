/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2016-03-16 10:10:45
 * @version $Id$
 */

function background(){
	var self=this;
	base(self,LSprite,[]);
	var bitmap=new LBitmap(new LBitmapData(imgList["back"]));
	var bitmap1=bitmap.clone()
		bitmap1.y=bitmap.getHeight();
	var bitmap2=bitmap.clone()
		bitmap2.y=2*bitmap.getHeight();
	var bitmap3=bitmap.clone();
		bitmap3.y=3*bitmap.getHeight();
	self.addChild(bitmap);
	self.addChild(bitmap1);
	self.addChild(bitmap2)
	self.addChild(bitmap3)
}
background.prototype.run=function(){
	 var self=this;
	 self.y=self.y-speed;
	  if(self.y<-640){
	  	self.y=0;
	  }
	 // self.delay=delay ? delay : 3;
	 // self.leng=leng ? leng : 640;
	 // // console.log(self.delay)
	 // self.move=LTweenLite.to(self,self.delay,{y:self.leng,loop:true}).to(self,0,{y:0})
}

// background.prototype.stop=function(){
// 	var self=this;
// 	 LTweenLite.remove(self.move)
// }