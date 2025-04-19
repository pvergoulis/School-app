window.addEventListener('DOMContentLoaded', () => {
    const teacherData = JSON.parse(localStorage.getItem('teacherToEdit'));
    const msg = document.querySelector('#updated')

    if (!teacherData) {
      alert('Δεν βρέθηκαν δεδομένα καθηγητή!');
      return;
    }

   
  
    
    document.getElementById('vat').value = teacherData.vat;
    document.getElementById('firstname').value = teacherData.firstname;
    document.getElementById('lastname').value = teacherData.lastname;
    document.getElementById('email').value = teacherData.email;
    document.getElementById('age').value = teacherData.age;
    document.getElementById('city').value = teacherData.city;
    document.getElementById('phone').value = teacherData.phone;
    document.getElementById('cv').value = teacherData.cv;
    document.getElementById('subjects').value = teacherData.subjects.map(s => s.subjectName).join(', ');
  
    
    document.getElementById('editForm').addEventListener('submit', async (e) => {
      e.preventDefault();
      if(msg){
        msg.innerHTML = 'Ο καθηγητης ενημερόθηκε'
        msg.style.color = 'green'
    }
  
      const updatedTeacher = {
        vat: document.getElementById('vat').value,
        firstname: document.getElementById('firstname').value,
        lastname: document.getElementById('lastname').value,
        email: document.getElementById('email').value,
        age: Number(document.getElementById('age').value),
        city: document.getElementById('city').value,
        phone: document.getElementById('phone').value,
        cv: document.getElementById('cv').value,
        subjects: document.getElementById('subjects').value.split(',').map(s => ({ subjectName: s.trim() }))
      };
  
      try {
        const response = await axios.patch(`http://localhost:3000/api/teachers/update/${updatedTeacher.vat}`, updatedTeacher);
        alert("Η ενημέρωση έγινε επιτυχώς!");
        window.location.href = "./teachers.html";
      } catch (err) {
        console.error("Σφάλμα κατά την ενημέρωση:", err);
        alert("Προέκυψε σφάλμα.");
      }
    });
  });