function putins_load()
{	
	var putins;
	if(arguments[1])
	{
		putins=document.querySelectorAll("."+arguments[0]+" .putins");
	}
	else if(arguments[0])
	{
		putins=document.querySelectorAll("#"+arguments[0]+" .putins");
	}
	else
	{
		putins=document.querySelectorAll(".putins");
	}
	for(let i=0;i<putins.length;i++)
	{
		if(putins[i].getAttribute("data-target-url") && putins[i].getAttribute("data-target-url")!="")
		{
			if(putins[i].getAttribute("data-parameter-custom"))
			{
				request(putins[i].getAttribute("data-target-url"),"putin_paste",putins[i],putins[i].getAttribute("data-function-name"),putins[i].getAttribute("data-parameter-custom"));
			}
			else
			{
				request(putins[i].getAttribute("data-target-url"),"putin_paste",putins[i],putins[i].getAttribute("data-function-name"));
			}
		}
		putins[i].classList.remove("putins");
	}
	return;
}
putins_load();

function putin_paste(response_obj,params)
{
	if(params[2])
	{
		params[0].innerHTML=window[params[1]](response_obj,[params[2]]);
	}
	else
	{
		params[0].innerHTML=window[params[1]](response_obj);
	}	
	if(params[0].getAttribute("data-proceed-script-custom"))
	{
		eval(params[0].getAttribute("data-proceed-script-custom"));
	}
	return;
}
function putins_select_load()
{
	var putins_select;
	if(arguments[0])
	{
		putins_select=document.querySelectorAll("#"+arguments[0]+" .putins_select");
	}
	else
	{
		putins_select=document.querySelectorAll(".putins_select");
	}
	for(let i=0;i<putins_select.length;i++)
	{
		let putins_select_function_to_proceed=putins_select[i].getAttribute("data-function-name"),putins_select_target_element_id=putins_select[i].getAttribute("data-target-ele-id"),putin_select_elements=putins_select[i].querySelectorAll("[data-target-url]");
		for(let j=0;j<putin_select_elements.length;j++)
		{
			if(putin_select_elements[j].classList.contains("putins_select_active_page"))
			{
				request_promise(putin_select_elements[j].getAttribute("data-target-url"))
					.then((html)=>
					{
						putin_select_paste(html,[document.getElementById(putins_select_target_element_id),putin_select_elements[j],putins_select_function_to_proceed]);
						putins_select_load(putins_select_target_element_id);
					});
				putin_select_elements[j].classList.remove("putin_select_active_page");
			}
			putin_select_elements[j].addEventListener("click",function()
			{
				request_promise(this.getAttribute("data-target-url"))
					.then((html)=>
					{
						putin_select_paste(html,[document.getElementById(putins_select_target_element_id),this,putins_select_function_to_proceed]);
						putins_select_load(putins_select_target_element_id);
					});
			});
		}
	}
	return;
}
putins_select_load();
function putin_select_paste(response_obj,params)
{
	if(params[1].getAttribute("data-function-name-custom"))
	{
		if(params[1].getAttribute("data-parameters-custom"))
		{
			params[0].innerHTML=window[params[1].getAttribute("data-function-name-custom")](response_obj,[params[1].getAttribute("data-parameters-custom")]);
		}
		else
		{
			params[0].innerHTML=window[params[1].getAttribute("data-function-name-custom")](response_obj);

		}
	}
	else
	{
		if(params[1].getAttribute("data-parameters-custom"))
		{
			params[0].innerHTML=window[params[2]](response_obj,[params[1].getAttribute("data-parameters-custom")]);
		}
		else
		{
			params[0].innerHTML=window[params[2]](response_obj);

		}
	}
	if(params[1].getAttribute("data-proceed-script-custom"))
	{
		eval(params[1].getAttribute("data-proceed-script-custom"));
	}
	return;
}