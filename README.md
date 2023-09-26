# playwright_with_typescript_saucedemo
This is a playwright automation project with typescript for saucedemo.com website

 To Configure and Run the Project:
===================================

To run these scripts follow the below steps:

1. First Go to Scripts folder where playwright.config.ts is located.
2. if you have not install the dependencies then follow the below step
    a. Open GitBash and go to package.json folder in gitbash commandline.
    b. Type npm install and wait to be installed all modules.
    c. after install you will be able to see the node_modules folder

3. Make sure you are still in the scripts folder in gitbash command line
4. To run this scripts, follow the below steps

    a. to run all the test type below line in the gitbash Commandline.
   ```bash
        npm run test
   ```
    b. to run only UI test in headed mode
   ```bash
        npm run ui-test
   ```
    c. to run only UI test in headles mode.
   ```bash
        npm run ui-test-headless
   ```
    d. to run only API test.
   ```bash
        npm run api-test
   ```

    **Note:** You can add more command accordingly in package.json file

6. Once Finished, To Check the result, Type in the commandline tool
```bash
   npm run generateReport
```

	

How to setup the playwright project:
===================================
1. Create a directory
2. Open the directory in VS code
3. From the terminal go to that folder location 
4. Give the command
   ```bash
    npm init playwright@latest"
   ```
6. Give all the answer in the terminal it will download accordingly 
7. to run the example test give command
   ```bash
   npx playwright test"
   ```


How to add Allure Report
=====================================
1. give command "npm i -D @playwright/test allure-playwright"
2. it will add the devdependency on package.json file
3. add to the playwright.config.ts file on reporters :
   ```bash
    ["allure-playwright",
        {
            detail: true,
            outputFolder: "my-allure-results",
            suiteTitle: false,
        }]
   ```
5. in Package.json file add the script 
    "generateReport":
   ```bash
   npx allure generate my-allure-results -o allure-report --clean && allure open allure-report
   ```
7. Generate the report :
   ```bash
   npm run generateReport
   ```

Issues
=====================================
1. according to assignment I need to input the Subjects as "Playwright Assignment" in TC03 but  
unfortunately  this input filed accept only suggestion value, So I had to choose some other value which has suggestion like Computer. 
