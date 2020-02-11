import { wait4selector, testFilters} from './utils';
import { makeUserID, signUpTests, logoutTests } from './user-auth-utils';
import { modelCreation, saveModel, editModel, cancelModelCreation, cloneModel} from './model-utils';

const scidashURL = process.env.url ||  'http://localhost:8000';

// Variables used for creation of new user
let newUserID = makeUserID(6);
const newUserEmail = "test_user@gmail.com";
const newUserPassword = "Password_2020";

// Variables used for Model registration form
const newModelName = "TestModel1";
const editedModelName = "TestModel2";
const newModelURL = "https://github.com/ddelpiano/neuronunit/blob/dev/neuronunit/models/NeuroML2/LEMS_2007One.xml";
const newModelTag ="auto-testing";
const editedModelTag = "test-edited";
const newModelClass = "ReducedModel";
const editedModelClass = "LEMSModel";

const variable1 = "net1.RS_pop[0].u";
const variable2= "net1.RS_pop[0].v";

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
	describe('Test New Model Creation', () => {
		modelCreation(page, newModelName, newModelURL, newModelClass, newModelTag,variable1, variable2);
	})

	// Save New Model
	describe('Test New Model Creation', () => {
		saveModel(page, newModelName, newModelClass, newModelTag, tableModelLength);
	})

	// Tests Cancel Model Creation
	describe('Cancel Model Creation', () => {
		cancelModelCreation(page);
	})

	// Tests Cloning Model
	describe('Clone Model', () => {
		cloneModel(page, newModelName, newModelClass, tableModelLength);
	})

	// Tests Model Editing
	describe('Edit Model', () => {
		editModel(page, editedModelName, editedModelClass, editedModelTag, variable1, variable2, tableModelLength);
	})

	// Tests Model Page Filters
	describe('Model Page Filters', () => {
		it('Models Page Opened, New Model Button Present', async () => {
			await wait4selector(page, 'span.fa-plus', { visible: true , timeout : 5000 })
		})

		// Test page filters fields by searching by model name
		testFilters(page, newModelName, 0, 0, tableModelLength);
		testFilters(page, editedModelName, 0,0, tableModelLength);

		// Test page filters fields by searching by model class name
		testFilters(page, newModelClass, 1, 1, tableModelLength);
		testFilters(page, editedModelClass, 1, 1, tableModelLength);

		// Test page filters fields by searching by tag name
		testFilters(page, newModelTag, 2, 3, tableModelLength);
		testFilters(page, editedModelTag, 2, 3, tableModelLength);
	})
	
	// User Logout
	describe('User Logout', () => {
		logoutTests(page);
	})
})