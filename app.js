// Define the CRUD API URL
const apiUrl = 'https://crudcrud.com/api/57b3d43ad05d4273b92b465066135c23/appointment';

// Function to fetch and display data



document.getElementById('registrationForm').addEventListener('submit', (e) => {
    e.preventDefault();

    // Get form data
    const formData = new FormData(e.target);
    const formDataObject = {};
    formData.forEach((value, key) => {
        formDataObject[key] = value;
    });

    // Send data to the API
    axios.post(apiUrl, formDataObject)
        .then(() => {
            // Clear the form
            e.target.reset();
            // Fetch and display updated data
            fetchData();
        })
        .catch((error) => {
            console.error('Error posting data:', error);
        });
});
function fetchData() {
    axios.get(apiUrl)
        .then((response) => {
            const dataList = document.getElementById('dataList');
            dataList.innerHTML = ''; // Clear previous data

            response.data.forEach((item, index) => {
                const listItem = document.createElement('div');
                listItem.classList.add('alert', 'alert-primary', 'mt-2');
                listItem.innerHTML = `
                    <p><strong>Name:</strong> ${item.name}</p>
                    <p><strong>Email:</strong> ${item.email}</p>
                    <p><strong>Phone:</strong> ${item.phone}</p>
                    <button class="btn btn-warning edit-button" data-id="${item._id}">Edit</button>
                    <button class="btn btn-danger delete-button" data-id="${item._id}">Delete</button>
                `;
                dataList.appendChild(listItem);
            });
        })
        .catch((error) => {
            console.error('Error fetching data:', error);
        });
}

// Initial data fetch and display
fetchData();

// Function to update data
// Function to update data
function updateData(dataId, updatedData) {
    const editUrl = `${apiUrl}/${dataId}`; // Construct the update URL

    // Send the update request
    axios.put(editUrl, updatedData)
        .then(() => {
            // Fetch and display updated data
            fetchData();
        })
        .catch((error) => {
            console.error('Error updating data:', error);
        });
}

// Event delegation for edit and delete buttons
document.getElementById('dataList').addEventListener('click', (e) => {
    if (e.target.classList.contains('edit-button')) {
        const dataId = e.target.getAttribute('data-id');
        
        // Fetch the existing data for editing
        axios.get(`${apiUrl}/${dataId}`)
            .then((response) => {
                const existingData = response.data;

                // Prompt the user for updated data with existing data as placeholders
                const updatedData = {
                    name: prompt('Enter updated name:', existingData.name),
                    email: prompt('Enter updated email:', existingData.email),
                    phone: prompt('Enter updated phone:', existingData.phone),
                };

                if (updatedData.name !== null && updatedData.email !== null && updatedData.phone !== null) {
                    updateData(dataId, updatedData);
                }
            })
            .catch((error) => {
                console.error('Error fetching data for edit:', error);
            });
    } else if (e.target.classList.contains('delete-button')) {
        // Handle delete button click
        const dataId = e.target.getAttribute('data-id');
        const deleteUrl = `${apiUrl}/${dataId}`; // Construct the delete URL

        // Send a DELETE request to remove the data
        axios.delete(deleteUrl)
            .then(() => {
                // Fetch and display updated data after deletion
                fetchData();
            })
            .catch((error) => {
                console.error('Error deleting data:', error);
            });
    }
});
