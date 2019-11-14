$(document).ready ( function(){
    tabs("Podcast");
    toggledLogin = false;

});

function tabs(tab)
{
    console.log("test");
    document.getElementById("tabPodcast").style.display = "none";
    document.getElementById("hTabPodcast").style.color = "rgba(0,0,0,0.3)";
    document.getElementById("tabNews").style.display = "none";
    document.getElementById("hTabNews").style.color = "rgba(0,0,0,0.3)";
    document.getElementById("tabArchiv").style.display = "none";
    document.getElementById("hTabArchiv").style.color = "rgba(0,0,0,0.3)";
    document.getElementById("tabUmfrage").style.display = "none";
    document.getElementById("hTabUmfrage").style.color = "rgba(0,0,0,0.3)";
    document.getElementById("tabKontakt").style.display = "none";
    document.getElementById("hTabKontakt").style.color = "rgba(0,0,0,0.3)";

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

$(function() {
    $( "#profilBTN" ).click(function()
    {

        $( "#loginDiv" ).toggle( "blind" );

    });
});
