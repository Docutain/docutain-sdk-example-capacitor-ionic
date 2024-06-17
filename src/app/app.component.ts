import { Component } from '@angular/core';
import { App } from '@capacitor/app';
import { IonicModule } from '@ionic/angular';
import { DocutainSDK, AnalyzeConfiguration, LogLevel } from '@docutain/capacitor-plugin-docutain-sdk';
import { ErrorHandlingUtils } from './app.errorhandling';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: true,
  imports: [IonicModule],
})
export class AppComponent {
  constructor() {
    this.InitDocutainSDK();
  }

  License_Key:string = "<YOUR_LICENSE_KEY_HERE>";

  async showTrialLicenseAlert() {
    const alert = document.createElement('ion-alert');
    alert.header = 'License key is required';
    alert.message =
      'A valid trial license key is required! You can generate a trial license key for "de.docutain.sdk_example_capacitor_ionic" on our website.';
    alert.buttons = [
      {
        text: 'Open sdk.docutain.com/TrialLicense',
        role: 'confirm',
        handler: () => {
          window.open(
            'https://sdk.docutain.com/TrialLicense?Source=4588041',
            '_self'
          );
          App.exitApp();
        },
      },
    ];

    document.body.appendChild(alert);
    await alert.present();
  }

  async InitDocutainSDK() {
    try {
      await DocutainSDK.initSDK({ licenseKey: this.License_Key });
    } catch (err) {
      console.log('initSDK ' + this.License_Key + ' failed: ' + err);
      if (this.License_Key == '<YOUR_LICENSE_KEY_HERE>') {
        //init of Docutain SDK failed, no trial license provided
        await this.showTrialLicenseAlert();
      } else {
        //init of Docutain SDK failed, get the last error message
        ErrorHandlingUtils.DocutainError('initSDK', err);
      }
      return false;
    }
    await DocutainSDK.setLogLevel({ logLevel: LogLevel.Verbose });
    const config: AnalyzeConfiguration = {
      readBIC: true,
      readPaymentState: true,
    };
    await DocutainSDK.setAnalyzeConfiguration({ config: config });
    console.log('DocutainSDK.initSDK OK');
    return true;
  }
}
