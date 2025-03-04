function fetchJSONAndDisplayObject(recipeId) {
    fetch("../static/recipe/merged_sorted.json")
        .then(response => response.json())
        .then(data => {
            const recipe = data.find(r => r.id == recipeId); // Find recipe by ID
            
            if (!recipe) {
                console.error("Recipe not found.");
                document.getElementById("recipe-container").innerHTML = `<p>Recipe not found.</p>`;
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
        .catch(error => {
            console.error("Error fetching recipe:", error);
        });
}