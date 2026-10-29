import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { provideHttpClient, withInterceptors } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { httpErrorInterceptor } from './shared/interceptors/http-error.interceptor';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, SharedModule],
  providers: [provideHttpClient(withInterceptors([httpErrorInterceptor]))],
  bootstrap: [AppComponent],
})
export class AppModule {}
