(function(){

	//variable de configuration
	var padding = {
		top:21,
		right:21,
		bottom:21,
		left:21
	};

	//variable de fonctionnement
	var canvas,
		box
		grid={},
		tab_total_gap=[];

	//fonction de lancement
	window.initBlueGrid = function (_box){
		box = _box;
		canvas = document.createElement('canvas');
		ctx = canvas.getContext('2d');
		initCanvas(box);
		initElmt();
		box.prepend(canvas);
		
		$(window).resize(function(){
			initCanvas(box);
			initElmt();
		});
	}

	
	//fonction de construction
	function initCanvas(box){


		/* Création du canvas */
		canvas.height = box.innerHeight();
		canvas.width = box.innerWidth();
		h= canvas.height - padding.bottom;
		w= canvas.width - padding.left;
		/**/


		/* Grille : divsion vertical et Horizontal */
		grid.H=initGrid(padding.left, 42, h, false, styleBold);
		grid.W=initGrid(padding.top, 63, w, true, styleBold);
		/**/

		/* Grille : SOUS-divsion vertical et Horizontal */
		for(var i=0; i<grid.H.length-1; i++){
			initGrid(grid.H[i], 7, grid.H[i+1], false, styleLight).draw();
		}
		for(var i=0; i<grid.W.length-1; i++){
			initGrid(grid.W[i], 7, grid.W[i+1], true, styleLight).draw();
		}
		/**/
		
		/* Dessin des lignes principales */
		//ils sont placés à la fin pour être au dessus des sous-divsion
		grid.W.draw();
		grid.H.draw();
		/**/		
	}
	
	function initGrid(start, unit, _space, _vertical, style){
		var grid, unit, division, remainder, px, counter, gap, total_gap, space;
		space=_space-start;
		grid=new Array();
		grid.vertical=_vertical;
		
		grid.max=function(){
			var max=Math.round(space/unit);
			grid.remainder=space-max*unit;
			max=max+1;
			return max;
		}();
		division=truncate(grid.remainder/grid.max);
		
		remainder=grid.remainder-division*grid.max;
		grid.splice(0, grid.length);
		grid[0]=start;
		px=0;
		counter=0;
		

		for(var i=1;i<grid.max;i++){
			if(counter<Math.abs(remainder)){
				gap=remainder/Math.abs(remainder);
			}else{
				gap=0;
			}
			
			total_gap=gap+division;
			tab_total_gap.push(total_gap);
			px=grid[i-1]+unit+total_gap;
			grid.style=style;
			grid[i]=px;
			counter++;
		}
		grid.draw=draw;

		return grid;
	}

	function draw(){
		var vertical=this.vertical;
		//ctx.translate(0.5, 0.5);
		for(var i=0;i<=this.max;i++){
			this.style(ctx)
			ctx.beginPath();
			if(vertical){
				ctx.moveTo(this[i]+0.5, padding.top+0.5);
				ctx.lineTo(this[i]+0.5, grid.H[grid.H.length-1]+0.5);
			}else{
				ctx.moveTo(padding.left, this[i]+0.5);
				ctx.lineTo(grid.W[grid.W.length-1]+0.5, this[i]+0.5);
			}
			ctx.closePath();
		}
	}
	function truncate(n) {
	  return n | 0; // bitwise operators convert operands to 32-bit integers
	}
	/*
	ctx.beginPath();
	ctx.moveTo(i, 0);
	ctx.lineTo(i, h);
	ctx.closePath();
	/**/

	function styleLight(ctx){
		
		ctx.stroke();
		ctx.lineWidth = 1;
		
		//ctx.strokeStyle = '#f2f2f2';
		ctx.strokeStyle ='#3392ec';
	}
	function styleBold(ctx){
		ctx.stroke();
		ctx.lineWidth = 1;
		
		//ctx.strokeStyle = '#e0e0e0';
		ctx.strokeStyle ='#68abf2';
		
	}

	function initElmt(){
		var top, left, width, height;

		//Header <header>
		top = grid.H[0];
		left = grid.W[0];
		height = grid.H[2] - grid.H[0];
		width = grid.W[4] - grid.W[0];
		
		box.find('header, .header').css({
			'top':top,
			'left':left,
			'height': height,
			'width': width,
			'line-height' : height+'px'
		})

		//Footer <footer>
		top = grid.H[grid.H.length-5];
		left = grid.W[0];
		height = grid.H[grid.H.length-1] - grid.H[grid.H.length-5];
		width = grid.W[4] - grid.W[0];
		
		box.find('footer, .footer').css({
			'top':top,
			'left':left,
			'height': height,
			'width': width
		})

	
	}
})();
