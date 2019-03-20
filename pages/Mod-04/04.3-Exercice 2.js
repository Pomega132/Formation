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

    this.ToHTMLLIElement = function () {
        var balise = document.createElement("li");
        balise.classList.add("list-group-item");
        balise.innerText = this.ToString();
        return balise;
    }
}

var customers = new Array();

$(document).ready(function () {
    document.getElementById("btn").addEventListener("click", AddClient);
});

function AddClient(e) {
    /**
     * @type {HTMLInputElement}
     */
    var clientIdField = document.getElementById("custId");
    /**
     * @type {HTMLInputElement}
     */
    var clientNameField = document.getElementById("custName");
    /**
     * @type {string}
     */
    var clientName = "";

    if (clientNameField != null) {
        clientName = Parse(clientNameField.value);

        var customer = new Customer(clientName);

        clientIdField.value = customer.Get_CustomerId();
        clientNameField.value = customer.ToString();

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
    var list = document.getElementById("listCust");
    var compteur = document.getElementById("nbCust");

    if (list != null && compteur != null) {
        compteur.innerText = customers.length;

        list.innerHTML = "";

        customers.forEach((customer) => list.append(customer.ToHTMLLIElement()));
    } else
        alert("Impossible de récupéré la liste des clients et/ou le compteur de client.");
}