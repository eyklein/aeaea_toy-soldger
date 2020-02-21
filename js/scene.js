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

		}


		//link events to eachother so that we can find the parent
		for(let i=0; i<this.events.length;i++){
			this.events[i].linkTargets();
		}
		
	}





	this.getName=function(){
		return this.sceneData.name;
	}
	this.setSelfDrivenEvents=function(){

	}

}
Scene.prototype.setCleanJSON=function(){
	this.JSON={}
	this.JSON.name=this.name;
	this.JSON.code=this.code;


}
