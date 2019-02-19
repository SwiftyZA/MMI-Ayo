import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { ConverterComponent } from './home/Converter/Converter.Component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [AppComponent, ConverterComponent],
  imports: [BrowserModule, FormsModule, HttpClientModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
