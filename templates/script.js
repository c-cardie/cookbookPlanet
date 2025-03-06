function fetchJSONAndDisplayObject(recipeId) {
  fetch("../static/recipe/merged_sorted.json")
    .then((response) => response.json())
    .then((data) => {
      const recipe = data.find((r) => r.id == recipeId); // Find recipe by ID

      if (!recipe) {
        console.error("Recipe not found.");
        document.getElementById("recipe-container").innerHTML =
          `<p>Recipe not found.</p>`;
        return;
      }

      // Populate the recipe details
      document.getElementById("recipe-container").innerHTML = `
                <div class="card mx-auto">
                    <img src="../static/images/${recipe.images[0]}" class="card-img-top w-100 rounded" alt="${recipe.name}">
                    <div class="card-body">
                        <h5 class="card-title"><a href="../templates/recipe.html?id=${recipe.id}">${recipe.name}</a></h5>
                        <p class="card-text"><strong>Prep Time:</strong> ${recipe.prep_time}</p>
                        <p class="card-text"><strong>Difficulty:</strong> ${recipe.difficulty}</p>
                        <p class="card-text"><strong>Cuisine:</strong> ${recipe.cuisine}</p>
                        <p class="card-text"><strong>Dietary Info:</strong> ${recipe.dietary.join(", ")}</p>
                        <h6>Ingredients:</h6>
                        <p>${recipe.ingredients.join(", ")}</p>
                    </div>
                </div>`;
    })
    .catch((error) => {
      console.error("Error fetching recipe:", error);
    });
}

function getRecipeIdFromURL() {
  const params = new URLSearchParams(window.location.search);
  return parseInt(params.get("id")) || null;
}

function fetchRecipes() {
  fetch("../static/recipe/merged_sorted.json")
    .then((response) => response.json())
    .then((data) => {
      recipes = data;

      // Find the index of the current recipe by its ID
      const recipeId = getRecipeIdFromURL();
      currentRecipeIndex = recipes.findIndex((r) => r.id === recipeId);

      if (currentRecipeIndex !== -1) {
        displayRecipe(currentRecipeIndex);
      } else {
        document.getElementById("recipe-container").innerHTML =
          "<p>Recipe not found.</p>";
      }
    })
    .catch((error) => console.error("Error fetching recipes:", error));
}

let currentImageIndex = 0;

function displayRecipe(index) {
  const recipe = recipes[index];
  const container = document.getElementById("recipe-container");

  if (recipe) {
    // Create the recipe HTML structure
    container.innerHTML = `
    <!-- Recipe Info -->
    <div class="row p-3">
      <div class="col-lg-9 p-3">
          <div class="card" id="individual_card">
              <div class="card-body text-left">
                  <h2 class="card-title">${recipe.name}</h2>
                  <p class="card-text"><strong>Category:</strong> ${recipe.category}</p>
                  <p class="card-text"><strong>Prep Time:</strong> ${recipe.prep_time}</p>
                  <p class="card-text"><strong>Difficulty:</strong> ${recipe.difficulty}</p>
                  <p class="card-text"><strong>Cuisine:</strong> ${recipe.cuisine}</p>
                  <p class="card-text"><strong>Dietary Info:</strong> ${recipe.dietary.join(", ")}</p>
                  <h3>Ingredients:</h3>
                  <ul class="list-unstyled">
                      ${recipe.ingredients.map((i) => `<li class="pl-3"><input type="checkbox" class="form-check-input"> ${i}</li>`).join("")}
                  </ul>
                  <h3>Steps:</h3>
                  <ol>
                      ${recipe.steps.map((s) => `<li class="pl-3"><input type="checkbox" class="form-check-input" /> ${s}</li>`).join("")}
                  </ol>
              </div>
          </div>
      </div>

      <!-- Images Section -->
      <div class="col-lg-3 p-3">
          <div class="card h-100">
              <div class="card-body d-flex flex-column justify-content-between">
                  <h3 class="card-title">Images:</h3>
                  <div class="d-flex justify-content-center">
                      <!-- Image stays within card boundaries, with proper scaling -->
                      <img id="recipe-image" src="../static/images/${recipe.images[currentImageIndex]}" alt="${recipe.images[currentImageIndex]}" class="img-fluid rounded" style="max-width: 250px; height: auto; object-fit: cover; overflow: hidden;">
                  </div>
                  <!-- Previous and Next Buttons -->
                  <div class="d-flex justify-content-between">
                      <button class="btn btn-primary" id="prev-button">Previous</button>
                      <button class="btn btn-primary" id="next-button">Next</button>
                  </div>
              </div>
          </div>
      </div>
    </div>
    `;

    // Update the image based on the currentImageIndex
    function updateImage() {
      document.getElementById("recipe-image").src = `../static/images/${recipe.images[currentImageIndex]}`;
    }

    // Previous button functionality
    document.getElementById("prev-button").addEventListener("click", () => {
      currentImageIndex = (currentImageIndex - 1 + recipe.images.length) % recipe.images.length;
      updateImage();
    });

    // Next button functionality
    document.getElementById("next-button").addEventListener("click", () => {
      currentImageIndex = (currentImageIndex + 1) % recipe.images.length;
      updateImage();
    });
  }
}

function navigateRecipe(direction) {
  if (recipes.length > 0) {
    let newIndex = currentRecipeIndex + direction;

    // Prevent out-of-bounds errors by looping the list
    if (newIndex >= recipes.length) newIndex = 0; // Wrap around to first recipe
    if (newIndex < 0) newIndex = recipes.length - 1; // Wrap around to last recipe

    // Redirect to the new recipe page
    window.location.href = `recipe.html?id=${recipes[newIndex].id}`;
  }
}
