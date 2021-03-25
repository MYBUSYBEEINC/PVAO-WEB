var OverRemittance = function () {
    var form = this;

    form._construct = function () {
        form._events();
    },
    form._events = function () {
        //$(document).ready(function (e) {
        //    e.preventDefault();
        //    form.getBenefitStatuses();
        //});
        $(window).on("load", form.getBenefitStatuses);
        //form.getBenefitStatuses();
    },
    form.getBenefitStatuses = function() {
        $.get("http://localhost:55653/api/overremittance/getbenefitstatuses", function (data) {
            var benefitStatus = data.filter(function (item) {
                return item.prefix == "DW" || item.prefix == "DC" || item.prefix == "TP";
            });

            var htmlContent = '<a id="bs-dropdown-action" class="btn btn-secondary dropdown-toggle" href="" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">-- Benefit Status --</a>';
                htmlContent += '<div class="dropdown-menu bs-dropdown-mnu" aria-labelledby="dropdownMenuLink">';
                    htmlContent += '<a id="bs-all" data-id="0" data-description="-- Benefit Status --" class="dropdown-item" href="" onclick="return dropdownAction(this, bs-dropdown-action);">-- Benefit Status --</a>';

                    for (var x = 0; x < benefitStatus.length; x++) {
                        var description = `${benefitStatus[x].prefix} - ${benefitStatus[x].description} ( ${benefitStatus[x].claimant} )`;

                        htmlContent += `<a id="bs-${benefitStatus[x].id}" data-id="${benefitStatus[x].id}" data-description="${description}" class="dropdown-item" href="" onclick="return dropdownAction(this, 'bs-dropdown-action');">${description}</a>`;
                    }
                htmlContent += '</div>';

            $('#over-remittance-list .bs-dropdown').html(htmlContent);
        });
    }
}

var myClass = new OverRemittance();
myClass._construct();