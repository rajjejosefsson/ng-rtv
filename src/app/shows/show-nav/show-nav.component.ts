import {Component, Output, EventEmitter, OnInit} from '@angular/core';
import {GenreArray} from "../genres";
import {Years} from "../years";

@Component({
    selector: 'rj-show-nav',
    template: `
        <div class="nav nav-tabs md-pills pills-default col-xs-12 col-sm-12 col-md-12"> 
        
        <div class="col-xs-12 col-sm-2 col-md-2">
          <label for="items">From Year</label>
                    <select class="form-control" [(ngModel)]="current" (change)="optionSelected($event.target.value)"
                            name="lista">
                        <option *ngFor="let year of years" [value]="year">{{year}}</option>
                    </select>
         </div>
        
        <div class="col-xs-12 col-sm-10 col-md-10"> 
        <ul>
            <li class="nav-item" *ngFor="let item of genres; let i = index">
                <a class="nav-link" (click)="selectedItem(item['id'], i)" [class.active]="i == selectedIdx">{{item['name']}}</a>
            </li>
        </ul>
        </div>
        </div>
        <br>
  `,
    styleUrls: ['show-nav.css']
})
export class ShowNavComponent implements OnInit {
    @Output() selectedGenre = new EventEmitter();
    @Output() selectedYear = new EventEmitter();

    genres = GenreArray;
    years = Years;
    selectedIdx = 0;
    myYear:any;
    current:any = 'All';


    firsttime = false;

    ngOnInit() {
    }

    selectedItem(item, index) {
        this.selectedIdx = index;
        this.selectedGenre.emit(item);
    }

    onChange(newObj) {
        // console.log(newObj.value);
        console.log(this.myYear);
    }


    optionSelected($event) {
        console.log($event);
        this.selectedYear.emit($event);
    }

}
