import { TestBed, async } from '@angular/core/testing';

import { AppComponent } from './app.component';
import { ConverterComponent } from './home/Converter/Converter.Component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [BrowserModule, FormsModule, HttpClientModule],
      declarations: [
        AppComponent, ConverterComponent
      ]
      
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it(`should have as title 'Unit Converter'`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.pageTitle).toEqual('Unit Converter');
  }));

  it(`From Unit display flag should be true if selectedType has a value with Id != -1`, async(() => {
    const fixture = TestBed.createComponent(ConverterComponent);
    const app = fixture.debugElement.componentInstance;
    app.selectedType = {
        "id" : 1,
        "name" : "True Dummy Type",
      };

    expect(app.showFromSelect).toEqual(true);

    app.selectedType = {
        "id" : -1,
        "name" : "False Dummy Type",
      };

    expect(app.showFromSelect).toEqual(false);
  }));

  /** 
   * If I had more time I would implement a mock service to provide some static data for the converter
   * component to run tests against. Without a mock service there is not much point in testing anything
   * more than the above UI behavior
   * */
});
