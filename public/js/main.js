let main = document.querySelector(".main");
let checkboxes = main.querySelectorAll(".checkbox");
let labelData = main.querySelectorAll(".container");

labelData.forEach((label) => {
  label.addEventListener("click", (e) => {
    // console.log(label.textContent.trim());
  });
});

// some of these are more test scripts doesn't actually do anything as far as data is concerned

function getCheckBoxData(){
  let ticked = [];
  for(var i = 0; i < checkboxes.length; i++){

    if(checkboxes[i].checked !== false){
      ticked.push(labelData[i].textContent.trim());
    }
  }
  return ticked;

}

// maybe delete some of this
