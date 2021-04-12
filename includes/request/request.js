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
		if(this.readyState==4 && this.status==200)
		{
			window[func](this,params);
		}
	};
	xmlhttp.open('GET',path,true); 
	xmlhttp.send();
	return;
}
function request_exist(path)
{
	return new Promise((resolve,reject)=>
	{
		var xmlhttp=new XMLHttpRequest();
		xmlhttp.onreadystatechange=function()
		{
			if(this.status==404)
			{
				return resolve(0);
			}
			else
			{
				return resolve(1);
			}
		};
		xmlhttp.open('HEAD',path,true); 
		xmlhttp.send();
	});
}
function request_post(path,func,pars,content_type)
{
	var params=[];
	for(let i=4;i<arguments.length;i++)
	{
		params[i-4]=arguments[i];
	}
	var xmlhttp=new XMLHttpRequest();
	xmlhttp.onreadystatechange=function()
	{
		if(this.readyState==4 && this.status==200)
		{
			window[func](this,params);
		}
	};
	xmlhttp.open('POST',path,true);
	if(content_type==1)
	{
		xmlhttp.setRequestHeader("Content-type","text/plain");
	}
	else if(content_type==2)
	{
		xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
	}
	else if(content_type==3)
	{
		xmlhttp.setRequestHeader("Content-type","multipart/form-data");
	}
	xmlhttp.send(pars);
	return;
}

function request_promise(path)
{
	return new Promise((resolve,reject)=>
	{
		var xmlhttp=new XMLHttpRequest();
		xmlhttp.onreadystatechange=function()
		{
			if(this.readyState==4 && this.status==200)
			{
				return resolve(this);
			}
		};
		xmlhttp.onerror=function()
		{
			return reject(this);
		};
		xmlhttp.open('GET',path,true); 
		xmlhttp.send();
	});
}
function request_post_promise(path,pars,content_type)
{
	return new Promise((resolve,reject)=>
	{
		var xmlhttp=new XMLHttpRequest();
		xmlhttp.onreadystatechange=function()
		{
			if(this.readyState==4 && this.status==200)
			{
				return resolve(this);
			}
		};
		xmlhttp.onerror=function()
		{
			return reject(this);
		};
		xmlhttp.open('POST',path,true);
		if(content_type==1)
		{
			xmlhttp.setRequestHeader("Content-type","text/plain");
		}
		else if(content_type==2)
		{
			xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
		}
		else if(content_type==3)
		{
			xmlhttp.setRequestHeader("Content-type","multipart/form-data");
		}
		xmlhttp.send(pars);
	});
}


function request_log(response_obj)
{
	console.log(response_obj);
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
		document.getElementsByTagName('head')[0].appendChild(response_html_styles[i]);
	}
	for(let i=0;i<response_html_scripts.length;i++)
	{
		const script_ele=document.createElement("script");
		script_ele.setAttribute("type","text/javascript");
		script_ele.innerHTML=response_html_scripts[i].innerHTML;
		document.getElementsByTagName('html')[0].appendChild(script_ele);
	}
	return Promise.resolve("Styles and scripts added from "+response_obj.responseURL);
}
function request_response_HTML(response_obj)
{
	let response_html=new DOMParser().parseFromString(response_obj.responseText,"text/html").documentElement.getElementsByTagName('body')[0];
	setTimeout(function(response_obj)
		{
			request_get_styles_and_scripts(response_obj);
		},500,response_obj);
	return response_html.innerHTML;
}
function request_custom_header()
{
	request_exist('./images/'+location.pathname.split("/")[1]+'.jpg')
		.then((res,rej)=>
		{
			if(res==1)
			{
				document.querySelector("header img:nth-child(1)").src='./images/'+location.pathname.split("/")[1]+'.jpg';
			}
		});
}