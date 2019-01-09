var app = angular.module('reportingApp', []);

app.controller('ScreenshotReportController', function ($scope) {
    $scope.searchSettings = Object.assign({
        description: '',
        allselected: true,
        passed: true,
        failed: true,
        pending: true,
        withLog: true
    }, {}); // enable customisation of search settings on first page hit

    var initialColumnSettings = undefined; // enable customisation of visible columns on first page hit
    if (initialColumnSettings) {
        if (initialColumnSettings.displayTime !== undefined) {
            // initial settings have be inverted because the html bindings are inverted (e.g. !ctrl.displayTime)
            this.displayTime = !initialColumnSettings.displayTime;
        }
        if (initialColumnSettings.displayBrowser !== undefined) {
            this.displayBrowser = !initialColumnSettings.displayBrowser; // same as above
        }
        if (initialColumnSettings.displaySessionId !== undefined) {
            this.displaySessionId = !initialColumnSettings.displaySessionId; // same as above
        }
        if (initialColumnSettings.displayOS !== undefined) {
            this.displayOS = !initialColumnSettings.displayOS; // same as above
        }
        if (initialColumnSettings.inlineScreenshots !== undefined) {
            this.inlineScreenshots = initialColumnSettings.inlineScreenshots; // this setting does not have to be inverted
        }

    }


    $scope.inlineScreenshots = false;
    this.showSmartStackTraceHighlight = true;

    this.chooseAllTypes = function () {
        var value = true;
        $scope.searchSettings.allselected = !$scope.searchSettings.allselected;
        if (!$scope.searchSettings.allselected) {
            value = false;
        }

        $scope.searchSettings.passed = value;
        $scope.searchSettings.failed = value;
        $scope.searchSettings.pending = value;
        $scope.searchSettings.withLog = value;
    };

    this.isValueAnArray = function (val) {
        return isValueAnArray(val);
    };

    this.getParent = function (str) {
        var arr = str.split('|');
        str = "";
        for (var i = arr.length - 2; i > 0; i--) {
            str += arr[i] + " > ";
        }
        return str.slice(0, -3);
    };

    this.getSpec = function (str) {
        return getSpec(str);
    };


    this.getShortDescription = function (str) {
        return str.split('|')[0];
    };

    this.convertTimestamp = function (timestamp) {
        var d = new Date(timestamp),
            yyyy = d.getFullYear(),
            mm = ('0' + (d.getMonth() + 1)).slice(-2),
            dd = ('0' + d.getDate()).slice(-2),
            hh = d.getHours(),
            h = hh,
            min = ('0' + d.getMinutes()).slice(-2),
            ampm = 'AM',
            time;

        if (hh > 12) {
            h = hh - 12;
            ampm = 'PM';
        } else if (hh === 12) {
            h = 12;
            ampm = 'PM';
        } else if (hh === 0) {
            h = 12;
        }

        // ie: 2013-02-18, 8:35 AM
        time = yyyy + '-' + mm + '-' + dd + ', ' + h + ':' + min + ' ' + ampm;

        return time;
    };


    this.round = function (number, roundVal) {
        return (parseFloat(number) / 1000).toFixed(roundVal);
    };


    this.passCount = function () {
        var passCount = 0;
        for (var i in this.results) {
            var result = this.results[i];
            if (result.passed) {
                passCount++;
            }
        }
        return passCount;
    };


    this.pendingCount = function () {
        var pendingCount = 0;
        for (var i in this.results) {
            var result = this.results[i];
            if (result.pending) {
                pendingCount++;
            }
        }
        return pendingCount;
    };


    this.failCount = function () {
        var failCount = 0;
        for (var i in this.results) {
            var result = this.results[i];
            if (!result.passed && !result.pending) {
                failCount++;
            }
        }
        return failCount;
    };

    this.passPerc = function () {
        return (this.passCount() / this.totalCount()) * 100;
    };
    this.pendingPerc = function () {
        return (this.pendingCount() / this.totalCount()) * 100;
    };
    this.failPerc = function () {
        return (this.failCount() / this.totalCount()) * 100;
    };
    this.totalCount = function () {
        return this.passCount() + this.failCount() + this.pendingCount();
    };

    this.applySmartHighlight = function (line) {
        if (this.showSmartStackTraceHighlight) {
            if (line.indexOf('node_modules') > -1) {
                return 'greyout';
            }
            if (line.indexOf('  at ') === -1) {
                return '';
            }

            return 'highlight';
        }
        return true;
    };


    var results = [
    {
        "description": "should have correct page title|Manager Login|Bank Manager",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 16832,
        "browser": {
            "name": "chrome",
            "version": "71.0.3578.98"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "images\\004a00db-00f6-0000-00c2-001900f9005c.png",
        "timestamp": 1546793335566,
        "duration": 4082
    },
    {
        "description": "should display home button|Manager Login|Bank Manager",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 16832,
        "browser": {
            "name": "chrome",
            "version": "71.0.3578.98"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "images\\003800d5-0082-0089-0064-005600f500a4.png",
        "timestamp": 1546793340191,
        "duration": 1617
    },
    {
        "description": "should display page header|Manager Login|Bank Manager",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 16832,
        "browser": {
            "name": "chrome",
            "version": "71.0.3578.98"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "images\\00c300ee-0071-00bc-0004-001f00dc00f0.png",
        "timestamp": 1546793342126,
        "duration": 665
    },
    {
        "description": "should display login option for Bank Manager|Manager Login|Bank Manager",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 16832,
        "browser": {
            "name": "chrome",
            "version": "71.0.3578.98"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "images\\00f100f0-00f7-006a-00a1-006700eb00e4.png",
        "timestamp": 1546793343116,
        "duration": 547
    },
    {
        "description": "should stay at the homepage when Home Button is clicked|Manager Login|Bank Manager",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 16832,
        "browser": {
            "name": "chrome",
            "version": "71.0.3578.98"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "images\\00cb00bc-0063-0057-00af-00e6003f00f2.png",
        "timestamp": 1546793343950,
        "duration": 790
    },
    {
        "description": "should login as Bank Manager|Manager Login|Bank Manager",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 16832,
        "browser": {
            "name": "chrome",
            "version": "71.0.3578.98"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "images\\002c00d3-009a-0025-007a-00ac00b1003c.png",
        "timestamp": 1546793345038,
        "duration": 978
    },
    {
        "description": "should display  options for manager|Manager Login|Bank Manager",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 16832,
        "browser": {
            "name": "chrome",
            "version": "71.0.3578.98"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "images\\006800ae-00d2-005b-0042-007b00fe00bb.png",
        "timestamp": 1546793346310,
        "duration": 782
    },
    {
        "description": "should navigate back to home page from Manager Login Page|Manager Login|Bank Manager",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 16832,
        "browser": {
            "name": "chrome",
            "version": "71.0.3578.98"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "images\\002200ce-00d3-00de-007d-001d00e300f7.png",
        "timestamp": 1546793347421,
        "duration": 901
    },
    {
        "description": "should display form for Adding Customer|Adding a Customer|Bank Manager",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 16832,
        "browser": {
            "name": "chrome",
            "version": "71.0.3578.98"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "images\\007500d7-0004-007b-00e3-0084003e003b.png",
        "timestamp": 1546793349386,
        "duration": 400
    },
    {
        "description": "should list all the labels|Adding a Customer|Bank Manager",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 16832,
        "browser": {
            "name": "chrome",
            "version": "71.0.3578.98"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "images\\005a00f2-00f7-00e4-0074-00f900eb002d.png",
        "timestamp": 1546793350079,
        "duration": 115
    },
    {
        "description": "should require firstname|Adding a Customer|Bank Manager",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 16832,
        "browser": {
            "name": "chrome",
            "version": "71.0.3578.98"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "images\\0065000f-00f5-00b0-00d0-0029007d00be.png",
        "timestamp": 1546793350496,
        "duration": 36
    },
    {
        "description": "should require lastname|Adding a Customer|Bank Manager",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 16832,
        "browser": {
            "name": "chrome",
            "version": "71.0.3578.98"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "images\\001a00d6-0022-00a8-0059-005a00890001.png",
        "timestamp": 1546793350867,
        "duration": 25
    },
    {
        "description": "should require postcode|Adding a Customer|Bank Manager",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 16832,
        "browser": {
            "name": "chrome",
            "version": "71.0.3578.98"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "images\\004b00ae-00b4-0019-001f-00d200bf0082.png",
        "timestamp": 1546793351221,
        "duration": 28
    },
    {
        "description": "should add customer|Adding a Customer|Bank Manager",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 16832,
        "browser": {
            "name": "chrome",
            "version": "71.0.3578.98"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "images\\00d00008-0082-0058-008b-00d1003d00fc.png",
        "timestamp": 1546793351557,
        "duration": 765
    },
    {
        "description": "should display new customer first name in list|Adding a Customer|Bank Manager",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 16832,
        "browser": {
            "name": "chrome",
            "version": "71.0.3578.98"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "images\\0093008f-006e-004f-00b8-00c500ba00be.png",
        "timestamp": 1546793352672,
        "duration": 462
    },
    {
        "description": "should display new customer last name in list|Adding a Customer|Bank Manager",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 16832,
        "browser": {
            "name": "chrome",
            "version": "71.0.3578.98"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "images\\00bc0050-00ba-002a-000d-0047001c00d5.png",
        "timestamp": 1546793353445,
        "duration": 57
    },
    {
        "description": "should display new customer post code in list|Adding a Customer|Bank Manager",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 16832,
        "browser": {
            "name": "chrome",
            "version": "71.0.3578.98"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "images\\00a0000c-00cb-00ec-000f-000800bb00f0.png",
        "timestamp": 1546793353857,
        "duration": 62
    },
    {
        "description": "should have no account number for the user that was created|Adding a Customer|Bank Manager",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 16832,
        "browser": {
            "name": "chrome",
            "version": "71.0.3578.98"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "images\\002600c6-0050-0041-0083-0051000300e4.png",
        "timestamp": 1546793354230,
        "duration": 75
    },
    {
        "description": "should add customer: Elon Musk|Jasmine Data Provider ",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 16832,
        "browser": {
            "name": "chrome",
            "version": "71.0.3578.98"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "images\\00aa0037-0060-00cb-007f-00c0004200bc.png",
        "timestamp": 1546793355412,
        "duration": 569
    },
    {
        "description": "should add customer: Warren Buffet|Jasmine Data Provider ",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 16832,
        "browser": {
            "name": "chrome",
            "version": "71.0.3578.98"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "images\\00c50011-0004-001c-006c-001900540099.png",
        "timestamp": 1546793356321,
        "duration": 523
    },
    {
        "description": "should add customer: Amanico Ortega|Jasmine Data Provider ",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 16832,
        "browser": {
            "name": "chrome",
            "version": "71.0.3578.98"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "images\\00360070-001c-0035-00c8-004400830016.png",
        "timestamp": 1546793357140,
        "duration": 616
    },
    {
        "description": "should check if element is displayed|Demonstrating Jasmine spec reporter",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 16832,
        "browser": {
            "name": "chrome",
            "version": "71.0.3578.98"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "images\\004b00a0-00f4-00f1-0055-00fc009b0009.png",
        "timestamp": 1546793358064,
        "duration": 2117
    }
];

    this.sortSpecs = function () {
        this.results = results.sort(function sortFunction(a, b) {
    if (a.sessionId < b.sessionId) return -1;else if (a.sessionId > b.sessionId) return 1;

    if (a.timestamp < b.timestamp) return -1;else if (a.timestamp > b.timestamp) return 1;

    return 0;
});
    };

    this.sortSpecs();
});

app.filter('bySearchSettings', function () {
    return function (items, searchSettings) {
        var filtered = [];
        var prevItem = null;

        for (var i = 0; i < items.length; i++) {
            var item = items[i];
            item.displaySpecName = false;

            countLogMessages(item);

            var hasLog = searchSettings.withLog && item.browserLogs && item.browserLogs.length > 0;
            if (searchSettings.description === '' ||
                (item.description && item.description.toLowerCase().indexOf(searchSettings.description.toLowerCase()) > -1)) {

                if (searchSettings.passed && item.passed || hasLog) {
                    checkIfShouldDisplaySpecName(prevItem, item);
                    filtered.push(item);
                    prevItem = item;
                } else if (searchSettings.failed && !item.passed && !item.pending || hasLog) {
                    checkIfShouldDisplaySpecName(prevItem, item);
                    filtered.push(item);
                    prevItem = item;
                } else if (searchSettings.pending && item.pending || hasLog) {
                    checkIfShouldDisplaySpecName(prevItem, item);
                    filtered.push(item);
                    prevItem = item;
                }

            }
        }

        return filtered;
    };
});

var isValueAnArray = function (val) {
    return Array.isArray(val);
};

var checkIfShouldDisplaySpecName = function (prevItem, item) {
    if (!prevItem) {
        item.displaySpecName = true;
        return;
    }

    if (getSpec(item.description) != getSpec(prevItem.description)) {
        item.displaySpecName = true;
        return;
    }
};

var getSpec = function (str) {
    var describes = str.split('|');
    return describes[describes.length - 1];
};

var countLogMessages = function (item) {
    if ((!item.logWarnings || !item.logErrors) && item.browserLogs && item.browserLogs.length > 0) {
        item.logWarnings = 0;
        item.logErrors = 0;
        for (var logNumber = 0; logNumber < item.browserLogs.length; logNumber++) {
            var logEntry = item.browserLogs[logNumber];
            if (logEntry.level === 'SEVERE') {
                item.logErrors++;
            }
            if (logEntry.level === 'WARNING') {
                item.logWarnings++;
            }
        }
    }
};
