// document.addEventListener('DOMContentLoaded', function () {
//     const apiUrl = 'https://export.arxiv.org/api/query';
  
//     const searchForm = document.getElementById('search-form');
//     const keywordInput = document.getElementById('keyword');
//     const resultsDiv = document.getElementById('results');
  
//     searchForm.addEventListener('submit', function (event) {
//       event.preventDefault();
  
//       const keyword = keywordInput.value;
//       if (keyword.trim() === '') {
//         return;
//       }
  
//       const query = `all:${keyword}`;
//       const maxResults = 10;
//       const fullUrl = `${apiUrl}?search_query=${query}&max_results=${maxResults}`;
  
//       fetch(fullUrl)
//         .then(response => response.text())
//         .then(data => {
//           const parser = new DOMParser();
//           const xmlDoc = parser.parseFromString(data, 'text/xml');
  
//           const entries = xmlDoc.querySelectorAll('entry');
//           resultsDiv.innerHTML = ''; // Clear previous results
  
//           // Convert NodeList to Array for sorting
//           const entriesArray = Array.from(entries);
  
//           entriesArray.sort((entryA, entryB) => {
//             const publishedA = new Date(entryA.querySelector('published').textContent);
//             const publishedB = new Date(entryB.querySelector('published').textContent);
//             return publishedB - publishedA; // Descending order
//           });
  
//           renderResults(entriesArray);
//         })
//         .catch(error => {
//           console.error('Error fetching arXiv data:', error);
//         });
//     });
  
//     // Helper function to fetch and render results by author
//     function fetchAndRenderResultsByAuthor(authorName) {
//       const query = `au:${authorName}`;
//       const maxResults = 10;
//       const fullUrl = `${apiUrl}?search_query=${query}&max_results=${maxResults}`;
  
//       fetch(fullUrl)
//         .then(response => response.text())
//         .then(data => {
//           const parser = new DOMParser();
//           const xmlDoc = parser.parseFromString(data, 'text/xml');
  
//           const entries = xmlDoc.querySelectorAll('entry');
//           renderResults(entries);
//         })
//         .catch(error => {
//           console.error('Error fetching arXiv data:', error);
//         });
//     }
  
//     function renderResults(entries) {
//         entries.forEach(entry => {
//           const doiLink = entry.querySelector('link[title="doi"]');
//           if (doiLink) {
//             const title = entry.querySelector('title').textContent;
//             const pdfLink = entry.querySelector('link[title="pdf"]').getAttribute('href'); // Declare pdfLink here
//             const authors = Array.from(entry.querySelectorAll('author')).map(author => {
//               const authorName = author.querySelector('name').textContent;
//               return `<a href="#" class="author-link" data-author="${authorName}">${authorName}</a>`;
//             }).join(', ');
//             const categories = Array.from(entry.querySelectorAll('category')).map(category => category.getAttribute('term')).join(', ');
//             const published = entry.querySelector('published').textContent;
      
//             const resultDiv = document.createElement('div');
//             resultDiv.classList.add('result');
//             resultDiv.innerHTML = `
//               <h2><a href="${pdfLink}" target="_blank">${title}</a></h2>
//               <p>Authors: ${authors}</p>
//               <p>Categories: ${categories}</p>
//               <p>Published: ${published}</p>
//               <p>DOI: <a href="${doiLink.getAttribute('href')}" target="_blank">${doiLink.getAttribute('href')}</a></p>
//             `;
      
//             resultsDiv.appendChild(resultDiv);
//           }
//         });
      
//         // Listen for clicks on author links
//         resultsDiv.addEventListener('click', event => {
//           const clickedAuthorLink = event.target.closest('.author-link');
//           if (clickedAuthorLink) {
//             event.preventDefault(); // Prevent default link behavior
//             const clickedAuthor = clickedAuthorLink.getAttribute('data-author');
//             fetchAndRenderResultsByAuthor(clickedAuthor);
//           }
//         });
//       }      
//   });
  
document.addEventListener('DOMContentLoaded', function () {
    const apiUrl = 'https://export.arxiv.org/api/query';
  
    const queryTextElement = document.getElementById('query-text');
    const queryButton = document.getElementById('query-button');
    const recommendedAuthorsDiv = document.getElementById('recommended-authors');
  
    queryButton.addEventListener('click', function () {
      const queryText = queryTextElement.value.trim();
  
      if (queryText === '') {
        return;
      }
  
      const query = `all:${queryText}`;
      const maxResults = 10;
      const fullUrl = `${apiUrl}?search_query=${query}&max_results=${maxResults}`;
  
      fetch(fullUrl)
        .then(response => response.text())
        .then(data => {
          const parser = new DOMParser();
          const xmlDoc = parser.parseFromString(data, 'text/xml');
  
          const entries = xmlDoc.querySelectorAll('entry');
          recommendedAuthorsDiv.innerHTML = ''; // Clear previous results
  
          // Convert NodeList to Array for sorting
          const entriesArray = Array.from(entries);
  
          entriesArray.sort((entryA, entryB) => {
            const publishedA = new Date(entryA.querySelector('published').textContent);
            const publishedB = new Date(entryB.querySelector('published').textContent);
            return publishedB - publishedA; // Descending order
          });
  
          renderResults(entriesArray);
        })
        .catch(error => {
          console.error('Error fetching arXiv data:', error);
        });
    });
  
    function renderResults(entries) {
      // Add the header for recommended articles
      const headerDiv = document.createElement('div');
      headerDiv.classList.add('result-header');
      headerDiv.textContent = 'Recommended Articles from arXiv.org:';
      recommendedAuthorsDiv.appendChild(headerDiv);
  
      entries.forEach(entry => {
        const doiLink = entry.querySelector('link[title="doi"]');
        if (doiLink) {
          const title = entry.querySelector('title').textContent;
          const pdfLink = entry.querySelector('link[title="pdf"]').getAttribute('href'); // Declare pdfLink here
          const authors = Array.from(entry.querySelectorAll('author')).map(author => {
            const authorName = author.querySelector('name').textContent;
            return `<a href="#" class="author-link" data-author="${authorName}">${authorName}</a>`;
          }).join(', ');
          const categories = Array.from(entry.querySelectorAll('category')).map(category => category.getAttribute('term')).join(', ');
          const published = entry.querySelector('published').textContent;
          const summary = entry.querySelector('summary').textContent; // Get the summary
  
          const resultDiv = document.createElement('div');
          resultDiv.classList.add('result');
          resultDiv.innerHTML = `
            <h2><a href="${pdfLink}" target="_blank">${title}</a></h2>
            <p>Authors: ${authors}</p>
            <p>Categories: ${categories}</p>
            <p>Published: ${published}</p>
            <p>Description: ${summary}</p> <!-- Display the summary -->
            <p>DOI: <a href="${doiLink.getAttribute('href')}" target="_blank">${doiLink.getAttribute('href')}</a></p>
          `;
  
          recommendedAuthorsDiv.appendChild(resultDiv);
        }
      });
  
      // Listen for clicks on author links
      recommendedAuthorsDiv.addEventListener('click', event => {
        const clickedAuthorLink = event.target.closest('.author-link');
        if (clickedAuthorLink) {
          event.preventDefault(); // Prevent default link behavior
          const clickedAuthor = clickedAuthorLink.getAttribute('data-author');
          fetchAndRenderResultsByAuthor(clickedAuthor);
        }
      });
    }
  });
  
