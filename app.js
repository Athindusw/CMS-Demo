document.getElementById('registrationForm').addEventListener('submit', async (e) => {
    e.preventDefault();
  
    const studentName = document.getElementById('studentName').value;
    const address = document.getElementById('address').value;
    const contactNO = document.getElementById('contactNo').value;
    const studentImage = document.getElementById('studentImage').files[0];
  
    // Convert image to base64
    const reader = new FileReader();
    reader.readAsDataURL(studentImage);
    reader.onloadend = async () => {
      const base64Image = reader.result;
  
      // Prepare student data
      const studentData = {
        studentName,
        address,
        contactNO,
        image: base64Image
      };
  
      // Send POST request to register the student
      const response = await fetch('http://localhost:8080/api/students', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(studentData)
      });
  
      if (response.ok) {
        alert('Student registered successfully');
        fetchStudents();  // Fetch and display the updated list of students
      } else {
        alert('Error registering student');
      }
    };
  });
  
  // Fetch and display list of students
  async function fetchStudents() {
    const response = await fetch('http://localhost:8080/api/students');
    const students = await response.json();
  
    const studentsTableBody = document.querySelector('#studentsTable tbody');
    studentsTableBody.innerHTML = '';  // Clear previous data
  
    students.forEach(student => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${student.studentName}</td>
        <td>${student.address}</td>
        <td>${student.contactNO}</td>
        <td><img src="${student.image}" alt="Student Image" width="50"></td>
      `;
      studentsTableBody.appendChild(row);
    });
  }
  
  // Fetch the student list on page load
  fetchStudents();
  