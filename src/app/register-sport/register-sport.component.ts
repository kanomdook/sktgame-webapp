import { Component, OnInit, ViewChild } from '@angular/core';
import { Api } from '../providers/service/api';
// import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-register-sport',
  templateUrl: './register-sport.component.html',
  styleUrls: ['./register-sport.component.css']
})
export class RegisterSportComponent implements OnInit {
  // private route: ActivatedRoute
  @ViewChild('profileImg') profileImg;
  @ViewChild('citizenImg') citizenImg;
  selectSportList: Array<any> = [];
  data: any = {
    name: '',
    email: '',
    password: '',
    gender: '',
    province: '',
    district: '',
    peopleType: '',
    age: 0
  };
  schoolList: Array<any> = [];
  provinces: Array<any> = [];
  opt: Array<any> = [];
  oldPassword: any = '';
  profileImgModel: any;
  profileImgBase64: any = '';
  citizenImgBase64: any = '';

  constructor(public api: Api) {
    // this.route.queryParams.subscribe(params => {
    //   this.data = JSON.parse(params['data']);
    //   console.log(this.data);
    // });
  }

  ngOnInit() {
    this.selectSportList = JSON.parse(window.localStorage.getItem('data'));
    console.log(this.selectSportList);
    this.getSchools();
  }

  uploadImg() {
    this.profileImg.nativeElement.click();
  }

  uploadCitizenImg() {
    this.citizenImg.nativeElement.click();
  }

  onProfileImgChange(e) {
    const fileBrowser = this.profileImg.nativeElement;
    const reader = new FileReader();
    reader.readAsDataURL(fileBrowser.files.length > 0 ? fileBrowser.files[0] : null);
    if (fileBrowser.files.length > 0) {
      reader.onload = () => {
        const base64 = reader.result.replace(/\n/g, '');
        this.profileImgBase64 = base64;
      };
    }
  }

  onCitizenImgChange(e) {
    const fileBrowser = this.citizenImg.nativeElement;
    const reader = new FileReader();
    reader.readAsDataURL(fileBrowser.files.length > 0 ? fileBrowser.files[0] : null);
    if (fileBrowser.files.length > 0) {
      reader.onload = () => {
        const base64 = reader.result.replace(/\n/g, '');
        this.citizenImgBase64 = base64;
      };
    }
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

  calAge(e) {
    if (e) {
      const today1 = new Date();
      const today = new Date(today1.getFullYear(), today1.getMonth(), today1.getDate());
      const birthDate = new Date(e.year, e.month - 1, e.day);
      let age = today.getFullYear() - birthDate.getFullYear();
      const m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      if (age <= 0) {
        this.data.age = 0;
        setTimeout(() => {
          this.data.birthday = '';
        }, 200);
      } else {
        this.data.age = age;
      }
    }
  }

  async save() {
    // try {
    //   if (this.oldPassword !== this.data.password) {
    //     this.data.changedPassword = true;
    //   } else {
    //     this.data.changedPassword = false;
    //   }
    //   const res: any = await this.api.put('/user/' + this.data._id, this.data);
    //   window.localStorage.setItem('user', JSON.stringify(res.data));
    //   alert('แก้ไขข้อมูลส่วนตัวสำเร็จ');
    // } catch (error) {
    //   console.log(error);
    // }
  }

}
