import { Component, OnInit } from '@angular/core';
import { Clipboard } from '@ionic-native/clipboard/ngx';
import {TextocrService} from '../services/textocr.service';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { File, IWriteOptions } from '@ionic-native/file/ngx';
import { AppVersion } from '@ionic-native/app-version/ngx';


import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-showtext',
  templateUrl: './showtext.component.html',
  styleUrls: ['./showtext.component.scss'],
})
export class ShowtextComponent implements OnInit {
  text: any;
  copytext: any;
  pdfObj=null;
  AppName:any;
  constructor(private OcrService: TextocrService, private clipboard: Clipboard,private file :File,
    private socialSharing: SocialSharing,private fileOpener: FileOpener,private appVersion: AppVersion) { 
    this.text=this.OcrService.text;
    this.appVersion.getAppName().then(value => {
      this.AppName = value;
      alert(this.AppName);
    }).catch(err => {
    });

    
  }

  ngOnInit() {
    this.createPdf();
  }
  copyText() {
    this.clipboard.copy(this.text).then
  }
  shar(){
    var options = {
      message: this.text,
    };

   this.socialSharing.shareWithOptions(options);
  }
  textpdf:any;
  createPdf(){
    const docDefinition={
      watermark:{text:'Text Scan',color:'blue',opacity:0.2,blod:true},
      content: [{text:this.text,style:'header'}],
      styles: {
        header: {
          fontSize: 28,
          bold: true
        },}
    }
    this.pdfObj= pdfMake.createPdf(docDefinition);
     this.pdfObj.getBase64(async (data) => {
      try {
       this.textpdf=data;
      //  alert('txt pdf '+ this.textpdf)
      }  catch(e){
        alert('err '+ e)
      }
    });

  }
 async downloadPdf(){
 
    const base64Response = await fetch(`data:application/pdf;base64,${this.textpdf}`);
    const blob = await base64Response.blob();
    let directory = this.file.externalDataDirectory;

    const fileName = "OCR_" + Date.now() + ".pdf";
    let options: IWriteOptions = { replace: true };
    
  await  this.file.writeFile(directory, fileName,blob, options)
    .then((success) =>
    this.fileOpener.open(directory + '/' + fileName, 'application/pdf').then(() => console.log('File is opened'))
    )
    .catch((error) => console.log("Cannot Create File " + JSON.stringify(error)));
    // this.pdfObj.getBase64(async (data) => {
    //   try {
        
    //     let path =`myletterocr_${Date.now()}.pdf`;

    //     const result= await Filesystem.writeFile({
    //       path:path,
    //       data:data,
    //       directory:FilesystemDirectory.Documents,
    //       recursive:true
    //     });
    //     this.fileOpener.open(`${result.uri}`,'application/pdf');
    //    alert(result.uri);
    
    //   }  catch(e){
    //     alert('err '+ e)
    //   }
    // });
  }
}
