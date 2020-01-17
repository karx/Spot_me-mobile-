var number = Math.floor(Math.random() * 8888) + 1111;
document.getElementById('connection_code').innerHTML = number;
function perform_vibration() {
    // if (servercall == 1) {
        window.navigator.vibrate(1000);
    // } else if (servercall == 0) {
    //     window.navigator.vibrate([1000, 1000, 1000]);
    // } else {
    //     document.write('value is null');
    // }
}

var ID = function() {
    // Math.random should be unique because of its seeding algorithm.
    // Convert it to base 36 (numbers + letters), and grab the first 9 characters
    // after the decimal.
    return (
      "_" +
      Math.random()
        .toString(36)
        .substr(2, 9)
    );
  };
  var client = new Paho.Client(
    "api.akriya.co.in",
    8084,
    `clientId-spot-mobile-${ID}`
  );
  
  // set callback handlers
  client.onConnectionLost = onConnectionLost;
  client.onMessageArrived = onMessageArrived;
  
  // connect the client
  client.connect({ onSuccess: onConnect });
  
  // called when the client connects
  function onConnect() {
    // Once a connection has been made, make a subscription and send a message.
    console.log("onConnect");
    client.subscribe(`spot-me/${number}/connected`);
    client.subscribe(`spot-me/${number}/detected`);
    let message = new Paho.Message("Hello");
    message.destinationName = `spot-me/${number}/detected`;
    client.send(message);
  }
  
  // called when the client loses its connection
  function onConnectionLost(responseObject) {
    if (responseObject.errorCode !== 0) {
      console.log("onConnectionLost:" + responseObject.errorMessage);
    }
  }
  
  // called when a message arrives
  function onMessageArrived(message) {
      perform_vibration();
    console.log("onMessageArrived:" + message.payloadString);
  }
  
  