
$(document).ready(function() {
    console.log('Dashboard JS: ', aliqStep1);

    $('#aliqDer').click(function() {
        console.log('Devo mostrare le aliquote derive nella tabella');
        $('#tableHeader').html('Aliquots Derivation Phases');
        var htmlString = '<div>\
                            <label>1. Protocol Selection: ' + aliqStep1 + '</label> &nbsp;\
                            <button type="button" class="btn  btn-primary  btn-redirect" url=' + urlStep1 + ' value="View">View</button>\
                        </div>';
        $('#tableBody').html(htmlString);

        $('.btn-redirect').click(function(event) {
            event.stopPropagation();
            var url = $(this).attr('url');
            if (url){
                window.location = url;
            }
        });
    });

    $('#aliqSplit').click(function() {
        console.log('Devo mostrare le aliquote split nella tabella');
    });
});
