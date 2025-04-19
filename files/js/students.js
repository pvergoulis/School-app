window.addEventListener("DOMContentLoaded", () => {
  axios
    .get("http://localhost:3000/api/students")
    .then((res) => {
      const students = res.data.data;
      const tbody = document.querySelector("#tbody");

      students.forEach((student) => {
        const tr = document.createElement("tr");

        const firstNameTd = document.createElement("td");
        firstNameTd.textContent = student.firstname;

        const lastNameTd = document.createElement("td");
        lastNameTd.textContent = student.lastname;

        const courseTd = document.createElement("td");
        courseTd.innerHTML = student.subjects
          .map((s) => `${s.subjectName}`)
          .join(", ");


        const updateBtn = document.createElement("button");
        updateBtn.innerHTML = "Επεξεργασία";
        updateBtn.classList.add("btn");
        updateBtn.classList.add("btn-success");
        updateBtn.classList.add("bg-success");
        updateBtn.classList.add("text-white");
        updateBtn.classList.add("m-2");

        const deleteBtn = document.createElement("button");
        deleteBtn.innerHTML = "Διαγραφή";
        deleteBtn.classList.add("btn");
        deleteBtn.classList.add("btn-danger");
        deleteBtn.classList.add("bg-danger");
        deleteBtn.classList.add("text-white");
        deleteBtn.classList.add("m-2");

        deleteBtn.addEventListener("click", () => {
          if (
            confirm(
              `Θέλεις σίγουρα να διαγράψεις τον Μαθητή: ${student.firstname} ${student.lastname};`
            )
          ) {
            axios
              .delete(
                `http://localhost:3000/api/teachers/delete/email/${student.email}`
              )
              .then(() => {
                tr.remove();
                alert("Ο μαθητης διαγράφηκε επιτυχώς.");
              })
              .catch((err) => {
                console.error("error:", err);
                alert("Error κατά τη διαγραφή του μαθητη.");
              });
          }
        });

        updateBtn.addEventListener("click", () => {
          localStorage.setItem("studentToEdit", JSON.stringify(student));

          window.location.replace(
            "http://localhost:3000/html/updateStudent.html"
          );
        });

        tr.appendChild(firstNameTd);
        tr.appendChild(lastNameTd);
        tr.appendChild(courseTd);
        tr.appendChild(updateBtn);
        tr.appendChild(deleteBtn);

        tbody.append(tr);
      });
    })
    .catch((err) => {
      console.error("Error", err);
    });
});
