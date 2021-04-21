import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Plugins } from '@capacitor/core';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
const { AdMob } = Plugins;
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Home', url: '/home', icon: 'home' },
    // { title: 'Partager', url: '/home', icon: 'share-social' },
    // { title: 'Autres App', url: 'https://play.google.com/store/apps/dev?id=5651147602965231948&gl=MA', icon: 'download' },
    // { title: 'Politique de confidentialité', url: '/home', icon: 'document-lock' },
  ];
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
  constructor(private platform: Platform,private socialSharing: SocialSharing) {
    AdMob.initialize('ca-app-pub-7384307259973724~5040647849');
  }
  SocialShare(){
    let options = {
       message: 'share App', // not supported on some apps (Facebook, Instagram)
       url: 'https://play.google.com/store/apps',
     };
 
     this.socialSharing.shareWithOptions(options);
   }
 
 
   rateUs(){
     window.open('https://play.google.com/store/apps/details?id=com.textscan.ma');
   }
 
   moreApp(){
     window.open('https://play.google.com/store/apps/dev?id=5651147602965231948&gl=MA');
   }
   PrivacyPolicy(){
    window.open('https://ilammedia.ma/permisMaroc/PrivacyOCR.html');
   }
  onexit(){
    navigator['app'].exitApp();
    }

}
