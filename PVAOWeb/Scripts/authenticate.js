var Authenticate = function () {
    var form = this;

    form._construct = function () {
        form._events();

        $('#page-loader').hide();

        $('#login-validation-alert').hide();
    },
    form._events = function () {
        $('#password-text').keydown(function (e) { 
            var keyCode = (event.keyCode ? event.keyCode : event.which);

            if (keyCode == 13) {
                $('#login-btn').trigger('click');
            }
        });

        $('#login-btn').click(function (e) {
            e.preventDefault();

            $('#page-loader').fadeIn();

            if (form.validateRequiredFields()) {
                $.ajax({
                    type: 'POST',
                    url: $('#login-wrapper').attr('data-autheticate-user-url'),
                    data: JSON.stringify({
                        username: $("#username-text").val(),
                        password: $("#password-text").val()
                    }),
                    dataType: 'json',
                    contentType: 'application/json; charset=utf-8'
                }).done(function (response) {
                    if (response.loginStatus !== 0) {
                        window.location.href = "/Home/Index";
                    } else {
                        if (response.errorCode === 32001) {
                            $('#login-validation-alert').text('Invalid username or password combination. Please try again.');
                        } else if (response.errorCode === 36098) {
                            $('#login-validation-alert').text('Your account has expired. Please contact your system administrator.');
                        } else if (response.errorCode === 40195) {
                            $('#login-validation-alert').text('Your account has been locked. Please contact your system administrator.');
                        } else if (response.errorCode === 68868) {
                            $('#login-validation-alert').text('Your account is inactive. Please contact your system administrator.');
                        } else {
                            $('#login-validation-alert').text('You\'ve reached the maximum login limit. Your account has been locked.');
                        }

                        $('#login-validation-alert').show();
                    }

                    $('#page-loader').fadeOut();
                }).fail(function (err) { });
            } else {
                $('#login-validation-alert').text('Please enter your username and password.');

                $('#login-validation-alert').show();

                $('#page-loader').fadeOut();
            }
        });
    },
    form.validateRequiredFields = function () {
        var required = true;

        if ($('#username-text').val() === '')
            required = false;

        if ($('#password-text').val() === '')
            required = false;

        return required;
    }
}

var myClass = new Authenticate();
myClass._construct();