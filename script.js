let students = JSON.parse(localStorage.getItem('students')) || []; // Load students from local storage or initialize an empty array

function renderStudents() {
    const tbody = document.getElementById('studentTableBody');
    tbody.innerHTML = '';
    students.forEach((student, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${student.name}</td>
            <td>${student.age}</td>
            <td>${student.grade}</td>
            <td>${student.gender}</td>
            <td>${student.active ? 'Yes' : 'No'}</td>
            <td>
                <button class="btn btn-warning btn-sm" onclick="editStudent(${index})">Edit</button>
                <button class="btn btn-danger btn-sm" onclick="deleteStudent(${index})">Delete</button>
            </td>
        `;
        tbody.appendChild(row);
    });

    // Save the updated students array to localStorage
    localStorage.setItem('students', JSON.stringify(students));
}

function handleFormSubmit(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const age = document.getElementById('age').value;
    const grade = document.getElementById('grade').value;
    const gender = document.querySelector('input[name="gender"]:checked')?.value || 'Not specified';
    const active = document.getElementById('active').checked;
    const index = document.getElementById('studentIndex')?.value || '-1';

    if (index === '-1') {
        students.push({ name, age, grade, gender, active });
    } else {
        students[index] = { name, age, grade, gender, active };
        document.getElementById('studentIndex').value = '-1'; // Reset index after editing
    }

    document.getElementById('studentForm').reset();
    renderStudents();
}

function editStudent(index) {
    const student = students[index];
    document.getElementById('name').value = student.name;
    document.getElementById('age').value = student.age;
    document.getElementById('grade').value = student.grade;
    document.querySelector(`input[name="gender"][value="${student.gender}"]`).checked = true;
    document.getElementById('active').checked = student.active;

    const hiddenInput = document.createElement('input');
    hiddenInput.type = 'hidden';
    hiddenInput.id = 'studentIndex';
    hiddenInput.value = index;
    document.getElementById('studentForm').appendChild(hiddenInput);
}

function deleteStudent(index) {
    students.splice(index, 1); // Remove the student from the array
    renderStudents(); // Update the table and local storage
}

function clearAllStudents() {
    students = []; // Clear the students array
    localStorage.removeItem('students'); // Remove from local storage
    renderStudents(); // Update the UI
}

// Initial load when page loads
window.onload = renderStudents;

// Attach form submit handler
document.getElementById('studentForm').addEventListener('submit', handleFormSubmit);

// Attach clear all button handler (assuming there's a button with id 'clearAllBtn')
document.getElementById('clearAllBtn').addEventListener('click', clearAllStudents);
