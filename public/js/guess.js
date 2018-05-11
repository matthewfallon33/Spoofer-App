const btn = document.querySelector("#btn");
const cboxes = document.querySelectorAll("input[type='checkbox']");

btn.addEventListener("click", (e) => {
    // so we wanna compare our current guesses with the real truths
  // so we can populate our data with our own object but we're gonna
  // need to pull an object from the server to match it width
  // yip, ajax request
  // think about request parameters versus session
  // and figure out why the session disappears when refreshed
  var guesses = {
    q1: cboxes[0].checked,
    q2: cboxes[1].checked,
    q3: cboxes[2].checked
  }
  console.log(guesses);
  axios.post('/compare', guesses)
  .then(function(response){
    console.log(response);
  });
});
