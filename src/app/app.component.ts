import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Plugins } from '@capacitor/core';
const { AdMob } = Plugins;
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Accueil', url: '/home', icon: 'home' },
    { title: 'Partager', url: '/home', icon: 'share-social' },
    { title: 'Autres App', url: 'https://play.google.com/store/apps/dev?id=5651147602965231948&gl=MA', icon: 'download' },
    { title: 'Politique de confidentialité', url: '/home', icon: 'document-lock' },
  ];
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
  constructor(private platform: Platform) {
    AdMob.initialize('ca-app-pub-3940256099942544~3347511713');
  }
  onexit(){
    navigator['app'].exitApp();
    }

}
