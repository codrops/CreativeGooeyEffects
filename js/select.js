$(document).ready(function(){

	var $highlights=$(".selection-highlights")
		,$content=$(".selection-content")
		,itemsNum=20
	;

	$(document).mousedown(function(event){
		event.preventDefault();
	})
	for (var i = 0; i < itemsNum; i++) {
		var id="selection-check-"+i;
		var $checkbox=$("<input/>")
			.addClass("selection-checkbox")
			.attr("type","checkbox")
			.attr("id",id)
			.appendTo($highlights)
		;
		var $highlight=$("<div/>")
			.addClass("selection-highlight")
			.appendTo($highlights)
		;

		var $label=$("<label/>")
			.addClass("selection-item")
			.attr("for",id)
			.appendTo($content)

		var $imgContainer=$("<span/>")
			.addClass("selection-item-container")
			.appendTo($label)
		;

		var $img=$("<i/>")
			.addClass("fa fa-fw fa-image")
			.appendTo($imgContainer)

		// var $img=$("<div/>")
		// 	// .attr("src","http://lorempixel.com/150/150?"+i)
		// 	.appendTo($label)
		// ;

	};

	var toggleCheckboxHandler=function(event){
		var $checkbox=$("#"+$(this).attr("for"));
		$checkbox.prop("checked",!$checkbox.prop("checked"));
		$(this).attr("data-checked",$checkbox.prop("checked"));

	}

	//makes checkboxes selectable on mousedown
	$("label").on("touchstart",toggleCheckboxHandler);
	$("label").mousedown(toggleCheckboxHandler);

	$("label").click(function(event){
		event.preventDefault();
	})
})