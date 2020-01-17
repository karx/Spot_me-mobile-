var number = Math.floor(Math.random() * 8888) + 1111;
document.getElementById('connection_code').innerHTML = number + "please input this number in your spot me devise";
function perform_vibration() {
    if (servercall == 1) {
        window.navigator.vibrate(1000);
    } else if (servercall == 0) {
        window.navigator.vibrate([1000, 1000, 1000]);
    } else {
        document.write('value is null');
    }
}
