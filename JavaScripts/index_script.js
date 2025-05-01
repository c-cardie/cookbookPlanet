
      
      
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



      //this section is for toggling light and dark mode 
      const toggleBtn = document.getElementById("darkModeToggle");
      const page = document.getElementById("entire-page");
    
      // Load preference from localStorage
      if (localStorage.getItem("darkMode") === "true") {
        page.classList.add("dark-mode");
      }
    
      toggleBtn.addEventListener("click", () => {
        page.classList.toggle("dark-mode");
    
        // Save preference
        const isDark = page.classList.contains("dark-mode");
        localStorage.setItem("darkMode", isDark);
      });

      //for the timerj
      function openTimerTab() {
        window.open(
          'timer.html', // or whatever your timer page URL is
          'TimerWindow',
          'width=450,height=425,left=100,top=100,resizable=yes,scrollbars=no'
        );
      }

