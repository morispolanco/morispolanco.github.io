const generateButton = document.getElementById('generate-button');
const inputTextArea = document.getElementById('input-textarea');
const outputText = document.getElementById('output-text');

generateButton.addEventListener('click', function() {
  const text = inputTextArea.value;
  
  if (text.trim() !== '') {
    const requestData = {
      spellId: "YiTnWQ0VLkGdU16i7bYLy",
      spellVersionId: "b24eBWzc5rNXzISlb4LjK",
      inputs: {
        input: text
      }
    };
    
    fetch('https://api.respell.ai/v1/run', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Bearer 260cee54-6d54-48ba-92e8-bf641b5f4805',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestData)
    })
    .then(response => response.json())
    .then(data => {
      const output = data.outputs.output;
      outputText.textContent = output;
    })
    .catch(error => {
      console.error('Error:', error);
    });
  }
});
