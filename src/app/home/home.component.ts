import {Component, ViewEncapsulation} from '@angular/core';

@Component({
    selector: 'rj-home',
    templateUrl: 'home.component.html',
    styles: [`
      html, body {margin:0px;}

      rj-home { 
        float:left;
        width:100%;
        height: 800px;
        padding:5px;
        background:
        linear-gradient(
          rgba(0, 0, 0, 0.5), 
          rgba(0, 0, 0, 0.5)), url(assets/cinema-min-600.jpg);
        background-size: cover;
     }
     
     .title {
     margin-top: 50px;
     margin-bottom: 40px;
     font-size: 40px;
     }
     
   
      .signup {
        margin-left: 250px;
        float: left;
      }
      
      /* Extra small devices (portrait phones, less than 544px) */
    @media (max-width: 543px) {
      .signup {
        margin-left: 25px;
        float: left;
      }
    }
      
`],
    encapsulation: ViewEncapsulation.None

})

export class HomeComponent {
}

