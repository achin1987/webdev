//check off the spcific todo by Clicking
$("li").click(function() {
    $(this).toggleClass("completed");
});

//click on X to delete todo
$("span").click(function() {
    $(this).parent().fadeOut(500, function() {
        $(this).remove();
    });
    event.stopPropagation();
});