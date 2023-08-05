// Define the custom element
class ProjectCard extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
      this.shadowRoot.appendChild(document.importNode(projectCardTemplate.content, true));
    }
  
    connectedCallback() {
      // Populate the custom element with data
      let h2 = this.shadowRoot.querySelector('h2');
      let img = this.shadowRoot.querySelector('img');
      let p = this.shadowRoot.querySelector('p');
      let a = this.shadowRoot.querySelector('a');
  
      h2.textContent = this.getAttribute('name');
      img.src = this.getAttribute('image');
      img.alt = this.getAttribute('alt');
      p.textContent = this.getAttribute('description');
      a.href = this.getAttribute('url');
    }
  }
  
// Register the custom element
customElements.define('project-card', ProjectCard);

// Fetch data from the server and populate cards
async function fetchAndPopulateData(url) {
  try {
    let response = await fetch(url);
    let data = await response.json();

    let projectCardContainer = document.getElementById('project-card-container');
    projectCardContainer.innerHTML = '';

    data.forEach((project) => {
      let projectCard = document.createElement('project-card');
      projectCard.setAttribute('name', project.name);
      projectCard.setAttribute('image', project.image);
      projectCard.setAttribute('alt', project.alt);
      projectCard.setAttribute('description', project.description);
      projectCard.setAttribute('url', project.url);
      projectCardContainer.appendChild(projectCard);
    });
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

// Load Local button click event
let loadLocalButton = document.getElementById('load-local');
loadLocalButton.addEventListener('click', (event) => {
  event.preventDefault(); 
  // Fetch data from localStorage and populate cards
  let localData = JSON.parse(localStorage.getItem('projects'));
  if (localData && Array.isArray(localData)) {
    let projectCardContainer = document.getElementById('project-card-container');
    projectCardContainer.innerHTML = '';

    localData.forEach((project) => {
      let projectCard = document.createElement('project-card');
      projectCard.setAttribute('name', project.name);
      projectCard.setAttribute('image', project.image);
      projectCard.setAttribute('alt', project.alt);
      projectCard.setAttribute('description', project.description);
      projectCard.setAttribute('url', project.url);
      projectCardContainer.appendChild(projectCard);
    });
  } else {
    alert('No local data found. Please fetch data from the remote server first.');
  }
});

// Load Remote button click event
let loadRemoteButton = document.getElementById('load-remote');
loadRemoteButton.addEventListener('click', (event) => {
  event.preventDefault(); 
  // Fetch data from the remote server
  let remoteUrl = 'https://jsonplaceholder.typicode.com/todos'; // 
  fetchAndPopulateData(remoteUrl)
    .then((data) => {
      // Save data to localStorage for future use
      localStorage.setItem('projects', JSON.stringify(data));
    })
    .catch((error) => {
      console.error('Error fetching remote data:', error);
    });
});

// Initial load from localStorage (if available)
window.addEventListener('DOMContentLoaded', () => {
  let localData = JSON.parse(localStorage.getItem('projects'));
  if (localData) {
    fetchAndPopulateData(localData);
  }
});
