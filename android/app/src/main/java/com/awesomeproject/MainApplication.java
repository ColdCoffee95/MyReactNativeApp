package com.metchange.dianlijihe;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.yunpeng.alipay.AlipayPackage;
import com.theweflex.react.WeChatPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import org.devio.rn.splashscreen.SplashScreenReactPackage;
import com.react.rnspinkit.RNSpinkitPackage;
import com.beefe.picker.PickerViewPackage;
import com.reactnative.ivpusic.imagepicker.PickerPackage;
import com.learnium.RNDeviceInfo.RNDeviceInfo;
import com.dscj.autoheightwebview.AutoHeightWebViewPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new AlipayPackage(),
            new WeChatPackage(),
            new VectorIconsPackage(),
            new SplashScreenReactPackage(),
            new RNSpinkitPackage(),
            new PickerViewPackage(),
            new PickerPackage(),
            new RNDeviceInfo(),
            new AutoHeightWebViewPackage()
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {

    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }
}
