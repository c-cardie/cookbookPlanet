// Function to fetch JSON and display a specific object by its ID
function fetchJSONAndDisplayObject(id) {
    // Fetch the JSON file (assuming it's in the same directory as this HTML file)
    fetch('/static/recipe/merged_sorted.json')  // Specify the path to your JSON file
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();  // Parse the response as JSON
        })
        .then(data => {
            // Assuming `data` is an array of objects and we're looking for an object with a specific id
            const foundObject = data.find(item => item.id === id);

            const container = document.getElementById('recipe-container');
            if (foundObject) {
                // Display recipe information in the container
                container.innerHTML = `
                    <div class="card">
                    <img src="/static/images/${foundObject.images.slice(0, 1)[0]}" class="card-img-top w-25" alt="${foundObject.name}">
                    <div class="card-body">
                        <h5 class="card-title">${foundObject.name}</h5>
                        <p class="card-text"><strong>Prep Time:</strong> ${foundObject.prep_time}</p>
                        <p class="card-text"><strong>Difficulty:</strong> ${foundObject.difficulty}</p>
                        <p class="card-text"><strong>Cuisine:</strong> ${foundObject.cuisine}</p>
                        <p class="card-text"><strong>Dietary Info:</strong> ${foundObject.dietary.join(', ')}</p>

                        <h6>Ingredients:</h6>
                          <p>${foundObject.ingredients.join(', ')}</p>
                    </div>
                </div>
                `;
            } else {
                container.innerHTML = '<p>Recipe not found.</p>';
            }
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
}