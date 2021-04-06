var OverRemittance = function () {
    var form = this;

    form._construct = function () {
        form._events();

        form.getBenefitStatuses();
    },
    form._events = function () {
    },
    form.getBenefitStatuses = function () {
        $.get(`${window.webApiUrl}overremittance/getbenefitstatuses`)
            .done(function (data) {
                var benefitStatus = data.filter(function (item) { return item.prefix == "DW" || item.prefix == "DC" || item.prefix == "TP"; });

                var htmlContent = '<a id="bs-dropdown-action" class="btn btn-secondary dropdown-toggle" href="" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">-- Benefit Status --</a>';
                htmlContent += '<div class="dropdown-menu bs-dropdown-mnu" aria-labelledby="dropdownMenuLink">';
                htmlContent += '<a id="bs-all" data-id="0" data-description="-- Benefit Status --" class="dropdown-item" href="" onclick="return dropdownAction(this, "bs-dropdown-action");">-- Benefit Status --</a>';

                    for (var x = 0; x < benefitStatus.length; x++) {
                        var description = `${benefitStatus[x].prefix} - ${benefitStatus[x].description} ( ${benefitStatus[x].claimant} )`;

                        htmlContent += `<a id="bs-${benefitStatus[x].id}" data-id="${benefitStatus[x].id}" data-description="${description}" class="dropdown-item" href="" onclick="return dropdownAction(this, 'bs-dropdown-action');">${description}</a>`;
                    }

                htmlContent += '</div>';

                $('#over-remittance-list .bs-dropdown').html(htmlContent);
            }).fail(function (error) {
                console.log('There is a problem fetching on benefit status. Please try again later.');
            }
        );
    }
}

var overRemittance = new OverRemittance();
overRemittance._construct();
