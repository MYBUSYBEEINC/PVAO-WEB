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
            for (var i = 0; i < data.length; i++) {
                $('#benefitStatuses').append("<option>" + data[i].description + " " + data[i].prefix + " " + data[i].claimant + "</option>");
            }
        });
    }
}

var myClass = new OverRemittance();
myClass._construct();