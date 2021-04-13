var OverRemittance = function () {
    var form = this;

    form._construct = function () {
        form._events();

        form.getBenefitStatuses();
        form.getOverremittanceList();
    },
    form._events = function () {
        $(document).on("click", "button", function () {
            window.open('/overremittance/details', '_blank');
        });
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
    },
    form.getOverremittanceList = function() {
        $.get(`${window.webApiUrl}overremittance/getoverremittancelist`)
            .done(function (data) {
                var header = '<tr>';
                header += "<th scope='col'>Claim Number</th>";
                header += "<th scope='col'>VDMS Number</th>";
                header += "<th scope='col'>Beneficiary Name</th>";
                header += "<th scope='col'>Age</th>";
                header += "<th scope='col'>Gender</th>";
                header += "<th scope='col'>Benefit Code</th>";
                header += "<th scope='col'>Amount</th>";
                header += "<th scope='col'>Status</th>";
                header += "<th scope='col' class='text-center'>Action</th>";
                header += '</tr>';
                $('#over-remittance-list .thead-dark').html(header);

                var list = "<tr>";
                for (var i = 0; i < data.length; i++) {
                    list += "<tr>";
                    list += "<td></td>"; // NO DATA AVAILABLE
                    list += "<td>" + data[i].vdmsNo + "</td>";
                    list += "<td>" + data[i].firstName + " " + data[i].lastName + "</td>";
                    list += "<td>" + data[i].age + "</td>";
                    list += "<td>" + data[i].sex + "</td>";
                    list += "<td></td>"; // NO DATA AVAILABLE
                    list += "<td></td>"; // NO DATA AVAILABLE
                    list += "<td></td>"; // NO DATA AVAILABLE
                    list += "<td class='text-center'>";
                    list += "<button type='button' class='btn btn-primary'><i class='far fa-eye'></i> View</button >";
                    list += "</td >";
                    list += "</tr>";
                }

                list += "</tr>";
                $('#list').html(list);
            }).fail(function(error) {
                    console.log('There is a problem fetching on benefit status. Please try again later.');
                }
            );
    }
}

var overRemittance = new OverRemittance();
overRemittance._construct();
