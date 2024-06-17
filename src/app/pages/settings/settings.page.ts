import {
  Component,
  OnInit,
  ViewContainerRef,
  Inject,
  ChangeDetectorRef,
} from '@angular/core';
import { CommonModule, KeyValue } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { ColorPickerService, ColorPickerModule } from 'ngx-color-picker';
import {
  ScanSettings,
  EditSettings,
  ColorSettings,
  TextRessources,
} from '../../app.component.module';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ColorPickerModule],
})
export class SettingsPage implements OnInit {
  ScanSettings = ScanSettings;
  EditSettings = EditSettings;
  ColorSettings = ColorSettings;
  TextRessources = TextRessources;

  ScanSettingsData: Array<ScanSettingsData> = [];
  EditSettingsData: Array<EditSettingsData> = [];
  ColorSettingsData: Array<ColorSettingsData> = [];
  selectedFilter: number = 6;

  storage = new Storage();

  constructor(
    public vcRef: ViewContainerRef,
    public cdr: ChangeDetectorRef,
    private cpService: ColorPickerService
  ) {}

  async loadSettings() {
    await this.storage.create();

    for (var entryScan of this.ScanSettingsData) {
      await this.storage.get(ScanSettings[entryScan.key]).then((value) => {
        if (value != null) entryScan.isToggled = value;
      });
    }

    await this.storage.get('selectedFilter').then((value) => {
      if (value != null) this.selectedFilter = value;
    });

    for (var entryEdit of this.EditSettingsData) {
      console.log(entryEdit);
      await this.storage.get(EditSettings[entryEdit.key]).then((value) => {
        if (value != null) entryEdit.isToggled = value;
      });
    }

    for (var entryColor of this.ColorSettingsData) {
      await this.storage
        .get(ColorSettings[entryColor.key] + '_Light')
        .then((value) => {
          if (value != null) entryColor.colorLight = value;
        });
      await this.storage
        .get(ColorSettings[entryColor.key] + '_Dark')
        .then((value) => {
          if (value != null) entryColor.colorDark = value;
        });
    }
  }

  async initSettings() {
    this.ScanSettingsData = [
      new ScanSettingsData(ScanSettings.AllowCaptureModeSetting, false),
      new ScanSettingsData(ScanSettings.AutoCapture, true),
      new ScanSettingsData(ScanSettings.AutoCrop, true),
      new ScanSettingsData(ScanSettings.MultiPage, true),
      new ScanSettingsData(ScanSettings.PreCaptureFocus, true),
    ];

    this.selectedFilter = 6;

    this.EditSettingsData = [
      new EditSettingsData(EditSettings.AllowPageFilter, true),
      new EditSettingsData(EditSettings.AllowPageRotation, true),
      new EditSettingsData(EditSettings.AllowPageArrangement, true),
      new EditSettingsData(EditSettings.AllowPageCropping, true),
      new EditSettingsData(EditSettings.PageArrangementShowDeleteButton, false),
      new EditSettingsData(EditSettings.PageArrangementShowPageNumber, true),
    ];

    this.ColorSettingsData = [
      new ColorSettingsData(ColorSettings.ColorPrimary, '#4CAF50', '#4CAF50'),
      new ColorSettingsData(ColorSettings.ColorSecondary, '#4CAF50', '#4CAF50'),
      new ColorSettingsData(
        ColorSettings.ColorOnSecondary,
        '#FFFFFF',
        '#000000'
      ),
      new ColorSettingsData(
        ColorSettings.ColorScanButtonsLayoutBackground,
        '#121212',
        '#121212'
      ),
      new ColorSettingsData(
        ColorSettings.ColorScanButtonsForeground,
        '#FFFFFF',
        '#FFFFFF'
      ),
      new ColorSettingsData(
        ColorSettings.ColorScanPolygon,
        '#4CAF50',
        '#4CAF50'
      ),
      new ColorSettingsData(
        ColorSettings.ColorBottomBarBackground,
        '#FFFFFF',
        '#FF2121'
      ),
      new ColorSettingsData(
        ColorSettings.ColorBottomBarForeground,
        '#01060007',
        '#FFBEBEBE'
      ),
      new ColorSettingsData(
        ColorSettings.ColorTopBarBackground,
        '#4CAF50',
        '#2A2A2A'
      ),
      new ColorSettingsData(
        ColorSettings.ColorTopBarForeground,
        '#FFFFFF',
        '#DEFFFF'
      ),
    ];
  }

  ngOnInit() {
    this.initSettings();
    this.loadSettings();
  }

  async onScanSettings(source: ScanSettings) {
    await this.storage.set(
      ScanSettings[source],
      this.ScanSettingsData[source].isToggled
    );
  }

  async onEditSettings(source: EditSettings) {
    await this.storage.set(
      EditSettings[source],
      this.EditSettingsData[source].isToggled
    );
  }

  async onColorLight(color: any, source: ColorSettings) {
    this.ColorSettingsData[source].colorLight = color;
    await this.storage.set(
      ColorSettings[source] + '_Light',
      this.ColorSettingsData[source].colorLight
    );
  }

  async onColorDark(color: any, source: ColorSettings) {
    this.ColorSettingsData[source].colorDark = color;
    await this.storage.set(
      ColorSettings[source] + '_Dark',
      this.ColorSettingsData[source].colorDark
    );
  }

  async onSelectedFilter() {
    await this.storage.set('selectedFilter', this.selectedFilter);
  }

  async onReset() {
    this.initSettings();

    for (var entryScan of this.ScanSettingsData) {
      await this.storage.set(ScanSettings[entryScan.key], entryScan.isToggled);
    }

    await this.storage.set('selectedFilter', this.selectedFilter);

    for (var entryEdit of this.EditSettingsData) {
      await this.storage.set(EditSettings[entryEdit.key], entryEdit.isToggled);
    }

    for (var entryColor of this.ColorSettingsData) {
      await this.storage.set(
        ColorSettings[entryColor.key] + '_Light',
        entryColor.colorLight
      );
      await this.storage.set(
        ColorSettings[entryColor.key] + '_Dark',
        entryColor.colorDark
      );
    }
  }

  public presetValues: string[] = [];

  public colorList = [
    { key: 'flame', value: '#e45a33', friendlyName: 'Flame' },
    { key: 'orange', value: '#fa761e', friendlyName: 'Orange' },
    { key: 'infrared', value: '#ef486e', friendlyName: 'Infrared' },
    { key: 'male', value: '#4488ff', friendlyName: 'Male Color' },
    { key: 'female', value: '#ff44aa', friendlyName: 'Female Color' },
    { key: 'paleyellow', value: '#ffd165', friendlyName: 'Pale Yellow' },
    { key: 'gargoylegas', value: '#fde84e', friendlyName: 'Gargoyle Gas' },
    { key: 'androidgreen', value: '#9ac53e', friendlyName: 'Android Green' },
    {
      key: 'carribeangreen',
      value: '#05d59e',
      friendlyName: 'Carribean Green',
    },
    { key: 'bluejeans', value: '#5bbfea', friendlyName: 'Blue Jeans' },
    {
      key: 'cyancornflower',
      value: '#1089b1',
      friendlyName: 'Cyan Cornflower',
    },
    { key: 'warmblack', value: '#06394a', friendlyName: 'Warm Black' },
  ];
}

class ScanSettingsData {
  constructor(key: ScanSettings, @Inject(Boolean) isToggled: boolean) {
    this.key = key;
    this.text = TextRessources[ScanSettings[key]];
    this.description = TextRessources[ScanSettings[key] + '_Description'];
    this.isToggled = isToggled;
  }

  key: number;
  text: string;
  description: string;
  isToggled: boolean;
}

class EditSettingsData {
  constructor(key: EditSettings, @Inject(Boolean) isToggled: boolean) {
    this.key = key;
    this.text = TextRessources[EditSettings[key]];
    this.description = TextRessources[EditSettings[key] + '_Description'];
    this.isToggled = isToggled;
  }

  key: number;
  text: string;
  description: string;
  isToggled: boolean;
}

class ColorSettingsData {
  constructor(key: ColorSettings, colorLight: string, colorDark: string) {
    this.key = key;
    this.text = TextRessources[ColorSettings[key]];
    this.description = TextRessources[ColorSettings[key] + '_Description'];
    this.colorLight = colorLight;
    this.colorDark = colorDark;
  }

  key: number;
  text: string;
  description: string;
  colorLight: string;
  colorDark: string;
}
