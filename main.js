const selectbox = document.querySelector(".select-box");
const selectOption = document.querySelector(".select-option");
const soValue = document.querySelector("#soValue");
const optionSearch = document.querySelector("#optionSearch");
const options = document.querySelector(".options");
const optionsList = document.querySelectorAll(".options li");
const searchBtn = document.querySelector(".submit");

selectOption.addEventListener("click", function () {
  selectbox.classList.toggle("active");
});

optionsList.forEach(function (optionsListSingle) {
  optionsListSingle.addEventListener("click", function () {
    console.log(this);
    soValue.value = this.textContent;
    searchBtn.disabled = !soValue.value;
    selectbox.classList.remove("active");
  });
});

optionSearch.addEventListener("keyup", function () {
  let filter, li, i, textValue;
  filter = optionSearch.value.toUpperCase();
  li = options.getElementsByTagName("li");
  for (i = 0; i < li.length; i++) {
    textValue = li[i].textContent || li[i].innerText;
    if (textValue.toUpperCase().indexOf(filter) > -1) {
      li[i].style.display = "";
    } else {
      li[i].style.display = "none";
    }
  }
});


searchBtn.addEventListener("click", function () {
  console.log(soValue.value);
  localStorage.setItem("categeory", soValue.value);
  return window.location.assign("./difficulty.html");
});
