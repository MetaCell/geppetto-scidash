const puppeteer = require('puppeteer');
const { TimeoutError } = require('puppeteer/Errors');

import { wait4selector, click , makeUserID, signUpTests, logoutTests, testModelFilters, resetModelFilters} from './utils';

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
const editedTestClass = "LEMSModel";
const newObservationSchema = "Mean, Standard Deviation, N";
const secondObservationSchema = "Mean, Standard Error, N";
const observationValueN = 1;
const observationValueSTD = 50;
const observationValueMean = 100;
const parameterTMax = 10; 

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
		it('Sidebar Component Opened, Tests Registration Option Present', async () => {
			await click(page, 'button#hamMenu');
			await wait4selector(page, 'span#hamMenuTests', { visible: true })
		})

		it('Tests Registration Page Opened, New Tests Registration Button Present', async () => {
			await click(page, '#hamMenuTests');
			await wait4selector(page, 'span.fa-plus', { visible: true , timeout : 5000 })
		})

		it('New Test Registration Form', async () => {
			await page.evaluate(async () => {
				document.querySelector("span.fa-plus").click()
			});
			await wait4selector(page, 'div#testFormSelectClass', { visible: true , timeout : 5000 })
		})
		
		it('Test Name Field Present in Form', async () => {
			await wait4selector(page, 'input#test-name', { visible: true , timeout : 5000 })
		})

		it('Enter Test Name', async () => {
			await page.evaluate(async (newTest) => {
				var elm = document.querySelector('#test-name')
				var ev = new Event('input', { bubbles: true});
				ev.simulated = true;
				elm.value = newTest;
				elm.dispatchEvent(ev);
			}, newTestName);

			const testName = await page.evaluate(async () => {
				return document.getElementById("test-name").value;
			});

			expect(testName).toEqual(newTestName);
		})

		it('Test Class Dropdown Present in Form', async () => {
			await wait4selector(page, '#testFormSelectClass', { visible: true , timeout : 35000 })
		})

		it('Select '+  newTestClass + ' Class', async () => {
			await page.evaluate(async () => {
				var evt = document.createEvent('MouseEvent');
				evt.initEvent('mouseup', true, false);
				var elm = document.querySelector('#testFormSelectClass button')
				elm.dispatchEvent(evt);
			});

			await page.waitFor(2000);
			
			await page.evaluate(async (className) => {
				var evt = document.createEvent('MouseEvent');
				evt.initEvent('mouseup', true, false);
				var elm = document.getElementById(className).querySelector("div");
				elm.dispatchEvent(evt);
			}, newTestClass);
			
			await page.waitFor(2000);
			
			await page.waitForFunction('document.getElementById("testFormSelectClass").innerText.startsWith("InputResistanceTest (neuronunit.tests.passive)")');
		})

		it('Test Parameters Populated', async () => {
			await page.waitFor(2000);
			
			const delayParameterValue = await page.evaluate(async () => {
				return Number(document.getElementById("delay (s)").value);
			});
			
			expect(delayParameterValue).toEqual(0.1);
			
			const paddingParameterValue = await page.evaluate(async () => {
				return Number(document.getElementById("padding (s)").value);
			});

			expect(paddingParameterValue).toEqual(0.2);
			
			const durationParameterValue = await page.evaluate(async () => {
				return Number(document.getElementById("duration (s)").value);
			});

			expect(durationParameterValue).toEqual(0.3);
		})
		
		it('Add New Tag Present in Form', async () => {
			await wait4selector(page, 'input#test-add-tags', { visible: true , timeout : 5000 })
		})

		it('Enter New Tag', async () => {
			await page.evaluate(async (newTestTag) => {
				var elm = document.querySelector('#test-add-tags')
				var ev = new Event('input', { bubbles: true});
				ev.simulated = true;
				elm.value = newTestTag;
				elm.dispatchEvent(ev);

				var evt = new CustomEvent('Event');
				evt.initEvent('keypress', true, false);
				evt.which = 13;
				evt.keyCode = 13;
				elm.dispatchEvent(evt);

			}, newTestTag);

			const testTag = await page.evaluate(async () => {
				return document.querySelectorAll('.tags svg').length;
			});
			expect(testTag).toEqual(1);
		})
		
		it('Observation Schema Dropdown Present in Form', async () => {
			await wait4selector(page, '#testFormSelectObservationSchema', { visible: true , timeout : 35000 })
		})
		
		it('Observation Parameter Field Present', async () => {
			await page.waitFor(2000);
			const fieldPresent = await page.evaluate(async () => {
				var elm = document.getElementById("std (megaohm)");
				if(elm == undefined || elm == null){
					return false;
				}
				return true;
			});
			
			expect(fieldPresent).toEqual(true);
		})

		it('Select '+  secondObservationSchema + ' Observation Schema', async () => {
			await page.evaluate(async () => {
				var evt = document.createEvent('MouseEvent');
				evt.initEvent('mouseup', true, false);
				var elm = document.querySelector('#testFormSelectObservationSchema button')
				elm.dispatchEvent(evt);
			});
			await page.waitFor(2000);
			
			await page.evaluate(async (className) => {
				var evt = document.createEvent('MouseEvent');
				evt.initEvent('mouseup', true, false);
				var elm = document.getElementById(className).querySelector("div");
				elm.dispatchEvent(evt);
			}, secondObservationSchema);
			await page.waitForFunction('document.getElementById("testFormSelectObservationSchema").innerText.startsWith("Mean, Standard Error, N")');
		})
		
		it('Observation Parameter Field Present', async () => {
			await page.waitFor(2000);
			const fieldPresent = await page.evaluate(async () => {
				var elm = document.getElementById("sem (megaohm)");
				if(elm == undefined || elm == null){
					return false;
				}
				return true;
			});
			
			expect(fieldPresent).toEqual(true);
		})
		
		it('Select '+  newObservationSchema + ' Observation Schema', async () => {
			await page.evaluate(async () => {
				var evt = document.createEvent('MouseEvent');
				evt.initEvent('mouseup', true, false);
				var elm = document.querySelector('#testFormSelectObservationSchema button')
				elm.dispatchEvent(evt);
			});
			
			await page.waitFor(2000);

			await page.evaluate(async (className) => {
				var evt = document.createEvent('MouseEvent');
				evt.initEvent('mouseup', true, false);
				var elm = document.getElementById(className).querySelector("div");
				elm.dispatchEvent(evt);
			}, newObservationSchema);
			await page.waitForFunction('document.getElementById("testFormSelectObservationSchema").innerText.startsWith("Mean, Standard Deviation, N")');
		})
		
		it('Observation Parameter Field Present', async () => {
			await page.waitFor(2000);
			const fieldPresent = await page.evaluate(async () => {
				var elm = document.getElementById("std (megaohm)");
				if(elm == undefined || elm == null){
					return false;
				}
				return true;
			});
			
			expect(fieldPresent).toEqual(true);
		})

		it('Enter Observation Value N', async () => {
			await page.evaluate(async (value) => {
				var elm = document.getElementById('n (-)')
				var ev = new Event('input', { bubbles: true});
				ev.simulated = true;
				elm.value = value;
				elm.dispatchEvent(ev);
			}, observationValueN);

			const observationValue = await page.evaluate(async () => {
				return Number(document.getElementById("n (-)").value);
			});

			expect(observationValue).toEqual(observationValueN);
		})
		
		it('Enter Observation Value  STD', async () => {
			await page.evaluate(async (value) => {
				var elm = document.getElementById('std (megaohm)')
				var ev = new Event('input', { bubbles: true});
				ev.simulated = true;
				elm.value = value;
				elm.dispatchEvent(ev);
			}, observationValueSTD);

			const observationValue = await page.evaluate(async () => {
				return Number(document.getElementById("std (megaohm)").value);
			});

			expect(observationValue).toEqual(observationValueSTD);
		})
		
		it('Enter Observation Value Mean', async () => {
			await page.evaluate(async (value) => {
				var elm = document.getElementById('mean (megaohm)')
				var ev = new Event('input', { bubbles: true});
				ev.simulated = true;
				elm.value = value;
				elm.dispatchEvent(ev);
			}, observationValueMean);

			const observationValue = await page.evaluate(async () => {
				return Number(document.getElementById("mean (megaohm)").value);
			});

			expect(observationValue).toEqual(observationValueMean);
		})
		
		it('Enter Parameter Value TMax', async () => {
			await page.evaluate(async (value) => {
				var elm = document.getElementById('tmax (s)')
				var ev = new Event('input', { bubbles: true});
				ev.simulated = true;
				elm.value = value;
				elm.dispatchEvent(ev);
			}, parameterTMax);

			const paramValue = await page.evaluate(async () => {
				return Number(document.getElementById("tmax (s)").value);
			});

			expect(paramValue).toEqual(parameterTMax);
		})

		it('Save Test', async () => {
			await page.evaluate(async () => {
				return document.getElementById("save-test").click();
			});
			
			await page.waitFor(2000);

			await wait4selector(page, 'table.scidash-table', { visible: true , timeout : 5000 })
		})

		it('New Test Present in Tests Page', async () => {
			await page.waitFor(5000);
			const tableModels = await page.evaluate(async () => {
				return document.querySelectorAll(".scidash-table tr").length;
			});
			expect(tableModels).toBeGreaterThanOrEqual(tableModelLength);

			const modelName = await page.evaluate(async () => {
				return document.querySelectorAll(".scidash-table tr td")[0].innerText;
			});

			expect(modelName).toEqual(newTestName);

			const modelClass = await page.evaluate(async () => {
				return document.querySelectorAll(".scidash-table tr td")[1].innerText;
			});

			expect(modelClass).toEqual(newTestClass);

			const modelTag = await page.evaluate(async () => {
				return document.querySelectorAll(".chips span")[0].innerText;
			});

			expect(modelTag).toEqual(newTestTag);
		})
	})

	// Tests Cancel Model Creation
	describe('Cancel Test Creation', () => {
		it('Test Creation Page Opened, New Test Button Present', async () => {
			await wait4selector(page, 'span.fa-plus', { visible: true , timeout : 5000 })
		})

		it('New Test Creation Form', async () => {
			await page.evaluate(async () => {
				document.querySelector("span.fa-plus").click()
			});
			await wait4selector(page, 'div.actions-container', { visible: true , timeout : 5000 })
		})

		it('Cancel Test Creation Button Present', async () => {
			await wait4selector(page, '#cancel-test', { visible: true , timeout : 5000 })
		})

		it('Cancel Test Creation, Navigate Back to Tests Page', async () => {
			await page.evaluate(async () => {
				return document.getElementById("cancel-test").click();
			});

			await wait4selector(page, 'table.scidash-table', { visible: true , timeout : 5000 })
		})
	})

//	// Tests Cloning Model
//	describe('Clone Model', () => {
//		it('Models Page Opened, New Model Button Present', async () => {
//			await wait4selector(page, 'span.fa-plus', { visible: true , timeout : 5000 })
//		})
//
//		it('Open Model Edit/Clone Menu', async () => {
//			await page.evaluate(async () => {
//				document.querySelector(".fa-ellipsis-v").click()
//			});
//			await wait4selector(page, 'span.fa-clone', { visible: true , timeout : 5000 })
//		})
//
//		it('Clone Model', async () => {
//			await click(page, 'span.fa-clone');
//
//			// Wait for model to clone
//			await page.waitFor(5000);
//
//			const models = await page.evaluate(async () => {
//				return document.querySelectorAll(".scidash-table tr").length;
//			});
//
//			expect(models).toBeGreaterThanOrEqual(tableModelLength);
//
//			const modelName = await page.evaluate(async () => {
//				return document.querySelectorAll(".scidash-table tr td")[7].innerText;
//			});
//
//			expect(modelName).toEqual(newModelName);
//
//			const modelClass = await page.evaluate(async () => {
//				return document.querySelectorAll(".scidash-table tr td")[8].innerText;
//			});
//
//			expect(modelClass).toEqual("ReducedModel");
//		})
//	})
//
//	// Tests Model Editing
//	describe('Edit Model', () => {
//		it('Models Page Opened, New Model Button Present', async () => {
//			await wait4selector(page, 'span.fa-plus', { visible: true , timeout : 5000 })
//		})
//
//		it('Open Model Edit/Clone Menu', async () => {
//			await page.evaluate(async () => {
//				document.querySelector(".fa-ellipsis-v").click()
//			});
//			await wait4selector(page, 'span.fa-pencil-square-o', { visible: true , timeout : 5000 })
//		})
//
//		it('Open Edit Model Form', async () => {
//			await click(page, 'span.fa-pencil-square-o');
//
//			await wait4selector(page, 'div.actions-container', { visible: true , timeout : 5000 })
//		})
//
//		it('Source URL Field Present in Form', async () => {
//			await wait4selector(page, 'input#source-url', { visible: true , timeout : 5000 })
//		})
//
//		it('Model URL Validated', async () => {
//			await wait4selector(page, 'span.icons', { visible: true , timeout : 5000 });
//			// Wait for URL model to validate
//			await wait4selector(page, '#validating-source-url', { hidden: true , timeout : 60000 })
//			const modelValidated = await page.evaluate(async () => {
//				return document.querySelector(".icons svg").style.color;
//			});
//			expect(modelValidated).toEqual("green");
//		})
//
//		it('Select Class Dropdown Present in Form', async () => {
//			await wait4selector(page, '#modelFormSelectClass', { visible: true , timeout : 35000 })
//		})
//
//		it('Open "Select Class" Dropdown Menu', async () => {
//			await page.evaluate(async () => {
//				var evt = document.createEvent('MouseEvent');
//				evt.initEvent('mouseup', true, false);
//				var elm = document.querySelector('#modelFormSelectClass button')
//				elm.dispatchEvent(evt);
//			});
//			await wait4selector(page, '#LEMSModel', { visible: true , timeout : 35000 })
//		})
//
//		it('Select "LEMSModel" Class', async () => {
//			await page.evaluate(async () => {
//				var evt = document.createEvent('MouseEvent');
//				evt.initEvent('mouseup', true, false);
//				var elm = document.querySelector('#LEMSModel div')
//				elm.dispatchEvent(evt);
//			});
//			await page.waitForFunction('document.getElementById("modelFormSelectClass").innerText.startsWith("LEMSModel")');
//		})
//
//		it('Add New Tag Present in Form', async () => {
//			await wait4selector(page, 'input#new-tag', { visible: true , timeout : 5000 })
//		})
//
//		it('Delete Tag', async () => {
//			await page.evaluate(async (editedModelTag) => {
//				var elm =document.querySelector(".tags path")
//				var evt = new CustomEvent('Event');
//				evt.initEvent('keypress', true, false);
//				evt.which = 13;
//				evt.keyCode = 13;
//				elm.dispatchEvent(evt);
//			}, editedModelTag);
//
//			const testModelTag = await page.evaluate(async () => {
//				return document.querySelectorAll('.tags svg').length;
//			});
//			expect(testModelTag).toEqual(0);
//		})
//
//		it('Enter New Tag', async () => {
//			await page.evaluate(async (editedModelTag) => {
//				var elm = document.querySelector('#new-tag')
//				var ev = new Event('input', { bubbles: true});
//				ev.simulated = true;
//				elm.value = editedModelTag;
//				elm.dispatchEvent(ev);
//
//				var evt = new CustomEvent('Event');
//				evt.initEvent('keypress', true, false);
//				evt.which = 13;
//				evt.keyCode = 13;
//				elm.dispatchEvent(evt);
//			}, editedModelTag);
//
//			const testModelTag = await page.evaluate(async () => {
//				return document.querySelectorAll('.tags svg').length;
//			});
//			expect(testModelTag).toEqual(1);
//		})
//
//		it('Model Name Field Present in Form', async () => {
//			await wait4selector(page, 'input#model-name', { visible: true , timeout : 5000 })
//		})
//
//		it('Edit Model Name', async () => {
//			await page.evaluate(async (newModel) => {
//				var elm = document.querySelector('#model-name')
//				var ev = new Event('input', { bubbles: true});
//				ev.simulated = true;
//				elm.value = newModel;
//				elm.dispatchEvent(ev);
//
//			}, editedModelName);
//
//			const testModelName = await page.evaluate(async () => {
//				return document.getElementById("model-name").value;
//			});
//
//			expect(testModelName).toEqual(editedModelName);
//		})
//
//		it('Model Parameters Button Present', async () => {
//			await wait4selector(page, '#open-model-parameters', { visible: true , timeout : 5000 })
//		})
//
//		it('Model Parameters Button Enabled', async () => {
//			await wait4selector(page, '#loading-model-parameters', { hidden: true , timeout : 125000 })
//
//			const modelParametersButton = await page.evaluate(async () => {
//				return document.getElementById("open-model-parameters").disabled;
//			});
//
//			expect(modelParametersButton).toEqual(false);
//		})
//		
//		it('Model Parameters Dialog Open', async () => {
//			await page.evaluate(async () => {
//				return document.getElementById("open-model-parameters").click();
//			});
//			
//			await wait4selector(page, '#parameters-table', { visible: true , timeout : 5000 })
//		})
//
//		it('Save Model', async () => {
//			const saveModelEnabled = await page.evaluate(async () => {
//				return document.getElementById("save-model").disabled;
//			});
//
//			expect(saveModelEnabled).toEqual(false);
//
//			await page.evaluate(async () => {
//				return document.getElementById("save-model").click();
//			});
//
//			await wait4selector(page, 'table.scidash-table', { visible: true , timeout : 5000 })
//		})
//
//		it('Test Model Present in Models Page', async () => {
//			await page.waitFor(5000);
//			const models = await page.evaluate(async () => {
//				return document.querySelectorAll(".scidash-table tr").length;
//			});
//
//			tableModelLength = tableModelLength+1;
//			expect(models).toBeGreaterThanOrEqual(tableModelLength);
//
//			const modelName = await page.evaluate(async () => {
//				return document.querySelectorAll(".scidash-table tr td")[0].innerText;
//			});
//
//			expect(modelName).toEqual(editedModelName);
//
//			const modelClass = await page.evaluate(async () => {
//				return document.querySelectorAll(".scidash-table tr td")[1].innerText;
//			});
//
//			expect(modelClass).toEqual(editedModelClass);
//
//			const modelTag = await page.evaluate(async () => {
//				return document.querySelectorAll(".chips span")[1].innerText;
//			});
//
//			expect(modelTag).toEqual(editedModelTag);
//		})
//	})
//
//	// Tests Model Page Filters
//	describe('Model Page Filters', () => {
//		it('Models Page Opened, New Model Button Present', async () => {
//			await wait4selector(page, 'span.fa-plus', { visible: true , timeout : 5000 })
//		})
//
//		testModelFilters(page, newModelName, 0, 0, tableModelLength);
//		testModelFilters(page, editedModelName, 0,0, tableModelLength);
//
//		testModelFilters(page, newModelClass, 1, 1, tableModelLength);
//		testModelFilters(page, editedModelClass, 1, 1, tableModelLength);
//
//		testModelFilters(page, newModelTag, 2, 3, tableModelLength);
//		testModelFilters(page, editedModelTag, 2, 3, tableModelLength);
//	})
//	
//	// User Logout
//	describe('User Logout', () => {
//		logoutTests(page);
//	})
})