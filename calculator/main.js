var numbers = document.querySelectorAll('.number');
var operations = document.querySelectorAll('.operator'),
    decimalBtn = document.getElementById('decimal'),
    clearBtns = document.querySelectorAll('.clear-btn'),
    display = document.getElementById('display'),
    powBtn = document.getElementById('powBtn'),
    sqrdBtn = document.getElementById('sqrd'),
    positivBtn = document.getElementById('positiv');

// тукущее значение 
var MemoryCurrentNumber = 0;

var MemoryNewNumber = false;
// ожидаемая операция
var MemoryPendingOperation = '';

for(var i = 0; i < numbers.length; i++){
    var number = numbers[i];
    number.addEventListener('click', function(e){
        numberPress(e.target.textContent)
    })
}

for (var i = 0; i < operations.length; i++) {
    var operationBtn = operations[i];
    operationBtn.addEventListener('click', function(e){
        // if (e.target.textContent === '^2'){
        //     MathPowNumber(e.target.textContent);
        // }
        operation(e.target.textContent);
    })
}

for (var i = 0; i < clearBtns.length; i++) {
    var clearBtn = clearBtns[i];
    clearBtn.addEventListener('click', function(e){
        clear(e.target.id);
    })
}

decimalBtn.addEventListener('click', decimal);

powBtn.addEventListener('click', function(e){
    MathPowNumber();
});

sqrdBtn.addEventListener('click', sqrd);

positivBtn.addEventListener('click', positiv);


function numberPress(num){
    if (MemoryNewNumber){
        display.value = num;
        MemoryNewNumber = false;
    }
    else{
        if (display.value === '0') {
            display.value = num;
        } else{
            display.value += num;
        }
    }
    
}
function operation(op) {
    var localOperationMemory = display.value;
    if (MemoryNewNumber && MemoryPendingOperation !== '='){
        display.value = MemoryCurrentNumber;
    } else {
        MemoryNewNumber = true;
        if (MemoryPendingOperation === '+'){
            MemoryCurrentNumber = sum(MemoryCurrentNumber, parseFloat(localOperationMemory));
        }
        else if (MemoryPendingOperation === '-'){
            MemoryCurrentNumber -= parseFloat(localOperationMemory);
        }
        else if (MemoryPendingOperation === '*') {
            MemoryCurrentNumber *= parseFloat(localOperationMemory);
        }
        else if (MemoryPendingOperation === '/') {
            MemoryCurrentNumber /= parseFloat(localOperationMemory);
        }
        
        else{
            MemoryCurrentNumber = parseFloat(localOperationMemory);

        };
        display.value = MemoryCurrentNumber;
        MemoryPendingOperation = op;
        
    }
    
}
function decimal(arg) {
    var localDecimalMemory = display.value;
    if (MemoryNewNumber){
        localDecimalMemory = '0.';
        MemoryNewNumber = false;
    } else {
        if (localDecimalMemory.indexOf('.') === -1){
            localDecimalMemory += '.';
        }
        
    }
    display.value = localDecimalMemory;
}
function clear(id) {
    if(id === 'ce'){
        display.value = '0';
        MemoryNewNumber = true;
    }
    else if(id === 'c'){
        display.value = '0';
        MemoryNewNumber = true;
        MemoryPendingOperation = '';
        MemoryCurrentNumber = 0;
    }
}
function MathPowNumber(n){  
    
        var a = display.value;
        display.value = Math.pow(parseFloat(a), 2);
        
        
        console.log("нажал квадрат " + MemoryCurrentNumber);
    
}

function sum() {
    var result = 0;
    for (var i = 0, max = arguments.length; i < max; i++) {
        result += arguments[i] * 1000;
    }
    return result / 1000;
}
function sqrd(arg){
    var s = display.value;
    if(s < 0 ){
        display.value = 'error';
        MemoryNewNumber = true;
        MemoryPendingOperation = '';
        MemoryCurrentNumber = 0;
    }else{
    display.value  = Math.sqrt(s); 
    console.log(s);
    }
}
function positiv(v){
    console.log(v.target.textContent);
    var localPosNumber = display.value;
    if (localPosNumber > 0){
        display.value =  -display.value;
    } else{
        display.value *= -1;
    }
}