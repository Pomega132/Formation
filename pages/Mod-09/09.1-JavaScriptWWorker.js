function MethodAsync(number) {
    try {
        var num = parseInt(number);
        var worker = new Worker("../../Scripts/fib2-worker1.js");
        worker.onmessage = messageHandler;
        worker.onerror = errorHandler;
        worker.postMessage(num);
    } catch (e) {
        console.log(e).message;
    }
}

