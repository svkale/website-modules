function svg_box_right_slant(svg_params)
{
	var h=1,b=parseFloat(svg_params["content-wbyh"]),w=parseFloat(svg_params["border-wbyh"])/2,e=parseFloat(svg_params["content-extbyw"]);
	return '<svg xmlns="http://www.w3.org/2000/svg" stroke="'+svg_params["border-color"].replace("hash",'#')+'" stroke-width="'+svg_params["border-wbyh"]+'" viewBox="'+(-1*w)+" "+(-1*w)+" "+(b*(1+e))+" "+(h+4*w)+'" fill="'+svg_params["fill-color"]+'" style="height: '+parseFloat(svg_params["content-height"])*(1+4*w)+'px;"><polygon points="0,0 '+(b+w)+',0 '+(b*(1+e)-2*w)+','+(h/3+w*(1-(3*(e*b-4*w)/h)))+' '+(b*(1+e)-2*w)+','+(2*h/3+w*(1+(3*(e*b-4*w)/h)))+' '+(b+w)+','+(2*w+h)+' 0,'+(2*w+h)+'"/></svg>';
}