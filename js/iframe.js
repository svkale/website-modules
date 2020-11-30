

var nav_elements=document.getElementsByTagName('main')[0].getElementsByTagName('nav')[0].getElementsByTagName('ul')[0].getElementsByTagName('li');
for(var i=0;i<nav_elements.length;i++)
{
	if(nav_elements[i].getAttribute("data-iframe-url"))
	{
		nav_elements[i].addEventListener("click",function()
		{
			this.parentNode.querySelector(".active").classList.remove("active");
			this.classList.add("active");
			history.pushState('','/'+this.getAttribute("data-iframe-url"),'/'+this.getAttribute("data-iframe-url"));
			document.getElementById('iframe_page').src=window.location+"_f.html";
			iframe_start();
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