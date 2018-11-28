var userInfo = {
    get: function(key) {
        return this[key];
    }
};

$(document).ready(function () {
    $("#nextButton").click(validateInputs);
});


function validateInputs(eventInfo) {
    eventInfo.preventDefault();
    var areInputsValid = true;
    //check if inputs are empty if they are, red flag
    $("#clientsForm input").each((index, input) => {
        var inputValue = $(input).val().trim();
        userInfo[input.name] = inputValue;
        if (!inputValue) {
            $(input).css('border', 'solid 5px red');
            areInputsValid = false;
        }
    });
    if (areInputsValid) {
        $("#clientsForm").hide();
        $(".food-preferences-container").show();
        buildMealSelects();
    };
}

/*
//view of page 
//first show inputs
//click next show checkboxes
//click done show results (1 highcharts, 2 recipe, 3 video playlist on youtube, 4 recommendations)
*/