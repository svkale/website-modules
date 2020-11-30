if(document.getElementsByClassName('background_img')[0])
{
	var bgimages=document.getElementsByClassName('background_img');
	// console.log(bgimages);
	for(var i=0;i<bgimages.length;i++)
	{
		bgimages[i].parentElement.style.position="relative";
	}
}


var nav_elements=document.getElementsByTagName('main')[0].getElementsByTagName('nav')[0].getElementsByTagName('ul')[0].getElementsByTagName('li');
for(var i=0;i<nav_elements.length;i++)
{
	if(nav_elements[i].getAttribute("data-iframe-url"))
	{
		nav_elements[i].addEventListener("click",function()
		{
			window.location.href="https://"+this.getAttribute("data-iframe-url");
		});
	}
}


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
function request_gsheet(request_obj)
{
	return JSON.parse(request_obj.responseText.substring(28,request_obj.responseText.length-2)).feed.entry;
}
function put_hitcount(request_obj,params)
{
	params[0].innerHTML=request_gsheet(request_obj)[0].content.$t;
}
for(var i=0;i<document.querySelectorAll("[data-ssheet-url]").length;i++)
{
	request(document.querySelectorAll("[data-ssheet-url]")[i].getAttribute("data-ssheet-url"),"put_hitcount",document.querySelectorAll("[data-ssheet-url]")[i]);
}
function request_gdoc(request_obj)
{
	return request_obj.responseText;
}
function request_gdoc_show(request_obj,params)
{
	var put_target=params[0];
	var response_doc=new DOMParser().parseFromString(request_gdoc(request_obj),"text/html");
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
function show_gdoc(request_obj,params)
{
	var xmlDoc = new DOMParser().parseFromString(request_gdoc(request_obj),"text/html");
	params[0].insertAdjacentHTML("beforeend",xmlDoc.getElementsByTagName('head')[0].innerHTML);
	params[0].insertAdjacentHTML("beforeend",xmlDoc.getElementsByTagName('body')[0].innerHTML);
}
for(var i=0;i<document.querySelectorAll("[data-doc-url]").length;i++)
{
	request(document.querySelectorAll("[data-doc-url]")[i].getAttribute("data-doc-url"),"request_gdoc_show",document.querySelectorAll("[data-doc-url]")[i]);
}


			request("https://script.google.com/macros/s/AKfycbzWXVCyY9a0l55xmB-ndVvGPe7NZ-u_e8-W2pqOl5QCIyzVgXA/exec","log");
			function log(request_obj)
			{
				console.log(request_obj);
			}