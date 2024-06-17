export enum DocumentSource {
  Dokumentenscanner,
  PDFImport,
  ImageImport,
}

export enum SampleMenue {
  Dokumentenscanner,
  DataExtraction,
  ReadOCR,
  WritePDF,
  Settings,
}

export enum ScanSettings {
  AllowCaptureModeSetting,
  AutoCapture,
  AutoCrop,
  MultiPage,
  PreCaptureFocus,
}

export const ScanFilter: { [key: number]: any } = {
  0: 'AUTO',
  1: 'GRAY',
  2: 'BLACKWHITE',
  3: 'ORIGINAL',
  4: 'TEXT',
  5: 'AUTO2',
  6: 'ILLUSTRATION',
};

export enum EditSettings {
  AllowPageFilter,
  AllowPageRotation,
  AllowPageArrangement,
  AllowPageCropping,
  PageArrangementShowDeleteButton,
  PageArrangementShowPageNumber,
}

export enum ColorSettings {
  ColorPrimary,
  ColorSecondary,
  ColorOnSecondary,
  ColorScanButtonsLayoutBackground,
  ColorScanButtonsForeground,
  ColorScanPolygon,
  ColorBottomBarBackground,
  ColorBottomBarForeground,
  ColorTopBarBackground,
  ColorTopBarForeground,
}

export const TextRessources: Record<string, string> = {
  AllowCaptureModeSetting: 'Allow capture mode setting',
  AllowCaptureModeSetting_Description:
    'If true, the document scanner toolbar will display an item that allows the user to switch between automatic and manual camera triggering.',
  AllowPageArrangement: 'Allow page arrangement',
  AllowPageArrangement_Description:
    'If false, the bottom toolbar will hide the arrange page item.',
  AllowPageCropping: 'Allow page cropping',
  AllowPageCropping_Description:
    'If false, the bottom toolbar will hide the page cropping item.',
  AllowPageFilter: 'Allow page filter',
  AllowPageFilter_Description:
    'If false, the bottom toolbar will hide the filter page item.',
  AllowPageRotation: 'Allow page rotation',
  AllowPageRotation_Description:
    'If false, the bottom toolbar will hide the rotate page item.',
  AutoCapture: 'Auto capture',
  AutoCapture_Description:
    'If true, the camera will capture the image automatically at the right moment.',
  AutoCrop: 'Auto crop',
  AutoCrop_Description:
    'If true, image gets automatically cropped if document was detected. This applies only when importing images.',
  ColorBottomBarBackground: 'Color bottom bar background',
  ColorBottomBarBackground_Description:
    'Used to tint the bottom toolbar background of the image editing page.',
  ColorBottomBarForeground: 'Color bottom bar foreground',
  ColorBottomBarForeground_Description:
    'Used to tint the buttons within the bottom toolbar of the image editing page.',
  ColorOnSecondary: 'Color on secondary',
  ColorOnSecondary_Description:
    'Used to tint elements that reside on ColorSecondary, like the icon of the capture button.',
  ColorPrimary: 'Color primary',
  ColorPrimary_Description:
    'Used to tint progress indicators and dialog buttons.',
  ColorScanButtonsForeground: 'Color scan buttons foreground',
  ColorScanButtonsForeground_Description:
    'Used to tint the foreground of the buttons of the scan layout, like the torch button.',
  ColorScanButtonsLayoutBackground: 'Color scan buttons layout background',
  ColorScanButtonsLayoutBackground_Description:
    'Used to tint the background of the layout containing the buttons of the scan layout, like the capture button or torch button.',
  ColorScanPolygon: 'Color scan polygon',
  ColorScanPolygon_Description:
    'Used to tint the polygon overlay which highlights the currently detected document.',
  ColorSecondary: 'Color secondary',
  ColorSecondary_Description:
    'Used to tint selectable controls and the capture button.',
  ColorSettings: 'Color settings',
  ColorTopBarBackground: 'Color top bar background',
  ColorTopBarBackground_Description: 'Used to tint the top toolbar background.',
  ColorTopBarForeground: 'Color top bar foreground',
  ColorTopBarForeground_Description:
    'Used to tint the elements contained in the top toolbar, like buttons and titles.',
  DefaultScanFilter: 'Default scan filter',
  DefaultScanFilter_Description:
    'The default scan filter that will be used after scan.',
  MultiPage: 'Multi page',
  MultiPage_Description:
    'If true, scanning multi page documents is possible. Set this to false if you need to scan single page documents.',
  PageArrangementShowDeleteButton: 'Page arrangement show delete button',
  PageArrangementShowDeleteButton_Description:
    'If true, each item of the page arrangement functionality will show a delete button.',
  PageArrangementShowPageNumber: 'Page arrangement show page number',
  PageArrangementShowPageNumber_Description:
    'If true, each item of the page arrangement functionality will show the page number.',
  PreCaptureFocus: 'Pre capture focus',
  PreCaptureFocus_Description:
    'If true, the camera will run a focus action right before taking the image. This improves the quality of the scanned images, but depending on the device, image capture might take a little bit longer. This applies only to Android.',
  ScanSettings: 'Scan settings"',
  EditSettings: 'Edit settings"',
  ResetSettings: 'Reset to default"',
  Reset: 'Reset"',
};
