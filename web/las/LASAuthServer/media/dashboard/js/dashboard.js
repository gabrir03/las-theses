
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
    var base_url = '../../../biobank/api/dhbd';
    var timer = null;

    $('#aliqDer').click(function() {
        timer = setTimeout(function(){$("body").addClass("loading");},100);
        var urlStep1 = "/biobank/derived/execute";
        var urlStep2 = "/biobank/derived/execute/loadkit";
        var urlStep3 = "/biobank/derived/execute/loaddetailspart2";
        var urlStep4 = "/biobank/derived/execute/loadlastpart";
        var url = base_url + '/aliquot_derivation/' + username;
        $.ajax({
            'url' : url,
            'type' : 'GET',
            'dataType' : 'JSON',
            success(result, status) {
                clearTimeout(timer);
                $("body").removeClass("loading");
                console.log('Ajax: ', result.data, ' - ', status);
                if (result.data != 'errore') {
                    $('#tableHeader').html('Aliquot derivation phases');
                    var htmlString = '';
                    var labelText = '';
                    var urlText = '';
                    for (var i = 0; i < result.data.length; i++) {
                        if (i == 0) {
                            labelText = '1. Protocol Selection: ';
                            urlText = urlStep1;
                        }
                        if (i == 1) {
                            labelText = '2. Select kit: ';
                            urlText = urlStep2;
                        }
                        if (i == 2) {
                            labelText = '3. Perform QC/QA: ';
                            urlText = urlStep3;
                        }
                        if (i == 3) {
                            labelText = '4. Create derivatives: ';
                            urlText = urlStep4;
                        }
                        labelText += result.data[i] + ' aliquots';
                        htmlString += '<div class="align-items-center  d-flex  justify-content-between  pb-3">\
                                            <label>' + labelText + '</label> &nbsp;\
                                            <button type="button" class="btn  btn-primary  btn-redirect" url=' + urlText + ' value="View">View</button>\
                                        </div>';
                    }
                    $('#tableBody').html(htmlString);
                    startRedirectButtons();
                }
            },
            error(xhr, status, error) {
                clearTimeout(timer);
                $("body").removeClass("loading");
                console.log('Ajax ERROR: ', error, ' - ', status);
            }
        });
        // var htmlString = '<div class="align-items-center  d-flex  justify-content-between  pb-3">\
        //                     <label>1. Protocol Selection: ' + aliqStep1 + ' aliquots</label> &nbsp;\
        //                     <button type="button" class="btn  btn-primary  btn-redirect" url=' + urlStep1 + ' value="View">View</button>\
        //                 </div>\
        //                 <div class="align-items-center  d-flex  justify-content-between  pb-3">\
        //                     <label>2. Select kit: ' + aliqStep2 + ' aliquots</label> &nbsp;\
        //                     <button type="button" class="btn  btn-primary  btn-redirect" url=' + urlStep2 + ' value="View">View</button>\
        //                 </div>\
        //                 <div class="align-items-center  d-flex  justify-content-between  pb-3">\
        //                     <label>3. Perform QC/QA: ' + aliqStep3 + ' aliquots</label> &nbsp;\
        //                     <button type="button" class="btn  btn-primary  btn-redirect" url=' + urlStep3 + ' value="View">View</button>\
        //                 </div>\
        //                 <div class="align-items-center  d-flex  justify-content-between">\
        //                     <label>4. Create derivatives: ' + aliqStep4 + ' aliquots</label> &nbsp;\
        //                     <button type="button" class="btn  btn-primary  btn-redirect" url=' + urlStep4 + ' value="View">View</button>\
        //                 </div>';
        // 
    });

    $('#aliqSplit').click(function() {
        timer = setTimeout(function(){$("body").addClass("loading");},100);
        var urlSplit = "/biobank/split/execute";
        var url = base_url + '/aliquot_split/' + username;
        $.ajax({
            'url' : url,
            'type' : 'GET',
            'dataType' : 'JSON',
            success(result, status) {
                clearTimeout(timer);
                $("body").removeClass("loading");
                console.log('Ajax: ', result.data, ' - ', status);
                if (result.data != 'errore') {
                    $('#tableHeader').html('Aliquot to split');
                    var htmlString = '<div class="align-items-center  d-flex  justify-content-between  py-3">\
                                        <label>' + result.data + ' aliquots</label> &nbsp;\
                                        <button type="button" class="btn  btn-primary  btn-redirect" url=' + urlSplit + ' value="View">View</button>\
                                    </div>';
                    $('#tableBody').html(htmlString);
                    startRedirectButtons();
                }
            },
            error(xhr, status, error) {
                clearTimeout(timer);
                $("body").removeClass("loading");
                console.log('Ajax ERROR: ', error, ' - ', status);
            }
        });
    });

    $('#aliqSlideLab').click(function() {
        timer = setTimeout(function(){$("body").addClass("loading");},100);
        var urlSlideLab = "/biobank/label/execute";
        var url = base_url + '/aliquot_slideLab/' + username;
        $.ajax({
            'url' : url,
            'type' : 'GET',
            'dataType' : 'JSON',
            success(result, status) {
                clearTimeout(timer);
                $("body").removeClass("loading");
                console.log('Ajax: ', result.data, ' - ', status);
                if (result.data != 'errore') {
                    $('#tableHeader').html('Aliquot ready for slide labelling');
                    var htmlString = '<div class="align-items-center  d-flex  justify-content-between  py-3">\
                                        <label>' + result.data + ' aliquots</label> &nbsp;\
                                        <button type="button" class="btn  btn-primary  btn-redirect" url=' + urlSlideLab + ' value="View">View</button>\
                                    </div>';
                    $('#tableBody').html(htmlString);
                    startRedirectButtons();
                }
            },
            error(xhr, status, error) {
                clearTimeout(timer);
                $("body").removeClass("loading");
                console.log('Ajax ERROR: ', error, ' - ', status);
            }
        });
    });

    $('#aliqSlidePrep').click(function() {
        timer = setTimeout(function(){$("body").addClass("loading");},100);
        var urlSlidePrep = "/biobank/slide/choose";
        var url = base_url + '/aliquot_slidePrep/' + username;
        $.ajax({
            'url' : url,
            'type' : 'GET',
            'dataType' : 'JSON',
            success(result, status) {
                clearTimeout(timer);
                $("body").removeClass("loading");
                console.log('Ajax: ', result.data, ' - ', status);
                if (result.data != 'errore') {
                    $('#tableHeader').html('Aliquot ready for slide preparation');
                    var htmlString = '<div class="align-items-center  d-flex  justify-content-between  py-3">\
                                        <label>' + result.data + ' aliquots</label> &nbsp;\
                                        <button type="button" class="btn  btn-primary  btn-redirect" url=' + urlSlidePrep + ' value="View">View</button>\
                                    </div>';
                    $('#tableBody').html(htmlString);
                    startRedirectButtons();
                }
            },
            error(xhr, status, error) {
                clearTimeout(timer);
                $("body").removeClass("loading");
                console.log('Ajax ERROR: ', error, ' - ', status);
            }
        });
    });
    
    $('#aliqQcQa').click(function() {
        timer = setTimeout(function(){$("body").addClass("loading");},100);
        var urlRevalue = "/biobank/revalue/execute";
        var url = base_url + '/aliquot_revalue';
        $.ajax({
            'url' : url,
            'type' : 'GET',
            'dataType' : 'JSON',
            success(result, status) {
                clearTimeout(timer);
                $("body").removeClass("loading");
                console.log('Ajax: ', result.data, ' - ', status);
                if (result.data != 'errore') {
                    $('#tableHeader').html('Aliquot ready for performing QC/QA');
                    var htmlString = '<div class="align-items-center  d-flex  justify-content-between  py-3">\
                                        <label>' + result.data + ' aliquots</label> &nbsp;\
                                        <button type="button" class="btn  btn-primary  btn-redirect" url=' + urlRevalue  + ' value="View">View</button>\
                                    </div>';
                    $('#tableBody').html(htmlString);
                    startRedirectButtons();
                }
            },
            error(xhr, status, error) {
                clearTimeout(timer);
                $("body").removeClass("loading");
                console.log('Ajax ERROR: ', error, ' - ', status);
            }
        });
    });

    $('#aliqTransfer').click(function() {
        timer = setTimeout(function(){$("body").addClass("loading");},100);
        var urlTransfer = "/biobank/transfer/pending";
        var urlReceive = "/biobank/transfer/receive";
        var url = base_url + '/aliquot_transfer/' + username;
        $.ajax({
            'url' : url,
            'type' : 'GET',
            'dataType' : 'JSON',
            success(result, status) {
                clearTimeout(timer);
                $("body").removeClass("loading");
                console.log('Ajax: ', result.data, ' - ', status);
                if (result.data != 'errore') {
                    $('#tableHeader').html('Aliquot for transfering');
                    var htmlString = '<div class="align-items-center  d-flex  justify-content-between  pb-3">\
                                        <label>' + result.data[0] + ' aliquots pending for tranfer</label> &nbsp;\
                                        <button type="button" class="btn  btn-primary  btn-redirect" url=' + urlTransfer + ' value="View">View</button>\
                                    </div>\
                                    <div class="align-items-center  d-flex  justify-content-between  py-3">\
                                        <label>' + result.data[1] + ' aliquots to receive</label> &nbsp;\
                                        <button type="button" class="btn  btn-primary  btn-redirect" url=' + urlReceive  + ' value="View">View</button>\
                                    </div>';
                    $('#tableBody').html(htmlString);
                    startRedirectButtons();
                }
            },
            error(xhr, status, error) {
                clearTimeout(timer);
                $("body").removeClass("loading");
                console.log('Ajax ERROR: ', error, ' - ', status);
            }
        });
    });
});
