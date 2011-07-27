(function (window, $) {
    
    $.ajax({
        url: 'assumptions.json',
        dataType: 'json',
        success: assumptionEngine,
        error: noDataFallback
    });
    
    function noDataFallback () {
        $('html')
            .removeClass('js')
            .addClass('no-js');
    }
    
    function makeAssumption (arr, len) {
        var item = Math.floor(Math.random() * len);
        return arr[item];
    }
        
    function assumptionEngine (data) {
        var assumptions = data['assumptions'] || false,
            assLength;
        
        if (!assumptions) {
            noDataFallback();
            return;
        }
        
        assLength = assumptions.length;
        
        $(function () {
            var $toldyou = $('#told-you');
            
            $toldyou.css({'opacity': 0});
            
            $('form').submit(function (ev) {
                var assume = makeAssumption(assumptions, assLength);
                
                if (!$('#assumption').is(':visible')) {
                    $('#assumption').show();
                }
                
                $toldyou
                    .stop()
                    .fadeTo(300, 0, function () {
                        $(this)
                            .html(assume)
                            .fadeTo(300, 1);
                    });
                
                ev.preventDefault();
            });
        });
    }    
    
}(this, jQuery));
