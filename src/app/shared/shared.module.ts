import { TruncatePipe } from './custom-pipes/truncate.pipe';
import {NgModule} from '@angular/core';
import {JumbotronComponent} from "./jumbotron/jumbotron.component";

@NgModule({
    declarations: [
        JumbotronComponent,
        TruncatePipe
    ],
    exports:[JumbotronComponent]
})

export class SharedModule {}
