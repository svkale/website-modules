var svgs_required=document.querySelectorAll("[data-svg-file]");
for(let i=0;i<svgs_required.length;i++)
{
	request("../svg/containers/"+svgs_required[i].getAttribute("data-svg-file")+".html","svg_request",svgs_required[i]);
}

function svg_request(response_obj,params)
{
	request_get_styles_and_scripts(response_obj).then(svg_show(params[0]));
}
function svg_show(svg_target)
{
	if(svg_target.getAttribute("data-svg-struct")=="multiple")
	{
		svg_mass_put("svg_"+svg_target.getAttribute("data-svg-file").replace(/-/g,'_'),svg_target.getAttribute("data-svg-file"));
	}
}

var svg_mass=document.querySelectorAll("[data-svg-struct='multiple']");
// svg_mass
function svg_mass_put(svg_function,svg_file_name)
{
	var svg_targets=document.querySelectorAll("[data-svg-file='"+svg_file_name+"']");
	for(let i=0;i<svg_targets.length;i++)
	{
		var svg_params={'content-height': 0, 'content-wbyh': 0, 'border-wbyh': svg_targets[i].getAttribute("data-svg-border-wbyh"), 'fill-color': svg_targets[i].getAttribute("data-svg-fill-color"), 'border-color': svg_targets[i].getAttribute("data-svg-border-color")};
		for(let j=0;j<svg_targets[i].children.length;j++)
		{
			let svg_target=svg_targets[i].children[j];
			svg_params['content-height']=parseFloat(svg_target.children[0].scrollHeight);
			svg_params['content-wbyh']=((parseFloat(svg_target.children[0].scrollWidth))/(parseFloat(svg_target.children[0].scrollHeight)));
			let svg_HTML=window[svg_function](svg_params);
			svg_target.insertAdjacentHTML("afterbegin",svg_HTML);
			svg_target.style.position="relative";
			svg_target.style.width=svg_target.getElementsByTagName("svg")[0].scrollWidth+"px";
			svg_target.style.height=svg_target.getElementsByTagName("svg")[0].scrollHeight+"px";
		}
		var svg_absolutes=document.querySelectorAll("[data-svg-file='"+svg_file_name+"']>*>*");
		for(let j=0;j<svg_absolutes.length;j++)
		{
			svg_absolutes[j].style.position="absolute";
		}
	}
	return;
}