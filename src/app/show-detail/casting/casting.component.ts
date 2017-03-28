import {Component, OnInit, Input} from '@angular/core';
import {Cast} from "../../shared/models/cast";

@Component({
  selector: 'rj-casting',
  templateUrl: 'casting.component.html',
  styleUrls: ['casting.component.css']
})

export class CastingComponent {
  @Input() casting: Cast;
  posterUrl = 'https://image.tmdb.org/t/p/w132_and_h132_bestv2/';
}
