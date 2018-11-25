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
    if (!areInputsValid) {
        fetchAllMeals();
    };
}

//con la formula mia comparo la data del input 
//peso por 22
//formula para calcular las calorias
function calculateCaloriesFromWeight() {
    var weight = $("#weightData").val();
    var totalCalories = weight * 22;
    return totalCalories;
};

function calculateBMI() {
    var weight = $("#weightData").val();
    var height = $("#heightData").val();
    var BMI = weight / Math.pow(height, 2);
    return BMI;
}

function calculateCaloriesDistribution() {
    var totalCalories = calculateCaloriesFromWeight();
    var caloriesDistribution = {
        breakfastCalories: Math.floor(totalCalories * 0.4),
        lunchCalories: Math.floor(totalCalories * 0.4),
        dinnerCalories: Math.floor(totalCalories * 0.2) 
    };

    return caloriesDistribution;
}

function fetchAllMeals() {
    var caloriesDistribution = calculateCaloriesDistribution();
    var requests = Object.keys(caloriesDistribution).map((key) => {
        return fetchFoodByCalories(caloriesDistribution[key]);
    });

    $.when.apply(this, requests).done(processResponses);
}

function fetchFoodByCalories(calories) {
    var apiID = "062de3a6";
    var apiKey = "5df6e678be46c5c92b95ab6508fdcb41";
    var queryURL = `https://api.edamam.com/diet?q=chicken&app_id=${apiID}&app_key=${apiKey}&calories=${calories}`
    return $.ajax({
        url: queryURL,
        method: "GET"
    });
}

function processResponses(breakfastResponse, lunchResponse, dinnerResponse) {
    var responsesArray = [breakfastResponse, lunchResponse, dinnerResponse];
    responsesArray.map((response) => { processReponse(response[0]); });
}

function processReponse(response) {
    console.log(response);
}