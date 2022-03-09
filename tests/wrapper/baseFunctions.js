var expect = require("chai").expect;
global.wdioExpect = global.expect;
const chai = require('chai');
global.expect = chai.expect;
var fs = require('fs')


class functions {

  click(ele, eleName, failCond) {
    var click_bool = true;
    try {
      ele.click();
      this.log(eleName + "- clicked");
    } catch (e) {
      this.log(eleName + "- not clicked due to " + e);
      if (failCond) {
        expect(true, eleName + "- not clicked").to.be.false;
      }
      click_bool = false;
    }
    return click_bool;
  }

  isDisplayed(ele, eleName, failCond) {

    var disp_bool = ele.isDisplayed();
    if (disp_bool) {
      this.log(eleName + "- displayed");
    } else {
      this.log(eleName + "- not displayed");
      if (failCond) {
        expect(true, eleName + "- not displayed").to.be.false;
      }
    }
    return disp_bool;
  }


  getText(ele, eleName, failCond) {
    var eleText = null;
    try {
      eleText = ele.getText();
      this.log(eleName + " - value - " + eleText, false);
    } catch (e) {
      this.log(eleName + " - unable to getText");
      if (failCond) {
        expect(true, eleName + "- text not taken").to.be.false;
      }
    }
    return eleText;
  }
  isDevice_iOS() {
    var is_iOS = false;
    if (driver.isIOS == true) {
      is_iOS = true;
    }
    return is_iOS;
  }

  isDevice_Android() {
    var is_Android = false;
    if (driver.is_Android == true) {
      is_Android = true;
    }
    return is_Android;
  }

  setText(ele, value, failCond) {
    var enter_value = true;
    try {
      ele.clearValue();
      ele.setValue(value);
    } catch (e) {
      this.log(value + " - is not set in element " + ele);
      enter_value = false;
      if (failCond) {
        expect(true, value + "- not entered").to.be.false;
      }
    }
    return enter_value;
  }

  isExist(ele, eleName, failCond) {
    var exist_boo = ele.isExisting();
    if (exist_boo) {
      this.log(eleName + "- Exists");
    } else {
      this.log(eleName + "- not Exists");
      if (failCond) {
        expect(true, eleName + "- not available in DOM").to.be.false;
      }
    }
    return exist_boo;
  }
  objectSelector(ios, android) {
    if (driver.isIOS == true) {
      return ios;
    } else {
      return android;
    }
  }

  hideKeyboard() {
    browser.hideKeyboard();
  }
  waitForElement(ele, eleName, failCond) {
    try {
      ele.waitForDisplayed();
    } catch (e) {
      this.log(eleName + "- not displayed after 10 secs");
      if (failCond) {
        expect(true, eleName + "- text not displayed").to.be.false;
      }
    }
  }
  waitForExists(ele, eleName, failCond) {
    try {
      ele.waitForExist()
    } catch (e) {
      this.log(eleName + "- not exists after 10 secs");
      if (failCond) {
        expect(true, eleName + "- not exists").to.be.false;
      }
    }
  }

  pause(sec) {
    if (sec === "undefined") {
      sec = 3;
    }
    browser.pause(1000 * sec);
  }

  getCountOfElements(ele) {
    var ele_count = $$(ele);
    return ele_count.length;
  }

  getAllElements(ele) {
    let allEle = {
      value: []
    };
    allEle["length"] = ele.length;
    ele.forEach(function (element) {
      allEle.value.push({ ELEMENT: element.elementId });
    });
    return allEle;
  }

  clickById(id, failCond) {
    var click_bool = true;
    try {
      browser.elementClick(id);
    } catch (e) {
      this.log(id + " - not clicked")
      click_bool = false;
      if (failCond) {
        expect(true, id + "-  not clicked").to.be.false;
      }
    }
    return click_bool;
  }

  getWindowSize() {
    return browser._getWindowSize();
  }
  floor(value) {
    return Math.floor(value);
  }

  clickCoordinate(x1, y1) {
    browser.touchPerform([
      {
        action: "press",
        options: {
          x: x1,
          y: y1
        }
      },

      {
        action: "release"
      }
    ]);
  }

  longpress(ele) {
    driver.touchPerform([
      {
        action: 'longPress',
        options: {
          element: ele
        }
      },
      {
        action: 'wait',
        options: {
          ms: 10000
        }
      },
      {
        action: 'release'
      }
    ])
  }

  longpressMod(ele) {
    driver.touchPerform([
      {
        action: 'longPress',
        options: {
          element: ele
        }
      }
    ]);

  }

  log(statement, takeScreenShot, attachment) {
    if (typeof takeScreenShot == "undefined") {
      takeScreenShot = "Screenshot"

    }
    if (typeof attachment != "undefined") {
      attachment = "empty"
    }

    console.log(statement);
  }

  isClickable(ele, eleName, failCond) {
    var click_bool = true;
    try {
      ele.isClickable();
      this.log(eleName + "- is clickable");
    } catch (e) {
      this.log(eleName + "- not clicable due to " + e);
      if (failCond) {
        expect(true, eleName + "- not clickable").to.be.false;
      }
      click_bool = false;
    }
    return click_bool;
  }

  /*
  *Added by testleaf 
  */
  longPressCoordinate(x1, y1) {
    browser.touchPerform([
      {
        action: "longPress",
        options: {
          x: x1,
          y: y1
        }
      },
      {
        action: 'wait',
        options: {
          ms: 2000
        }
      },
      {
        action: "release"
      }
    ]);
  }
  getContents(pathStr) {
		const output = fs.readFileSync(pathStr, "utf8", (err, results) => {
			return results;
		})
		return JSON.parse(output);
	};



}


module.exports = functions;


