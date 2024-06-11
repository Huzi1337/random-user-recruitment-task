# Description

This is my implementation of the following recruitment task:

Write application in Angular. The People and About tabs are seperated pages (router outlets)

- The people tab should display a random user from randomuser.me API (photo and name). If a user clicks the “New” button the data should be reloaded with new data from the API. Also, every 5 seconds data should be reloaded, but the timer should reset every time the user clicks the “New” button and the timer should stop counting if the user’s cursor is under photo, name, or button (prevents from reloading data when for example user trying to copy name).
- About is a static page with a text description of the recruitment task (you're currently reading it).
Both pages should look similar to the attached graphics. Please focus on code readability and application performance (imagine that these are only 2 subpages of a huge application).

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.3.7.

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
