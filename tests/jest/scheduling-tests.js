import { wait4selector, click, testFilters} from './utils';
import { makeUserID, signUpTests } from './user-auth-utils';
import { modelCreation, saveModel, editModel, cloneModel} from './model-utils';
import { newTestCreation, cloneTestCreation, editTest1} from './tests-creation-utils';
import { testOpenDialog, modelOpenDialog, addTestsAndModels, testScoreDetails, testModelDetails, testSuiteScore } from './scheduling-utils';

const scidashURL = process.env.url ||  'http://localhost:8000';

// Variables used for creation of new user
let newUserID = makeUserID(6);
const newUserEmail = "test_user@gmail.com";
const newUserPassword = "Password_2020";

//Variables used for Model registration form
const newModelName = "TestModel1";
const editedModelName = "TestModel2";
const newModelURL = "https://raw.githubusercontent.com/ddelpiano/neuronunit/dev/neuronunit/models/NeuroML2/LEMS_2007One.xml";
const newModelTag ="auto-testing";
const editedModelTag = "test-edited";
const newModelClass = "ReducedModel";
const editedModelClass = "LEMSModel";

const variable1 = "net1.RS_pop[0].u";
const variable2= "net1.RS_pop[0].v";

// Variables used for Test registration form
const newTestName = "Test1";
const editedTestName = "Test2";
const newTestTag ="testing-tag-1";
const editedTestTag = "test-edited";
const newTestClass = "InputResistanceTest (neuronunit.tests.passive)";
const editedTestClass = "IVCurvePeakTest (neuronunit.tests.channel)";
const newObservationSchema = "Mean, Standard Deviation, N";
const secondObservationSchema = "Mean, Standard Error, N";
const observationValueN = 1;
const observationValueSTD = 50;
const observationValueMean = 100;
const parameterTMax = 10; 
const observationVVolt = [10];
const observationIVolt = [1];

// Amount of models in models page
var tableModelLength = 2;

/**
 * Scheduling Tests
 */
describe('Scidash Scheduling Tests', () => {
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
			const userLogin = await page.evaluate('async () => {
				var button = document.querySelector("#userButton")
				if(button == null || button == undefined){
					return Promise.resolve(false);
				}
				return Promise.resolve(true);
			}');

			if(userLogin){
				await page.evaluate(async () => {
					var button = document.querySelector("#userButton");
					if(button != null){
						button.click();
					}
				});
				await wait4selector(page, '#logout-button', { visible: true, timeout : 30000 });

				await page.evaluate(async () => {
					var button = document.querySelector("#logout-button");
					if(button != null){
						button.click();
					}
				});
			}

			await wait4selector(page, 'a.loginButton', { visible: true, timeout : 60000 })
		})

		it('Sign Up Button Visible', async () => {
			await wait4selector(page, 'a.signUpButton', { visible: true, timeout : 30000 })
		})
	})

	// Tests User Registration/Sign-Up Works using the Sign-Up Button,
	// Needed to Generate User to continue testing
	describe('Create User Account', () => {
		// Precondition: User is logout
		it('Login Button Visible', async () => {
			await wait4selector(page, 'a.loginButton', { visible: true, timeout : 30000 })
		})

		// Click Sign-Up button and wait for registration form to show up
		it('Open Sign Up Page', async () => {
			await page.evaluate(async () => {
				document.querySelector(".signUpButton").click()
			});
			await wait4selector(page, 'div.login-container', { visible: true, timeout : 30000 });
		})

		// Perform registration form tests
		signUpTests(page, newUserID, newUserEmail, newUserPassword);

	})

	// Tests New Model Creation
	describe('Test New Model Creation', () => {
		modelCreation(page, newModelName, newModelURL, newModelClass, newModelTag, variable1, variable2);
	})

	// Save New Model
	describe('Test New Model Creation', () => {
		saveModel(page, newModelName, newModelClass, newModelTag, tableModelLength);
	})

	// Tests Cloning Model
	describe('Clone Model', () => {
		cloneModel(page, newModelName, newModelClass, tableModelLength);
	})

	// Tests Model Editing
	describe('Edit Model', () => {
		editModel(page, editedModelName, editedModelClass, editedModelTag, variable1, variable2, tableModelLength);
	})
	
	// Tests New Test Creation
	describe('New Test Registration', () => {
		newTestCreation(page, newTestName, newTestClass, newTestTag, newObservationSchema, secondObservationSchema, 
				observationValueN, observationValueSTD, observationValueMean, parameterTMax, tableModelLength);
	})

	// Clone Test
	describe('Clone Test', () => {
		cloneTestCreation(page, newTestName, newTestClass, tableModelLength);
	})

	// Tests Editing
	describe('Edit Test', () => {
		editTest1(page, editedTestName, editedTestClass, editedTestTag, observationVVolt, observationIVolt, tableModelLength)
	})
	
	// Schedule Test Simulation
	describe('Scheduling Page Tests', () => {
		it('Sidebar Component Opened, Scheduling Option Present', async () => {
			await click(page, 'button#hamMenu');
			await wait4selector(page, 'span#hamMenuScheduling', { visible: true })
		})

		it('Scheduling Page Opened', async () => {
			await click(page, '#hamMenuScheduling');
			await page.waitForFunction('document.getElementById("scidash-logo").innerText.startsWith("Scheduling")');
			await wait4selector(page, 'div.Droppable', { visible: true })
		})
		
		it(' Models and Tests Present in Scheduling Page', async () => {
			await wait4selector(page, 'div#TestModel1', { visible: true, timeout : 5000})
			await wait4selector(page, 'div#Test1', { visible: true, timeout : 5000 })
			await wait4selector(page, 'div#TestModel2', { visible: true, timeout : 5000 })
			await wait4selector(page, 'div#Test2', { visible: true, timeout : 5000 })
		})
		
		// Open Test Dialog with information icon and test it's populated
		testOpenDialog(page, newTestName, newTestClass);
		
		// Open Model Dialog with information icon and test it's populated
		modelOpenDialog(page, newModelName, newModelClass, newModelURL);
		
	})
	
	describe('Scheduling New Score Tests', () => {
		// Add TestModel1 for Scheduling
		addTestsAndModels(page, 'TestModel1');
		page.waitFor(5000);
		// Add TestModel2 for Scheduling
		addTestsAndModels(page, 'TestModel2');
		page.waitFor(5000);
		// Add Test1 for Scheduling
		addTestsAndModels(page, 'Test1');
		
		it('Updating Matrix with TestModel1, TestModel2, Test1', async () => {
			await wait4selector(page, 'i.fa-spin', { visible: true, timeout : 30000})
		})
		
		it('Matrix Done Updating with TestModel1, TestModel2, Test1', async () => {
			await wait4selector(page, 'i.fa-spin', { hidden: true, timeout : 100000})
		})
		
		it('Matrix Table Present', async () => {
			const table = await page.evaluate(async () => {
				return document.querySelectorAll("table").length;
			});
			
			expect(table).toBe(1);
		})
		
		
		it('Test1 and Models 1 and 2 Compatibility Check', async () => {			
			
			// Check there's only one Test/Model compatible
			var matrixModelCompatibility = await page.evaluate(async () => {
				var matrixChecks = document.querySelectorAll("table td span")
				var incompatible = 0;			
				for(var i =0; i< matrixChecks.length; i++){
					if(matrixChecks[i].getAttribute("data-tooltip") == "Test incompatible with model"){
						incompatible ++;
					}
				}
				
				return incompatible;
			});
			
			expect(matrixModelCompatibility).toEqual(1);
		})
		
		// Add Test2 for Scheduling
		addTestsAndModels(page, 'Test2');
		page.waitFor(5000);
		
		it('Updating Matrix with TestModel1, TestModel2, Test1', async () => {
			await wait4selector(page, 'i.fa-spin', { visible: true, timeout : 30000})
		})
		
		it('Done updating Matrix with TestModel1, TestModel2, Test1', async () => {
			await wait4selector(page, 'i.fa-spin', { hidden: true, timeout : 100000})
		})
				
		it('Test1,Test2 and Model 1, Model 2 Compatability Check', async () => {			
			// Check there's only one compatible Test/Model compatible in the matrix
			var matrixModelCompatibility = await page.evaluate(async () => {
				var matrixChecks = document.querySelectorAll("table td span")
				var incompatible = 0;			
				for(var i =0; i< matrixChecks.length; i++){
					if(matrixChecks[i].getAttribute("data-tooltip") == "Test incompatible with model"){
						incompatible ++;
					}
				}
				
				return incompatible;
			});
			
			expect(matrixModelCompatibility).toEqual(3);
		})
		
		it('Click Save As Suite', async () => {
			await page.waitFor(5000);
			await click(page, '#save-as-suite');
			await wait4selector(page, '#enter-name', { visible: true, timeout : 5000})
		})
		
		it('Run Tests', async () => {
			await page.waitFor(2000);
			await click(page, '#run-tests');
			await page.waitForFunction('document.getElementById("scidash-logo").innerText.startsWith("Test scores")');
		})
		
		it('Test Submitted for Simulation', async () => {
			await page.waitFor(5000);
			
			const scores = await page.evaluate(async () => {
				return document.querySelectorAll(".scidash-table tr").length;
			});

			expect(scores).toBeGreaterThanOrEqual(2);
			
			const modelName = await page.evaluate(async () => {
				return document.querySelectorAll(".scidash-table tr td")[0].innerText;
			});

			expect(modelName).toEqual(newTestClass);
		})
		
		it('Test Score Succesfully Simulated', async () => {
			await wait4selector(page, 'i.fa-check', { visible: true, timeout : 450000})
			
			const score = await page.evaluate(async () => {
				return document.querySelectorAll(".scidash-table tr td")[1].innerText;
			});

			expect(score).not.toEqual("N/A");
			
			await page.waitFor(2000);
		})
		
		it('Test Score Details Dialog Opened', async () => {
			await page.evaluate(async () => {
				document.querySelectorAll(".scidash-table tr td")[1].querySelector("a").click();
			});
			
			await wait4selector(page, '#test-details-dialog', { visible: true, timeout : 5000})

			await page.waitFor(1000);
		})
		
		// Click on Score name and test dialog comes up populated
		testScoreDetails(page, newTestName, newTestClass, newModelClass, newModelURL);
		
		it('Test Score Details Dialog Closed', async () => {
			await page.evaluate(async () => {
				document.querySelector(".centered-modal button").click()
			});
			await wait4selector(page, 'div.centered-modal', { hidden: true, timeout : 5000 })
			
			await page.waitFor(1000);
		})
		
		it('Test Score Model Details Dialog Opened', async () => {
			await page.evaluate(async () => {
				document.querySelectorAll(".scidash-table tr td")[3].querySelector("a").click();
			});
			
			await wait4selector(page, '#model-class-name', { visible: true, timeout : 5000})

			await page.waitFor(1000);
		})
		
		// Click on Model name and test dialog comes up populated
		testModelDetails(page, newModelClass, newModelURL);
		
		it('Test Score Model Details Dialog Closed', async () => {
			await page.evaluate(async () => {
				var buttons = document.querySelectorAll("button");
				buttons[buttons.length-1].click();
			});
			await wait4selector(page, '#model-class-name', { hidden: true, timeout : 5000 })
			
			await page.waitFor(1000);
		})
				
		// Open Test Suites view and test dialog with matrix comes up
		testSuiteScore(page, newTestName, newTestClass, newModelName, newModelClass, newModelURL);
		
		page.waitFor(2000);
	})
})