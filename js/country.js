$(function(){
   var $link = $('.capLink').click(function() {
     var cap = $(this).attr('data-capital');
     getCountryData(cap);
     return false;
   });
});

var getCountryData = function(cap){
  $.ajax({
      type: 'GET',
      url: 'api/getCountryData/' + cap + '?format=json',
      dataType: 'json',
      async: false,
      success: function(data){
        console.log(data);
      }
    });
};
