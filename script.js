
/*const button = document.querySelector('button');

button.addEventListener('click', function(){

   //find the content typed by user
   const rollInput = document.querySelector('input[type="text"]');
   const passInput= document.querySelector('input[type="password"]');

   const roll = rollInput.value;
   const pass = passInput.value;

   //check if fields are empty
   if(roll === '' || pass=== ''){
     alert('Please fill in all fiels!');
     return;
   }

   //Fake login check(we'll connect real database  later)
   if(roll === '21EE100005' && pass === 'password@1234'){
    alert('Login successfull! Welcome , Student.');
   }else {
    alert('Wrong credentials.Try again.');
   }
   
});
*/


//Step 1: The SWITCHER

function switchTab(role) {
    //remove 'active' from All tab buttons
    const allTabs = document.querySelectorAll('.tab');
    allTabs.forEach(function(tab) {
      tab.classList.remove('active');
    });

    //Hide All forms
    const allForms = document.querySelectorAll('.form');
    allForms.forEach(function(form) {
        form.classList.add('hidden');
    });

    //Show only the selected form
    document.getElementById(role).classList.remove('hidden');

    //Make only the clicked tab look active
    //we find the tab button that was clicked
    // by matching its text to the role names

    allTabs.forEach(function(tab) {
        if(tab.textContent.trim().toLowerCase() === role) {
            tab.classList.add('active');
        }
    });
    hideMessage();
} 

    //Step 2: The Login Logic

    function login(role) {
        //Fake credentials for testing
        const credentials = {
            student: {id: 'ee20212023', pass: 'password1234'},
            admin:   {id: 'adm20212023', pass: 'admin1234'},
            director: {id: 'DIR-001', pass: 'director1234', otp: '000000'}
        };

        //read inputs based on role
        if(role === 'student') {
            const roll = document.getElementById('roll').value;
            const pass = document.getElementById('student-pass').value;

            if(roll ==='' || pass === '') {
                showMessage('Please fill in all fieds.', 'error');
                return;
            }

            if(roll === credentials.student.id && pass === credentials.student.pass) {
                showMessage('welcome, Student! Login successful.', 'success');
            }else {
                showMessage('Wrong roll number or password.', 'error');
            }
        }

        if(role === 'admin'){
            const staffId = document.getElementById('staff-id').value;
            const dept   = document.getElementById('department').value;
            const pass = document.getElementById('admin-pass').value;

            if(staffId == '' || pass === '' || dept === 'Select Department') {
                showMessage('Please fill in all fiels.', 'error');
                return;
            }

            if(staffId === credentials.admin.id && pass === credentials.admin.pass) {
                showMessage('Welcome, Admin! Login successful.', 'success');
            }else {
                showMessage('wrong Staff ID or passsword.', 'error');
            }
        }

        if(role === 'director') {
            const dirId = document.getElementById('dir-id').value;
            const pass = document.getElementById('dir-pass').value;
            const otp = document.getElementById('otp').value;

            if(dirId === '' || pass === '' || otp === ""){
                showMessage('Please fill in all fields including OTP.', 'error');
                return;
            }

            if(otp.length !== 6) {
                showMessage('OTP must be exactly 6 digits.', 'error');
                return;
            }

            if(dirId === credentials.director.id && 
                pass === credentials.director.pass &&
                 otp === credentials.director.otp) {
                    showMessage('Welcome, Director! Login successful.', ' success');
                 } else {
                    showMessage('Wrong credentials or OTP.','error');
                 }
            }
            
        }


        //Step 3:Helper Functions

        function showMessage(text, type) {
            const box = document.getElementById('message');
            box.textContent = text;
            box.className = 'message ' + type; // adds 'success or error class
        }

        function hideMessage() {
            const box = document.getElementById('message');
            box.className = 'message hidden';
        }
    