/// <reference path="../../scripts/jquery-1.10.2.js" />


//méthode each de jQuery
$(document).ready(function () {

    //Action 1 : Images opacity

    //Action 2 : Abonnements des images du formulaire
    $(".dcell > img").mouseenter(MouseEnterHandler);
    $(".dcell > img").mouseout(MouseOutHandler);

    //Action 3 : coder le gestionnaire MouseEnter
    function MouseEnterHandler() {
        $(this).parent().addClass("selected");

        var info = $("#info");

        info.html("Consultation du produit : "
            + $(this).siblings("label").text().split(":")[0].trim()
            + " du rayon "
            + $(this).parents().attr("id")
            + " avec une commande en cours de "
            + $(this).siblings("input").val() );
        info.parent().show();
    };

    //Action 4 : coder le gestionnaire MouseOut
    function MouseOutHandler() {
        $(this).parent().removeClass("selected");
        $("#info").parent().hide();
    };
});