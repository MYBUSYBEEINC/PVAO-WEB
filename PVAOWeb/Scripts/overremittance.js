var OverRemittance = function () {
    var form = this;
    var baseUrl = JSON.parse(localStorage.getItem("api")).baseUrl;

    form._construct = function () {
        var url = window.location.href;

        form._events();

        if (url.split('/')[4] !== "List") {
            var id = url.split('/')[5];

            form.getOverRemittanceById(id);
        } else {
            form.getBenefitStatuses();

            form.getYearsAndMonths('');

            form.getOverRemittances($('#search-overremittance-text').val(), '', '');
        }
    },
    form._events = function () {
        $(document).on("click", "#over-remittance-list .di-year", function (e) {
            e.preventDefault();

            var year = $(this).attr('data-description');
            var searchText = $('#search-overremittance-text').val();

            form.getYearsAndMonths(year);

            form.getOverRemittances(searchText, year, '');
        });

        $(document).on("click", "#over-remittance-list .di-month", function (e) {
            e.preventDefault();

            var year = $('#yr-dropdown-action').text();
            var month = $(this).attr('data-description');
            var searchText = $('#search-overremittance-text').val();

            form.getOverRemittances(searchText, year, month);
        });

        $(document).on("click", "#export-excel-button", function (e) {
            excelHelper.exportToExcel('overremittance-table', 'overremittancetable');
        });

        $(document).on("click", "#export-excel-forapproval-button", function (e) {
            excelHelper.exportToExcel('overremittance-forapproval-table', 'overremittancetable');
        });

        $(document).on("click", "#export-pdf-button", function (e) {
            pdfHelper.exportToPdf('#overremittance-table', `overremittancetable_${Date.now()}`, 'landscape' );
        });

        $(document).on("click", ".view-btn", function (e) {
            var claimNumber = $(`#${e.currentTarget.id}`).attr('data-id');

            window.open(`/OverRemittance/Details/${claimNumber}`, '_blank');
        });

        $(document).keypress(function (e) {
            if (e.which == 13) {
                e.preventDefault();

                if (e.target.id === 'search-overremittance-text') {
                    var year = $('#yr-dropdown-action').text();
                    var month = $('#mt-dropdown-action').text();
                    var searchText = $('#search-overremittance-text').val();

                    form.getOverRemittances(searchText, year, month);
                }
            }
        });

    },
    form.getBenefitStatuses = function () {
        $.get(`${baseUrl}beneficiary/getbenefitstatus`)
            .done(function (data) {
                var benefitStatus = data.filter(function (item) { return item.prefix == "DW" || item.prefix == "DC" || item.prefix == "TP"; });

                var htmlContent = '<a id="bs-dropdown-action" class="btn btn-secondary dropdown-toggle" href="" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">-- Benefit Status --</a>';
                htmlContent += '<div class="dropdown-menu bs-dropdown-mnu" aria-labelledby="dropdownMenuLink">';
                htmlContent += `<a id="bs-all" data-id="0" data-description="-- Benefit Status --" class="dropdown-item" href="" onclick="return dropdownAction(this, 'bs-dropdown-action');">-- Benefit Status --</a>`;

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
    form.getOverRemittances = function (searchValue, year, month) {
        var endpointUrl = `${baseUrl}beneficiary/getoverremittances?searchValue=${searchValue}&currentPage=1&pageSize=10`;

        if (year !== '-- Year --' && month !== '-- Month --')
            endpointUrl = `${baseUrl}beneficiary/getoverremittances?searchValue=${searchValue}&year=${year}&month=${month}&currentPage=1&pageSize=10`;
        

        if (year !== '-- Year --' && month === '-- Month --')
            endpointUrl = `${baseUrl}beneficiary/getoverremittances?searchValue=${searchValue}&year=${year}&currentPage=1&pageSize=10`;

        $.get(endpointUrl)
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
                        htmlContent += '<th scope="col">Date Approved</th>';
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
                        htmlContent += `<td>${new Date(overRemittances[x].dateApproved).toLocaleDateString()}</td>`;
                        htmlContent += `<td class="text-center"><span class="badge badge-warning">${overRemittances[x].status}</span></td>`;
                        htmlContent += '<td class="text-center">';
                            htmlContent += `<button id="or-${overRemittances[x].claimNumber}" data-id="${overRemittances[x].claimNumber}" type="button" data class="btn btn-primary view-btn"><i class="far fa-eye"></i> View</button></td >`;
                        htmlContent += '</td>';
                    htmlContent += '</tr>';
                }

                htmlContent += '</tbody>';

                $('#over-remittance-list .header-text').text(`Over-remittance List (${data.totalItems})`);

                $('#over-remittance-list .table').html(htmlContent);

                if (overRemittances.length != 0) {
                    $('#no-available-overremittances').hide();

                    $('#export-excel-button').show();
                    $('#export-pdf-button').show();
                } else {
                    $('#no-available-overremittances').show();

                    $('#export-excel-button').hide();
                    $('#export-pdf-button').hide();
                }
            }).fail(function (error) {
                console.log('There is a problem fetching on over-remittances. Please try again later.');
            }
        );
    },
    form.getYearsAndMonths = function (year) {
        $.get(`${baseUrl}beneficiary/getyearsandmonths`)
            .done(function (data) {
                if (year !== '') {
                    var dates = data.months;
                    var arrMonths = [];

                    for (var i = 0; i < dates.length; i++) {
                        if (dates[i].split('/')[2] == year) {
                            var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

                            if (arrMonths.indexOf(months[parseInt(dates[i].split('/')[0]) - 1]) === -1) {
                                arrMonths.push(months[parseInt(dates[i].split('/')[0]) - 1]);
                            }
                        }
                    }

                    var htmlContent = '<a id="mt-dropdown-action" class="btn btn-secondary dropdown-toggle" href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">-- Month --</a>';
                    htmlContent += '<div class="dropdown-menu mt-dropdown-mnu" aria-labelledby="dropdownMenuLink">';
                        htmlContent += `<a id="mt-all" data-id="0" data-description="-- Month --" class="dropdown-item di-month" href="" onclick="return dropdownAction(this, 'mt-dropdown-action');">-- Month --</a>`;

                        for (var x = 0; x < arrMonths.length; x++) {
                            htmlContent += `<a id="yr-${arrMonths[x]}" data-id="${arrMonths[x]}" data-description="${arrMonths[x]}" class="dropdown-item di-month" href="" onclick="return dropdownAction(this, 'mt-dropdown-action');">${arrMonths[x]}</a>`;
                        }

                    htmlContent += '</div>';

                    $('#over-remittance-list .mt-dropdown').html(htmlContent);
                } else {
                    var years = data.years;

                    var yearContent = '<a id="yr-dropdown-action" class="btn btn-secondary dropdown-toggle" href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">-- Year --</a>';
                    yearContent += '<div class="dropdown-menu yr-dropdown-mnu" aria-labelledby="dropdownMenuLink">';
                        yearContent += `<a id="yr-all" data-id="0" data-description="-- Year --" class="dropdown-item di-year" href="" onclick="return dropdownAction(this, 'yr-dropdown-action');">-- Year --</a>`;

                        for (var x = 0; x < years.length; x++) {
                            yearContent += `<a id="yr-${years[x]}" data-id="${years[x]}" data-description="${years[x]}" class="dropdown-item di-year" href="" onclick="return dropdownAction(this, 'yr-dropdown-action');">${years[x]}</a>`;
                        }
                    yearContent += '</div>';

                    var monthContent = '<a id="mt-dropdown-action" class="btn btn-secondary dropdown-toggle" href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">-- Month --</a>';
                    monthContent += '<div class="dropdown-menu mt-dropdown-mnu" aria-labelledby="dropdownMenuLink">';
                        monthContent += `<a id="mt-all" data-id="0" data-description="-- Month --" class="dropdown-item di-month" href="" onclick="return dropdownAction(this, 'mt-dropdown-action');">-- Month --</a>`;
                    monthContent += '</div>';

                    $('#over-remittance-list .yr-dropdown').html(yearContent);

                    $('#over-remittance-list .mt-dropdown').html(monthContent);
                }
            }).fail(function (error) {
                console.log('There is a problem fetching years and months filter. Please try again later.');
            }
        );
    }
    form.getOverRemittanceById = function (id) {
        $.get(`${baseUrl}beneficiary/getoverremittancebyid?claimNumber=${id}`)
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
                $('#birth-date-text').val(new Date(overRemittance.dateOfBirth).toLocaleDateString());
                $('#age-text').val(overRemittance.age);
                $('#gender-text').val(overRemittance.gender);
                $('#date-death-text').val(new Date(overRemittance.dateOfDeath).toLocaleDateString());
                $('#cause-death-text').val(overRemittance.causeOfDeath);
            }).fail(function (error) {
                console.log('There is a problem fetching on over-remittance details. Please try again later.');
            }
        );
    }
}

var overRemittance = new OverRemittance();
overRemittance._construct();
