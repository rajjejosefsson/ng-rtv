import {Component, Input} from '@angular/core';

@Component({
    selector: 'rj-jumbotron',
    templateUrl: 'jumbotron.component.html',
    styleUrls: ['jumbotron.component.css'],
})

export class JumbotronComponent {
    @Input() title;
}
