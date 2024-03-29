document.addEventListener('DOMContentLoaded', () => {
    const fileInput = document.getElementById('file-input');
    const uploadButton = document.getElementById('upload-btn');
    const dataContainer = document.getElementById('data-container');
  
    uploadButton.addEventListener('click', () => {
      const file = fileInput.files[0];
      if (file) {
        uploadCSVFile(file);
      } else {
        alert('Please select a file.');
      }
    });
  
    function uploadCSVFile(file) {
      const formData = new FormData();
      formData.append('file', file);
  
      fetch('/upload', {
        method: 'POST',
        body: formData
      })
      .then(response => response.json())
      .then(data => {
        // Display data in the container
        displayData(data);
      })
      .catch(error => {
        console.error('Error uploading file:', error);
        alert('Error uploading file. Please try again.');
      });
    }
  
    function displayData(data) {
      dataContainer.innerHTML = ''; // Clear previous data
  
      // Create a table
      const table = document.createElement('table');
      const thead = document.createElement('thead');
      const tbody = document.createElement('tbody');
  
      // Add table headers
      const headers = Object.keys(data[0]);
      const headerRow = document.createElement('tr');
      headers.forEach(header => {
        const th = document.createElement('th');
        th.textContent = header;
        headerRow.appendChild(th);
      });
      thead.appendChild(headerRow);
  
      // Add table rows
      data.forEach(row => {
        const tr = document.createElement('tr');
        headers.forEach(header => {
          const td = document.createElement('td');
          td.textContent = row[header];
          tr.appendChild(td);
        });
        tbody.appendChild(tr);
      });
  
      // Append the table to the container
      table.appendChild(thead);
      table.appendChild(tbody);
      dataContainer.appendChild(table);
    }
  });
  