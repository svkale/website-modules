request_exist('./images/'+location.pathname.split("/")[1]+'.jpg')
	.then((res,rej)=>
	{
		if(res==1)
		{
			document.querySelector("header img:nth-child(1)").src='./images/'+location.pathname.split("/")[1]+'.jpg';
		}
		else
		{
			document.querySelector("header img:nth-child(1)").src='./images/logo.jpg';
		}
	});