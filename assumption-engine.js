(function (window, $) {
    
    $.ajax({
        url: 'assumptions.json',
        dataType: 'json',
        success: assumptionEngine,
        error: noDataFallback
    })
    
    function noDataFallback () {
        $('html')
            .removeClass('js')
            .addClass('no-js');
    }
    
    function makeAssumption (arr) {
        var item = Math.floor(Math.random() * arr.length);
        return arr[item];
    }
        
    function assumptionEngine (data) {
        var assumptions = data['assumptions'] || false;
        
        if (!assumptions) {
            noDataFallback();
            return;
        }
        
        $(function () {
            var $toldyou = $('#told-you');
            
            $toldyou.css({'opacity': 0});
            
            $('form').submit(function () {
                var assume = makeAssumption(assumptions);
                
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
                
                return false;
            });
        });
    }    
    
}(this, jQuery));
