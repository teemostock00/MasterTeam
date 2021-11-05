
//current position
var pos = 0;
//number of slides
var totalSlides = $('#slider-wrap ul li').length;
//get the slide width
var sliderWidth = $('#slider-wrap').width();


$(document).ready(function(){


    /*****************
    BUILD THE SLIDER
    *****************/
  //set width to be 'x' times the number of slides
  $('#slider-wrap ul#slider').width(sliderWidth*totalSlides);

    //next slide
  $('#next').click(function(){
    slideRight();
  });

  //previous slide
  $('#previous').click(function(){
    slideLeft();
  });



  /*************************
   //*> OPTIONAL SETTINGS
  ************************/
  //automatic slider
  var autoSlider = setInterval(slideRight, 3000);

  //for each slide
  $.each($('#slider-wrap ul li'), function() {

     //create a pagination
     var li = document.createElement('li');
     $('#pagination-wrap ul').append(li);
  });

  //counter
  countSlides();

  //pagination
  pagination();

  //hide/show controls/btns when hover
  //pause automatic slide when hover
  $('#slider-wrap').hover(
    function(){ $(this).addClass('active'); clearInterval(autoSlider); },
    function(){ $(this).removeClass('active'); autoSlider = setInterval(slideRight, 3000); }
  );



});//DOCUMENT READY



/***********
 SLIDE LEFT
************/
function slideLeft(){
  pos--;
  if(pos==-1){ pos = totalSlides-1; }
  $('#slider-wrap ul#slider').css('left', -(sliderWidth*pos));

  //*> optional
  countSlides();
  pagination();
}


/************
 SLIDE RIGHT
*************/
function slideRight(){
  pos++;
  if(pos==totalSlides){ pos = 0; }
  $('#slider-wrap ul#slider').css('left', -(sliderWidth*pos));

  //*> optional
  countSlides();
  pagination();
}




/************************
 //*> OPTIONAL SETTINGS
************************/
function countSlides(){
  $('#counter').html(pos+1 + ' / ' + totalSlides);
}

function pagination(){
  $('#pagination-wrap ul li').removeClass('active');
  $('#pagination-wrap ul li:eq('+pos+')').addClass('active');
}



/* 이미지 호출 */

$(document).ready(function(){
    $(".owl-carousel").owlCarousel();
});

/* 태그 */
$(document).ready(function () {
    var tag = {};
    var counter = 0;

    // 입력한 값을 태그로 생성한다.
    function addTag (value) {
        tag[counter] = value;
        counter++; // del-btn 의 고유 id 가 된다.
    }

    // tag 안에 있는 값을 array type 으로 만들어서 넘긴다.
    function marginTag () {
        return Object.values(tag).filter(function (word) {
            return word !== "";
        });
    }

    // 서버에 제공
    $("#tag-form").on("submit", function (e) {
        var value = marginTag(); // return array
        $("#rdTag").val(value);

        $(this).submit();
    });

    $("#tag").on("keypress", function (e) {
        var self = $(this);

        //엔터나 스페이스바 눌렀을때 실행
        if (e.key === "Enter" || e.keyCode == 32) {

            var tagValue = self.val(); // 값 가져오기

            // 해시태그 값 없으면 실행X
            if (tagValue !== "") {

                // 같은 태그가 있는지 검사한다. 있다면 해당값이 array 로 return 된다.
                var result = Object.values(tag).filter(function (word) {
                    return word === tagValue;
                })

                // 해시태그가 중복되었는지 확인
                if (result.length == 0) {
                    $("#tag-list").append("<li class='tag-item'>"+tagValue+"<span class='del-btn' idx='"+counter+"'>x</span></li>");
                    addTag(tagValue);
                    self.val("");
                } else {
                    alert("태그값이 중복됩니다.");
                }
            }
            e.preventDefault(); // SpaceBar 시 빈공간이 생기지 않도록 방지
        }
    });

    // 삭제 버튼
    // 인덱스 검사 후 삭제
    $(document).on("click", ".del-btn", function (e) {
        var index = $(this).attr("idx");
        tag[index] = "";
        $(this).parent().remove();
    });
})


// 추천서비스
function swiperTabindex(target, activeIndex){
	var slider = $(target),
	sliderActiveIndex = activeIndex,
	activeList = slider.find('.swiper-slide').eq(sliderActiveIndex),
	tabNode, siblingsNode;
	if(activeList.find('a').length){
		tabNode = activeList.find('a'),
		siblingsNode = activeList.siblings().find('a');
	}else{
		tabNode = activeList,
		siblingsNode = activeList.siblings();
	}
	siblingsNode.attr('tabindex', '-1')
	tabNode.attr('tabindex', '0')
}

// 해시태그
$('button.hastage-gwang').click(function(){
  if($(this).hasClass("active-gwang")){
      $(this).removeClass("active-gwang");
  }else{
      $(this).addClass("active-gwang");
  }
});

$('button.hastage-jeolla').click(function(){
  if($(this).hasClass("active-jeolla")){
      $(this).removeClass("active-jeolla");
  }else{
      $(this).addClass("active-jeolla");
  }
});

// 달력
function getSigungu() {

	$.ajax({
		url: mainurl+'/call',
		dataType: 'json',
		type: "POST",
		data: {
			cmd : 'RECOM_SIGUNGU_CODE'
		},
		success: function(data) {
			sigunguObj = data;
			areaListViewYN = 'Y';
		},
		complete: function() {

			if( areacode != 'All') {
				//선택한 지역 표시하기
				goAreaChoiceView(areacode);
			}

		},
		error: function(xhr, textStatus, errorThrown) {
		}
	});
}

//월 클릭시 ..
$(document).on("click","#monthlist li button",function(){
	var month = $(this).parents().attr('id');
//		selectListTopRemove();
	if( month == 'All') {
		selectMonthRemove();
		$(this).addClass('btn_all_active');
		$(this).attr('title','선택됨');
		smonth = 'All';
	} else {

		if( smonth == 'All') {
			selectAllMonthRemove();
			$(this).addClass('active');
			$(this).attr('title','선택됨');
		} else {
			if( $( this ).attr('class') == 'btn active' ) {
				$(this).removeClass('active');
				$(this).attr('title','');
			} else {
				$(this).addClass('active');
				$(this).attr('title','선택됨');
			}
		}

		smonth = '';

		$("#monthlist li button").each(function( index ) {
			if( $( this ).attr('class') == 'btn active' ) {
				if(smonth.length == 0 ) {
					smonth =  $(this).parents().attr('id');
				} else {
					smonth +=  ','+$(this).parents().attr('id');
				}
			}
		});
	}
	if(smonth.length == 0) {
		smonth = 'All';
		$('#monthlist #All button').addClass('btn_all_active');
		$('#monthlist #All button').attr('title','선택됨');
	}

	spage = 1;

	if( sOtdid != 'b55ffe10-84c3-11e8-8165-020027310001' ) {
		$('.box_rightType1').removeClass('on');
		$('body').css('overflow','');
	}

	getContentList();
});
