$(document).ready( function () {
  $("form").submit( function () {
    var formdata = $(this).serialize();
    $("form").trigger("reset");
    window.location.reload();
    $.ajax({
      type: "POST",
      url: "/add",
      data: formdata,
    });
    return false;
  });
  $(".delete").click( function () {
    var formdata = $(this).serialize();
    var id = $(".delete").attr("id").split("-")[1];
    window.location.reload();
    $.ajax({
      url: "delete/"+ id,
      type: "DELETE",
    });
    return false;
  });
  $(".star").on("click", function () {
    $(this).toggleClass("star-checked");
  });

  $(".ckbox label").on('click', function () {
    $(this).parents('tr').toggleClass('selected');
  });

  $('.btn-filter').on('click', function () {
    var $target = $(this).data('target');
    if ($target != 'all') {
      $('.table-filter tr').css('display', 'none');
      $('.table-filter tr[data-status="' + $target + '"]').fadeIn('slow');
    } else {
      $('.table tr-filter').css('display', 'none').fadeIn('slow');
    }
  });

});