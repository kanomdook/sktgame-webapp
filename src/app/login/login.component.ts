import { Component, OnInit } from '@angular/core';
import { Api } from '../providers/service/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  data: any = {
    email: '',
    password: ''
  };

  constructor(public api: Api, public router: Router) { }

  ngOnInit() {
  }

  async login() {
    try {
      const res: any = await this.api.post('/user/signin', this.data);
      window.localStorage.setItem('user', JSON.stringify(res.data));
      if (res.data.role !== 'unactive') {
        this.router.navigate(['/dashboard']);
      } else {
        this.router.navigate(['/registersport']);
      }
    } catch (error) {
      this.data = {
        email: '',
        password: ''
      };
      console.log(error);
      alert('ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง');
    }
  }

}
