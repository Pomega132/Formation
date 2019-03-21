/// <reference path="../../scripts/jquery-1.10.2.js" />

$(function () {
    $("#Bt_Create").click(CreateDataBase);
    $("#Bt_Add").click(AddStage);
    $("#Bt_NbStage").click(CountStages);
    $("#Bt_DelStage").click(DeleteStage);
    $("#Bt_DelDB").click(function () { indexedDB.deleteDatabase("Stages"); });
});

/**
 *
 * @param {Event} event
 */
function CreateDataBase(event) {
    var openRequest = indexedDB.open("Stages");

    openRequest.onupgradeneeded = CreateTableStage;
}

/**
 *
 * @param {Event} event
 */
function CreateTableStage(event) {
    try {
        var bdd = event.target.result;

        var table = bdd.createObjectStore("Stages", {
            //keyPath: 'id',
            autoIncrement: true
        });

        //table.createIndex("indexStage", "id", { unique: true });

        $("#result").html("Table créé");
    } catch (e) {
        console.log("Erreur : " + e.message);
    }
}

/**
 *
 * @param {Event} event
 */
function AddStage(event) {
    var openRequest = indexedDB.open("Stages");

    openRequest.onsuccess = IBDAddStage;
}

/**
 *
 * @param {Event} event
 */
function IBDAddStage(event) {
    /**
     * @type {IDBDatabase}
     */
    var db = event.target.result;

    try {
        var transaction = db.transaction("Stages", "readwrite");

        transaction.onerror = function (error) {

        };
        transaction.oncomplete = function (event) {


        };

        var table = transaction.objectStore("Stages");

        table.add({ nom: "Test", image: ":p" });
    } catch (e) {
        console.log(e.message);
    }
}

/**
 *
 * @param {Event} event
 */
function CountStages(event) {
    var openRequest = indexedDB.open("Stages");

    openRequest.onsuccess = IBDCountStages;
}

function IBDCountStages(event) {
    /**
     * @type {IDBDatabase}
     */
    var db = event.target.result;

    try {
        var transaction = db.transaction("Stages", "readwrite");

        var table = transaction.objectStore("Stages");

        table.count().onsuccess = function (event) {

            $("#result").text(this.result);
        };
    } catch (e) {
        console.log(e.message);
    }
}

function DeleteStage(event) {

}