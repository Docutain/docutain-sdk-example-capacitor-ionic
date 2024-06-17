import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { DocutainSDK } from '@docutain/capacitor-plugin-docutain-sdk';
import { ErrorHandlingUtils } from '../../app.errorhandling';

@Component({
  selector: 'app-text.result',
  templateUrl: './text.result.page.html',
  styleUrls: ['./text.result.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class TextResultPage implements OnInit {
  constructor() {
    this.getText();
  }

  ngOnInit() {}

  Text: string = '';

  async getText() {
    //get the text of all currently loaded pages
    //see [https://docs.docutain.com/docs/capacitor/textDetection] for more details
    try {
      var Text = (await DocutainSDK.getText()).text;
      this.Text = Text.replace(/\n/g, '<br/>');
      var textDiv = document.getElementById('text-result');
      if(textDiv != null)
        textDiv.innerHTML = this.Text;
    } catch (err) {
      ErrorHandlingUtils.DocutainError('getText', err);
    }
  }
}
