document.addEventListener("DOMContentLoaded", function () {
      let timer;
      let totalTime = 0;
      let originalTime = 0;
      let isRunning = false;
      let isPaused = false;

      const startBtn = document.getElementById('startBtn');
      const stopBtn = document.getElementById('stopBtn');
      const restartBtn = document.getElementById('restartBtn');
      const cancelBtn = document.getElementById('cancelBtn');
      const repeatBtn = document.getElementById('repeatBtn');
      const minutesInput = document.getElementById('minutes');
      const secondsInput = document.getElementById('seconds');
      const timerDisplay = document.getElementById('timerDisplay');
      const endImage = document.getElementById('endImage');
      const inputSection = document.getElementById('inputSection');
      const timerControls = document.getElementById('timerControls');
      const colorOptions = document.querySelectorAll('.color-option');
      const colorSelector = document.getElementById('colorSelector');
      const backgroundBtn = document.getElementById('backgroundBtn');

      // Show/hide color selector when background button is clicked
      backgroundBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        colorSelector.classList.toggle('show');
      });

      // Hide color selector when clicking outside
      document.addEventListener('click', function(e) {
        if (!e.target.closest('.color-selector') && !e.target.closest('.background-btn')) {
          colorSelector.classList.remove('show');
        }
      });

      // Prevent hiding when clicking on color selector
      colorSelector.addEventListener('click', function(e) {
        e.stopPropagation();
      });

      // Color selector functionality
      colorOptions.forEach(option => {
        option.addEventListener('click', function(e) {
          e.stopPropagation();
          
          // Remove active class from all options
          colorOptions.forEach(opt => opt.classList.remove('active'));
          
          // Add active class to clicked option
          this.classList.add('active');
          
          // Change background
          document.body.style.background = this.dataset.bg;
          
          // Hide color selector after selection
          colorSelector.classList.remove('show');
        });
      });

      function updateDisplay(timeLeft) {
        const mins = String(Math.floor(timeLeft / 60)).padStart(2, '0');
        const secs = String(timeLeft % 60).padStart(2, '0');
        timerDisplay.textContent = `${mins}:${secs}`;
      }

      function startTimer() {
        const mins = parseInt(minutesInput.value) || 0;
        const secs = parseInt(secondsInput.value) || 0;
        totalTime = mins * 60 + secs;
        originalTime = totalTime;

        if (totalTime <= 0) return;

        isRunning = true;
        isPaused = false;

        // Hide input section and show timer
        inputSection.classList.add('hidden');
        timerDisplay.classList.remove('hidden');
        timerControls.classList.remove('hidden');
        stopBtn.classList.remove('hidden');
        restartBtn.classList.add('hidden');
        endImage.classList.add('hidden');

        updateDisplay(totalTime);

        timer = setInterval(() => {
          totalTime--;
          updateDisplay(totalTime);

          if (totalTime <= 0) {
            clearInterval(timer);
            showEndImage();
          }
        }, 1000);
      }

      function stopTimer() {
        if (isRunning) {
          clearInterval(timer);
          isRunning = false;
          isPaused = true;
          stopBtn.classList.add('hidden');
          restartBtn.classList.remove('hidden');
        }
      }

      function restartTimer() {
        if (isPaused) {
          isRunning = true;
          isPaused = false;
          stopBtn.classList.remove('hidden');
          restartBtn.classList.add('hidden');

          timer = setInterval(() => {
            totalTime--;
            updateDisplay(totalTime);

            if (totalTime <= 0) {
              clearInterval(timer);
              showEndImage();
            }
          }, 1000);
        }
      }

      function showEndImage() {
        isRunning = false;
        isPaused = false;
        timerDisplay.classList.add('hidden');
        timerControls.classList.add('hidden');
        endImage.classList.remove('hidden');
        document.getElementById("alarmSound").play();
      }

      function cancelTimer() {
        clearInterval(timer);
        isRunning = false;
        isPaused = false;
        totalTime = 0;
        const sound = document.getElementById("alarmSound");
        sound.pause();
        
        // Reset to initial state
        minutesInput.value = '';
        secondsInput.value = '';
        timerDisplay.textContent = '00:00';
        
        // Show input section and hide everything else
        inputSection.classList.remove('hidden');
        timerDisplay.classList.add('hidden');
        timerControls.classList.add('hidden');
        endImage.classList.add('hidden');
      }

      function repeatTimer() {
        // Reset timer to original time and start again
        totalTime = originalTime;
        isRunning = true;
        isPaused = false;

        // Hide end image and show timer
        endImage.classList.add('hidden');
        timerDisplay.classList.remove('hidden');
        timerControls.classList.remove('hidden');
        stopBtn.classList.remove('hidden');
        restartBtn.classList.add('hidden');

        updateDisplay(totalTime);

        timer = setInterval(() => {
          totalTime--;
          updateDisplay(totalTime);

          if (totalTime <= 0) {
            clearInterval(timer);
            showEndImage();
          }
        }, 1000);
      }

      // Event listeners
      startBtn.addEventListener('click', startTimer);
      stopBtn.addEventListener('click', stopTimer);
      restartBtn.addEventListener('click', restartTimer);
      cancelBtn.addEventListener('click', cancelTimer);
      repeatBtn.addEventListener('click', repeatTimer);
    });