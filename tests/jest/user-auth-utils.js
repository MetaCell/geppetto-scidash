import { wait4selector} from './utils';

export const makeUserID = (length) => {
	var result = '';
	var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	var charactersLength = characters.length;
	for ( var i = 0; i < length; i++ ) {
		result += characters.charAt(Math.floor(Math.random() * charactersLength));
	}
	return "user_" + result;
}

export const signUpTests = (page, newUserID, newUserEmail, newUserPassword) => {
	it('Test Validation Fields', async () => {
		await page.waitFor(2000);
		await page.evaluate(async () => {
			document.querySelector(".registration-container button").click()
		});
		await page.waitFor(2000);
		await page.waitForFunction('document.querySelector("small.error").innerText.startsWith("This field is required.")');			
	})

	it('Create Username', async () => {
		await wait4selector(page, '#id_username', { visible: true, timeout : 30000 })
		await page.evaluate(async (newUser) => {
			document.getElementById("id_username").value = newUser;
		}, newUserID);
		const testUserName = await page.evaluate(async (newUser) => {
			return document.getElementById("id_username").value;
		});
		expect(testUserName).toEqual(newUserID);
	})

	it('Email Field Visible', async () => {
		await wait4selector(page, '#id_email', { visible: true, timeout : 30000 })
	})

	it('Add Email', async () => {
		await page.evaluate(async (newUserEmail) => {
			document.getElementById("id_email").value = newUserEmail;
		}, newUserEmail);
		const testUserEmail = await page.evaluate(async (newUser) => {
			return document.getElementById("id_email").value;
		});
		expect(testUserEmail).toEqual(newUserEmail);
	})

	it('Password Field Visible', async () => {
		await wait4selector(page, 'input#id_password1', { visible: true, timeout : 30000 })
	})

	it('Create Password', async () => {
		await page.evaluate(async (newUserPassword) => {
			document.getElementById("id_password1").value = newUserPassword;
		}, newUserPassword);
		const testUserPassword = await page.evaluate(async () => {
			return document.getElementById("id_password1").value;
		});
		expect(testUserPassword).toEqual(newUserPassword);
	})

	it('Confirm Password Field Visible', async () => {
		await wait4selector(page, 'input#id_password2', { visible: true, timeout : 30000 })
	})

	it('Confirm Password', async () => {
		await page.evaluate(async (newUserPassword) => {
			document.getElementById("id_password2").value = newUserPassword;
		}, newUserPassword);
		const testUserPassword = await page.evaluate(async () => {
			return document.getElementById("id_password2").value;
		});
		expect(testUserPassword).toEqual(newUserPassword);
	})

	it('Submit Registration and Test Logged In Button Appears', async () => {
		await page.evaluate(async () => {
			document.querySelector(".registration-container button").click()
		});
		await wait4selector(page, 'div.user-button', { visible: true, timeout : 30000 })
	})
}

export const loginTests = (page, newUserID, newUserPassword) => {	
	it('Username Field Visible', async () => {
		await wait4selector(page, '#id_username', { visible: true, timeout : 30000 })
	})

	it('Test Validation Fields', async () => {
		await page.evaluate(async () => {
			document.querySelector(".login-container button").click()
		});
		await page.waitForFunction('document.querySelector("small.error").innerText.startsWith("This field is required.")');			
	})

	it('Enter Username', async () => {
		await page.evaluate(async (newUser) => {
			document.getElementById("id_username").value = newUser;
		}, newUserID);
		const testUserName = await page.evaluate(async (newUser) => {
			return document.getElementById("id_username").value;
		});
		expect(testUserName).toEqual(newUserID);
	})

	it('Password Field Visible', async () => {
		await wait4selector(page, 'input#id_password', { visible: true, timeout : 30000 })
	})

	it('Enter Password', async () => {
		await page.evaluate(async (newUserPassword) => {
			document.getElementById("id_password").value = newUserPassword;
		}, newUserPassword);
		const testUserPassword = await page.evaluate(async () => {
			return document.getElementById("id_password").value;
		});
		expect(testUserPassword).toEqual(newUserPassword);
	})

	it('Submit User Credentials', async () => {
		await page.evaluate(async () => {
			document.querySelector(".login-container button").click()
		});
		await wait4selector(page, 'div.user-button', { visible: true, timeout : 60000 })
	})
}

export const logoutTests = (page) => {
	it('Logged In Button Visible', async () => {
		await wait4selector(page, '#user-button', { visible: true, timeout : 60000 })
	})

	it('Open User Info Panel', async () => {
		await page.evaluate(async () => {
			var button = document.querySelector("#user-button");
			if(button != null){
				button.click();
			}
		});
		await wait4selector(page, '#logout-button', { visible: true, timeout : 30000 });
	})

	it('Click Logout Button', async () => {
		await page.evaluate(async () => {
			var button = document.querySelector("#logout-button");
			if(button != null){
				button.click();
			}
		});
	})

	it('Login Button Visible', async () => {
		await wait4selector(page, 'div.login-button', { visible: true, timeout : 30000 })
	})
}

export const resetPasswordTests = (page, newUserEmail) => {
	it('Logged In Button Visible', async () => {
		await wait4selector(page, '#user-button', { visible: true, timeout : 30000 })
	})

	it('Open User Info Panel', async () => {
		await page.evaluate(async () => {
			document.querySelector("#user-button").click()
		});
		await wait4selector(page, '#reset-password', { visible: true, timeout : 30000 });
	})

	it('Click Reset Password Button', async () => {
		await page.evaluate(async () => {
			document.querySelector("#reset-password").click()
		});
	})

	it('Reset Pasword Form Visible', async () => {
		await wait4selector(page, 'div.password-reset-container', { visible: true, timeout : 30000 });
	})

	it('Test Validation Fields', async () => {
		await page.evaluate(async () => {
			document.querySelector(".password-reset-container button").click()
		});
		await page.waitForFunction('document.querySelector("small.error").innerText.startsWith("This field is required.")');			
	})

	it('Email Field Visible', async () => {
		await wait4selector(page, '#id_email', { visible: true, timeout : 30000 })
	})

	it('Add Email', async () => {
		await page.evaluate(async (newUserEmail) => {
			document.getElementById("id_email").value = newUserEmail;
		}, newUserEmail);
		const testUserEmail = await page.evaluate(async (newUser) => {
			return document.getElementById("id_email").value;
		});
		expect(testUserEmail).toEqual(newUserEmail);
	})

	it('Submit User Credentials', async () => {
		await page.waitFor(1000);
		await page.evaluate(async () => {
			document.querySelector(".password-reset-container button").click()
		});
		await wait4selector(page, 'div.password-reset-container', { visible: true, timeout : 30000 })
	})
}