import { TestBed } from '@angular/core/testing';

import { CalculatorService } from './calculator.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';

describe('CalculatorService', () => {
  
  var originalTimeout;

  beforeEach(function() {
      originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
      jasmine.DEFAULT_TIMEOUT_INTERVAL = 1000000;
  });

  afterEach(function() {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
  });

  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      BrowserModule,
      AppRoutingModule,
      HttpClientModule
    ],
      providers: [CalculatorService, HttpClient]
  }));

  it('should be created', async () => {
    const service: CalculatorService = TestBed.get(CalculatorService);
    expect(service).toBeTruthy();
  });

  it('operations testing - add', async () => {
    const service: CalculatorService = TestBed.get(CalculatorService);
    let value;
      await service.performCalculation("+", 2,5).toPromise().then(
       (res) => { 
        console.log(res); 
        value = JSON.parse(JSON.stringify(res)).result;
        
        expect(value).toEqual(7);
       });
  });

  it('operations testing - sub', async () => {
    const service: CalculatorService = TestBed.get(CalculatorService);
    let value;
      await service.performCalculation("-", 2,10).toPromise().then(
       (res) => { 
        console.log(res); 
        value = JSON.parse(JSON.stringify(res)).result;
        
        expect(value).toEqual(-8);
       });
  });

  it('operations testing - divide by zero', async () => {
    const service: CalculatorService = TestBed.get(CalculatorService);
    let value;
      await service.performCalculation("/", 7,0).toPromise().then(
       (res) => { 
        console.log(res); 
        value = JSON.parse(JSON.stringify(res)).responseDetails;
        
        expect(value).toEqual("Can't Divide by Zero");
       });
  });

  

});
