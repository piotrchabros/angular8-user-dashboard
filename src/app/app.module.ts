import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout'
import { MaterialModule } from './material/material.module';
import { routingComponents } from './app-routing.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HtppInterceptorService } from './auth/http-interceptor.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http'
import { ConfirmDeleteUserDialog } from './admin/dialogs/confirm-user-delete-dialog';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    ConfirmDeleteUserDialog,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ToastrModule.forRoot()
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: HtppInterceptorService,
    multi: true
  }],
  bootstrap: [AppComponent],
  entryComponents: [ConfirmDeleteUserDialog]
})
export class AppModule { }
