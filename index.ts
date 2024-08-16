var reporter = require('cucumber-html-reporter');

var options = {
        theme: 'bootstrap',
        jsonFile: 'reports/cucumber-report.json',
        output: 'reports/cucumber-report.html',
        reportSuiteAsScenarios: true,
        scenarioTimestamp: true,
        launchReport: false,
        screenshotsDirectory:".reports/",
        metadata: {
            
        },
        failedSummaryReport: true,
    };
function generateHTMLReport()
{

    
}
    reporter.generate(options);