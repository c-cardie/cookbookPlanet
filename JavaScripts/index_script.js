
      
      
      //This  code loads the default homepage
      window.onload = function () {
          const params = new URLSearchParams(window.location.search);
          const query = params.get('query');

          if (query) {
              searchRecipes(query);  // Show only search results
          } else {

                //This is where we get the recipe of the day:
              fetchJSONAndDisplayObject(6);  // Load default content
          }
      }

    //this code redirects to the recipes page when prompted with a search
     function redirectToSearch(event) {
          event.preventDefault(); // Prevent page reload

          let input = document.getElementById("searchInput").value.trim();
          if (input) {
              window.location.href = `all_recipes.html?query=${encodeURIComponent(input)}`;
          }
      } 

