function saveToSessionStorage(key, value) {
    //make the value a string 
    var stringifyValue = JSON.stringify(value);
    // Store in the session storage 
    sessionStorage.setItem(key, stringifyValue);
};

function getFromSessionStorage(key) {
    var stringifyValue = sessionStorage.getItem(key);
    return JSON.parse(stringifyValue);
}
