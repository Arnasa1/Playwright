Tests for Input Validation Examples using Node.js and Typescript

- Test for firstname field validations
- Test for surname field validations
- Test for Notes field validations
- Test for country dropdown validation
- Test form submission with valid inputs

Issues : 
- The website has a bug with the validation code, since on submittion of empty field it gives an alert instead of an error it is incosistent
- The website has a bug in the validation code, since it allows more than 2000 characters in the Notes field
- The website has a bug in the validation code, since you cannot choose an empty option from the dropdown
- The website uses multiple alerts for validation errors, which is not a good practice (Javascript and HTML)
- Invalid cases are commented out since the website has a bug in the validation code

How to find tests :

Go-to tests directory - test.spec.ts

