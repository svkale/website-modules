window.onload=function()
{
	var navs=document.querySelectorAll("nav.nav_side_bar");
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
					this.parentElement.getElementsByClassName('nav_active')[0].classList.remove('nav_active');
					this.classList.add('nav_active');
					this.getElementsByTagName('svg')[0].setAttribute('fill','var(--main-color)');
				});
			}
		}

	}
}