const loginBtn = document.querySelector("#loginBtn");
const form = document.querySelector("#form");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const username = document.querySelector("#username").value;
  const password = document.querySelector("#password").value;

  items = {
    username,
    password,
  };

  axios
    .post("http://localhost:3000/api/auth/login", items)
    .then((res) => {
      const data = res.data.data;
      const status = res.data.status;

      if (status) {
        console.log("Success Login");

        const msg = document.querySelector(".success");

        if (msg) {
          msg.innerHTML = " Επιτυχής σύνδεση του χρήστη";
          msg.style.color = "green";
        }
        form.reset();

        localStorage.setItem("jwt_token", data);

        
          window.location.replace("http://localhost:3000/html/home.html");
        

        // window.location.href('http://localhost:3000/files/html/home.html')
      } else {
        document.querySelector("#success").innerHTML =
          "Πρόβλημα σύνδεση του χρήστη";
        document.querySelector("#success").style.color = "red";
        form.reset();
        console.log("cannot login");
      }
    })
    .catch((err) => {
      console.log("Error", err);
      if (msg) {
        msg.innerHTML = ` ${err.response?.data?.data || 'Σφάλμα Δημιουργειας'}`;
        msg.style.color = 'red';
    }
    });
});
