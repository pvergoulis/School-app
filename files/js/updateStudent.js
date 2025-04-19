window.addEventListener('DOMContentLoaded', () => {
    const studentData = JSON.parse(localStorage.getItem('studentToEdit'));
    const msg = document.querySelector('#updated')

    if (!studentData) {
      alert('Δεν βρέθηκαν δεδομένα Μαθητη');
      return;
    }

   
  
    
    document.getElementById('firstname').value = studentData.firstname;
    document.getElementById('lastname').value = studentData.lastname;
    document.getElementById('email').value = studentData.email;
    document.getElementById('age').value = studentData.age;
    document.getElementById('phone').value = studentData.phone;
    document.getElementById('subject').value = studentData.subjects.map(s => s.subjectName).join(', ');
  
    
    document.getElementById('form').addEventListener('submit', async (e) => {
      e.preventDefault();

      if(msg){
        msg.innerHTML = 'Ο μαθητης ενημερόθηκε'
        msg.style.color = 'green'
    }
  
      const updatedStudent = {
        firstname: document.getElementById('firstname').value,
        lastname: document.getElementById('lastname').value,
        email: document.getElementById('email').value,
        age: Number(document.getElementById('age').value),
        phone: document.getElementById('phone').value,
        subjects: document.getElementById('subject').value.split(',').map(s => ({ subjectName: s.trim() }))
      };
  
      try {
        const response = await axios.patch(`http://localhost:3000/api/students/update/${updatedStudent.email}`, updatedStudent);
      } catch (err) {
        console.error("Σφάλμα κατά την ενημέρωση:", err);
        alert("Προέκυψε σφάλμα.");
      }
    });
  });