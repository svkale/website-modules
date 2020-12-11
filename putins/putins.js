var putins=document.getElementsByClassName("putins");
for(let i=0;i<putins.length;i++)
{
	let putins_function_to_proceed=putins[i].getAttribute("data-function-name"),putins_target_element_id=putins[i].getAttribute("data-target-ele-id"),putin_elements=putins[i].querySelectorAll("[data-target-url]");
	for(let j=0;j<putin_elements.length;j++)
	{
		if(putin_elements[j].classList.contains("putin_active_page"))
		{
			request(putin_elements[j].getAttribute("data-target-url"),"putin_paste",document.getElementById(putins_target_element_id),putin_elements[j],putins_function_to_proceed);
			putin_elements[j].classList.remove("putin_active_page");
		}
		putin_elements[j].addEventListener("click",function()
		{
			request(this.getAttribute("data-target-url"),"putin_paste",document.getElementById(putins_target_element_id),this,putins_function_to_proceed);
		});
	}
}

function putin_paste(response_obj,params)
{
	if(params[1].getAttribute("data-function-name-custom"))
	{
		window[params[1].getAttribute("data-function-name-custom")](response_obj,params);
	}
	else
	{
		window[params[2]](response_obj,params);
	}
}
function putin_response_paste(response_obj,params)
{
	params[0].innerHTML=response_obj.responseText;
	return;
}
function putin_gdoc_published_paste(response_obj,params)
{
	params[0].innerHTML=request_gdoc_published_inline_contents(response_obj);
	params[0].getElementsByTagName('div')[0].style.maxWidth="none";
	return;
}