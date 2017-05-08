import {Component} from '@angular/core';

import {FeedService} from './feed.service';

import { DataService } from '../../../data/data.service';
import { AuthHttp } from 'angular2-jwt';

import 'style-loader!./feed.scss';
@Component({
  selector: 'feed',
  providers: [DataService],
  templateUrl: './feed.html'
})
export class Feed {

  public feed:Array<Object>;
  
  private getAspirasiFunction() {
    this.authHttp.get(this.data.urlGetAspirasi)
      .map(res => res.json())
      .subscribe(data => {
        localStorage.setItem('id_token', data.token);
        localStorage.setItem('aspirasi', JSON.stringify(data.data));
        this.feed = JSON.parse(localStorage.getItem('aspirasi'));
        console.log(data.data);
      })
  }
  
  constructor(private _feedService:FeedService, public authHttp: AuthHttp, public data: DataService) {
    if (localStorage.getItem('aspirasi')) {
      this.feed = JSON.parse(localStorage.getItem('aspirasi'));
    }
    this.getAspirasiFunction()
  }

  ngOnInit() {
    this._loadFeed();
  }

  expandMessage (message){
    message.expanded = !message.expanded;
  }

  private _loadFeed() {
    this.getAspirasiFunction()
  }
}
