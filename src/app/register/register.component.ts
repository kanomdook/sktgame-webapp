import { Component, OnInit } from '@angular/core';
import { Api } from '../providers/service/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  data: any = {
    name: '',
    email: '',
    password: '',
    province: '',
    district: ''
  };
  schoolList: Array<any> = [];
  provinces: Array<any> = [];
  opt: Array<any> = [];

  constructor(public api: Api, public router: Router) { }

  ngOnInit() {
    this.getSchools();
  }

  filterProvince(e) {
    this.opt = [];
    this.data.district = '';
    let opts: Array<any> = [];
    opts = this.schoolList.filter(el => {
      return e === el.province;
    });
    const optList: Array<any> = [];
    opts.forEach(el => {
      if (optList.indexOf(el.district) < 0) {
        optList.push(el.district);
      }
    });
    this.opt = optList;
  }

  async getSchools() {
    try {
      const res: any = await this.api.get('/schools');
      const data = res.data;
      this.schoolList = data;
      const provinces: Array<any> = [];
      data.forEach(el => {
        if (provinces.indexOf(el.province) < 0) {
          provinces.push(el.province);
        }
      });
      this.provinces = provinces;
    } catch (error) {
      console.log(error);
    }
  }

  async register() {
    try {
      await this.api.post('/user/signup', this.data);
      alert('สมัครสมาชิกสำเร็จ');
      this.router.navigate(['/login']);
    } catch (error) {
      console.log(error);
      alert('อีเมลถูกใช้ไปแล้ว');
    }
  }

}
