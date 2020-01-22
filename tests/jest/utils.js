const { TimeoutError } = require('puppeteer/Errors');


export const wait4selector = async (page, selector, settings = {}) => {
	let success = undefined;
	const options = { timeout: 1000, ...settings }
	try {
		await page.waitForSelector(selector, options);
		success = true
	} catch (error){
		let behaviour = "to exists."
			if (options.visible || options.hidden) {
				behaviour = options.visible ? "to be visible." : "to disappear."
			}
	}
	expect(success).toBeDefined()
}


export const click = async (page, selector) => {
	await wait4selector(page, selector, { visible: true });
	let success = undefined;
	try {
		await page.click(selector);
		success = true
	} catch (error){
		// console.log(`ERROR clicking on selector   --->   ${selector} failed.`)
	}
	expect(success).toBeDefined()
}

export const closeModalWindow = async (page) => {
	await page.evaluate(async () => {
		var evt = new KeyboardEvent('keydown', {'keyCode':27, 'which':27});
		document.dispatchEvent (evt);
	});
}

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
		await page.waitFor(1000);
		await page.evaluate(async () => {
			document.querySelector(".registration-container button").click()
		});
		await page.waitForFunction('document.querySelector("small.error").innerText.startsWith("This field is required.")');			
	})

	it('Username Field Visible', async () => {
		await wait4selector(page, '#id_username', { visible: true, timeout : 30000 })
	})

	it('Create Username', async () => {
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

export const testModelFilters = (page, filterWord, filterPosition, resultPosition, tableModelLength) => {
	it('Filter By ' + filterWord, async () => {
		await page.evaluate(async (name, position) => {
			var elm = document.querySelectorAll(".scidash-materialui-field input")[position]
			var ev = new Event('input', { bubbles: true});
			ev.simulated = true;
			elm.value = name;
			elm.dispatchEvent(ev);
		}, filterWord, filterPosition);
		await page.waitFor(1000);
		await wait4selector(page, 'div.autosuggest', { visible: true , timeout : 5000 });
	})

	it('One Result for Filter '+ filterWord, async () => {
		await page.evaluate(async (name, position) => {document.querySelector(".autosuggest").remove();});
		await page.waitFor(500);
		const models = await page.evaluate(async () => {
			return document.querySelectorAll(".scidash-table tr").length;
		});

		expect(models).toBeGreaterThanOrEqual(tableModelLength-1);

		const modelName = await page.evaluate(async (position) => {
			return document.querySelectorAll(".scidash-table tr td")[position].innerText;
		}, resultPosition);

		expect(modelName).toEqual(filterWord);
	})

	it('Reset Name Filters', async () => {
		await page.evaluate(async (pos) => {
			var elm = document.querySelectorAll(".scidash-materialui-field input")[pos]
			var ev = new Event('input', { bubbles: true});
			ev.simulated = true;
			elm.value = "";
			elm.dispatchEvent(ev);
		}, filterPosition);

		await page.waitFor(500);

		await page.evaluate(async (name, position) => {document.querySelector(".autosuggest").remove();});

		const models = await page.evaluate(async () => {
			return document.querySelectorAll(".scidash-table tr").length;
		});

		expect(models).toBeGreaterThanOrEqual(tableModelLength);
	})
}