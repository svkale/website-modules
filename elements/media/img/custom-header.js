function request_custom_header(i)
{
	let xmlhttp=new XMLHttpRequest();
	xmlhttp.onreadystatechange=function()
	{
		if(this.readyState==4)
		{
			console.log(this);
			let c= arguments[1] ? arguments[1] : "";
			if(this.status==404)
			{
				document.querySelector("header img:nth-child(1)").src='/images/logo.jpg';
			}
			else
			{
				document.querySelector("header img:nth-child(1)").src='/images/'+c+location.pathname.split("/")[i]+'.jpg';
			}
		}
	};
	xmlhttp.open('HEAD','/images/'+location.pathname.split("/")[1]+'.jpg',true); 
	xmlhttp.send();
}
if(location.pathname.split("/")[1]!="notice")
{
	request_custom_header(1);
}
else
{
	request_custom_header(2,"notice/");
}


// (i,arguments[1])