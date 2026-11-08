
$(document).ready(function () {

  $("#secretButton").on("click", function () {
    $("#secretMessage").stop(true, true).fadeToggle(400);
  });

  $("#secretsInfoButton").on("click", function () {
    const info = $("#secretsInfo");
    const willOpen = !info.is(":visible");

    info.stop(true, true).slideToggle(400);
    $(this).attr("aria-expanded", String(willOpen));
  });

  $("#secretButton, #secretsInfoButton").hover(
    function () {
      $(this).stop(true, false).animate({
        paddingLeft: "38px",
        paddingRight: "38px"
      }, 200);
    },
    function () {
      $(this).stop(true, false).animate({
        paddingLeft: "40px",
        paddingRight: "40px"
      }, 200);
    }
  );

});
