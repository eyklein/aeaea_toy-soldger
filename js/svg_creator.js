function getArrowSVG(deltaX_,deltaY_,strokeThickness_,type_){
	let arrowSize=10;
	//console.log(deltaY_);
	if(deltaY_>20){//is there room in the vertical direction to make a curvy arrow
		if(deltaX_>=20){//is there enogh room in the x direction
			xStart=strokeThickness_/2;
			yStart=0;
			lineV1=(deltaY_ - 20)/2;

			ridius1=10;

			ridius2=10;

			lineH1=deltaX_-ridius1-ridius2;

			lineV2=deltaY_-lineV1-ridius1-ridius2;

			return '<path class="'+type_+'" d="m '+xStart+' '+yStart+'  ' + //starting piont
				'l '+0+' '+ lineV1 +' ' + //vertical line
				' q '+0+' ' + ridius1  + ' ' + ridius1  + ' ' + ridius1  + ' ' + //curve down and right
				'l '+lineH1+' '+ 0 +' ' + //horizontal line
				'q ' +  ridius2 + ' '+ 0 + ' ' +  ridius2 + ' '+ridius2+ ' ' + //curve down
				'l '+0+' '+lineV2+//vertical line
				'l'+-arrowSize +' '+-arrowSize+
				//'L'+(deltaX_-arrowSize)+' '+(deltaY_-arrowSize)+  //should be same as above line
				' "' + 
				' style="stroke-width:4;fill:none;" />';

		}else if(deltaX_<=-20){//negative x direction. is this posible in the logic? also the entire svg needs to move over because it will be outside the frame
			ridius1=10;

			ridius2=10;

			lineH1=deltaX_-ridius1-ridius2;

			lineV2=deltaY_-ridius1-ridius2;
		}
		else{//straight arrow
			ridius1=deltaX_/2;

			ridius2=deltaX_/2;

			lineH1=deltaX_-ridius1-ridius2;

			lineV2=deltaY_-ridius1-ridius2;
		}
	}else if(deltaY_>0){

		xStart=strokeThickness_/2;
		yStart=0;

		

		ridius1=10;
		lineV1=deltaY_-ridius1;

		// ridius2=10;

		lineH1=deltaX_-ridius1;

		// lineV2=deltaY_-lineV1-ridius1+ridius2;


		return '<path class="'+type_+'" d="m '+xStart+' '+yStart+'  ' + //starting piont
			'l '+0+' '+ lineV1 +' ' + //vertical line
			' q '+0+' ' + ridius1  + ' ' + ridius1  + ' ' + ridius1  + ' ' + //curve down and right
			'l '+lineH1+' '+ 0 +' ' + //horizontal line
			// 'q ' +  ridius2 + ' '+ 0 + ' ' +  ridius2 + ' '+-1*ridius2+ ' ' + //curve up
			// 'l '+0+' '+lineV2+//vertical line
			'l'+-arrowSize +' '+-arrowSize+
			//'L'+(deltaX_-arrowSize)+' '+(deltaY_-arrowSize)+  //should be same as above line
			' "' + 
			' style="stroke-width:4;fill:none;" />';
	}

	else if(deltaY_<=0){

		xStart=strokeThickness_/2;
		yStart=-1*deltaY_;

		lineV1=0;

		ridius1=10;

		ridius2=10;

		ridius3=10;


		lineH1=deltaX_-ridius1-ridius2-ridius3;

		lineV2=deltaY_-lineV1-ridius1+ridius2+ridius3;


		return '<path class="'+type_+'" d="m '+xStart+' '+yStart+'  ' + //starting piont
			'l '+0+' '+ lineV1 +' ' + //vertical line
			' q '+0+' ' + ridius1  + ' ' + ridius1  + ' ' + ridius1  + ' ' + //curve down and right
			'l '+lineH1+' '+ 0 +' ' + //horizontal line
			'q ' +  ridius2 + ' '+ 0 + ' ' +  ridius2 + ' '+-1*ridius2+ ' ' + //curve up
			'l '+0+' '+lineV2+//vertical line
			// 'l'+-arrowSize +' '+-arrowSize+
			'q ' +  0 + ' '+-1*ridius3 + ' ' +  ridius3 + ' '+-1*ridius3+ ' ' + //curve up
			//'L'+(deltaX_-arrowSize)+' '+(deltaY_-arrowSize)+  //should be same as above line
			' "' + 
			' style="stroke-width:4;fill:none;" />';
	}
	
	if(type_==null){
		type_="none";
	}
}



function delayArrowSVG(height_){

	let arrowSize =5;
	//if(height_>0){
		

		return '<path class="'+'delay-arrow-top'+'" d="m '+0+' '+arrowSize+'  ' + //starting piont left side
				'l '+arrowSize+' '+ -arrowSize +' ' + // arrow point
				'l '+arrowSize+' '+ arrowSize +' ' + //right side
				'l '+-arrowSize+' '+ -arrowSize +' ' + // back to arrow point
				'l '+0+' '+ height_ +' ' + // shaft
				'l '+-arrowSize+' '+ -arrowSize +' ' + // arrow point
				'l '+arrowSize+' '+ arrowSize +' ' + // back to pint
				'l '+arrowSize+' '+ -arrowSize +' ' + //right side


				'" style="stroke-width:2;fill:none;" />';

		// return '<path class="'+'delay-arrow-top'+'" d="m '+0+' '+arrowSize+'  ' + //starting piont left side
		// 		'l '+arrowSize+' '+ -arrowSize +' ' + // arrow point
		// 		'l '+arrowSize+' '+ arrowSize +' ' + //right side
		// 		' style="stroke-width:2;fill:none;" />'+
		// 		'<path class="'+'delay-arrow-shaft'+'" d="m '+arrowSize+' '+0+'  ' + //starting piont for shaft
		// 		'l '+0+' '+ height_ +' ' + // shaft
		// 		' style="stroke-width:2;fill:none;" />'+
		// 		'<path class="'+'delay-arrow-bottom'+'" d="m '+0+' '+height_-arrowSize+'  ' + //starting piont left side
		// 		'l '+arrowSize+' '+ arrowSize +' ' + // arrow point
		// 		'l '+arrowSize+' '+ -arrowSize +' ' + //right side
		// 		' style="stroke-width:2;fill:none;" />'
		// 		;



				
	//}
	


}