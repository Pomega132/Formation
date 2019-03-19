function SayHelloJS() {
    var el = document.getElementById('message');
    if (el != null) {
        el.innerText = "Hello World !";
        el.style.backgroundColor = "blue"
        el.style.color = "white";
    }
}

function AddListener() {
    var el = document.getElementById("btn");
    if (el != null)
        el.addEventListener("click", SayHelloJS);
}

window.onload = AddListener;