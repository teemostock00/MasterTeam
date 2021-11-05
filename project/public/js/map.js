
$(document).ready(function(){
    $('#myModal').show();
});
function close_pop(flag) {
    $('#myModal').hide();
}

// 이미지 업로드 기능
const browseBtn = document.querySelector('.browse-btn');
const realInput = document.querySelector('.hidden-input')

browseBtn.addEventListener('click', function(){
    realInput.click();
});

function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            $('.image-upload-wrap').hide();
            $('.file-upload-image').attr('src', e.target.result);
            $('.file-upload-content').show();
            $('.image-title').html(input.files[0].name);
        };
        reader.readAsDataURL(input.files[0]);
    } else {
        removeUpload();
    }
}

function removeUpload() {
    $('.file-upload-input').replaceWith($('.file-upload-input').clone());
    $('.file-upload-content').hide();
    $('.image-upload-wrap').show();
}
$('.image-upload-wrap').bind('dragover', function () {
    $('.image-upload-wrap').addClass('image-dropping');
});
$('.image-upload-wrap').bind('dragleave', function () {
    $('.image-upload-wrap').removeClass('image-dropping');
});

// 예측 코드
const URL = "https://teachablemachine.withgoogle.com/models/MirojN-2M/";
let model, labelContainer, maxPredictions;
// Load the image model and setup the webcam
async function predict() {
    const modelURL = URL + "model.json";
    const metadataURL = URL + "metadata.json";
    // load the model and metadata
    // Refer to tmImage.loadFromFiles() in the API to support files from a file picker
    // or files from your local hard drive
    // Note: the pose library adds "tmImage" object to your window (window.tmImage)
    model = await tmImage.load(modelURL, metadataURL);
    maxPredictions = model.getTotalClasses();
    labelContainer = document.getElementById("label-container");

    for (let i = 0; i < maxPredictions; i++) { // and class labels
        labelContainer.appendChild(document.createElement("div"));

    }

    var image = document.getElementById("face-image");
    const prediction = await model.predict(image, false);
    var maxpre = [];
    for (let i = 0; i < maxPredictions; i++) {
        const classPrediction =
            prediction[i].className + ": " + prediction[i].probability.toFixed(2);
            console.log(prediction[i].className)
            maxpre.push(prediction[i].probability)
        // labelContainer.childNodes[i].innerHTML = classPrediction;
    }
    console.log(maxpre);
    const max = maxpre.indexOf(Math.max(...maxpre));
    console.log(max);
    labelContainer.innerHTML = prediction[max].className;

    axios.post("http://localhost:3000/map/food",{
        "food":prediction[max].className
    }).then((response)=>{
        console.log(response.data[0]);
            $("#main_pic").attr("src", response.data[0].food_img);
            $('.food-content').text(response.data[0].food_content)

    })

    $('#myModal').hide();
}




// 위치 표기
var locations = [
    ['동원 게장 백반', 35.1491293, 126.9424985],
    ['광주 두꺼비 게장 백반', 35.1639897, 126.9024887],
    ['민들레', 35.1499714, 126.8533361],
    ['백년미가 유촌점', 35.1654719, 126.8529967]
]

// body tag가 불러와진 후 로딩하는 함수
window.onload = function initMap() {
    // 광주 경도 위도 -> 지도가 뜨는 위치
    const gwangju = { lat: 35.1595454 ,lng: 126.8526012};
    var map = new google.maps.Map(document.querySelector('.map'), {
        zoom: 14,
        center: gwangju
    });

    // 아이콘 이미지 변경
    const icon =  {
        url : '../img/Fin.png',
        size : new google.maps.Size(50,50),
        origin : new google.maps.Point(0,0),
        anchor : new google.maps.Point(25,50),
        scaledSize : new google.maps.Size(50,50),
    };

    var infowindow = new google.maps.InfoWindow();

    var marker, i;

    for (i = 0; i < locations.length; i++) {
        marker = new google.maps.Marker({
            position: new google.maps.LatLng(locations[i][1], locations[i][2]),
            icon : icon,
            map: map
        });

        google.maps.event.addListener(marker, 'click', (function(marker, i) {
            return function() {
                infowindow.setContent(locations[i][0]);
                infowindow.open(map, marker);
            }
        })(marker, i));
    }
}
