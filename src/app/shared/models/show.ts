import {Cast} from "./cast";
import {Episode} from "./episode";
export class Tvshow {
  constructor(public name:string,
              public overview:string,
              public poster_path:string,
              public vote_average:string,
              public isHearted?:boolean,
              public id?:string,
              public cast?:any[],
              public backdrop_path?: string,
              public status?:string,
              public genres?:string[],
              public first_air_date?: string,
              public airdates?:Episode[],
              public imdb_id?:string,
              public premiered?:string,
              public schedule?:{ time:string, days:string },
              public videoLinkKey?:any) {
  }
}
