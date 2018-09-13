const btn = document.querySelector("#btn");
const cboxes = document.querySelectorAll("input[type='checkbox']");
var socket = io();
var main = document.getElementsByClassName("main")[0];

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

socket.on("newColors", function(data) {
	console.log(data);
	// "rgb(0, 255, 0)"
	main.style.background = "rgb(" + data.red + ", " + data.green + ", " + data.blue + ")";
});

// all the socket logic should come from here
// just need to set the colors in js
