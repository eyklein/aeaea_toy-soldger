function displayScenes(){


	console.log(scenes);

	document.getElementById('content').innerHTML = "";
	document.getElementById('top-bar').innerHTML = "";


	
	// 1. Create the button
	var button = document.createElement("button");
	button.innerHTML = "back to story";

	// 2. Append somewhere
	var topBar = document.getElementById("top-bar");
	topBar.appendChild(button);

	// 3. Add event handler
	button.addEventListener ("click", function() {
	  alert("go back to story");
	});
	// window.event()
	// event.preventDefault()

	


	for(let id in scenes){

		// console.log(scenes[id])
		// 1. Create the button
		let button = document.createElement("button");
		button.innerHTML = scenes[id].name;

		// 2. Append somewhere
		let topBar = document.getElementById("top-bar");
		topBar.appendChild(button);

		// 3. Add event handler
		button.addEventListener ("click", function() {
		  displayScene(scenes[id])
		});



	}

}
function clearContent(){
	document.getElementById('content').innerHTML = "";

}

// function updateArrow(){
// 	//set the placment of the container
// 	scene_.events[i].div.container.style.top=deltaY +"px";
// 	scene_.events[i].div.container.style.left=deltaX +"px";

// 	let deltaYArrow=deltaY - height ;
// 	let deltaXArrow=width;

// 	scene_.events[i].div.line.style.height=deltaYArrow + "px";
// 	scene_.events[i].div.line.style.width=deltaXArrow + "px";
// 	//move up
// 	scene_.events[i].div.line.style.top=-1*deltaYArrow + "px";

// 	scene_.events[i].div.line.innerHTML=getArrowSVG(deltaXArrow,deltaYArrow,refrenceLength.type);

		

// 	scene_.events[i].div.line.innerHTML=getArrowSVG(deltaXArrow,deltaYArrow,refrenceLength.type);
// }

function displayScene(scene_){
	clearContent()

	// console.log(scene_);


	//create a div for each event
	for(let i=0;i<scene_.events.length;i++){
		
		//document.getElementById('content').append(scene_.events[i].content.type)


		// 1. Create the button
		let eventDivContainer = document.createElement("div");
		eventDivContainer.classList.add("event-container");

		let eventDivIcon = document.createElement("div");
		eventDivIcon.classList.add("event-icon");

		let eventDivContent = document.createElement("div");
		eventDivContent.classList.add("event-content");
		eventDivContent.style.display = "none";

		let eventDivDragBar = document.createElement("div");
		eventDivDragBar.classList.add("draggable-bar");




		let eventDivTimeDelayDisplay = document.createElement("div");
		eventDivTimeDelayDisplay.classList.add("time-delay");


		let textTimeDelay = document.createElement("div");
		textTimeDelay.classList.add("time-delay-text");
		

		let svgTimeDelayArrow= document.createElementNS("http://www.w3.org/2000/svg", "svg");
		svgTimeDelayArrow.classList.add("time-delay-arrow");
		// svgTimeDelayArrow.innerHTML=delayArrowSVG(100)
		// eventDivContent.style.display = "none";

		eventDivTimeDelayDisplay.appendChild(svgTimeDelayArrow);
		eventDivTimeDelayDisplay.svg=svgTimeDelayArrow;

		eventDivTimeDelayDisplay.appendChild(textTimeDelay);
		eventDivTimeDelayDisplay.text=textTimeDelay;
		// svgTimeDelayArrow.innerHTML=delayArrowSVG(100);



		//specal for creating svgs on the fly inline
		let connectorLine= document.createElementNS("http://www.w3.org/2000/svg", "svg");
		connectorLine.classList.add("connector-line");
		




		// <svg width="500" height="500"><line x1="50" y1="50" x2="350" y2="350" stroke="black"/></svg>


		eventDivIcon.innerHTML = scene_.events[i].content.value;
		eventDivContent.innerHTML = '<p contentEditable="true">' + scene_.events[i].content.value + '</p>';


		eventDivContainer.appendChild(eventDivDragBar);
		eventDivContainer.appendChild(eventDivIcon);
		eventDivContainer.appendChild(eventDivContent);

		eventDivContainer.appendChild(eventDivTimeDelayDisplay);
		

		eventDivContainer.appendChild(connectorLine);

		//document.getElementById('content').appendChild(connectorLine);








		//eventDiv.classList.add("event")
		eventDivContainer.classList.add(scene_.events[i].content.type);
		eventDivIcon.classList.add(scene_.events[i].content.type);
		eventDivContent.classList.add(scene_.events[i].content.type);

		scene_.events[i].div={container:eventDivContainer,icon:eventDivIcon,content:eventDivContent,line:connectorLine,dragBar:eventDivDragBar,delayInfo:eventDivTimeDelayDisplay}

	}
	//place eace event div
	for(let i=0;i<scene_.events.length;i++){

		scene_.events[i].displayLogic();
		
	


		scene_.events[i].div.icon.addEventListener ("click", function() {
		  
		  if ( scene_.events[i].div.content.style.display === "none") {
		     scene_.events[i].div.content.style.display = "block";
		  } else {
		     scene_.events[i].div.content.style.display = "none";
		  }
		});

		scene_.events[i].div.dragBar.onmousedown = function(event) { // (1) start the process

			

			scene_.events[i].div.container.temp={}
			
			scene_.events[i].div.container.temp.screenYOnPress=event.pageY;
	  		scene_.events[i].div.container.temp.top=parseInt(scene_.events[i].div.container.style.top.replace('px',''));
	  		console.log("drag strted")
			// (2) prepare to moving: make absolute and on top by z-index
			//scene_.events[i].div.dragBar.style.position = 'absolute';
			scene_.events[i].div.dragBar.style.zIndex = 1000;
			// move it out of any current parents directly into body
			// to make it positioned relative to the body
			//document.body.append(ball);
			// ...and put that absolutely positioned ball under the pointer

			moveAt(event.pageX, event.pageY);

			// centers the ball at (pageX, pageY) coordinates
			function moveAt(pageX, pageY) {
			//scene_.events[i].div.dragBar.style.left = pageX - scene_.events[i].div.dragBar.offsetWidth / 2 + 'px';
			console.log(scene_.events[i].div.container.temp.top);
				scene_.events[i].updateDisplayLogic(null,(scene_.events[i].div.container.temp.top + pageY - scene_.events[i].div.container.temp.screenYOnPress))
				scene_.events[i].div.container.style.top = (pageY + scene_.events[i].div.container.temp.top -scene_.events[i].div.container.temp.screenYOnPress) + 'px';
			}

			function onMouseMove(event) {
				if(mouseIsPressed){//fail safe if mouse was relised but event not removed
					moveAt(event.pageX, event.pageY);
				}else{
					
					document.removeEventListener('mousemove', onMouseMove);
					scene_.events[i].div.dragBar.onmouseup = null;
					// document.removeEventListener('mousemove', event);
				}
			}

			// (3) move the ball on mousemove
			document.addEventListener('mousemove', onMouseMove);

			// (4) drop the ball, remove unneeded handlers
			window.onmouseup = function() {
				scene_.events[i].div.delayInfo.style.display="none";
				document.removeEventListener('mousemove', onMouseMove);
				scene_.events[i].div.dragBar.onmouseup = null;
			};

		};

		scene_.events[i].div.dragBar.ondragstart = function() {
		  return false;
		};







		scene_.events[i].div.icon.addEventListener("dragend", function(dragEvent_) {
		  
			scene_.events[i].div.container.temp.top=null;

		});


		scene_.events[i].div.content.addEventListener ("click", function() {
		 
		  
		    // scene_.events[i].div.content.style.display = "none";
		  
		});











	}



}



function pauseEvent(e){
    if(e.stopPropagation) e.stopPropagation();
    if(e.preventDefault) e.preventDefault();
    e.cancelBubble=true;
    e.returnValue=false;
    return false;
}


var mouseIsPressed=false;
document.onmousedown=function(){
	mouseIsPressed=true;
}
document.onmouseup=function(){
	mouseIsPressed=false;
}




