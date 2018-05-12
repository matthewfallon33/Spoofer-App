const btn = document.querySelector("#btn");
const cboxes = document.querySelectorAll("input[type='checkbox']");

btn.addEventListener("click", (e) => {
  console.log("clicked");
      var guesses = {
    q1: cboxes[0].checked,
    q2: cboxes[1].checked,
    q3: cboxes[2].checked
  }
    axios.post('/compare', guesses);
    window.location.reload();
//   .then(function(response){
// console.log(response);
//     });
});
