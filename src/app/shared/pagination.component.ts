import {Component, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'rj-pagination',
  template: `
         <nav aria-label="Page navigation">
        <ul class="pagination">
          <li>
            <a href="#" aria-label="Previous">
              <span aria-hidden="true">&laquo;</span>
            </a>
          </li>
         
          <li (click)="onPage(pageNR)"  *ngFor="let pageNR of pagenumers">
            <a>{{pageNR}}</a>
          </li>
       
          <li>
            <a  aria-label="Next">
              <span aria-hidden="true">&raquo;</span>
            </a>
          </li>
        </ul>
      </nav>
  `,
})
export class PaginationComponent  {


  pagenumers = [1,2,3,4,5];


  @Output() pageNumberEmitter = new EventEmitter();


  selctedNumber: number = 1;

  onPage(pageNr: number){
    this.selctedNumber = pageNr;
    this.pageNumberEmitter.emit(this.selctedNumber);
  }

}
