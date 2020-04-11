import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(
    private fireauth: AngularFireAuth,
    private router: Router,
    private alertCtrl: AlertController
  ) {}

  logout() {
    this.fireauth.auth.signOut()
      .then(() => {
        this.router.navigate(['login']);
      })
      .catch((err) => {
        let msg = err.message;

        this.presentAlert("Failed", msg);
      });
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
