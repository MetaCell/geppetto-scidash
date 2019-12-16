const puppeteer = require('puppeteer');
const { TimeoutError } = require('puppeteer/Errors');

import { wait4selector, click } from './utils';

const scidashURL = process.env.url ||  'http://localhost:8000';

/**
 * Tests Main Page
 */
describe('Scidash Main Page Tests', () => {
	beforeAll(async () => {
		jest.setTimeout(60000); 
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
			await wait4selector(page, 'div#scidash-logo', { visible: true })
		})
		
		it('Sidebar Toggle Button Visible', async () => {
			await wait4selector(page, 'button#hamMenu', { visible: true })
		})
		
		it('Login Button Visible', async () => {
			await wait4selector(page, 'div.loginButton', { visible: true })
		})
		
		it('Sign Up Button Visible', async () => {
			await wait4selector(page, 'div.signUpButton', { visible: true })
		})
		
		it('Main Table Visible', async () => {
			await wait4selector(page, 'div.datepicker-wrapper', { visible: true })
		})
		
		it('Date Picker Visible', async () => {
			await wait4selector(page, 'div.datepicker-wrapper', { visible: true })
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
			await click(page, 'span#hamMenuScores');
			await wait4selector(page, 'span#hamMenuScores', { visible: false })
		})
	})
	
	describe('Test Scores Tests', () => {
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
			await click(page, 'span#hamMenuScores');
			await wait4selector(page, 'span#hamMenuScores', { visible: false })
		})
	})
})