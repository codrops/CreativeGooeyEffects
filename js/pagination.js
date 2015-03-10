$(document).ready(function(){
	var $dots=$(".pagination-dot")
		,$current=$(".pagination-current")
		,$items=$(".pagination-item")

		,spacing=parseFloat($dots.css("width"))+(parseFloat($dots.css("marginLeft"))*2)
		,halfSpacing=spacing/2
		,startPos

		,itemsSpacing=450
		,lastItem=0
		,lastItemR=0
		,lastTime=Date.now()
	;

	startPos=$dots.eq(0).position().left;
	$current.data("pos",{x:startPos});
	
	$dots.click(function(event){
		var $cur=$(this);
		
		var dest=($cur.index())*spacing;
		TweenMax.to($current.data("pos"),0.6,{
			x:startPos+dest,
			onUpdate:updatePos,
			onComplete:updatePos,
			ease:Quint.easeOut
			// ease:Elastic.easeOut,
			// easeParams:[1.1,0.6]
		});
	});
	$dots.eq(0).click();

	$items.click(function(){
		$dots.eq($(this).index()).click();
	});
	var dragging=false;
	var startDrag={x:0,y:0};

	function updatePos(){
		var pos=$current.data("pos").x-startPos;
		var scale=pos%spacing;
	    if(scale>halfSpacing){
	      scale=halfSpacing-(scale-halfSpacing);
	    }
	    scale=1-((scale/halfSpacing)*0.35);
	    TweenMax.set($current,{
	    	x:pos+startPos,
	    	scale:scale*1.4,
	    	force3D:true
	    });	

	    var curItem=pos/spacing,
	    	curItemR=Math.round(curItem)
	    ;
	    $items.each(function(i){
	    	var visible=i==curItem;

	    	var $cur=$(this)
	    		,d=i-curItem
	    		,dAbs=Math.abs(d)
	    	;
	    	TweenMax.set($cur,{
	    		x:d*(itemsSpacing*(0.5/(dAbs+1))),
	    		scale:1-(0.2*dAbs*(1/(dAbs+1))),
	    		zIndex:$items.length-Math.abs(i-curItemR),
	    		cursor:visible?"auto":"pointer",
	    		force3D:true
	    	})
	    	TweenMax.set($cur.children(".pagination-shadow"),{
	    		scale:1-(0.08*dAbs*(1/(dAbs+1))),
	    		opacity:0.6+(1*dAbs*(1/(dAbs+1))),
	    		force3D:true
	    	})
	    	$cur.children(".pagination-fade").css({
	    		// opacity:dAbs*0.5
	    		opacity:(0.6-(0.6*Math.max(0,1-dAbs)))+(dAbs*0.1)
	    	})

	    	TweenMax.set($dots.eq(i).children(".pagination-number"),{
	    		scale:Math.max(0,1-(2*dAbs)),
	    		force3D:true
	    	})
	    })
	    var now=Date.now();
	    var diff=now-lastTime;
	    var deltaTime=diff/(1000/60);
	    lastTime=now;
	    if(lastItemR!=curItemR){
	    	var $bounceDot=$dots.eq(lastItemR)
	    	TweenMax.to($bounceDot,0.1,{
	    		x:70*((curItem-lastItem)/deltaTime),
	    		ease:Quad.easeOut,
	    		onComplete:function(){
	    			TweenMax.to($bounceDot,1,{
	    				x:0,
	    				ease:Elastic.easeOut,
	    				easeParams:[1.1,0.5]
	    			})
	    		}
	    	})
	    }
	    lastItem=curItem;
	    lastItemR=curItemR;
	}
})