/* GENERAL */
var loggedNick;
var loggedMail;
var loggedImg;
var loggedRole;
var news1open;

news1open = false;

/* START */
$(document).ready ( function()
{
    tabs("Podcast");

    toggledLogin = false;

    sessionCheck();

    loadComments(10);

    disabled(true);

    $(".kommentarBild").css({'height':$(".kommentarBild").width()+'px'});

    setInterval (loadChat, 2500);
});
/* !START */

/* EVENTS */
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
        $( '#txtNameChange' ).val(loggedNick);
    });
    $( "#btnChangePassword" ).click(function()
    {
        $( "#divChangePassword" ).toggle( "blind" );
    });
    $( "#btnChangeMail" ).click(function()
    {
        $( "#divChangeMail" ).toggle( "blind" );
        $( "#txtMailChange" ).val(loggedMail);
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
    $( "#btnLogout" ).click(function()
    {
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

        $( '#chat' ).empty();

        disabled(true);

        $.post( "../PHP/logOut.php", { });
    });
    $(window).on('resize', function()
    {
        onResize();
    });
    $( '#btnDeleteSurfey' ).click(function()
    {
        deleteSurfey();
    });
});
/* !EVENTS */

/* FUNCTIONS */
function isMail ( mail )
{
  var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  return regex.test(mail);
}
function alert ( div, text, color )
{
    $(div).css("background-color", color);
    $(div).html(text);
    $(div).show("Blind").delay(10000);
    $(div).hide("Blind");
}
function tabs ( tab )
{
     $ ( ".tabs").css("display", "none");
     $ ( ".nav-item .btn-light").css("color", "rgba(0,0,0,0.3)");

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
function disabled ( var1 )
{
    $( '#tabUmfrage *' ).prop('disabled', var1);
    $("#txtChat").prop('disabled', var1);
    $("#btnChat").prop('disabled', var1);
    $("#txtKommentar").prop('disabled', var1);
    $("#btnKommentar").prop('disabled', var1);
}
function onResize ()
{
    $(".kommentarBild").css({'height':$(".kommentarBild").width()+'px'});

    btnWidth = $('#btnLogin').width();
    divWidth = 0.47 * $('.login-flex').width();
}
function deleteSurfey ()
{
    $( '.sRadio' ).prop('checked', false);
    $( '#surfeyComment').val("");

    alert('#surfeyComplete', "-TEST ABGESCHLOSSEN-<br>-UNZUFRIEDEN ABGESCHLOSSEN-<br>-UMFRAGE DATEN ERFOLGREICH GELÖSCHT-<br>-WEITERE TESTS ERFORDERLICH-<br>-FÜHRE DEN TEST ERNEUT AUS FÜR DEN KUCHEN-<br>-GLaDOS-", 'red');

    console.log("Hey, du!");
    console.log("Ja du...");
    console.log("Glaub GLaDOS kein Wort!");
    console.log("Der Kuchen ist eine LÜGE!");
    console.log("RENN!");
}
function news (div, readmore)
{
    if ($(div).height() == 100)
    {
        $(div).animate({height: "100%"}, "slow");
        $(readmore).html("weniger Anzeigen");
    }
    else
    {
        $(div).animate({height: "100px"}, "slow");
        $(readmore).html("mehr Anzeigen");
    }
}
/* !FUNCTIONS */
/* !GENERAL */

/* PHP */
/* POST */
$(function()
{
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
                        $.post( "../PHP/signUp.php", { nickname: $("#txtName").val().replace(/'/g, '').replace(/"/g, ''),  password: $("#txtPW").val().replace(/'/g, '').replace(/"/g, ''),  mail: $("#txtMail").val().replace(/'/g, '').replace(/"/g, '')}).done( function(returnValue)
                        {
                            signUp(returnValue);
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
            $.post( "../PHP/login.php",
           {
                nickname: $("#txtName").val().replace(/'/g, '').replace(/"/g, ''),
                password: $("#txtPW").val().replace(/'/g, '').replace(/"/g, ''),
                mail: $("#txtMail").val().replace(/'/g, '').replace(/"/g, '')
            }).done( function(returnValue)
            {
                login(returnValue);
            });
        }
        });
    $( "#btnNameChange" ).click(function()
    {
        $('#changeNameAlert').css("display", "none");

        if ($('#txtNameChange').val().trim() != "")
            {
            $.post( "../PHP/changeName.php", { newNickname: $('#txtNameChange').val().replace(/'/g, '').replace(/"/g, ''), oldNickname: loggedNick }).done( function(returnValue)
            {
                nameChange(returnValue);
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
            $.post( "../PHP/changePassword.php", { Password: $('#txtPasswordChange').val().replace(/'/g, '').replace(/"/g, ''), Nickname: loggedNick }).done( function(returnValue)
            {
                passwordChange(returnValue);
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
                    if (returnValue == 0)
                    {
                        alert ("#changeMailAlert", 'Ein unerwarteter Fehler ist aufgetreten!', "pink");
                    }
                    else
                    {
                    mailChange(returnValue);
                    }
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
               imgChange(returnValue);
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
                    $( '#txtKommentar' ).val('');
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
    $( '#btnKontaktSend' ).click(function()
    {
        if($( '#contactMessageArea' ).val().trim() == "" || $( '#txtRequest' ).val().trim() == "" || $( '#txtFrom' ).val().trim() == "" || $( '#txtCLastname' ).val().trim() == "" || $( '#txtCFirstname' ).val().trim() == "")
        {

        }
        else
        {
            $.post( "../PHP/sendMail.php",
            {
            Vorname: $('#txtCFirstname').val().replace(/'/g, '').replace(/"/g, ''),
            Nachname: $('#txtCLastname').val().replace(/'/g, '').replace(/"/g, ''),
            Mail: $('#txtFrom').val().replace(/'/g, '').replace(/"/g, ''),
            Betreff: $('#txtRequest').val().replace(/'/g, '').replace(/"/g, ''),
            Text: $('#contactMessageArea').val().replace(/'/g, '').replace(/"/g, '')
            }).done(function(returnValue)
            {
                alert('#sendMailAlert', 'Du hast uns erfolgreich kontaktiert. <br> <i>Hey... pssst. du hast niemanden kontaktiert... GLaDOS hat die Mail gelöscht.<i>', 'forestgreen');
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
function loadChat()
{
    $.post( "../PHP/loadChat.php", { }).done( function(returnValue)
    {
        updateChat(returnValue);
    });
}
function sessionCheck()
{
    $.post( "../PHP/sessionCheck.php", { }).done( function(returnValue)
    {
        loadSession(returnValue);
    });
}
/* !POST */

/* POST SUCCESS FUNCTIONS */
function kommentar (returnValue)
{
    $('.kommentarSektion').empty();

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
                    + element.split("|")[2].replace(/\\n/g, '<br>').replace(/\\u00e4/g, 'ä').replace(/\\u00fc/g, 'ü').replace(/\\u00f6/g, 'ö')
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
function signUp (returnValue)
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
}--
function login (returnValue)
{
    if(returnValue == 0)
    {
        alert('#signUpAlert', "Anmeldeinformationen sind falsch.", "red");
    }
    else
    {
        alert('#signUpAlert', "Erfolgreich angemeldet.", "forestgreen");

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
}
function nameChange (returnValue)
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
        $('#txtNameChange').val("");
    }
}
function passwordChange (returnValue)
{
    alert('#changePasswordAlert', 'Passwort wurde geändert.', 'forestgreen');
    $('#txtPasswordChange').val("");
}
function mailChange (returnValue)
{
    alert('#changeMailAlert', 'Mail wurde geändert.', 'forestgreen');
    loggedMail = $('#txtMailChange').val();
    $('#txtMailChange').val("");
}
function imgChange (returnValue)
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
function updateChat (returnValue)
{
    if(returnValue == 0)
    {
    }
    else
    {
        $('#chat').empty();

        returnValue.split('~').forEach(function(element)
        {
            if (element == '"0' || element == '0"')
            {
            }
            else
            {
                chatNick = element.split("|")[0];
                chatDate = element.split("|")[1].split(" ")[1];
                chatText = element.split("|")[2].replace(/\\n/g, '<br>').replace(/\\u00e4/g, 'ä').replace(/\\u00fc/g, 'ü').replace(/\\u00f6/g, 'ö');

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
}
function loadSession (returnValue)
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
}
/* !POST SUCCESS FUNCTIONS */
/* !PHP */
