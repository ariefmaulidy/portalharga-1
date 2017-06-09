import {Component} from '@angular/core';

import {FeedService} from './feed.service';

import { AuthHttp } from 'angular2-jwt';
import { DataService } from '../../../data/data.service';

import 'style-loader!./feed.scss';

@Component({
  providers: [DataService],
  selector: 'feed',
  templateUrl: './feed.html'
})
export class Feed {

  public feed:Array<Object>;
  public feed2:Array<Object>;
  public interval;
  public type = 'infoHarga';

  constructor(private _feedService:FeedService, public authHttp: AuthHttp, public data: DataService) {
    if (localStorage.getItem('feed')) {
      this.getFeedFunction();
    }
    this.interval = setInterval(() => {
      if (localStorage.getItem('feed')) {
        this.getFeedFunction();
      }
    }, 2000);
  }
  
  private formatDate(x){
    var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    var d = new Date(x);
    return d.toLocaleDateString("en-US",options);
  }

  private numberWithCommas(x) {
    var parts = x.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    return parts.join(".");
  }

  private getFeedFunction() {
      this.type = localStorage.getItem('feed').substr(0,9);
      this.feed =  JSON.parse(localStorage.getItem('feed').substr(8));
  }

  ngOnInit() {
    // this._loadFeed();
  }

  expandMessage (message){
    message.expanded = !message.expanded;
  }

  private _loadFeed() {
    this.feed = this._feedService.getData();
  }
}
