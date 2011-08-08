(function (window, $) {
    
    $.ajax({ // Change the URL value to what works for you, naturally.
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
    
    function assumptionEngine (data) {
        var assumptions = data['assumptions'] || false,
            assClone;
        
        if (!assumptions) {
            noDataFallback();
            return;
        }
        
        function makeAssumption () {
            var item,
                assumption;
            
            // Clone the assumptions array & work from it.
            if (!assClone || !assClone.length) {
                assClone = assumptions.slice(0);
            }
            
            item = Math.floor(Math.random() * assClone.length);
            assumption = assClone[item];
            
            // Remove the current assumption from the array.
            assClone.splice(item, 1);
            
            return assumption;
        }
        
        $(function () {
            var $toldyou = $('#told-you');
            
            $toldyou.css({'opacity': 0});
            
            $('form').submit(function (ev) {
                var assume = makeAssumption();
                
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
            
            function gotcha () {
                function haha () {
                    var _t = $toldyou.text() + ' … Gotcha!';
                    $toldyou.text(_t);
                }
                setTimeout(haha, 600);
            }
            
            window.assumptionGotcha = gotcha;
        });
    }    
    
}(this, jQuery));
