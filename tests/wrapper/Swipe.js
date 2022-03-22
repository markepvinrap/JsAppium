var Base = require("./baseFunctions");

let SCREEN_SIZE;

/**
 * The values in the below object are percentages of the screen
 */
const SWIPE_DIRECTION = {
  down: {
    start: { x: 50, y: 15 },
    end: { x: 50, y: 85 }
  },
  down_left: {
    start: { x: 25, y: 15 },
    end: { x: 25, y: 85 }
  },
  down_right: {
    start: { x: 75, y: 15 },
    end: { x: 75, y: 85 }
  },
  left: {
    start: { x: 95, y: 50 },
    end: { x: 5, y: 50 }
  },
  right: {
    start: { x: 5, y: 50 },
    end: { x: 95, y: 50 }
  },
  up: {
    start: { x: 50, y: 85 },
    end: { x: 50, y: 15 }
  },

  up_left: {
    start: { x: 25, y: 85 },
    end: { x: 25, y: 15 }
  },
  up_right: {
    start: { x: 75, y: 85 },
    end: { x: 75, y: 15 }
  }
};

class Swipe extends Base {
  constructor() {
    super();
  }

  /**
   * Swipe down based on a percentage
   *
   */
  swipeDown(percentage = 1) {
    this.swipeOnPercentage(
      this.calcXY(SWIPE_DIRECTION.down.start, percentage),
      this.calcXY(SWIPE_DIRECTION.down.end, percentage)
    );
  }

  /**
   * Swipe Up based on a percentage
   *
   * @param {number} percentage from 0 - 1
   * @author -Siva
   */
  swipeUp(percentage = 1) {
    this.swipeOnPercentage(
      this.calcXY(SWIPE_DIRECTION.up.start, percentage),
      this.calcXY(SWIPE_DIRECTION.up.end, percentage)
    );
  }

  /**
   * Swipe Up based on a percentage
   *
   */
  swipeUp_Left(percentage = 1) {
    this.swipeOnPercentage(
      this.calcXY(SWIPE_DIRECTION.up_left.start, percentage),
      this.calcXY(SWIPE_DIRECTION.up_left.end, percentage)
    );
  }
  /**
   * Swipe Up based on a percentage
   *
   */
  swipeUp_Right(percentage = 1) {
    this.swipeOnPercentage(
      this.calcXY(SWIPE_DIRECTION.up_right.start, percentage),
      this.calcXY(SWIPE_DIRECTION.up_right.end, percentage)
    );
  }

  /**
   * Swipe left based on a percentage
   *
   */
  swipeLeft(percentage = 1) {
    this.swipeOnPercentage(
      this.calcXY(SWIPE_DIRECTION.left.start, percentage),
      this.calcXY(SWIPE_DIRECTION.left.end, percentage)
    );
  }

  /**
   * Swipe right based on a percentage
   *
   */
  swipeRight(percentage = 1) {
    this.swipeOnPercentage(
      this.calcXY(SWIPE_DIRECTION.right.start, percentage),
      this.calcXY(SWIPE_DIRECTION.right.end, percentage)
    );
  }

  /**
   * Swipe from coordinates (from) to the new coordinates (to). The given coordinates are
   * percentages of the screen.
   *
   * @param {object} from { x: 50, y: 50 }
   * @param {object} to { x: 25, y: 25 }
   */
  swipeOnPercentage(from, to) {
    SCREEN_SIZE = driver.getWindowRect();
    const start_coor = this.getDeviceScreenCoordinates(SCREEN_SIZE, from);
    const end_coor = this.getDeviceScreenCoordinates(SCREEN_SIZE, to);
    this.swipe(start_coor, end_coor);
  }

  /**
   * Swipe from coordinates (from) to the new coordinates (to). The given coordinates are in pixels.
   *
   * @param {object} from { x: 50, y: 50 }
   * @param {object} to { x: 25, y: 25 }
   */
  swipe(from, to) {
    driver.touchPerform([
      {
        action: "press",
        options: from
      },
      {
        action: "wait",
        options: { ms: 2500 }
      },
      {
        action: "moveTo",
        options: to
      },
      {
        action: "release"
      }
    ]);
    driver.pause(2000);
  }

  /**
   * Get the screen coordinates based on a device his screensize
   *
   * @param {number} screenSize the size of the screen
   * @param {object} coordinates like { x: 50, y: 50 }
   *
   * @return {{x: number, y: number}}
   */
  getDeviceScreenCoordinates(screenSize, coordinates) {
    return {
      x: Math.round(screenSize.width * (coordinates.x / 100)),
      y: Math.round(screenSize.height * (coordinates.y / 100))
    };
  }

  /**
   * Calculate the x y coordinates based on a percentage
   *
   * @param {object} coordinates
   * @param {number} percentage
   * @returns coor
   */
  calcXY(coordinates, percentage) {
    var coor = {
      x: coordinates.x * percentage,
      y: coordinates.y * percentage
    };
    return coor;
  }

  /**
   * Check if an element is visible and if not scroll down a portion of the screen to
   * check if it visible after a x amount of scrolls
   * @param {element} element
   * @param {number} maxScrolls
   * @param {number} amount
   */
  doSwipeUpForNoTimes(element, maxScrolls, footerSize, amount) {
    var amount1 = amount;

    if (typeof amount1 == "undefined") {
      amount1 = 1;
    }

    if (this.isDisplayed(element) == false && amount1 <= maxScrolls) {
      this.swipeUp(0.80);
      amount1 = amount1 + 1;
      this.doSwipeUpForNoTimes(element, maxScrolls, footerSize, amount1);
    } else if (amount > maxScrolls) {
      this.log(
        `The element '${element}' could not be found or is not visible.`
      );
    }
      
      if (typeof footerSize != undefined) {
        SCREEN_SIZE = driver.getWindowSize();
        var eleLocation = element.getLocation();
        if (SCREEN_SIZE.height * (1 - footerSize) < eleLocation.x) {
          this.swipeUp(0.5);
        }
      }
    
  }

  /**
   * Check if an element is visible and if not scroll down a portion of the screen to
   * check if it visible after a x amount of scrolls
   * @param {element} element
   * @param {number} maxScrolls
   * @param {number} amount
   */
  doSwipeUpForNoTimesAndPlaceElementInCenter(element, maxScrolls, amount = 0) {
    
      this.doSwipeUpForNoTimes(element, maxScrolls, amount);
   
    {
      SCREEN_SIZE = driver.getWindowSize();
      var eleLocation = element.getLocation();
      var eleSize = element.getSize();
      var to = { x: eleLocation.x, y: Number((SCREEN_SIZE.height / 2).toFixed()) };
      var from = { x: eleLocation.x, y: eleLocation.y + Number((eleSize.height / 2).toFixed()) };  
      this.swipe(from, to);
    }
  }

  /**
   * Check if an element is visible and if not scroll down a portion of the screen to
   * check if it visible after a x amount of scrolls
   * @param {element} element
   * @param {number} maxScrolls
   * @param {number} amount
   */
  doSwipeForNoTimes(element, maxScrolls, swipeType, footerSize, amount = 0) {
    let avail;
    if (
      (!element.isExisting() || !element.isDisplayed()) &&
      amount <= maxScrolls
    ) {
      var percent = 0.85;
      swipeType(percent);
      this.doSwipeForNoTimes(element, maxScrolls,swipeType, footerSize, amount + 1);
      avail = true;
    } else if (amount > maxScrolls) {
      avail = false;
      this.log(
        `The element '${element}' could not be found or is not visible.`
      );
    } 
    return avail;
  }

  /**
   * Check if an element is visible and if not scroll down a portion of the screen to
   * check if it visible after a x amount of scrolls
   * @param {element} element
   * @param {number} maxScrolls
   * @param {number} amount
   */
  doSwipeForNoTimesAndPlaceElementInCenter(
    element,
    maxScrolls,
    swipeType,
    amount = 0
  ) {
    if (
      (!element.isExisting() || !element.isDisplayed()) &&
      amount <= maxScrolls
    ) {
      var percent = 0.85;
      swipeType(percent);
      this.doSwipeForNoTimesAndPlaceElementInCenter(
        element,
        maxScrolls,
        amount + 1
      );
    } else if (amount > maxScrolls) {
      this.log(
        `The element '${element}' could not be found or is not visible.`
      );
    } else {
      SCREEN_SIZE = driver.getWindowSize();
      var eleLocation = element.getLocation();
      var eleSize = element.getSize();
      var to = { x: SCREEN_SIZE, y: SCREEN_SIZE.height / 2 };
      var from = { x: eleLocation.x, y: eleLocation.x + eleSize.height / 2 };
      this.swipe(from, to);
    }
  }

  doSwipe_UpForNoTimes(element, maxScrolls, footerSize) {
    return this.doSwipeForNoTimes(
      element,
      maxScrolls,
      this.swipeUp(),
      footerSize
    );
  }

  doSwipe_Up_Left_ForNoTimes(element, maxScrolls, footerSize) {
    return this.doSwipeForNoTimes(
      element,
      maxScrolls,
      this.swipeUp_Left(),
      footerSize
    );
  }

  doSwipe_Up_Right_ForNoTimes(element, maxScrolls, footerSize) {
    return this.doSwipeForNoTimes(
      element,
      maxScrolls,
      this.swipeUp_Right(),
      footerSize
    );
  }

  doSwipe_DownForNoTimes(element, maxScrolls, footerSize) {
    return this.doSwipeForNoTimes(
      element,
      maxScrolls,
      this.swipeDown(),
      footerSize
    );
  }

  doSwipe_RightForNoTimes(element, maxScrolls) {
    return this.doSwipeForNoTimes(element, maxScrolls, this.swipeRight);
  }

  doSwipe_LeftForNoTimes(element, maxScrolls) {
    return this.doSwipeForNoTimes(element, maxScrolls, this.swipeLeft);
  }

  /**
   * Swipe from coordinates (from) to the new coordinates (to). The given coordinates are
   * percentages of the screen.
   *
   * @param {object} from { x: 50, y: 50 }
   * @param {object} to { x: 25, y: 25 }
   */
  swipeOnElement_Percentage(ele,from, to) {
    var eleLocation = ele.getLocation();
    var eleSize = ele.getSize();

    console.log(eleLocation);
    console.log(eleSize);


    const start_coor = this.getElementCoordinates(eleLocation,eleSize, from);
    const end_coor = this.getElementCoordinates(eleLocation,eleSize, to);

    console.log(start_coor);
    console.log(end_coor)
    this.swipe({x:start_coor.x,y:720}, end_coor);
  }

  swipeUpOverElement(ele,percentage=1){

    this.swipeOnElement_Percentage(ele,this.calcXY(SWIPE_DIRECTION.up.start, percentage),
      this.calcXY(SWIPE_DIRECTION.up.end, percentage));

  }


  swipeDownOverElement(ele,percentage=1){

    this.swipeOnElement_Percentage(ele,this.calcXY(SWIPE_DIRECTION.down.start, percentage),
      this.calcXY(SWIPE_DIRECTION.down.end, percentage));

  }


  swipeLeftOverElement(ele,percentage=1){

    this.swipeOnElement_Percentage(ele,this.calcXY(SWIPE_DIRECTION.left.start, percentage),
      this.calcXY(SWIPE_DIRECTION.left.end, percentage));

  }

   /**
   * Get the screen coordinates based on a device his screensize
   *
   * @param {number} screenSize the size of the screen
   * @param {object} coordinates like { x: 50, y: 50 }
   *
   */
  getElementCoordinates(eleLocation,eleSize, coordinates) {
    return {
      x: Math.round(eleSize.width * (coordinates.x / 100))+eleLocation.x,
      y: Math.round(eleSize.height * (coordinates.y / 100))+eleLocation.y
    };
  }


}

module.exports = Swipe;
