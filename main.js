img="";
object=[];
status="";
alarm="";

function preload() 
{
    alarm = loadSound("nice_tone_2010.mp3");
}

function play()
{
	alarm.play();
}

function setup() 
{
    canvas = createCanvas(380, 380);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(380, 380);
    video.hide();
    objectDetector = ml5.objectDetector('cocossd', modelLoded);
    document.getElementById("status").innerHTML = "Status: Detecting Baby";
}

function modelLoded() 
{
    console.log("Model is Loaded!");
    status = true;
}

function gotResult(error, results) 
{
    if (error) 
    {
        console.log(error);
    } 
    else 
    {
        console.log(results);
        object = results;
    }
}

function draw() 
{
    image(video, 0, 0, 400, 380);
   
    if (status != "") 
    {
        r = random(255);
        g = random(255);
        b = random(255);
        
        objectDetector.detect(video, gotResult);
        
        for (i = 0; i < object.length; i++) 
        {
            document.getElementById("status").innerHTML = "Status: Baby Detected";
            fill(r, g, b);
            percent = floor(object[i].confidence * 100);
            text(object[i].label + " " + percent + "%", object[i].x + 15, object[i].y + 15);
            noFill();
            stroke(r, g, b);
            rect(object[i].x, object[i].y, object[i].width, object[i].height);
        
            if(object[i].label=="person")
        {
            document.getElementById("number_of_objects").innerHTML = "Baby found";
            alarm.stop();
        }
    else 
    {
        document.getElementById("number_of_objects").innerHTML = "Baby not found";
        alarm.play();
    }
}
}
}


