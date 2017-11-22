function refresh() {
    $.ajax({
        url: "/chat",
        success: function( result ) {
            $( "#chat" ).html( "<p>" + result + "</p>" );
        }
    });
   setTimeout(()=>{
      refresh();
   },1000);
}

function sendMessage() {
    let msg=$("#msg").val();
    $.ajax({
        method: "POST",
            url: "/chat",
            data: {message: msg},

    })
        .done(function( msg ) {
            console.log("Sent");
        });
    $("#msg").val('');
}