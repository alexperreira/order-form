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

function callApi() {
	var email = $('#email').val(function(i, v) {
		newEmail= v.replace('@', '%40');
	})
	$.ajax({
		url:
			'https://kanaparti.api.stdlib.com/warmwishes@dev/apitest/',
		method: 'POST',
		data: {email: newEmail},
		success: function (data) {
			setCookie('LRID', data.id, 1);
			console.log('Your number is: ' + data.id);
			alert('Your number is: ' + data.id + ' and here is your cookie: ' + document.cookie);
			console.log(document.cookie);
		},
		error: function (error) {
			console.log(error);
		},
	});
}

$('#orderForm').validate({
	errorPlacement: function(error, element) {
		return true;
	}
})

$('#submit').on('click', function () {
	validateForm();
	if ($('#orderForm').valid()) {
		callApi();
	} else {
		console.log('Error: The form must be validated first.')
	}
});



