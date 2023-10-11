# TableFilterApp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.2.6.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

## Problem statement

Position: Frontend Developer 
Coding Task - Table Filter 
Goal 
Create a table view for a data set that also allows for the use of user-defined filters. 
Requirements 
1. The project should be completed in Angular. 
Specifications 
● The view should be a table populated with the given data (sample JSON file). This should also include table headers. While this specific source data is static, it should be assumed that a HTTP API would return a dynamic data set of completely different headers/column values depending on client configuration. 
● In a sidebar, there should be a toolbox that allows a user to filter this data by column. ● In this toolbox, there should be options such as 'column name', 'operator', 'value' (you may use any name that makes sense to you), whereby a user may select: 
column name ➞ any of the given attributes e.g “description” 
operator ➞ any of the given operators in the operator list e.g. “contains” value ➞ any valid user input e.g. “hello world” 
● Once a user is satisfied, they may apply this filter to the dataset, and the table will update according to this filter. 
● A user should be able to apply as many filters as they like. 
● A user should be able to remove any filter from that list of filters. 
● Sample operators (not all are required for the purpose of this case study, but enough to demonstrate a design pattern): 
○ less than or equal to (≤) or greater than or equal to (≥) 
○ equals (=) or does not equal (≠) 
○ contains or does not contain (string matching) 
Notes 
● External dependencies may be used where appropriate. Please add a small note in a readme file to justify each dependency.
● Please add any additional build notes to the readme. 
● It is not required to complete the entire case study! However, if anything is missing, please clarify what your design plan was, and perhaps what you would like to improve. 
Coding Style 
● Of course, your code has to work, but we are especially interested in how you have solved the task. 
● Which patterns have been used? 
● How easy is it to set up the environment and run your code? 
● How is your code structured? 
● How performant is your code? 
● Are tests available and how have they been set up? 
More Information 
Sample data file: 
Host: ftp://transport.productsup.io/ 
File: table_data.json 
User: pupDev 
Password: pupDev2018

## Design


App, 
Layout component
 table component
 filter component
 


