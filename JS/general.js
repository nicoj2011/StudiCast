$(document).ready ( function()
{
    tabs("Podcast");
    toggledLogin = false;

    dbKommentare();

    $(".kommentarBild").css({'height':$(".kommentarBild").width()+'px'});

    $("#txtChat").prop('disabled', true);
    $("#btnChat").prop('disabled', true);
    $("#txtKommentar").prop('disabled', true);
    $("#btnKommentar").prop('disabled', true);

});

function tabs(tab)
{
     $ ( ".tabs").css("display", "none");
     $ ( ".btn-light").css("color", "rgba(0,0,0,0.3)");

    if(tab == "Podcast")
        {
            document.getElementById("tabPodcast").style.display = "inherit";
            document.getElementById("hTabPodcast").style.color = "rgba(0,0,0,1)";
        }
    else if(tab == "News")
        {
            document.getElementById("tabNews").style.display = "inherit";
            document.getElementById("hTabNews").style.color = "rgba(0,0,0,1)";
        }
     else if(tab == "Archiv")
        {
            document.getElementById("tabArchiv").style.display = "inherit";
            document.getElementById("hTabArchiv").style.color = "rgba(0,0,0,1)";
        }
     else if(tab == "Umfrage")
        {
            document.getElementById("tabUmfrage").style.display = "inherit";
            document.getElementById("hTabUmfrage").style.color = "rgba(0,0,0,1)";
        }
     else if(tab == "Kontakt")
        {
            document.getElementById("tabKontakt").style.display = "inherit";
            document.getElementById("hTabKontakt").style.color = "rgba(0,0,0,1)";
        }
}

$(function()
  {
    $( "#profilBTN" ).click(function()
    {

        $( "#loginDiv" ).toggle( "blind" );

    });

    $( "#btnAnmelden" ).click(function()
    {

        $( "#divAnmelden" ).toggle( "blind" );

        if( $('#btnAnmelden').text() == "Anmelden")
            {
                $('#btnAnmelden').text("Abbrechen");
            }
        else
            {
               $('#btnAnmelden').text("Anmelden");
            }
    });


    $( "#btnLogin" ).click(function()
    {
        nickname = document.getElementById("txtName").value;
        password = document.getElementById("txtPW").value;

    });

    $(window).on('resize', function()
    {
      $(".kommentarBild").css({'height':$(".kommentarBild").width()+'px'});
    });

});

function kommentar (returnValue)
{
    let rowKommentar = returnValue.split('~');

    console.log(returnValue);

    returnValue.split('~').forEach(function(element)
    {
        console.log(element.split("|")[0]);
        if (element == '"0' || element == '0"')
        {
        }
        else
        {
            $('.kommentarSektion').append(''
            + '<div class="row"> '
                + '<div class="col-2 kommentar">'
                    + '<div class="kommentarBild" style="background-image: url(../IMG/' + element.split("|")[1] +')">'
                    + ''
                    + '</div>'
                    + '<div class="kommentarName">'
                        + element.split("|")[0]
                    + '</div>'
                + '</div>'
                + '<div class="col">'
                    + element.split("|")[2]
                + '</div>'
                + '<div class="col-2">'
                    + '<div class="kommentarDatum">'
                        + element.split("|")[3].split(" ")[0]
                    + '</div>'
                    + '<div class="kommentarUhrzeit">'
                        + element.split("|")[3].split(" ")[1]
                    + '</div>'
                + '</div>'
                + '</div>'
            + '<br>');
        }
    });
}

/* PHP Aufrufe */
$(function()
{
    $("#btnTest").click(function()
    {
        $.ajax(
            {
            type: 'POST',
            url: './PHP/kommentar.php',
            //data: 'name=' + "test",
            success: function (returnValue)
                {
                    kommentar(returnValue);
                }
        });
    });
});

function dbKommentare()
{
    $.ajax(
    {
    type: 'POST',
    url: './PHP/kommentar.php',
    //data: 'name=' + "test",
    success: function (returnValue)
        {
            kommentar(returnValue);
        }
    });
}







