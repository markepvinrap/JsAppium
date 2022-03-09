

var baseFunctions =require('../wrapper/baseFunctions')
const iOS_SELECTORS = {
    Skip: `//XCUIElementTypeStaticText[@name='Skip']`
};
const Android_SELECTORS = {
    Skip: `//android.widget.TextView[@text="Skip"]`
};

class HomeScreen extends baseFunctions {

    
  get skip() {
    return $(this.objectSelector(iOS_SELECTORS.Skip, Android_SELECTORS.Skip));
  }
}

module.exports = HomeScreen;

