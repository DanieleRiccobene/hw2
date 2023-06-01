var numberElementHand = document.getElementById("numberHand");
var decrementButtonHand = document.getElementById("decrement-btn-hand");
var incrementButtonHand = document.getElementById("increment-btn-hand");
var nHand = document.getElementById("hand");



var numberHand = 0;

decrementButtonHand.addEventListener("click", function() {
  if (numberHand > 0) {
    numberHand--;
    numberElementHand.textContent = numberHand;
    nHand.value = numberHand;
  }
});

incrementButtonHand.addEventListener("click", function() {
  if (numberHand < 6) {
    numberHand++;
    numberElementHand.textContent = numberHand;
    nHand.value = numberHand;
  }
});

var numberElementHold = document.getElementById("numberHold");
var decrementButtonHold = document.getElementById("decrement-btn-hold");
var incrementButtonHold = document.getElementById("increment-btn-hold");
var nHold = document.getElementById("hold");

var numberHold = 0;

decrementButtonHold.addEventListener("click", function() {
  if (numberHold > 0) {
    numberHold--;
    numberElementHold.textContent = numberHold;
    nHold.value = numberHold;
  }
});

incrementButtonHold.addEventListener("click", function() {
  if (numberHold < 6) {
    numberHold++;
    numberElementHold.textContent = numberHold;
    nHold.value = numberHold;
  }
});