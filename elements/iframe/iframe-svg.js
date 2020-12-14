var iframes_inline_svg=document.querySelectorAll("iframe.iframe_inline_svg");
var iframes_inline_svg_anchor=document.querySelectorAll("iframe.iframe_inline_svg+a");
for(let i=0;i<iframes_inline_svg.length;i++)
{
	let iframes_inline_svg_size_ele=string_get_element_from_path(iframes_inline_svg[i],iframes_inline_svg[i].getAttribute("data-iframe-svg-size"));
	iframes_inline_svg[i].style.height=(parseFloat(iframes_inline_svg_size_ele.offsetHeight)*parseFloat(iframes_inline_svg[i].getAttribute("data-iframe-svg-size-multiplier")))+"px";
	iframes_inline_svg[i].style.width=(parseFloat(iframes_inline_svg_size_ele.offsetHeight)*parseFloat(iframes_inline_svg[i].getAttribute("data-iframe-svg-size-multiplier")))+"px";
	iframes_inline_svg_anchor[i].style.height=iframes_inline_svg[i].style.height;
	iframes_inline_svg_anchor[i].style.width=iframes_inline_svg[i].style.width;
}