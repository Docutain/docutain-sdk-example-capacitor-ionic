package de.docutain.sdk_example_capacitor_ionic;
import android.os.Bundle;

import com.docutain.plugin.capacitor.DocutainSDKPlugin;

import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {
  @Override
  public void onCreate(Bundle savedInstanceState) {
    registerPlugin(DocutainSDKPlugin.class);
    super.onCreate(savedInstanceState);
  }
}
