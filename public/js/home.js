function textAreaOnFocus(x){
  x.setAttribute("rows", 5)
  document.getElementById("beet_button").style.display = "";
}

function textAreaOnBlur(x){
  if (x.value == "") {
    x.setAttribute("rows", 1)
    document.getElementById("beet_button").style.display = "none";
  }
}