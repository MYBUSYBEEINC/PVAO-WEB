var Accrued = function () {
    var form = this;
    var baseUrl = JSON.parse(localStorage.getItem("api")).baseUrl;

    form._construct = function () {
        var url = window.location.href;
    },
    form._events = function () {
    }
}

var accrued = new Accrued();
accrued._construct();
