var numberSquare = 6;
var colors = generateRandomColors(numberSquare);
var squares = document.querySelectorAll(".square");
var colorDisplay = document.getElementById("colorDisplay");
var messageDisplay = document.getElementById("message");
var reset = document.getElementById("reset");
var pickedColor = pickColor();
var h1 = document.querySelector("h1");
var easyBtn = document.querySelector("#easyBtn");
var hardBtn = document.querySelector("#hardBtn");

easyBtn.addEventListener("click", function(){
    easyBtn.classList.add("selected");
    hardBtn.classList.remove("selected");
    numberSquare = 3; 
    colors = generateRandomColors(numberSquare);
    pickedColor = pickColor();
    colorDisplay.textContent = pickedColor;  
    for(var i=0; i < squares.length; i++){
        if(colors[i]){
            squares[i].style.background = colors[i]; 
        }
        else{
            squares[i].style.display = "none";
        }
    }
    messageDisplay.textContent ="";
});

hardBtn.addEventListener("click", function(){
    easyBtn.classList.remove("selected");
    hardBtn.classList.add("selected");
    numberSquare = 6;
    colors = generateRandomColors(numberSquare);
    pickedColor = pickColor();
    colorDisplay.textContent = pickedColor;  
    for(var i=0; i < squares.length; i++){
        squares[i].style.background = colors[i]; 
        squares[i].style.display = "block";
    } 
    messageDisplay.textContent ="";  
});
colorDisplay.textContent = pickedColor;

reset.addEventListener("click", function(){
    // generate all new colors
    colors = generateRandomColors(numberSquare);
    // new random color from arry
    pickedColor = pickColor();
    colorDisplay.textContent = pickedColor;
    messageDisplay.textContent = "";
    // colors of square
    for(var i=0; i < squares.length; i++){
        squares[i].style.background = colors[i];
    }
    h1.style.backgroundColor = "steelblue";
    this.textContent = "new colors";
});
for(var i=0; i < squares.length; i++){
    // add initial colors
    squares[i].style.background = colors[i];
    // click square
    squares[i].addEventListener("click", function(){
        var clickColor = this.style.background;
        if(clickColor === pickedColor){
            messageDisplay.textContent = "Correct!";
            colorChange(clickColor);
            h1.style.backgroundColor = clickColor;
            reset.textContent = "Play again";
        }
        else{
            this.style.background = "#232323";
            messageDisplay.textContent = "Try Again";
        }
    })
}


function colorChange(color) {
    for(var i=0; i < squares.length; i++){
        squares[i].style.background = color;
    }
}

function pickColor() {
    var random = Math.floor(Math.random() * colors.length);
    return colors[random];
}
function generateRandomColors(num) {
    var arr = []
    for(var i = 0; i < num; i++){
    // get random color and push in arr
        arr.push(randomColors())
    }
    return arr;
}

function randomColors(){
    var r = Math.floor(Math.random() * 256);
    var g = Math.floor(Math.random() * 256);
    var b = Math.floor(Math.random() * 256);

    return "rgb(" + r + ", " + g + ", " + b + ")";
}



