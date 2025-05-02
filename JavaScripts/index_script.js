
      
      
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

      //This section is for the new timer alert 
      let countdown;
      let alarmSound = new Audio("https://actions.google.com/sounds/v1/alarms/alarm_clock.ogg"); // Replace with your sound path

      document.getElementById('openTimerBtn').onclick = () => {
        document.getElementById('floatingTimer').style.display = 'block';
      };

      document.getElementById('closeTimerBtn').onclick = () => {
        document.getElementById('floatingTimer').style.display = 'none';
        resetTimer(); // stop timer and alarm
      };

      function startTimer() {
        const hours = parseInt(document.getElementById('hours').value) || 0;
        const minutes = parseInt(document.getElementById('minutes').value) || 0;
        const seconds = parseInt(document.getElementById('seconds').value) || 0;
      
        let totalSeconds = hours * 3600 + minutes * 60 + seconds;
        if (totalSeconds <= 0) return;
      
        updateDisplay(totalSeconds);
        clearInterval(countdown);
      
        countdown = setInterval(() => {
          totalSeconds--;
          updateDisplay(totalSeconds);
          if (totalSeconds <= 0) {
            clearInterval(countdown);
            alarmSound.loop = true;
            alarmSound.play();
          }
        }, 1000);
      }
      

      function resetTimer() {
        clearInterval(countdown);
        document.getElementById('timerDisplay').textContent = '00:00:00';
        alarmSound.pause();
        alarmSound.currentTime = 0;
      }

      function updateDisplay(seconds) {
        const hr = String(Math.floor(seconds / 3600)).padStart(2, '0');
        const min = String(Math.floor((seconds % 3600) / 60)).padStart(2, '0');
        const sec = String(seconds % 60).padStart(2, '0');
        document.getElementById('timerDisplay').textContent = `${hr}:${min}:${sec}`;
      }
      
  


