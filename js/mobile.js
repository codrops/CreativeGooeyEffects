$(document).ready(function(){
	var $menuButton=$(".menu-toggle-button")
		,$items=$(".menu-toggle-button, .menu-item")


		,curItem=-1
		,dragging=false
		,dragStart=null

		,itemsSpacing=70
	;

	$menuButton.on("mousedown touchstart",function(event){
		dragging=true
		dragStart={x:event.pageX,y:event.pageY};
	});
	$(document).on("mousemove touchmove",function(event){
		if(dragging){
			var pos={x:event.pageX,y:event.pageY};
			var dist=pos.y-dragStart.y;
			$items.each(function(i){
				var $cur=$(this);
				var j=$items.length-i-1;
				var maxPos=-itemsSpacing*j;
				var destPos=Math.max(dist,-itemsSpacing*j);
				if(dist>=maxPos){
					curItem=j;
				}
				var destScale=1-Math.min((Math.max(0,(-dist+maxPos))*0.006),0.4);
				TweenMax.set($cur,{
					y:destPos,
					scale:destScale
				});
				TweenMax.set($cur.children(".menu-icon"),{
					scale:destScale*destScale
				})
			});
		}
		// TweenMax.to($items,0.2,{
		// 	background:"#ccc"
		// })
		// TweenMax.to($items.eq(curItem),0.2,{
		// 	background:"blue"
		// })
	});
	$(document).on("mouseup touchend",function(event){
		if(dragging){
			dragging=false;
		}
	});
});