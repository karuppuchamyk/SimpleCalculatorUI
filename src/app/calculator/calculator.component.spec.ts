import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalculatorComponent } from './calculator.component';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from '../app-routing.module';
import { BrowserModule } from '@angular/platform-browser';

import { CalculatorService } from '../calculator.service';

describe('CalculatorComponent', () => {
  let component: CalculatorComponent;
  let fixture: ComponentFixture<CalculatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalculatorComponent ],
      imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule 
      ],
      providers: [CalculatorService]
    })
    .compileComponents(); 
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('value access testing', () => {
    const fixture = TestBed.createComponent(CalculatorComponent);
    const app = fixture.debugElement.componentInstance;
    app.resultValue = 10;
    let result = app.resultValue;
  
    expect(result).toEqual(10);
  });

});
