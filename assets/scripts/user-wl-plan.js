var userInfo;
var foodChoices = {
    breakfast: [],
    lunch: [],
    dinner: [],
};

$(document).ready(function () {
    userInfo = getFromSessionStorage("userInfo");
    //get object of foodchoices to bring from storage 
    foodChoices.breakfast = getFromSessionStorage("breakfast");
    foodChoices.lunch = getFromSessionStorage("lunch");
    foodChoices.dinner = getFromSessionStorage("dinner");
    fetchAllMeals();
});