import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { DocutainSDK, AnalyzeConfiguration } from '@docutain/capacitor-plugin-docutain-sdk'
import { ErrorHandlingUtils } from '../../app.errorhandling';

@Component({
  selector: 'app-analyze.result',
  templateUrl: './analyze.result.page.html',
  styleUrls: ['./analyze.result.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class AnalyzeResultPage implements OnInit {

  constructor() { 
      this.SetAnalyzeConfig();
      this.analyze();
  }

  ngOnInit() {
  }

  Name1: String = '';
  Name2: String = '';
  Name3: String = '';
  Zipcode: String = '';
  City: String = '';
  Street: String = '';
  Phone: String = '';
  CustomerID: String = '';
  IBAN: String = '';
  BIC: String = '';
  Date: String = '';
  Amount: String = '';
  InvoiceID: String = '';
  Reference: String = '';
  PaymentState: String = '';


  async SetAnalyzeConfig(){
  try {
    console.log('vor SetAnalyzeConfig');
    const config: AnalyzeConfiguration = {
      readBIC: true,
      readPaymentState: true
    }
    await DocutainSDK.setAnalyzeConfiguration({config:config});
  } catch (err) {
    ErrorHandlingUtils.DocutainError('setAnalyzeConfiguration', err);  
  }
};

  async analyze() {
      //analyze the currently loaded document and get the detected data
    var analyzeData: string = "";
    try{
      analyzeData = (await DocutainSDK.analyze()).data;
      console.log('AnalyzeResultScreen Response: ' + analyzeData)
      //detected data is returned as JSON, so serializing the data in order to extract the key value pairs
      //see [https://docs.docutain.com/docs/capacitor/dataExtraction] for more information
    }
    catch(err)
    {
      ErrorHandlingUtils.DocutainError('analyzeData', err);  
    }

    const dataObject = JSON.parse(analyzeData)  

    console.log('AnalyzeResultScreen dataObject: ' + dataObject)

    const bank = dataObject.Address.Bank;

    console.log('AnalyzeResultScreen bank: ' + bank)
 
    this.Name1 = dataObject.Address.Name1;
    this.Name2 = dataObject.Address.Name2;
    this.Name2 = dataObject.Address.Name2;
    this.Zipcode = dataObject.Address.Zipcode;
    this.City = dataObject.Address.City;
    this.Street = dataObject.Address.Street;
    this.Phone = dataObject.Address.Phone;
    this.CustomerID = dataObject.Address.CustomerId;
    this.Date = dataObject.Date;
    this.Amount = dataObject.Amount;
    this.InvoiceID = dataObject.InvoiceId;
    this.Reference = dataObject.Reference;
    this.PaymentState = dataObject.PaymentState;

    //TODO: handle multiple bank accounts. In the example we only use the first one
    if(dataObject.Address.Bank.length > 0){

        this.IBAN = dataObject.Address.Bank[0].IBAN;
        this.BIC = dataObject.Address.Bank[0].BIC;
    }
  }
}
