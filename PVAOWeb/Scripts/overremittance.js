var OverRemittance = function () {
    var form = this;

    form._construct = function () {
        form.getBenefitStatuses();
    },
    form._events = function () {
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