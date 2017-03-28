import {Component, ViewEncapsulation} from '@angular/core';

@Component({
    selector: 'rj-root',
    template: `
    <div class="mypage">
        <rj-header></rj-header>
        <router-outlet></router-outlet>
    </div>
`
})
export class AppComponent {
}
