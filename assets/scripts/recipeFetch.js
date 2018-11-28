var mealPlans = ["breakfast", "lunch", "dinner"];

var foodPreferences = {
    fruits: ["apple", "banana", "pomegranate", "lemon", "orange", "grapes", "strawberry", "blueberries", "nectarine", "grapefruit", "kiwi", "pineapple", "mango"],
    veggies: ["kale", "spinach", "carrots", "lettuce", "broccoli", "brussels sprouts", "asparagus", "tomato", "onion"],
    dairy: ["milk", "yogurt", "cheese"],
    legumes: ["black beans", "soybeans", "garbanzo"],
    nuts: ["walnuts", "almonds", "peanuts", "pecans"],
    protein: ["fish", "chicken", "meat", "ham", "sausages", "eggs"],
    cereals: ["bread", "oatmeal", "tortilla", "rice", "potato", "corn"]
};

//user input
$(document).ready(function () {
    //start now button $(#startnow)
    $(".food-preferences-container").hide();
    $.fn.select2.defaults.set("theme", "classic");
    $("#calculate").click(calculatePlan);
});

function calculatePlan() {
    fetchAllMeals();
}

//formula to calculate calories
function calculateCaloriesFromWeight() {
    var weight = userInfo.get("weight");
    var totalCalories = weight * 22;
    return totalCalories;
}

//formula to calculate bmi, which we will place the value on high charts
function calculateBMI() {
    var weight = userInfo.get("weight");
    var height = userInfo.get("height");
    var BMI = weight / Math.pow(height, 2);
    return BMI;
}

//formula to divide total calories per meal 
function calculateCaloriesDistribution() {
    var totalCalories = calculateCaloriesFromWeight();
    var caloriesDistribution = {
        breakfast: Math.floor(totalCalories * 0.4),
        lunch: Math.floor(totalCalories * 0.4),
        dinner: Math.floor(totalCalories * 0.2)
    };

    return caloriesDistribution;
}

//formula to get meals by the % stated 
function fetchAllMeals() {
    var caloriesDistribution = calculateCaloriesDistribution();
    var requests = Object.keys(caloriesDistribution).map((key) => {
        return fetchFoodByCalories(key, caloriesDistribution[key]);
    });

    $.when.apply(this, requests).done(processResponses);
}

function fetchFoodByCalories(mealPlan, calories) {
    var apiID = "062de3a6";
    var apiKey = "5df6e678be46c5c92b95ab6508fdcb41";
    var queryURL = `https://api.edamam.com/diet`
    var planSelections = getSelectionsFromPlan(mealPlan);
    return $.ajax({
        url: queryURL,
        method: "GET",
        data: {
            q: planSelections.join(","),
            app_id: apiID,
            app_key: apiKey,
            calories: calories,
            from: 0,
            to: 7
        }
    });
}

function getSelectionsFromPlan(mealPlan) {
    var planSelections = $(`.${mealPlan}`).select2("data");
    return planSelections.map((selection) => {
        return selection.id
    });
}

function processResponses(breakfastResponse, lunchResponse, dinnerResponse) {
    var responsesArray = [breakfastResponse, lunchResponse, dinnerResponse];
    responsesArray.map((response, index) => { processReponse(response[0], index); });
}

function processReponse(response, index) {
    var mealPlan = mealPlans[index];
    $(`#${mealPlan}Div`).empty();

    var hits = response.hits;
    hits.map((hit) => {
        buildFoodInformation(hit, mealPlan);
    });
}

function buildFoodInformation(hit, mealPlan) {
    var label = $("<h1>").text(hit.recipe.label);
    var image = $("<img>").attr("src", hit.recipe.image);
    var ingredients = $("<p>").text(hit.recipe.ingredientLines);
    var caloriesLabel = $("<p>").text(hit.recipe.totalNutrients.ENERC_KCAL.label);
    var caloriesNumber = $("<p>").text(hit.recipe.totalNutrients.ENERC_KCAL.quantity);
    var caloriesUnit = $("<p>").text(hit.recipe.totalNutrients.ENERC_KCAL.unit);
    var fatLabel = $("<p>").text(hit.recipe.totalNutrients.FAT.label);
    var fatQuantity = $("<p>").text(hit.recipe.totalNutrients.FAT.quantity);
    var fatUnit = $("<p>").text(hit.recipe.totalNutrients.FAT.unit);
    var carbsLabel = $("<p>").text(hit.recipe.totalNutrients.CHOCDF.label);
    var carbsQuantity = $("<p>").text(hit.recipe.totalNutrients.CHOCDF.quantity);
    var carbsUnit = $("<p>").text(hit.recipe.totalNutrients.CHOCDF.unit);
    var proteinLabel = $("<p>").text(hit.recipe.totalNutrients.PROCNT.label);
    var proteinQuantity = $("<p>").text(hit.recipe.totalNutrients.PROCNT.quantity);
    var proteinUnit = $("<p>").text(hit.recipe.totalNutrients.PROCNT.unit);
    $(`#${mealPlan}Div`).append(label, image, ingredients, caloriesLabel, caloriesNumber, caloriesUnit, fatLabel, fatQuantity, fatUnit, carbsLabel, carbsQuantity, carbsUnit, proteinLabel, proteinQuantity, proteinUnit);
}

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
