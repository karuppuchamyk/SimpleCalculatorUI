import { Component, OnInit, AfterViewInit, ViewChild, ElementRef} from '@angular/core';
import { CalculatorService } from '../calculator.service';

const calculator = {
  displayValue: '',
  firstOperand: null,
  waitingForSecondOperand: false,
  operator: null,
};


@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.scss']
})
export class CalculatorComponent implements OnInit, AfterViewInit {

  resultValue: String = '';
  curruntOperator: String = '';

  @ViewChild('keys') keys : ElementRef
  
  constructor(private calculatorService: CalculatorService) { }

  ngAfterViewInit() {
    
    this.keys.nativeElement.addEventListener('click', (event) => {
      const { target } = event;
      if (!target.matches('button')) {
        return;
      }
    
      if (target.classList.contains('operator')) {
        this.handleOperator(target.value);
        
        return;
      }
    
      if (target.classList.contains('decimal')) {
        this.inputDecimal(target.value);
        this.updateDisplay();
        return;
      }
    
      if (target.classList.contains('all-clear')) {
        this.resetCalculator();
        this.updateDisplay();
        return;
      }
    
      this.inputDigit(target.value);
      this.updateDisplay();
    });
  }

  ngOnInit() {
    //
  }

  inputDigit(digit) {  
    if (calculator.waitingForSecondOperand === true) {
      calculator.displayValue = digit;
      calculator.waitingForSecondOperand = false;
    } else {
      calculator.displayValue = calculator.displayValue === '' ? digit : calculator.displayValue + digit;
    }
  }

  inputDecimal(dot) {
    // If the "displayValue" does not contain a decimal point, Append the decimal point
    if (!calculator.displayValue.includes(dot)) {
      calculator.displayValue += dot;
    }
  }

  async handleOperator(nextOperator) {
    if (calculator.displayValue == '') {
      return;
    }
    const inputValue = parseFloat(calculator.displayValue);
    
    if (calculator.operator && calculator.waitingForSecondOperand)  {
      calculator.operator = nextOperator;
      return;
    }

    if (calculator.firstOperand == null) {
      calculator.firstOperand = inputValue;
    } else if (calculator.operator) {
      if (calculator.operator == '=') {
        calculator.firstOperand = inputValue;
      } else {
        const currentValue = calculator.firstOperand || 0;
        const result = await this.performCalculation(calculator.operator, currentValue, inputValue);

        calculator.displayValue = String(result);
        calculator.firstOperand = result;
      }
    } 
 
    calculator.waitingForSecondOperand = true;
    calculator.operator = nextOperator;  
    this.updateDisplay();   
  }

   async performCalculation(operator, currentValue, inputValue) {
     let value;

     await this.calculatorService.performCalculation(operator, currentValue, inputValue).toPromise().then(
      (res) => { 
        console.log(res); 
        if (JSON.parse(JSON.stringify(res)).result) {
          value = JSON.parse(JSON.stringify(res)).result;
        } else {
          value = JSON.parse(JSON.stringify(res)).responseDetails;
        }
      }).catch((error) => {
        console.log("Promise rejected with " + JSON.stringify(error));
      });
    
    
    return value;
  }
     

  resetCalculator() {
    calculator.displayValue = '';
    calculator.firstOperand = null;
    calculator.waitingForSecondOperand = false;
    calculator.operator = null;
  }

  updateDisplay() {
    console.log(calculator.displayValue);
    this.resultValue = calculator.displayValue;
    this.curruntOperator = calculator.operator;
  } 

}
