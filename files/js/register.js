const form = document.querySelector("#form");
const msg = document.querySelector(".success");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const username = document.querySelector("#username").value;
  const password = document.querySelector("#password").value;
  const email = document.querySelector("#email").value;

  const items = { username, password, email };

  axios.post("http://localhost:3000/api/users/register", items)
    .then((res) => {
    const data = res.data.data;
    const status = res.data.status;

    if (status) {
      console.log("Success register");
      

      if (msg) {
        msg.innerHTML = " Επιτυχής εγγραφή του χρήστη";
        msg.style.color = "blue";
      }
      form.reset();

      localStorage.setItem("jwt_token", data);

      setTimeout(() => {
        window.location.replace("http://localhost:3000/index.html");
      }, 3000);
    } else {
      document.querySelector("#success").innerHTML =
        "Πρόβλημα δημιουργειας  χρήστη";
      document.querySelector("#success").style.color = "red";
      form.reset();
    }

  })
  .catch((err)=>{
    console.log(err)
    if (msg) {
        msg.innerHTML = ` ${err.response?.data?.data || 'Σφάλμα σύνδεσης'}`;
        msg.style.color = 'red';
    }
  })
});
