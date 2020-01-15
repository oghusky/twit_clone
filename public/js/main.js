// variables
const textarea = document.querySelector("textarea");
const charactersLeft = document.querySelectorAll("#characters-left-span");
const popText = document.querySelectorAll(".post");

popText.forEach(pop => {
  pop.innerHTML = pop.getAttribute("value")
});
// eventlisteners

// show the amount of characters user has left to type
// textarea.addEventListener("keyup", function () {
//     charactersLeft.textContent = 150;
//     maxLength = 150;
//     currentLength = textarea.value.length
//     charactersLeft.textContent = maxLength - currentLength;
//     if (currentLength > 150) {
//         textarea.style.outlineColor = "red";
//     }
//     return;
// });

