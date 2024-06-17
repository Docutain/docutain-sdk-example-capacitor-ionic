/** 
*   Docutain SDK ionic capacitor
*   Copyright (c) INFOSOFT Informations- und Dokumentationssysteme GmbH. All rights reserved.
*
*   Docutain SDK ionic capacitor is a commercial product and requires a license. 
*   Details found in the LICENSE file in the root directory of this source tree.
*/

import { DocutainSDK } from '@docutain/capacitor-plugin-docutain-sdk'

export class ErrorHandlingUtils {
  public static exception(functionName: string, ex:any) {
    const text: string = functionName +" exception: " + JSON.stringify(ex);
    console.error(text);
    // @ts-ignore
    // eslint-disable-next-line no-alert
    alert(text);
  }

  public static async DocutainError(functionName: string, error: any)  {
    // get the latest error message
    const text: string = functionName +" failed\n\n " + error;
    console.error(text);
    // copy trace if needed
    const traceFile :string = (await DocutainSDK.getTraceFile()).fileUri;
    console.log("TraceFile: " + traceFile);
    // @ts-ignore
    // eslint-disable-next-line no-alert
    alert(text);
    return false;
  }
}