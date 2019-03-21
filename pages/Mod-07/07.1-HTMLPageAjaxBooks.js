/// <reference path="../../scripts/jquery-1.10.2.js"/>

$(document).ready(function () {
    var option = {
        success: SuccessGetModel,
        error: ErrorGetModel,
        cache: false
    }

    $.ajax("/models/books.html", option)
});

function SuccessGetModel(data) {
    try {
        var elementByLine = 3;

        var elements = $(data).filter("div").addClass("dcell")

        for (let i = 0; i < elements.length / elementByLine; i++) {
            elements.slice(elementByLine * i, elementByLine + elementByLine * i).appendTo("#row" + (i + 1));
        }
    } catch (e) {
        console.log(e);
    }
}

function ErrorGetModel(error) {
    console.log(error);
}