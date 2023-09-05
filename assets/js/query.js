import { PineconeClient } from "../../node_modules/@pinecone-database/pinecone/dist/pinecone-generated-ts-fetch";

const pinecone = new PineconeClient();
await pinecone.init({
  environment: "gcp-starter",
  apiKey: "499d698b-a369-4aae-85a9-e710e37e3475",
});

document.addEventListener('DOMContentLoaded', function() {
    const queryButton = document.getElementById('query-button');
    const textArea = document.getElementById('text-area-1');
    const openAIApiKey = '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'; // Replace with your actual OpenAI API key
  
    queryButton.addEventListener('click', async () => {
      const userEnteredText = textArea.value.trim();
  
      if (userEnteredText) {
        try {
          // Fetch embeddings from OpenAI
          const openaiResponse = await fetch('https://api.openai.com/v1/embeddings', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${openAIApiKey}`
            },
            body: JSON.stringify({
              input: userEnteredText,
              model: 'text-embedding-ada-002'
            })
          });
  
          if (openaiResponse.ok) {
            const openaiData = await openaiResponse.json();
            const embeddings = openaiData.embedding;
  
            // Query Pinecone with embeddings
            const pineconeIndex = pinecone.Index("ntrs-article-abstracts"); // Replace with your index name
            const queryRequest = {
              vector: embeddings,
              topK: 10,
              includeValues: true,
              includeMetadata: true,
              namespace: "ntrs-article-abstracts" // Replace with your namespace
            };
            
            const pineconeResponse = await pineconeIndex.query({ queryRequest });
  
            console.log('Pinecone Response:', pineconeResponse);
          } else {
            console.error('OpenAI Error:', openaiResponse.statusText);
          }
        } catch (error) {
          console.error('An error occurred:', error);
        }
      } else {
        console.log('Please enter text.');
      }
    });
  });

  // document.addEventListener('DOMContentLoaded', function() {
//     const queryButton = document.getElementById('query-button');
//     const textArea = document.getElementById('text-area-1');
//     const apiKey = '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'; // Replace with your actual OpenAI API key
  
//     queryButton.addEventListener('click', async () => {
//       const userEnteredText = textArea.value.trim();
  
//       if (userEnteredText) {
//         try {
//           const response = await fetch('https://api.openai.com/v1/embeddings', {
//             method: 'POST',
//             headers: {
//               'Content-Type': 'application/json',
//               'Authorization': `Bearer ${apiKey}`
//             },
//             body: JSON.stringify({
//               input: userEnteredText,
//               model: 'text-embedding-ada-002'
//             })
//           });
  
//           if (response.ok) {
//             const data = await response.json();
//             console.log('Embeddings:', data);
//           } else {
//             console.error('Error:', response.statusText);
//           }
//         } catch (error) {
//           console.error('An error occurred:', error);
//         }
//       } else {
//         console.log('Please enter text.');
//       }
//     });
//   });
  
  