let xmlhttp=new XMLHttpRequest();
xmlhttp.onreadystatechange=function()
{
	if(this.status==404)
	{
		document.querySelector("header img:nth-child(1)").src='./images/logo.jpg';
	}
	else
	{
		document.querySelector("header img:nth-child(1)").src='./images/'+location.pathname.split("/")[1]+'.jpg';
	}
};
xmlhttp.open('HEAD','./images/'+location.pathname.split("/")[1]+'.jpg',true); 
xmlhttp.send();