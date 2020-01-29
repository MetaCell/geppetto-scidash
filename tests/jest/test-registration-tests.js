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
const editedTestClass = "c	i";
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
			await wait4selector(page, 'div#testFormSelectClass', { visible: true , timeout : 5000 })
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

	// Tests Cloning Model
	describe('Clone Test', () => {
		it('Tests Page Opened, New Test Button Present', async () => {
			await wait4selector(page, 'span.fa-plus', { visible: true , timeout : 5000 })
		})

		it('Open Test Edit/Clone Menu', async () => {
			await page.evaluate(async () => {
				document.querySelector(".fa-ellipsis-v").click()
			});
			await wait4selector(page, 'span.fa-clone', { visible: true , timeout : 5000 })
		})

		it('Clone Test', async () => {
			await click(page, 'span.fa-clone');

			// Wait for model to clone
			await page.waitFor(5000);

			const models = await page.evaluate(async () => {
				return document.querySelectorAll(".scidash-table tr").length;
			});

			expect(models).toBeGreaterThanOrEqual(tableModelLength);

			const testName = await page.evaluate(async () => {
				return document.querySelectorAll(".scidash-table tr td")[6].innerText;
			});

			expect(testName).toEqual(newTestName);

			const testClass = await page.evaluate(async () => {
				return document.querySelectorAll(".scidash-table tr td")[7].innerText;
			});

			expect(testClass).toEqual(newTestClass);
		})
	})

	// Tests Editing
	describe('Edit Model', () => {
		it('Test Page Opened, New Test Button Present', async () => {
			await wait4selector(page, 'span.fa-plus', { visible: true , timeout : 5000 })
		})

		it('Open Test Edit/Clone Menu', async () => {
			await page.evaluate(async () => {
				document.querySelector(".fa-ellipsis-v").click()
			});
			await wait4selector(page, 'span.fa-pencil-square-o', { visible: true , timeout : 5000 })
		})

		it('Open Edit Test Form', async () => {
			await page.evaluate(async () => {
				document.querySelector(".fa-pencil-square-o").click()
			});

			await page.waitFor(1000);
			
			await wait4selector(page, 'div#testFormSelectClass', { visible: true , timeout : 5000 })
		})

		it('Test Name Field Present in Form', async () => {
			await wait4selector(page, 'input#test-name', { visible: true , timeout : 5000 })
		})

		it('Edit Test Name', async () => {
			await page.evaluate(async (newTest) => {
				var elm = document.querySelector('#test-name')
				var ev = new Event('input', { bubbles: true});
				ev.simulated = true;
				elm.value = newTest;
				elm.dispatchEvent(ev);
			}, editedTestName);

			const testName = await page.evaluate(async () => {
				return document.getElementById("test-name").value;
			});

			expect(testName).toEqual(editedTestName);
		})

		it('Test Class Dropdown Present in Form', async () => {
			await wait4selector(page, '#testFormSelectClass', { visible: true , timeout : 35000 })
		})

		it('Select '+  editedTestClass + ' Class', async () => {
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
			}, editedTestClass);
			
			await page.waitFor(2000);
			
			await page.waitForFunction('document.getElementById("testFormSelectClass").innerText.startsWith("'+editedTestClass+'")');
		})

		it('Test Parameters Populated', async () => {
			await page.waitFor(2000);
			
			const dtParameterValue = await page.evaluate(async () => {
				return Number(document.getElementById("dt (s)").value);
			});
			
			expect(dtParameterValue).toEqual(0.000025);
			
			const tmaxParameterValue = await page.evaluate(async () => {
				return Number(document.getElementById("tmax (s)").value);
			});

			expect(tmaxParameterValue).toEqual(0.1);
			
			const vmaxParameterValue = await page.evaluate(async () => {
				return Number(document.getElementById("v_max (V)").value);
			});

			expect(vmaxParameterValue).toEqual(0.06);
			
			const vminParameterValue = await page.evaluate(async () => {
				return Number(document.getElementById("v_min (V)").value);
			});

			expect(vminParameterValue).toEqual(-0.08);
			
			const vstepParameterValue = await page.evaluate(async () => {
				return Number(document.getElementById("v_step (V)").value);
			});

			expect(vstepParameterValue).toEqual(0.02);
		})
		
		it('Add New Tag Present in Form', async () => {
			await wait4selector(page, 'input#test-add-tags', { visible: true , timeout : 5000 })
		})
		
		it('Delete Tag', async () => {
			await page.evaluate(async () => {
				var elm =document.querySelector(".tags path")
				var evt = new CustomEvent('Event');
				evt.initEvent('keypress', true, false);
				evt.which = 13;
				evt.keyCode = 13;
				elm.dispatchEvent(evt);
			});

			const testTag = await page.evaluate(async () => {
				return document.querySelectorAll('.tags svg').length;
			});
			expect(testTag).toEqual(0);
		})

		it('Enter New Tag', async () => {
			await page.evaluate(async (testTag) => {
				var elm = document.querySelector('#test-add-tags')
				var ev = new Event('input', { bubbles: true});
				ev.simulated = true;
				elm.value = testTag;
				elm.dispatchEvent(ev);

				var evt = new CustomEvent('Event');
				evt.initEvent('keypress', true, false);
				evt.which = 13;
				evt.keyCode = 13;
				elm.dispatchEvent(evt);

			}, editedTestTag);

			const testTag = await page.evaluate(async () => {
				return document.querySelectorAll('.tags svg').length;
			});
			expect(testTag).toEqual(1);
		})
		
		it('Observation Parameter Fields Present', async () => {
			await page.waitFor(2000);
			const iObservationValue = await page.evaluate(async () => {
				var elm = document.getElementById("i (volt | picoampere)");
				if(elm == undefined || elm == null){
					return false;
				}
				return true;
			});
			
			expect(iObservationValue).toEqual(true);
			
			await page.waitFor(2000);
			const vObservationValue = await page.evaluate(async () => {
				var elm = document.getElementById("v (volt | picoampere)");
				if(elm == undefined || elm == null){
					return false;
				}
				return true;
			});
			
			expect(vObservationValue).toEqual(true);
		})

		it('Enter Observation Value i (volt | picoampere)', async () => {
			await page.evaluate(async (value) => {
				var elm = document.getElementById('i (volt | picoampere)')
				var ev = new Event('input', { bubbles: true});
				ev.simulated = true;
				elm.value = value;
				elm.dispatchEvent(ev);
			}, observationIVolt);

			const observationValue = await page.evaluate(async () => {
				return Number(document.getElementById("i (volt | picoampere)").value);
			});

			expect(observationValue).toEqual(observationIVolt);
		})
		
		it('Enter Observation Value v (volt | picoampere)', async () => {
			await page.evaluate(async (value) => {
				var elm = document.getElementById('v (volt | picoampere)')
				var ev = new Event('input', { bubbles: true});
				ev.simulated = true;
				elm.value = value;
				elm.dispatchEvent(ev);
			}, observationVVolt);

			const observationValue = await page.evaluate(async () => {
				return Number(document.getElementById("v (volt | picoampere)").value);
			});

			expect(observationValue).toEqual(observationVVolt);
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

			expect(modelName).toEqual(editedTestName);

			const modelClass = await page.evaluate(async () => {
				return document.querySelectorAll(".scidash-table tr td")[1].innerText;
			});

			expect(modelClass).toEqual(editedTestClass);

			const modelTag = await page.evaluate(async () => {
				return document.querySelectorAll(".chips span")[0].innerText;
			});

			expect(modelTag).toEqual(editedTestTag);
		})

	})

	// Tests Model Page Filters
	describe('Test Page Filters', () => {
		it('Test Page Opened, New Test Button Present', async () => {
			await wait4selector(page, 'span.fa-plus', { visible: true , timeout : 5000 })
		})

		testModelFilters(page, newTestName, 0, 0, tableModelLength);
		testModelFilters(page, editedTestName, 0,0, tableModelLength);

		testModelFilters(page, newTestClass, 1, 1, tableModelLength);
		testModelFilters(page, editedTestClass, 1, 1, tableModelLength);

		testModelFilters(page, newTestTag, 2, 2, tableModelLength);
		testModelFilters(page, editedTestTag, 2, 2, tableModelLength);
	})
	
	// User Logout
	describe('User Logout', () => {
		logoutTests(page);
	})
})