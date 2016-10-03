import {Component, OnInit, Input} from '@angular/core';
import {Cast} from "./cast";

@Component({
  selector: 'rj-casting',
  templateUrl: 'casting.component.html',
  styles: [`


           .avatar {
                  height: 132px;
                  width: 132px;
                  background-size: cover;
                  border-radius: 50%;
                  border: 5px solid #eee;
                  text-align:center;
                  margin-left: 15px;
                  margin-bottom: 5px;

            }


       
        
            .casting-item { 
               width:170px;
               min-height: 220px;
               text-align:center;
               position:relative;
               overflow: hidden;
            }
 

`]
})
export class CastingComponent {

  @Input() casting: Cast;

  posterUrl = 'https://image.tmdb.org/t/p/w132_and_h132_bestv2/';


}
