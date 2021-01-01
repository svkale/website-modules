function loading_show()
{
	let loadings=document.querySelectorAll("[class^='loading']");
	for(let loading of loadings)
	{
		loading.style.height=loading.offsetWidth+"px";
		loading.nextElementSibling.addEventListener("load",function()
		{
			loading.remove();
		});
	}
	return;
}
loading_show();