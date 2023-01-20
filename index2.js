const numberButtons=document.querySelectorAll('[number-button]')
const operationButtons=document.querySelectorAll('[operation-button]')
const equalsButton=document.querySelector('[data-equals-button ]')
const allClearButton=document.querySelector('[all-clear-button]')
const prevScreenData=document.querySelector('[ data-previous ]')
const currScreenData=document.querySelector('[data-current ]')
const delButton=document.querySelector('[delete-button]')
const timeButton=document.querySelector('[time-button]');
let symbol='';
class Calculator{
    constructor(prevScreenData,currScreenData){
        this.prevScreenData=prevScreenData;
        this.currScreenData=currScreenData;
        this.clear()
    }
    clear(){
       this.currValue=''
       this.prevValue=''
       this.operation=undefined
    }
    appendNumber(number){
        if(number==='.' && this.currValue.includes('.')) return 
         this.currValue=this.currValue.toString()+number.toString();
    }
    operationSymbol(operation){
        if(this.currValue==='') return
        if(this.prevValue!==''){
            this.calculate();
        }
       
        this.operation=operation
        // console.log(operation);
        symbol=operation;
       this.prevValue=this.currValue
       this.currValue=''
    }
    delete(){
        this.currValue = this.currValue.toString().slice(0, -1)
    }
    storage(result){
        console.log(result)
        let numberArray=[]
        numberArray.push(result);
        console.log(numberArray)
        // localStorage.setItem('items', JSON.stringify(itemsArray))
        // for (var i = 0; i < localStorage.length; i++)
        // {
        //     localStorage.setItem('resultstorage', resultValue.innerText);
        //      output.innerText= localStorage.getItem('resultstorage');
             
        // }

        this.currScreenData.innerText=output.innerText;
    }
    changeDisplay(){
        this.currScreenData.innerText=this.currValue;
         this.prevScreenData.innerText=this.prevValue+symbol;   
    }
    calculate(){
        let result;
        const a=parseFloat(this.prevValue);
        const b=parseFloat(this.currValue);
        if (isNaN(a) || isNaN(b)) return
        switch(this.operation){
            case '+':
            result=run(add,a,b)
            break;
            case '-':
             result=run(sub,a,b)
            break;
            case '*':
            result=run(mul,a,b)
            break;
            case '÷':
            result=run(div,a,b)
            break;

        }
        function add(a,b){
            return a+b;
        }
        function sub(a,b){
            return a-b;
        }
        function mul(a,b){
            return a*b;
        }
        function div(a,b){
            return a/b;
        }
        function run(method,a,b){
            return method(a,b)
        }
        this.currValue=result
        symbol=''
        this.prevValue=''
        // this.currScreenData.innerText=''
       
    }
}
const calculator=new Calculator(prevScreenData,currScreenData)
numberButtons.forEach(button=>{
    button.addEventListener('click',()=>{
        calculator.appendNumber(button.innerText)
        calculator.changeDisplay()
    })
})
operationButtons.forEach(button=>{
    button.addEventListener('click',()=>{
        calculator.operationSymbol(button.innerText)
        calculator.changeDisplay();
    })
})
equalsButton.addEventListener('click',()=>{
    calculator.calculate();
    calculator.changeDisplay();
})
allClearButton.addEventListener('click',()=>{
    calculator.clear();
    calculator.changeDisplay();
})
delButton.addEventListener('click',()=>{
    calculator.delete();
    calculator.changeDisplay();
})
timeButton.addEventListener('click',()=>{
    calculator.storage(currScreenData.innerText+symbol +prevScreenData.innerText);
    
})

