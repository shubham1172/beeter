function textAreaOnFocus(x){
  x.setAttribute("rows", 5)
  document.getElementById("beet_button").style.display = ""
}

function textAreaOnBlur(x){
  if (x.value == "") {
    x.setAttribute("rows", 1)
    document.getElementById("beet_button").style.display = "none"
  }
}

function likePressed(e){
  var beet_id = e.id.split("_")[0]
  var likeCounter = document.getElementById(`${beet_id}_like_count`) 
  url = `/beets/like/${beet_id}`
  fetch(url)
    .then(function(response){
      if (response.status !== 200){
        console.log(`Error with ${url}`)
        return
      }
      /** update the counter and icon */
      var curr = e.children[0].getAttribute('data-prefix')
      if (curr == "far"){
        e.children[0].setAttribute('data-prefix', 'fas')
        likeCounter.innerHTML = parseInt(likeCounter.innerHTML) + 1
      } else {
        e.children[0].setAttribute('data-prefix', 'far')
        likeCounter.innerHTML = parseInt(likeCounter.innerHTML) - 1
      }
    })
    .catch(function(err){
      console.log(err)
    })
}

function getTimeDifference(date){
  var curr = new Date()
  var old = new Date(date)
  diff = (curr.getTime() - old.getTime())/(60*1000)
  if (diff/(60*24*365) > 1)
      return Math.round(diff/(60*24*365)) + "y" // years
  else if (diff/(60*24*30) > 1)
      return Math.round(diff/(60*24*30)) + "m"  // months
  else if (diff/(60*24) > 1)
      return Math.round(diff/(60*24)) + "d"     // days
  else if (diff/60 > 1)
      return Math.round(diff/60) + "h"          // hours
  else
      return Math.round(diff) + "m"             // months
}

window.onload = function(){
  var beets = document.getElementsByClassName('timestamp')
  for(var i = 0; i < beets.length; i++){
    beets[i].innerHTML = getTimeDifference(beets[i].innerHTML)
  }
}