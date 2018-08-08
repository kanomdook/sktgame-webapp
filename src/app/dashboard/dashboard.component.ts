import { Component, OnInit } from '@angular/core';
import { Api } from '../providers/service/api';
// import { Router, NavigationExtras } from '@angular/router';
import { Router } from '@angular/router';

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
  selectSports: Array<any> = [];
  constructor(public api: Api, public router: Router) { }

  ngOnInit() {
    this.getSports();
  }

  async getSports() {
    try {
      const res: any = await this.api.get('/sports');
      this.sportList = res.data;
      this.sports = res.data;
      this.sportList.forEach(ele => {
        ele.properties.forEach(ele2 => {
          ele2.allowed_men = {
            val: ele2.allowed_men,
            uuid: false
          };
          ele2.allowed_woman = {
            val: ele2.allowed_woman,
            uuid: false
          };
        });
      });
      this.sports = this.sportList;
    } catch (error) {
      console.log(error);
    }
  }

  selectSport(e, sport, age, gender) {
    if (e) {
      this.selectSports.push(sport);
    } else {
      for (let i = 0; i < this.selectSports.length; i++) {
        if (this.selectSports[i]._id === sport._id) {
          this.selectSports.splice(i, 1);
          break;
        }
      }
    }
    console.log(e, sport, age, gender);
    console.log(this.selectSports);
  }

  gotoRegsterSport() {
    // const navigationExtras: NavigationExtras = {
    //   queryParams: {
    //     'data': JSON.stringify(this.sports)
    //   }
    // };
    // this.router.navigate(['registersport'], navigationExtras);
    window.localStorage.setItem('data', JSON.stringify(this.sportList));
    this.router.navigate(['registersport']);
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
      const reg = new RegExp(e, 'g');
      const sports = this.sportList.filter(el => {
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
