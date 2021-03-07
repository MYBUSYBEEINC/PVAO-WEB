var Settings = function () {
    var form = this;

    form._construct = function () {
        var url = window.location.href;

        form._events();

        $('#general-updated-alert').hide();
        $('#general-validation-alert').hide();
        $('#settings-validation-alert').hide();
        $('#password-validation-alert').hide();

        form.getSettings(1);
    },
    form._events = function () {
        $('#save-settings-btn').click(function (e) {
            e.preventDefault();

            console.log(JSON.stringify({
                id: 1,
                companyName: $("#company-name-text").val(),
                address: $("#company-address-text").val(),
                emailAddress: $("#company-email-text").val(),
                phoneNumber: $("#phone-number-text").val(),
                mobileNumber: $("#company-mobile-text").val(),
                aboutUs: $("#about-us-text").val(),
                facebook: $("#facebook-account-text").val(),
                twitter: $("#twitter-phone-text").val(),
                youTube: $("#youtube-channel-text").val(),
                yearsOfExperience: parseInt($("#years-experience-text").val()),
                happyCustomers: parseInt($("#happy-customer-textt").val()),
                fromEmail: $("#settings-from-email-text").val(),
                fromName: $("#settings-from-name-text").val(),
                serverName: $("#settings-server-name-text").val(),
                smtpPort: parseInt($("#smtp-port-text").val()),
                username: $("#settings-username-text").val(),
                password: $("#settings-password-text").val(),
                enableSSL: $('#enable-ssl-check').prop('checked'),
                maxSignOnAttempts: parseInt($("#max-signon-attempts-text").val()),
                expiresIn: parseInt($("#settings-expires-in-text").val()),
                minPasswordLength: parseInt($("#min-password-length-text").val()),
                minSpecialCharacters: parseInt($("#min-special-char-text").val()),
                enforcePasswordHistory: parseInt($("#enforce-password-history-ddl option:selected").val())
            }));

            if (form.validateCompanyRequiredFields()) {
                if (form.validateSMTPRequiredFields()) {
                    if (form.validatePasswordRequiredFields()) {
                        $.ajax({
                            type: 'POST',
                            url: $('#page-wrapper').attr('data-save-settings-url'),
                            data: JSON.stringify({
                                id: 1,
                                companyName: $("#company-name-text").val(),
                                address: $("#company-address-text").val(),
                                emailAddress: $("#company-email-text").val(),
                                phoneNumber: $("#phone-number-text").val(),
                                mobileNumber: $("#company-mobile-text").val(),
                                aboutUs: $("#about-us-text").val(),
                                facebook: $("#facebook-account-text").val(),
                                twitter: $("#twitter-phone-text").val(),
                                youTube: $("#youtube-channel-text").val(),
                                yearsOfExperience: parseInt($("#years-experience-text").val()),
                                happyCustomers: parseInt($("#happy-customer-text").val()),
                                fromEmail: $("#settings-from-email-text").val(),
                                fromName: $("#settings-from-name-text").val(),
                                serverName: $("#settings-server-name-text").val(),
                                smtpPort: parseInt($("#smtp-port-text").val()),
                                username: $("#settings-username-text").val(),
                                password: $("#settings-password-text").val(),
                                enableSSL: $('#enable-ssl-check').prop('checked'),
                                maxSignOnAttempts: parseInt($("#max-signon-attempts-text").val()),
                                expiresIn: parseInt($("#settings-expires-in-text").val()),
                                minPasswordLength: parseInt($("#min-password-length-text").val()),
                                minSpecialCharacters: parseInt($("#min-special-char-text").val()),
                                enforcePasswordHistory: parseInt($("#enforce-password-history-ddl option:selected").val())
                            }),
                            dataType: 'json',
                            contentType: 'application/json; charset=utf-8'
                        }).done(function (response) {
                            if (response !== null) {
                                $('#settings-validation-alert').hide();

                                $('#general-updated-alert').show();

                                $(window).scrollTop(0);

                                window.setTimeout(function () {
                                    window.location.href = '/Settings/Index';
                                }, 3000);
                            }
                        }).fail(function (err) {
                        console.log(err)});
                    } else {
                        $('#password-validation-alert').show();

                        $('#password-tab').tab('show');

                        $(window).scrollTop(0);
                    }
                } else {
                    $('#settings-validation-alert').show();

                    $('#smtp-tab').tab('show');

                    $(window).scrollTop(0);
                }
            } else {
                $('#general-validation-alert').show();

                $('#general-tab').tab('show');

                $(window).scrollTop(0);
            }
        });
    },
    form.getSettings = function (id) {
        $.ajax({
            type: 'GET',
            url: 'http://localhost:55653/api/settings/getbyid?' + $.param({ id: 1 }),
            contentType: 'application/json; charset=utf-8',
            success: function (response) {
                var settings = response;
                console.log(settings);

                $('#company-name-text').val(settings.settings.companyName);
                $('#phone-number-text').val(settings.settings.phoneNumber);
                $('#company-email-text').val(settings.settings.emailAddress);
                $('#company-mobile-text').val(settings.settings.mobileNumber);
                $('#company-address-text').val(settings.settings.address);
                $('#about-us-text').val(settings.settings.aboutUs);
                $('#facebook-account-text').val(settings.settings.facebook);
                $('#twitter-phone-text').val(settings.settings.twitter);
                $('#youtube-channel-text').val(settings.settings.youTube);
                $('#years-experience-text').val(settings.settings.yearsOfExperience);
                $('#happy-customer-text').val(settings.settings.happyCustomers);
                $('#settings-from-email-text').val(settings.settings.fromEmail);
                $('#settings-from-name-text').val(settings.settings.fromName);
                $('#settings-server-name-text').val(settings.settings.serverName);
                $('#smtp-port-text').val(settings.settings.smtpPort);
                $('#settings-username-text').val(settings.settings.username);
                $('#settings-password-text').val(settings.settings.password);
                $('#enable-ssl-check').prop('checked', settings.settings.enableSSL);
                $('#max-signon-attempts-text').val(settings.settings.maxSignOnAttempts);
                $('#settings-expires-in-text').val(settings.settings.expiresIn);
                $('#min-password-length-text').val(settings.settings.minPasswordLength);
                $('#min-special-char-text').val(settings.settings.minSpecialCharacters);
                $("#enforce-password-history-ddl").val(settings.settings.enforcePasswordHistory).change();
                $('#settings-created-by').text(settings.settings.createdBy);
                $('#settings-date-created').text(settings.settings.dateCreated);
                $('#settings-updated-by').text(settings.settings.updatedBy);
                $('#settings-date-updated').text(settings.settings.dateUpdated);
            },
            error: function (err) {
                console.log(err);
            },
            async: true
        });
    },
    form.validateCompanyRequiredFields = function () {
        var required = true;

        if ($('#company-name-text').val() === '')
            required = false;

        if ($('#phone-number-text').val() === '')
            required = false;

        if ($('#company-email-text').val() === '')
            required = false;

        if ($('#company-mobile-text').val() === '')
            required = false;

        if ($('#company-address-text').val() === '')
            required = false;

        if ($('#years-experience-text').val() === '')
            required = false;

        if ($('#happy-customer-text').val() === '')
            required = false;

        return required;
    },
    form.validateSMTPRequiredFields = function () {
        var required = true;

        if ($('#settings-from-email-text').val() === '')
            required = false;

        if ($('#settings-from-name-text').val() === '')
            required = false;

        if ($('#settings-server-name-text').val() === '')
            required = false;

        if ($('#smtp-port-text').val() === '')
            required = false;

        if ($('#settings-username-text').val() === '')
            required = false;

        if ($('#settings-password-text').val() === '')
            required = false;

        return required;
    },
    form.validatePasswordRequiredFields = function () {
        var required = true;

        if ($('#max-signon-attempts-text').val() === '')
            required = false;

        if ($('#settings-expires-in-text').val() === '')
            required = false;

        if ($('#min-password-length-text').val() === '')
            required = false;

        if ($('#min-special-char-text').val() === '')
            required = false;

        return required;
    }
}

var myClass = new Settings();
myClass._construct();