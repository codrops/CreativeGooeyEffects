$(document).ready(function(){
	var $cover=$(".player-cover")
		,$bars=$(".player-spectrum-bar")
		,$drops=$(".player-drops")
		,$spectrum=$(".player-spectrum")

		,paused=false

		,barWidth=$bars.width()
		,barHeight=$bars.height()

		,coverPos=$cover.position()
		,coverSize=$cover.width()
		,coverCenter=coverPos.left+(coverSize/2)
		,coverRadius=coverSize/2

		,spectrumPos=$spectrum.position().top
		,spectrumMargin=parseFloat($spectrum.css("marginTop"))
		,dropsPos=$drops.position()
		,distanceCoverFromDrops=dropsPos.top-coverPos.top-coverSize
	;
	
	$.fn.animBar=function(v){
		var $bar=$(this);

		var min=0.1;
		var setV=true
		if(typeof v=="undefined"){
			v=min+(Math.random()*(1-min));
			setV=false;
		}else{
			// v=Math.max(min,v)
		}
		
		if(v>parseFloat($bar.attr("data-scale")) && v>min){
			TweenMax.to($bar,v*(setV?0.6:0.2),{
				scaleY:v,
				attr:{
					"data-scale":v
				},
				ease:Quad.easeOut,
				onComplete:function(){
					TweenMax.to($bar,v*0.6,{
						scaleY:0.1,
						attr:{
							"data-scale":0.1
						},
						ease:Quad.easeIn,
						onComplete:function(){
							$bar.animBar(v*0.5)
						}
					});
				},
				onUpdate:function(){
					$bar.checkCoverDrops()
				}
			});

		}
		if(!setV && !paused){
			setTimeout(function(){
				$bar.animBar()
			},Math.random()*500);
		}
	}
	$.fn.checkCoverDrops=function(){
		var $bar=$(this);

		var barPos=$bar.position();

		if(barPos.left+(barWidth/2)>=coverPos.left && barPos.left-(barWidth/2)<=coverPos.left+coverSize){
			var scale=parseFloat($bar.attr("data-scale"));
			var size=scale*barHeight;
			if(size>=distanceCoverFromDrops){
				var peak={
					top:size-distanceCoverFromDrops,
					left:barPos.left+(barWidth/2)
				}
				var dx=peak.left-coverCenter;
				var dy=peak.top-coverRadius;
				var distance=Math.sqrt((dx*dx)+(dy*dy));
				if(distance<coverRadius-5){
					addDrop(barPos.left)
				}
			}
		}
	}
	function addDrop(x){
		var $drop=$("<div/>")
			.addClass("player-drop")
			.css({
				left:x,
				top:dropTopPos(x)
			})
			.appendTo(".player-drops")
		;
		var distanceFromCenter=coverCenter-(x+(barWidth/2));
		TweenMax.to($drop,Math.abs(distanceFromCenter)*0.06,{
			x:distanceFromCenter,
			y:Math.abs(distanceFromCenter)*0.3,
			ease:Quint.easeInOut,
			force3D:true,
			onComplete:function(){
				$drop.addClass('player-drop-ready')
				TweenMax.to($drop,1,{
					scaleY:1.5,
					ease:Quad.easeInOut
				})
			}
		})

	}
	function dropDrops(){
		var $readyDrops=$(".player-drop-ready");
		TweenMax.to($readyDrops,0.4,{
			delay:0.2,
			y:distanceCoverFromDrops,
			scaleY:4,
			scaleX:0.5,
			force3D:true,
			ease:Quint.easeIn,
			onComplete:function(){
				$readyDrops.remove();
			}
		})
	}
	setInterval(dropDrops,1000);

	function dropTopPos(x){
		return -distanceCoverFromDrops-(Math.abs((x+(barWidth/2))-coverCenter)*0.314)
	}

	function start() {
		$bars.each(function(){
			var $cur=$(this);
			$cur.attr("data-scale",0.5);
			TweenMax.set($cur,{
				scaleY:0
			});
			$cur.animBar();
		})
	}

	start();

	$(".play-pause-button").click(function(){
		paused=!paused;
		if(!paused) {
			start();
		}
	})
})