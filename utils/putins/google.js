var doc_ele_HTML,style_loaded=0;
function putins_make_page_from_gdoc(request_obj,params)
{
	let nav_ele_id=params[0],doc_ele_id=params[1],element=params[2];
	let nav_ele=document.getElementById(nav_ele_id);
	let doc_ele=document.getElementById(doc_ele_id);

	if(!doc_ele_HTML)
	{
		doc_ele_HTML=request_gdoc_published_inline_contents(request_obj,[doc_ele_id]);
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
				nav_HTML+="<li class=\"u1 nav_heading\" style=\"background-color: var(--main-color-2);\">"+j[0]+"</li>";
			}
			else if(j[1]=="Text")
			{
				nav_HTML+="<span class=\"u1\" style=\"text-align: center;\">"+j[0]+"</span>";
			}
			else if(j[1]=="EmptyLine")
			{
				nav_HTML+="<div class=\"u1 empty_line\">.</div>";
			}
			else if(j[1]=="UserPhotoLink")
			{
				nav_HTML+="<section class=\"cont\" style=\"--cont-width: 50%; margin-left: 25%;\"><img class='media1' src=\""+j[2]+"\"></section>";
			}
			else if(j[1]=="ImageLink")
			{
				nav_HTML+="<img class='cont' style='--cont-width: 60%;margin-left: 20%;' src=\""+j[2]+"\"></section>";
			}
			else if(j[1]=="Weblink")
			{
				nav_HTML+="<a class=\"u1\" target=\"_blank\" href=\""+j[2]+"\" style=\"padding-left: 4%;\">"+j[0]+"</a>";
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
			else if(j[1]=="ScrollText")
			{
				if(document.getElementById("top_scroll_text"))
				{
					document.getElementById("top_scroll_text").innerHTML=j[2];
				}
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
		if(ele.innerText.trim()=="{/"+element+"}")
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
	let doc_text=dom.documentElement.innerText,exec_video_style_script=0,exec_frame_style_script=0,exec_nested_doc_style_script=0;
	while((dom.documentElement.innerText.includes("{video_gdrive}") && dom.documentElement.innerText.includes("{/video_gdrive}")) || (dom.documentElement.innerText.includes("{video_youtube}") && dom.documentElement.innerText.includes("{/video_youtube}")))
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
			if(l.innerText)
			{
				if(l.innerText==doc_text.substring(doc_text.search("{"+inc+"}"),doc_text.search("{/"+inc+"}"))+"{/"+inc+"}")
				{
					break;
				}
			}
			ltemp=video_target.iterateNext();
		}
		l.outerHTML=video_ele;
		exec_video_style_script=1;
	}
	let doc_frame_no=0;
	while(dom.documentElement.innerText.includes("{frame_link}https://docs.google.com/document/d/e") && dom.documentElement.innerText.includes("embedded=true{/frame_link}"))
	{
		doc_text=dom.documentElement.innerText;
		let frame_ele="<section data-target-url=\""+doc_text.substring(doc_text.search("{frame_link}https://docs.google.com/document/d/e")+12,doc_text.search("embedded=true{/frame_link}"))+"embedded=true\" class=\"u1 putins\" data-function-name=\"request_gdoc_published_inline_contents\" id=\"doc_frame_"+doc_frame_no+"\" data-parameter-custom=\"doc_frame_"+doc_frame_no+"\"></section>";
		let frame_target=dom.evaluate("//*[contains(.,'"+doc_text.substring(doc_text.search("{frame_link}https://docs.google.com/document/d/e"),doc_text.search("embedded=true{/frame_link}"))+"embedded=true{/frame_link}"+"')]",dom,null, XPathResult.ANY_TYPE,null);
		let l,ltemp=true;
		while(ltemp)
		{
			l=ltemp;
			if(l.innerText)
			{
				if(l.innerText==doc_text.substring(doc_text.search("{frame_link}https://drive.google.com/document/d/e"),doc_text.search("embedded=true{/frame_link}"))+"embedded=true{/frame_link}")
				{
					break;
				}
			}
			ltemp=frame_target.iterateNext();
		}
		while(l.tagName=="HTML" || l.tagName=="BODY")
		{
			l=frame_target.iterateNext();
		}
		l.outerHTML=frame_ele;
		exec_nested_doc_style_script=1;
		doc_frame_no++;
	}
	while(dom.documentElement.innerText.includes("{frame_link}") && dom.documentElement.innerText.includes("{/frame_link}"))
	{
		doc_text=dom.documentElement.innerText;
		let frame_ele="<section class=\"u1\" style=\"margin-right: 1%;position: relative;\"><iframe class=\"cont1 external_frame_from_doc\" src=\""+doc_text.substring(doc_text.search("{frame_link}")+12,doc_text.search("{/frame_link}"))+"\" style=\"border: 0;visibility: hidden;\" allow=\"encrypted-media;\" allowfullscreen></iframe></section>";
		let frame_target=dom.evaluate("//*[contains(.,'"+doc_text.substring(doc_text.search("{frame_link}"),doc_text.search("{/frame_link}"))+"{/frame_link}"+"')]",dom,null, XPathResult.ANY_TYPE,null);
		let l,ltemp=true;
		while(ltemp)
		{
			l=ltemp;
			if(l.innerText)
			{
				if(l.innerText==doc_text.substring(doc_text.search("{frame_link}"),doc_text.search("{/frame_link}"))+"{/frame_link}")
				{
					break;
				}
			}
			ltemp=frame_target.iterateNext();
		}
		l.outerHTML=frame_ele;
		exec_frame_style_script=1;
	}
	var count=0;
	while(dom.documentElement.innerText.includes("{COLUMN2}") && dom.documentElement.innerText.includes("{/COLUMN2}"))
	{
		let col_target=dom.evaluate("//*[contains(.,'{COLUMN2}')]",dom,null,XPathResult.ANY_TYPE,null),col_target_end=dom.evaluate("//*[contains(.,'{/COLUMN2}')]",dom,null,XPathResult.ANY_TYPE,null);
		let l1,ltemp1=true,l2,ltemp2=true;
		while(ltemp1)
		{
			l1=ltemp1;
			if(l1.innerText)
			{
				if(l1.innerText=="{COLUMN2}")
				{
					break;
				}
			}
			ltemp1=col_target.iterateNext();
		}
		while(ltemp2)
		{
			l2=ltemp2;
			if(l2.innerText)
			{
				if(l2.innerText=="{/COLUMN2}")
				{
					break;
				}
			}
			ltemp2=col_target_end.iterateNext();
		}
		count++;
		if(count%2==0)
		{
			l2.nextElementSibling.style.clear="left";
		}
		dom.documentElement.innerHTML=dom.documentElement.innerHTML.replace(l1.outerHTML,"<section class=\"u1 md2\">").replace(l2.outerHTML,"</section>");
	}
	count=0;
	while(dom.documentElement.innerText.includes("{COLUMN3}") && dom.documentElement.innerText.includes("{/COLUMN3}"))
	{
		let col_target=dom.evaluate("//*[contains(.,'{COLUMN3}')]",dom,null,XPathResult.ANY_TYPE,null),col_target_end=dom.evaluate("//*[contains(.,'{/COLUMN3}')]",dom,null,XPathResult.ANY_TYPE,null);
		let l1,ltemp1=true,l2,ltemp2=true;
		while(ltemp1)
		{
			l1=ltemp1;
			if(l1.innerText)
			{
				if(l1.innerText=="{COLUMN3}")
				{
					break;
				}
			}
			ltemp1=col_target.iterateNext();
		}
		while(ltemp2)
		{
			l2=ltemp2;
			if(l2.innerText)
			{
				if(l2.innerText=="{/COLUMN3}")
				{
					break;
				}
			}
			ltemp2=col_target_end.iterateNext();
		}
		count++;
		if(count%3==0)
		{
			l2.nextElementSibling.style.clear="left";
		}
		dom.documentElement.innerHTML=dom.documentElement.innerHTML.replace(l1.outerHTML,"<section class=\"u1 lg3\">").replace(l2.outerHTML,"</section>");
	}
	doc_ele.innerHTML="";
	if(dom.documentElement.querySelector("body>div"))
	{
		doc_ele.insertAdjacentElement("beforeend",dom.documentElement.querySelector("body>div"));
	}
	else
	{
		doc_ele.insertAdjacentElement("beforeend",dom.documentElement.querySelector("body>section"));
	}


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
			var i;
			var frame_videos=document.getElementsByClassName('request_google_video');
			for(i=0;i<frame_videos.length;i++)
			{
				frame_videos[i].style.height=(frame_videos[i].offsetWidth*9/16)+"px";
				frame_videos[i].style.visibility="visible";
				window.addEventListener("resize",function()
				{
					frame_videos[i].style.height=(frame_videos[i].offsetWidth*9/16)+"px";
				});
			}
			i=0;
			while(frame_elements[i])
			{
				frame_elements[i].classList.remove(\"external_frame_from_doc\");
				i++;
			}
			`;
			document.getElementsByTagName('html')[0].appendChild(video_drive_script);
		},500);
	}
	if(exec_frame_style_script==1)
	{
		setTimeout(function(){
			loading_show();
			var frame_script=document.createElement("script");
			frame_script.setAttribute("type","text/javascript");
			frame_script.innerHTML=`
			var frame_elements=document.getElementsByClassName('external_frame_from_doc');
			var i;
			for(i=0;i<frame_elements.length;i++)
			{
				frame_elements[i].style.visibility="visible";
				frame_elements[i].style.height=(frame_elements[i].offsetWidth*4/3)+"px";
				window.addEventListener("resize",function()
				{
					frame_elements[i].style.height=(frame_elements[i].offsetWidth*4/3)+"px";
				});
			}
			i=0;
			while(frame_elements[i])
			{
				frame_elements[i].classList.remove(\"external_frame_from_doc\");
				i++;
			}
			`;
			document.getElementsByTagName('html')[0].appendChild(frame_script);
		},500);
	}
	if(exec_nested_doc_style_script==1)
	{
		setTimeout(function(){
			var nested_doc_script=document.createElement("script");
			nested_doc_script.setAttribute("type","text/javascript");
			nested_doc_script.innerHTML=`putins_load();`;
			document.getElementsByTagName('html')[0].appendChild(nested_doc_script);

			var nested_doc_style=document.createElement("style");
			nested_doc_style.setAttribute("type","text/css");
			let nested_doc_style_HTML="";
			for(let i=0;i<doc_frame_no;i++)
			{
				nested_doc_style_HTML+="#doc_frame_"+i+" *,";
			}
			nested_doc_style_HTML=nested_doc_style_HTML.substring(0,nested_doc_style_HTML.length-1);
			nested_doc_style_HTML+="{padding: revert;border: revert;color: revert;}";
			for(let i=0;i<doc_frame_no;i++)
			{
				nested_doc_style_HTML+="#doc_frame_"+i+" *[class^='c'],";
			}
			nested_doc_style_HTML=nested_doc_style_HTML.substring(0,nested_doc_style_HTML.length-1);
			nested_doc_style_HTML+="{padding: revert;border: revert;color: revert;font-size: revert;font-weight: revert;font-family: revert;color: black;background-color: revert;text-decoration: revert;}";
			nested_doc_style.innerHTML=nested_doc_style_HTML;
			console.log(document.getElementsByTagName('head')[0].innerText,nested_doc_style);
			if(!document.getElementsByTagName('head')[0].innerText.includes(nested_doc_style_HTML))
			{
				document.getElementsByTagName('head')[0].appendChild(nested_doc_style);
			}
		},500);
	}

	return;
}