const writeError = (serviceTitle?: string, functionName?: string, errorMessage?: string): void => {
	const title = serviceTitle?.toUpperCase();
	const name = functionName?.toUpperCase();
	const message = errorMessage;

	const style = {
		label: `font-weight: bold;`,
		pipe: `font-weight: bold;`,
		title: `font-style: italic; color: #FFFF00;`,
		name: `color: #1a73e8;`,
		message: `color: #FF0000;`,
	};

	console.log(
		`%cSERVICE: %c${title} %c| %cFUNCTION: %c${name} %c| %cERROR: %c${message}`,
		// SERVICE TITLE
		`${style.label}`,
		`${style.title}`,
		`${style.pipe}`,

		// FUNCTION NAME
		`${style.label}`,
		`${style.name}`,
		`${style.pipe}`,

		// ERROR MESSAGE
		`${style.label}`,
		`${style.message}`
	);
};

const logger = { writeError };
export default logger;
