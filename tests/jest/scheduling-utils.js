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

export const testScoreDetails = (page, testName, testClassName, modelClassName, modelURL) => {
	it('Test Score Details Correctly Populated', async () => {		
		await page.waitForFunction('document.getElementById("test-score").innerText.endsWith("'+testName+'")');
		await page.waitForFunction('document.getElementById("test-class").innerText.endsWith("'+testClassName+'")');
		await page.waitForFunction('document.getElementById("normalized-score").innerText.startsWith("Normalized score")');
		await page.waitForFunction('document.getElementById("test-suite").innerText.startsWith("Test suite")');
		await page.waitForFunction('document.getElementById("build-info").innerText.startsWith("Build info")');
		await page.waitForFunction('document.getElementById("hostname").innerText.startsWith("Hostname")');
		await page.waitForFunction('document.getElementById("errors").innerText.startsWith("Errors")');
		await page.waitForFunction('document.getElementById("timestamp").innerText.startsWith("Timestamp")');
		
		await page.waitForFunction('document.getElementById("model-class-name").innerText.endsWith("'+modelClassName+'")');
		await page.waitForFunction('document.getElementById("model-url").innerText.endsWith("'+modelURL+'")');
		await page.waitForFunction('document.getElementById("model-class-source").innerText.startsWith("Class source")');
		await page.waitForFunction('document.getElementById("model-class-capabilities").innerText.startsWith("Class capabilities")');
	});
}

export const testModelDetails = (page, modelClassName, modelURL) => {
	it('Test Score Model Details Correctly Populated', async () => {		
		await page.waitForFunction('document.getElementById("model-class-name").innerText.endsWith("'+modelClassName+'")');
		await page.waitForFunction('document.getElementById("model-url").innerText.endsWith("'+modelURL+'")');
		await page.waitForFunction('document.getElementById("model-class-source").innerText.startsWith("Class source")');
		await page.waitForFunction('document.getElementById("model-class-capabilities").innerText.startsWith("Class capabilities")');
	});
}

export const testSuiteScore = (page,  testName, testClassName, testModelName, modelClassName, modelURL) => {
	it('Sidebar Component Opened, Scheduling Option Present', async () => {
		await click(page, 'button#hamMenu');
		await wait4selector(page, 'span#hamMenuSuites', { visible: true })
	})

	it('Scheduling Page Opened', async () => {
		await click(page, '#hamMenuSuites');
		await page.waitForFunction('document.getElementById("scidash-logo").innerText.startsWith("Suite scores")');
	})
	
	it('Test Suite Matrix Present and Populated', async () => {
		await page.waitFor(2000);
		await page.evaluate(async () => {
			document.querySelectorAll(".scidash-table tr td")[1].querySelector("a").click();
		});
		await wait4selector(page, 'div.centered-modal', { visible: true, timeout : 5000 })
		await page.waitForFunction('document.getElementsByClassName("centered-modal")[0].innerText.includes("'+testClassName+'")');
		await page.waitForFunction('document.getElementsByClassName("centered-modal")[0].innerText.includes("'+modelClassName+'")');
	})
	
	it('Matrix Details Expanded and Populated', async () => {
		await page.evaluate(async () => {
			document.querySelectorAll("table")[1].querySelectorAll("td a")[0].click()
		});
		
		await wait4selector(page, '#test-details-dialog', { visible: true, timeout : 5000})

		await page.waitFor(1000);
	})
	
	testScoreDetails(page, testName, testClassName, modelClassName, modelURL);
	
	it('Test Suite Matrix Closed', async () => {
		await page.evaluate(async () => {
			document.querySelectorAll(".centered-modal button")[1].click();
		});
		await wait4selector(page, 'div.centered-modal', { hidden: true, timeout : 5000 })
		
		await page.waitFor(1000);
	})
}