
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
            }
        },
        error(xhr, status, error) {
            console.log('Ajax ERROR: ', error, ' - ', status);
        }
    });
};

function loadAvailableMice() {
    $.ajax({
        'url' : '../load_available_mice',
        'type' : 'GET',
        'dataType' : 'JSON',
        success(result, status) {
            console.log('Ajax: ', result, ' - ', status);
            if (result.data != 'errore') {
                $('#availableMice').html(result.availableMice);
                $('#availableMice').removeClass('btn-warning');
                $('#availableMice').addClass('btn-success');
            }
        },
        error(xhr, status, error) {
            console.log('Ajax ERROR: ', error, ' - ', status);
        }
    });
};

function loadMiceUnderTreatment() {
    $.ajax({
        'url' : '../load_mice_under_treatment',
        'type' : 'GET',
        'dataType' : 'JSON',
        success(result, status) {
            console.log('Ajax: ', result, ' - ', status);
            if (result.data != 'errore') {
                $('#miceUnderTreatment').html(result.miceUnderTreatment);
                $('#miceUnderTreatment').removeClass('btn-warning');
                $('#miceUnderTreatment').addClass('btn-success');
            }
        },
        error(xhr, status, error) {
            console.log('Ajax ERROR: ', error, ' - ', status);
        }
    });
};

function loadMiceExplants() {
    $.ajax({
        'url' : '../load_mice_explants',
        'type' : 'GET',
        'dataType' : 'JSON',
        success(result, status) {
            console.log('Ajax: ', result, ' - ', status);
            if (result.data != 'errore') {
                $('#explantMice').html(result.miceExplants);
                $('#explantMice').removeClass('btn-warning');
                $('#explantMice').addClass('btn-success');
            }
        },
        error(xhr, status, error) {
            console.log('Ajax ERROR: ', error, ' - ', status);
        }
    });
};

function show_chart() {
    $('#tableBody').hide();
    $('#tableChart').show();
};

function hide_chart() {
    $('#tableBody').show();
    $('#tableChart').hide();
};

function random_rgba() {
    var o = Math.round, r = Math.random, s = 255;
    return 'rgba(' + o(r()*s) + ',' + o(r()*s) + ',' + o(r()*s) + ',' + r().toFixed(1) + ')';
};

//Get the button:
goTopButton = document.getElementById("btnGoTop");

$(document).ready(function() {

    $('#btnGoTop').click(function() {
        document.body.scrollTop = 0; // For Safari
        // document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
        document.documentElement.scrollIntoView({
            behavior: 'smooth'
        });
    });

    // When the user scrolls down 20px from the top of the document, show the button
    window.onscroll = function() {
        if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
            $('#btnGoTop').css('display', 'block');
        } else {
            $('#btnGoTop').css('display', 'none');
        }
    };

    loadAliqDer();
    loadAliqSplit();
    loadSlideLab();
    loadSlidePrep();
    loadRevalue();
    loadTransfers();
    loadImplantedMice();
    loadAvailableMice();
    loadMiceUnderTreatment();
    loadMiceExplants();

    $('#btnRefreshAll').click(function() {
        $(".btn-loading").each(function() {
            $(this).html('Loading');
            $(this).removeClass('btn-success');
            $(this).addClass('btn-warning');
        });
        $('#tableHeader').html('Select data to display');
        $('#tableBody').html('');
        hide_chart();
        loadAliqDer();
        loadAliqSplit();
        loadSlideLab();
        loadSlidePrep();
        loadRevalue();
        loadTransfers();
        loadImplantedMice();
        loadAvailableMice();
        loadMiceUnderTreatment();
        loadMiceExplants();
    });

    
    $('#reloadAliqDer').click(function() {
        $('#refreshAliqDer').toggleClass("rotate");
        $('#aliqDer').html('Loading');
        $('#aliqDer').removeClass('btn-success');
        $('#aliqDer').addClass('btn-warning');
        loadAliqDer();
    });

    $('#reloadAliqSplit').click(function() {
        $('#refreshAliqSplit').toggleClass("rotate");
        $('#aliqSplit').html('Loading');
        $('#aliqSplit').removeClass('btn-success');
        $('#aliqSplit').addClass('btn-warning');
        loadAliqSplit();
    });
    
    $('#reloadSlideLab').click(function() {
        $('#refreshSlideLab').toggleClass("rotate");
        $('#aliqSlideLab').html('Loading');
        $('#aliqSlideLab').removeClass('btn-success');
        $('#aliqSlideLab').addClass('btn-warning');
        loadSlideLab();
    });
    
    $('#reloadSlidePrep').click(function() {
        $('#refreshSlidePrep').toggleClass("rotate");
        $('#aliqSlidePrep').html('Loading');
        $('#aliqSlidePrep').removeClass('btn-success');
        $('#aliqSlidePrep').addClass('btn-warning');
        loadSlidePrep();
    });

    $('#reloadRevalue').click(function() {
        $('#refreshRevalue').toggleClass("rotate");
        $('#aliqQcQa').html('Loading');
        $('#aliqQcQa').removeClass('btn-success');
        $('#aliqQcQa').addClass('btn-warning');
        loadRevalue();
    });

    $('#reloadTransfer').click(function() {
        $('#refreshTransfer').toggleClass("rotate");
        $('#aliqTransfer').html('Loading');
        $('#aliqTransfer').removeClass('btn-success');
        $('#aliqTransfer').addClass('btn-warning');
        loadTransfers();
    });

    $('#reloadImplantedMice').click(function() {
        $('#refreshImplantedMice').toggleClass("rotate");
        $('#implantedMice').html('Loading');
        $('#implantedMice').removeClass('btn-success');
        $('#implantedMice').addClass('btn-warning');
        loadImplantedMice();
    });

    $('#reloadAvailableMice').click(function() {
        $('#refreshAvailableMice').toggleClass("rotate");
        $('#availableMice').html('Loading');
        $('#availableMice').removeClass('btn-success');
        $('#availableMice').addClass('btn-warning');
        loadAvailableMice();
    });

    $('#reloadMiceUnderTreatment').click(function() {
        $('#refreshMiceUnderTreatment').toggleClass("rotate");
        $('#miceUnderTreatment').html('Loading');
        $('#miceUnderTreatment').removeClass('btn-success');
        $('#miceUnderTreatment').addClass('btn-warning');
        loadMiceUnderTreatment();
    });

    $('#reloadMiceExplants').click(function() {
        $('#refreshMiceExplants').toggleClass("rotate");
        $('#explantMice').html('Loading');
        $('#explantMice').removeClass('btn-success');
        $('#explantMice').addClass('btn-warning');
        loadMiceExplants();
    });

    var base_url = '../../../biobank/api/dhbd';
    var base_xeno_url = '../../../xeno/api/dhbd';
    var timer = null;
    var chartCtx = document.getElementById('myChart').getContext('2d');
    var chart = new Chart(chartCtx, {
        // The type of chart we want to create
        type: 'pie',
        // The data for our dataset
        data: {
            datasets: [{
                data: [],
                backgroundColor: []
            }],
            // These labels appear in the legend and in the tooltips when hovering different arcs
            labels: []
        },
        // // The data for our dataset
        // data: {
        //     datasets: [{
        //         data: [10, 20, 30, 15],
        //         backgroundColor: [
        //           'rgb(255, 0, 0)',
        //           'rgb(255, 255, 0)',
        //           'rgb(0, 0, 255)',
        //           'rgb(0, 100, 205)'
        //         ]
        //     }],
        
        //     // These labels appear in the legend and in the tooltips when hovering different arcs
        //     labels: [
        //         'Red',
        //         'Yellow',
        //         'Blue',
        //         'Boo'
        //     ]
        // },
        // Configuration options go here
        options: {
            cutoutPercentage: 0,
            legend: {
                position: 'right'
            }
        }
    });

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
                    hide_chart();
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
                // Applico lo scroll down solo se la view è cambiata
                if (window.innerWidth < 1200) {
                    document.querySelector('#tableHeader').scrollIntoView({
                        behavior: 'smooth'
                    });
                }
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
                    hide_chart();
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
                if (window.innerWidth < 1200) {
                    document.querySelector('#tableHeader').scrollIntoView({
                        behavior: 'smooth'
                    });
                }
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
                    hide_chart();
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
                if (window.innerWidth < 1200) {
                    document.querySelector('#tableHeader').scrollIntoView({
                        behavior: 'smooth'
                    });
                }
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
                    hide_chart();
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
                if (window.innerWidth < 1200) {
                    document.querySelector('#tableHeader').scrollIntoView({
                        behavior: 'smooth'
                    });
                }
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
                    hide_chart();
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
                if (window.innerWidth < 1200) {
                    document.querySelector('#tableHeader').scrollIntoView({
                        behavior: 'smooth'
                    });
                }
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
                    hide_chart();
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
                if (window.innerWidth < 1200) {
                    document.querySelector('#tableHeader').scrollIntoView({
                        behavior: 'smooth'
                    });
                }
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
                    hide_chart();
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
                if (window.innerWidth < 1200) {
                    document.querySelector('#tableHeader').scrollIntoView({
                        behavior: 'smooth'
                    });
                }
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
                    hide_chart();
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
                if (window.innerWidth < 1200) {
                    document.querySelector('#tableHeader').scrollIntoView({
                        behavior: 'smooth'
                    });
                }
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
                    hide_chart();
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
                if (window.innerWidth < 1200) {
                    document.querySelector('#tableHeader').scrollIntoView({
                        behavior: 'smooth'
                    });
                }
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
                    hide_chart();
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
                if (window.innerWidth < 1200) {
                    document.querySelector('#tableHeader').scrollIntoView({
                        behavior: 'smooth'
                    });
                }
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
                console.log('Ajax: ', result, ' - ', status);
                if (result.data != 'errore') {
                    $('#tableHeader').html('Available Collections');
                    show_chart();
                    var labelNames = [];
                    var dataValues = [];
                    var backgroundColors = [];
                    // Generare un colore random per ogni collezione
                    for (var i = 0; i < result.myCollections.length; i++) {
                        labelNames.push(result.myCollections[i].type);
                        dataValues.push(result.myCollections[i].value);
                        backgroundColors.push(random_rgba());
                    }
                    chart.data.datasets.forEach((dataset) => {
                        dataset.data = dataValues;
                        dataset.backgroundColor = backgroundColors;
                    });
                    chart.data.labels = labelNames;
                    chart.update();
                    /** DATI CHART CLASSICO */
                    // function addData(chart, label, data) {
                    //     chart.data.labels.push(label);
                    //     chart.data.datasets.forEach((dataset) => {
                    //         dataset.data.push(data);
                    //     });
                    //     chart.update();
                    // }
                    // var chart = new Chart(chartCtx, {
                    //     // The type of chart we want to create
                    //     type: 'line',
                    
                    //     // The data for our dataset
                    //     data: {
                    //         labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                    //         datasets: [{
                    //             label: 'My First dataset',
                    //             backgroundColor: 'rgb(255, 99, 132)',
                    //             borderColor: 'rgb(255, 99, 132)',
                    //             data: [0, 10, 5, 2, 20, 30, 45]
                    //         }]
                    //     },
                    
                    //     // Configuration options go here
                    //     options: {}
                    // });
                    // var htmlString = '<div class="align-items-center  d-flex  justify-content-between  py-3">\
                    //                     <label>' + result.data.length + ' collections</label>\
                    //                 </div>';
                    // htmlString +=   '<div class="font-weight-bold  pb-3  row">\
                    //                     <div class="col">Type</div>\
                    //                     <div class="col">Code</div>\
                    //                     <div class="col">Date</div>\
                    //                 </div>';
                    // for (var i = 0; i < result.data.length; i++) {
                    //     htmlString += '<div class="pb-2  row">\
                    //                         <div class="col">' + result.data[i][3] + '</div>\
                    //                         <div class="col">' + result.data[i][6] + '</div>\
                    //                         <div class="col">' + result.data[i][7] + '</div>\
                    //                     </div>';
                    // }
                    // htmlString += '</div>';
                    // $('#tableBody').html(htmlString);
                    startRedirectButtons();
                }
            },
            error(xhr, status, error) {
                clearTimeout(timer);
                $("body").removeClass("loading");
                console.log('Ajax ERROR: ', error, ' - ', status);
            },
            complete(response, status) {
                if (window.innerWidth < 1200) {
                    document.querySelector('#tableHeader').scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
});
