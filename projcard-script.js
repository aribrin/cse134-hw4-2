// script.js
// Define the CustomElement
class ProjectCard extends HTMLElement {
  constructor() {
      super();

      // Create a shadow DOM
      this.attachShadow({ mode: 'open' });

      // Define the HTML template for the custom element
      this.shadowRoot.innerHTML = `
          <div class="project-card">
              <h2></h2>
              <img src="" alt="">
              <p></p>
              <a href="#" target="_blank">Read More</a>
          </div>
      `;
  }

  connectedCallback() {
      // Get the data from the element attributes
      let projectName = this.getAttribute('project-name');
      let imageUrl = this.getAttribute('image-url');
      let description = this.getAttribute('description');
      let readMoreLink = this.getAttribute('read-more-link');

      // Update the content in the shadow DOM
      this.shadowRoot.querySelector('h2').textContent = projectName;
      this.shadowRoot.querySelector('img').setAttribute('src', imageUrl);
      this.shadowRoot.querySelector('img').setAttribute('alt', projectName);
      this.shadowRoot.querySelector('p').textContent = description;
      this.shadowRoot.querySelector('a').setAttribute('href', readMoreLink);
  }
}

// Register the CustomElement
customElements.define('project-card', ProjectCard);

// Data loading
document.getElementById('loadLocal').addEventListener('click', () => {
  // Fetch data from local storage (Assuming you have stored data in 'localData' key)
  const localData = JSON.parse(localStorage.getItem('localData'));
  populateCards(localData);
});

document.getElementById('loadRemote').addEventListener('click', async () => {
  try {
      // Fetch data from a remote server (e.g., JSONPlaceholder)
      const response = await fetch('https://jsonplaceholder.typicode.com/todos');
      const remoteData = await response.json();
      populateCards(remoteData);
  } catch (error) {
      console.error('Error fetching remote data:', error);
  }
});
const root = document.documentElement;
const colors = ['#FF5733', '#33FF57', '#5733FF', '#FF33E5', '#33E5FF'];
root.style.setProperty('--card-border-color', colors[0]);

// Method to populate local storage with sample data
document.getElementById('populateLocalStorage').addEventListener('click', () => {
  const sampleData = [
      {
          id: 1,
          title: 'Project 1',
          imageUrl: 'path/to/image1.jpg',
          description: 'This is project 1 description.',
          readMoreLink: 'https://example.com/project1'
      },
      {
          id: 2,
          title: 'Project 2',
          imageUrl: 'path/to/image2.jpg',
          description: 'This is project 2 description.',
          readMoreLink: 'https://example.com/project2'
      },
      // Add more sample data as needed
  ];

  localStorage.setItem('localData', JSON.stringify(sampleData));
});

function populateCards(data) {
  let cardContainer = document.getElementById('cardContainer');

  // Clear the existing content
  cardContainer.innerHTML = '';

  // Create and append new project-card elements with data
  data.forEach(item => {
      let card = document.createElement('project-card');
      card.className = "project-card";
      card.setAttribute('project-name', item.title);
      card.setAttribute('image-url', 'path/to/image.jpg'); // Replace with actual image URL
      card.setAttribute('description', item.body);
      card.setAttribute('read-more-link', 'https://example.com'); // Replace with actual read more link
      cardContainer.appendChild(card);
  });

  
}
