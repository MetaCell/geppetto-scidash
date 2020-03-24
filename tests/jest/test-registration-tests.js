import { wait4selector, testFilters} from './utils';
import { makeUserID, signUpTests, logoutTests } from './user-auth-utils';
import { newTestCreation, cancelTestCreation, cloneTestCreation, editTest1} from './tests-creation-utils';

const scidashURL = process.env.url ||  'http://localhost:8000';

// Variables used for creation of new user
let newUserID = makeUserID(6);
const newUserEmail = "test_user@gmail.com";
const newUserPassword = "Password_2020";

// Variables used for Test registration form
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
const observationVVolt = [10];
const observationIVolt = [1];

// Amount of tests in tests page
var tableTestLengh = 2;

/**
 * Tests Registration
 */
describe('Scidash Tests Registration', () => {
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
			const userLogin = await page.evaluate( () => {
				var button = document.querySelector("#user-button")
				if(button == null || button == undefined){
					return false;
				}
				return true;
			});

			if(userLogin){
				await page.evaluate( () => {
					var button = document.querySelector("#user-button");
					if(button != null){
						button.click();
					}
				});
				await wait4selector(page, '#logout-button', { visible: true, timeout : 30000 });

				await page.evaluate( () => {
					var button = document.querySelector("#logout-button");
					if(button != null){
						button.click();
					}
				});
			}

			await wait4selector(page, 'a.loginButton', { visible: true, timeout : 60000 })
		})

		it('Sign Up Button Visible', async () => {
			await wait4selector(page, 'a.signUpButton', { visible: true, timeout : 30000 })
		})
	})

	// Tests User Registration/Sign-Up Works using the Sign-Up Button,
	// Needed to Generate User for Test Registration
	describe('Create User Account', () => {
		// Precondition: User is logout
		it('Login Button Visible', async () => {
			await wait4selector(page, 'a.loginButton', { visible: true, timeout : 30000 })
		})

		// Click Sign-Up button and wait for registration form to show up
		it('Open Sign Up Page', async () => {
			await page.evaluate( () => {
				document.querySelector(".signUpButton").click()
			});
			await wait4selector(page, 'div.registration-container', { visible: true, timeout : 30000 });
		})

		// Perform registration form tests
		signUpTests(page, newUserID, newUserEmail, newUserPassword);

	})

	// Create New Test
	describe('New Test Registration', () => {
		newTestCreation(page, newTestName, newTestClass, newTestTag, newObservationSchema, secondObservationSchema, 
				observationValueN, observationValueSTD, observationValueMean, parameterTMax, tableTestLengh);
	})

	// Cancel Test Creation
	describe('Cancel Test Creation', () => {
		cancelTestCreation(page);
	})

	// Clone Test
	describe('Clone Test', () => {
		cloneTestCreation(page, newTestName, newTestClass, tableTestLengh);
	})

	// Tests Editing
	describe('Edit Test', () => {
		editTest1(page, editedTestName, editedTestClass, editedTestTag, observationVVolt, observationIVolt, tableTestLengh)
	})

	// Tests Model Page Filters
	describe('Test Page Filters', () => {
		it('Test Page Opened, New Test Button Present', async () => {
			await wait4selector(page, 'span.fa-plus', { visible: true , timeout : 5000 })
		})

		// Test Filters fields work by searching for new test
		testFilters(page, newTestName, 0, 0, tableTestLengh);
		testFilters(page, editedTestName, 0,0, tableTestLengh);

		// Test Filters fields work by searching for new class
		testFilters(page, newTestClass.replace(/ *\([^)]*\) */g, ""), 1, 1, tableTestLengh);
		testFilters(page, editedTestClass.replace(/ *\([^)]*\) */g, ""), 1, 1, tableTestLengh);

		// Test Filters fields work by searching by tag
		testFilters(page, newTestTag, 2, 2, tableTestLengh);
		testFilters(page, editedTestTag, 2, 2, tableTestLengh);
	})
	
	// User Logout
	describe('User Logout', () => {
		logoutTests(page);
	})
})