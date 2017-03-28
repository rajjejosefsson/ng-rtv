import {Component, Input} from '@angular/core';


@Component({
    selector: 'rj-jumbotron',
    template: `

      <div class="outer-div">
        <div class="inner-div">
          <h1>{{title}}</h1>
          <ng-content></ng-content>
          
        </div>
      </div>
`,
    styles: [`




    /* banner image */
.inner-div h1 {
    text-align: center;
    font-weight: bold;
    font-size: 60px;
    color: white;
    margin-top: 60px;
}

.outer-div {
    margin-top: 50px;
    height: 300px;
    border: 2px solid rgba(0, 128, 0, 0);
    background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('assets/posters24.jpg');
    background-size: cover;
}

rj-jumbotron h1 {
    text-align: center;
    font-weight: bold;
    font-size: 60px;
    color: white;
    margin-top: 120px;
}




     @media (max-width: 543px) {
     
     .outer-div {
      height: 150px;
     }
     
     .inner-div h1 {
        margin-top: 30px;
     }
    
      .inner-div h1 {
        font-size: 40px;
    }

     
     }
        

`]
})
export class JumbotronComponent {

    @Input() title;

}
