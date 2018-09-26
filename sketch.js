var ctracker, cnv, videoInput;
var glasses, moustache, whiskers, pipe, ears, hat, nose;
var mode, saving;

/* Charger et stocker les images dans des variables (p5.js)*/
function preload(){
    glasses = loadImage("img/glasses.png");
    moustache = loadImage("img/moustache.png");
    whiskers = loadImage("img/whiskers.png");
    pipe = loadImage("img/pipe.png");
    ears = loadImage("img/ears.png");
    hat = loadImage("img/hat.png");
    nose = loadImage("img/nose.png");
}

/* Parametrage de l'app */
function setup(){
    videoInput = createCapture(VIDEO); //Créer la video a partir de la webcam
    videoInput.size(800, 600);
    videoInput.position(0, 0);
    cnv = createCanvas(800, 600);
    cnv.position(0, 0);
    pixelDensity(1); //ignorer les affichages a haute densite (necessaire pour l'enregistrement de l'image)
    
    ctracker = new clm.tracker(); //ajouter le tracker
    ctracker.init(pModel);
    ctracker.start(videoInput.elt);
    //noStroke();
    mode = 1;
    saving = false;
}

function draw(){
    clear();
    var positions = ctracker.getCurrentPosition();
    if(saving){
        image(videoInput, 0, 0, width, height);
    }
    if(positions.length > 1){
        var ang = atan2(positions[27][1] - positions[32][1], positions[27][0] - positions[32][0]);
        var d = int(dist(positions[27][0], positions[27][1], positions[32][0], positions[32][1]));
        var scl = map(d, 0, 290, 0, 1.8);
        
        //lunettes
        if(mode == 1){
            push();
            translate(positions[33][0], positions[33][1]);
            rotate(ang + PI);
            scale(scl);
            image(glasses, 0 - glasses.width / 2, 0 - glasses.height / 2);
            pop();
        }
        
        //moustache
        else if(mode == 2){
            push();
            translate(positions[37][0], positions[37][1]);
            rotate(ang + PI);
            scale(scl);
            image(moustache, 0 - moustache.width / 2, -15);
            pop();
        }
        
        //whiskers
        else if(mode == 3){
            push();
            translate(positions[41][0], positions[41][1]);
            rotate(ang + PI);
            scl *= 1.8;
            image(whiskers, 0 - whiskers.width / 2, 0);
            pop();
        }
        
        //pipe
        else if(mode == 4){
            push();
            translate(positions[56][0], positions[56][1]);
            rotate(ang + PI);
            scale(scl);
            image(pipe, 0 - pipe.width, 0);
            pop();
        }
        
        //oreilles
        else if(mode == 5){
            var d2 = int(dist(positions[33][0], positions[33][1], positions[37][0], positions[37][1]));
            push();
            translate(positions[33][0], positions[33][1]);
            rotate(ang + PI);
            scale(scl);
            image(ears, 0 - ears.width / 2, 0 - (ears.height + d2));
            pop();
        }
        
        //chapeau
        else if(mode == 6){
            var d2 = int(dist(positions[33][0], positions[33][1], positions[37][0], positions[37][1]));
            push();
            translate(positions[20][0], positions[20][1]);
            rotate(ang + PI);
            scale(scl);
            image(hat, 0 - hat.width / 2, 0 - (hat.height + d2));
            pop();
        }
        
        //nez
        else if(mode == 7){
            push();
            translate(positions[62][0], positions[62][1]);
            rotate(ang + PI);
            scale(scl);
            image(nose, 0 - nose.width / 2, 0 - nose.height / 2);
            pop();
        }
    }
    
    if(saving){
        saveCanvas(cnv, 'me', 'png');
        saving = false;
    }
}

function keyPressed(){
    if(keyCode === RIGHT_ARROW){
        if(mode == 7){
            mode = 1;
        }
        else{
            mode++;
        }
    }
    
    if(keyCode === LEFT_ARROW){
        if(mode == 1){
            mode = 7;
        }
        else{
            mode--;
        }
    }
    
    if(keyCode === 83){
        saving = true;
    }
}