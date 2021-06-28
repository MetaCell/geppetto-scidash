import { wait4selector, click, closeModalWindow} from './utils';

export const newTestCreation = async (page, name, className, tag, newObservationSchema, secondObservationSchema, 
		observationValueN, observationValueSTD, observationValueMean, parameterTMax, tableModelLength) => {
	
	it('Sidebar Component Opened, Tests Registration Option Present', async () => {
	  await page.evaluate( () => {
	    document.getElementById("hamMenu").click()
	  });
		 await page.waitFor(5000);
		 await page.evaluate( () => {
	    document.querySelector("#hamMenuTests").click()
	  });
		 await wait4selector(page, 'i.fa-plus', { visible: true , timeout : 5000 })
	})

	it('New Test Registration Form', async () => {
		await page.evaluate( () => {
			document.querySelector("i.fa-plus").click()
		});
		await wait4selector(page, 'div#testFormSelectClass', { visible: true , timeout : 5000 })
	})
	
	it('Test Name Field Present in Form', async () => {
		await wait4selector(page, 'input#test-name', { visible: true , timeout : 5000 })
	})

	it('Enter Test Name', async () => {
		await page.evaluate( (newTest) => {
			let input = document.querySelector('#test-name');
			let lastValue = input.value;
			input.value = newTest;
			let event = new Event('input', { bubbles: true });
			event.simulated = true;
			let tracker = input._valueTracker;
			if (tracker) {
				tracker.setValue(lastValue);
			}
			input.dispatchEvent(event);
		}, name);

		const testName = await page.evaluate( () => {
			return document.getElementById("test-name").value;
		});

		expect(testName).toEqual(name);
	})

	it('Test Class Dropdown Present in Form', async () => {
		await wait4selector(page, '#testFormSelectClass', { visible: true , timeout : 35000 })
	})

	it('Select '+  className + ' Class', async () => {
		await page.evaluate( () => {
			var evt = document.createEvent('MouseEvent');
			evt.initEvent('click', true, false);
			var elm = document.querySelector('#testFormSelectClass').parentElement;
			elm.dispatchEvent(evt);
		});

		await page.waitFor(3000);
		
		await page.evaluate( (className) => {
			var evt = document.createEvent('MouseEvent');
			evt.initEvent('click', true, false);
			var elm = document.getElementById(className);
			elm.dispatchEvent(evt);
		}, className);
		
		await page.waitFor(3000);
		
		await page.waitForFunction('document.getElementById("testFormSelectClass").innerText.startsWith("'+className+'")');
	})

	it('Test Parameters Populated', async () => {
		await page.waitFor(2000);
		
		const delayParameterValue = await page.evaluate( () => {
			return Number(document.getElementById("delay (s)").value);
		});
		
		expect(delayParameterValue).toEqual(0.1);
		
		const paddingParameterValue = await page.evaluate( () => {
			return Number(document.getElementById("padding (s)").value);
		});

		expect(paddingParameterValue).toEqual(0.2);
		
		const durationParameterValue = await page.evaluate( () => {
			return Number(document.getElementById("duration (s)").value);
		});

		expect(durationParameterValue).toEqual(0.3);
	})
	
	it('Add New Tag Present in Form', async () => {
		await wait4selector(page, 'input#test-add-tags', { visible: true , timeout : 5000 })
	})

	it('Enter New Tag', async () => {
		await page.evaluate( (newTestTag) => {
			let input = document.querySelector('#test-add-tags');
			let lastValue = input.value;
			input.value = newTestTag;
			let event = new Event('input', { bubbles: true });
			event.simulated = true;
			let tracker = input._valueTracker;
			if (tracker) {
				tracker.setValue(lastValue);
			}
			input.dispatchEvent(event);

			var evt = new CustomEvent('Event');
			evt.initEvent('keypress', true, false);
			evt.which = 13;
			evt.keyCode = 13;
			input.dispatchEvent(evt);

		}, tag);

		const testTag = await page.evaluate( () => {
			return document.querySelectorAll('.tags svg').length;
		});
		expect(testTag).toEqual(1);
	})
	
	it('Observation Schema Dropdown Present in Form', async () => {
		await wait4selector(page, '#testFormSelectObservationSchema', { visible: true , timeout : 35000 })
	})
	
	it('Observation Parameter Field "std (megaohm)" Present', async () => {
		await page.waitFor(2000);
		const fieldPresent = await page.evaluate( () => {
			var elm = document.getElementById("std (megaohm)");
			if(elm == undefined || elm == null){
				return false;
			}
			return true;
		});
		
		expect(fieldPresent).toEqual(true);
	})

	it('Select '+  secondObservationSchema + ' Observation Schema', async () => {
		await page.evaluate( () => {
			var evt = document.createEvent('MouseEvent');
			evt.initEvent('click', true, false);
			var elm = document.querySelector('#testFormSelectObservationSchema')
			elm.dispatchEvent(evt);
		});
		await page.waitFor(3000);
		
		await page.evaluate( (className) => {
			var evt = document.createEvent('MouseEvent');
			evt.initEvent('click', true, false);
			var elm = document.getElementById(className);
			elm.dispatchEvent(evt);
		}, secondObservationSchema);
		await page.waitForFunction('document.getElementById("testFormSelectObservationSchema").innerText.startsWith("Mean, Standard Error, N")');
	})
	
	it('Observation Parameter Field "sem (megaohm)" Present', async () => {
		await page.waitFor(2000);
		const fieldPresent = await page.evaluate( () => {
			var elm = document.getElementById("sem (megaohm)");
			if(elm == undefined || elm == null){
				return false;
			}
			return true;
		});
		
		expect(fieldPresent).toEqual(true);
	})
	
	it('Select '+  newObservationSchema + ' Observation Schema', async () => {
		await page.evaluate( () => {
			var evt = document.createEvent('MouseEvent');
			evt.initEvent('click', true, false);
			var elm = document.querySelector('#testFormSelectObservationSchema')
			elm.dispatchEvent(evt);
		});
		
		await page.waitFor(2000);

		await page.evaluate( (className) => {
			var evt = document.createEvent('MouseEvent');
			evt.initEvent('click', true, false);
			var elm = document.getElementById(className);
			elm.dispatchEvent(evt);
		}, newObservationSchema);
		await page.waitForFunction('document.getElementById("testFormSelectObservationSchema").innerText.startsWith("Mean, Standard Deviation, N")');
	})
	
	it('Observation Parameter Field "std (megaohm)" Present', async () => {
		await page.waitFor(2000);
		const fieldPresent = await page.evaluate( () => {
			var elm = document.getElementById("std (megaohm)");
			if(elm == undefined || elm == null){
				return false;
			}
			return true;
		});
		
		expect(fieldPresent).toEqual(true);
	})

	it('Enter Observation Value N', async () => {
		await page.evaluate( (value) => {
			let input = document.getElementById('n (-)');
			let lastValue = input.value;
			input.value = value;
			let event = new Event('input', { bubbles: true });
			event.simulated = true;
			let tracker = input._valueTracker;
			if (tracker) {
				tracker.setValue(lastValue);
			}
			input.dispatchEvent(event);
		}, observationValueN);

		const observationValue = await page.evaluate( () => {
			return Number(document.getElementById("n (-)").value);
		});

		expect(observationValue).toEqual(observationValueN);
	})
	
	it('Enter Observation Value std', async () => {
		await page.evaluate( (value) => {
			let input = document.getElementById('std (megaohm)');
			let lastValue = input.value;
			input.value = value;
			let event = new Event('input', { bubbles: true });
			event.simulated = true;
			let tracker = input._valueTracker;
			if (tracker) {
				tracker.setValue(lastValue);
			}
			input.dispatchEvent(event);
		}, observationValueSTD);

		const observationValue = await page.evaluate( () => {
			return Number(document.getElementById("std (megaohm)").value);
		});

		expect(observationValue).toEqual(observationValueSTD);
	})
	
	it('Enter Observation Value Mean', async () => {
		await page.evaluate( (value) => {
			let input = document.getElementById('mean (megaohm)');
			let lastValue = input.value;
			input.value = value;
			let event = new Event('input', { bubbles: true });
			event.simulated = true;
			let tracker = input._valueTracker;
			if (tracker) {
				tracker.setValue(lastValue);
			}
			input.dispatchEvent(event);
		}, observationValueMean);

		const observationValue = await page.evaluate( () => {
			return Number(document.getElementById("mean (megaohm)").value);
		});

		expect(observationValue).toEqual(observationValueMean);
	})
	
	it('Enter Parameter Value TMax', async () => {
		await page.evaluate( (value) => {
			let input = document.getElementById('tmax (s)');
			let lastValue = input.value;
			input.value = value;
			let event = new Event('input', { bubbles: true });
			event.simulated = true;
			let tracker = input._valueTracker;
			if (tracker) {
				tracker.setValue(lastValue);
			}
			input.dispatchEvent(event);
		}, parameterTMax);

		const paramValue = await page.evaluate( () => {
			return Number(document.getElementById("tmax (s)").value);
		});

		expect(paramValue).toEqual(parameterTMax);
	})

	it('Save Test', async () => {
		await page.evaluate( () => {
			return document.getElementById("save-test").click();
		});
		
		await page.waitFor(2000);

		await wait4selector(page, 'table.scidash-table', { visible: true , timeout : 5000 })
	})

	it('New Test Present in Tests Page', async () => {
		await page.waitFor(5000);
		const tableModels = await page.evaluate( () => {
			return document.querySelectorAll(".scidash-table tr").length;
		});
		expect(tableModels).toBeGreaterThanOrEqual(tableModelLength);

		const modelName = await page.evaluate( () => {
			return document.querySelectorAll(".scidash-table tr td")[0].innerText;
		});

		expect(modelName).toEqual(name);

		const modelClass = await page.evaluate( () => {
			return document.querySelectorAll(".scidash-table tr td")[1].innerText;
		});

		expect(modelClass).toEqual(className);

		const modelTag = await page.evaluate( () => {
			return document.querySelectorAll(".chips span")[0].innerText;
		});

		expect(modelTag).toEqual(tag);
	})
}

export const cancelTestCreation = async (page) => {
	it('Test Creation Page Opened, New Test Button Present', async () => {
		await wait4selector(page, 'i.fa-plus', { visible: true , timeout : 5000 })
	})

	it('New Test Creation Form', async () => {
		await page.evaluate( () => {
			document.querySelector("i.fa-plus").click()
		});
		await wait4selector(page, 'div#testFormSelectClass', { visible: true , timeout : 5000 })
	})

	it('Cancel Test Creation Button Present', async () => {
		await wait4selector(page, '#cancel-test', { visible: true , timeout : 5000 })
	})

	it('Cancel Test Creation, Navigate Back to Tests Page', async () => {
		await page.evaluate( () => {
			return document.getElementById("cancel-test").click();
		});

		await wait4selector(page, 'table.scidash-table', { visible: true , timeout : 5000 })
	})
}

export const cloneTestCreation = async (page, name, className, tableModelLength) => {
	it('Tests Page Opened, New Test Button Present', async () => {
		await wait4selector(page, 'i.fa-plus', { visible: true , timeout : 5000 })
	})

	it('Open Test Edit/Clone Menu', async () => {
		await page.evaluate( () => {
			document.querySelector(".fa-ellipsis-v").click()
		});
		await wait4selector(page, 'div.MuiMenu-paper', { visible: true , timeout : 5000 })
	})

	it('Clone Test', async () => {
		await page.evaluate( () => {
			var evt = document.createEvent('MouseEvent');
			evt.initEvent('click', true, false);
			var elm = document.querySelectorAll('.MuiMenu-paper ul li')[1];
			elm.dispatchEvent(evt);
		});

		// Wait for model to clone
		await page.waitFor(5000);

		const models = await page.evaluate( () => {
			return document.querySelectorAll(".scidash-table tr").length;
		});

		expect(models).toBeGreaterThanOrEqual(tableModelLength);

		const testName = await page.evaluate( () => {
			return document.querySelectorAll(".scidash-table tr td")[6].innerText;
		});

		expect(testName).toEqual(name);

		const testClass = await page.evaluate( () => {
			return document.querySelectorAll(".scidash-table tr td")[7].innerText;
		});

		expect(testClass).toEqual(className);
	})
}

export const editTest1 = async (page, name, className, tag, observationVVolt, observationIVolt, tableModelLength) => {
	it('Test Page Opened, New Test Button Present', async () => {
		await wait4selector(page, 'i.fa-plus', { visible: true , timeout : 5000 })
	})

	it('Open Test Edit/Clone Menu', async () => {
		await page.evaluate( () => {
			document.querySelector(".fa-ellipsis-v").click()
		});
		await wait4selector(page, 'div.MuiMenu-paper', { visible: true , timeout : 5000 })
	})

	it('Open Edit Test Form', async () => {
		await page.evaluate( () => {
			var evt = document.createEvent('MouseEvent');
			evt.initEvent('click', true, false);
			var elm = document.querySelectorAll('.MuiMenu-paper ul li')[0];
			elm.dispatchEvent(evt);
		});

		await page.waitFor(2000);
		
		await wait4selector(page, 'div#testFormSelectClass', { visible: true , timeout : 5000 })
	})

	it('Test Name Field Present in Form', async () => {
		await wait4selector(page, 'input#test-name', { visible: true , timeout : 5000 })
	})

	it('Edit Test Name', async () => {
		await page.evaluate( (newTest) => {
			let input = document.querySelector('#test-name')
			let lastValue = input.value;
			input.value = newTest;
			let event = new Event('input', { bubbles: true });
			event.simulated = true;
			let tracker = input._valueTracker;
			if (tracker) {
				tracker.setValue(lastValue);
			}
			input.dispatchEvent(event);
		}, name);

		const testName = await page.evaluate( () => {
			return document.getElementById("test-name").value;
		});

		expect(testName).toEqual(name);
	})

	it('Test Class Dropdown Present in Form', async () => {
		await wait4selector(page, '#testFormSelectClass', { visible: true , timeout : 35000 })
	})

	it('Select '+  className + ' Class', async () => {
		await page.evaluate( () => {
			var evt = document.createEvent('MouseEvent');
			evt.initEvent('click', true, false);
			var elm = document.querySelector('#testFormSelectClass').parentElement;
			elm.dispatchEvent(evt);
		});

		await page.waitFor(2000);
		
		await page.evaluate( (className) => {
			var evt = document.createEvent('MouseEvent');
			evt.initEvent('click', true, false);
			var elm = document.getElementById(className);
			elm.dispatchEvent(evt);
		}, className);
		
		await page.waitFor(2000);
		
		await page.waitForFunction('document.getElementById("testFormSelectClass").innerText.startsWith("'+className+'")');
	})

	it('Test Parameters Populated', async () => {
		await page.waitFor(2000);
		
		const dtParameterValue = await page.evaluate( () => {
			return Number(document.getElementById("dt (s)").value);
		});
		
		expect(dtParameterValue).toEqual(0.000025);
		
		const tmaxParameterValue = await page.evaluate( () => {
			return Number(document.getElementById("tmax (s)").value);
		});

		expect(tmaxParameterValue).toEqual(0.1);
		
		const vmaxParameterValue = await page.evaluate( () => {
			return Number(document.getElementById("v_max (V)").value);
		});

		expect(vmaxParameterValue).toEqual(0.06);
		
		const vminParameterValue = await page.evaluate( () => {
			return Number(document.getElementById("v_min (V)").value);
		});

		expect(vminParameterValue).toEqual(-0.08);
		
		const vstepParameterValue = await page.evaluate( () => {
			return Number(document.getElementById("v_step (V)").value);
		});

		expect(vstepParameterValue).toEqual(0.02);
	})
	
	it('Add New Tag Present in Form', async () => {
		await wait4selector(page, 'input#test-add-tags', { visible: true , timeout : 5000 })
	})
	
	it('Delete Tag', async () => {
		await page.waitFor(2000);
		
		await page.evaluate( () => {
			var elm =document.querySelector(".tags path")
			var evt = document.createEvent('MouseEvent');
			evt.initEvent('click', true, false);
			elm.dispatchEvent(evt)
		});

		const testTag = await page.evaluate( () => {
			return document.querySelectorAll('.tags svg').length;
		});
		expect(testTag).toEqual(0);
	})

	it('Enter New Tag', async () => {
		await page.evaluate( (testTag) => {
			let input = document.querySelector('#test-add-tags')
			let lastValue = input.value;
			input.value = testTag;
			let event = new Event('input', { bubbles: true });
			event.simulated = true;
			let tracker = input._valueTracker;
			if (tracker) {
				tracker.setValue(lastValue);
			}
			input.dispatchEvent(event);

			var evt = new CustomEvent('Event');
			evt.initEvent('keypress', true, false);
			evt.which = 13;
			evt.keyCode = 13;
			input.dispatchEvent(evt);

		}, tag);

		const testTag = await page.evaluate( () => {
			return document.querySelectorAll('.tags svg').length;
		});
		expect(testTag).toEqual(1);
	})
	
	it('Observation Parameter Fields Present', async () => {
		await page.waitFor(2000);
		const iObservationValue = await page.evaluate( () => {
			var elm = document.getElementById("i (volt | picoampere)");
			if(elm == undefined || elm == null){
				return false;
			}
			return true;
		});
		
		expect(iObservationValue).toEqual(true);
		
		await page.waitFor(2000);
		const vObservationValue = await page.evaluate( () => {
			var elm = document.getElementById("v (volt | picoampere)");
			if(elm == undefined || elm == null){
				return false;
			}
			return true;
		});
		
		expect(vObservationValue).toEqual(true);
	})

	it('Enter Observation Value i (volt | picoampere)', async () => {
		await page.evaluate( (value) => {
			let input =  document.getElementById('i (volt | picoampere)')
			let lastValue = input.value;
			input.value = '[' + value + ']';
			let event = new Event('input', { bubbles: true });
			event.simulated = true;
			let tracker = input._valueTracker;
			if (tracker) {
				tracker.setValue(lastValue);
			}
			input.dispatchEvent(event);
		}, observationIVolt);

		const observationValue = await page.evaluate( () => {
			return document.getElementById("i (volt | picoampere)").value;
		});

		expect(observationValue).toEqual("["+observationIVolt.toString()+"]");
	})
	
	it('Enter Observation Value v (volt | picoampere)', async () => {
		await page.evaluate( (value) => {
			let input =  document.getElementById('v (volt | picoampere)')
			let lastValue = input.value;
			input.value = '[' + value + ']';
			let event = new Event('input', { bubbles: true });
			event.simulated = true;
			let tracker = input._valueTracker;
			if (tracker) {
				tracker.setValue(lastValue);
			}
			input.dispatchEvent(event);
		}, observationVVolt);

		const observationValue = await page.evaluate( () => {
			return document.getElementById("v (volt | picoampere)").value;
		});

		expect(observationValue).toEqual("["+observationVVolt.toString()+"]");
	})
	

	it('Save Test', async () => {
		await page.waitFor(5000);
		
		const saveModelEnabled = await page.evaluate( () => {
			return document.getElementById("save-test").disabled;
		});

		expect(saveModelEnabled).toEqual(false);
		
		await page.evaluate( () => {
			return document.getElementById("save-test").click();
		});
		
		await page.waitFor(5000);

		await wait4selector(page, 'table.scidash-table', { visible: true , timeout : 5000 })
	})

	it('Edited Test Present in Tests Page', async () => {
		await page.waitFor(5000);
		const tableModels = await page.evaluate( () => {
			return document.querySelectorAll(".scidash-table tr").length;
		});
		expect(tableModels).toBeGreaterThanOrEqual(tableModelLength);
	})
	
	it('Edited Test Present in Tests Page with Updated Name', async () => {
		const modelName = await page.evaluate( () => {
			return document.querySelectorAll(".scidash-table tr td")[0].innerText;
		});

		expect(modelName).toEqual(name);
	})
	
	it('Edited Test Present in Tests Page with Updated Class', async () => {
		const modelClass = await page.evaluate( () => {
			return document.querySelectorAll(".scidash-table tr td")[1].innerText;
		});

		expect(modelClass).toEqual(className);
	})
	
	it('Edited Test Present in Tests Page with Updated Tags', async () => {
		const modelTag = await page.evaluate( () => {
			return document.querySelectorAll(".chips span")[0].innerText;
		});

		expect(modelTag).toEqual(tag);
	})
}