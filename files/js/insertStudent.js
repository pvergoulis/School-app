const form = document.getElementById('form')

form.addEventListener('submit',(e)=>{
    e.preventDefault()
    const msg = document.getElementById('inserted')

    const firstname = document.getElementById('firstname').value
    const lastname = document.getElementById('lastname').value
    const phone = document.getElementById('phone').value
    const email = document.getElementById('email').value
    const age = document.getElementById('age').value
    const subjectInput = document.getElementById('subject')
    const subjects = subjectInput.value.split(',').map(s => ({ subjectName: s.trim() }));


    const items ={
        firstname,
        lastname,
        email,
        age,
        subjects,
        phone,
       
    }

    axios.post('http://localhost:3000/api/students/create', items)
        .then((res)=>{
            const { status, data } = res.data;

        if(status){
            console.log('success inserted student')

            if(msg){
                msg.innerHTML = "Επιτυχεις εισαγωγή Μαθητή"
                msg.style.color = "blue"
            }
            form.reset()

        }else {
            document.querySelector("#success").innerHTML =
              "Πρόβλημα δημιουργειας  μαθητη";
            document.querySelector("#success").style.color = "red";
            form.reset();
        }
        })
        .catch((err)=>{
            console.log(err)
            if (msg) {
                msg.innerHTML = ` ${err.response?.data?.data || 'Σφαλμα δημιουργειας μαθητη'}`;
                msg.style.color = 'red';
            }
          })


})