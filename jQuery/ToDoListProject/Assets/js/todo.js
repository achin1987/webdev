//check off the spcific todo by Clicking
$("li").click(function() {
    $(this).toggleClass("completed");
});

//click on X to delete todo
$("span").click(function(event) {
    $(this).parent().fadeOut(500, function() {
        $(this).remove();
    });
    event.stopPropagation();
});

$("input[type='text']").keypress(function(event) {
    if (event.which === 13) {
        //grabbing new todo text from input
        var todoText = $(this).val();
        $(this).val("");
        //create a new li and add to ul
        $("ul").append("<li><span>X</span> " + todoText + "</li>");
    }
});