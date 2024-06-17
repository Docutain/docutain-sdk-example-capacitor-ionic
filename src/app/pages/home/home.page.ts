import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { DocutainSDK,  DocumentScannerConfiguration, LogLevel, PDFPageFormat} from '@docutain/capacitor-plugin-docutain-sdk';
import { SampleMenue } from '../../app.component.module';
import { FilePicker } from '@capawesome/capacitor-file-picker';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { ErrorHandlingUtils } from '../../app.errorhandling';
import { Router } from '@angular/router';
import { FileOpener } from '@capawesome-team/capacitor-file-opener';
import {  DocumentSource,  ScanSettings,  EditSettings,  ColorSettings,  ScanFilter } from '../../app.component.module';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonicModule],
})
export class HomePage {
  DocumentSource = DocumentSource;
  SampleMenue = SampleMenue;
  SourceSampleMenue: SampleMenue = SampleMenue.DataExtraction;
  ScanFilter = ScanFilter;
  storage = new Storage();

  imgDocumentScanner: string = '';

  constructor(private router: Router) {
    this.storage.create();
  }

  async getPersmission() {
    let permission = await Filesystem.checkPermissions();

    if (permission.publicStorage !== 'granted') {
      permission = await Filesystem.requestPermissions();

      if (permission.publicStorage !== 'granted') {
        return;
      }
    }
  }

  getImage(source: any) {
    let imgType: string = 'black';
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

    if (prefersDark.matches) imgType = 'white';

    switch (source) {
      case SampleMenue.Dokumentenscanner:
        return '../../../assets/document_scanner_' + imgType + '.png';
      case SampleMenue.ReadOCR:
        return '../../../assets/insert_text_' + imgType + '.png';
      case SampleMenue.WritePDF:
        return '.../../../assets/picture_as_pdf_' + imgType + '.png';
      case SampleMenue.DataExtraction:
        return '../../../assets/quick_reference_' + imgType + '.png';
      case SampleMenue.Settings:
      return '../../../assets/settings_' + imgType + '.png';
    }

    return '';
  }


  async openPopupImport(source: SampleMenue) {
    this.SourceSampleMenue = source;

    var popup = document.getElementById('popup-import');
    if (popup != null) {
      popup.classList.toggle('show');
    }
  }

  async openSettings() {
    this.router.navigate(['/settings']);
  }

  async getScanConfig(source: ScanSettings, defaultValue: boolean) {
    await this.storage.get(ScanSettings[source]).then((value) => {
      if (value != null) defaultValue = value;
    });

    return defaultValue;
  }

  async getEditConfig(source: EditSettings, defaultValue: boolean) {
    await this.storage.get(EditSettings[source]).then((value) => {
      if (value != null) defaultValue = value;
    });

    return defaultValue;
  }

  async getScanFilterConfig() {
    var defaultValue: number = 6;

    await this.storage.get('selectedFilter').then((value) => {
      if (value != null) defaultValue = value;
    });

    return this.ScanFilter[defaultValue];
  }

  async getColorLight(source: ColorSettings, defaultValue: string) {
    await this.storage.get(ColorSettings[source] + '_Light').then((value) => {
      if (value != null) defaultValue = value;
    });
    return defaultValue;
  }

  async getColorDark(source: ColorSettings, defaultValue: string) {
    await this.storage.get(ColorSettings[source] + '_Dark').then((value) => {
      if (value != null) defaultValue = value;
    });
    return defaultValue;
  }

  async scanDocument() {
    const options: DocumentScannerConfiguration = {
      allowCaptureModeSetting: await this.getScanConfig(
        ScanSettings.AllowCaptureModeSetting,
        false
      ),
      autoCapture: await this.getScanConfig(ScanSettings.AutoCapture, true),
      autoCrop: await this.getScanConfig(ScanSettings.AutoCrop, true),
      multiPage: await this.getScanConfig(ScanSettings.MultiPage, true),
      preCaptureFocus: await this.getScanConfig(
        ScanSettings.PreCaptureFocus,
        true
      ),
      //onboardingImageSource: "appicon",
//      source: Source.Image,
//      sourceImages:[(await Filesystem.getUri({ path: "image.jpg", directory:Directory.Data })).uri],
      defaultScanFilter: await this.getScanFilterConfig(),
      pageEditConfig: {
        allowPageFilter: await this.getEditConfig(EditSettings.AllowPageFilter, true),
        allowPageRotation: await this.getEditConfig(EditSettings.AllowPageRotation, true),
        allowPageArrangement: await this.getEditConfig(EditSettings.AllowPageArrangement, true),
        allowPageCropping: await this.getEditConfig(EditSettings.AllowPageCropping, true),
        pageArrangementShowDeleteButton: await this.getEditConfig(EditSettings.PageArrangementShowDeleteButton, false ),
        pageArrangementShowPageNumber: await this.getEditConfig(EditSettings.PageArrangementShowPageNumber, true ),
      },
      ColorConfig: {
        ColorTopBarBackground: {
          Light: await this.getColorLight(ColorSettings.ColorTopBarBackground, '#4CAF50'),
          Dark: await this.getColorLight(ColorSettings.ColorTopBarBackground, '#2A2A2A'),
        },
        ColorBottomBarBackground: 
         {Light: await this.getColorLight(ColorSettings.ColorBottomBarBackground, '#FFFFFF'),
          Dark: await this.getColorLight(ColorSettings.ColorBottomBarBackground,'#FF2121'),
        },
        ColorPrimary: {
          Light: await this.getColorLight(ColorSettings.ColorPrimary,'#4CAF50'),
          Dark: await this.getColorLight(ColorSettings.ColorPrimary,'#4CAF50'),
        },
        ColorSecondary: {
          Light: await this.getColorLight(ColorSettings.ColorSecondary,'#4CAF50'),
          Dark: await this.getColorLight(ColorSettings.ColorSecondary,'#4CAF50'),
        },
        ColorOnSecondary: {
          Light: await this.getColorLight(ColorSettings.ColorOnSecondary,'#FFFFFF'),
          Dark: await this.getColorLight(ColorSettings.ColorOnSecondary,'#000000'),
        },
        ColorBottomBarForeground: {
          Light: await this.getColorLight(ColorSettings.ColorBottomBarForeground,'#01060007'),
          Dark: await this.getColorLight(ColorSettings.ColorBottomBarForeground,'#FFBEBE'),
        },
        ColorScanButtonsForeground: {
          Light: await this.getColorLight(ColorSettings.ColorScanButtonsForeground,'#FFFFFF'),
          Dark: await this.getColorLight(ColorSettings.ColorScanButtonsForeground,'#FFFFFF'),
        },
        ColorScanButtonsLayoutBackground: {
          Light: await this.getColorLight(ColorSettings.ColorScanButtonsLayoutBackground,'#121212'),
          Dark: await this.getColorLight(ColorSettings.ColorScanButtonsLayoutBackground,'#121212'),
        },
        ColorScanPolygon: {
          Light: await this.getColorLight(ColorSettings.ColorScanPolygon,'#4CAF50'),
          Dark: await this.getColorLight(ColorSettings.ColorScanPolygon,'#4CAF50'),
        },
        ColorTopBarForeground: {
          Light: await this.getColorLight(ColorSettings.ColorScanPolygon,'#FFFFFF'),
          Dark: await this.getColorLight(ColorSettings.ColorScanPolygon,'#DEFFFF'),
        },
      },
    };

    //start the scanner
    try{
      await DocutainSDK.scanDocument({config: options});
    }
    catch (err) {
      ErrorHandlingUtils.DocutainError('scanDocument', err);  
    }
}
  
  async onSourceSelected(source: DocumentSource) {
    console.log('onSourceSelected ' + source);
    if (source == DocumentSource.Dokumentenscanner) {
      //see [https://docs.docutain.com/docs/capacitor/docScan] for more information
      //define a DocumentScannerConfiguration to alter the scan process
      await this.scanDocument();
    } else {
      //load a file
      console.log('pickFileLoad ' + source);
      const rc = await this.pickFileLoad(source);
      if (!rc) return;
    }
    switch (this.SourceSampleMenue) {
      case SampleMenue.DataExtraction:
        // analyze the document and show the result
        this.router.navigate(['/analyze.result']);
        break;
      case SampleMenue.ReadOCR:
        // read OCR and show the result
        this.router.navigate(['/text.result']);
        break;
      case SampleMenue.WritePDF:
        this.getPersmission();
        //generate the PDF from the currently loaded document
        //the generated PDF also contains the detected text, making the PDF searchable
        //see [https://docs.docutain.com/docs/capacitor/pdfCreation] for more details
        
        var filePath = (await Filesystem.getUri({ path: "sample.pdf", directory:Directory.Data })).uri
        var args = {
          fileUri: filePath,
          overWrite: true,
          pageFormat: PDFPageFormat.A4
        };
       
      
        try{
          const result = await DocutainSDK.writePDF(args);
          //open the PDF for demonstration purposes
          FileOpener.openFile({ path: result.fileUri })
          .then(() => console.log('File is opened: ' + result.fileUri))
          .catch((error) => ErrorHandlingUtils.exception('fileOpener',error));
        }
        catch(error){
          ErrorHandlingUtils.DocutainError('writePDF',error);
        } 
        break;
    }
  }

  async pickFileLoad(source: DocumentSource): Promise<boolean> {
    this.getPersmission();

    console.log('DocumentPicker ' + source);
    var rc = false;
    // Select a PDF file or an image depending on the selected data source
    try {
      var result = null;
      if (source == DocumentSource.ImageImport) {
        console.log('pickImages ' + source);
        result = await FilePicker.pickFiles({
          types: [
            'image/jpg',
            'image/jpeg',
            'image/png',
            'image/tif',
            'image/tiff',
            'image/heic',
          ],
          multiple: false,
        });
      } else {
        console.log('pickFiles ' + source);
        result = await FilePicker.pickFiles({
          types: ['application/pdf'],
          multiple: false,
        });
      }

      if (result.files.length > 0 && result.files[0].path != null) {
        // Import a PDF or image
        try{
          await DocutainSDK.loadFile({ filepath: result.files[0].path })
        }
        catch(error)
        {
          ErrorHandlingUtils.DocutainError('loadFile', error);
        }
      }

    } catch (err) {
      /*if (DocumentPicker.isCancel(err)) {
        return false
      } else {
        console.error(err)
      }*/
    }
    return true;
  }

}
