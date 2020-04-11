import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  email: any;
  password: any;

  constructor(
    private fireauth: AngularFireAuth,
    private router: Router,
    private alertCtrl: AlertController
  ) { }

  ngOnInit() {
  }

  login() {
    this.fireauth.auth.signInWithEmailAndPassword(this.email, this.password)
      .then((res) => {
        if (res.user) {
          // Login Success
          this.router.navigate(['home']);
        }
      }).catch((err) => {
        let msg = err.message;

        this.presentAlert("Error", msg);
      })
  }

  async presentAlert(header, msg) {
    const alert = await this.alertCtrl.create({
      header: header,
      message: msg,
      buttons: ['OK']
    });

    await alert.present();
  }

}
