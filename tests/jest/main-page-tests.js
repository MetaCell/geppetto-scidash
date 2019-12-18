const puppeteer = require('puppeteer');
const { TimeoutError } = require('puppeteer/Errors');

import { wait4selector, click } from './utils';

const scidashURL = process.env.url ||  'http://localhost:8000';
const testScoresURL = scidashURL + '/?timestamp_to=2018-07-12&timestamp_from=2018-05-05&status=c'; 

/**
 * Tests Main Page
 */
describe('Scidash Main Page Tests', () => {
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

		it('Sidebar Toggle Button Visible', async () => {
			await wait4selector(page, 'button#hamMenu', { visible: true, timeout : 10000 })
		})

		it('Login Button Visible', async () => {
			await wait4selector(page, 'div.loginButton', { visible: true, timeout : 10000 })
		})

		it('Sign Up Button Visible', async () => {
			await wait4selector(page, 'div.signUpButton', { visible: true, timeout : 10000 })
		})

		it('Main Table Visible', async () => {
			await wait4selector(page, 'div.datepicker-wrapper', { visible: true, timeout : 10000 })
		})

		it('Date Picker Visible', async () => {
			await wait4selector(page, 'div.datepicker-wrapper', { visible: true, timeout : 10000 })
		})

		it('Scidash Footer Visible', async () => {
			await wait4selector(page, 'div#footer-scidash', { visible: true })
		})
	})

	//Tests components in landing page are present
	describe('Test Sidebar Component', () => {
		it('Sidebar Component Opened, Tests Scores Label Present', async () => {
			await click(page, 'button#hamMenu');
			await wait4selector(page, 'span#hamMenuScores', { visible: true })
		})

		it('Tests Suites Label Present', async () => {
			await wait4selector(page, 'span#hamMenuScores', { visible: true })
		})

		it('Tests Suites Label Present', async () => {
			await wait4selector(page, 'span#hamMenuSuites', { visible: true })
		})

		it('Settings Label Present', async () => {
			await wait4selector(page, 'span#hamMenuSettings', { visible: true })
		})

		it('Sidebar Component Closed', async () => {
			await page.waitFor(3000);
			await click(page, 'span#hamMenuScores');
			await wait4selector(page, 'span#hamMenuScores', { visible: false })
		})
	})
})

describe('Scidash Test Scores and Suites View', () => {
	beforeAll(async () => {
		jest.setTimeout(60000); 
		await page.goto(testScoresURL);
	});

	//Tests components in landing page are present
	describe('Test Landing Page Components', () => {
		it('Loading spinner goes away', async () => {
			await wait4selector(page, 'i.fa-cogs', { hidden: true, timeout : 120000 })
		})

		it('Scidash Logo Shows Up', async () => {
			await wait4selector(page, 'div#scidash-logo', { visible: true, timeout : 20000 })
		})

		it('Next Page Button Shows Up', async () => {
			await wait4selector(page, 'button#nextPage', { visible: true, timeout : 20000 })
		})

		it('"From" Date Correctly set in Date Picker', async () => {
			const fromDate = await page.evaluate(async () => document.querySelector("#fromDatePicker input").value);
			expect(fromDate).toEqual("2018-05-05");
		})

		it('"To" Date Correctly set in Date Picker', async () => {
			const toDate = await page.evaluate(async () => document.querySelector("#toDatePicker input").value);
			expect(toDate).toEqual("2018-07-12");
		})		
	})

	//Tests components in landing page are present
	describe('Test Scores View', () => {
		it('10 Tests Scores Present in Main Page', async () => {
			const mainPageTestScoresRows = await page.evaluate(async () => document.querySelectorAll(".griddle-row").length);
			expect(mainPageTestScoresRows).toEqual(10);
		})

		it('RestingPotentialTest Score In Page Present', async () => {
			const restingPotentialTest = await page.evaluate(async (name, score) => {
				var rows = document.querySelectorAll(".griddle-row");
				for(var r in rows){
					if(name == document.querySelectorAll(".griddle-row")[r].querySelector("div").innerText){
						if(score == document.querySelectorAll(".griddle-row")[r].querySelector("a").innerText){
							return true;
						}
					}
				}
				return false;
			}, "RestingPotentialTest","-0.307");
			expect(restingPotentialTest).toEqual(true);
		});

		it('InjectedCurrentAPWidthTest Score In Page Present', async () => {
			const injectedCurrentAPWidthTest = await page.evaluate(async (name, score) => {
				var rows = document.querySelectorAll(".griddle-row");
				for(var r in rows){
					if(name == document.querySelectorAll(".griddle-row")[r].querySelector("div").innerText){
						if(score == document.querySelectorAll(".griddle-row")[r].querySelector("a").innerText){
							return true;
						}
					}
				}
				return false;
			}, "InjectedCurrentAPWidthTest","-1.019");
			expect(injectedCurrentAPWidthTest).toEqual(true);
		});

		it('InputResistanceTest Score In Page Present', async () => {
			const inputResistanceTest = await page.evaluate(async (name, score) => {
				var rows = document.querySelectorAll(".griddle-row");
				for(var r in rows){
					if(name == document.querySelectorAll(".griddle-row")[r].querySelector("div").innerText){
						if(score == document.querySelectorAll(".griddle-row")[r].querySelector("a").innerText){
							return true;
						}
					}
				}
				return false;
			}, "InputResistanceTest","-0.493");
			expect(inputResistanceTest).toEqual(true);
		})

		it('Next Page in Test Scores Loaded', async () => {
			await page.waitFor(2000);
			await click(page, 'button#nextPage');
			await wait4selector(page, 'button#previousPage', { visible: true })
		})

		it('10 Tests Scores Present in Second Page', async () => {
			const mainPageTestScoresRows = await page.evaluate(async () => document.querySelectorAll(".griddle-row").length);
			expect(mainPageTestScoresRows).toEqual(10);
		})
		
		it('Previous Page in Test Scores Loaded', async () => {
			await page.waitFor(2000);
			await click(page, 'button#previousPage');
			await wait4selector(page, 'button#nextPage', { visible: true })
		})
		
		it('Select "openworm" Owner in Filter Column', async () => {
			await page.evaluate(async () => {
				var el = document.querySelectorAll(".scidash-materialui-field input")[4];
				el.value='openworm'
				return el.dispatchEvent(new Event('input', { bubbles: true }));
			});
			//give it some time before continue testing stack viewer
			await page.waitFor(5000);
			const mainPageTestScoresRows = await page.evaluate(async () => document.querySelectorAll(".griddle-row").length);
			expect(mainPageTestScoresRows).toEqual(5);
		})
	})

	//Tests components in landing page are present
	describe('Test Suites Scores View', () => {
		it('Sidebar Component Opened, "Suites scores" Present', async () => {
			await click(page, 'button#hamMenu');
			await wait4selector(page, 'span#hamMenuSuites', { visible: true })
		})

		it('"Suite scores" View Opened', async () => {
			await click(page, 'span#hamMenuSuites');
			await page.waitForFunction('document.getElementById("scidash-logo").innerText.startsWith("Suite scores")');
		})

		it('1 Suite  Present in Main Page', async () => {
			await page.waitFor(5000);
			const mainPageTestScoresRows = await page.evaluate(async () => document.querySelectorAll(".griddle-row .timestamp-cell").length);
			expect(mainPageTestScoresRows).toEqual(1);
		})
		
		it('Suite_231043766474 Suite Score In Page Present', async () => {
			const inputResistanceTest = await page.evaluate(async (name, score) => {
				var rows = document.querySelectorAll(".griddle-row").length;
				for(var r =0; r < rows; r++){
					if(name == document.querySelectorAll(".griddle-row")[r].querySelector("div").innerText){
						if(score == document.querySelectorAll(".griddle-row")[r].querySelectorAll("a")[1].innerText){
							return true;
						}
					}
				}
				return false;
			}, "Suite_231043766474","0.55");
			expect(inputResistanceTest).toEqual(true);
		})
	})
})