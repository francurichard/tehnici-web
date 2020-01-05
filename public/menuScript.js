$('nav li').click(function() {
    $.ajax({
      type: 'GET',
      url: 'public/includes/ext-content/'+$(this).data('content')+'.html',
      dataType: 'html',
      success: function(response) {
        $('.ext-content').html(response);
      }
    });
  });