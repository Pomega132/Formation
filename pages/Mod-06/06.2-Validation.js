/// <reference path="../../scripts/jquery-1.9.1.js"/>
/// <reference path="../../scripts/jquery.validate.js"/>

$(document).ready(function () {


    $("#MyForm").validate({
        // Rules
        rules: {
            firstname: {
                required: true,
                minlength: 2
            },
            email: {
                required: true,
            },
            nombre: "required"
        },
        messages: {
            firstname: {
                required: "Champ obligatoire.",
                minlength: "Au moins 2 caractère."
            }
        },
        showErrors: function (errorMap, errorList) {
            $(errorList[0].element).parent().parent().removeClass("has-success").addClass("has-error");
            $(element).parent().remove(".help-block");
            //     // error.addClass("help-block");
            $(errorList[0].element).parent().append("<span class='help-block'>" + error + "</span>");
        },
        success: function (event, element) {
            $(element).parent().parent().removeClass("has-error").addClass("has-success");
        },

    });
});