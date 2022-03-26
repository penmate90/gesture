prediction="";


Webcam.set({
    height : 300,
    width : 300,
    image_format : "png",
    png_quality: 90

}   
);
camera=document.getElementById("camera")
Webcam.attach("#camera");
function take_pic() {
    document.getElementById("pred").innerHTML="";
    document.getElementById("label").innerHTML=""


    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML= "<img src="+data_uri+" id='snapshot'>";
    })
}
classify=ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/YW5BBgNK_/model.json", modelLoaded);

function modelLoaded() {
    console.log("ml5 version - "+ml5.version);
}
function speak() {
   var speech=window.speechSynthesis;
    say="The prediction is"+prediction;
        utterThis=new SpeechSynthesisUtterance(say);
    speech.speak(utterThis);
}

function show_pic() {
    img= document.getElementById("snapshot")
    if (img== null) {
        var speech=window.speechSynthesis;
      alarm= "first take a picture";
    utterThis=new SpeechSynthesisUtterance(alarm);
    speech.speak(utterThis);
    } else {
        classify.classify(img, gotResult)
    }
    
}

function gotResult(error, result) {
    if (error) {
       console.error(error);
    } else {
        prediction= result[0].label;
    
        console.log(result);
        document.getElementById("pred").innerHTML=prediction;
            
        speak();
        


 


        if (prediction== "best") {
            document.getElementById("pred").innerHTML="&#128077;";
            document.getElementById("label").innerHTML="All the best!"

            
            
        }
        else if (prediction== "amazing") {
            document.getElementById("pred").innerHTML="&#128076;";
            document.getElementById("label").innerHTML="This looks amazing!"
            
           
        }
        else if (prediction== "victory") {
            document.getElementById("pred").innerHTML="&#9996;";
            document.getElementById("label").innerHTML="VICTORYYYYYYY!!!!!"

            
        }
       

            
        }
    }
