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
    this.loadWorker();
    AdMob.showBanner(this.options);
    AdMob.prepareInterstitial(this.interstitialOptions);
   
    
   }
  //  admob===================================================================

  private options: AdOptions = {
    adId: 'ca-app-pub-3940256099942544/6300978111',
    adSize: AdSize.BANNER,
    position: AdPosition.BOTTOM_CENTER,
    margin: 0,
    isTesting:true,
  };
  private interstitialOptions: AdOptions = {
    adId: 'ca-app-pub-3940256099942544/1033173712',
    isTesting:true,
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
  async loadWorker(){
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
    await this.worker.loadLanguage('eng');
    await this.worker.initialize('eng');
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

}
