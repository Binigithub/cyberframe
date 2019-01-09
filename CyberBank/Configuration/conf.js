let SpecReporter = require('jasmine-spec-reporter').SpecReporter;

var HtmlReporter = require('protractor-beautiful-reporter');

exports.config = {

   directConnect : true,

//   capabilities: {

//     browserName: 'chrome'

//   },
   multiCapabilities: [

		{

        browserName: 'firefox',

        version: '61.0',

        platform: 'macOS 10.14',

        name: "firefox-tests",

        shardTestFiles: true,

        maxInstances: 25

	}, 

	{

        browserName: 'chrome',

        version: '70.0',

        platform: 'Windows 10',

        name: "chrome-tests",

        shardTestFiles: true,

        maxInstances: 25

    }],

  
  //specs: ['../Tests/Test.js'],
  //specs: ['../Tests/BankManagerSimple.spec.js'], 
  //specs: ['../Tests/DataProvider.spec.js'],
  //suites:{
    //smoke: ['../Tests/BankManagerSimple.spec.js','../Tests/demo.spec.js'],
   //regression: ['../Test/*.spec.js'],
  //},
suites:{
   smoke:['../Tests/demo.spec.js'],
   regression:['../Tests/*.spec.js']

	},
   sauceUser: process.env.SAUCE_USERNAME,

	sauceKey: process.env.SAUCE_ACCESS_KEY,


onPrepare: function () {

    browser.driver.manage().window().maximize();

    jasmine.getEnv().addReporter(new SpecReporter({

        displayFailuresSummary: true,
        displayFailuredSpec: true,
        displaySuiteNumber: true,
        displaySpecDuration: true,
        showstack: false

      }));

      // Add a screenshot reporter and store screenshots to `/tmp/screenshots`:

      jasmine.getEnv().addReporter(new HtmlReporter({

        baseDirectory: '../report/screenshots',

        preserveDirectory: false,

        screenshotsSubfolder: 'images',

        jsonsSubfolder: 'jsons',

        docName: 'CyberBank-Report.html'

     }).getJasmine2Reporter());

  

},

    

    jasmineNodeOpts: {

        showColors: true, 

        defaultTimeoutInterval: 30000,    

        print: function() {}

        

}

};
