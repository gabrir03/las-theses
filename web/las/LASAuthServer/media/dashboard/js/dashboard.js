
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
        var url = base_url + '/aliquot_derivation/' + username;
        $.ajax({
            'url' : url,
            'type' : 'GET',
            'dataType' : 'JSON',
            success(result, status) {
                clearTimeout(timer);
                $("body").removeClass("loading");
                console.log('Ajax: ', result, ' - ', status);
                if (result.data != 'errore') {
                    $('#tableHeader').html('Aliquot derivation phases');
                    var htmlString = '';
                    var labelText = '';
                    var urlText = '';
                    // console.log('Manuale: ', result.data);
                    for (var i = 0; i < result.data.length; i++) {
                        if (i == 0) {
                            labelText = 'Protocol Selection: ';
                            urlText = "/biobank/derived/execute";
                        }
                        if (i == 1) {
                            labelText = 'Select kit: ';
                            urlText = "/biobank/derived/execute/loadkit";
                        }
                        if (i == 2) {
                            labelText = 'Perform QC/QA: ';
                            urlText = "/biobank/derived/execute/loaddetailspart2";
                        }
                        if (i == 3) {
                            labelText = 'Create derivatives: ';
                            urlText = "/biobank/derived/execute/loadlastpart";
                        }
                        labelText += result.data[i] + ' aliquots';
                        htmlString += '<div class="align-items-center  d-flex  justify-content-between  pb-3">\
                                            <label>' + labelText + '</label> &nbsp;\
                                            <button type="button" class="btn  btn-primary  btn-redirect" url=' + urlText + ' value="View">View</button>\
                                        </div>';
                    }
                    // console.log('Robot: ', result.dataRobot);
                    // ROBOT
                    htmlString += '<hr class="m-0">\
                                    <div class="p-3  text-center">\
                                        <label>Robot</label>\
                                    </div>';
                    // Primo step in comune fra robot e manuale
                    labelText = 'Protocol Selection: ' + result.data[0] + ' aliquots';
                    urlText = "/biobank/derived/robot/loadstep1";
                    htmlString += '<div class="align-items-center  d-flex  justify-content-between  pb-3">\
                                    <label>' + labelText + '</label> &nbsp;\
                                    <button type="button" class="btn  btn-primary  btn-redirect" url=' + urlText + ' value="View">View</button>\
                                </div>';
                    for (var i = 0; i < result.dataRobot.length; i++) {
                        if (i == 0) {
                            labelText = 'Select kit: ';
                            urlText = "/biobank/derived/robot/loadstepkit";
                        }
                        if (i == 1) {
                            labelText = 'Perform QC/QA: ';
                            urlText = "/biobank/derived/robot/measure";
                        }
                        if (i == 2) {
                            labelText = 'Create derivatives: ';
                            urlText = "/biobank/derived/robot/loadcreatealiquot";
                        }
                        labelText += result.dataRobot[i] + ' aliquots';
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
    });

    $('#aliqSplit').click(function() {
        timer = setTimeout(function(){$("body").addClass("loading");},100);
        var urlSplit = "/biobank/split/execute";
        var urlRobotSplit = "/biobank/split/robot/loadvalidate";
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
                    htmlString += '<hr class="m-0">\
                                    <div class="p-3  text-center">\
                                        <label>Robot</label>\
                                    </div>';
                    htmlString += '<div class="align-items-center  d-flex  justify-content-between  pb-3">\
                                    <label>' + result.data + ' aliquots</label> &nbsp;\
                                    <button type="button" class="btn  btn-primary  btn-redirect" url=' + urlRobotSplit + ' value="View">View</button>\
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
        var urlRobotRevalue = "/biobank/revalue/robot/loadvalidate";
        var url = base_url + '/aliquot_revalue/' + username;
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
                    htmlString += '<hr class="m-0">\
                                    <div class="p-3  text-center">\
                                        <label>Robot</label>\
                                    </div>';
                    htmlString += '<div class="align-items-center  d-flex  justify-content-between  pb-3">\
                                    <label>' + result.data + ' aliquots</label> &nbsp;\
                                    <button type="button" class="btn  btn-primary  btn-redirect" url=' + urlRobotRevalue + ' value="View">View</button>\
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
                    var htmlString = '<div class="align-items-center  d-flex  justify-content-between  py-3">\
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

    $('#implantedMice').click(function(){
        timer = setTimeout(function(){$("body").addClass("loading");},100);
        var url = base_url + '/implanted_mice/' + username;
        $.ajax({
            'url' : url,
            'type' : 'GET',
            'dataType' : 'JSON',
            success(result, status) {
                clearTimeout(timer);
                $("body").removeClass("loading");
                console.log('Ajax: ', result.data, ' - ', status);
            },
            error(xhr, status, error) {
                clearTimeout(timer);
                $("body").removeClass("loading");
                console.log('Ajax ERROR: ', error, ' - ', status);
            }
        });
    });
});
