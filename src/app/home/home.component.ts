import {Component, ViewEncapsulation} from '@angular/core';

@Component({
    selector: 'rj-home',
    templateUrl: 'home.component.html',
    styles: [`

      body { 
        width: 100%;
        height: 800px;
        margin-top: 100px;
        background: linear-gradient(
          rgba(0, 0, 0, 0.5), 
          rgba(0, 0, 0, 0.5)), url(assets/cinema-min-600.jpg) no-repeat;
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
      
      
    @media (max-height: 1000px) {
      .body {
       height: 700px;
      }
    }
    
    
        @media (max-height: 600px) {
      .body {
       height: 700px;
      }
    }
      
`],
    encapsulation: ViewEncapsulation.None

})

export class HomeComponent {
}

