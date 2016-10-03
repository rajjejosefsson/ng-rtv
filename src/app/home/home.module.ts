import {NgModule}       from '@angular/core';
import {HomeComponent} from "./home.component";
import {CommonModule} from "@angular/common";
import {SignupComponent} from "./signup.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

@NgModule({

    declarations: [
        HomeComponent,
        SignupComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule
    ],
})

export class HomeModule {
}
