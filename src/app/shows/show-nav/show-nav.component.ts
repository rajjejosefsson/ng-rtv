import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { GenreArray } from "../const/genres";
import { Years } from "../const/years";

@Component({
    selector: 'rj-show-nav',
    templateUrl: 'show-nav.component.html',
    styleUrls: ['show-nav.css']
})
export class ShowNavComponent implements OnInit {
    @Output() selectedGenre = new EventEmitter();
    @Output() selectedYear = new EventEmitter();
    genres = GenreArray;
    years = Years;
    selectedIdx = 0;
    myYear: any;
    current: any = 'All';
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
