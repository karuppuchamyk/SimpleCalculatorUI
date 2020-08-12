import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalculatorComponent } from './calculator.component';

describe('CalculatorComponent', () => {
  let component: CalculatorComponent;
  let fixture: ComponentFixture<CalculatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalculatorComponent ]
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

  it('operations testing', () => {
    const fixture = TestBed.createComponent(CalculatorComponent);
    const app = fixture.debugElement.componentInstance;
    
    let result = app.performCalculation("+", 2, 5);
    expect(result).toEqual("7");

    result = app.performCalculation("-", 9, 5);
    expect(result).toEqual("4");

    result = app.performCalculation("*", 2, 5);
    expect(result).toEqual("10");
  });

  it('Initial value testing', () => {
    const fixture = TestBed.createComponent(CalculatorComponent);
    const app = fixture.debugElement.componentInstance;
    
    let result = app.calculator.displayValue;
  
    expect(result).toEqual('');
  });

});
