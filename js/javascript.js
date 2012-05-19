var lastScroll=0;
var docViewTop;
var dif;
var isCommentsVisible=false;


$(window).scroll( function() {
	
	docViewTop = $("body").scrollTop();
	dif = docViewTop-lastScroll;
	lastScroll = docViewTop;
	
	scroll();
});

function scroll(){
	move(".opinator-logo",2,"27%",-200);
	
	move(".profile",-.5,"center",320);
}

function move(elem,vel,left,offset){
	var parent=$(elem).parent();
	
	var docViewBottom = docViewTop + $(window).height();
	var middlePoint=((docViewBottom-docViewTop)/2)+docViewTop;

	var elemTop = $(parent).offset().top;
	var elemBottom = elemTop + $(parent).height();
	
	var dif=docViewTop-elemTop;
	
	var number = 0-(dif*vel)+offset;
	$(elem).css("backgroundPosition",left+" "+number+"px");
	
}

function moveText(elem,vel,min,max,offset,top){
	var last=parseInt($(elem).css("top"),10);
	
	
	
	
	if(number<min || top > docViewTop ){
		$(elem).css("top",min+"px");
	}else if (number > max ) {
		$(elem).css("top",max+"px");
	}else {
		$(elem).css("top",number+"px");
	}
	
}

function showHideComments(){
	if(isCommentsVisible){
		// hide	
		$('#comments-title').animate({
				left:-33
		 	},250,function(){
			
				$('#comments').animate({
						width:0
			  		}, 1000,function(){ 
						$('#comments-title').animate({
								left:-80
							},1000);
				});
		  });
		isCommentsVisible = false;
	} else {
		// show	
		$('#comments-title').animate({
				left:-33
		 	},250,function(){
			
				$('#comments').animate({
						width:420
			  		}, 1000,function(){ 
						$('#comments-title').animate({
								left:-80
							},1000);
				});
		  });
		  
		
		isCommentsVisible = true;
	}
}


$().ready(function(){
	$(  ".theword"  ).airport( ['music', 'coding', 'user interfaces', 'design' , 'photography' , 'films' , 'tv shows' , 'android' , 'iphone' , 'google','apple'] );
});