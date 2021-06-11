import { wait4selector, click} from './utils';
import { makeUserID, signUpTests, loginTests, logoutTests, resetPasswordTests } from './user-auth-utils';

const scidashURL = process.env.url ||  'http://localhost:8000';

/** Variables used for creation of new user */
let newUserID = makeUserID(6);
const newUserEmail = newUserID + "@test.com";
const newUserPassword = "Password_2020";

/**
 * User Auth Tests
 */
describe('Scidash User Authorization Tests', () => {
	beforeAll(async () => {
		jest.setTimeout(60000);
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

		it('Login Button Visible', async () => {
			await wait4selector(page, 'a.loginButton', { visible: true, timeout : 30000 })
		})
	})

	// Tests User Registration/Sign-Up Works using the Sign-Up Button
	describe('Test Signup Button Functionality', () => {
		// Precondition: User is logout
		it('Login Button Visible', async () => {
			const userLogin = await page.evaluate(() => {
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
			await wait4selector(page, 'a.loginButton', { visible: true, timeout : 30000 })
		})
		
		  // Precondition: User is logout
  it('Login Button Visible', async () => {
   await wait4selector(page, 'a.loginButton', { visible: true, timeout : 30000 })
  })

  it('Open Sign Up Page', async () => {
   await page.evaluate( () => {
    document.querySelector(".loginButton").click()
   });
   await wait4selector(page, 'div.login-container', { visible: true, timeout : 30000 });
  })

  // Click Sign-Up button and wait for registration form to show up
  it('Open Sign Up Page', async () => {
   await page.evaluate( () => {
     document.getElementsByName("_signup")[0].click()
   });
   await wait4selector(page, 'div.registration-container', { visible: true, timeout : 30000 });
  })

		// Perform registration form tests
		signUpTests(page, newUserID, newUserEmail, newUserPassword);

	})

	// Tests User Logout Functionality
	describe('Logout After User Registration', () => {
		// Precondition: User is login. Tests logout functionality works
		logoutTests(page)		
	})

	// Test Login Functionality
	describe('Test Log In Button ', () => {
		// Precondition: User is Logout. Test existence of login button
		it('Login Button Visible', async () => {
			await wait4selector(page, 'a.loginButton', { visible: true, timeout : 30000 })
		})

		// Click on Login button and wait for Login form.
		it('Open Login Page', async () => {
			await page.evaluate( () => {
				document.querySelector(".loginButton").click()
			});
			await wait4selector(page, 'div.login-container', { visible: true, timeout : 30000 });
		})

		// Perform User Login form tests
		loginTests(page, newUserID, newUserPassword);
	})

	// Tests Password Reset Functionality
	describe('Reset Password', () => {
		// Precondition: User is login. Perform password reset tests
		resetPasswordTests(page, newUserEmail)		
	})
})