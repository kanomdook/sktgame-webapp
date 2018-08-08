import { Component, OnInit } from '@angular/core';
import { Api } from '../providers/service/api';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  page = 1;
  sportType = '';
  keyword = '';
  sportList: Array<any> = [];
  sports: Array<any> = [];
  constructor(public api: Api) { }

  ngOnInit() {
    this.getSports();
  }

  async getSports() {
    try {
      const res: any = await this.api.get('/sports');
      this.sportList = res.data;
      this.sports = res.data;
      console.log(this.sportList);
    } catch (error) {
      console.log(error);
    }
  }

  changeSportType(e) {
    if (e) {
      const sports = this.sportList.filter(el => {
        return el.sportType === e;
      });
      this.sports = sports;
    } else {
      this.sports = this.sportList;
    }
  }

  search(e) {
    this.sportType = '';
    if (e) {
      const sports = this.sportList.filter(el => {
        const reg = new RegExp(e, 'g');
        if (el.sportType.match(reg) || el.name.match(reg)) {
          return el;
        }
      });
      this.sports = sports;
    } else {
      this.sports = this.sportList;
    }
  }

}
