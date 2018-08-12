import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  regForm: FormGroup;


  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.regForm = fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      repPass: ['', Validators.required]
    });
  }

  ngOnInit() {
  }

  createUser(event) {
    this.http.post('http://localhost:8080/addUser', {
      email: this.regForm.controls['email'].value,
      password: this.regForm.controls['password'].value,
      role: 'USER'
    }).subscribe(data => {
      console.log(data);
    }, error1 => {
      console.log(error1);
    });
  }
}
