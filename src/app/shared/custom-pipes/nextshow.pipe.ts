import {Pipe, PipeTransform} from '@angular/core';
import {DatePipe} from "@angular/common";
import {Episode} from "../../shows/episode";

@Pipe({
  name: 'nextEpisode'
})

export class NextEpisodePipe implements PipeTransform {


  // NEXT EPISODE AIR DATE

  transform(episodes: Episode[]) {

    var datePipe = new DatePipe("");
    var date = new Date();
    let dateNow = datePipe.transform(date, 'dd-MM-yyyy');
    console.log('nu');
    console.log(dateNow);

    console.log(episodes);

    for (let i = 0; i < episodes.length; i++ ){
      console.log(episodes[i]);
      console.log(i);
    }


    let nextEpisode;

    if (nextEpisode === undefined) {
      return `I don't know :(`;
    }

  }






}
