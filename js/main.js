console.log("Welcome to JSON to Interface!");

function jsonToInterface() {
	const json = document.getElementById("json");
	const nameInterface = document.getElementById("name-interface").value;
	const obj = JSON.parse(json.value);
	let keyValues = "";

	for (const key in obj) {
		const value = obj[key];
		const type = typeof value;

		if (type === "string") {
			keyValues += `  ${key}: string;\n`;
		} else if (type === "number") {
			keyValues += `  ${key}: number;\n`;
		} else if (type === "boolean") {
			keyValues += `  ${key}: boolean;\n`;
		} else if (type === "object") {
			keyValues += `  ${key}: object;\n`;
		}
	}

	let interface = `export interface ${nameInterface} {\n${keyValues}}`;

	document.getElementById("js-code").innerHTML = interface;
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
	console.log(jsCode);
	navigator.clipboard
		.writeText(jsCode.textContent )
		.then(() => console.log("Text copied to clipboard"))
		.catch((err) => console.log("Error in copying text: ", err));
}
