var navs=document.getElementsByClassName("nav_putins");
for(var i=0;i<navs.length;i++)
{
	var navs_function_to_proceed=navs[i].getAttribute("data-function-to-proceed"),navs_target_element_id=navs[i].getAttribute("data-target-ele-id"),nav_elements=navs[i].getElementsByTagName('li');
	for(var j=0;j<nav_elements.length;j++)
	{
		if(nav_elements[j].classList.contains("nav_active_page"))
		{
			request(nav_elements[j].getAttribute("data-gdoc-target-url"),navs_function_to_proceed,document.getElementById(navs_target_element_id),nav_elements[j]);
		}
		nav_elements[j].addEventListener("click",
			function()
			{
				request(this.getAttribute("data-gdoc-target-url"),navs_function_to_proceed,document.getElementById(navs_target_element_id),this);
			});
	}
}

function nav_gdoc_published_paste(response_obj,params)
{
	params[0].innerHTML="";
	params[0].insertAdjacentHTML("beforeend",request_gdoc_published_inline_contents(response_obj));
	params[1].parentElement.querySelectorAll(".nav_active_page")[0].classList.remove("nav_active_page");
	params[1].classList.add("nav_active_page");
	return;
}