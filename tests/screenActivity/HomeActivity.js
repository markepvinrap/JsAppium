
var baseFunctions =require('../wrapper/baseFunctions')
var homeObject = require("../screenobjects/home.screen");
var home_obj = new homeObject()

class HomeActivity extends baseFunctions {
  constructor() {
    super();
    this.log("--Navigated to home Page");
  }

  clickSkip() {
    this.log("To Click the Skip Button")
    this.click(home_obj.skip,"Skip button", true);
    return new HomeActivity();
  }


}
  
module.exports = HomeActivity;
