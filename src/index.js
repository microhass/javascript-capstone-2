import './style.css';
// const apiUrl = 'https://api.tvmaze.com/shows';
// const likesApiUrl = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/EK8AqlUP7MtIYG7gJYqn/likes/';
function showComments(element) {
  // Get the top section of the element.
  const topSection = element.querySelector('.top-section');

  // Create a new popup element.
  const popup = document.createElement('div');
  popup.classList.add('popup');

  // Add the top section to the popup element.
  popup.appendChild(topSection);

  // Calculate the position of the popup element.
  const top = element.offsetTop;
  const left = element.offsetLeft;

  // Position the popup element.
  popup.style.top = `${top}px`;
  popup.style.left = `${left}px`;

  // Display the popup element.
  popup.style.display = 'block';

  // Get the selected item ID from the button.
  const itemId = element.getAttribute('data-item-id');

  // Make an API call to get the details of the selected item.
  const xhr = new XMLHttpRequest();
  xhr.open('GET', `/api/items/${itemId}`);
  xhr.onload = function () {
    if (xhr.status === 200) {
      const itemDetails = JSON.parse(xhr.responseText);
      popup.innerHTML = `${itemDetails.name} - ${itemDetails.description}`;
    }
  };
  xhr.send();
}

// Add an event listener to the button.
showComments.addEventListener('click', showComments);

