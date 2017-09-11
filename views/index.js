$(document).ready( function () {
  $("#addForm").submit( function () {
    var formdata = $(this).serialize();
    $("#addForm").trigger("reset");
    $.ajax({
      type: "POST",
      url: "/add",
      data: formdata,
    }).done(function(){
      window.location.reload();
    });
    return false;
  });
  $(".delete").click( function () {
    var id = $(".delete").attr("id").split("-")[1];
    window.location.reload();
    $.ajax({
      url: "delete/"+ id,
      type: "DELETE",
    }).done(function(){
      window.location.replace("/");
    });
    return false;
  });
  $(".update").click( function () {
    var formdata = $(".updateForm").serialize();
    var id = $(".update").attr("id").split("-")[1];
    $.ajax({
      type: "PUT",
      url: "/update/"+id,
      data: formdata,
    }).done(function(){
      window.location.replace("/");
    });
    return false;
  });


  $(".star").on("click", function () {
    $(this).toggleClass("star-checked");
  });

  $(".ckbox label").on("click", function () {
    $(this).parents("tr").toggleClass("selected");
  });

  $(".btn-filter").on("click", function () {
    var $target = $(this).data("target");
    if ($target != "all") {
      $(".table-filter tr").css("display", "none");
      $(".table-filter tr[data-status='" + $target + "']").fadeIn("slow");
    } else {
      $(".table tr-filter").css("display", "none").fadeIn("slow");
    }
  });

});