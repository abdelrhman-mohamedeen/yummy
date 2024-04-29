let mainFood = document.getElementById("mainFood");
let searchInput = document.getElementById("search");

function showLoadingSpinner() {
  mainFood.innerHTML = `  <div class="d-flex justify-content-center align-items-center vh-100">
  <div
    class="fa-5x fas fa-spinner fa-spin text-warning"
    role="status"
  ></div>
</div>`;
}

// ----------nav start-------------------------------------------------------
$(".togill-icon").click(() => {
  let navWidth = $(".nave-bar").outerWidth();

  if ($(".side-nave").css(`left`) == `0px`) {
    closNave();
  } else {
    openNave();
  }
});
function openNave() {
  $(".side-nave").animate({ left: 0 }, 300);
  $(".togill-icon ").addClass("fa-x ");
  $(".togill-icon ").removeClass("fa-bars");
  $(".links li ").eq(0).animate({ top: 0 }, 500);
  $(".links li ").eq(1).animate({ top: 0 }, 700);
  $(".links li ").eq(2).animate({ top: 0 }, 900);
  $(".links li ").eq(3).animate({ top: 0 }, 1100);
  $(".links li ").eq(4).animate({ top: 0 }, 1300);
}
function closNave() {
  let navWidth = $(".nave-bar").outerWidth();

  $(".side-nave").animate({ left: -navWidth }, 300);
  $(".togill-icon ").removeClass("fa-x ");
  $(".togill-icon ").addClass("fa-bars");
  $(".links li ").animate({ top: 500 }, 500);
}
closNave();
// ------------ nave end-------------------------------------------------------
// -------------main start-------------------------------------------------------
async function displayMain(term) {
  showLoadingSpinner();

  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`
  );

  let data = await response.json();
  displayFood(data.meals);
}
function displayFood(arr) {
  let cartona = ``;
  for (let i = 0; i < arr.length; i++) {
    cartona += `
    <div class="col-md-3"  onclick="getDetails('${arr[i].idMeal}')">
    <div  class="food cursor-pointer position-relative overflow-hidden mt-4 rounded-2">
    <img
        class="w-100"
        src="${arr[i].strMealThumb}"
        alt="food photo"
      />
      <div
      
        class="layer position-absolute d-flex justify-content-center align-items-center fw-bolder fa-3x"
      >
        <p>${arr[i].strMeal}</p>
      </div>
    </div>
  </div>
`;
  }
  mainFood.innerHTML = cartona;
}
displayMain("");
// -------------main end---------------------------------------------------------

// -----------Details start-------------------------------------------------------
async function getDetails(idMeal) {
  showLoadingSpinner();

  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`
  );
  let data = await response.json();
  displayDetails(data.meals[0]);
}

function displayDetails(idMeal) {
  showLoadingSpinner();

  let ingredients = ``;
  for (let i = 1; i <= 20; i++) {
    if (idMeal[`strIngredient${i}`]) {
      ingredients += `<div class="alert m-1 alert-secondary">${
        idMeal[`strIngredient${i}`]
      }</div>`;
    }
  }

  let tagsHtml = ``;
  if (idMeal.strTags) {
    let tags = idMeal.strTags.split(",");
    for (let i = 0; i < tags.length; i++) {
      tagsHtml += `<div class="alert alert-warning m-1 p-1">${tags[i]}</div>`;
    }
  } else {
    tagsHtml = `<div class="alert alert-danger  p-1">No tags available</div>`;
  }

  let cartona = `<div class="container">
  <div class="row">
    <div class="col-md-4">
      <img
        src="${idMeal.strMealThumb}"
        class="w-100 rounded-2 mb-1"
        alt="meal photo"
      />
      <h2 class="text-white text-center h1 ">${idMeal.strMeal}</h2>
    </div>
    <div class="col-md-8">
      <h3 class=" fw-bolder text-warning ">Instructions</h3>
      <p class="text-white">${idMeal.strInstructions}
      </p>
      <h3 class="text-white ">
        <span class="fw-bolder text-warning">Area : </span>${idMeal.strArea}
      </h3>
      <h3 class="text-white">
        <span class="fw-bolder text-warning">Category : </span>${idMeal.strCategory}
      </h3>
      <h3 class="text-white">
        <span class="fw-bolder text-warning"">Recipes : </span> 
      </h3>
      <div class="d-flex flex-wrap">
       ${ingredients}
      </div>
      <h3 class="text-warning fw-bolder">Tags :</h3>
      <div class="d-flex flex-wrap mb-3">  
      ${tagsHtml}
      </div>

      <a href="${idMeal.strSource}" target="_blank" class="btn btn-success rounded-2 px-3 mb-5">Source</a>
      <a href="${idMeal.strYoutube}" target="_blank" class="btn btn-danger rounded-2 ms-3 mb-5">Youtube</a>
    </div>
  </div>
</div>`;
  mainFood.innerHTML = cartona;
}
// -----------Details end-------------------------------------------------------

// -----------name search start-------------------------------------------------------
async function searchByName(term) {
  showLoadingSpinner();

  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`
  );

  let data = await response.json();
  data.meals ? displayFood(data.meals) : displayFood(``);
}
async function searchByFristLetter(term) {
  showLoadingSpinner();

  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?f=${term}`
  );

  let data = await response.json();
  data.meals ? displayFood(data.meals) : displayFood(``);
}
function getsearch() {
  searchInput.innerHTML = `
      
      <div class="row g-3">
        <div class="col-md-6">
          <input
          onkeyup="searchByName(this.value)"
            type="text"
            class="form-control bg-transparent text-warning"
            placeholder="Search by Name"
          />
        </div>
        <div class="col-md-6">
          <input
          onkeyup="searchByFristLetter(this.value)"
            maxlength="1"
            type="text"
            class="form-control bg-transparent  text-warning"
            placeholder="Search by First letter"
          />
        </div>
      </div>
  `;
  mainFood.innerHTML = ``;
} // -----------name search end-----------------------------------------------------------
// -----------categories start-------------------------------------------------------
async function getCategories() {
  showLoadingSpinner();

  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/categories.php`
  );

  let data = await response.json();
  displyCategories(data.categories);
}

function displyCategories(arr) {
  searchInput.innerHTML = ``;

  let cartona = ``;
  for (let i = 0; i < arr.length; i++) {
    const words = arr[i].strCategoryDescription.split(" ");
    const shortenedDescription = words.slice(0, 20).join(" ");

    cartona += `
      <div class="col-md-3">
        <div onclick="getCategory('${arr[i].strCategory}')"  class=" food position-relative overflow-hidden mt-4 rounded-2">
          <img class=" cursor-pointer  w-100" src="${arr[i].strCategoryThumb}" alt="food photo" />
          <div class="layer cursor-pointer  position-absolute text-center">
            <p class="fw-bolder h3">${arr[i].strCategory}</p>
            <p class="fw-bolder">${shortenedDescription}</p>
          </div>
        </div>
      </div>`;
  }

  mainFood.innerHTML = cartona;
}

async function getCategory(category) {
  showLoadingSpinner();

  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
  );
  let data = await response.json();
  displayFood(data.meals.slice(0, 20));
}
// -----------categories end-------------------------------------------------------
// -----------Area start-------------------------------------------------------
async function getArea() {
  showLoadingSpinner();

  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/list.php?a=list`
  );

  let data = await response.json();
  displyArea(data.meals);
}

function displyArea(arr) {
  searchInput.innerHTML = ``;

  let cartona = ``;
  for (let i = 0; i < arr.length; i++) {
    cartona += ` 
    <div onclick="getAreas('${arr[i].strArea}')" 
     class="  col-md-3 text-center">
    <i class="cursor-pointer fa-solid text-danger fa-house-laptop fa-4x"></i>
        <p class="cursor-pointer text-warning fa-3x">${arr[i].strArea}</p>
      </div>
   `;
  }

  mainFood.innerHTML = cartona;
}
async function getAreas(area) {
  showLoadingSpinner();

  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`
  );
  let data = await response.json();
  displayFood(data.meals.slice(0, 20));
}
// -----------Area end-------------------------------------------------------
// -----------Ingredients start-------------------------------------------------------
async function getIngredients() {
  showLoadingSpinner();

  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/list.php?i=list`
  );

  let data = await response.json();
  displayIngredients(data.meals);
}

function displayIngredients(arr) {
  searchInput.innerHTML = ``;

  let cartona = ``;
  for (let i = 0; i < arr.length; i++) {
    const description = arr[i].strDescription || "";
    const words = description.split(" ");
    const strDescriptionShort = words.slice(0, 20).join(" ");

    cartona += `
      <div onclick="getIngredient('${arr[i].strIngredient}')"  class="col-md-3 text-center">
        <i class=" cursor-pointer fa-solid text-danger fa-drumstick-bite fa-4x"></i>
        <p class="fw-bolder cursor-pointer h3">${arr[i].strIngredient}</p>
        <p class="text-warning cursor-pointer">${strDescriptionShort}</p>
      </div>`;
  }
  mainFood.innerHTML = cartona;
}

async function getIngredient(ingredient) {
  showLoadingSpinner();

  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`
  );
  let data = await response.json();
  displayFood(data.meals.slice(0, 20));
}

// -----------Ingredients end-------------------------------------------------------
// -----------contact start-------------------------------------------------------
function getContact() {
  searchInput.innerHTML = ``;

  mainFood.innerHTML = ` <div class="container d-flex justify-content-center align-items-center vh-100 contact">
    <div class="row g-3">
      <div class="col-md-6">
        <input
          onkeyup="inputsValidation()"
          id="nameInput"
          type="text"
          class="form-control"
          placeholder="Enter Your Name"
        />
        <div class="alert alert-danger text-center my-2" style="display: none;">
          Special characters and numbers not allowed
        </div>
      </div>
      <div class="col-md-6">
        <input
          onkeyup="inputsValidation()"
          id="emailInput"
          type="email"
          class="form-control"
          placeholder="Enter Your Email"
        />
        <div class="alert alert-danger text-center my-2" style="display: none;">
          Email not valid *exemple@gmail.com
        </div>
      </div>
      <div class="col-md-6">
        <input
          onkeyup="inputsValidation()"
          id="phoneInput"
          type="tel"
          class="form-control"
          placeholder="Enter Your Phone"
        />
        <div class="alert alert-danger text-center my-2" style="display: none;">
          Enter valid Phone Number
        </div>
      </div>
      <div class="col-md-6">
        <input
          onkeyup="inputsValidation()"
          id="ageInput"
          type="number"
          class="form-control"
          placeholder="Enter Your Age"
        />
        <div class="alert alert-danger text-center my-2" style="display: none;">
          Enter valid age
        </div>
      </div>
      <div class="col-md-6">
        <div class="password-input-container position-relative">
          <input
            onkeyup="inputsValidation()"
            id="passwordInput"
            type="password"
            class="form-control"
            placeholder="Enter Your Password"
          />

          <i
            class="fas fa-eye password-toggle position-absolute top-50 translate-middle end-0 text-warning"
            onclick="togglePassword('passwordInput')"
          ></i>
          <div class="alert alert-danger text-center my-2" style="display: none;">
            Enter valid password *Minimum eight characters, at least one letter and one number:*
          </div>
        </div>
      </div>
      <div class="col-md-6">
        <div class="password-input-container position-relative">
          <input
            onkeyup="inputsValidation()"
            id="secPasswordInput"
            type="password"
            class="form-control"
            placeholder="Re-enter Your Password"
          />
          <i
            class="fas fa-eye password-toggle position-absolute top-50 translate-middle end-0 text-warning"
            onclick="togglePassword('secPasswordInput')"
          ></i>
          <div class="alert alert-danger text-center my-2" style="display: none;">
            Enter valid repassword
          </div>
        </div>
      </div>
      <button
        id="submitbtn"
        disabled
        class="btn btn-outline-warning mt-5 w-50 m-auto"
      >
        Submit
      </button>
    </div>
  </div>`;
}

function inputsValidation() {
  const nameValid = nameValidation();
  const emailValid = emailValidation();
  const phoneValid = phoneValidation();
  const ageValid = ageValidation();
  const passwordValid = passwordValidation();
  const rePasswordValid = rePasswordValidation();

  const nameAlert = document.querySelector("#nameInput ~ .alert");
  const emailAlert = document.querySelector("#emailInput ~ .alert");
  const phoneAlert = document.querySelector("#phoneInput ~ .alert");
  const ageAlert = document.querySelector("#ageInput ~ .alert");
  const passwordAlert = document.querySelector("#passwordInput ~ .alert");
  const rePasswordAlert = document.querySelector("#secPasswordInput ~ .alert");

  nameAlert.style.display = nameValid ? "none" : "block";
  emailAlert.style.display = emailValid ? "none" : "block";
  phoneAlert.style.display = phoneValid ? "none" : "block";
  ageAlert.style.display = ageValid ? "none" : "block";
  passwordAlert.style.display = passwordValid ? "none" : "block";
  rePasswordAlert.style.display = rePasswordValid ? "none" : "block";

  const submitBtn = document.getElementById("submitbtn");
  submitBtn.disabled = !(
    nameValid &&
    emailValid &&
    phoneValid &&
    ageValid &&
    passwordValid &&
    rePasswordValid
  );
}

function nameValidation() {
  return /^[a-zA-Z]+(?:\s[a-zA-Z]+)*$/.test(
    document.getElementById("nameInput").value
  );
}

function emailValidation() {
  const email = document.getElementById("emailInput").value;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function phoneValidation() {
  const phoneInput = document.getElementById("phoneInput").value.trim();
  return /^(010|011|012|015)\d{8}$/.test(phoneInput);
}

function ageValidation() {
  const age = parseInt(document.getElementById("ageInput").value);
  return !isNaN(age) && age > 0;
}

function passwordValidation() {
  const password = document.getElementById("passwordInput").value.trim();
  const regex = /^(?=.*[A-Za-z])(?=.*\d).{4,}$/;
  return regex.test(password);
}

function rePasswordValidation() {
  const password = document.getElementById("passwordInput").value;
  const rePassword = document.getElementById("secPasswordInput").value;
  return password === rePassword;
}

function togglePassword(inputId) {
  const input = document.getElementById(inputId);
  if (input.type === "password") {
    input.type = "text";
  } else {
    input.type = "password";
  }
}

// -----------contact end-------------------------------------------------------

showLoadingSpinner();
