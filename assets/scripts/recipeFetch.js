var mealPlans = ["breakfast", "lunch", "dinner"];

//object that shows the options in select2
var foodPreferences = {
    fruits: ["apple", "banana", "pomegranate", "lemon", "orange", "grapes", "strawberry", "blueberries", "nectarine", "grapefruit", "kiwi", "pineapple", "mango"],
    veggies: ["kale", "spinach", "carrots", "lettuce", "broccoli", "brussels sprouts", "asparagus", "tomato", "onion"],
    dairy: ["milk", "yogurt", "cheese"],
    legumes: ["black beans", "soybeans", "garbanzo"],
    nuts: ["walnuts", "almonds", "peanuts", "pecans"],
    protein: ["fish", "chicken", "meat", "ham", "sausages", "eggs"],
    cereals: ["bread", "oatmeal", "tortilla", "rice", "potato", "corn"]
};

//formula to calculate calories for weightloss
function calculateCaloriesFromWeight() {
    var weight = userInfo["weight"];
    var totalCalories = weight * 22;
    return totalCalories;
}

//formula to calculate bmi, which we will place the value on high charts
function calculateBMI() {
    var weight = userInfo["weight"];
    var height = userInfo["height"];
    var BMI = weight / Math.pow(height, 2);
    return BMI;
}

//formula to calculate desirable weight
function desirableWeight() {
    var desirableWeight = userInfo["desirable-weight"];
    var weight = userInfo["weight"];
    var step1 = weight - desirableWeight;
    var step2 = step1 * 0.32;
    var DW = step2 + desirableWeight;
    return DW;
}

//formula to divide total calories per meal 
function calculateCaloriesDistribution() {
    var totalCalories = calculateCaloriesFromWeight();
    var caloriesDistribution = {
        //40%
        breakfast: Math.floor(totalCalories * 0.4),
        //40%
        lunch: Math.floor(totalCalories * 0.4),
        //20%
        dinner: Math.floor(totalCalories * 0.2)
    };

    return caloriesDistribution;
}

//formula to get meals by the % stated 
function fetchAllMeals() {
    var caloriesDistribution = calculateCaloriesDistribution();
    //depends on the meal, it will bring back breakfast, lunch, dinner key with calories {breakfast:40% translated to kcal}
    var requests = Object.keys(caloriesDistribution).map((key) => {
        return fetchFoodByCalories(key, caloriesDistribution[key]);
    });
    //when we get the calories distribution from user input we continue process
    $.when.apply(this, requests).done(processResponses);
}

function fetchFoodByCalories(mealPlan, calories) {
    var apiID = "062de3a6";
    var apiKey = "5df6e678be46c5c92b95ab6508fdcb41";
    var queryURL = `https://api.edamam.com/diet`
    var planSelections = foodChoices[mealPlan];
    return $.ajax({
        url: queryURL,
        method: "GET",
        data: {
            //show recipies from foods from the object selected from select2
            q: planSelections.join(","),
            app_id: apiID,
            app_key: apiKey,
            calories: calories,
            //limit to 7 recipies
            from: 0,
            to: 7
        }
    });
}

//for each meal, we have a percentage, that will bring the calories according to it
function getSelectionsFromPlan(mealPlan) {
    //gets from each class of meal, the data they selected from the select2
    var planSelections = $(`.${mealPlan}`).select2("data");
    //i need an array of foods to get the info for the query search
    var selections = planSelections.map((selection) => {
        return selection.id;
    });
    saveToSessionStorage(mealPlan, selections);
    return selections;
}

function processResponses(breakfastResponse, lunchResponse, dinnerResponse) {
    var responsesArray = [breakfastResponse, lunchResponse, dinnerResponse];
    //returns array with response 
    responsesArray.map((response, index) => { processReponse(response[0], index); });
}

function processReponse(response, index) {
    var mealPlan = mealPlans[index];
    $(`#${mealPlan}Div`).empty();
    var mealPlanDivider = $("<h1 class='card property2'>").text(mealPlan);
    $(`#${mealPlan}Div`).append(mealPlanDivider);
    var hits = response.hits;
    hits.map((hit) => {
        buildFoodInformation(hit, mealPlan);
    });
}

//displayed info from the query 
function buildFoodInformation(hit, mealPlan) {
    var recipeContainer = $("<div class='recipeContainer card-body'>");
    var recipieRow = $("<div class='recipeRow'>");
    var label = $("<h3>").text(hit.recipe.label);
    var image = $("<img>").attr("src", hit.recipe.image);
    var ingredients = $("<p>").text(hit.recipe.ingredientLines);
    var caloriesLabel = $("<p>").text(hit.recipe.totalNutrients.ENERC_KCAL.label + " " + hit.recipe.totalNutrients.ENERC_KCAL.quantity +  " " + hit.recipe.totalNutrients.ENERC_KCAL.unit);
    var fatLabel = $("<p>").text(hit.recipe.totalNutrients.FAT.label + " " + hit.recipe.totalNutrients.FAT.quantity + " " + hit.recipe.totalNutrients.FAT.unit);
    var carbsLabel = $("<p>").text(hit.recipe.totalNutrients.CHOCDF.label + " " + hit.recipe.totalNutrients.CHOCDF.quantity   + " " + hit.recipe.totalNutrients.CHOCDF.unit);
    var proteinLabel = $("<p>").text(hit.recipe.totalNutrients.PROCNT.label  + " " + hit.recipe.totalNutrients.PROCNT.quantity  + " " + hit.recipe.totalNutrients.PROCNT.unit);
    
    recipeContainer.append(label, image, ingredients, caloriesLabel, fatLabel, carbsLabel, proteinLabel);
    $(`#${mealPlan}Div`).append(recipeContainer);
}
