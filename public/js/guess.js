const btn = document.querySelector("#btn");
const cboxes = document.querySelectorAll("input[type='checkbox']");
var socket = io();

window.onbeforeunload = function(e) {
  socket.disconnect();
};

btn.addEventListener("click", (e) => {
  console.log("clicked");
      var guesses = {
    q1: cboxes[0].checked,
    q2: cboxes[1].checked,
    q3: cboxes[2].checked
  }
    socket.emit("comparison", guesses);

});


// all the socket logic should come from here
