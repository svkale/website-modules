if(document.getElementsByClassName('images_bkgnd')[0])
{
	var bgimages=document.getElementsByClassName('images_bkgnd');
	for(var i=0;i<bgimages.length;i++)
	{
		bgimages[i].parentElement.style.position="relative";
	}
}