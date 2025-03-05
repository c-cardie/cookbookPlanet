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
                        <h5 class="card-title">${recipe.name}</h5>
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

function displayRecipe(index) {
  const recipe = recipes[index];
  const container = document.getElementById("recipe-container");

  if (recipe) {
    container.innerHTML = `
            <div class="row p-3">
            <div class="col-lg-9 p-3">
            <h2>${recipe.name}</h2>
            <p><strong>Category:</strong> ${recipe.category}</p>
            <p><strong>Prep Time:</strong> ${recipe.prep_time}</p>
            <p><strong>Difficulty:</strong> ${recipe.difficulty}</p>
            <p><strong>Cuisine:</strong> ${recipe.cuisine}</p>
            <p><strong>Dietary Info:</strong> ${recipe.dietary.join(", ")}</p>
            <h3>Ingredients:</h3>
            <ul class="list-unstyled">${recipe.ingredients.map((i) => `<li>${i}</li>`).join("")}</ul>
            <h3>Steps:</h3>
            <ol>${recipe.steps.map((s) => `<li>${s}</li>`).join("")}</ol>
            </div>
            <div class="col-lg-3">
            <h3>Images:</h3>
            <div>${recipe.images.map((img) => `<img src="../static/images/${img}" alt="${img}" style="max-width: 100px;">`).join("")}</div>
            </div>
            </div>`;
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
