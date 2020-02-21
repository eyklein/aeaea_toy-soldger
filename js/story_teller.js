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
  	// console.log("starting a new scene : ")
  	// console.log(newScene_);
  	this.currentScene=scenes[newScene_];
  	this.path=this.path+"."+newScene_;
  	this.executeScene();
  }


  this.path="";
  this.newScene(startingScene_);
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
		console.log("error ***")
		console.log(resp)
	})



