import { wait4selector, click } from './utils';

export const testOpenDialog = (page, name, className) => {
	it('Test1 Info Modal Opened', async () => {
		await page.evaluate(async (name) => {
			document.querySelector("#"+name+" button").click()
		}, name);
		await wait4selector(page, 'div.centered-modal', { visible: true, timeout : 5000 })

		await page.waitFor(1000);
		
		await page.waitForFunction('document.getElementById("name").innerText.endsWith("'+name+'")');
		await page.waitForFunction('document.getElementById("class").innerText.endsWith("'+className+'")');
		await page.waitForFunction('document.getElementById("owner").innerText.startsWith("Owner")');
		await page.waitForFunction('document.getElementById("timestamp").innerText.startsWith("Timestamp")');
		await page.waitForFunction('document.getElementById("tags").innerText.startsWith("Tags")');

		await page.evaluate(async () => {
			document.querySelector(".centered-modal button").click()
		});
		await wait4selector(page, 'div.centered-modal', { hidden: true, timeout : 5000 })
		
		await page.waitFor(1000);
	});
}

export const modelOpenDialog = (page, name, className, modelURL) => {
	it('TestModel1 Info Modal Opened', async () => {
		await page.evaluate(async (name) => {
			document.querySelector("#"+name+" button").click()
		}, name);
		await wait4selector(page, 'div.centered-modal', { visible: true, timeout : 5000 })

		await page.waitFor(1000);
		
		await page.waitForFunction('document.getElementById("name").innerText.endsWith("'+name+'")');
		await page.waitForFunction('document.getElementById("class").innerText.endsWith("'+className+'")');
		await page.waitForFunction('document.getElementById("owner").innerText.startsWith("Owner")');
		await page.waitForFunction('document.getElementsByClassName("model-url")[0].innerText.endsWith("'+modelURL+'")');
		await page.waitForFunction('document.getElementById("timestamp").innerText.startsWith("Timestamp")');
		await page.waitForFunction('document.getElementById("tags").innerText.startsWith("Tags")');

		await page.evaluate(async () => {
			document.querySelector(".centered-modal button").click()
		});
		await wait4selector(page, 'div.centered-modal', { hidden: true, timeout : 5000 })
		
		await page.waitFor(1000);
	});
}

export const addTestsAndModels = (page, test) => {
	it('Add Tests and Models', async () => {
		await page.evaluate(async (testName) => {
			document.querySelectorAll("#"+testName+" button")[1].click()
		}, test);
		await wait4selector(page, '#'+test, { hidden: true, timeout : 5000 })
	})
}