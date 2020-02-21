function Event(eventJson_,parentScene_){
	this.parentScene=parentScene_;
	this.eventData=eventJson_;
	this.id=eventJson_.id;
	this.triger=eventJson_.triger;
	this.content=eventJson_.content;
	this.targets=eventJson_.targets;
	
	if(this.triger.type != "passive"){
		this.isSelfDrivenEvent=true;
	}else{
		this.isSelfDrivenEvent=false;
	}

	this.display=function(this_){//how do I use this also in delayed function

		if(this_!=undefined){//for when it is used in a delayed function
			self=this_;
		}
		else{
			self=this;
		}
		//do the event suck as adding text image or clearing text
		if(self.content.type=="text"){
			self.div = document.createElement("span");
			self.div.innerHTML=self.content.value;
			document.getElementById("main_text").append(self.div);

			// document.getElementById("main_text").innerHTML = document.getElementById("main_text").innerHTML + self.content.value;
		}else if(self.content.type=="text-clickable"){
			document.getElementById("main_text").innerHTML = document.getElementById("main_text").innerHTML +
			'<a href="" onclick="return false;" id="'+self.parentScene.code+'_'+self.id+'"">' + self.content.value+ '</a';
		}else if(self.content.type=="img-background"){
			document.getElementById("background_img").innerHTML = self.content.value;
		}else if( self.content.type=="clear-text"){
			clearMainText()
		}



		self.activateTargets();
		
	}

	this.activate=function(){
	
		if(this.triger.type=="time"){
			setTimeout(this.display, this.triger.time*1000,this);

		}else if(this.triger.type=="passive"){
			this.display();
		}
	}

	this.linkTargets=function(){


		// let orderedListStacking={};
		for(let i=0;i<this.targets.length;i++){

			if(!isNaN(this.targets[i].id)){//if target is numbers it is an event if it is letters it is a new scene // returns true if it starts with numbers
			
				if(this.targets[i].type=="time"){//if time trigger


					let targetEvent=this.getTargetEvent(this.targets[i].id);

					if(targetEvent != null){
						targetEvent.parentEvent={
							parent:this,
							type:"time",
							delay:this.targets[i].delay,
							order:i
							}; //add this as a parent event so we can track backwards as well as forwards
					}
				
				}
				else if(this.targets[i].type=="click"){
					let targetEvent=this.getTargetEvent(this.targets[i].id);

					if(targetEvent != null){
						targetEvent.parentEvent={
								parent:this,
								type:"click",
								delay:this.targets[i].delay,
								order:i
							}; //add this as a parent event so we can track backwards as well as forwards

					}	

					
				}
			}
			else{//is letters (new scene pionter)
					
					

			}
		}

	}


	
	




	
	
}

Event.prototype.updateDelayStart=function(time_){
	this.triger.delayStart=time_;
}

Event.prototype.updateDelay=function(id_,time_){
	for(let i=0;i<this.targets.length;i++){
		
		if(this.targets[i].id==id_){
			this.targets[i].delay=time_;
		}
	}
}


//for saving
Event.prototype.setCleanJSON=function(){
	this.JSON={}
	this.JSON.id=this.id;
	this.JSON.content=this.content;
	this.JSON.triger=this.triger;
	this.JSON.targets=this.targets;
	console.log(this.JSON);
}



Event.prototype.activateTargets=function(){
	// let orderedListStacking={};
	for(let i=0;i<this.targets.length;i++){

		if(!isNaN(this.targets[i].id)){//if target is numbers it is an event if it is letters it is a new scene // returns true if it starts with numbers
			

			console.log(this.id + ":::::::::::::::: > "+this.targets[i].type + "    : " +this.targets[i].id)
			if(this.targets[i].type=="time"){//if time trigger
			
				// orderedListStacking[]
				let targetEvent=this.getTargetEvent(this.targets[i].id);

				
				if(targetEvent != null){
					setTimeout(function(targetEvent_){
						targetEvent_.activate();

					}, this.targets[i].delay*1000, targetEvent);
				}else{
					console.log("timed target does not exsist");

				}
			
			}
			else if(this.targets[i].type=="click"){
				console.log("add click target event")

				let targetEvent=this.getTargetEvent(this.targets[i].id);

				//console.log(targetEvent)


				// targetEvent.parentEvent={
				// 		parent:this,
				// 		type:"click",
				// 		length:this.targets[i].delay
				// 		}; //add this as a parent event so we can track backwards as well as forwards



				if(targetEvent != null){
					//console.log(this.parentScene.code+'_'+this.id)
					let clickableObject=document.getElementById(this.parentScene.code+'_'+this.id);
					console.log(clickableObject)
					clickableObject.targetEvent=this.getTargetEvent(this.targets[i].id);

					// console.log(" adding clickable object : " + this.targets[i].id)
					// console.log(clickableObject.targetEvent)
					clickableObject.addEventListener("click", function(clickEvent){
						// console.log(clickEvent.target);
						// console.log(clickEvent.target.targetEvent);
						console.log("activate from click" )
						clickEvent.target.targetEvent.activate();
					});
				
				}
			}
		}
		else{//is leters
				// console.log("target new scene   : "+ this.targets[i].id);
				currentPlay.newScene(this.targets[i].id);
				

		}
	}

}

//returns the event with the geven ID
Event.prototype.getTargetEvent=function(idName_){
	for(let i=0;i<this.parentScene.events.length;i++){
		// console.log(this.parentScene)
		// console.log(this.parentScene.events[i].id +" ??==?? " +idName_);
		if(this.parentScene.events[i].id==idName_){
			return this.parentScene.events[i];
		}
	}
	return null;
}

Event.prototype.logContent=function(){
	console.log(this.eventData.content.value);
}

// Event.prototype.getRefrenceLength = function(){
// //console.log("time ---------------------- " + time_);

// 	if(this["parentEvent"]==null){
// 		// console.log(event_)
// 		// console.log(" has no parrent it time delay is " +event_["time"]  + " the depth count is :" +counter_);
		
		
// 		//return {topEvent: event_,time:event_["triger"]["time"]+ time_,counter_};
		
// 		//this.parentEvent.
// 		return {time:this.triger["time"],parent: null,type:"self-driven"};
// 	}else{
		
		
// 		return {time:this.parentEvent["delay"],parent: this["parentEvent"]["parent"],type:this["parentEvent"]["type"]};
// 		//getLength(event_["parentEvent"]["parent"], event_["parentEvent"]["length"] + time_, counter_+1) //recurtion add this time delay to the time delay and return when you hit the top
// 	}
// }
Event.prototype.updateArrow=function(deltaX,deltaY){


	let width=100;
	let height=75;

	let strokeThickness=6;//


	//set the placment of the container
	// this.div.container.style.top=deltaY +"px";
	// this.div.container.style.left=deltaX +"px";

	let deltaYArrow=deltaY - height ;
	let deltaXArrow=deltaX;

	
	this.div.line.style.width=deltaXArrow + strokeThickness +"px";
	//move up

	if(deltaYArrow>20){
		this.div.line.style.height=deltaYArrow + "px";
		this.div.line.style.top=-1*deltaYArrow + "px";
	}else if(deltaYArrow<0){
		this.div.line.style.top=0 + "px";
		this.div.line.style.height=(Math.abs(deltaYArrow)+20) + "px";
	}else{
		this.div.line.style.height=(20) + "px";
		this.div.line.style.top=-1*deltaYArrow + "px";
	}

	this.div.line.style.left=-1*(deltaXArrow+strokeThickness/2) + "px";


	if(this.parentEvent!=undefined){
		this.div.line.innerHTML=getArrowSVG(deltaXArrow,deltaYArrow,strokeThickness,this.parentEvent.type);
	}else{
		this.div.line.innerHTML=getArrowSVG(deltaXArrow,deltaYArrow,strokeThickness,"self-driven");
	}
	
	
}
Event.prototype.updateDelayArrow=function(deltaX,deltaY){



this.div.delayInfo.svg.style.height=(deltaY)+'px';
this.div.delayInfo.style.height=(deltaY)+'px';
this.div.delayInfo.style.top=(-deltaY)+'px';
this.div.delayInfo.style.left=(-deltaX)+'px'

this.div.delayInfo.svg.innerHTML=delayArrowSVG(deltaY);
this.div.delayInfo.style.display="block";


this.div.delayInfo.text.style.left=(-deltaX)/2+'px';
this.div.delayInfo.text.style.top=(deltaY)/2+'px';
this.div.delayInfo.text.innerHTML=(deltaY/100)+' s';
}
Event.prototype.updateDelayArrow=function(deltaX,deltaY){



	this.div.delayInfo.svg.style.height=(deltaY)+'px';
	this.div.delayInfo.style.height=(deltaY)+'px';
	this.div.delayInfo.style.top=(-deltaY)+'px';
	this.div.delayInfo.style.left=(-deltaX)+'px'

	this.div.delayInfo.svg.innerHTML=delayArrowSVG(deltaY);
	this.div.delayInfo.style.display="block";


	this.div.delayInfo.text.style.left=(-deltaX)/2+'px';
	this.div.delayInfo.text.style.top=(deltaY)/2+'px';
	this.div.delayInfo.text.innerHTML=(deltaY/100)+' s';
}
Event.prototype.displayLogic = function() {
  	if(this.parentEvent==null){//self triggered  append div to content
		document.getElementById('content').appendChild(this.div.container);
	}else{
		this.parentEvent.parent.div.container.appendChild(this.div.container);
	}

	this.updateDisplayLogic();
};
Event.prototype.updateDisplayLogic=function(deltaX_,deltaY_){
// console.log('************************************************')
// 	console.log(deltaY_)
	let deltaX=25
	if(this.parentEvent==undefined){
		deltaX=200;
		//***update the event and then gennerate new from that is what should happen
		
		this.updateDelay(deltaY_/100);
	}
	else if(this.parentEvent.type=='click'){
		deltaX=30*(this.parentEvent.order+1);
	}else{
		deltaX=30*(this.parentEvent.order+1);
	}

	this.div.container.style.left=deltaX +"px";


	if(deltaY_==null){
		let deltaY=0;
		if(this.parentEvent!=undefined){
			deltaY=this.parentEvent.delay*100;
			if(this.parentEvent.type=='click'){
				deltaY+=100;
			}

		}else{
		
			deltaY=this.triger['delay-time']*100;
		}
		
		

		this.div.container.style.top=deltaY +"px";

		this.updateArrow(deltaX, deltaY);
	}else{//right now i only have a reson to override Y

		//***update the event and then gennerate new from that is what should happen
		if(this.parentEvent!=undefined){
			this.parentEvent.parent.updateDelay(this.id,deltaY_/100)
		}



		//update parent delay
		//this.parentScene.scene.targets

		this.div.container.style.top=deltaY_ +"px";

		

		this.updateArrow(deltaX, deltaY_);
		this.updateDelayArrow(deltaX, deltaY_);
	}
}
