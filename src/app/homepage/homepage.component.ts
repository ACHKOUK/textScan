import { Component, OnInit } from '@angular/core';
import { Plugins,CameraResultType, CameraSource, } from '@capacitor/core';
const {Camera} = Plugins ;
const { AdMob } = Plugins;
import { AdOptions, AdSize, AdPosition } from '@capacitor-community/admob';
import { Router } from '@angular/router';
import { LoadingController  } from '@ionic/angular';
import {TextocrService} from '../services/textocr.service';
import {createWorker} from 'tesseract.js'

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
})
export class HomepageComponent implements OnInit {
  classburger=false;
   classnav=false;
   image = '';
   ocrResult = '' ;
  captureProgress = 0 ;
  captureProgress1=0;
  worker: Tesseract.Worker ;
  workerReady =  false ;

  constructor(private route : Router,private OcrService :TextocrService,public loadingController: LoadingController) {
    this.loadWorker('eng');
    AdMob.showBanner(this.options);
    AdMob.prepareInterstitial(this.interstitialOptions);
   
    
   }
  //  admob===================================================================

  private options: AdOptions = {
    adId: 'ca-app-pub-7384307259973724/8648720360',
    adSize: AdSize.BANNER,
    position: AdPosition.BOTTOM_CENTER,
    margin: 0,
    isTesting:false,
  };
  private interstitialOptions: AdOptions = {
    adId: 'ca-app-pub-7384307259973724/5136866677',
    isTesting:false,
  };
  loadinterstitial() {
    AdMob.prepareInterstitial(this.interstitialOptions).then(
      async (res) => {
        let rese = await res;
        AdMob.showInterstitial();
      }
    );
  }
  // ========================================================================

  ngOnInit() {
    this.captureProgress=0;
    this.captureProgress1=0;
  }
  async loadWorker(lng){
    this.worker = createWorker({
      logger: progress => {
        if(progress.status === 'recognizing text'){
          this.captureProgress = parseInt('' + progress.progress * 100 );
          if ( this.captureProgress==100) {
            setTimeout(() => {
              this.captureProgress1=0;
            }, 1000);
           
          }
        }
      }
    });
    await this.worker.load();
    await this.worker.loadLanguage(lng);
    await this.worker.initialize(lng);
    this.workerReady = true ; 
    
  }
  loading:any;
  async presentLoading() {
    this.loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Please wait...',
      duration:3000

    });
    await this.loading.present();

    const { role, data } = await this.loading.onDidDismiss();
  }
  async captureImage(sourceType){
    this.captureProgress1=0;

    if (sourceType==1) {
      const image = await Camera.getPhoto({
        quality: 50,
        // allowEditing: true,
        
        resultType: CameraResultType.DataUrl,
        source: CameraSource.Photos,
      });
      this.image = image.dataUrl ;
    } else {
      const image = await Camera.getPhoto({
        quality: 50,
        // allowEditing: true,
        saveToGallery:true,
        width:500,
        height:500,
        preserveAspectRatio:true,
        resultType: CameraResultType.DataUrl,
        source: CameraSource.Camera,
      });
      this.image = image.dataUrl ;
    }

  }
  async recognieImage(){
    this.captureProgress1=1;
    // this.presentLoading();
    const result = await this.worker.recognize(this.image);
    this.ocrResult = result.data.text ; 
    this.OcrService.text=this.ocrResult;
    this.loadinterstitial();
    this.route.navigate(['showtext']);
  }
  // async recognieImage(){
  //   let options ={
  //     licenseFileName:this.image,
  //     selectableRecognitionLanguages: ["English", "French", "German"],
  //     recognitionLanguages:["English"],
  //     areaOfInterest:"0.8 0.3",
  //     isFlashlightVisible:true,
  //     isStopButtonVisible:true,
  //     orientation:"portrait",
  //   }
  //   this.abbyyRTR.startTextCapture(options)
  // .then((res: any) => console.log(res))
  // .catch((error: any) => console.error(error));
 
  // }
  slectLng(lng){
    this.loadWorker(lng.target.value);
  }
  lng=[
    {name:'Afrikaans',lng:'afr'},
    {name:'Amharic',lng:'amh'},
    {name:'Arabic',lng:'ara'},
    {name:'Assamese',lng:'asm'},
    {name:'Azerbaijani',lng:'aze'},
    {name:'Azerbaijani - Cyrillic',lng:'aze_cyrl'},
    {name:'Belarusian',lng:'bel'},
    {name:'Bengali',lng:'ben'},
    {name:'Tibetan',lng:'bod'},
    {name:'Bosnian',lng:'bos'},
    {name:'Bulgarian',lng:'bul'},
    {name:'Catalan; Valencian',lng:'cat'},
    {name:'Cebuano',lng:'ceb'},
    {name:'Czech',lng:'ces'},
    {name:'Chinese - Simplified',lng:'chi_sim'},
    {name:'Chinese - Traditional',lng:'chi_tra'},
    {name:'Cherokee',lng:'chr'},
    {name:'Welsh',lng:'cym'},
    {name:'Danish',lng:'dan'},
    {name:'German',lng:'deu'},
    {name:'Dzongkha',lng:'dzo'},
    {name:'Greek, Modern (1453-)',lng:'ell'},
    {name:'English',lng:'eng'},
    {name:'English, Middle (1100-1500)',lng:'enm'},
    {name:'Esperanto',lng:'epo'},
    {name:'Estonian',lng:'est'},
    {name:'Basque',lng:'eus'},
    {name:'Persian',lng:'fas'},
    {name:'Finnish',lng:'fin'},
    {name:'French',lng:'fra'},
    {name:'German Fraktur',lng:'frk'},
    {name:'French, Middle (ca. 1400-1600)',lng:'frm'},
    {name:'Irish',lng:'gle'},
    {name:'Galician',lng:'glg'},
    {name:'Greek, Ancient (-1453)',lng:'grc'},
    {name:'Gujarati',lng:'guj'},
    {name:'Haitian; Haitian Creole',lng:'hat'},
    {name:'Hebrew',lng:'heb'},
    {name:'Hindi',lng:'hin'},
    {name:'Croatian',lng:'hrv'},
    {name:'Hungarian',lng:'hun'},
    {name:'Inuktitut',lng:'iku'},
    {name:'Indonesian',lng:'ind'},
    {name:'Icelandic',lng:'isl'},
    {name:'Italian',lng:'ita'},
    {name:'Italian - Old',lng:'ita_old'},
    {name:'Javanese',lng:'jav'},
    {name:'Japanese',lng:'jpn'},
    {name:'Kannada',lng:'kan'},
    {name:'Georgian',lng:'kat'},
    {name:'Georgian - Old',lng:'kat_old'},
    {name:'Kazakh',lng:'kaz'},
    {name:'Central Khmer',lng:'khm'},
    {name:'Kirghiz; Kyrgyz',lng:'kir'},
    {name:'Korean',lng:'kor'},
    {name:'Kurdish',lng:'kur'},
    {name:'Lao',lng:'lao'},
    {name:'Latin',lng:'lat'},
    {name:'Latvian',lng:'lav'},
    {name:'Lithuanian',lng:'lit'},
    {name:'Malayalam',lng:'mal'},
    {name:'Marathi',lng:'mar'},
    {name:'Macedonian',lng:'mkd'},
    {name:'Maltese',lng:'mlt'},
    {name:'Malay',lng:'msa'},
    {name:'Burmese',lng:'mya'},
    {name:'Nepali',lng:'nep'},
    {name:'Dutch; Flemish',lng:'nld'},
    {name:'Norwegian',lng:'nor'},
    {name:'Oriya',lng:'ori'},
    {name:'Panjabi; Punjabi',lng:'pan'},
    {name:'Polish',lng:'pol'},
    {name:'Portuguese',lng:'por'},
    {name:'Pushto; Pashto',lng:'pus'},
    {name:'Romanian; Moldavian; Moldovan',lng:'ron'},
    {name:'Russian',lng:'rus'},
    {name:'Sanskrit',lng:'san'},
    {name:'Sinhala; Sinhalese',lng:'sin'},
    {name:'Slovak',lng:'slk'},
    {name:'Slovenian',lng:'slv'},
    {name:'Spanish; Castilian',lng:'spa'},
    {name:'Spanish; Castilian - Old',lng:'spa_old'},
    {name:'Albanian',lng:'sqi'},
    {name:'Serbian',lng:'srp'},
    {name:'Serbian - Latin',lng:'srp_latn'},
    {name:'Swahili',lng:'swa'},
    {name:'Swedish',lng:'swe'},
    {name:'Syriac',lng:'syr'},
    {name:'Tamil',lng:'tam'},
    {name:'Telugu',lng:'tel'},
    {name:'Tajik',lng:'tgk'},
    {name:'Tagalog',lng:'tgl'},
    {name:'Thai',lng:'tha'},
    {name:'Tigrinya',lng:'tir'},
    {name:'Turkish',lng:'tur'},
    {name:'Uighur; Uyghur',lng:'uig'},
    {name:'Ukrainian',lng:'ukr'},
    {name:'Urdu',lng:'urd'},
    {name:'Uzbek',lng:'uzb'},
    {name:'Uzbek - Cyrillic',lng:'uzb_cyrl'},
    {name:'Vietnamese',lng:'vie'},
    {name:'Yiddish',lng:'yid'},
    
  ]
}
