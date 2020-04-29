import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook/ngx';
import * as firebase from 'firebase/app';

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
    private alertCtrl: AlertController,
    private fb: Facebook,
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

  async fblogin() {
    this.fb.login(['email'])
    .then((response: FacebookLoginResponse) => {
      this.onLoginSuccess(response);
      console.log(response.authResponse.accessToken);
    }).catch((error) => {
      console.log(error)
      alert('error:' + error)
    });
  }

  onLoginSuccess(response: FacebookLoginResponse) {
    const credential = firebase.auth.FacebookAuthProvider.credential(response.authResponse.accessToken);

    this.fireauth.auth.signInWithCredential(credential)
      .then((response) => {
        this.router.navigate(["/profile"]);
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
