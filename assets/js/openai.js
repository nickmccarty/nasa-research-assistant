const apiKey = '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'; // Replace with your OpenAI API key
const endpoint = 'https://api.openai.com/v1/chat/completions';

// Function to render the GPT-3 response in the chatgpt-output div
function renderGPT3Response(response) {
  const content = response.choices[0].message.content;
  const chatgptOutputDiv = document.getElementById('chatgpt-output');
  
//   // Create a header element
//   const header = document.createElement('h4');
//   header.textContent = 'ChatGPT Output:';
  
  // Clear any existing content in chatgptOutputDiv
  chatgptOutputDiv.innerHTML = '';
  
  // Append the header and content to chatgptOutputDiv
//   chatgptOutputDiv.appendChild(header);
  chatgptOutputDiv.insertAdjacentHTML('beforeend', content);
}

// Create a JSON object with the request data
const requestData = {
  model: 'gpt-3.5-turbo',
  messages: [
    {
      role: 'user',
      content: 'Summarize the research results and provide guidance for the user based on the following information:\n\nArXiv Articles:\n1. [Title of ArXiv Article 1]\n   - Authors: [Authors]\n   - Published: [Published Date]\n   - Summary: [Summary]\n\n2. [Title of ArXiv Article 2]\n   - Authors: [Authors]\n   - Published: [Published Date]\n   - Summary: [Summary]\n\n[Repeat for other articles]\n\nRecommended NTRS Articles:\n1. [Title of NTRS Article 1]\n   - Score: [Score]\n   - [Link to NTRS Article 1]\n\n2. [Title of NTRS Article 2]\n   - Score: [Score]\n   - [Link to NTRS Article 2]\n\n[Repeat for other articles]\n\nProvide guidance to the user based on the research direction and interests shown in the articles. Highlight key insights and suggest potential areas of further exploration.',
    },
  ],
  temperature: 0.7,
};

// Send the request using fetch
fetch(endpoint, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${apiKey}`,
  },
  body: JSON.stringify(requestData),
})
  .then((response) => response.json())
  .then((data) => {
    // Handle the API response by rendering it in chatgpt-output div
    renderGPT3Response(data);
  })
  .catch((error) => {
    console.error('Error making API request:', error);
  });
