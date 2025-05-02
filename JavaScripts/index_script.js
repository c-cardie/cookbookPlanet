// sources: 
// https://www.google.com/search?q=random+number+everyday+javascript&sca_esv=ad6373a997a56455&rlz=1CAMFAZ_enUS978US978&sxsrf=AHTn8zpef7y5RTj9iLYuG_Isxemohlsjiw%3A1746213744626&ei=cBsVaL2BJs2wptQP0auswQI&oq=random+number+everyday+java&gs_lp=Egxnd3Mtd2l6LXNlcnAiG3JhbmRvbSBudW1iZXIgZXZlcnlkYXkgamF2YSoCCAAyBRAhGKABMgUQIRigATIFECEYoAEyBRAhGKABMgUQIRigATIFECEYnwUyBRAhGJ8FMgUQIRifBTIFECEYnwUyBRAhGJ8FSJwUUO4BWPANcAF4AZABAJgBiwGgAeMEqgEDMC41uAEDyAEA-AEBmAIGoAKdBcICChAAGLADGNYEGEfCAgYQABgWGB7CAgsQABiABBiGAxiKBcICCBAAGIAEGKIEwgIIEAAYogQYiQXCAgUQABjvBZgDAIgGAZAGBpIHAzEuNaAHkzOyBwMwLjW4B5cF&sclient=gws-wiz-serp
// https://stackoverflow.com/questions/521295/seeding-the-random-number-generator-in-javascript?utm_source=chatgpt.com
// https://github.com/bryc/code/blob/master/jshash/PRNGs.md?utm_source=chatgpt.com
// https://github.com/cprosche/mulberry32?utm_source=chatgpt.com
function getRandomNumberDaily(min, max) {
  const today = new Date();
  const seed = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();
  const rng = mulberry32(seed);
  return Math.floor(rng() * (max - min + 1)) + min;
}

function mulberry32(a) {
  return function() {
    let t = a += 0x6D2B79F5;
    t = Math.imul(t ^ t >>> 15, t | 1);
    t ^= t + Math.imul(t ^ t >>> 7, t | 61);
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  }
}

const min = 1;
const max = 100;
const randomNumber = getRandomNumberDaily(1, 80);

//This  code loads the default homepage
      window.onload = function () {
          const params = new URLSearchParams(window.location.search);
          const query = params.get('query');

          if (query) {
              searchRecipes(query);  // Show only search results
          } else {

                //This is where we get the recipe of the day:
              fetchJSONAndDisplayObject(randomNumber);  // Load default content
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
      };

      function startTimer() {
        console.log("startTimer called"); // Debugging line
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




