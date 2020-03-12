
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

function loadAliqDer() {
    $.ajax({
        'url' : '../load_derived',
        'type' : 'GET',
        'dataType' : 'JSON',
        success(result, status) {
            console.log('Ajax: ', result, ' - ', status);
            if (result.data != 'errore') {
                $('#aliqDer').html(result.aliqDer);
                $('#aliqDer').removeClass('btn-warning');
                $('#aliqDer').addClass('btn-success');
                console.log(result.data);
            }
        },
        error(xhr, status, error) {
            console.log('Ajax ERROR: ', error, ' - ', status);
        }
    });
};

function loadAliqSplit() {
    $.ajax({
        'url' : '../load_split',
        'type' : 'GET',
        'dataType' : 'JSON',
        success(result, status) {
            console.log('Ajax: ', result, ' - ', status);
            if (result.data != 'errore') {
                $('#aliqSplit').html(result.aliqSplit);
                $('#aliqSplit').removeClass('btn-warning');
                $('#aliqSplit').addClass('btn-success');
                console.log(result.data);
            }
        },
        error(xhr, status, error) {
            console.log('Ajax ERROR: ', error, ' - ', status);
        }
    });
};

function loadSlideLab() {
    $.ajax({
        'url' : '../load_slide_lab',
        'type' : 'GET',
        'dataType' : 'JSON',
        success(result, status) {
            console.log('Ajax: ', result, ' - ', status);
            if (result.data != 'errore') {
                $('#aliqSlideLab').html(result.aliqSlideLab);
                $('#aliqSlideLab').removeClass('btn-warning');
                $('#aliqSlideLab').addClass('btn-success');
                console.log(result.data);
            }
        },
        error(xhr, status, error) {
            console.log('Ajax ERROR: ', error, ' - ', status);
        }
    });
};

function loadSlidePrep() {
    $.ajax({
        'url' : '../load_slide_prep',
        'type' : 'GET',
        'dataType' : 'JSON',
        success(result, status) {
            console.log('Ajax: ', result, ' - ', status);
            if (result.data != 'errore') {
                $('#aliqSlidePrep').html(result.aliqSlidePrep);
                $('#aliqSlidePrep').removeClass('btn-warning');
                $('#aliqSlidePrep').addClass('btn-success');
                console.log(result.data);
            }
        },
        error(xhr, status, error) {
            console.log('Ajax ERROR: ', error, ' - ', status);
        }
    });
};

function loadRevalue() {
    $.ajax({
        'url' : '../load_revalue',
        'type' : 'GET',
        'dataType' : 'JSON',
        success(result, status) {
            console.log('Ajax: ', result, ' - ', status);
            if (result.data != 'errore') {
                $('#aliqQcQa').html(result.aliqRevalue);
                $('#aliqQcQa').removeClass('btn-warning');
                $('#aliqQcQa').addClass('btn-success');
                console.log(result.data);
            }
        },
        error(xhr, status, error) {
            console.log('Ajax ERROR: ', error, ' - ', status);
        }
    });
};

function loadTransfers() {
    $.ajax({
        'url' : '../load_transfers',
        'type' : 'GET',
        'dataType' : 'JSON',
        success(result, status) {
            console.log('Ajax: ', result, ' - ', status);
            if (result.data != 'errore') {
                $('#aliqTransfer').html(result.aliqTransfer);
                $('#aliqTransfer').removeClass('btn-warning');
                $('#aliqTransfer').addClass('btn-success');
                console.log(result.data);
            }
        },
        error(xhr, status, error) {
            console.log('Ajax ERROR: ', error, ' - ', status);
        }
    });
};

function loadImplantedMice() {
    $.ajax({
        'url' : '../load_implanted_mice',
        'type' : 'GET',
        'dataType' : 'JSON',
        success(result, status) {
            console.log('Ajax: ', result, ' - ', status);
            if (result.data != 'errore') {
                $('#implantedMice').html(result.implantedMice);
                $('#implantedMice').removeClass('btn-warning');
                $('#implantedMice').addClass('btn-success');
                console.log(result.data);
            }
        },
        error(xhr, status, error) {
            console.log('Ajax ERROR: ', error, ' - ', status);
        }
    });
};


$(document).ready(function() {

    loadAliqDer();
    loadAliqSplit();
    loadSlideLab();
    loadSlidePrep();
    loadRevalue();
    loadTransfers();
    loadImplantedMice();

    $('#btnRefreshAll').click(function() {
        $(".btn-loading").each(function() {
            $(this).html('Loading');
            $(this).removeClass('btn-success');
            $(this).addClass('btn-warning');
        });
        loadAliqDer();
        loadAliqSplit();
        loadSlideLab();
        loadSlidePrep();
        loadRevalue();
        loadTransfers();
        loadImplantedMice();
    });

    
    $('#reloadAliqDer').click(function() {
        $('#refreshAliqDer').toggleClass("rotate");
        $('#aliqDer').html('Loading');
        $('#aliqDer').removeClass('btn-success');
        $('#aliqDer').addClass('btn-warning');
        loadAliqDer();
    });

    $('#reloadAliqSplit').click(function() {
        loadAliqSplit();
    });
    
    $('#reloadSlideLab').click(function() {
        loadSlideLab();
    });
    
    $('#reloadSlidePrep').click(function() {
        loadSlidePrep();
    });

    $('#reloadRevalue').click(function() {
        loadRevalue();
    });

    $('#reloadTransfer').click(function() {
        loadTransfers();
    });

    $('#reloadImplantedMice').click(function() {
        loadImplantedMice();
    });

    var base_url = '../../../biobank/api/dhbd';
    var base_xeno_url = '../../../xeno/api/dhbd';
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
                                            <a href="' + urlText + '" target="_blank">\
                                                <button type="button" class="btn  btn-primary  btn-redirect" value="View">View</button>\
                                            </a>\
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
                                    <a href="' + urlText + '" target="_blank">\
                                        <button type="button" class="btn  btn-primary  btn-redirect" value="View">View</button>\
                                    </a>\
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
                                            <a href="' + urlText + '" target="_blank">\
                                                <button type="button" class="btn  btn-primary  btn-redirect" value="View">View</button>\
                                            </a>\
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
            },
            complete(response, status) {
                console.log('Ajax complete: ', response, ' - ', status);
                document.querySelector('#tableHeader').scrollIntoView({
                    behavior: 'smooth'
                });
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
                                        <a href="' + urlSplit + '" target="_blank">\
                                            <button type="button" class="btn  btn-primary  btn-redirect" value="View">View</button>\
                                        </a>\
                                    </div>';
                    htmlString += '<hr class="m-0">\
                                    <div class="p-3  text-center">\
                                        <label>Robot</label>\
                                    </div>';
                    htmlString += '<div class="align-items-center  d-flex  justify-content-between  pb-3">\
                                    <label>' + result.data + ' aliquots</label> &nbsp;\
                                    <a href="' + urlRobotSplit + '" target="_blank">\
                                        <button type="button" class="btn  btn-primary  btn-redirect" value="View">View</button>\
                                    </a>\
                                </div>';
                    $('#tableBody').html(htmlString);
                    startRedirectButtons();
                }
            },
            error(xhr, status, error) {
                clearTimeout(timer);
                $("body").removeClass("loading");
                console.log('Ajax ERROR: ', error, ' - ', status);
            },
            complete(response, status) {
                console.log('Ajax complete: ', response, ' - ', status);
                document.querySelector('#tableHeader').scrollIntoView({
                    behavior: 'smooth'
                });
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
                                        <a href="' + urlSlideLab + '" target="_blank">\
                                            <button type="button" class="btn  btn-primary  btn-redirect" value="View">View</button>\
                                        </a>\
                                    </div>';
                    $('#tableBody').html(htmlString);
                    startRedirectButtons();
                }
            },
            error(xhr, status, error) {
                clearTimeout(timer);
                $("body").removeClass("loading");
                console.log('Ajax ERROR: ', error, ' - ', status);
            },
            complete(response, status) {
                console.log('Ajax complete: ', response, ' - ', status);
                document.querySelector('#tableHeader').scrollIntoView({
                    behavior: 'smooth'
                });
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
                                        <a href="' + urlSlidePrep + '" target="_blank">\
                                            <button type="button" class="btn  btn-primary  btn-redirect" value="View">View</button>\
                                        </a>\
                                    </div>';
                    $('#tableBody').html(htmlString);
                    startRedirectButtons();
                }
            },
            error(xhr, status, error) {
                clearTimeout(timer);
                $("body").removeClass("loading");
                console.log('Ajax ERROR: ', error, ' - ', status);
            },
            complete(response, status) {
                console.log('Ajax complete: ', response, ' - ', status);
                document.querySelector('#tableHeader').scrollIntoView({
                    behavior: 'smooth'
                });
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
                                        <a href="' + urlRevalue + '" target="_blank">\
                                            <button type="button" class="btn  btn-primary  btn-redirect" value="View">View</button>\
                                        </a>\
                                    </div>';
                    htmlString += '<hr class="m-0">\
                                    <div class="p-3  text-center">\
                                        <label>Robot</label>\
                                    </div>';
                    htmlString += '<div class="align-items-center  d-flex  justify-content-between  pb-3">\
                                    <label>' + result.data + ' aliquots</label> &nbsp;\
                                    <a href="' + urlRobotRevalue + '" target="_blank">\
                                        <button type="button" class="btn  btn-primary  btn-redirect" value="View">View</button>\
                                    </a>\
                                </div>';
                    $('#tableBody').html(htmlString);
                    startRedirectButtons();
                }
            },
            error(xhr, status, error) {
                clearTimeout(timer);
                $("body").removeClass("loading");
                console.log('Ajax ERROR: ', error, ' - ', status);
            },
            complete(response, status) {
                console.log('Ajax complete: ', response, ' - ', status);
                document.querySelector('#tableHeader').scrollIntoView({
                    behavior: 'smooth'
                });
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
                                        <a href="' + urlTransfer + '" target="_blank">\
                                            <button type="button" class="btn  btn-primary  btn-redirect" value="View">View</button>\
                                        </a>\
                                    </div>\
                                    <div class="align-items-center  d-flex  justify-content-between  py-3">\
                                        <label>' + result.data[1] + ' aliquots to receive</label> &nbsp;\
                                        <a href="' + urlReceive + '" target="_blank">\
                                            <button type="button" class="btn  btn-primary  btn-redirect" value="View">View</button>\
                                        </a>\
                                    </div>';
                    $('#tableBody').html(htmlString);
                    startRedirectButtons();
                }
            },
            error(xhr, status, error) {
                clearTimeout(timer);
                $("body").removeClass("loading");
                console.log('Ajax ERROR: ', error, ' - ', status);
            },
            complete(response, status) {
                console.log('Ajax complete: ', response, ' - ', status);
                document.querySelector('#tableHeader').scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    $('#implantedMice').click(function(){
        timer = setTimeout(function(){$("body").addClass("loading");},100);
        var url = base_xeno_url + '/implanted_mice/' + username;
        var urlView = "/xeno/experiments/ongoing";
        $.ajax({
            'url' : url,
            'type' : 'GET',
            'dataType' : 'JSON',
            success(result, status) {
                clearTimeout(timer);
                $("body").removeClass("loading");
                console.log('Ajax: ', result.data, ' - ', status);
                if (result.data != 'errore') {
                    var label = '';
                    if (result.data == 1) {
                        $('#tableHeader').html('Implanted Mouse');
                        label = result.data + ' mouse';
                    } else {
                        $('#tableHeader').html('Implanted Mice');
                        label = result.data + ' mice';
                    }
                    
                    var htmlString = '<div class="align-items-center  d-flex  justify-content-between  py-3">\
                                        <label>' + label + '</label> &nbsp;\
                                        <a href="' + urlView + '" target="_blank">\
                                            <button type="button" class="btn  btn-primary  btn-redirect" value="View">View</button>\
                                        </a>\
                                    </div>';
                    $('#tableBody').html(htmlString);
                    startRedirectButtons();
                }
            },
            error(xhr, status, error) {
                clearTimeout(timer);
                $("body").removeClass("loading");
                console.log('Ajax ERROR: ', error, ' - ', status);
            },
            complete(response, status) {
                console.log('Ajax complete: ', response, ' - ', status);
                document.querySelector('#tableHeader').scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    $('#availableMice').click(function(){
        timer = setTimeout(function(){$("body").addClass("loading");},100);
        var url = base_xeno_url + '/available_mice';
        var urlView = "/xeno/implants/start";
        $.ajax({
            'url' : url,
            'type' : 'GET',
            'dataType' : 'JSON',
            success(result, status) {
                clearTimeout(timer);
                $("body").removeClass("loading");
                console.log('Ajax: ', result.data, ' - ', status);
                if (result.data != 'errore') {
                    var label = '';
                    $('#tableHeader').html('Available Mice');
                    if (result.data == 1) {
                        label = result.data + ' mouse';
                    } else {
                        label = result.data + ' mice';
                    }
                    
                    var htmlString = '<div class="align-items-center  d-flex  justify-content-between  py-3">\
                                        <label>' + label + '</label> &nbsp;\
                                        <a href="' + urlView + '" target="_blank">\
                                            <button type="button" class="btn  btn-primary  btn-redirect" value="Start Implant">Start Implant</button>\
                                        </a>\
                                    </div>';
                    $('#tableBody').html(htmlString);
                    startRedirectButtons();
                }
            },
            error(xhr, status, error) {
                clearTimeout(timer);
                $("body").removeClass("loading");
                console.log('Ajax ERROR: ', error, ' - ', status);
            },
            complete(response, status) {
                console.log('Ajax complete: ', response, ' - ', status);
                document.querySelector('#tableHeader').scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
    
    $('#miceUnderTreatment').click(function(){
        timer = setTimeout(function(){$("body").addClass("loading");},100);
        var url = base_xeno_url + '/mice_under_treatment/' + username;
        var urlView = "/xeno/experiments/ongoing";
        $.ajax({
            'url' : url,
            'type' : 'GET',
            'dataType' : 'JSON',
            success(result, status) {
                clearTimeout(timer);
                $("body").removeClass("loading");
                console.log('Ajax: ', result.data, ' - ', status);
                if (result.data != 'errore') {
                    var label = '';
                    $('#tableHeader').html('Mice Under Treatment');
                    if (result.data == 1) {
                        label = result.data + ' mouse';
                    } else {
                        label = result.data + ' mice';
                    }
                    
                    var htmlString = '<div class="align-items-center  d-flex  justify-content-between  py-3">\
                                        <label>' + label + '</label> &nbsp;\
                                        <a href="' + urlView + '" target="_blank">\
                                            <button type="button" class="btn  btn-primary  btn-redirect" value="View">View</button>\
                                        </a>\
                                    </div>';
                    $('#tableBody').html(htmlString);
                    startRedirectButtons();
                }
            },
            error(xhr, status, error) {
                clearTimeout(timer);
                $("body").removeClass("loading");
                console.log('Ajax ERROR: ', error, ' - ', status);
            },
            complete(response, status) {
                console.log('Ajax complete: ', response, ' - ', status);
                document.querySelector('#tableHeader').scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
    
    $('#explantMice').click(function(){
        timer = setTimeout(function(){$("body").addClass("loading");},100);
        var url = base_xeno_url + '/explant_mice/' + username;
        var urlView = "/xeno/explants/start";
        $.ajax({
            'url' : url,
            'type' : 'GET',
            'dataType' : 'JSON',
            success(result, status) {
                clearTimeout(timer);
                $("body").removeClass("loading");
                console.log('Ajax: ', result.data, ' - ', status);
                if (result.data != 'errore') {
                    var label = '';
                    $('#tableHeader').html('Mice For Explant');
                    if (result.data[0] == 1) {
                        label = result.data[0] + ' mouse';
                    } else {
                        label = result.data[0] + ' mice';
                    }
                    label += ' ready for explant<br>';
                    if (result.data[1] == 1) {
                        label += result.data[1] + ' mouse';
                    } else {
                        label += result.data[1] + ' mice';
                    }
                    label += ' for explant lite';
                    var htmlString = '<div class="align-items-center  d-flex  justify-content-between  py-3">\
                                        <label>' + label + '</label> &nbsp;\
                                        <a href="' + urlView + '" target="_blank">\
                                            <button type="button" class="btn  btn-primary  btn-redirect" value="Start Explant">Start Explant</button>\
                                        </a>\
                                    </div>';
                    $('#tableBody').html(htmlString);
                    startRedirectButtons();
                }
            },
            error(xhr, status, error) {
                clearTimeout(timer);
                $("body").removeClass("loading");
                console.log('Ajax ERROR: ', error, ' - ', status);
            },
            complete(response, status) {
                console.log('Ajax complete: ', response, ' - ', status);
                document.querySelector('#tableHeader').scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    $('#collections').click(function(){
        timer = setTimeout(function(){$("body").addClass("loading");},100);
        var url = base_url + '/collections';
        $.ajax({
            'url' : url,
            'type' : 'GET',
            'dataType' : 'JSON',
            success(result, status) {
                clearTimeout(timer);
                $("body").removeClass("loading");
                console.log('Ajax: ', result.data, ' - ', status);
                if (result.data != 'errore') {
                    $('#tableHeader').html('Available Collections');
                    var htmlString = '<div class="align-items-center  d-flex  justify-content-between  py-3">\
                                        <label>' + result.data.length + ' collections</label>\
                                    </div>';
                    htmlString +=   '<div class="font-weight-bold  pb-3  row">\
                                        <div class="col">Type</div>\
                                        <div class="col">Code</div>\
                                        <div class="col">Date</div>\
                                    </div>';
                    for (var i = 0; i < result.data.length; i++) {
                        htmlString += '<div class="pb-2  row">\
                                            <div class="col">' + result.data[i][3] + '</div>\
                                            <div class="col">' + result.data[i][6] + '</div>\
                                            <div class="col">' + result.data[i][7] + '</div>\
                                        </div>';
                    }
                    htmlString += '</div>';
                    $('#tableBody').html(htmlString);
                    startRedirectButtons();
                }
            },
            error(xhr, status, error) {
                clearTimeout(timer);
                $("body").removeClass("loading");
                console.log('Ajax ERROR: ', error, ' - ', status);
            },
            complete(response, status) {
                console.log('Ajax complete: ', response, ' - ', status);
                document.querySelector('#tableHeader').scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});
