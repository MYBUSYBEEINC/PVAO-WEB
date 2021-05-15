var ExcelHelper = function() {
    var form = this;
    form.exportToExcel = function(table, name) {
        var uri = 'data:application/vnd.ms-excel;base64,'
            , template = '<html xmlns: <head><!--[if gte mso 9]><xml><x: <x: <x: <x: {worksheet}</x: <x: <x:DisplayGridlines/></x:WorksheetOptions></x: ExcelWorksheet ></x: ExcelWorksheets ></x: ExcelWorkbook ></xml ></head > <body><table>{table}</table></body></html > '
            , base64 = function (s) { return window.btoa(unescape(encodeURIComponent(s))) }
            , format = function (s, c) { return s.replace(/{(\w+)}/g, function (m, p) { return c[p]; }) }

        if (!table.nodeType) table = document.getElementById(table);
        var ctx = { worksheet: name || 'Worksheet', table: table.innerHTML }
        window.location.href = uri + base64(format(template, ctx));
    }
}

var excelHelper = new ExcelHelper();
