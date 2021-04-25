var OverRemittance = function () {
    var form = this;

    form._construct = function () {
        var url = window.location.href;

        form._events();

        if (url.split('/')[4] !== "List") {
            var id = url.split('/')[5];

            form.getOverRemittanceById(id);
        } else {
            form.getBenefitStatuses();

            form.getOverRemittances();
        }
    },
    form._events = function () {
        $(document).on("click", "button", function (event) {
            var claimNumber = $(`#${event.currentTarget.id}`).attr('data-id');

            window.open(`/OverRemittance/Details/${claimNumber}`, '_blank');
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
    form.getOverRemittances = function() {
        $.get(`${window.webApiUrl}beneficiary/getoverremittances?currentPage=1&pageSize=10`)
            .done(function (data) {
                var overRemittances = data.overRemittances;

                var htmlContent = '<thead class="thead-dark">';
                    htmlContent += '<tr>';
                        htmlContent += '<th scope="col">Claim Number</th>';
                        htmlContent += '<th scope="col">Description</th>';
                        htmlContent += '<th scope="col">VDMS Number</th>';
                        htmlContent += '<th scope="col">Beneficiary Name</th>';
                        htmlContent += '<th scope="col">Relation</th>';
                        htmlContent += '<th scope="col">Gender</th>';
                        htmlContent += '<th scope="col">Amount</th>';
                        htmlContent += '<th scope="col" class="text-center">Status</th>';
                        htmlContent += '<th scope="col" class="text-center">Action</th>';
                    htmlContent += '</tr>';
                htmlContent += '</thead>';
                htmlContent += '<tbody>';
                    
                for (var x = 0; x < overRemittances.length; x++) {    
                    htmlContent += '<tr>';
                        htmlContent += `<td>${overRemittances[x].claimNumber}</td>`;
                        htmlContent += `<td>${overRemittances[x].benefitCode}</td>`;
                        htmlContent += `<td>${overRemittances[x].vdmsNumber}</td>`;
                        htmlContent += `<td>${overRemittances[x].beneficiaryName}</td>`;
                        htmlContent += `<td>${overRemittances[x].relation}</td>`;
                        htmlContent += `<td>${overRemittances[x].gender}</td>`;
                        htmlContent += `<td>${overRemittances[x].amount}</td>`;
                        htmlContent += `<td class="text-center"><span class="badge badge-warning">${overRemittances[x].status}</span></td>`;
                        htmlContent += '<td class="text-center">';
                            htmlContent += `<button id="or-${overRemittances[x].claimNumber}" data-id="${overRemittances[x].claimNumber}" type="button" data class="btn btn-primary view-btn"><i class="far fa-eye"></i> View</button></td >`;
                        htmlContent += '</td>';
                    htmlContent += '</tr>';
                }
                  
                htmlContent += '</tbody>';

                $('#over-remittance-list .header-text').text(`Over-remittance List (${data.totalItems})`);

                $('#over-remittance-list .table').append(htmlContent);
            }).fail(function (error) {
                console.log('There is a problem fetching on over-remittances. Please try again later.');
            }
        );
    },
    form.getOverRemittanceById = function (id) {
        $.get(`${window.webApiUrl}beneficiary/getoverremittancebyid?claimNumber=${id}`)
            .done(function (data) {
                var overRemittance = data.overRemittance;

                $('#vdms-number-name').html(`<i class="fas fa-address-card"></i>VDMS #: ${overRemittance.vdmsNumber} - ${overRemittance.lastName}, ${overRemittance.firstName} ${overRemittance.middleName}`);
                $('#status-claim-number').html(`Status: <span class="badge badge-warning">${overRemittance.status}</span> | Claim Number: ${overRemittance.claimNumber}`);
                $('#claim-number-text').val(overRemittance.claimNumber);
                $('#beneficiary-name-text').val(overRemittance.beneficiaryName);
                $('#relation-text').val(overRemittance.relation);
                $('#address-text').val(overRemittance.address);
                $('#mobile-number-text').val(overRemittance.mobileNumber);
                $('#email-address-text').val(overRemittance.emailAddress);
                $('#vdms-number-text').val(overRemittance.vdmsNumber);
                $('#veteran-name-text').val(overRemittance.veteranName);
                $('#nationality-text').val(overRemittance.nationality);
                $('#vfp-organization-text').val(overRemittance.organization);
                $('#birth-date-text').val(overRemittance.dateOfBirth.toLocaleDateString());
                $('#age-text').val(overRemittance.age);
                $('#gender-text').val(overRemittance.gender);
                $('#date-death-text').val(overRemittance.dateOfDeath.toLocaleDateString());
                $('#cause-death-text').val(overRemittance.causeOfDeath);
            }).fail(function (error) {
                console.log('There is a problem fetching on over-remittance details. Please try again later.');
            }
        );
    }
}

var overRemittance = new OverRemittance();
overRemittance._construct();
