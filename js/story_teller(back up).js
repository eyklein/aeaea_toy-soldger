let scenes={};
var currentPlay;
let scenesDataTemp;

function loadScenes(scenesData_){
  for(let i=0; i<scenesData_.length;i++){
  	scenes[scenesData_[i].code]=new Scene(scenesData_[i])
  }
  return scenes;
  
}
function playStory(){
  
  
}
function Play(startingScene_){
  
  this.executeScene=function(){
  	for(let i=0;i<this.currentScene.events.length;i++){
  		if(this.currentScene.events[i].isSelfDrivenEvent){
  			this.currentScene.events[i].activate();
  		}
  	}
  }
  this.newScene=function(newScene_){
  	console.log("starting a new scene : ")
  	console.log(newScene_);
  	this.currentScene=scenes[newScene_];
  	this.path=this.path+"."+newScene_;
  	this.executeScene();
  }


  this.path="";
  this.newScene(startingScene_);
}

function Scene(sceneJson_){
	this.sceneData=sceneJson_;
	this.events=[];
	this.selfDrivenEventsIndexs=[];
	this.selfDrivenEvents=[];
	this.code=this.sceneData.code;
	this.name=this.sceneData.name;

	if(this.sceneData.events){
		for(event of this.sceneData.events){
			
			this.events.push(new Event(event,this))

			//this.events[this.events.length-1].logContent();
		}
	}

	this.getName=function(){
		return this.sceneData.name;
	}
	this.setSelfDrivenEvents=function(){

	}

}

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

	this.getRefrenceLength = function(){
	//console.log("time ---------------------- " + time_);

		if(this.["parentEvent"]==null){
			// console.log(event_)
			// console.log(" has no parrent it time delay is " +event_["time"]  + " the depth count is :" +counter_);
			console.log("this is a top level event: " + this.name);
			
			//return {topEvent: event_,time:event_["triger"]["time"]+ time_,counter_};
			return {time:this.["triger"]["time"],parent: null,type:"self-driven"};
		}else{
			
			// console.log(event_["parentEvent"]);
			return {time:this.["parentEvent"]["length"],parent: this.["parentEvent"]["parent"],type:event_["parentEvent"]["type"]};
			//getLength(event_["parentEvent"]["parent"], event_["parentEvent"]["length"] + time_, counter_+1) //recurtion add this time delay to the time delay and return when you hit the top
		}
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
			document.getElementById("main_text").innerHTML = document.getElementById("main_text").innerHTML + self.content.value;
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

		
		for(let i=0;i<this.targets.length;i++){

			if(!isNaN(this.targets[i].id)){//if target is numbers it is an event if it is letters it is a new scene // returns true if it starts with numbers
			
				if(this.targets[i].type=="time"){//if time trigger
				
					let targetEvent=this.getTargetEvent(this.targets[i].id);

					targetEvent.parentEvent={
						parent:this,
						type:"time",
						length:this.targets[i].delay
						}; //add this as a parent event so we can track backwards as well as forwards
					

					if(targetEvent != null){
						setTimeout(function(targetEvent_){
							targetEvent_.activate();

						}, this.targets[i].delay*1000, targetEvent);
					}else{
						console.log("timed target does not exsist");

					}
				
				}
				else if(this.targets[i].type=="click"){
					let targetEvent=this.getTargetEvent(this.targets[i].id);


					targetEvent.parentEvent={
							parent:this,
							type:"click",
							length:this.targets[i].delay
							}; //add this as a parent event so we can track backwards as well as forwards



					if(targetEvent != null){
						console.log(this.parentScene.code+'_'+this.id)
						let clickableObject=document.getElementById(this.parentScene.code+'_'+this.id);
						clickableObject.targetEvent=this.getTargetEvent(this.targets[i].id);

						console.log(" adding clickable object : " + this.targets[i].id)
						console.log(clickableObject.targetEvent)
						clickableObject.addEventListener("click", function(clickEvent){
							console.log(clickEvent.target);
							console.log(clickEvent.target.targetEvent);

							clickEvent.target.targetEvent.activate();
						});
					
					}
				}
			}
			else{//is leters
					console.log("target new scene   : "+ this.targets[i].id);
					currentPlay.newScene(this.targets[i].id);
					

			}
		}

	}
	


	this.activateTargets=function(){
		
		for(let i=0;i<this.targets.length;i++){

			if(!isNaN(this.targets[i].id)){//if target is numbers it is an event if it is letters it is a new scene // returns true if it starts with numbers
			
				if(this.targets[i].type=="time"){//if time trigger
				
					let targetEvent=this.getTargetEvent(this.targets[i].id);

					targetEvent.parentEvent={
						parent:this,
						type:"time",
						length:this.targets[i].delay
						}; //add this as a parent event so we can track backwards as well as forwards
					

					if(targetEvent != null){
						setTimeout(function(targetEvent_){
							targetEvent_.activate();

						}, this.targets[i].delay*1000, targetEvent);
					}else{
						console.log("timed target does not exsist");

					}
				
				}
				else if(this.targets[i].type=="click"){
					let targetEvent=this.getTargetEvent(this.targets[i].id);


					targetEvent.parentEvent={
							parent:this,
							type:"click",
							length:this.targets[i].delay
							}; //add this as a parent event so we can track backwards as well as forwards



					if(targetEvent != null){
						console.log(this.parentScene.code+'_'+this.id)
						let clickableObject=document.getElementById(this.parentScene.code+'_'+this.id);
						clickableObject.targetEvent=this.getTargetEvent(this.targets[i].id);

						console.log(" adding clickable object : " + this.targets[i].id)
						console.log(clickableObject.targetEvent)
						clickableObject.addEventListener("click", function(clickEvent){
							console.log(clickEvent.target);
							console.log(clickEvent.target.targetEvent);

							clickEvent.target.targetEvent.activate();
						});
					
					}
				}
			}
			else{//is leters
					console.log("target new scene   : "+ this.targets[i].id);
					currentPlay.newScene(this.targets[i].id);
					

			}
		}

	}
	this.getTargetEvent=function(idName_){
		for(let i=0;i<this.parentScene.events.length;i++){
			// console.log(this.parentScene)
			// console.log(this.parentScene.events[i].id +" ??==?? " +idName_);
			if(this.parentScene.events[i].id==idName_){
				return this.parentScene.events[i];
			}
		}
		return null;
	}

	this.logContent=function(){
		console.log(this.eventData.content.value);
	}



	

}
function changeMainTextLocationLeft(left_){
	document.getElementById("main_text").style.left = left_+"px";
}
function changeMainTextLocationTop(top_){
	document.getElementById("main_text").style.top = top_+"px";
}
function changeMainTextLocation(left_,top_){
	
	document.getElementById("main_text").style.left = left_+"px";
	document.getElementById("main_text").style.top = top_+"px";
}

function clearMainText(){
	document.getElementById("main_text").innerHTML = "";
}



// let d = new Date();
// document.body.innerHTML = "<h1>Today's date is " + d + "</h1>";




fetch("json/scenes.json")
	.then(function(resp){
		return resp.json();
	}).then(function(data){
		//console.log(data.scenes)
		scenesDataTemp=data.scenes
		scenes=loadScenes(data.scenes);
		// console.log(scenes)
		currentPlay = new Play("aa");//start reading from first scene
		// console.log(currentPlay)
		//currentPlay.start();
		// reading.start();
	}).catch(function(resp){
		console.log("error reading json file :"+ resp)
	})



// function createElements(elements) {
// 	console.log(elements.currentTarget.response)
//     // Assuming you get an array of objects.
//     // elements = JSON.parse(elements);

//     // elements.forEach(funciton (element){
//     //     var div = document.getElementById(element.id);
//     //     div.innerHTML = element.text;
//     // });
// }

// var request = new XMLHttpRequest();

// request.onload = createElements;
// request.open("get", "json/scenes.json", true);
// request.send();