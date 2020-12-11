var svgs_required=document.querySelectorAll("[data-svg-file]");
for(let i=0;i<svgs_required.length;i++)
{
	if(!document.getElementById(svgs_required[i].getAttribute("data-svg-file").replace(/-/g,"_")))
	{
		let svg_script=document.createElement("script");
		svg_script.id=svgs_required[i].getAttribute("data-svg-file").replace(/-/g,"_");
		svg_script.type="text/javascript";
		svg_script.src="http://192.168.1.3:81/svg/containers/"+svgs_required[i].getAttribute("data-svg-file")+".js";
		document.getElementsByTagName('html')[0].appendChild(svg_script);
	}
}
function svg_put(svg_target,svg_function,svg_params)
{
	svg_params["content-height"]=parseFloat(svg_target.children[0].scrollHeight);
	svg_params["content-wbyh"]=parseFloat(svg_target.children[0].scrollWidth)/parseFloat(svg_target.children[0].scrollHeight);
	svg_target.style.position="relative";
	svg_target.children[0].style.position="absolute";
	svg_target.insertAdjacentHTML("afterbegin",window[svg_function](svg_params));
	console.log(svg_params);
	svg_target.getElementsByTagName('svg')[0].style.position="absolute";
	svg_target.getElementsByTagName('svg')[0].style.height=(parseFloat(svg_target.getElementsByTagName('div')[0].scrollHeight)*(1+parseFloat(svg_params["border-wbyh"])))+"px";
	svg_target.style.height=(parseFloat(svg_target.getElementsByTagName('div')[0].scrollHeight)*(1+parseFloat(svg_params["border-wbyh"])))+"px";
	return;
}

var svg_last_script=document.createElement('script');
svg_last_script.type="text/javascript";
svg_last_script.innerHTML=`
window.addEventListener("load",function()
{
	for(let i=0;i<svgs_required.length;i++)
	{
		if(svgs_required[i].getAttribute("data-svg-struct")=="multiple")
		{
			var svg_params={"content-height": 0, "content-wbyh": 0, "border-wbyh": 0.05, "fill-color": "var(--main-color-2)", "border-color": "var(--main-color-2)"};
			for(let j=0;j<svgs_required[i].children.length;j++)
			{
				svg_put(svgs_required[i].children[j],"svg_"+svgs_required[i].getAttribute("data-svg-file").replace(/-/g,"_"),svg_params);
			}
		}
		else
		{
			svg_put2(svgs_required[i]);
		}
	}
}
);`;
document.getElementsByTagName('html')[0].appendChild(svg_last_script);