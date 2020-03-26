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
	await page.evaluate( () => {
		var evt = new KeyboardEvent('keydown', {'keyCode':27, 'which':27});
		document.dispatchEvent (evt);
	});
}

export const testFilters = (page, filterWord, filterPosition, resultPosition, tableModelLength) => {
	it('Filter By ' + filterWord, async () => {
		await page.evaluate( (name, position) => {
			let input =  document.querySelectorAll(".scidash-materialui-field input")[position]
			let lastValue = input.value;
			input.value = name;
			let event = new Event('input', { bubbles: true });
			event.simulated = true;
			let tracker = input._valueTracker;
			if (tracker) {
				tracker.setValue(lastValue);
			}
			input.dispatchEvent(event);
		}, filterWord, filterPosition);
		await page.waitFor(1000);
		await wait4selector(page, 'div.autosuggest', { visible: true , timeout : 5000 });
	})

	it('One Result for Filter '+ filterWord, async () => {
		await page.evaluate( (name, position) => {document.querySelector(".autosuggest").remove();});
		await page.waitFor(500);
		const models = await page.evaluate( () => {
			return document.querySelectorAll(".scidash-table tr").length;
		});

		expect(models).toBeGreaterThanOrEqual(tableModelLength-1);

		const modelName = await page.evaluate( (position) => {
			return document.querySelectorAll(".scidash-table tr td")[position].innerText;
		}, resultPosition);

		expect(modelName.replace(/ *\([^)]*\) */g, "")).toEqual(filterWord);
	})

	it('Reset Name Filters', async () => {
		await page.evaluate( (pos) => {
			let input =  document.querySelectorAll(".scidash-materialui-field input")[pos]
			let lastValue = input.value;
			input.value = "";
			let event = new Event('input', { bubbles: true });
			event.simulated = true;
			let tracker = input._valueTracker;
			if (tracker) {
				tracker.setValue(lastValue);
			}
			input.dispatchEvent(event);
		}, filterPosition);

		await page.waitFor(500);

		await page.evaluate( (name, position) => {document.querySelector(".autosuggest").remove();});

		const models = await page.evaluate( () => {
			return document.querySelectorAll(".scidash-table tr").length;
		});

		expect(models).toBeGreaterThanOrEqual(tableModelLength);
	})
}