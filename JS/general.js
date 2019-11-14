
/* tabs("Podcast"); */



function tabs(tab)
{
    console.log("test");
    document.getElementById("tabPodcast").style.display = "none";
    document.getElementById("tabNews").style.display = "none";
    document.getElementById("tabArchiv").style.display = "none";
    document.getElementById("tabUmfrage").style.display = "none";
    document.getElementById("tabKontakt").style.display = "none";

    if(tab == "Podcast")
        {
            document.getElementById("tabPodcast").style.display = "inherit";
        }
    else if(tab == "News")
        {
            document.getElementById("tabNews").style.display = "inherit";
        }
     else if(tab == "Archiv")
        {
            document.getElementById("tabArchiv").style.display = "inherit";
        }
     else if(tab == "Umfrage")
        {
            document.getElementById("tabUmfrage").style.display = "inherit";
        }
     else if(tab == "Kontakt")
        {
            document.getElementById("tabKontakt").style.display = "inherit";
        }
}
