const deletBtn = document.querySelector("[data-delete]");
const equalsBtn = document.querySelector("[equal-operator]");
const numberBtns = document.querySelectorAll("[data-number]");
const allclearBtn = document.querySelector("[data-all-clear]");
const operationBtns = document.querySelectorAll("[data-operator]");
const preOperationTxtElement = "";
//const preOperationTxtElement = document.querySelector("[data-bg-operation]");
const currentOperationTxtElement= document.querySelector("[data-current-operation]");

class Calculator{
    
    constructor(preOperation, currentOperation){
        this.currentOperationTxtElement = currentOperationTxtElement;
        this.preOperationTxtElement = preOperationTxtElement;
        this.clear();
    }

    formatdispalyNumber(number){
        const stringNumber = number.toString();
        const intergerDigits = parseFloat(stringNumber.split('.')[0]);
        const decimalDigits = stringNumber.split('.')[1];

        let intergerDisplay;

        if(isNaN(intergerDigits)){
            intergerDisplay = "";
        } else{
            intergerDisplay = intergerDigits.toLocaleString("en",{
                maximumFractionDigits: 0,
            });
        }

        if(decimalDigits != null){
            return `${intergerDisplay}.${decimalDigits}`;
        } else{
            return intergerDisplay;
        }

    }

    delete(){
        this.currentOperation = this.currentOperation.toString().slice(0, -1);
    }

    calculate(){
        let result;
        const _preOperationFoat = parseFloat( this.preOperation);
        const _currentOperationFoat = parseFloat( this.currentOperation);
        if(isNaN(_preOperationFoat) || isNaN(_currentOperationFoat))return;
        
        switch(this.operation){
            case '+':
                result = _preOperationFoat + _currentOperationFoat;
                break;
            case '_':
                result = _preOperationFoat - _currentOperationFoat;
                break;
            case 'X':
                result = _preOperationFoat * _currentOperationFoat;
                break;
            case '/':
                result = _preOperationFoat / _currentOperationFoat;
                break;
        }
        let tamanho = this.preOperation;
        console.log(result);
        
        if(tamanho.length == 7 || tamanho >= 1000000 || result >= 10000000){
            calculator.clear();
            this.currentOperation = "ERROR";
            console.log(this.currentOperation);
        }else{
            this.currentOperation = result;
            this.operation = undefined;
            this.preOperation = "";
        }

    }

    chooseOperation(operation){
        if(this.currentOperation == '') return;
        else if(this.preOperation != ""){
        this.calculate();
        }
        this.operation = operation;
        this.preOperation = this.currentOperation;
        this.currentOperation = "";
    }

    appendNumber(number){
        let tamanho = this.currentOperation;
        let valor = this.currentOperation
        if(tamanho.length == "6" || parseFloat(this.currentOperation) >= 1000000 ){
            return;
        }
        if(this.currentOperation == "0"){
            calculator.clear();
        }
        else if(this.currentOperation.includes(".") && number == "."){
            return;
        }
        else if(number == "." && this.currentOperation == "")
            this.currentOperation = "0.";
        else
            this.currentOperation = `${this.currentOperation}${number.toString()}`;
    }

    clear(){
        this.preOperation = '';
        this.currentOperation = '';
        this.operation = undefined;
    }
    
    updateDispaly(){
        //this.preOperationTxtElement.innerText = `${this.formatdispalyNumber(this.preOperation)} ${this.operation || ""}`;
        if(this.currentOperation != "ERROR"){
            this.currentOperationTxtElement.innerText = this.formatdispalyNumber(this.currentOperation);
        }else
        this.currentOperationTxtElement.innerText = (this.currentOperation);
    }
}

const calculator = new Calculator(
    currentOperationTxtElement,
    preOperationTxtElement 
);

deletBtn.addEventListener('click' ,() => {
    calculator.delete();
    calculator.updateDispaly();
});

equalsBtn.addEventListener('click' ,() => {
    calculator.calculate();
    calculator.updateDispaly();
});

for (const operationBtn of operationBtns){
    operationBtn.addEventListener('click', () =>{
        calculator.chooseOperation(operationBtn.innerText);
        calculator.updateDispaly();
    });
}

for (const numberBtn of numberBtns){
    numberBtn.addEventListener('click', () => {
        calculator.appendNumber(numberBtn.innerText);
        calculator.updateDispaly();
    });
} 

allclearBtn.addEventListener('click', () => {
    calculator.clear();
    calculator.updateDispaly();
});



