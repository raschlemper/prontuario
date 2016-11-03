'use strict';

app.factory('ImageService', 
    function() {

    return {       

        imageToBlob: function(image) {
            return new Blob([image], {
                type: 'image/png'
            });          
        },

        getUrlImage: function(file, callback) {
            var reader = new FileReader();
            reader.onload = callback;
            reader.readAsDataURL(file);
        }

    }

});