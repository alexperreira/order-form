function setCookie(cName, cValue, expDays) {
	let date = new Date();
	date.setTime(date.getTime() + expDays * 24 * 60 * 60 * 1000);
	const expires = 'expires=' + date.toUTCString();
	document.cookie = cName + ' = ' + cValue + '; ' + expires + '; path=/';
}

function validateForm() {
	'use strict';

	// Fetch all the forms we want to apply custom Bootstrap validation styles to
	var forms = document.querySelectorAll('.needs-validation');

	// Loop over them and prevent submission
	Array.prototype.slice.call(forms).forEach(function (form) {
		form.addEventListener(
			'submit',
			function (event) {
				if (!form.checkValidity()) {
					event.preventDefault();
					event.stopPropagation();
				}

				form.classList.add('was-validated');
			},
			false
		);
	});
}

$('#submit').on('click', function () {
	validateForm();
	var email = $('#email').val(function(i, v) {
		replacedEmail= v.replace('@', '%40');
	});
	console.log(email)
	$.ajax({
		url:
			'https://kanaparti.api.stdlib.com/warmwishes@dev/apitest/?email=' + replacedEmail,
		method: 'POST',
		contentType: 'application/json',
		success: function (data) {
			console.log('Your number is: ' + data.id);
			alert('Your number is: ' + data.id + ' and here is your cookie: ' + document.cookie);
			setCookie('LRID', data.id, 1);
			console.log(document.cookie);
		},
		error: function (data) {
			console.log(data);
		},
	});
});




// async function handleFormSubmit(event) {
//     event.preventDefault();
//     console.log(event)
// }

// fetch('https://kanaparti.api.stdlib.com/warmwishes@dev/apitest/').then((res) => {
//     console.log('Response, waiting to parse...', res);
//     return res.json();
// })

