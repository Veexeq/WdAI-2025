const passwordMinLengthField = document.getElementById("password-min-length");
const passwordMaxLengthField = document.getElementById("password-max-length");
const capitalLettersCheckbox = document.getElementById("capital-letters");
const specialCharacters = document.getElementById("special-characters");
const generateButton = document.getElementById("generate-btn");

function validateData(data) {
    if (isNaN(data.minLength) || isNaN(data.maxLength)) return false;
    if (data.minLength < 8) return false;
    if (data.maxLength < data.minLength) return false;
    if (data.maxLength > 24) return false;
    return true;
}

function wrapData() {
    const data = {
        minLength: parseInt(passwordMinLengthField.value, 10),
        maxLength: parseInt(passwordMaxLengthField.value, 10),
        hasCapitalLetters: capitalLettersCheckbox.checked,
        hasSpecialCharacters: specialCharacters.checked,
    };

    return validateData(data) ? data : null;
}

function generateCharacterPool(data) {
    const lowercaseAlphabet = "abcdefghijklmnopqrstuvwxyz".split("");
    const uppercaseAlphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
    const specialAlphabet = "!@#$%&*".split("");

    let characterPool = [...lowercaseAlphabet];

    if (data.hasCapitalLetters) {
        characterPool = [...characterPool, ...uppercaseAlphabet];
    }
    if (data.hasSpecialCharacters) {
        characterPool = [...characterPool, ...specialAlphabet];
    }

    return characterPool;
}

function randint(lower, upper) {
    return Math.floor(lower + Math.random() * (upper - lower));
}

generateButton.addEventListener("click", () => {
    const data = wrapData();
    if (!data) {
        alert("Nieprawidłowy input");
        return;
    }

    const characterPool = generateCharacterPool(data);
    
    const poolSize = characterPool.length;
    let idx = randint(data.minLength, data.maxLength) - 1;
    let password = [];

    while (idx >= 0) {
        const poolIdx = randint(0, poolSize);
        password.push(characterPool[poolIdx]);
        idx -= 1;
    }

    alert("Wygenerowane hasło: " + password.join(''));

});
