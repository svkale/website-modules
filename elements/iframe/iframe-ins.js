var iframeins=document.querySelectorAll("iframe.iframeins");
for(let i=0;i<iframeins.length;i++)
{
	let iframeins_target_element_id=iframeins[i].getAttribute("data-target-ele-id"),iframein_elements=iframeins[i].children;
	for(let j=0;j<iframein_elements.length;j++)
	{
		if(iframein_elements[j].classList.contains("iframein_active_page"))
		{
			document.getElementById(iframeins_target_element_id).innerHTML="";
			let iframe_obj=iframe_get(iframein_elements[j]);
			document.getElementById(iframeins_target_element_id).appendChild(iframe_obj);
			iframe_obj.addEventListener("load",function()
			{
				iframe_set_height(this);
			});
		}
		iframein_elements[j].addEventListener("click",function()
		{
			document.getElementById(iframeins_target_element_id).innerHTML="";
			let iframe_obj=iframe_get(this);
			document.getElementById(iframeins_target_element_id).appendChild(iframe_obj);
			iframe_obj.addEventListener("load",function()
			{
				iframe_set_height(this);
			});
			this.parentElement.getElementsByClassName("iframein_active_page")[0].classList.remove("iframein_active_page");
			this.classList.add("iframein_active_page");
		});
	}
	document.getElementById(iframeins_target_element_id).getElementsByTagName("iframe")[0].contentWindow.addEventListener("resize",function()
	{
		iframe_set_height(this.frameElement);
	});
}

function iframe_get(iframe_trigger)
{
	let iframe_to_show=document.createElement("iframe");
	iframe_to_show.src=iframe_trigger.getAttribute("data-iframe-url");
	iframe_to_show.setAttribute("scrolling","no");
	iframe_to_show.classList.add("cont");
	return iframe_to_show;
}
function iframe_set(iframe_obj)
{
	iframe_set_height(iframe_obj);
	iframe_obj.contentWindow.addEventListener("load",function()
	{
		iframe_set_height(this);
	});
	return;
}
function iframe_set_height(iframe_obj)
{
	if(iframe_obj.contentDocument.documentElement)
	{
		iframe_obj.style.height=iframe_obj.contentDocument.documentElement.scrollHeight+"px";
	}
	else
	{
		iframe_obj.style.height=iframe_obj.contentDocument.getElementsByTagName("html")[0].scrollHeight+"px";
	}
	return;
}