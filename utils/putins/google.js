var doc_ele_HTML,style_loaded=0;
function putins_make_page_from_gdoc(request_obj,params)
{
	let nav_ele_id=params[0],doc_ele_id=params[1],element=params[2];
	let nav_ele=document.getElementById(nav_ele_id);
	let doc_ele=document.getElementById(doc_ele_id);

	doc_ele.classList.add("gdoc_published_contents");

	if(!doc_ele_HTML)
	{
		doc_ele_HTML=request_gdoc_published_inline_contents(request_obj);
	}
	let domParser=new DOMParser(),dom;
	dom=domParser.parseFromString(doc_ele_HTML,"text/html");

	let nav_contents=dom.documentElement.querySelector("body").innerText.substring(dom.documentElement.querySelector("body").innerText.search("{NAVIGATION}")+12,dom.documentElement.querySelector("body").innerText.search("{/NAVIGATION}")).split("|"),nav_HTML="";
	for(let i of nav_contents)
	{
		let j=i.split("<>");
		if(j.length>=2)
		{
			if(j[1]=="Heading")
			{
				nav_HTML+="<big class=\"u1\" style=\"font-weight: bold;\">"+j[0]+"</big>";
			}
			else if(j[1]=="Text")
			{
				nav_HTML+="<span class=\"u1\" style=\"text-align: center;\">"+j[0]+"</span>";
			}
			else if(j[1]=="EmptyLine")
			{
				nav_HTML+="<div class=\"u1 empty_line\">.</div>";
			}
			else if(j[1]=="PhotoLink")
			{
				nav_HTML+="<section class=\"cont\" style=\"--cont-width: 50%; margin-left: 25%;\"><img class='media1' src=\""+j[2]+"\"></section>";
			}
			else if(j[1]=="Weblink")
			{
				nav_HTML+="<a class=\"u1\" target=\"_blank\" href=\""+j[2]+"\">"+j[0]+"</li>";
			}
			else if(j[1]=="Page")
			{
				nav_HTML+="<li class='u1 doc_page' onclick='putins_make_subpage(this.innerText,\""+doc_ele_id+"\")' style=\"cursor: pointer;\"><div";
				if(j[0]=="Home")
				{
					nav_HTML+=" style=\"font-weight: bold;\"";
				}
				nav_HTML+=">"+j[0]+"</div></li>";
			}
		}
	}
	nav_ele.innerHTML=nav_HTML;
	let nav_load_script=document.createElement("script");
	nav_load_script.setAttribute("type","text/javascript");
	nav_load_script.innerHTML="load_navs();";
	document.getElementsByTagName("body")[0].appendChild(nav_load_script);
	putins_make_subpage(element,doc_ele_id);
	return;
}
function putins_make_subpage(element,doc_ele_id)
{
	let domParser=new DOMParser(),dom,doc_ele=document.getElementById(doc_ele_id);
	dom=domParser.parseFromString(doc_ele_HTML,"text/html");
	if(!dom.documentElement.innerText.includes("{"+element+"}"))
	{
		doc_ele.innerHTML="";
		return;
	}
	let eles=dom.documentElement.querySelectorAll("body>div *"),remove_flag=0;
	for(let ele of eles)
	{
		ele.remove();
		if(ele.innerText=="{"+element+"}")
		{
			break;
		}
	}
	for(let ele of eles)
	{
		if(ele.innerText=="{/"+element+"}")
		{
			remove_flag=1;
		}
		if(remove_flag==1)
		{
			ele.remove();
		}
	}
	if(remove_flag==0)
	{
		doc_ele.innerHTML="<span>Error! End tag not found.</span>";
		return;
	}
	let doc_text=dom.documentElement.innerText,exec_video_style_script=0,exec_frame_style_script=0;
	while(dom.documentElement.innerText.includes("{video_gdrive}") || dom.documentElement.innerText.includes("{video_youtube}"))
	{
		let inc,inc_l;
		doc_text=dom.documentElement.innerText;
		if(doc_text.includes("{video_gdrive}"))
		{
			inc="video_gdrive";
			inc_l=14;
		}
		else
		{
			inc="video_youtube";
			inc_l=15;
		}
		let video_ele="<section class=\"u1\" style=\"margin-right: 1%;position: relative;\"><div class=\"loading_half_circle\"></div><iframe class=\"media1 request_google_video\" src=\""+doc_text.substring(doc_text.search("{"+inc+"}")+inc_l,doc_text.search("{/"+inc+"}"))+"\" style=\"visibility: hidden;\" allow=\"accelerometer;autoplay;clipboard-white;encrypted-media;gyroscope;picture-in-picture\" allowfullscreen></iframe></section>";
		let video_target=dom.evaluate("//*[contains(.,'"+doc_text.substring(doc_text.search("{"+inc+"}"),doc_text.search("{/"+inc+"}"))+"{/"+inc+"}"+"')]",dom,null, XPathResult.ANY_TYPE,null);
		let l,ltemp=true;
		while(ltemp)
		{
			l=ltemp;
			ltemp=video_target.iterateNext();
		}
		l.outerHTML=video_ele;
		exec_video_style_script=1;
	}
	while(dom.documentElement.innerText.includes("{frame_link}"))
	{
		doc_text=dom.documentElement.innerText;
		let frame_ele="<section class=\"u1\" style=\"margin-right: 1%;position: relative;\"></div><iframe class=\"cont1 external_frame_from_doc\" src=\""+doc_text.substring(doc_text.search("{frame_link}")+12,doc_text.search("{/frame_link}"))+"\" style=\"visibility: hidden;\" allow=\"accelerometer;encrypted-media;\" allowfullscreen></iframe></section>";
		let frame_target=dom.evaluate("//*[contains(.,'"+doc_text.substring(doc_text.search("{frame_link}"),doc_text.search("{/frame_link}"))+"{/frame_link}"+"')]",dom,null, XPathResult.ANY_TYPE,null);
		let l,ltemp=true;
		while(ltemp)
		{
			l=ltemp;
			ltemp=frame_target.iterateNext();
		}
		l.outerHTML=frame_ele;
		exec_frame_style_script=1;
	}

	doc_ele.innerHTML=dom.documentElement.querySelector("body>div").outerHTML;
	if(style_loaded==0)
	{
		while(dom.documentElement.querySelector("style"))
		{
			document.getElementsByTagName("head")[0].insertAdjacentElement("beforeend",dom.documentElement.querySelector("style"));
		}
		style_loaded=1;
	}
	if(exec_video_style_script==1)
	{
		setTimeout(function(){
			loading_show();
			var video_drive_script=document.createElement("script");
			video_drive_script.setAttribute("type","text/javascript");
			video_drive_script.innerHTML=`
			var frame_videos=document.getElementsByClassName('request_google_video');
			for(let i=0;i<frame_videos.length;i++)
			{
				frame_videos[i].style.height=(frame_videos[i].offsetWidth*9/16)+"px";
				frame_videos[i].style.visibility="visible";
				window.addEventListener("resize",function()
				{
					frame_videos[i].style.height=(frame_videos[i].offsetWidth*9/16)+"px";
				});
				frame_videos[i].classList.remove(\"request_google_video\");
			}
			`;
			document.getElementsByTagName('html')[0].appendChild(video_drive_script);
		},100);
	}
	if(exec_frame_style_script==1)
	{
		setTimeout(function(){
			loading_show();
			var frame_script=document.createElement("script");
			frame_script.setAttribute("type","text/javascript");
			frame_script.innerHTML=`
			var frame_elements=document.getElementsByClassName('external_frame_from_doc');
			for(let i=0;i<frame_elements.length;i++)
			{
				frame_elements[i].style.visibility="visible";
				frame_elements[i].style.height=(frame_elements[i].offsetWidth*3/4)+"px";
				window.addEventListener("resize",function()
				{
					frame_elements[i].style.height=(frame_elements[i].offsetWidth*4/3)+"px";
				});
				frame_elements[i].classList.remove(\"external_frame_from_doc\");
			}
			`;
			document.getElementsByTagName('html')[0].appendChild(frame_script);
		},100);
	}

	return;
}