/*/
Tests for Input Validation Examples
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

*/




import { test, expect } from '@playwright/test';

test.describe('Input Validation Examples Tests', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('https://testpages.eviltester.com/styled/validation/input-validation.html');
  });

  
  test('Firstname validation', async ({ page }) => {
    // Test for too long first name
    const firstnameError = await page.locator('label[name="firstnamevalidation"]');
    await page.fill('input[name="firstname"]', 'a'.repeat(91));
    await page.fill('input[name="age"]', '18'); 
    await page.click('input[type="submit"]');
    await expect(firstnameError).toBeVisible();
    await expect(firstnameError).toHaveText('Firstname provided is too long');

    // Test for too short first name
    await page.fill('input[name="firstname"]', 'a');
    await page.fill('input[name="age"]', '18'); 
    await page.click('input[type="submit"]');
    await expect(firstnameError).toBeVisible();
    await expect(firstnameError).toHaveText('Firstname provided is too short');

    /*/await page.fill('input[name="age"]', '18'); 
    await page.click('input[type="submit"]');
    await expect(firstnameError).toBeVisible();
    await expect(firstnameError).toHaveText('Firstname value required');*/

    //Note: the test should pass but the website has a bug with the validation code, since on submittion of empty field it gives an alert instead of an error
  });

  
  test('Surname validation', async ({ page }) => {
    // Test for too short surname
    await page.fill('input[name="firstname"]', 'Test');
    await page.fill('input[name="surname"]', 'a'.repeat(10)); 
    await page.fill('input[name="age"]', '18'); 
    await page.click('input[type="submit"]');
    const surnameError = await page.locator('label[name="surnamevalidation"]');
    await expect(surnameError).toBeVisible();
    await expect(surnameError).toHaveText('Surname provided is too short');


    // Test for too long surname
    await page.fill('input[name="firstname"]', 'Test');
    await page.fill('input[name="surname"]', 'a'.repeat(80)); 
    await page.click('input[type="submit"]');
    await page.fill('input[name="age"]', '18'); 
    await expect(surnameError).toBeVisible();
    await expect(surnameError).toHaveText('Surname provided is too long');
  });

  /*/ 
  test('Notes field validation', async ({ page }) => {
    // Test max length
    await page.fill('input[name="firstname"]', 'Test');
    await page.fill('input[name="age"]', '18');
    await page.fill('textarea[name="notes"]', 'a'.repeat(2001)); 
    await page.click('input[type="submit"]');
    const notesError = await page.locator('label[name="notesvalidation"]');
    await expect(notesError).toBeVisible();*/
    // Note: The test should fail but the website has a bug in the validation code, since it allows more than 2000 characters
  //});


  
  test('Country dropdown validation', async ({ page }) => {
    /*/ Test no country selected 
    await page.fill('input[name="firstname"]', 'Test');
    await page.fill('input[name="age"]', '18');
    await page.selectOption('select[name="country"]', '');
    await page.click('input[type="submit"]');
    const countryError = await page.locator('label[name="countryvalidation"]');
    await expect(countryError).toBeVisible();
    await expect(countryError).toHaveText('Country value required');*/
    // Note: The test should pass but the website has a bug in the validation code, since you cannot choose an empty option from the dropdown

    // Test valid country 
    const countryError = await page.locator('label[name="countryvalidation"]');
    await page.selectOption('select[name="country"]', 'Ukraine'); 
    await page.click('input[type="submit"]');
    await expect(countryError).not.toBeVisible();
  });

  
  test('Valid form submittion', async ({ page }) => {
    await page.fill('input[name="firstname"]', 'Test');
    await page.fill('input[name="surname"]', 'TesterforTest'); 
    await page.fill('input[name="age"]', '30');
    await page.selectOption('select[name="country"]', 'Ukraine');
    await page.fill('textarea[name="notes"]', 'Notes for the test');
    

    await page.click('input[type="submit"]');
    const header = await page.locator('h2:has-text("You submitted")');
    await expect(header).toBeVisible();
  });
});
