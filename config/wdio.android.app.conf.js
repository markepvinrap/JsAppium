const { join } = require('path');
const { config } = require('./wdio.shared.conf');

// ============
// Specs
// ============
config.specs = [
    './tests/specs/**/app*.spec.js',
];

// ============
// Capabilities
// ============
// For all capabilities please check
// http://appium.io/docs/en/writing-running-appium/caps/#general-capabilities
config.capabilities = [
    {
        platformName: 'Android',
        maxInstances: 1,
        runner: 'local',
        automationName: 'UiAutomator2',
        deviceName: 'emulator-5554',
        appActivity: `activity`, // Replace the activity
        appPackage: 'package', // Replace the package
        newCommandTimeout: 240,
        app: join(process.cwd(), './config/apps/Android/test.apk'), // Add and Replace the path
        autoAcceptAlerts: true,
        autoGrantPermissions: true,
        noReset: false,
        //avd: 'Pixel_2_API_30', 
        //isHeadless: true

    },
];

exports.config = config;
