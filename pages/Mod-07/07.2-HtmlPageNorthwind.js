/// <reference path="../../scripts/jquery-1.10.2.js" />

//MODELE - ENTITE (= TABLE DB)
var Customer = function (customerID, companyName) {
    this.CustomerID = customerID,
        this.CompanyName = companyName
}

var Orders = function (orderID, shipCity, shipCountry) {
    this.OrderID = orderID;
    this.ShipCity = shipCity;
    this.ShipCountry = shipCountry;
}

//Tableau de Customers
var customerList = [];

//Action 1 : ? DOM
$(document).ready(function () {

    //Action 2 et 3 : Abonnement
    // et Appel au service Northwind.svc (Customers)
    $("#btnCallAjax").click(CallAjaxCustomers);

    //Action 4 : Abonnement à la sélection d'un client (ID)
    $("#CustomerList").change(CallAjaxOrdersForClient);

})

function CallAjaxCustomers() {
    //Action 1 : appel AJAX via jQuery pour l'affichage des Customers
    var url = "https://services.odata.org/V3/Northwind/Northwind.svc/Customers";
    var option = {
        dataType: "json",
        success: SuccessGetCustomers,
        error: console.log
    };

    $.ajax(url, option);
}

function CallAjaxOrdersForClient(event) {
    var customerid = event.currentTarget.value;

    if (customerid != "-1") {
        //Action 1 : appel AJAX via jQuery
        var url = "https://services.odata.org/V3/Northwind/Northwind.svc/Customers('" + customerid
            + "')/Orders?$select=OrderID,ShipCity,ShipCountry";
        var option = {
            dataType: "json",
            success: function (data) {
                try {
                    /**
                     * @type {Array<Orders>}
                     */
                    var datas = data.value;

                    $("#customer").text(datas.length + " commanges pour " + customerid).show();
                    var list = $("#OrderList");
                    list.empty();

                    $.each(datas, function (key, value) {
                        var text = "OrderID : " + value.OrderID + " - ShipCity " + value.ShipCity + " - ShipCountry " + value.ShipCountry;
                        list.append("<li class='list-group-item'>" + text + "</li>");
                    })
                } catch (error) {
                    console.log(error);
                }
            },
            error: console.log
        };

        $.ajax(url, option);
    } else {
        $("#customer").hide();
        $("#OrderList").empty();
    }
}

function SuccessGetCustomers(data) {
    try {
        var select = $("#CustomerList");

        select.empty();

        select.append("<option value='-1'>Séléctionnez un client...</option>");

        $.each(data.value, function (key, value) {
            $("<option value='" + value.CustomerID + "'>" + value.ContactName + "</option>").appendTo(select);
        });
    } catch (error) {
        console.log(error);
    }
}