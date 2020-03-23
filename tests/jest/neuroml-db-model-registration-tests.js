import { wait4selector} from './utils';
import { makeUserID, signUpTests, logoutTests } from './user-auth-utils';
import { modelCreation, saveModel, cancelModelCreation} from './model-utils';

const scidashURL = process.env.url ||  'http://localhost:8000';

// Variables used for creation of new user
let newUserID = makeUserID(6);
const newUserEmail = "test_user@gmail.com";
const newUserPassword = "Password_2020";

// Variables used for Model registration form
const newModelName = "GranuleModel";
const newModelURL = "https://neuroml-db.org/model_info?model_id=NMLCL000002";
const newModelTag ="auto-testing";
const newModelClass = "ChannelModel";

const variable1 = "Granule_98_3D.biophys.membraneProperties.Gran_CaHVA_98_soma_group.Gran_CaHVA_98.m.forwardRate.r";
const variable2= "Granule_98_3D.biophys.membraneProperties.Gran_CaHVA_98_soma_group.Gran_CaHVA_98.m.reverseRate.r";

// Amount of models in models page
var tableModelLength = 2;

/**
 * Neuroml DB Model Registration Tests
 */
describe('Scidash Neuroml DB Model Registration Tests', () => {
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
			await page.evaluate( () => {
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

	describe('Test Model Parameters Pages', () => {
		it('Model Parameters Dialog Open', async () => {
			await page.evaluate( () => {
				return document.getElementById("open-model-parameters").click();
			});

			await wait4selector(page, 'div.centered-modal', { visible: true, timeout: 20000 })
		})

		// Click Sign-Up button and wait for registration form to show up
		it('Parameters Drop Down 16 Pages Available', async () => {
			let dropdown = await page.evaluate( () => {
				return document.querySelectorAll("select option").length;
			});

			expect(dropdown).toEqual(16);
		})

		it('Model Parameters Dialog Closed', async () => {
			await page.evaluate( () => {
				let buttons = document.querySelectorAll(".centered-modal button");
				return document.querySelectorAll(".centered-modal button")[buttons.length - 1].click();
			});

			await wait4selector(page, 'div.centered-modal', { hidden: true, timeout: 20000 })
		})

	})

	// Save New Model
	describe('Test New Model Creation', () => {
		saveModel(page, newModelName, newModelClass, newModelTag, tableModelLength);
	})

	// Tests Cancel Model Creation
	describe('Cancel Model Creation', () => {
		cancelModelCreation(page);
	})
	
	// User Logout
	describe('User Logout', () => {
		logoutTests(page);
	})
})