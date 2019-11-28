
function startRedirectButtons() {
    var first = true;
    if (first) {
        first = false;
        $('.btn-redirect').click(function(event) {
            event.stopPropagation();
            var url = $(this).attr('url');
            if (url){
                window.location = url;
            }
        });
    }
};

$(document).ready(function() {
    console.log('Dashboard JS');

    $('#aliqDer').click(function() {
        $('#tableHeader').html('Aliquot derivation phases');
        var htmlString = '<div class="align-items-center  d-flex  justify-content-between  pb-3">\
                            <label>1. Protocol Selection - Nr. aliquots: ' + aliqStep1 + '</label> &nbsp;\
                            <button type="button" class="btn  btn-primary  btn-redirect" url=' + urlStep1 + ' value="View">View</button>\
                        </div>\
                        <div class="align-items-center  d-flex  justify-content-between  pb-3">\
                            <label>2. Select kit - Nr. aliquots: ' + aliqStep2 + '</label> &nbsp;\
                            <button type="button" class="btn  btn-primary  btn-redirect" url=' + urlStep2 + ' value="View">View</button>\
                        </div>\
                        <div class="align-items-center  d-flex  justify-content-between  pb-3">\
                            <label>3. Perform QC/QA - Nr. aliquots: ' + aliqStep3 + '</label> &nbsp;\
                            <button type="button" class="btn  btn-primary  btn-redirect" url=' + urlStep3 + ' value="View">View</button>\
                        </div>\
                        <div class="align-items-center  d-flex  justify-content-between">\
                            <label>4. Create derivatives - Nr. aliquots: ' + aliqStep4 + '</label> &nbsp;\
                            <button type="button" class="btn  btn-primary  btn-redirect" url=' + urlStep4 + ' value="View">View</button>\
                        </div>';
        $('#tableBody').html(htmlString);
        startRedirectButtons();
    });

    $('#aliqSplit').click(function() {
        $('#tableHeader').html('Aliquot to split');
        var htmlString = '<div class="align-items-center  d-flex  justify-content-between  py-3">\
                            <label>Nr. aliquots: ' + aliqSplit + '</label> &nbsp;\
                            <button type="button" class="btn  btn-primary  btn-redirect" url=' + urlSplit + ' value="View">View</button>\
                        </div>';
        $('#tableBody').html(htmlString);
        startRedirectButtons();
    });

    $('#aliqSlideLab').click(function() {
        $('#tableHeader').html('Aliquot ready for slide labelling');
        var htmlString = '<div class="align-items-center  d-flex  justify-content-between  py-3">\
                            <label>Nr. aliquots: ' + aliqSlideLab + '</label> &nbsp;\
                            <button type="button" class="btn  btn-primary  btn-redirect" url=' + urlSlideLab + ' value="View">View</button>\
                        </div>';
        $('#tableBody').html(htmlString);
        startRedirectButtons();
    });

    $('#aliqSlidePrep').click(function() {
        $('#tableHeader').html('Aliquot ready for slide preparation');
        var htmlString = '<div class="align-items-center  d-flex  justify-content-between  py-3">\
                            <label>Nr. aliquots: ' + aliqSlidePrep + '</label> &nbsp;\
                            <button type="button" class="btn  btn-primary  btn-redirect" url=' + urlSlidePrep + ' value="View">View</button>\
                        </div>';
        $('#tableBody').html(htmlString);
        startRedirectButtons();
    });
});
