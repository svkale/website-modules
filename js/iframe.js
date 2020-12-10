var iframeins=document.getElementsByClassName("iframeins");
for(let i=0;i<iframeins.length;i++)
{
	let iframeins_function_to_proceed=iframeins[i].getAttribute("data-function-to-proceed"),iframeins_target_element_id=iframeins[i].getAttribute("data-target-ele-id"),iframein_elements=iframeins[i].querySelectorAll("[data-iframe-url]");
	for(let j=0;j<iframein_elements.length;j++)
	{
		if(iframein_elements[j].classList.contains("iframein_active_page"))
		{
			var iframe_to_show=document.createElement("iframe");
			iframe_to_show.src=iframein_elements[j].getAttribute("data-iframe-url");
			document.getElementById(iframeins_target_element_id).innerHTML="";
			document.getElementById(iframeins_target_element_id).appendChild(iframe_to_show);
		}
		iframein_elements[j].addEventListener("click",function()
		{
			var iframe_to_show=document.createElement("iframe");
			iframe_to_show.src=this.getAttribute("data-iframe-url");
			document.getElementById(iframeins_target_element_id).innerHTML="";
			document.getElementById(iframeins_target_element_id).appendChild(iframe_to_show);
			this.parentElement.getElementsByClassName("iframein_active_page")[0].classList.remove("iframein_active_page");
			this.classList.add("iframein_active_page");
		});
	}
}

function iframe_start()
{
	var iframes_html=document.getElementById('iframe_page');
	setTimeout(iframe_load,500,iframes_html);
	setTimeout(iframe_load,1000,iframes_html);
	setTimeout(iframe_load,2000,iframes_html);
	setTimeout(iframe_load,5000,iframes_html);
}
iframe_start();
function iframe_load(iframe_obj)
{
	// iframe_obj.contentWindow.addEventListener("resize",function(){iframe_set_height(this.frameElement);});
	console.log(iframe_obj);
	if(iframe_obj.contentDocument.documentElement)
	{
		// console.log(iframe_obj);
		iframe_obj.style.height=iframe_obj.contentDocument.documentElement.getElementsByTagName("html")[0].scrollHeight+20+"px";
		iframe_obj.contentDocument.documentElement.getElementsByClassName("background_img")[0].parentNode.style.position="relative";
	}
	else
	{
		iframe_obj.style.height=iframe_obj.contentDocument.getElementsByTagName("html")[0].scrollHeight+20+"px";
		iframe_obj.contentDocument.getElementsByClassName("background_img")[0].parentNode.style.position="relative";
	}
}
function iframe_set_height(iframe_obj)
{
	if(iframe_obj.contentDocument.documentElement)
	{
		iframe_obj.style.height=iframe_obj.contentDocument.documentElement.getElementsByTagName("html")[0].scrollHeight+20+"px";
	}
	else
	{
		iframe_obj.style.height=iframe_obj.contentDocument.getElementsByTagName("html")[0].scrollHeight+20+"px";
	}
}