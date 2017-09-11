$(document).ready( function () {
  $("form").submit( function () {
    var formdata = $(this).serialize();
    $("form").trigger('reset');
    $.ajax({
      type: "POST",
      url: "/add",
      data: formdata,
    });
    return false;
  });
});

$(document).ready(function () {

  $('.star').on('click', function () {
      $(this).toggleClass('star-checked');
    });

    $('.ckbox label').on('click', function () {
      $(this).parents('tr').toggleClass('selected');
    });

    $('.btn-filter').on('click', function () {
      var $target = $(this).data('target');
      if ($target != 'all') {
        $('.table tr').css('display', 'none');
        $('.table tr[data-status="' + $target + '"]').fadeIn('slow');
      } else {
        $('.table tr').css('display', 'none').fadeIn('slow');
      }
    });

 });