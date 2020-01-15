const puppeteer = require('puppeteer');
const { TimeoutError } = require('puppeteer/Errors');

import { wait4selector, click , makeUserID, signUpTests, loginTests, logoutTests, resetPasswordTests} from './utils';

const scidashURL = process.env.url ||  'http://localhost:8000';
const testScoresURL = scidashURL + '/?timestamp_to=2018-07-12&timestamp_from=2018-05-05&status=c'; 

/** Variables used for creation of new user */
let newUserID = makeUserID(6);
const newUserEmail = "test_user@gmail.com";
const newUserPassword = "Password_2020";

const newModelName = "Test Model";
const newModelURL = "https://github.com/ddelpiano/neuronunit/blob/dev/neuronunit/models/NeuroML2/LEMS_2007One.xm";
const newModelTag ="auto-testing";
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
	describe('Test Model Registration', () => {
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
		
		it('Model Name Field Present in Form', async () => {
			await wait4selector(page, 'input#model-name', { visible: true , timeout : 5000 })
		})

		it('Enter Model Name', async () => {
			await page.evaluate(async (newModel) => {
				document.getElementById("model-name").value = newModel;
			}, newModelName);
			const testModelName = await page.evaluate(async () => {
				return document.getElementById("model-name").value;
			});
			expect(testModelName).toEqual(newModelName);
		})
		
		it('Source URL Field Present in Form', async () => {
			await wait4selector(page, 'input#source-url', { visible: true , timeout : 5000 })
		})

		it('Enter Source URL', async () => {
			await page.evaluate(async (newModelURL) => {
				document.getElementById("source-url").value = newModelURL;
			}, newModelURL);
			const testModelURL = await page.evaluate(async () => {
				return document.getElementById("source-url").value;
			});
			expect(testModelURL).toEqual(newModelURL);
		})
		
		it('Model URL Validated', async () => {
			await wait4selector(page, 'span.icons', { visible: true , timeout : 5000 });
			await page.waitFor(30000);
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
				// The down arrow elment is the only SVG element un the select
				var elm = document.querySelector('#modelFormSelectClass button')
				// Dispatch the event (reusable)
				elm.dispatchEvent(evt);
			});
			await wait4selector(page, '#ReducedModel', { visible: true , timeout : 35000 })
		})
		
		it('Select "ReducedModel" Class', async () => {
			await page.evaluate(async () => {
				var evt = document.createEvent('MouseEvent');
				evt.initEvent('mouseup', true, false);
				// The down arrow elment is the only SVG element un the select
				var elm = document.querySelector('#ReducedModel div')
				// Dispatch the event (reusable)
				elm.dispatchEvent(evt);
			});
			await page.waitForFunction('document.getElementById("modelFormSelectClass").innerText.startsWith("ReducedModel")');
		})
		
		it('Add New Tag Present in Form', async () => {
			await wait4selector(page, 'input#new-tag', { visible: true , timeout : 5000 })
		})

		it('Enter New Tag', async () => {
			await page.evaluate(async (newModelTag) => {
				document.getElementById("new-tag").value = newModelTag;
			}, newModelTag);
			const testModelTag = await page.evaluate(async () => {
				return document.getElementById("new-tag").value;
			});
			expect(testModelTag).toEqual(newModelTag);
		})
	})
})