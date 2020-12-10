var putins=document.getElementsByClassName("putins");
for(let i=0;i<putins.length;i++)
{
	let putins_function_to_proceed=putins[i].getAttribute("data-function-to-proceed"),putins_target_element_id=putins[i].getAttribute("data-target-ele-id"),putin_elements=putins[i].querySelectorAll("[data-target-url]");
	for(let j=0;j<putin_elements.length;j++)
	{
		if(putin_elements[j].classList.contains("putin_active_page"))
		{
			console.log(putin_elements[j].getAttribute("data-target-url"),putins_function_to_proceed,document.getElementById(putins_target_element_id));
			request(putin_elements[j].getAttribute("data-target-url"),putins_function_to_proceed,document.getElementById(putins_target_element_id));
		}
		putin_elements[j].addEventListener("click",function()
		{
			request(this.getAttribute("data-target-url"),putins_function_to_proceed,document.getElementById(putins_target_element_id));
			this.parentElement.querySelectorAll(".putin_active_page")[0].classList.remove("putin_active_page");
			this.classList.add("putin_active_page");
		});
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
	return;
}