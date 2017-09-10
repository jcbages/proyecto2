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