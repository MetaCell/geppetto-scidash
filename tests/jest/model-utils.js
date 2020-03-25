import { wait4selector, click} from './utils';

export const modelCreation = (page, newModelName, newModelURL, newModelClass, newModelTag, var1, var2) => {
	it('Sidebar Component Opened, Models Option Present', async () => {
		await click(page, 'button#hamMenu');
		await wait4selector(page, 'span#hamMenuModels', { visible: true })
	})

	it('Models Page Opened, New Model Button Present', async () => {
		await click(page, '#hamMenuModels');
		await wait4selector(page, 'i.fa-plus', { visible: true , timeout : 5000 })
	})

	it('New Model Registration Form', async () => {
		await page.evaluate( () => {
			document.querySelector("i.fa-plus").click()
		});
		await wait4selector(page, 'div.actions-container', { visible: true , timeout : 5000 })
	})

	it('Source URL Field Present in Form', async () => {
		await wait4selector(page, 'input#source-url', { visible: true , timeout : 5000 })
	})

	it('Enter Source URL', async () => {
		await page.evaluate( (newModelURL) => {
			var elm = document.querySelector('#source-url')
			var ev = new Event('input', { bubbles: true});
			ev.simulated = true;
			elm.value = newModelURL;
			elm.dispatchEvent(ev);
		}, newModelURL);

		const testModelURL = await page.evaluate( () => {
			return document.getElementById("source-url").value;
		});
		expect(testModelURL).toEqual(newModelURL);
	})

	it('Model URL Validated', async () => {
		await wait4selector(page, 'span.icons', { visible: true , timeout : 5000 });
		// Wait for URL model to validate
		await wait4selector(page, '#validating-source-url', { hidden: true , timeout : 60000 })
		const modelValidated = await page.evaluate( () => {
			return document.querySelector(".icons svg").style.color;
		});
		expect(modelValidated).toEqual("green");
	})

	it('Select Class Dropdown Present in Form', async () => {
		await wait4selector(page, '#modelFormSelectClass', { visible: true , timeout : 35000 })
	})

	it('Open "Select Class" Dropdown Menu', async () => {
		await page.evaluate( () => {
			var evt = document.createEvent('MouseEvent');
			evt.initEvent('mouseup', true, false);
			var elm = document.querySelector('#modelFormSelectClass button')
			elm.dispatchEvent(evt);
		});
		await wait4selector(page, "#"+newModelClass , { visible: true , timeout : 35000 })
	})

	it('Select "' + newModelClass + '" Class', async () => {
		await page.evaluate( (className) => {
			var evt = document.createEvent('MouseEvent');
			evt.initEvent('mouseup', true, false);
			var elm = document.querySelector("#" + className + " div")
			elm.dispatchEvent(evt);
		},newModelClass);
		await page.waitForFunction('document.getElementById("modelFormSelectClass").innerText.startsWith("'+newModelClass+'")');
	})

	it('Add New Tag Present in Form', async () => {
		await wait4selector(page, 'input#new-tag', { visible: true , timeout : 5000 })
	})

	it('Enter New Tag', async () => {
		await page.evaluate( (newModelTag) => {
			var elm = document.querySelector('#new-tag')
			var ev = new Event('input', { bubbles: true});
			ev.simulated = true;
			elm.value = newModelTag;
			elm.dispatchEvent(ev);

			var evt = new CustomEvent('Event');
			evt.initEvent('keypress', true, false);
			evt.which = 13;
			evt.keyCode = 13;
			elm.dispatchEvent(evt);

		}, newModelTag);

		const testModelTag = await page.evaluate( () => {
			return document.querySelectorAll('.tags svg').length;
		});
		expect(testModelTag).toEqual(1);
	})

	it('Model Name Field Present in Form', async () => {
		await wait4selector(page, 'input#model-name', { visible: true , timeout : 5000 })
	})

	it('Enter Model Name', async () => {
		await page.evaluate( (newModel) => {
			var elm = document.querySelector('#model-name')
			var ev = new Event('input', { bubbles: true});
			ev.simulated = true;
			elm.value = newModel;
			elm.dispatchEvent(ev);
		}, newModelName);

		const testModelName = await page.evaluate( () => {
			return document.getElementById("model-name").value;
		});

		expect(testModelName).toEqual(newModelName);
	})

	it('Model Parameters Button Present', async () => {
		await wait4selector(page, '#open-model-parameters', { visible: true , timeout : 5000 })
	})

	it('Model Parameters Button Enabled', async () => {
		await wait4selector(page, '#loading-model-parameters', { hidden: true , timeout : 125000 })

		const modelParametersButton = await page.evaluate( () => {
			return document.getElementById("open-model-parameters").disabled;
		});

		expect(modelParametersButton).toEqual(false);
	})
	
	it('Model Parameters Dialog Open', async () => {
		await page.evaluate( () => {
			return document.getElementById("open-model-parameters").click();
		});
		
		await wait4selector(page, 'div.centered-modal', { visible: true , timeout : 20000 })
	})
	
	it('Select State Variables', async () => {
		await page.evaluate( (var1, var2) => {
			var tableRows = document.querySelectorAll(".scidash-table td");
			for(var i =0; i< tableRows.length; i++){
			   if(tableRows[i].innerText ==var1 || tableRows[i].innerText ==var2){
			       document.querySelectorAll(".scidash-table td")[i+1].querySelector("input").click();
			   }
			}
		}, var1, var2);
		
		await page.waitFor(5000);
		
		var var1Selected = await page.evaluate( (var1) => {
			var tableRows = document.querySelectorAll(".scidash-table td");
			for(var i =0; i< tableRows.length; i++){
			   if(tableRows[i].innerText ==var1){
				   var parentDiv = document.querySelectorAll(".scidash-table td")[i+1].querySelector("input").parentNode;
				   return parentDiv.querySelector("div").querySelector("div").querySelectorAll("div")[1].style.backgroundColor;
			   }
			}
			return "";
		}, var1);
		
		expect(var1Selected).toEqual("rgb(0, 128, 0)");
		
		var var2Selected = await page.evaluate( (var2) => {
			var tableRows = document.querySelectorAll(".scidash-table td");
			for(var i =0; i< tableRows.length; i++){
			   if(tableRows[i].innerText ==var2){
				   var parentDiv = document.querySelectorAll(".scidash-table td")[i+1].querySelector("input").parentNode;
				   return parentDiv.querySelector("div").querySelector("div").querySelectorAll("div")[1].style.backgroundColor;
			   }
			}
			
			return "";
		}, var2);
		
		expect(var2Selected).toEqual("rgb(0, 128, 0)");
	})
	
	it('Model Parameters Dialog Closed', async () => {
		await page.evaluate( () => {
			let buttons = document.querySelectorAll(".centered-modal button");
			return document.querySelectorAll(".centered-modal button")[buttons.length-1].click();
		});
		
		await wait4selector(page, 'div.centered-modal', { hidden: true , timeout : 20000 })
	})
}

export const saveModel = (page, newModelName, newModelClass, newModelTag, tableModelLength) => {
	it('Save Model', async () => {
		const saveModelEnabled = await page.evaluate( () => {
			return document.getElementById("save-model").disabled;
		});

		expect(saveModelEnabled).toEqual(false);

		await page.evaluate( () => {
			return document.getElementById("save-model").click();
		});

		await wait4selector(page, 'table.scidash-table', { visible: true, timeout: 5000 })
	})

	it('Test Model Present in Models Page', async () => {
		await page.waitFor(5000);
		const tableModels = await page.evaluate( () => {
			return document.querySelectorAll(".scidash-table tr").length;
		});
		expect(tableModels).toBeGreaterThanOrEqual(tableModelLength);

		const modelName = await page.evaluate( () => {
			return document.querySelectorAll(".scidash-table tr td")[0].innerText;
		});

		expect(modelName).toEqual(newModelName);

		const modelClass = await page.evaluate( () => {
			return document.querySelectorAll(".scidash-table tr td")[1].innerText;
		});

		expect(modelClass).toEqual(newModelClass);

		const modelTag = await page.evaluate( () => {
			return document.querySelectorAll(".chips span")[0].innerText;
		});

		expect(modelTag).toEqual(newModelTag);
	})
}

export const editModel = (page, editedModelName, editedModelClass, editedModelTag, var1, var2, tableModelLength) => {
	it('Models Page Opened, New Model Button Present', async () => {
		await wait4selector(page, 'span.fa-plus', { visible: true , timeout : 5000 })
	})

	it('Open Model Edit/Clone Menu', async () => {
		await page.evaluate( () => {
			document.querySelector(".fa-ellipsis-v").click()
		});
		await wait4selector(page, 'span.fa-pencil-square-o', { visible: true , timeout : 5000 })
	})

	it('Open Edit Model Form', async () => {
		await click(page, 'span.fa-pencil-square-o');

		await wait4selector(page, 'div.actions-container', { visible: true , timeout : 5000 })
	})

	it('Source URL Field Present in Form', async () => {
		await wait4selector(page, 'input#source-url', { visible: true , timeout : 5000 })
	})

	it('Model URL Validated', async () => {
		await wait4selector(page, 'span.icons', { visible: true , timeout : 5000 });
		// Wait for URL model to validate
		await wait4selector(page, '#validating-source-url', { hidden: true , timeout : 60000 })
		const modelValidated = await page.evaluate( () => {
			return document.querySelector(".icons svg").style.color;
		});
		expect(modelValidated).toEqual("green");
	})

	it('Select Class Dropdown Present in Form', async () => {
		await wait4selector(page, '#modelFormSelectClass', { visible: true , timeout : 35000 })
	})

	it('Open "Select Class" Dropdown Menu', async () => {
		await page.evaluate( () => {
			var evt = document.createEvent('MouseEvent');
			evt.initEvent('mouseup', true, false);
			var elm = document.querySelector('#modelFormSelectClass button')
			elm.dispatchEvent(evt);
		});
		await wait4selector(page, '#LEMSModel', { visible: true , timeout : 35000 })
	})

	it('Select "LEMSModel" Class', async () => {
		await page.evaluate( () => {
			var evt = document.createEvent('MouseEvent');
			evt.initEvent('mouseup', true, false);
			var elm = document.querySelector('#LEMSModel div')
			elm.dispatchEvent(evt);
		});
		await page.waitForFunction('document.getElementById("modelFormSelectClass").innerText.startsWith("LEMSModel")');
	})

	it('Add New Tag Present in Form', async () => {
		await wait4selector(page, 'input#new-tag', { visible: true , timeout : 5000 })
	})

	it('Delete Tag', async () => {
		await page.evaluate( () => {
			var elm =document.querySelector(".tags path")
			var evt = new CustomEvent('Event');
			evt.initEvent('keypress', true, false);
			evt.which = 13;
			evt.keyCode = 13;
			elm.dispatchEvent(evt);
		}, editedModelTag);

		const testModelTag = await page.evaluate( () => {
			return document.querySelectorAll('.tags svg').length;
		});
		expect(testModelTag).toEqual(0);
	})

	it('Enter New Tag', async () => {
		await page.evaluate( (editedModelTag) => {
			var elm = document.querySelector('#new-tag')
			var ev = new Event('input', { bubbles: true});
			ev.simulated = true;
			elm.value = editedModelTag;
			elm.dispatchEvent(ev);

			var evt = new CustomEvent('Event');
			evt.initEvent('keypress', true, false);
			evt.which = 13;
			evt.keyCode = 13;
			elm.dispatchEvent(evt);
		}, editedModelTag);

		const testModelTag = await page.evaluate( () => {
			return document.querySelectorAll('.tags svg').length;
		});
		expect(testModelTag).toEqual(1);
	})

	it('Model Name Field Present in Form', async () => {
		await wait4selector(page, 'input#model-name', { visible: true , timeout : 5000 })
	})

	it('Edit Model Name', async () => {
		await page.evaluate( (newModel) => {
			var elm = document.querySelector('#model-name')
			var ev = new Event('input', { bubbles: true});
			ev.simulated = true;
			elm.value = newModel;
			elm.dispatchEvent(ev);

		}, editedModelName);

		const testModelName = await page.evaluate( () => {
			return document.getElementById("model-name").value;
		});

		expect(testModelName).toEqual(editedModelName);
	})

	it('Model Parameters Button Present', async () => {
		await wait4selector(page, '#open-model-parameters', { visible: true , timeout : 5000 })
	})

	it('Model Parameters Button Enabled', async () => {
		await wait4selector(page, '#loading-model-parameters', { hidden: true , timeout : 125000 })

		const modelParametersButton = await page.evaluate( () => {
			return document.getElementById("open-model-parameters").disabled;
		});

		expect(modelParametersButton).toEqual(false);
	})
	
	it('Model Parameters Dialog Open', async () => {
		await page.evaluate( () => {
			return document.getElementById("open-model-parameters").click();
		});
		
		await wait4selector(page, 'div.centered-modal', { visible: true , timeout : 20000 })
	})
	
	it('Check State Variables', async () => {		
		var var1Selected = await page.evaluate( (var1) => {
			var tableRows = document.querySelectorAll(".scidash-table td");
			for(var i =0; i< tableRows.length; i++){
			   if(tableRows[i].innerText ==var1){
				   var parentDiv = document.querySelectorAll(".scidash-table td")[i+1].querySelector("input").parentNode;
				   return parentDiv.querySelector("div").querySelector("div").querySelectorAll("div")[1].style.backgroundColor;
			   }
			}
			return "";
		}, var1);
		
		expect(var1Selected).toEqual("rgb(0, 128, 0)");
		
		var var2Selected = await page.evaluate( (var2) => {
			var tableRows = document.querySelectorAll(".scidash-table td");
			for(var i =0; i< tableRows.length; i++){
			   if(tableRows[i].innerText ==var2){
				   var parentDiv = document.querySelectorAll(".scidash-table td")[i+1].querySelector("input").parentNode;
				   return parentDiv.querySelector("div").querySelector("div").querySelectorAll("div")[1].style.backgroundColor;
			   }
			}
			
			return "";
		}, var2);
		
		expect(var2Selected).toEqual("rgb(0, 128, 0)");
	})
	
	it('Model Parameters Dialog Closed', async () => {
		await page.evaluate( () => {
			return document.querySelectorAll(".centered-modal button")[4].click();
		});
		
		await wait4selector(page, 'div.centered-modal', { hidden: true , timeout : 20000 })
	})

	it('Save Model', async () => {
		const saveModelEnabled = await page.evaluate( () => {
			return document.getElementById("save-model").disabled;
		});

		expect(saveModelEnabled).toEqual(false);

		await page.evaluate( () => {
			return document.getElementById("save-model").click();
		});

		await wait4selector(page, 'table.scidash-table', { visible: true , timeout : 5000 })
	})

	it('Test Model Present in Models Page', async () => {
		await page.waitFor(5000);
		const models = await page.evaluate( () => {
			return document.querySelectorAll(".scidash-table tr").length;
		});

		tableModelLength = tableModelLength+1;
		expect(models).toBeGreaterThanOrEqual(tableModelLength);

		const modelName = await page.evaluate( () => {
			return document.querySelectorAll(".scidash-table tr td")[0].innerText;
		});

		expect(modelName).toEqual(editedModelName);

		const modelClass = await page.evaluate( () => {
			return document.querySelectorAll(".scidash-table tr td")[1].innerText;
		});

		expect(modelClass).toEqual(editedModelClass);

		const modelTag = await page.evaluate( () => {
			return document.querySelectorAll(".chips span")[1].innerText;
		});

		expect(modelTag).toEqual(editedModelTag);
	})
}

export const cloneModel = (page, modelName, modelClass, tableModelLength) => {
	it('Models Page Opened, New Model Button Present', async () => {
		await wait4selector(page, 'span.fa-plus', { visible: true , timeout : 5000 })
	})

	it('Open Model Edit/Clone Menu', async () => {
		await page.evaluate( () => {
			document.querySelector(".fa-ellipsis-v").click()
		});
		await wait4selector(page, 'span.fa-clone', { visible: true , timeout : 5000 })
	})

	it('Clone Model', async () => {
		await click(page, 'span.fa-clone');

		// Wait for model to clone
		await page.waitFor(5000);

		const models = await page.evaluate( () => {
			return document.querySelectorAll(".scidash-table tr").length;
		});

		expect(models).toBeGreaterThanOrEqual(tableModelLength);

		const modelName = await page.evaluate( () => {
			return document.querySelectorAll(".scidash-table tr td")[7].innerText;
		});

		expect(modelName).toEqual(modelName);

		const modelClass = await page.evaluate( () => {
			return document.querySelectorAll(".scidash-table tr td")[8].innerText;
		});

		expect(modelClass).toEqual(modelClass);
	})
}

export const cancelModelCreation = (page) => {
	it('Models Page Opened, New Model Button Present', async () => {
		await wait4selector(page, 'span.fa-plus', { visible: true , timeout : 5000 })
	})

	it('New Model Creation Form', async () => {
		await page.evaluate( () => {
			document.querySelector("span.fa-plus").click()
		});
		await wait4selector(page, 'div.actions-container', { visible: true , timeout : 5000 })
	})

	it('Cancel Model Creation Button Present', async () => {
		await wait4selector(page, '#cancel-model', { visible: true , timeout : 5000 })
	})

	it('Cancel Model Creation, Navigate Back to Models Page', async () => {
		await page.evaluate( () => {
			return document.getElementById("cancel-model").click();
		});

		await wait4selector(page, 'table.scidash-table', { visible: true , timeout : 5000 })
	})
}