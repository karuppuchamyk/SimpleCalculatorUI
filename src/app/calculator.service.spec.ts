import { TestBed } from '@angular/core/testing';

import { CalculatorService } from './calculator.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';

describe('CalculatorService', () => {
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
    let value;
      await service.performCalculation("+", 2,5).toPromise().then(
       (res) => { 
        console.log(res); 
        value = JSON.parse(JSON.stringify(res)).result;
        
        expect(value).toEqual(7);
       });
  });
});
