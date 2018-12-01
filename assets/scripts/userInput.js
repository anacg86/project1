//create object with user's info
var userInfo = {

};

$(document).ready(function () {
    $(".food-preferences-container").hide();
    $("#calculate").hide();
    $.fn.select2.defaults.set("theme", "classic");
    $("#calculate").click(calculatePlan);
    $("#submitBtn").click(validateInputs);
});


function validateInputs(eventInfo) {
    //prevent an error from happening 
    eventInfo.preventDefault();
    var areInputsValid = true;
    //check if inputs are empty if they are, red flag
    $("#clientsForm input").each((index, input) => {
        var inputValue = $(input).val().trim();
        userInfo[input.name] = inputValue;
        //if there's no value in the input, we place a red border 
        if (!inputValue) {
            $(input).css('border', 'solid 5px red');
            areInputsValid = false;
        }
    });
    //if inputs have a value, we save info into  to session storage, hide the client's form and show the food choice 
    if (areInputsValid) {
        saveToSessionStorage("userInfo", userInfo);
        $("#clientsForm").hide();
        $(".food-preferences-container").show();
        $("#calculate").show();
        //select2 library in which we show the food choices and the user selects from the options
        buildMealSelects();
    };
}

function calculatePlan() {
    //meals by %
    mealPlans.forEach((mealPlan) => {
        getSelectionsFromPlan(mealPlan);
    });
    //moves the html from user-input to user-wl-plan.html 
    window.location = 'user-wl-plan.html';
}

//select2 library in which we show the food choices and the user selects from the options
function buildMealSelects() {
    mealPlans.forEach((plan) => {
        var container = $("<div>");

        var select = $("<select>");
        select.attr("name", plan + "[]");
        select.attr("multiple", "multiple");
        select.addClass("meal-plan-select");
        select.addClass(plan);

        var optionGroups = buildOptionGroupFromFoodPreferences();
        select.append(optionGroups);

        var label = $("<label>");
        label.addClass("preferences-label");
        label.text(plan);

        container.append(label);
        container.append(select);
        //i need to append the container to the card-body somehow
        $(".food-preferences-container").append(container);
        select.select2({
            placeholder: 'Select an option',
            allowClear: true
        });
    });
}

function buildOptionGroupFromFoodPreferences() {
    var optionGroups = Object.keys(foodPreferences).map((foodType) => {
        var foodArray = foodPreferences[foodType];

        var optionGroup = $("<optgroup>");
        optionGroup.attr("label", foodType);

        var options = buildOptionsFromFoodPreferences(foodArray);
        optionGroup.append(options);

        return optionGroup;
    });
    return optionGroups;
}

function buildOptionsFromFoodPreferences(foodTypeArray) {
    var options = foodTypeArray.map(element => {
        var option = $("<option>");
        option.text(element);
        option.attr("value", element);
        return option;
    });
    return options;
}

/*
//view of page 
//first show inputs
//click next show checkboxes
//click done show results (1 highcharts, 2 recipe, 3 video playlist on youtube, 4 recommendations)
*/