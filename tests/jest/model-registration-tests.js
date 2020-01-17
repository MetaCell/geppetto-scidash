const puppeteer = require('puppeteer');
const { TimeoutError } = require('puppeteer/Errors');

import { wait4selector, click , makeUserID, signUpTests, loginTests, logoutTests, resetPasswordTests} from './utils';

const scidashURL = process.env.url ||  'http://localhost:8000';
const testScoresURL = scidashURL + '/?timestamp_to=2018-07-12&timestamp_from=2018-05-05&status=c'; 

/** Variables used for creation of new user */
let newUserID = makeUserID(6);
const newUserEmail = "test_user@gmail.com";
const newUserPassword = "Password_2020";

const newModelName = "TestModel1";
const editedModelName = "TestModel2";
const newModelURL = "https://github.com/ddelpiano/neuronunit/blob/dev/neuronunit/models/NeuroML2/LEMS_2007One.xml";
const newModelTag ="auto-testing";
const editedModelTag = "test-edited";
const newModelClass = "ReducedModel";
const editedModelClass = "LEMSModel";

const tableModelLength = 2;

/**
 * User Auth Tests
 */
describe('Scidash User Authorization Tests', () => {
	beforeAll(async () => {
		jest.setTimeout(60000);
		await page.setViewport({ width: 1280, height: 800 })
		await page.goto(scidashURL);
	});

	//Tests components in landing page are present
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
			await wait4selector(page, 'div#scidash-logo', { visible: true, timeout : 10000 })
		})

		it('Login Button Visible', async () => {
			await wait4selector(page, 'div.login-button', { visible: true, timeout : 10000 })
		})

		it('Sign Up Button Visible', async () => {
			await wait4selector(page, 'div.signup-button', { visible: true, timeout : 10000 })
		})
	})

	//Tests User Registration/Sign-Up Works using the Sign-Up Button
	describe('Create User Account', () => {
		// Precondition: User is logout
		it('Login Button Visible', async () => {
			await wait4selector(page, 'div.login-button', { visible: true, timeout : 10000 })
		})

		// Click Sign-Up button and wait for registration form to show up
		it('Open Sign Up Page', async () => {
			await page.evaluate(async () => {
				document.querySelector(".signup-button a").click()
			});
			await wait4selector(page, 'div.registration-container', { visible: true, timeout : 10000 });
		})

		// Perform registration form tests
		signUpTests(page, newUserID, newUserEmail, newUserPassword);

	})

	//Tests User Logout Functionality
	describe('Test New Model Registration', () => {
		it('Sidebar Component Opened, Models Option Present', async () => {
			await click(page, 'button#hamMenu');
			await wait4selector(page, 'span#hamMenuModels', { visible: true })
		})

		it('Models Page Opened, New Model Button Present', async () => {
			await click(page, '#hamMenuModels');
			await wait4selector(page, 'span.fa-plus', { visible: true , timeout : 5000 })
		})

		it('New Model Registration Form', async () => {
			await page.evaluate(async () => {
				document.querySelector("span.fa-plus").click()
			});
			await wait4selector(page, 'div.actions-container', { visible: true , timeout : 5000 })
		})

		it('Source URL Field Present in Form', async () => {
			await wait4selector(page, 'input#source-url', { visible: true , timeout : 5000 })
		})

		it('Enter Source URL', async () => {
			await page.evaluate(async (newModelURL) => {
				var elm = document.querySelector('#source-url')
				var ev = new Event('input', { bubbles: true});
				ev.simulated = true;
				elm.value = newModelURL;
				elm.dispatchEvent(ev);
			}, newModelURL);
			
			const testModelURL = await page.evaluate(async () => {
				return document.getElementById("source-url").value;
			});
			expect(testModelURL).toEqual(newModelURL);
		})

		it('Model URL Validated', async () => {
			await wait4selector(page, 'span.icons', { visible: true , timeout : 5000 });
			// Wait for URL model to validate
			await page.waitFor(10000);
			const modelValidated = await page.evaluate(async () => {
				return document.querySelector(".icons svg").style.color;
			});
			expect(modelValidated).toEqual("green");
		})

		it('Select Class Dropdown Present in Form', async () => {
			await wait4selector(page, '#modelFormSelectClass', { visible: true , timeout : 35000 })
		})

		it('Open "Select Class" Dropdown Menu', async () => {
			await page.evaluate(async () => {
				var evt = document.createEvent('MouseEvent');
				evt.initEvent('mouseup', true, false);
				var elm = document.querySelector('#modelFormSelectClass button')
				elm.dispatchEvent(evt);
			});
			await wait4selector(page, '#ReducedModel', { visible: true , timeout : 35000 })
		})

		it('Select "ReducedModel" Class', async () => {
			await page.evaluate(async () => {
				var evt = document.createEvent('MouseEvent');
				evt.initEvent('mouseup', true, false);
				var elm = document.querySelector('#ReducedModel div')
				elm.dispatchEvent(evt);
			});
			await page.waitForFunction('document.getElementById("modelFormSelectClass").innerText.startsWith("ReducedModel")');
		})

		it('Add New Tag Present in Form', async () => {
			await wait4selector(page, 'input#new-tag', { visible: true , timeout : 5000 })
		})

		it('Enter New Tag', async () => {
			await page.evaluate(async (newModelTag) => {
				var elm = document.querySelector('#new-tag')
				var ev = new Event('input', { bubbles: true});
				ev.simulated = true;
				elm.value = newModelTag;
				elm.dispatchEvent(ev);
				
				var evt = new CustomEvent('Event');
				evt.initEvent('keypress', true, false);
				evt.which = 13;
				evt.keyCode = 13;
				elm.dispatchEvent(evt);
				
			}, newModelTag);
			
			const testModelTag = await page.evaluate(async () => {
				return document.querySelectorAll('.tags svg').length;
			});
			expect(testModelTag).toEqual(1);
		})

		it('Model Name Field Present in Form', async () => {
			await wait4selector(page, 'input#model-name', { visible: true , timeout : 5000 })
		})

		it('Enter Model Name', async () => {
			await page.evaluate(async (newModel) => {
				var elm = document.querySelector('#model-name')
				var ev = new Event('input', { bubbles: true});
				ev.simulated = true;
				elm.value = newModel;
				elm.dispatchEvent(ev);
			}, newModelName);
			
			const testModelName = await page.evaluate(async () => {
				return document.getElementById("model-name").value;
			});

			expect(testModelName).toEqual(newModelName);
		})

		it('Save Model', async () => {
			const saveModelEnabled = await page.evaluate(async () => {
				return document.getElementById("save-model").disabled;
			});

			expect(saveModelEnabled).toEqual(false);

			await page.evaluate(async () => {
				return document.getElementById("save-model").click();
			});

			await wait4selector(page, 'table.scidash-table', { visible: true , timeout : 5000 })
		})

		it('Test Model Present in Models Page', async () => {
			await page.waitFor(5000);
			const tableModels = await page.evaluate(async () => {
				return document.querySelectorAll(".scidash-table tr").length;
			});
			expect(tableModels).toBeGreaterThanOrEqual(tableModelLength);
			
			const modelName = await page.evaluate(async () => {
				return document.querySelectorAll(".scidash-table tr td")[0].innerText;
			});

			expect(modelName).toEqual(newModelName);
			
			const modelClass = await page.evaluate(async () => {
				return document.querySelectorAll(".scidash-table tr td")[1].innerText;
			});

			expect(modelClass).toEqual(newModelClass);
			
			const modelTag = await page.evaluate(async () => {
				return document.querySelectorAll(".chips span")[0].innerText;
			});

			expect(modelTag).toEqual(newModelTag);
		})
	})
	
		//Tests User Logout Functionality
	describe('Cancel Model Creation', () => {
		it('Models Page Opened, New Model Button Present', async () => {
			await wait4selector(page, 'span.fa-plus', { visible: true , timeout : 5000 })
		})
		
		it('New Model Creation Form', async () => {
			await page.evaluate(async () => {
				document.querySelector("span.fa-plus").click()
			});
			await wait4selector(page, 'div.actions-container', { visible: true , timeout : 5000 })
		})
		
		it('Cancel Model Creation Button Present', async () => {
			await wait4selector(page, '#cancel-model', { visible: true , timeout : 5000 })
		})
		
		it('Cancel Model Creation, Navigate Back to Models Page', async () => {
			await page.evaluate(async () => {
				return document.getElementById("cancel-model").click();
			});

			await wait4selector(page, 'table.scidash-table', { visible: true , timeout : 5000 })
		})
	})
	
	describe('Clone Model', () => {
		it('Models Page Opened, New Model Button Present', async () => {
			await wait4selector(page, 'span.fa-plus', { visible: true , timeout : 5000 })
		})
		
		it('Open Model Edit/Clone Menu', async () => {
			await page.evaluate(async () => {
				document.querySelector(".fa-ellipsis-v").click()
			});
			await wait4selector(page, 'span.fa-clone', { visible: true , timeout : 5000 })
		})
		
		it('Clone Model', async () => {
			await click(page, 'span.fa-clone');

			// Wait for model to clone
			await page.waitFor(5000);
			
			const models = await page.evaluate(async () => {
				return document.querySelectorAll(".scidash-table tr").length;
			});

			expect(models).toBeGreaterThanOrEqual(tableModelLength);
			
			const modelName = await page.evaluate(async () => {
				return document.querySelectorAll(".scidash-table tr td")[7].innerText;
			});

			expect(modelName).toEqual(newModelName);
			
			const modelClass = await page.evaluate(async () => {
				return document.querySelectorAll(".scidash-table tr td")[8].innerText;
			});

			expect(modelClass).toEqual("ReducedModel");
		})
	})
	
	describe('Edit Model', () => {
		it('Models Page Opened, New Model Button Present', async () => {
			await wait4selector(page, 'span.fa-plus', { visible: true , timeout : 5000 })
		})
		
		it('Open Model Edit/Clone Menu', async () => {
			await page.evaluate(async () => {
				document.querySelector(".fa-ellipsis-v").click()
			});
			await wait4selector(page, 'span.fa-pencil-square-o', { visible: true , timeout : 5000 })
		})
		
		it('Open Edit Model Form', async () => {
			await click(page, 'span.fa-pencil-square-o');

			await wait4selector(page, 'div.actions-container', { visible: true , timeout : 5000 })
		})
		
		it('Source URL Field Present in Form', async () => {
			await wait4selector(page, 'input#source-url', { visible: true , timeout : 5000 })
		})

		it('Model URL Validated', async () => {
			await wait4selector(page, 'span.icons', { visible: true , timeout : 5000 });
			// Wait for URL model to validate
			await page.waitFor(5000);
			const modelValidated = await page.evaluate(async () => {
				return document.querySelector(".icons svg").style.color;
			});
			expect(modelValidated).toEqual("green");
		})

		it('Select Class Dropdown Present in Form', async () => {
			await wait4selector(page, '#modelFormSelectClass', { visible: true , timeout : 35000 })
		})

		it('Open "Select Class" Dropdown Menu', async () => {
			await page.evaluate(async () => {
				var evt = document.createEvent('MouseEvent');
				evt.initEvent('mouseup', true, false);
				var elm = document.querySelector('#modelFormSelectClass button')
				elm.dispatchEvent(evt);
			});
			await wait4selector(page, '#LEMSModel', { visible: true , timeout : 35000 })
		})

		it('Select "LEMSModel" Class', async () => {
			await page.evaluate(async () => {
				var evt = document.createEvent('MouseEvent');
				evt.initEvent('mouseup', true, false);
				var elm = document.querySelector('#LEMSModel div')
				elm.dispatchEvent(evt);
			});
			await page.waitForFunction('document.getElementById("modelFormSelectClass").innerText.startsWith("LEMSModel")');
		})

		it('Add New Tag Present in Form', async () => {
			await wait4selector(page, 'input#new-tag', { visible: true , timeout : 5000 })
		})

		it('Enter New Tag', async () => {
			await page.evaluate(async (editedModelTag) => {
				var elm = document.querySelector('#new-tag')
				var ev = new Event('input', { bubbles: true});
				ev.simulated = true;
				elm.value = editedModelTag;
				elm.dispatchEvent(ev);
				
				var evt = new CustomEvent('Event');
				evt.initEvent('keypress', true, false);
				evt.which = 13;
				evt.keyCode = 13;
				elm.dispatchEvent(evt);
			}, editedModelTag);
			
			const testModelTag = await page.evaluate(async () => {
				return document.querySelectorAll('.tags svg').length;
			});
			expect(testModelTag).toEqual(1);
		})

		it('Model Name Field Present in Form', async () => {
			await wait4selector(page, 'input#model-name', { visible: true , timeout : 5000 })
		})

		it('Edit Model Name', async () => {
			await page.evaluate(async (newModel) => {
				var elm = document.querySelector('#model-name')
				var ev = new Event('input', { bubbles: true});
				ev.simulated = true;
				elm.value = newModel;
				elm.dispatchEvent(ev);

			}, editedModelName);
			
			const testModelName = await page.evaluate(async () => {
				return document.getElementById("model-name").value;
			});

			expect(testModelName).toEqual(editedModelName);
		})

		it('Save Model', async () => {
			const saveModelEnabled = await page.evaluate(async () => {
				return document.getElementById("save-model").disabled;
			});

			expect(saveModelEnabled).toEqual(false);

			await page.evaluate(async () => {
				return document.getElementById("save-model").click();
			});

			await wait4selector(page, 'table.scidash-table', { visible: true , timeout : 5000 })
		})

		it('Test Model Present in Models Page', async () => {
			await page.waitFor(5000);
			const models = await page.evaluate(async () => {
				return document.querySelectorAll(".scidash-table tr").length;
			});

			expect(models).toBeGreaterThanOrEqual(tableModelLength);
			
			const modelName = await page.evaluate(async () => {
				return document.querySelectorAll(".scidash-table tr td")[0].innerText;
			});

			expect(modelName).toEqual(editedModelName);
			
			const modelClass = await page.evaluate(async () => {
				return document.querySelectorAll(".scidash-table tr td")[1].innerText;
			});
			
			expect(modelClass).toEqual(editedModelClass);
			
			const modelTag = await page.evaluate(async () => {
				return document.querySelectorAll(".chips span")[1].innerText;
			});

			expect(modelTag).toEqual(editedModelTag);
		})
	})
})