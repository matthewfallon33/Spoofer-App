let main = document.querySelector(".main");
let checkboxes = main.querySelectorAll(".checkbox");
let labelData = main.querySelectorAll(".container");

labelData.forEach((label) => {
  label.addEventListener("click", (e) => {
    console.log(label.textContent.trim());
  });
});

var choices = {
  1: true,
  2:false,
  3: false,
  4:false,
  5:true
};

function getCheckBoxData(){
  let ticked = [];
  for(var i = 0; i < checkboxes.length; i++){

    if(checkboxes[i].checked !== false){
      ticked.push(labelData[i].textContent.trim());
    }
  }
  return ticked;

}
