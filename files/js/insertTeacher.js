const form = document.querySelector('#form')
const msg = document.querySelector('#inserted')





form.addEventListener('submit', async (e)=>{
    e.preventDefault()

    const firstname = document.getElementById('firstname').value
    const lastname = document.getElementById('lastname').value
    const vat = document.getElementById('vat').value
    const email = document.getElementById('email').value
    const age = document.getElementById('age').value
    const city = document.getElementById('city').value
    const phone = document.getElementById('phone').value
    const cv = document.getElementById('cv').value

    const subjectInput = document.getElementById('subject')
    const subjects = subjectInput.value.split(',').map(s => ({ subjectName: s.trim() }));

    const items ={
        firstname,
        lastname,
        vat,
        email,
        age,
        subjects,
        city,
        phone,
        cv
    }

    await axios.post('http://localhost:3000/api/teachers/create', items)
        .then((res)=>{
            const { status, data } = res.data;

        if(status){
            console.log('success inserted teachers')

            if(msg){
                msg.innerHTML = "Επιτυχεις εισαγωγή καθηγητή"
                msg.style.color = "blue"
            }
            form.reset()

        }else {
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


        
})
