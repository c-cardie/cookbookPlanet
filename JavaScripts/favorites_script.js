
      
      /*
      function toggleFavorite(keyName, ID) {
        // Retrieve existing data or initialize an empty object
        let data = JSON.parse(localStorage.getItem("appData")) || {};
    
        // Ensure the key exists and is an array
        if (!data[keyName]) {
            data[keyName] = [];
        }
    
        // Check if the ID is already present
        let index = data[keyName].indexOf(ID);
        
        if (index === -1) {
            // If ID is not present, add it
            data[keyName].push(ID);
            console.log(`Added ID ${ID} to ${keyName}`);
        } else {
            // If ID is present, remove it
            data[keyName].splice(index, 1);
            // console.log(`Removed ID ${ID} from ${keyName}`);
        }
    
        // Save updated data back to localStorage
        localStorage.setItem("appData", JSON.stringify(data));
    
        // console.log("Updated localStorage:", data.favorites);
        toggleFavorite('favorites', recipe.id, showFavoriteRecipes);
    }*/

        function toggleFavorite(keyName, ID, callback = null) {
            let data = JSON.parse(localStorage.getItem("appData")) || {};
        
            if (!data[keyName]) {
                data[keyName] = [];
            }
        
            const idStr = ID.toString();
            const index = data[keyName].indexOf(ID);
        
            const isNowFavorite = index === -1;
        
            if (isNowFavorite) {
                data[keyName].push(ID);
            } else {
                data[keyName].splice(index, 1);
            }
        
            localStorage.setItem("appData", JSON.stringify(data));
        
            // Immediately update heart icon
            const heartIcon = document.querySelector(`svg.heart-icon[data-id="${ID}"]`);
            if (heartIcon) {
                heartIcon.outerHTML = isNowFavorite
                    ? `
                    <svg xmlns="http://www.w3.org/2000/svg" 
                        width="16" height="16" 
                        fill="currentColor" 
                        class="bi bi-heart-fill heart-icon" 
                        viewBox="0 0 16 16" 
                        data-id="${ID}">
                      <path d="M8 1.314C12.438-3.248 23.534 4.735 8 15 
                               -7.534 4.736 3.562-3.248 8 1.314"/>
                    </svg>`
                    : `
                    <svg xmlns="http://www.w3.org/2000/svg" 
                        width="16" height="16" 
                        fill="currentColor" 
                        class="bi bi-heart heart-icon" 
                        viewBox="0 0 16 16" 
                        data-id="${ID}">
                      <path d="m8 2.748-.717-.737C5.6.281 2.514 3.138 
                               3.28 6.027c.356 1.319 1.566 2.59 
                               3.319 3.993 1.753-1.403 2.963-2.674 
                               3.319-3.993.766-2.89-2.32-5.746-4.003-2.986L8 2.748zM8 15C-7.333 
                               4.868 3.279-3.04 7.824 1.143a3.12 
                               3.12 0 0 1 .176.187 3.12 
                               3.12 0 0 1 .176-.187C12.72-3.042 
                               23.333 4.867 8 15z"/>
                    </svg>`;
            }
        
            // Optional: trigger a callback if needed (e.g. refresh view)
            if (callback) callback();
        }
        

    function inFavorite(keyName, ID) {
      let data = JSON.parse(localStorage.getItem("appData")) || {};
      // console.log("Parsed LocalStorage Data:", data);
  
      // Ensure key exists and is an array
      if (!data[keyName]) {
          console.log(`Key "${keyName}" not found in LocalStorage`);
          return false;
      }
  
      // console.log(`Checking if ID ${ID} is in`, data[keyName]);
  
      // Convert both ID and stored values to strings for comparison
      let idString = ID.toString();
      let storedIds = data[keyName].map(id => id.toString());
  
      let isFavorite = storedIds.includes(idString);
      // console.log(`Is ${ID} in favorites?`, isFavorite);
  
      return isFavorite;
  }
  




  //This code I addes from Chatgpt and W3 schools to create a search list
  let allRecipes = []; // Store all recipes globally
  
  function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
  }
  
  

  function fetchRecipes() {
    const searchQuery = getQueryParam("query") || "";
    document.getElementById("searchInput").value = searchQuery;

      fetch("../static/recipe/merged_sorted.json")
          .then((response) => response.json())
          .then((data) => {
              allRecipes = data; // Store data globally
              console.log("Fetched recipes:", allRecipes); // ✅ Debugging
              
              showFavoriteRecipes();
              //displayRecipes(allRecipes); // Display all recipes initially
              //displayRecipes(); // Display all recipes initially
              
          
            })
          .catch((error) => {
              console.error("Error fetching recipes:", error);
          });
  }


  //showing only the favorites
  function showFavoriteRecipes() {
    const data = JSON.parse(localStorage.getItem("appData")) || {};
    const favoriteIds = (data['favorites'] || []).map(id => id.toString());

    const favoriteRecipes = allRecipes.filter(recipe => favoriteIds.includes(recipe.id.toString()));

    displayRecipes(favoriteRecipes);
}



  function displayRecipes(recipes) {
    const listContainer = document.getElementById("recipe-list");
    listContainer.innerHTML = ""; // Clear previous results
    






    recipes.forEach((recipe) => {
        const isFavorite = inFavorite('favorites', recipe.id) === false;
        const favoriteButton = isFavorite
            ? `<button type="button" class="btn btn-outline-danger position-absolute top-0 m-2 float-left bg-transparent border-2 active" onclick="toggleFavorite('favorites', ${recipe.id})" data-toggle="button" aria-pressed="true" autocomplete="off" id="favorite-btn-${recipe.id}">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-heart" viewBox="0 0 16 16">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-heart-fill" viewBox="0 0 16 16">
                  <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314"/>
                  </svg>
                </button>`
            : `<button type="button" class="btn btn-outline-danger position-absolute top-0 m-2 float-left bg-transparent border-2" onclick="toggleFavorite('favorites', ${recipe.id})" data-toggle="button" aria-pressed="false" autocomplete="off" id="favorite-btn-${recipe.id}">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-heart" viewBox="0 0 16 16">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-heart-fill" viewBox="0 0 16 16">
                  <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314"/>
                  </svg>
                </button>`;

        const cardHTML = `
            <div class="col-lg-4 col-md-6 col-sm-12 mb-4">
                <div class="card overflow-auto">
                    <img src="../static/images/${recipe.images[0]}" class="card-img-top w-100 rounded" alt="${recipe.name}">
                    ${favoriteButton}
                    <div class="card-body">
                        <h5 class="card-title">
                            <a href="../templates/recipe.html?id=${recipe.id}">${recipe.name}</a>
                        </h5>
                        <p class="card-text"><strong>Prep Time:</strong> ${recipe.prep_time}</p>
                        <p class="card-text"><strong>Difficulty:</strong> ${recipe.difficulty}</p>
                        <p class="card-text"><strong>Cuisine:</strong> ${recipe.cuisine}</p>
                        <p class="card-text"><strong>Dietary Info:</strong> ${recipe.dietary.join(", ")}</p>
                        <h6>Ingredients:</h6>
                        <p>${recipe.ingredients.join(", ")}</p>
                    </div>
                </div>
            </div>`;

        listContainer.innerHTML += cardHTML;
    });
}
/*

function displayRecipesWithHighlight(recipes, query) {
    const listContainer = document.getElementById("recipe-list");
    listContainer.innerHTML = "";  // Clear previous results

    recipes.forEach((recipe) => {
        const highlightText = (text) => {
            // Create a regex to match the query and add a highlight span around the match
            const regex = new RegExp(`(${query})`, 'gi');
            return text.replace(regex, '<span class="highlight">$1</span>');
        };

        const name = highlightText(recipe.name);
        const cuisine = highlightText(recipe.cuisine);
        const difficulty = highlightText(recipe.difficulty);
        const category = highlightText(recipe.category);
        const season = highlightText(recipe.season);
        const prepTime = highlightText(recipe.prep_time);
        const ingredients = highlightText(recipe.ingredients.join(", "));
        const dietary = highlightText(recipe.dietary.join(", "));

        const cardHTML = `
            <div class="col-lg-4 col-md-6 col-sm-12 mb-4">
                <div class="card overflow-auto">
                    <img src="../static/images/${recipe.images[0]}" class="card-img-top w-100 rounded" alt="${recipe.name}">
                    <div class="card-body">
                        <h5 class="card-title">
                            <a href="../templates/recipe.html?id=${recipe.id}">${name}</a>
                        </h5>
                        <p class="card-text"><strong>Prep Time:</strong> ${prepTime}</p>
                        <p class="card-text"><strong>Difficulty:</strong> ${difficulty}</p>
                        <p class="card-text"><strong>Cuisine:</strong> ${cuisine}</p>
                        <p class="card-text"><strong>Category:</strong> ${category}</p>
                        <p class="card-text"><strong>Season:</strong> ${season}</p>
                        <p class="card-text"><strong>Dietary Info:</strong> ${dietary}</p>
                        <h6>Ingredients:</h6>
                        <p>${ingredients}</p>
                    </div>
                </div>
            </div>`;

        listContainer.innerHTML += cardHTML;
    });
}*/

function displayRecipesWithHighlight(recipes, query) {
    const listContainer = document.getElementById("recipe-list");
    listContainer.innerHTML = "";  // Clear previous results
  
    recipes.forEach((recipe) => {
        const highlightText = (text) => {
            const regex = new RegExp(`(${query})`, 'gi');
            return text.replace(regex, '<span class="highlight">$1</span>');
        };
  
        const name = highlightText(recipe.name);
        const cuisine = highlightText(recipe.cuisine);
        const difficulty = highlightText(recipe.difficulty);
        const category = highlightText(recipe.category);
        const season = highlightText(recipe.season);
        const prepTime = highlightText(recipe.prep_time);
        const ingredients = highlightText(recipe.ingredients.join(", "));
        const dietary = highlightText(recipe.dietary.join(", "));
  
        const isFavorite = inFavorite('favorites', recipe.id);
  
                const favoriteIcon = isFavorite
                ? `
                  <svg xmlns="http://www.w3.org/2000/svg" 
                       width="16" height="16" 
                       fill="currentColor" 
                       class="bi bi-heart-fill heart-icon" 
                       viewBox="0 0 16 16" 
                       data-id="${recipe.id}">
                    <path d="M8 1.314C12.438-3.248 23.534 4.735 8 15 
                             -7.534 4.736 3.562-3.248 8 1.314"/>
                  </svg>`
                : `
                  <svg xmlns="http://www.w3.org/2000/svg" 
                       width="16" height="16" 
                       fill="none" stroke="red" stroke-width="1.5" 
                       class="bi bi-heart heart-icon" 
                       viewBox="0 0 16 16" 
                       data-id="${recipe.id}">
                    <path d="M8 1.314C12.438-3.248 23.534 4.735 8 15 
                             -7.534 4.736 3.562-3.248 8 1.314"/>
                  </svg>`;
            
  
        const favoriteButton = `
            <button type="button"
                    class="btn btn-outline-danger position-absolute top-0 m-2 float-left bg-transparent border-2"
                    onclick="toggleFavorite('favorites', ${recipe.id}, () => searchFavoriteRecipes('${query}'))"
                    aria-pressed="${isFavorite}">
                ${favoriteIcon}
            </button>
        `;
  
        const cardHTML = `
            <div class="col-lg-4 col-md-6 col-sm-12 mb-4">
                <div class="card overflow-auto position-relative">
                    <img src="../static/images/${recipe.images[0]}" class="card-img-top w-100 rounded" alt="${recipe.name}">
                    ${favoriteButton}
                    <div class="card-body">
                        <h5 class="card-title">
                            <a href="../templates/recipe.html?id=${recipe.id}">${name}</a>
                        </h5>
                        <p class="card-text"><strong>Prep Time:</strong> ${prepTime}</p>
                        <p class="card-text"><strong>Difficulty:</strong> ${difficulty}</p>
                        <p class="card-text"><strong>Cuisine:</strong> ${cuisine}</p>
                        <p class="card-text"><strong>Category:</strong> ${category}</p>
                        <p class="card-text"><strong>Season:</strong> ${season}</p>
                        <p class="card-text"><strong>Dietary Info:</strong> ${dietary}</p>
                        <h6>Ingredients:</h6>
                        <p>${ingredients}</p>
                    </div>
                </div>
            </div>`;
  
        listContainer.innerHTML += cardHTML;
    });
  }
  



function searchFavoriteRecipes(query) {
    const data = JSON.parse(localStorage.getItem("appData")) || {};
    const favoriteIds = (data['favorites'] || []).map(id => id.toString());

    // Filter allRecipes to get only the favorites first
    let favoriteRecipes = allRecipes.filter(recipe => 
        favoriteIds.includes(recipe.id.toString())
    );

    // Apply the search to the favoriteRecipes only
    let input = query ? query.toUpperCase() : document.getElementById("searchInput").value.toUpperCase();

    let filteredRecipes = favoriteRecipes.filter(recipe => 
        
        recipe.name.toUpperCase().includes(input) ||
        recipe.category.toUpperCase().includes(input)||
        recipe.ingredients.join(", ").toUpperCase().includes(input) ||  // Join array
        recipe.dietary.join(", ").toUpperCase().includes(input)  ||
        recipe.season.toUpperCase().includes(input)||
        recipe.cuisine.toUpperCase().includes(input) ||
        recipe.prep_time.toUpperCase().includes(input)||
        recipe.difficulty.toUpperCase().includes(input)
    );

    //displayRecipes(filteredRecipes); // Show the search results
    displayRecipesWithHighlight(filteredRecipes,input);


}


      //window.onload = fetchRecipes;
      /**/
      window.onload = function () {
          const params = new URLSearchParams(window.location.search);
          const query = params.get('query');

          if (query) {
              fetchRecipes();
              //searchRecipes(query);  // Search with query
              setTimeout(() => searchRecipes(query), 200); 
          } else {
              fetchRecipes(); // Show all recipes if no query
          }
      

          document.getElementById('searchForm').addEventListener('submit', function (e) {
            e.preventDefault();
            searchRecipes();  // or searchFavoriteRecipes() if you're on the favorites page
        
            // Collapse the navbar if it's open
            const navbarCollapse = document.querySelector('.navbar-collapse');
            if (navbarCollapse.classList.contains('show')) {
                const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse)
                    || new bootstrap.Collapse(navbarCollapse, { toggle: false });
                bsCollapse.hide();
            }
        });
        

      }


