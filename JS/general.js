var loggedNickn;
var loggedMail;
var loggedImg;
var loggedRole;


$(document).ready ( function()
{
    tabs("Podcast");
    toggledLogin = false;

    sessionCheck();

    loadComments(10);

    disabled(true);

    $(".kommentarBild").css({'height':$(".kommentarBild").width()+'px'});

    setInterval (loadChat, 2500);


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

function disabled(var1)
{
    $("#txtChat").prop('disabled', var1);
    $("#btnChat").prop('disabled', var1);
    $("#txtKommentar").prop('disabled', var1);
    $("#btnKommentar").prop('disabled', var1);
}

function isMail(mail)
{
  var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  return regex.test(mail);
}

function alert(div, text, color)
{
    $(div).css("background-color", color);
    $(div).html(text);
    $(div).show("Blind");
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

    $( "#btnChangeName" ).click(function()
    {
        $( "#divChangeName" ).toggle( "blind" );
    });

    $( "#btnChangePassword" ).click(function()
    {
        $( "#divChangePassword" ).toggle( "blind" );
    });

    $( "#btnChangeMail" ).click(function()
    {
        $( "#divChangeMail" ).toggle( "blind" );
    });

     $( "#btnChangeImg" ).click(function()
    {
        $( "#divChangeImg" ).toggle( "blind" );
    });

    $( "#profilBild" ).click(function()
    {
        if (loggedNick != "")
            {
                $( "#account" ).toggle( "blind" );
            }
    });

    $(window).on('resize', function()
    {
      $(".kommentarBild").css({'height':$(".kommentarBild").width()+'px'});
    });

    $( "#btnLogout" ).click(function()
    {
        //$('#loginDiv').css("display", "none");
        $('#profilBTN').css("display", "inherit");


        $('#profilBild').css({
        'display': 'none'
        });

        $('#account').css("display", "none");
        $('.MyAlerts').css("display", "none");

        loggedNick = "";
        loggedMail = "";
        loggedImg = "";
        loggedRole = "";

        disabled(true);

        $.post( "../PHP/sendComment.php", { });
    });
});

function kommentar (returnValue)
{
    $('.kommentarSektion').empty();

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
                    alert('#signUpAlert', "Füllen Sie bitte alle Felder aus.", "red");
                }
                else
                    {
                    if (isMail($("#txtMail").val()))
                        {
                        if ($("#txtPWRepeat").val() != $("#txtPW").val())
                            {
                               alert('#signUpAlert', "Passwörter müssen übereinstimmen.", "red");
                            }
                        else
                            {
                                $.post( "../PHP/signUp.php", { nickname: $("#txtName").val(),  password: $("#txtPW").val(),  mail: $("#txtMail").val()}).done( function(returnValue)
                                {
                                    if(returnValue == 0)
                                        {
                                            alert('#signUpAlert', "Benutzer ist bereits vorhanden.", "red");
                                        }
                                    else
                                        {
                                            alert('#signUpAlert', "Erolgreich angemeldet.", "forestgreen");
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
                                alert('#signUpAlert', "Geben Sie bitte eine korrekte E-Mail an.", "red");
                        }
                    }
            }
        else if ($('#btnLogin').text() == "Login")
            {
                $.post( "../PHP/login.php", { nickname: $("#txtName").val(),  password: $("#txtPW").val(),  mail: $("#txtMail").val()}).done( function(returnValue)
                {
                    if(returnValue == 0)
                    {
                        alert('#signUpAlert', "Anmeldeinformation sind falsch.", "red");
                    }
                    else
                    {
                        alert('#signUpAlert', "Erolgreich angemeldet.", "forestgreen");

                        $('#loginDiv').css("display", "none");
                        $('#profilBTN').css("display", "none");

                        loggedNick = returnValue.split("|")[1];
                        loggedMail = returnValue.split("|")[2];
                        loggedImg = returnValue.split("|")[3];
                        loggedRole = returnValue.split("|")[4];

                        $('#profilBild').css({
                        'border-radius': '5%',
                        'background-color': 'black',
                        'background-image': 'url(../IMG/Profil/' + loggedImg + ')',
                        'background-size': '100% auto',
                        'background-repeat': 'no-repeat',
                        'background-position': 'center',
                        'padding-top': '89%',
                        'width': '100%'
                        });

                        $('#profilBild').show("Blind");

                        $('#loggedNick').html(loggedNick);

                        loadChat();

                        disabled(false);
                    }
                });
            }
        });

    $( "#btnNameChange" ).click(function()
    {
        $('#changeNameAlert').css("display", "none");

        if ($('#txtNameChange').val().trim() != "")
            {
            $.post( "../PHP/changeName.php", { newNickname: $('#txtNameChange').val(), oldNickname: loggedNick }).done( function(returnValue)
            {

                if (returnValue == 0)
                {
                    alert('#changeNameAlert', 'Der Name ist bereits vergeben.', 'red');
                }
                else
                {
                    loggedNick = $('#txtNameChange').val();
                    alert('#changeNameAlert', 'Name wurde zu "' + loggedNick + '" geändert.', 'forestgreen');
                    $('#loggedNick').html(loggedNick);
                }
            });
            }
        else
            {
                alert("#changeNameAlert", "Das Feld muss ausgefüllt sein.", "red");
            }
    });

    $( "#btnPasswordChange" ).click(function()
    {
        $('#changePasswordAlert').css("display", "none");

        if ($('#txtPasswordChange').val().trim() != "")
            {
            $.post( "../PHP/changePassword.php", { Password: $('#txtPasswordChange').val(), Nickname: loggedNick }).done( function(returnValue)
            {
                alert('#changePasswordAlert', 'Passwort wurde geändert.', 'forestgreen');
                $('#txtPasswordChange').val("");
            });
            }
        else
            {
                alert("#changePasswordAlert", "Das Feld muss ausgefüllt sein.", "red");
            }
    });

    $( "#btnMailChange" ).click(function()
    {
        $('#changeMailAlert').css("display", "none");

        if ($('#txtMailChange').val().trim() != "")
            {
                if (isMail($('#txtMailChange').val()))
                {
                         $.post( "../PHP/changeMail.php", { Mail: $('#txtMailChange').val(), Nickname: loggedNick }).done( function(returnValue)
                    {
                        alert('#changeMailAlert', 'Mail wurde geändert.', 'forestgreen');
                        $('#txtPasswordChange').val("");
                    });
                }
                else
                {
                    alert("#changeMailAlert", "Es muss eine korrekte E-Mail angegeben werden.", "red");
                }

            }
        else
            {
                alert("#changeMailAlert", "Das Feld muss ausgefüllt sein.", "red");
            }
        });

    $( "#btnImgChange" ).click(function()
    {
        var fd = new FormData();
        var files = $('#fileChangeImg')[0].files[0];
        fd.append('file',files);
        fd.append('Nickname', loggedNick);

        $.ajax({
            url: '../PHP/uploadIMG.php',
            type: 'post',
            data: fd,
            contentType: false,
            processData: false,
            success: function(returnValue)
            {
                if (returnValue != 0)
                {
                    alert('#changeImgAlert', 'Profilbild wurde geändert', 'forestgreen');

                    returnValue = returnValue.replace('"', '');
                    loggedImg = returnValue.replace('"', '');

                    $('#profilBild').css({
                        'border-radius': '5%',
                        'background-color': 'black',
                        'background-image': 'url(../IMG/Profil/' + loggedImg + ')',
                        'background-size': '100% auto',
                        'background-repeat': 'no-repeat',
                        'background-position': 'center',
                        'padding-top': '89%',
                        'width': '100%'
                        });

                    loadComments(10);
                }
                else
                {
                    alert('#changeImgAlert', 'Es ist ein unerwarteter Fehler aufgetreten.', 'red');
                }
            }
        });
    });

    $( "#btnKommentar" ).click(function()
    {
        if ($('#txtKommentar').val().trim() != "")
        {
            $.post( "../PHP/sendComment.php", { Nickname: loggedNick, Comment: $('#txtKommentar').val().replace(/'/g, '').replace(/"/g, '') }).done( function(returnValue)
            {
                if (returnValue == 0)
                {
                }
                else
                {
                    loadComments(10);
                }

            });
        }
    });

    $( "#btnChat" ).click(function()
    {
        if ($('#txtChat').val().trim() != "")
        {
            $.post( "../PHP/sendChat.php", { Nickname: loggedNick, Text: $('#txtChat').val().replace(/'/g, '').replace(/"/g, '') }).done( function(returnValue)
            {
                if (returnValue == 0)
                {
                }
                else
                {
                    $('#txtChat').val("");
                    loadChat();
                }

            });
        }
    });
});

function loadComments(count)
{
    $.ajax(
    {
    type: 'POST',
    url: './PHP/kommentar.php',
    data: 'count=' + count,
    success: function (returnValue)
        {
            kommentar(returnValue);
        }
    });
}

function sessionCheck()
{
    $.post( "../PHP/sessionCheck.php", { }).done( function(returnValue)
    {

        if (returnValue == 0)
        {
            $.post( "../PHP/logOut.php", { });
        }
        else
        {
            $('#loginDiv').css("display", "none");
            $('#profilBTN').css("display", "none");

            loggedNick = returnValue.split("|")[1];
            loggedMail = returnValue.split("|")[2];
            loggedImg = returnValue.split("|")[3];
            loggedRole = returnValue.split("|")[4];

            $('#profilBild').css({
            'border-radius': '5%',
            'background-color': 'black',
            'background-image': 'url(../IMG/Profil/' + loggedImg + ')',
            'background-size': '100% auto',
            'background-repeat': 'no-repeat',
            'background-position': 'center',
            'padding-top': '89%',
            'width': '100%'
            });

            $('#profilBild').show("Blind");

            $('#loggedNick').html(loggedNick);

            disabled(false);
        }

    });
}

function loadChat()
{
    $.post( "../PHP/loadChat.php", { }).done( function(returnValue)
    {
        if(returnValue == 0)
        {

        }
        else
        {
            $('#chat').empty();

            rowKommentar = returnValue.split('~');

            returnValue.split('~').forEach(function(element)
            {
                if (element == '"0' || element == '0"')
                {
                }
                else
                {
                    chatNick = element.split("|")[0];
                    chatDate = element.split("|")[1].split(" ")[1];
                    chatText = element.split("|")[2];

                    if (chatNick == loggedNick)
                    {
                        user = 'own';
                    }
                    else
                    {
                        user = 'other';
                    }

                $('#chat').append(''
                + '<div class="row ' + user + '-nick">'
                + chatNick + ':' // + '<br> (' + chatDate + ')'
                + '</div>'
                + '<div class="row ' + user + '-text">'
                + chatText
                + '</div>');
                }
            });

            $("#chat").animate({ scrollTop: $('#chat').prop("scrollHeight")}, 1000);
        }
    });
}

});
