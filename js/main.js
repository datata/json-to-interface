console.log("Welcome to JSON to Interface!");

function jsonToInterface() {
	document.getElementById("js-code").innerHTML = "";

	const json = document.getElementById("json");
	const nameInterface = document.getElementById("name-interface").value;
	const obj = JSON.parse(json.value);

	const keyValues = constructInterface(obj);

	createInterface(nameInterface, keyValues);
}

function createInterface(nameInterface, keyValues) {
	let interface = `export interface ${nameInterface} {\n${keyValues}}\n\n`;

	document
		.getElementById("js-code")
		.appendChild(document.createTextNode(interface));
}

function constructInterface(obj, pairOfValues = "") {
	for (const key in obj) {
		const value = obj[key];
		const type = typeof value;

		if (type === "string") {
			console.log(1);
			pairOfValues += `  ${key}: string;\n`;
		} else if (type === "number") {
			pairOfValues += `  ${key}: number;\n`;
		} else if (type === "null") {
			pairOfValues += `  ${key}: null;\n`;
		} else if (type === "boolean") {
			pairOfValues += `  ${key}: boolean;\n`;
		} else if (type === "object") {
			const nameInterface = key.charAt(0).toUpperCase() + key.slice(1);
			pairOfValues += `  ${key}: ${nameInterface};\n`;
			const newKeyValues = constructInterface(obj[key], "");
			createInterface(nameInterface, newKeyValues);
		}
	}

	return pairOfValues;
}

function jsonValidate() {
	const json = document.getElementById("json");
	try {
		if (json.value === "") {
			return (json.style.borderColor = "green");
		}

		JSON.parse(json.value);
		json.style.borderColor = "green";
	} catch (error) {
		console.log(error);
		json.style.borderColor = "red";
	}
}

function copyToClipboard() {
	console.log("Copying to clipboard");
	const jsCode = document.getElementById("js-code");
	navigator.clipboard
		.writeText(jsCode.textContent)
		.then(() => console.log("Text copied to clipboard"))
		.catch((err) => console.log("Error in copying text: ", err));
}
