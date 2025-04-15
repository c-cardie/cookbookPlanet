

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
  //as well as a pagination to click through different pages of all the recipes
  
  //This is for pagination:
  let currentPage = 0;
  const recipesPerPage = 9;


  //This is for searching:
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
              console.log("Fetched recipes:", allRecipes); //
              displayRecipes(allRecipes); // Display all recipes initially
              //displayRecipes(); // Display all recipes initially
              
          
            })
          .catch((error) => {
              console.error("Error fetching recipes:", error);
          });
  }



//Update code to display recipes and implement pagination (from Chatgpt and some minor tweaks from myself)
function displayRecipes(recipes) {
    const listContainer = document.getElementById("recipe-list");
    listContainer.innerHTML = ""; // Clear previous
  
    const start = currentPage * recipesPerPage;
    const end = start + recipesPerPage;
    const paginatedRecipes = recipes.slice(start, end);
  
    paginatedRecipes.forEach((recipe) => {
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
  
    updatePaginationControls(recipes.length);
  }
  

  //This function updates the pagination (from Chatgpt):
  function updatePaginationControls(totalRecipes) {
    document.getElementById("prev-btn").disabled = currentPage === 0;
    document.getElementById("next-btn").disabled = (currentPage + 1) * recipesPerPage >= totalRecipes;
  

    //This bit right here tells you what page you are specifically on
    const totalPages = Math.ceil(totalRecipes / recipesPerPage);
    document.getElementById("page-indicator").textContent = `Page ${currentPage + 1} of ${totalPages}`;
  }
  



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




      /**/
      function searchRecipes(query) {

          if (query) {
              // If query is passed, set the input value to reflect it
              document.getElementById("searchInput").value = query;
          } else {
              query = document.getElementById("searchInput").value;
          }

          let input = query.toUpperCase();



        //add condition in case the search is empty (from chatgpt)
        if(input === ""){
            currentPage =0;
            displayRecipes(allRecipes);
            return;
        }


          // Filter recipes based on input
          let filteredRecipes = allRecipes.filter(recipe => 
              recipe.name.toUpperCase().includes(input) ||
              recipe.category.toUpperCase().includes(input)||
              recipe.ingredients.join(", ").toUpperCase().includes(input) ||  // Join array
              recipe.dietary.join(", ").toUpperCase().includes(input)  ||
              recipe.season.toUpperCase().includes(input)||
              recipe.cuisine.toUpperCase().includes(input) ||
              recipe.prep_time.toUpperCase().includes(input)||
              recipe.difficulty.toUpperCase().includes(input)
          );
        

          // to help with pagination (from chatgpt):
          currentPage = 0;
          updatePaginationControls(filteredRecipes.length);

          //display filtered recipes:
          displayRecipesWithHighlight(filteredRecipes,input); // Update displayed recipes
          
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
      

          // Prevent form submit from reloading page
          document.getElementById("searchForm").addEventListener("submit", function(event) {
              event.preventDefault();  // Stops the reload
              searchRecipes();         // Run search function dynamicall
          

          
          });

      }
/**/
      document.getElementById('SearchForm').addEventListener('submit', function(e){
        e.preventDefault();
        searchRecipes();  
            //This section collapses the navbar in mobile mode if prompted with a search (from chatgpt)
            const navbarCollapse = document.querySelector('.navbar-collapse');
            if(navbarCollapse.classList.contains('show')){
              const bsCollapse = new bootstrap.Collapse(navbarCollapse, {
                toggle: true
              });
            }

      }); 


    //These two document functions connect the buttons at the bottom of the 
    //page to the pagination within the display recipes function (from Chatgpt)

      document.getElementById("prev-btn").addEventListener("click", () => {
        if (currentPage > 0) {
          currentPage--;
          displayRecipes(allRecipes);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      });
      
      document.getElementById("next-btn").addEventListener("click", () => {
        if ((currentPage + 1) * recipesPerPage < allRecipes.length) {
          currentPage++;
          displayRecipes(allRecipes);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      });
      





  
  