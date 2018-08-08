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
  sportList: Array<any> = [];
  constructor(public api: Api) { }

  ngOnInit() {
    this.getSports();
  }

  async getSports() {
    try {
      const res: any = await this.api.get('/sports');
      this.sportList = res.data;
      console.log(this.sportList);
    } catch (error) {
      console.log(error);
    }
  }

}
