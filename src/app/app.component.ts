import { Component, Output, EventEmitter } from '@angular/core';
import { AuthService } from './services/auth.service';
import { UsersService } from './services/users.service';
import { Product } from './models/product.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  imgParent = '';
  showImg = true;
  token = '';

  @Output() tokenEmitter = new EventEmitter<string>();

  constructor(
    private authService: AuthService,
    private usersService: UsersService
  ){}

  onLoaded(img: string) {
    console.log('log padre', img);
  }

  toggleImg() {
    this.showImg = !this.showImg;
  }

  createUser(){
    this.usersService.create({
      name : 'Pako',
      email: 'pako@gmail.com',
      password: 'password'
    }).subscribe(rta => {
      console.log(rta);
    });
  }

  login(){
    this.authService.login('pako@gmail.com', 'password').subscribe(
      rta => {
        console.log(rta);
        this.tokenEmitter.emit(rta.access_token);

      }
    )
  }

  getProfile(){
    this.authService.profile(this.token)
    .subscribe( profile => {
      console.log(profile);
    })

  }

}
