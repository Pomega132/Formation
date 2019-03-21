/// <reference path="../../scripts/jquery-1.10.2.js" />

var Article = function (name, quantity) {
    var _Name = name;
    var _Quantity = quantity;

    function Get_Name() {
        return _Name;
    }

    function Get_Quantity() {
        return _Quantity;
    }

    function Set_Quantity(value) {
        _Quantity = value;
    }
}

$(document).ready(function () {


    //Images opacity
    $(".dcell>img").css('opacity', '0.4');
    //Abonnements mouseevents et click
    $('.dcell>img')
        .mouseenter(MouseEnterHandler)
        .mouseout(MouseOutHandler)
        .click(ClickHandler)
        .contextmenu(ContextMenuHandler);

    //Abonnement à la perte de focus et au changement dans la TextBox
    //Vérifie si une commande est passée
    $(".dcell>input").change(CommandeHasChange);

    //Abonnement au focus : seléctionner le nombre déjà présent



    //Tester la valeur des TextBox (imput)


    //Abonnement au click du bouton Order
    //Affichage des commandes



    //Objet JavaScript : représente notre modèle de commande
    var CommandeObject = function (name, tot) {
        this.name = name,
            this.tot = tot
    }

    //Tableau des commandes
    /**
     * @type {Array<Article>}
     */
    var Commandes = [];
    //Détail de la commande (itérer chaque input et récupérer le label associé)
    function CommandeHasChange(event) {
        var article = $(this).siblings("label").text();

        if ($(this).val() > 1)
            AddCommande(article, $(this).val());
        else
            RemoveCommande(article);
    }

    function AddCommande(articleName, quantity) {
        var article = Commandes.find(function (a) {
            a.Get_Name() == articleName
        });

        if (article)
            article.Set_Quantity(quantity);
        else
            Commandes.push(new Article(articleName, quantity));
        $("#btnOrder").removeClass("disabled");
    }

    function RemoveCommande(articleName) {
        var article = Commandes.find(function (article) {
            article.Get_Name() == articleName
        });

        if (article)
            Commandes.pop(article);

        if (Commandes.length == 0)
            $("#btnOrder").addClass("disabled");
    }

    //MouseClick
    //Incrémenter la commande
    //Déclencher l'événement blur afin de vérifier si le bouton order peut être activé
    var i = 0;


    //MouseEnterHandler
    function MouseEnterHandler() {
        $(this).css('opacity', '1').addClass('anim');
        $(this).siblings('input').css('background-color', 'orange');
        $('#info').html('Consultation du produit : '
            + $(this).siblings('label').text()
            + ' du rayon '
            + $(this).parents('.drow').attr('id')
            //+ $(this).parentsUntil('.dtable').attr('id')
            + ' avec une commande en cours de '
            + $(this).siblings('input').val()
        ).addClass('info');
        $('#infoGif').show();
    };
    //MouseOutHandler
    function MouseOutHandler() {
        $(this).css('opacity', '0.4').removeClass('anim');
        $(this).siblings('input').css('background-color', '');
        $('#info').empty().removeClass('info');
        $('#infoGif').hide();
        //Compteur des livres à zéro
        i = 0;
    };


    //Désactiver l'événement enter sur input afin de ne pas déclencher
    //l'événement click du bouton
    function ClickHandler(event) {
        $(this).siblings("input").val(Number($(this).siblings("input").val()) + 1).change();
    }

    /**
     *
     * @param {jQuery.Event} event
     */
    function ContextMenuHandler(event) {
        if ($(this).siblings("input").val() > 0)
            $(this).siblings("input").val(Number($(this).siblings("input").val()) - 1).change();

        event.preventDefault();
    }
});