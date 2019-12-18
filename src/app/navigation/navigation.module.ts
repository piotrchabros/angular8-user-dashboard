import { NgModule } from '@angular/core';
import { NavigationComponent } from './navigation.component';
import { MaterialModule } from '../material/material.module';
import { BrowserModule } from '@angular/platform-browser';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AppRoutingModule } from '../app-routing.module';

@NgModule({
    declarations: [NavigationComponent],
    imports: [
        BrowserModule,
        MaterialModule,
        AppRoutingModule,
        FlexLayoutModule
    ],
    exports: [NavigationComponent]
})
export class NavigationModule { }
