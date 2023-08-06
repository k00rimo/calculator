var currNum = 0;
var operationSet = false;
var operation = "undefined";

var divDisplay = document.querySelector(".display");

function countDigits(number){
    return number.toString().replace(".","").replace("-","").replace(",","").length;
}

function trailingZeros(number){
    //all my homies hate floating point numbers
    while (number % 10 == 0){
        number /= 10;
    }
    return number;
}

function normalize(number) {
    if (countDigits(number) <= 7){
        return number;
    }
    var wholePartLength = Math.trunc(number).toString().length;
    if (number < 0) {
        wholePartLength -= 1;
    }
    return parseFloat(number.toFixed(7 - wholePartLength));
}

// numbers
var numberArray = document.querySelectorAll(".number");
for (var i = 0; i < numberArray.length; i++) {
    numberArray[i].addEventListener('click', function(){
        if (countDigits(currNum) < 7){
            if (currNum == 0 && this.innerHTML != ","){
                currNum = this.innerHTML;
            } else {
                currNum = currNum + this.innerHTML;
            }
            document.querySelector(".result.current").innerHTML = currNum;
        }
    });
}

//AC
document.querySelector(".AC").addEventListener('click', function() {
    divDisplay.innerHTML = '<p class="result current">0</p>';
    operationSet = false;
    currNum = 0;
});

// operations
var operationArray = document.querySelectorAll(".operation");
for (var i = 0; i < operationArray.length; i++){
    operationArray[i].addEventListener('click', function() {
        if (operationSet){
            alert("This is a cheap calculator, one operation at a time please.");
        } else {
            operationSet = true;
            operation = this.classList[this.classList.length - 1];
            document.querySelector(".result.current").classList.remove("current");
        
            const sign = document.createElement("p");
            sign.className = "result temp";
            sign.textContent = this.innerHTML;
        
            const newNumber = document.createElement("p");
            newNumber.className = "result current";
            newNumber.textContent = "0";
        
            divDisplay.appendChild(sign);
            divDisplay.appendChild(newNumber);
            currNum = 0;
        }
    });
}

// evaluate
document.querySelector(".evaluate").addEventListener('click', function() {
    if (!operationSet){
        alert("Specify the operation first.");
    } else {
        const num1 = parseFloat(divDisplay.firstElementChild.innerHTML.replace(',','.'));
        const num2 = parseFloat(divDisplay.lastElementChild.innerHTML.replace(',','.'));
        var result;
        switch (operation){
            case "add":
                result = num1 + num2;
                break;
            case "subtract":
                result = num1 - num2;
                console.log(result);
                break;
            case "multiply":
                result = num1 * num2;
                break;
            case "division":
                if (num2 === 0){
                    result = "ERROR";
                    break;
                } 
                result = num1 / num2;
                break;
            default:
                result = "ERROR";
        }
        if (result === "ERROR" || countDigits(Math.trunc(result)) > 7) {
            divDisplay.innerHTML = '<p class="result current">ERROR</p>';
            currNum = 0;
        } else {
            result = normalize(result);
            console.log(typeof(result));
            divDisplay.innerHTML = '<p class="result current">'+result.toString().replace('.',',')+'</p>';
            currNum = result;
        }
        operationSet = false;
    }
});

//polarity
document.querySelector(".polarity").addEventListener('click', function(){
    if (typeof(currNum) == 'string'){
        currNum = parseFloat(currNum.replace(',','.'));
    }
    currNum *= -1;
    document.querySelector(".result.current").innerHTML = currNum.toString().replace('.',',');
});

//percentage

    // TODO


document.querySelector(".toggle").addEventListener('click', function(){
    document.querySelector(".framing").classList.toggle("hidden");
});
