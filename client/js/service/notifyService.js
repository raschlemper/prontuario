'use strict';

app.factory('NotifyService', ['notificationService', 
    function(notificationService) {

    var notification = function(title, text, type) {        
        notificationService.notify({
            title: title,
            title_escape: false,
            text: text,
            text_escape: false,
            styling: "bootstrap3",
            type: type,
            icon: true
        }); 
    }

    return {

        success: function(text) {
            notification('Sucesso', text, 'success');
        },
        erroe: function(text) {
            notification('Erro', text, 'error');
        }

    }

}]);