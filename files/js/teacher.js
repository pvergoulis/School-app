window.addEventListener('DOMContentLoaded',()=>{



    axios.get('http://localhost:3000/api/teachers')
        .then((res)=>{
            const teachers = res.data.data
            const tbody= document.querySelector('#tbody')

            teachers.forEach(teacher => {
                const tr = document.createElement('tr')

                const firstNameTd = document.createElement('td')
                firstNameTd.textContent = teacher.firstname

                const lastNameTd = document.createElement('td')
                lastNameTd.textContent = teacher.lastname

                const courseTd = document.createElement('td')
                courseTd.textContent = teacher.subjects.map(s => s.subjectName).join(', ');

                const updateBtn = document.createElement('button')
                updateBtn.innerHTML= "Επεξεργασία"
                updateBtn.classList.add('btn')
                updateBtn.classList.add('btn-success')
                updateBtn.classList.add('bg-success')
                updateBtn.classList.add('text-white')
                updateBtn.classList.add('m-2')

                const deleteBtn = document.createElement('button')
                deleteBtn.innerHTML= "Διαγραφή"
                deleteBtn.classList.add('btn')
                deleteBtn.classList.add('btn-danger')
                deleteBtn.classList.add('bg-danger')
                deleteBtn.classList.add('text-white')
                deleteBtn.classList.add('m-2')

                deleteBtn.addEventListener('click', () => {
                    if (confirm(`Θέλεις σίγουρα να διαγράψεις τον καθηγητή: ${teacher.firstname} ${teacher.lastname};`)) {
                      axios.delete(`http://localhost:3000/api/teachers/delete/email/${teacher.email}`)
                        .then(() => {
                         
                          tr.remove();
                          alert('Ο καθηγητής διαγράφηκε επιτυχώς.');
                        })
                        .catch(err => {
                          console.error('Σφάλμα κατά τη διαγραφή:', err);
                          alert('Σφάλμα κατά τη διαγραφή του καθηγητή.');
                        });
                    }
                  });

                  updateBtn.addEventListener('click', () => {
                   
                    localStorage.setItem('teacherToEdit', JSON.stringify(teacher));
                  
                    
                    window.location.replace("http://localhost:3000/html/updateTeacher.html");
                  });

                tr.appendChild(firstNameTd)
                tr.appendChild(lastNameTd)
                tr.appendChild(courseTd)
                tr.appendChild(updateBtn)
                tr.appendChild(deleteBtn)

                tbody.append(tr)

            });
        })
        .catch((err) => {
            console.error("Σφάλμα κατά το fetch των καθηγητών:", err);
        });

      
       
})