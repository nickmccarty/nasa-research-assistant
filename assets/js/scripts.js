// Function to render results as a table with clickable rows
function renderResultsTable(results) {
    const tableDiv = document.getElementById('recommended-articles');
    const title = document.createElement('h4');
    title.textContent = 'Recommended Articles from NTRS:';
    title.className = 'text-white';
    tableDiv.appendChild(title);
  
    const table = document.createElement('table');
    table.className = 'table table-bordered table-white';
  
    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');
    const scoreHeader = document.createElement('th');
    scoreHeader.textContent = 'Score';
    const titleHeader = document.createElement('th');
    titleHeader.textContent = 'Title';
    headerRow.appendChild(scoreHeader);
    headerRow.appendChild(titleHeader);
    thead.appendChild(headerRow);
    table.appendChild(thead);
  
    const tbody = document.createElement('tbody');
    const firstFiveResults = results.slice(0, 5);
  
    firstFiveResults.forEach((result) => {
      const row = document.createElement('tr');
      const scoreCell = document.createElement('td');
      scoreCell.textContent = result.score;
      const titleCell = document.createElement('td');
      const titleLink = document.createElement('a');
      titleLink.textContent = result.title;
      titleLink.href = result.url; // Set the URL
      titleLink.target = '_blank'; // Open in a new tab
      titleCell.appendChild(titleLink);
      row.appendChild(scoreCell);
      row.appendChild(titleCell);
  
      // Add a click event listener to the row
      row.addEventListener('click', () => {
        // Navigate to the URL when the row is clicked
        window.location.href = result.url;
      });
  
      // Add a hover effect
      row.addEventListener('mouseover', () => {
        row.style.backgroundColor = '#f2f2f2'; // Change background color on hover
      });
  
      row.addEventListener('mouseout', () => {
        row.style.backgroundColor = ''; // Reset background color when not hovering
      });
  
      tbody.appendChild(row);
    });
  
    table.appendChild(tbody);
    tableDiv.appendChild(table);
  }
  
  // Function to fetch JSON data from the server
  function fetchJsonData() {
    fetch('/api/v1/title-recos.json')
      .then((response) => response.json())
      .then((data) => {
        if (data.results) {
          // Call the renderResultsTable function with the JSON data
          renderResultsTable(data.results);
        } else {
          console.error('Invalid JSON data format.');
        }
      })
      .catch((error) => {
        console.error('Error fetching JSON data:', error);
      });
  }
  
  // Add an event listener to the button to trigger data fetching and rendering
  document.getElementById('query-button').addEventListener('click', fetchJsonData);
  