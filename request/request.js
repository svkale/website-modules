function request(path,func)
{
	var param=[];
	for(var i=2;i<arguments.length;i++)
	{
		param[i-2]=arguments[i];
	}
	var xmlhttp=new XMLHttpRequest();
	xmlhttp.onreadystatechange=function()
	{
		if (this.readyState==4 && this.status==200)
		{
			window[func](this,param);
		}
	};
	xmlhttp.open('GET',path,true); 
	xmlhttp.send();
	return;
}

function request_log(response_obj)
{
	console.log(response_obj);
}

// google integrations

// spreadsheets
function request_gsheet(response_obj)
{
	return JSON.parse(response_obj.responseText.substring(28,response_obj.responseText.length-2)).feed.entry;
}

// docs
function request_gdoc(response_obj)
{
	return response_obj.responseText;
}
function request_gdoc_show(response_obj,params)
{
	var put_target=params[0];
	var response_doc=new DOMParser().parseFromString(request_gdoc(response_obj),"text/html");
	var response_doc_headtags=response_doc.getElementsByTagName('head')[0].children;
	var put_data="";
	for(var i=0;i<response_doc_headtags.length;i++)
	{
		if(response_doc_headtags[i].tagName=="STYLE")
		{
			var style_output=response_doc_headtags[i].innerHTML;
			var style_part_arr=style_output.split(",");
			style_output="";
			for(var i=0;i<style_part_arr.length-1;i++)
			{
				style_output+=style_part_arr[i]+",.gdoc_contents ";
			}
			style_output+=style_part_arr[style_part_arr.length-1];
			style_part_arr=style_output.split("}");
			style_output="";
			for(var i=0;i<style_part_arr.length-1;i++)
			{
				style_output+=style_part_arr[i]+"}.gdoc_contents ";
			}
			style_output+=style_part_arr[style_part_arr.length-1];
			style_output="<style type='text/css'>.gdoc_contents "+style_output+"</style>";
			put_data+=style_output;
		}
	}
	put_data+=response_doc.getElementsByTagName('body')[0].outerHTML.replace(/body/g,"div");
	put_target.insertAdjacentHTML("beforeend",put_data);
	put_target.classList.add("gdoc_contents");
}

// scripts web app
 window.addEventListener("message", message_operate);
function message_operate(message)
{
	window[message.data.function_name](message.data.function_parameters);
}
