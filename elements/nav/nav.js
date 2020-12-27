window.addEventListener("load",function()
{
	var navs=document.querySelectorAll("nav.nav_side_bar,nav.nav_over,nav.nav_bar");
	for(let i=0;i<navs.length;i++)
	{
		if(navs[i].getElementsByTagName('ul')[0].getAttribute("data-svg-file"))
		{
			navs[i].getElementsByTagName('ul')[0].getElementsByClassName('nav_active')[0].getElementsByTagName('svg')[0].setAttribute('fill','var(--main-color)');
			var nav_elements=navs[i].getElementsByTagName('ul')[0].getElementsByTagName('li');
			for(let j=0;j<nav_elements.length;j++)
			{
				nav_elements[j].addEventListener("click",function()
				{
					this.parentElement.getElementsByClassName('nav_active')[0].getElementsByTagName('svg')[0].setAttribute('fill','var(--main-color-2)');
					this.getElementsByTagName('svg')[0].setAttribute('fill','var(--main-color)');
				});
				if(nav_elements[j].getElementsByTagName('svg')[0])
				{
					nav_elements[j].addEventListener("mouseover",function()
					{
						if(!this.classList.contains("nav_active"))
						{
							this.getElementsByTagName('svg')[0].setAttribute('fill','var(--main-color-3)');
						}
					});
					nav_elements[j].addEventListener("mouseout",function()
					{
						if(!this.classList.contains("nav_active"))
						{
							this.getElementsByTagName('svg')[0].setAttribute('fill','var(--main-color-2)');
						}
					});
				}
			}
		}
	}
	var navs_one_active=document.querySelectorAll("nav.nav_one_active,nav.nav_svg_active");
	for(let i=0;i<navs_one_active.length;i++)
	{
		var nav_elements_one_active=navs_one_active[i].getElementsByTagName('ul')[0].getElementsByTagName('li');
		for(let j=0;j<nav_elements_one_active.length;j++)
		{
			nav_elements_one_active[j].addEventListener("click",function()
			{
				if(this.parentElement.getElementsByClassName('nav_active')[0])
				{
					this.parentElement.getElementsByClassName('nav_active')[0].classList.remove('nav_active');
				}
				this.classList.add('nav_active');
			});
		}
	}
	window.addEventListener("resize",function()
	{
		for(let i=0;i<navs.length;i++)
		{
			if(navs[i].getElementsByTagName('ul')[0].getAttribute("data-svg-file"))
			{
				navs[i].getElementsByTagName('ul')[0].getElementsByClassName('nav_active')[0].getElementsByTagName('svg')[0].setAttribute('fill','var(--main-color)');
			}
		}
	});
});