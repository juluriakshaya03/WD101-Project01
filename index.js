const form = document.getElementById('registrationForm');
const tableBody = document.getElementById('userTableBody');

form.addEventListener('submit', function(event) {
    event.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const dob = document.getElementById('dob').value;
    const acceptedTerms = document.getElementById('acceptedTerms').checked;
    
    // Validate age between 18 and 55
    const today = new Date();
    const dobDate = new Date(dob);
    const age = today.getFullYear() - dobDate.getFullYear();
    if (age < 18 || age > 55) {
        alert("Date of Birth must be between 18 and 55 years old.");
        return;
    }
    
    // Add the data to the table
    const newRow = document.createElement('tr');
    newRow.innerHTML = `
        <td>${name}</td>
        <td>${email}</td>
        <td>${password}</td>
        <td>${dob}</td>
        <td>${acceptedTerms ? 'Yes' : 'No'}</td>
    `;
    tableBody.appendChild(newRow);
    
    // Save data to localStorage
    const userData = {
        name: name,
        email: email,
        password: password,
        dob: dob,
        acceptedTerms: acceptedTerms
    };
    
    let storedData = localStorage.getItem('userData');
    if (!storedData) {
        storedData = [];
    } else {
        storedData = JSON.parse(storedData);
    }
    
    storedData.push(userData);
    localStorage.setItem('userData', JSON.stringify(storedData));
    
    // Clear form fields
    form.reset();
});

// Load saved data from localStorage
const savedUserData = localStorage.getItem('userData');
if (savedUserData) {
    const userDataArray = JSON.parse(savedUserData);
    userDataArray.forEach(userData => {
        const newRow = document.createElement('tr');
        newRow.innerHTML = `
            <td>${userData.name}</td>
            <td>${userData.email}</td>
            <td>${userData.password}</td>
            <td>${userData.dob}</td>
            <td>${userData.acceptedTerms ? 'Yes' : 'No'}</td>
        `;
        tableBody.appendChild(newRow);
    });
}