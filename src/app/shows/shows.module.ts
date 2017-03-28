import {NgModule}       from '@angular/core';
import {ShowsComponent} from "./shows.component";
import {CommonModule} from "@angular/common";
import {ShowNavComponent} from "./show-nav/show-nav.component";
import {ShowItemComponent} from "./show-item/show-item.component";

import {FormsModule} from "@angular/forms";
import {InfiniteScrollModule} from "angular2-infinite-scroll/angular2-infinite-scroll";
import {TruncatePipe} from "./truncate.pipe";
import {SharedModule} from "../shared/shared.module";

@NgModule({
    declarations: [
        ShowsComponent,
        ShowItemComponent,
        ShowNavComponent,
        TruncatePipe,
    ],
    imports: [
        CommonModule,
        FormsModule,
        InfiniteScrollModule,
        SharedModule
    ],
})

export class ShowsModule {
}
