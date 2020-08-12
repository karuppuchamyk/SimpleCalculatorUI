import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { retry, catchError } from 'rxjs/operators';
import { throwError} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CalculatorService {
  private API_URL = "http://localhost:8081/simplecalculator";
  myData = {  
    operator: "",  
    firstOperand: "",  
    secondOperand: ""  
  }; 

  constructor(private http: HttpClient) { }

  performCalculation(operator, currentValue, inputValue) {

    this.myData.operator = operator;
    this.myData.firstOperand = currentValue;
    this.myData.secondOperand = inputValue;

    console.log(JSON.stringify(this.myData));

    return this.http.post(this.API_URL + '/performOperation', JSON.stringify(this.myData), {
      headers: { 
        'Content-Type': 'application/json'
      }
    }).pipe(retry(1), catchError(this.handleError));
  }

  handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = 'Error: ' + error.message;
    } else {
      // Server-side errors
      errorMessage = 'Error: ' + error.message;
    }
    
    return throwError(errorMessage);
  }
}
