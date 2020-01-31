import { wait4selector, click } from './utils';

export const testOpenDialog = (page, name, className) => {
	it('TestModel1 Info Modal Opened', async () => {
		await click(page, '#TestModel1');
		await page.evaluate(async () => {
			document.querySelector("#TestModel1 button").click()
		});
		await wait4selector(page, 'div.centered-modal', { visible: true, timeout : 5000 })

		await page.waitForFunction('document.getElementById("name").innerText.endsWith("'+newModelName+'")');
		await page.waitForFunction('document.getElementById("class").innerText.endsWith("'+newModelClass+'")');
		await page.waitForFunction('document.getElementById("owner").innerText.startsWith("Owner")');
		await page.waitForFunction('document.getElementById("source").innerText.startsWith("Source")');
		await page.waitForFunction('document.getElementById("timestamp").innerText.startsWith("Timestamp")');
		await page.waitForFunction('document.getElementById("tags").innerText.startsWith("Tags")');

		await page.evaluate(async () => {
			document.querySelector(".centered-modal button").click()
		});
		await wait4selector(page, 'div.centered-modal', { hidden: true, timeout : 5000 })
	});
}

export const addTestsAndModels = (page) => {
	it('Add Tests and Models', async () => {
		await page.waitFor(150000);

		await page.evaluate(async () => {
			document.querySelectorAll("#TestModel1 button")[1].click()
		});

		await page.evaluate(async () => {
			document.querySelectorAll("#TestModel2 button")[1].click()
		});

		await page.evaluate(async () => {
			document.querySelectorAll("#Test1 button")[1].click()
		});

//		await page.evaluate(async () => {
//			document.querySelectorAll("#Test1 button")[1].click()
//		});
	})
}