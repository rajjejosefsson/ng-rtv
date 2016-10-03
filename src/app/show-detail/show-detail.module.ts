import {NgModule}       from '@angular/core';
import {CastingComponent} from "./casting/casting.component";
import {ShowDetailComponent} from "./show-detail.component";
import {ShowDetailItemComponent} from "./show-detail-item/show-detail-item.component";
import {CommonModule} from "@angular/common";
import {SharedModule} from "../shared/shared.module";

@NgModule({
    declarations: [
        ShowDetailComponent,
        ShowDetailItemComponent,
        CastingComponent
    ],
    imports: [
        CommonModule,
        SharedModule
    ],
})

export class ShowDetailModule {
}
