var button_controls=document.querySelectorAll("button.button_visibility_control");
for(let i=0;i<button_controls.length;i++)
{
	document.getElementById(button_controls[i].getAttribute("data-button-target")).style.overflow="hidden";
	document.getElementById(button_controls[i].getAttribute("data-button-target")).style.transition="height 2s";
	if(button_controls[i].getAttribute("data-button-status")=="hidden")
	{
		document.getElementById(button_controls[i].getAttribute("data-button-target")).style.height="0px";
	}
	button_controls[i].addEventListener("click", function()
	{
		if(this.getAttribute("data-button-status")=="visible")
		{
			this.setAttribute("data-button-status","hidden");
			document.getElementById(this.getAttribute("data-button-target")).style.height="0px";
		}
		else if(this.getAttribute("data-button-status")=="hidden")
		{
			this.setAttribute("data-button-status","visible");
			document.getElementById(this.getAttribute("data-button-target")).style.height=document.getElementById(this.getAttribute("data-button-target")).scrollHeight+"px";

		}
	});
}
window.addEventListener("resize",function()
{
	var button_controls=document.querySelectorAll("button.button_visibility_control");
	for(let i=0;i<button_controls.length;i++)
	{
		if(window.getComputedStyle(button_controls[i]).display=="none")
		{
			document.getElementById(button_controls[i].getAttribute("data-button-target")).style.height=document.getElementById(button_controls[i].getAttribute("data-button-target")).scrollHeight+"px";
		}
	}
});