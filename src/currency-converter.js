// This file will contain the primary logic for the currency conversion program.
// To run the program use the `node` command followed by the name of this file.
// ie. `node currency-converter.js`.

const { isAmountInvalid, isCurrencyInvalid } = require("./validator-function");

// This file has been split up into several sections, each of which focuses on a
// portion of the program. Completing each of these sections in order should result
// in a functional, testable program. However, please free to approach the problem
// differently. There are many paths and approaches that result in a perfectly
// valid finished product.

// --------------------------------------------------
// Step 1: Capture user input
// --------------------------------------------------
// In this step we will capture the command line  information supplied by the user.

// We will store each piece of information in a dedicated variable for later use.

const amount = process.argv[2];
const initialCurrency = process.argv[3];
const targetCurrency = process.argv[4];

console.log("Amount :", amount ," ,Initial currency :", initialCurrency, " ,Target currency :", targetCurrency);

// --------------------------------------------------
// Step 2: Validate user input
// --------------------------------------------------
// Next we will ensure that the user has provided all of the require information.

// If any of the required information is missing, display a meaningful message
// and exit the program.


if (isAmountInvalid(amount)){
    console.error("Oops... the amount must be greater than 0. Received :", amount);
    process.exit;
}
if (isCurrencyInvalid(initialCurrency)){
    console.error("Oops... You must provide a value for initial currency. Received :", amount);
    process.exit;
}
if (isCurrencyInvalid(targetCurrency)){
    console.error("Oops... You must provide a value for target currency. Received :", amount);
    process.exit;
}

// --------------------------------------------------
// Step 3: Define currency conversion rates
// --------------------------------------------------
// Here we will define which currency conversions are supported, as well as the
// rates between each currency. We will capture this information as an object
// and store it in dedicated varaible for later use.

// We will use the official currency abbreviation for each currency (eg. USD, CAD, etc.).

// The conversion rates do not have to be accurate, athough this resource contains
// up-to-date rate information: https://www.xe.com/
var currencyRate = {
                'USD': {'CAD': 1.3, 'EUR': 0.02}, 
                'CAD': {'USD': 0.8, 'EUR': 0.7}, 
                'EUR': {'USD': 1.1, 'CAD': 1.4}
            };
// --------------------------------------------------
// Step 4: Ensure that a conversion rate exists
// --------------------------------------------------
// Since it is possible for the user to supply invalid or unsupported currencies,
// we must check for the presence of a rate before attempting to convert.

// If the user supplies an invalid initial or target currency, display a meaningful
// warning message and exit the program.
const supportedCurrencies= [
    'USD',
    'CAD',
    'EUR'
];
if (supportedCurrencies.includes(initialCurrency.toUpperCase()) === false){
    console.error("Sorry, the initial currency provided is unsupported. The supported currencies are :", supportedCurrencies);
    process.exit;
}
if (supportedCurrencies.includes(targetCurrency.toUpperCase()) === false){
    console.error("Sorry, the target currency provided is unsupported. The supported currencies are :", supportedCurrencies);
    process.exit;
}

// --------------------------------------------------
// Step 5: Perform conversion
// --------------------------------------------------
// At this point we've confirmed that the user has supplied all of the necessary
// information, and that a rate exists for each of the currencies.

// Now we will compute the rate, apply it to the amount, and capture the result.
let convertedAmount;

if (supportedCurrencies.includes(initialCurrency.toUpperCase()) && supportedCurrencies.includes(targetCurrency.toUpperCase())){
    convertCurrency(initialCurrency.toUpperCase(), targetCurrency.toUpperCase(), amount);
}

function convertCurrency(initialCurrency, targetCurrency, amount) {
try{
    if (initialCurrency === targetCurrency){
        convertedAmount = amount;
    } else {
        convertedAmount = amount * currencyRate[initialCurrency][targetCurrency];
  }
  }catch(err) {
    convertedAmount = amount * (1 / currencyRate[targetCurrency][initialCurrency]);
  }


    console.log("Converted amount is :",convertedAmount);

// --------------------------------------------------
// Step 6: Display results
// --------------------------------------------------
// Finally we will display the result as part of a meaningful message.

// This message should also include the original amount and currency information
// supplied by the user.
    console.log(`You submitted ${amount} ${initialCurrency}`);
    console.log(`This is equal to ${convertedAmount} ${targetCurrency}`);
}