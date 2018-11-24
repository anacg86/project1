//user input
$(document).ready(function () {
    $("#nextButton").click(validateInputs);
});

function validateInputs(eventInfo) {
    eventInfo.preventDefault();
    var areInputsValid = true;
    //check if inputs are empty if they are, red flag
    $("input").each((index, input) => {
        var inputValue = $(input).val().trim();
        if (!inputValue) {
            $(input).css('border', 'solid 5px red');
            areInputsValid = false;
        }
    });
    if (areInputsValid) {
        calculateCalories();
    };

//con la formula mia comparo la data del input 
//peso por 22
//formula para calcular las calorias
function calculateCalories () {
    var weight = $("#weightData").val();
    var totalCalories = weight * 22; 
    console.log("Your total calorie intake is: " + totalCalories + "kcal");
};

// ajax
//traer la informacion basada en la comparacion de la formula 