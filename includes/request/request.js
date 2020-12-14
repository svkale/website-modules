function request(path,func)
{
	var params=[];
	for(let i=2;i<arguments.length;i++)
	{
		params[i-2]=arguments[i];
	}
	var xmlhttp=new XMLHttpRequest();
	xmlhttp.onreadystatechange=function()
	{
		if (this.readyState==4 && this.status==200)
		{
			window[func](this,params);
		}
	};
	xmlhttp.open('GET',path,true); 
	xmlhttp.send();
	return;
}

function request_log(response_obj)
{
	console.log(response_obj);
	return Promise.resolve(response_obj);
}
function request_response(response_obj)
{
	return response_obj.responseText;
}
function request_get_styles_and_scripts(response_obj)
{
	var response_html=new DOMParser().parseFromString(response_obj.responseText,"text/html");
	var response_html_styles=response_html.getElementsByTagName('style');
	var response_html_scripts=response_html.getElementsByTagName('script');
	for(let i=0;i<response_html_styles.length;i++)
	{
		document.getElementsByTagName('head')[0].insertAdjacentElement("beforeend",response_html_styles[i]);
	}
	var scripts=document.createElement("script");
	scripts.setAttribute("type","text/javascript");
	for(let i=0;i<response_html_scripts.length;i++)
	{
		scripts.insertAdjacentHTML("beforeend",response_html_scripts[i].innerHTML);
	}
	document.getElementsByTagName('html')[0].appendChild(scripts);
	return Promise.resolve("Styles and scripts added from "+response_obj.responseURL);
}


// google integrations

// spreadsheets
function request_gsheet(response_obj)
{
	return JSON.parse(response_obj.responseText.substring(28,response_obj.responseText.length-2)).feed.entry;
}
function request_gsheet_published_br_seperated(response_obj)
{
	let response="";
	for(let i=0;i<JSON.parse(response_obj.responseText.substring(28,response_obj.responseText.length-2)).feed.entry.length;i++)
	{
		response+=JSON.parse(response_obj.responseText.substring(28,response_obj.responseText.length-2)).feed.entry[i].content.$t+"<br>";
	}
	return response;
}

// docs
function request_gdoc_published_inline_contents(response_obj)
{
	var response_doc=new DOMParser().parseFromString(response_obj.responseText,"text/html");
	var response_doc_headtags=response_doc.getElementsByTagName('head')[0].children;
	var put_data="";
	for(let i=0;i<response_doc_headtags.length;i++)
	{
		if(response_doc_headtags[i].tagName=="STYLE")
		{
			var style_output=response_doc_headtags[i].innerHTML;
			var style_part_arr=style_output.split(",");
			style_output="";
			for(let i=0;i<style_part_arr.length-1;i++)
			{
				style_output+=style_part_arr[i]+",.gdoc_published_contents ";
			}
			style_output+=style_part_arr[style_part_arr.length-1];
			style_part_arr=style_output.split("}");
			style_output="";
			for(let i=0;i<style_part_arr.length-1;i++)
			{
				style_output+=style_part_arr[i]+"}.gdoc_published_contents ";
			}
			style_output+=style_part_arr[style_part_arr.length-1];
			style_output="<style type='text/css'>.gdoc_published_contents "+style_output+"</style>";
			put_data+=style_output;
		}
	}
	put_data+=response_doc.getElementsByTagName('body')[0].outerHTML.replace(/body/g,"div");
	return put_data;
}