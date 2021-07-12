function load_buttons()
{
	var button_controls=document.querySelectorAll(".button_visibility_control");
	for(let i=0;i<button_controls.length;i++)
	{
		let button_target;
		if(button_controls[i].getAttribute("data-button-get-from")=="attribute")
		{
			button_target=document.querySelectorAll("[data-button-target-selector=\""+button_controls[i].getAttribute("data-button-target")+"\"]")[0];
		}
		else
		{
			button_target=document.getElementById(button_controls[i].getAttribute("data-button-target"));
		}
		if(button_target)
		{
			button_target.style.overflow="hidden";
			button_target.style.transition="height 2s";
			if(button_controls[i].getAttribute("data-button-status")=="hidden")
			{
				button_target.style.height="0px";
			}
			button_controls[i].addEventListener("click", function()
			{
				if(this.getAttribute("data-button-status")=="visible")
				{
					this.setAttribute("data-button-status","hidden");
					if(button_controls[i].getAttribute("data-button-get-from")=="attribute")
					{
						document.querySelectorAll("[data-button-target-selector=\""+this.getAttribute("data-button-target")+"\"]")[0].style.height="0px";
					}
					else
					{
						document.getElementById(this.getAttribute("data-button-target")).style.height="0px";
					}					
				}
				else if(this.getAttribute("data-button-status")=="hidden")
				{
					this.setAttribute("data-button-status","visible");
					if(button_controls[i].getAttribute("data-button-get-from")=="attribute")
					{
						document.querySelectorAll("[data-button-target-selector=\""+this.getAttribute("data-button-target")+"\"]")[0].style.height=document.querySelectorAll("[data-button-target-selector=\""+this.getAttribute("data-button-target")+"\"]")[0].scrollHeight+"px";
					}
					else
					{
						document.getElementById(this.getAttribute("data-button-target")).style.height=document.getElementById(this.getAttribute("data-button-target")).scrollHeight+"px";
					}					

				}
			});
			if(button_controls[i].getAttribute("data-hide-on-click"))
			{
				setTimeout(function(){
					let inner_buttons=document.getElementById(button_controls[i].getAttribute("data-button-target")).querySelectorAll(button_controls[i].getAttribute("data-hide-on-click"));
					console.log(inner_buttons);
					for(let ele of inner_buttons) ele.onclick=function(){button_controls[i].click();}
				},2000);
			}
		}
	}
	window.addEventListener("resize",function()
	{
		var button_controls=document.querySelectorAll(".button_visibility_control");
		for(let i=0;i<button_controls.length;i++)
		{
			let button_target;
			if(button_controls[i].getAttribute("data-button-get-from")=="attribute")
			{
				button_target=document.querySelectorAll("[data-button-target-selector=\""+button_controls[i].getAttribute("data-button-target")+"\"]")[0];
			}
			else
			{
				button_target=document.getElementById(button_controls[i].getAttribute("data-button-target"));
			}
			if(window.getComputedStyle(button_controls[i]).display=="none" || button_controls[i].getAttribute("data-button-status")=="visible")
			{
				button_target.style.height="revert";
			}
			else
			{
				button_target.style.height="0";
			}
		}
	});
}
load_buttons();