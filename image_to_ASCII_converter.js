const currentMode = "DEV";
const fs = require("fs");

function hookDevModeErrors() {
	const originalError = console.error.bind(console);

	const devErrorPrint = () => {
		process.stdout.write(fs.readFileSync("error-art.ans", "utf8"));
		process.stderr.write(
			"\n\x1b[31m AAAYYYYYOOOOOOOOOOOOOO!!!!!!!!! WHO LET BRO COOK!? \x1b[0m\n\n",
		);
	};

	console.error = (...args) => {
		if (currentMode === "DEV") {
			devErrorPrint();
		}

		return originalError(...args);
	};

	// Catch uncaught exceptions
	process.on("uncaughtException", (err) => {
		if (currentMode === "DEV") {
			devErrorPrint();
		}
		console.log("Uncaught Exception:", err.message);
		// Optional: exit process to prevent undefined behavior
		// process.exit(1);
	});

	// Catch unhandled promise rejections
	process.on("unhandledRejection", (reason, promise) => {
		console.log("Unhandled Rejection at:", promise, "reason:", reason);
		// process.exit(1);
	});
}

hookDevModeErrors();

console.error("Error testing!");

// setTimeout(() => {
// 	throw new TypeError("This is a test!");
// }, 1000);
// Promise.reject(x);
