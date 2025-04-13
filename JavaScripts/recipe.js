
  //this code redirects to the recipes page when prompted with a search
   function redirectToSearch(event) {
        event.preventDefault(); // Prevent page reload

        let input = document.getElementById("searchInput").value.trim();
        if (input) {
            window.location.href = `all_recipes.html?query=${encodeURIComponent(input)}`;
        }
    }
