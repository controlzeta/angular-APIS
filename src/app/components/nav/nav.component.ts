import { Component, OnInit, Input } from '@angular/core';
import { StoreService } from '../../services/store.service'
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/user.model';
import { switchMap, zip } from 'rxjs/operators';
import { Auth } from 'src/app/models/auth.model';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  activeMenu = false;
  counter = 0;
  token? : string;
  userEmail = '';
  constructor(
    private storeService: StoreService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.storeService.myCart$.subscribe(products => {
      this.counter = products.length;
    });
  }

  toggleMenu() {
    this.activeMenu = !this.activeMenu;
  }

  loginAndProfile(){
    this.authService.login('pako@gmail.com', 'password')
    .pipe(
      switchMap(
        (auth : Auth) => 
          this.authService.profile(auth.access_token)
          ),
    )
    .subscribe(
      (rta : User) => {
        console.log(rta);
        this.userEmail = (rta.email);
      });
  }

}
