document.addEventListener('DOMContentLoaded', function() {
  const ellipsis = document.getElementById('ellipsis');
  const dropdown = document.getElementById('dropdown');
  const submitTaskBtn = document.getElementById('submitTaskBtn');
  const boxes = document.querySelectorAll('.box');
  const images = document.querySelectorAll('.hover-zoom');
  const tasksContainer = document.getElementById('tasks-container'); // Ensure this exists in your HTML

  // Dropdown functionality
  ellipsis.addEventListener('click', function(event) {
      dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
      event.stopPropagation();
  });

  document.addEventListener('click', function(event) {
      if (!ellipsis.contains(event.target) && !dropdown.contains(event.target)) {
          dropdown.style.display = 'none';
      }
  });

  // Submit button click feedback
  submitTaskBtn.addEventListener('click', function() {
      alert('Task submitted!');
  });

  // Handle 'info' button click in each box
  boxes.forEach(box => {
      const infoButton = box.querySelector('.info-button');
      if (infoButton) {
          infoButton.addEventListener('click', function() {
              alert('Info button clicked in: ' + box.querySelector('h4').innerText);
          });
      }
  });

  // Make the content editable area respond to changes
  document.querySelectorAll('[contenteditable="true"]').forEach(editable => {
      editable.addEventListener('input', function() {
          console.log('Content updated in: ' + editable.closest('.box').querySelector('h4').innerText);
      });
  });

  // Smooth scroll functionality for links
  document.querySelectorAll('a.scroll-link').forEach(link => {
      link.addEventListener('click', function(event) {
          event.preventDefault();
          const targetId = this.getAttribute('href').substring(1);
          document.getElementById(targetId).scrollIntoView({
              behavior: 'smooth'
          });
      });
  });

  // Dark/Light mode toggle
  const modeToggleBtn = document.createElement('button');
  modeToggleBtn.textContent = 'Dark-Light';
  modeToggleBtn.style.position = 'absolute';
  modeToggleBtn.style.top = '85px'; // Adjust this value as needed
  modeToggleBtn.style.right = '60px'; // Adjust this value as needed
  modeToggleBtn.style.zIndex = '1000'; // Ensure it stays on top
  document.body.appendChild(modeToggleBtn);

  modeToggleBtn.addEventListener('click', function() {
      document.body.classList.toggle('dark-mode');
  });

  // Add key press event listener for Enter key on input fields
  document.querySelectorAll('input').forEach(input => {
      input.addEventListener('keypress', function(event) {
          if (event.key === 'Enter') {
              alert('Enter pressed in input: ' + input.placeholder);
          }
      });
  });

  // Create new sub-thread on button click
  document.querySelectorAll('.small-box button').forEach(button => {
      button.addEventListener('click', function() {
          const subThread = document.createElement('div');
          subThread.classList.add('sub-thread');
          subThread.innerHTML = '<p>New Sub-Thread</p>';
          this.closest('.small-box').appendChild(subThread);
      });
  });

  // Enlarge image on hover
  images.forEach(image => {
      image.addEventListener('mouseenter', function() {
          this.style.transform = 'scale(1.2)';
          this.style.zIndex = '10';
      });

      image.addEventListener('mouseleave', function() {
          this.style.transform = 'scale(1)';
          this.style.zIndex = '1';
      });
  });

  // Feature 1: Character Counter for text inputs
  document.querySelectorAll('textarea').forEach(textarea => {
      const counter = document.createElement('div');
      counter.classList.add('char-counter');
      textarea.parentNode.appendChild(counter);

      textarea.addEventListener('input', function() {
          counter.textContent = `Characters: ${this.value.length}`;
      });
  });

  // Feature 2: Modal Popup for additional content
  const modal = document.createElement('div');
  modal.id = 'myModal';
  modal.classList.add('modal');
  modal.innerHTML = `
      <div class="modal-content">
          <p></p>
      </div>`;
  document.body.appendChild(modal);

  // Only the modal close and click outside functionality remains
  window.addEventListener('click', function(event) {
      if (event.target === modal) {
          modal.style.display = 'none';
      }
  });

  // Feature 3: Drag and Drop functionality for boxes
  boxes.forEach(box => {
      box.setAttribute('draggable', true);
      box.addEventListener('dragstart', dragStart);
  });

  function dragStart(event) {
      event.dataTransfer.setData('text/plain', event.target.id);
  }

  document.querySelectorAll('.dropzone').forEach(dropzone => {
      dropzone.addEventListener('dragover', dragOver);
      dropzone.addEventListener('drop', drop);
  });

  function dragOver(event) {
      event.preventDefault();
  }

  function drop(event) {
      event.preventDefault();
      const id = event.dataTransfer.getData('text');
      const draggableElement = document.getElementById(id);
      const dropzone = event.target;
      dropzone.appendChild(draggableElement);
  }

  // Feature 4: Save content in local storage
  document.querySelectorAll('[contenteditable="true"]').forEach(editable => {
      const key = editable.closest('.box').querySelector('h4').innerText;

      // Load from local storage
      if (localStorage.getItem(key)) {
          editable.innerHTML = localStorage.getItem(key);
      }

      editable.addEventListener('input', function() {
          localStorage.setItem(key, this.innerHTML);
      });
  });

  // Feature 5: Context menu on right-click for images
  images.forEach(image => {
      image.addEventListener('contextmenu', function(event) {
          event.preventDefault();
          alert('Right-click menu for image: ' + image.src);
      });
  });

  // Load and display tasks from tasks.json
  // Load and display tasks from tasks.json
fetch('tasks.json')
.then(response => response.json())
.then(data => {
    data.tasks.forEach(task => {
        const taskElement = document.createElement('div');
        taskElement.className = 'task'; 
        const taskTitle = document.createElement('h2');
        taskTitle.textContent = task.task_title;
        taskTitle.style.color = 'blue'; 
        taskTitle.style.marginTop = '40px';
        taskTitle.style.marginLeft = '20px';
        taskTitle.style.fontWeight = 'bold';
        taskElement.appendChild(taskTitle);

        
        const taskDescription = document.createElement('p');
        taskElement.className = 'task';
        taskDescription.textContent = task.task_description;
        taskDescription.innerHTML = `As a project manager, you play an important role
in leading a project through initiation, planning, execution, monitoring,
controlling, and completion. How?<br>Do you want to manage each and every 
step of your life?`;
        taskDescription.style.marginLeft = '60px';
        
        taskElement.appendChild(taskDescription);

        task.assets.forEach(asset => {
            const assetElement = document.createElement('div');
            assetElement.className = 'asset';

          
            const assetTitle = document.createElement('h4');
            assetTitle.textContent = asset.asset_title;
            assetTitle.style.fontWeight = 'bold'; // Example CSS style
            assetTitle.style.fontSize = '20px';
            assetTitle.style.marginLeft = '20px'; // Example CSS style
            assetElement.appendChild(assetTitle);

            const assetDescription = document.createElement('p');
            assetDescription.textContent = asset.asset_description;
          
            assetDescription.style.marginLeft = '40px'
            assetElement.appendChild(assetDescription);

            if (asset.asset_type === 'display_asset') {
                const iframeWrapper = document.createElement('div');
                iframeWrapper.classList.add('responsive-iframe-wrapper');

                const iframe = document.createElement('iframe');
                iframe.src = asset.asset_content;
                iframe.allowFullscreen = true;

                iframeWrapper.appendChild(iframe);
                assetElement.appendChild(iframeWrapper);
            }

            taskElement.appendChild(assetElement);
        });

        tasksContainer.appendChild(taskElement);
    });
})
.catch(error => console.error('Error loading JSON data:', error));
});
