const isAmountInvalid = (amount) => {
    return amount === undefined || amount<0;
} ;
const isCurrencyInvalid = (currency) => {
    return currency === undefined;
} ;

module.exports ={
    isAmountInvalid,
    isCurrencyInvalid
};