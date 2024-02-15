export default 
function generateRandomPassword() {
		function shuffleArray(array) {
			for (let i = array.length - 1; i > 0; i--) {
				const j = Math.floor(Math.random() * (i + 1));
				[array[i], array[j]] = [array[j], array[i]];
			}
			return array;
		}
		let letters = [
			"a",
			"b",
			"c",
			"d",
			"e",
			"f",
			"g",
			"h",
			"i",
			"j",
			"k",
			"l",
			"m",
			"n",
			"o",
			"p",
			"q",
			"r",
			"s",
			"t",
			"u",
			"v",
			"w",
			"x",
			"y",
			"z",
		];
		let signs = ["#", "$", "%", "!", "@", "^", "*", "(", ")", "&"];
		let password = [];

		for (let i = 0; i < 8; i++) {
			let random = Math.floor(Math.random() * 26);
			password.push(letters[random]);
		}
		let randomNumber = Math.floor(Math.random() * 10);
		password.push(randomNumber);

		let randomSign = signs[Math.floor(Math.random() * 10)];
		password.push(randomSign);

		password = shuffleArray(password);

		password = password.toString();

		let regex = /,/gi;
		password = password.replace(regex, "");

		return password;
	}