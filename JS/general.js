$(document).ready ( function()
{
    tabs("Podcast");
    toggledLogin = false;

    loadComments();

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

function isMail(mail)
{
  var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  return regex.test(mail);
}

function alert(text, color)
{
    $('#signUpAlert').css("background-color", color);
    $('#signUpAlert').html(text);
    $('#signUpAlert').show("Blind");
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
                $('#btnLogin').text("Anmelden");
            }
        else
            {
                $('#btnAnmelden').text("Anmelden");
                $('#btnLogin').text("Login");
            }
    });

    $(window).on('resize', function()
    {
      $(".kommentarBild").css({'height':$(".kommentarBild").width()+'px'});
    });

});

function kommentar (returnValue)
{
    rowKommentar = returnValue.split('~');

    returnValue.split('~').forEach(function(element)
    {
        if (element == '"0' || element == '0"')
        {
        }
        else
        {
            $('.kommentarSektion').append(''
            + '<div class="row"> '
                + '<div class="col-2 kommentar">'
                    + '<div class="kommentarBild" style="background-image: url(../IMG/Profil/' + element.split("|")[1] +')">'
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
    /* SIGN UP */
    $("#btnLogin").click(function()
        {

        if ($('#btnLogin').text() == 'Anmelden')
            {
            if ($("#txtName").val().trim() == "" || $("#txtPW").val().trim() == "" || $("#txtPWRepeat").val().trim() == "" || $("#txtMail").val().trim() == "")
                {
                    alert("Füllen Sie bitte alle Felder aus.", "red");
                }
                else
                    {
                    if (isMail($("#txtMail").val()))
                        {
                            console.log($("#txtPWRepeat").val());
                            console.log($("#txtPW").val());
                        if ($("#txtPWRepeat").val() != $("#txtPW").val())
                            {
                               alert("Passwörter müssen übereinstimmen.", "red");
                            }
                        else
                            {
                                $.post( "../PHP/signUp.php", { nickname: $("#txtName").val(),  password: $("#txtPW").val(),  mail: $("#txtMail").val()}).done( function(returnValue)
                                {
                                    if(returnValue == 0)
                                        {
                                            alert("Benutzer ist bereits vorhanden.", "red");
                                        }
                                    else
                                        {
                                            alert("Erolgreich angemeldet.", "forestgreen");
                                            $( "#divAnmelden" ).toggle( "blind" );

                                            if( $('#btnAnmelden').text() == "Anmelden")
                                                {
                                                    $('#btnAnmelden').text("Abbrechen");
                                                    $('#btnLogin').text("Anmelden");
                                                }
                                            else
                                                {
                                                    $('#btnAnmelden').text("Anmelden");
                                                    $('#btnLogin').text("Login");
                                                }

                                        }
                                });
                            }
                        }
                        else
                        {
                                alert("Geben Sie bitte eine korrekte E-Mail an.", "red");
                        }
                    }
            }
        else if ($('#btnLogin').text() == "Login")
            {
                $.post( "../PHP/login.php", { nickname: $("#txtName").val(),  password: $("#txtPW").val(),  mail: $("#txtMail").val()}).done( function(returnValue)
                {
                    console.log(returnValue);
                    if(returnValue == 0)
                    {
                        alert("Anmeldeinformation sind falsch.", "red");
                    }
                    else
                    {
                        alert("Erolgreich angemeldet.", "forestgreen");

                        $('#loginDiv').css("display", "none");
                        $('#profilBTN').css("display", "none");
                    }
                });
            }
        });
    });

function loadComments()
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







