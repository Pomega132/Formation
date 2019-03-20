/**
 * Class Customer
 * @param {string} name
 */
var Customer = function (name) {
    var _customerId = Math.floor(Math.random() * 1000);
    var _customerName = name;

    this.Get_CustomerId = function () {
        return _customerId;
    }

    this.Get_CustomerName = function () {
        return _customerName;
    }

    this.Set_CustomerName = function (newName) {
        _customerName = newName;
    }

    this.ToString = function () {
        return _customerName + " - " + _customerId;
    }

    /**
     * Transforme le Custommer en Balise li jQuery.
     */
    this.ToLI = function () {
        // var balise = document.createElement("li");
        // balise.classList.add("list-group-item");
        // balise.innerText = this.ToString();
        // return balise;
        return $("<li></li>").addClass("list-group-item").text(this.ToString());
    }
}

/**
 * @type {Array<Customer>}
 */
var customers = new Array();

$(document).ready(function () {
    $("#btn").click(AddClient);
});

function AddClient(e) {
    var clientIdField = $("#custId");
    var clientNameField = $("#custName");
    var clientName = "";

    if (clientNameField.length == 1) {
        clientName = Parse(clientNameField.val());

        var customer = new Customer(clientName);

        clientIdField.val(customer.Get_CustomerId());
        clientNameField.val(customer.ToString());

        customers.push(customer);
        BindDatas();
    } else
        alert("Impossible de récupéré le champs du nom du client.");
}

/**
 * Découpe le nom du client.
 * @param {string} clientName
 */
function Parse(clientName) {
    return clientName.split(" - ")[0];
}

function BindDatas() {
    var list = $("#listCust");
    var compteur = $("#nbCust");

    if (list.length == 1 && compteur.length == 1) {
        compteur.text(customers.length);

        list.html("");

        customers.forEach((customer) => list.append(customer.ToLI()));
    } else
        alert("Impossible de récupéré la liste des clients et/ou le compteur de client.");
}