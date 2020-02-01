const puppeteer = require('puppeteer');
const { TimeoutError } = require('puppeteer/Errors');

import { wait4selector, testFilters} from './utils';
import { makeUserID, signUpTests, logoutTests } from './user-auth-utils';
import { newTestCreation, cancelTestCreation, cloneTestCreation, editTest1} from './tests-creation-utils';

const scidashURL = process.env.url ||  'http://localhost:8000';

// Variables used for creation of new user
let newUserID = makeUserID(6);
const newUserEmail = "test_user@gmail.com";
const newUserPassword = "Password_2020";

// Variables used for Model registration form
const newTestName = "Test1";
const editedTestName = "Test2";
const newTestTag ="testing-tag-1";
const editedTestTag = "test-edited";
const newTestClass = "InputResistanceTest (neuronunit.tests.passive)";
const editedTestClass = "IVCurvePeakTest (neuronunit.tests.channel)";
const newObservationSchema = "Mean, Standard Deviation, N";
const secondObservationSchema = "Mean, Standard Error, N";
const observationValueN = 1;
const observationValueSTD = 50;
const observationValueMean = 100;
const parameterTMax = 10; 
const observationVVolt = 1;
const observationIVolt = 1;

// Amount of models in models page
var tableModelLength = 2;

/**
 * Model Registration Tests
 */
describe('Scidash Model Registration Tests', () => {
	beforeAll(async () => {
		jest.setTimeout(125000);
		await page.setViewport({ width: 1280, height: 800 })
		await page.goto(scidashURL);
	});

	// Tests components in landing page are present
	describe('Test Landing Page Components', () => {
		it('Loading spinner goes away', async () => {
			await wait4selector(page, 'i.fa-cogs', { hidden: true, timeout : 120000 })
		})

		it('SciDash Title Shows Up', async () => {
			const title = await page.title();
			expect(title).toBe("SciDash");
		})

		// Wait for this component to load on term info, means page has finished loading
		it('Scidash Logo Shows Up', async () => {
			await wait4selector(page, 'div#scidash-logo', { visible: true, timeout : 30000 })
		})
	})
	
	//Tests login components in landing page are present
	describe('Test Landing Page Login Components', () => {
		it('Login Button Visible', async () => {
			const userLogin = await page.evaluate(async () => {
				var button = document.querySelector("#user-button")
				if(button == null || button == undefined){
					return false;
				}
				return true;
			});

			if(userLogin){
				await page.evaluate(async () => {
					var button = document.querySelector("#user-button");
					if(button != null){
						button.click();
					}
				});
				await wait4selector(page, '#logout-button', { visible: true, timeout : 30000 });

				await page.evaluate(async () => {
					var button = document.querySelector("#logout-button");
					if(button != null){
						button.click();
					}
				});
			}

			await wait4selector(page, 'div.login-button', { visible: true, timeout : 60000 })
		})

		it('Sign Up Button Visible', async () => {
			await wait4selector(page, 'div.signup-button', { visible: true, timeout : 30000 })
		})
	})

	// Tests User Registration/Sign-Up Works using the Sign-Up Button,
	// Needed to Generate User for Model Registration
	describe('Create User Account', () => {
		// Precondition: User is logout
		it('Login Button Visible', async () => {
			await wait4selector(page, 'div.login-button', { visible: true, timeout : 30000 })
		})

		// Click Sign-Up button and wait for registration form to show up
		it('Open Sign Up Page', async () => {
			await page.evaluate(async () => {
				document.querySelector(".signup-button a").click()
			});
			await wait4selector(page, 'div.registration-container', { visible: true, timeout : 30000 });
		})

		// Perform registration form tests
		signUpTests(page, newUserID, newUserEmail, newUserPassword);

	})

	// Tests New Model Creation
	describe('New Test Registration', () => {
		newTestCreation(page, newTestName, newTestClass, newTestTag, newObservationSchema, secondObservationSchema, 
				observationValueN, observationValueSTD, observationValueMean, parameterTMax, tableModelLength);
	})

	// Tests Cancel Model Creation
	describe('Cancel Test Creation', () => {
		cancelTestCreation(page);
	})

	// Tests Cloning Model
	describe('Clone Test', () => {
		cloneTestCreation(page, newTestName, newTestClass, tableModelLength);
	})

	// Tests Editing
	describe('Edit Test', () => {
		editTest1(page, editedTestName, editedTestClass, editedTestTag, observationVVolt, observationIVolt, tableModelLength)
	})

	// Tests Model Page Filters
	describe('Test Page Filters', () => {
		it('Test Page Opened, New Test Button Present', async () => {
			await wait4selector(page, 'span.fa-plus', { visible: true , timeout : 5000 })
		})

		testFilters(page, newTestName, 0, 0, tableModelLength);
		testFilters(page, editedTestName, 0,0, tableModelLength);

		testFilters(page, newTestClass, 1, 1, tableModelLength);
		testFilters(page, editedTestClass, 1, 1, tableModelLength);

		testFilters(page, newTestTag, 2, 2, tableModelLength);
		testFilters(page, editedTestTag, 2, 2, tableModelLength);
	})
	
	// User Logout
	describe('User Logout', () => {
		logoutTests(page);
	})
})