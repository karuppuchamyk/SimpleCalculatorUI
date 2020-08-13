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

  it('should be created', () => {
    const service: CalculatorService = TestBed.get(CalculatorService);
    expect(service).toBeTruthy();
  });
});
