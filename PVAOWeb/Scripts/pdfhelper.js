var PdfHelper = function () {
    var form = this;
    form.exportTableToPdf = function (table, pdfName, orientation) {
        var doc = new jsPDF(orientation);
        doc.autoTable({ html: table });
        doc.save(pdfName);
    }
}

var pdfHelper = new PdfHelper();
