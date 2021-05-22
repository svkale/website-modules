var doc_ele_HTML,style_loaded=0;
function putins_make_page_from_gdoc(request_obj,params)
{
	let nav_ele_id=params[0],doc_ele_id=params[1],element=params[2];
	if(params[3])
	{
		var parentURL=params[3];
	}
	let nav_ele=document.getElementById(nav_ele_id);
	let nav_ele_mob=document.getElementById(nav_ele_id+"_mob");
	let doc_ele=document.getElementById(doc_ele_id);

	if(!doc_ele_HTML)
	{
		doc_ele_HTML=request_gdoc_published_inline_contents(request_obj,[doc_ele_id]);
	}
	let domParser=new DOMParser(),dom;
	dom=domParser.parseFromString(doc_ele_HTML,"text/html");

	let nav_contents=dom.documentElement.querySelector("body").innerText.substring(dom.documentElement.querySelector("body").innerText.search("{NAVIGATION}")+12,dom.documentElement.querySelector("body").innerText.search("{/NAVIGATION}")).split("|"),nav_HTML="",head_no=0,exec_dropdown_script=0;
	for(let i of nav_contents)
	{
		let j=i.split("<>");
		if(j.length>=2)
		{
			if(j[1]=="Heading")
			{
				if(head_no!=0)
				{
					nav_HTML+="</div>";
				}
				head_no=1;
				nav_HTML+="<div class=\"cont1\" data-button-target-selector=\""+j[0].substr(j[0].search("&nbsp;")+6)+"\"><li class=\"u1 nav_heading\" style=\"background-color: var(--main-color-2);\">"+j[0]+"</li>";
			}
			else if(j[1]=="Text")
			{
				if(!j[2])
				{	
					nav_HTML+="<span class=\"u1\" style=\"text-align: center;font-weight: bold;\">"+j[0]+"</span>";
				}
				else
				{
					nav_HTML+="<li class='u1 dyn_data'><div class='putins' data-target-url='"+j[2]+"' data-function-name='request_response'></div></li>";
					var dyn_data_yn=true;
				}
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
				nav_HTML+="<li><a class=\"u1 web_link\" target=\"_blank\" href=\""+j[2]+"\" style=\"padding-left: 4%;text-decoration: none;\">"+j[0]+" <svg height=\"12\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 512 512\"><path fill=\"var(--main-color-2)\" d=\"M432,320H400a16,16,0,0,0-16,16 V448 H64 V128 H208 a16,16,0,0,0,16-16 V80 a16,16,0,0,0-16-16 H48 A48,48,0,0,0,0,112 V464 a48,48,0,0,0,48,48 H400 a48,48,0,0,0,48-48 V336 A16,16,0,0,0,432,320ZM488,0h-128 c-21.37,0-32.05,25.91-17,41 l35.73,35.73 L135,320.37a24,24,0,0,0,0,34 L157.67,377 a24,24,0,0,0,34,0 L435.28,133.32,471,169 c15,15,41,4.5,41-17 V24 A24,24,0,0,0,488,0Z\"></path></svg></a></li>";
			}
			else if(j[1]=="Page")
			{
				nav_HTML+="<li class='u1 doc_page' onclick='putins_make_subpage(this.innerText.trim(),\""+doc_ele_id+"\")'><div";
				if(j[0].endsWith("Home"))
				{
					nav_HTML+=" style=\"font-weight: bold;\"";
				}
				nav_HTML+=">"+j[0]+"</div></li>";
			}
			else if(j[1]=="FramePage")
			{
				nav_HTML+="<li class='u1 doc_page' onclick='let domParser=new DOMParser(),dom,doc_ele=document.getElementById(\""+doc_ele_id+"\");dom=domParser.parseFromString(\"<p>{frame_link}"+j[2]+"{/frame_link}</p>\",\"text/html\");putins_make_subpage_from_HTML(dom,doc_ele);'><div";
				if(j[0]=="Home")
				{
					nav_HTML+=" style=\"font-weight: bold;\"";
				}
				nav_HTML+=">"+j[0]+"</div></li>";
			}
			else if(j[1]=="HitCounter")
			{
				nav_HTML+="<li class='u1 hit_counter' id='hit_counter'><big class='putins' data-target-url='"+j[2]+"' data-function-name='request_response'></big></li>";
				var hit_count_yn=true;
				
			}
			else if(j[1]=="HeaderImage")
			{
				document.getElementsByTagName('header')[0].getElementsByTagName('img')[0].setAttribute("src",parentURL+j[2]);
				
			}
			else if(j[1]=="ScrollText")
			{
				if(document.getElementById("top_scroll_text"))
				{
					document.getElementById("top_scroll_text").innerHTML=j[2];
				}
			}
			else if(j[1]=="InputText")
			{
				nav_HTML+="<input class=\"u1\" type=\"text\" id=\""+j[2]+"\">";
			}
			else if(j[1]=="Button")
			{
				nav_HTML+="<button class=\"u1\" onclick=\""+j[2]+"\" style=\"text-align: center;background-color: aliceblue;\"><span style=\"background-color: grey;\">"+j[0]+"</span></button>";
			}
			else if(j[1]=="DropDown")
			{
				nav_HTML+="<section class=\"u1 hover_dropdown\"><button class=\"u1 hover_dropdown_button\" style=\"background-color: aliceblue;\">"+j[0]+"</button><ul class=\"hover_dropdown_list\">";
				exec_dropdown_script=1;
			}
			else if(j[1]=="DropDownItem")
			{
				if(j[2]!="")
				{
					nav_HTML+="<li style=\"padding: 0;\"><a target=\"_blank\" href=\""+j[2]+"\">"+j[0]+"</a></li>";
				}
				else
				{
					nav_HTML+="<li>"+j[0]+"</li>";
				}
			}
			else if(j[1]=="DropDownEnd")
			{
				nav_HTML+="</ul></section>";
			}
		}
	}
	nav_ele.innerHTML=nav_HTML;
	if(exec_dropdown_script)
	{
		let dropdown_script=document.createElement("script");
		dropdown_script.setAttribute("type","text/javascript");
		dropdown_script.innerHTML=`
		let dropdowns=document.querySelectorAll(".hover_dropdown");
		function setDropDown(obj)
		{
			obj[0].target.getElementsByClassName("hover_dropdown")[0].style.visibility= obj[0].contentRect.height==0 ? "hidden" : "visible";
		}
		for(i of dropdowns)
		{
			new ResizeObserver(setDropDown).observe(i.parentElement);
		}
		`;
		document.getElementsByTagName('html')[0].appendChild(dropdown_script);
	}
	if(hit_count_yn)
	{
		putins_load('hit_counter');
	}
	if(dyn_data_yn)
	{
		putins_load('dyn_data',true);
	}
	if(nav_ele_mob)
	{
		nav_ele_mob.innerHTML="";
		let nav_ele_innersvgs=document.querySelectorAll("#"+nav_ele_id+" svg");
		let nav_count=0;
		for(k of nav_ele_innersvgs)
		{
			if(k.parentElement.classList.contains("nav_heading"))
			{
				j=k.cloneNode("true");
				j.style.height="var(--nav_svgs)";
				j.style.width="var(--nav_svgs)";
				j.style.paddingLeft="3%";
				j.style.paddingRight="3%";
				j.classList.add("button_visibility_control");
				j.classList.add("hide_md");
				j.setAttribute("data-button-target",k.parentElement.innerText.trim());
				j.setAttribute("data-button-get-from","attribute");
				if(window.innerWidth>575)
				{
					j.setAttribute("data-button-status","visible");
				}
				else
				{
					j.setAttribute("data-button-status","hidden");
				}
				nav_ele_mob.appendChild(j);
				nav_count++;
			}
		}
		load_buttons();
		nav_ele_mob.setAttribute("style",nav_ele_mob.getAttribute("style")+";--nav_svgs: "+100/nav_count+"%;");
	}
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
		if(ele.innerText=="{"+element+"}") break;
	}
	for(let ele of eles)
	{
		if(ele.innerText.trim()=="{/"+element+"}") remove_flag=1;
		if(remove_flag==1) ele.remove();
	}
	if(remove_flag==0)
	{
		doc_ele.innerHTML="<span>Error! End tag not found.</span>";
		return;
	}
	putins_make_subpage_from_HTML(dom,doc_ele);
}
function putins_make_subpage_from_HTML(dom,doc_ele)
{
	let doc_text=dom.documentElement.innerText,exec_video_style_script=0,exec_frame_style_script=0,exec_internal_page_script=0,exec_nested_doc_style_script=0,exec_presentation_style_script=0,exec_noticeboard_script=0;
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
		while(l.tagName=="HTML" || l.tagName=="BODY")
		{
			l=frame_target.iterateNext();
		}
		if(frame_ele.includes(window.location.hostname) && )
		{
			l.outerHTML=frame_ele.replace("external_frame_from_doc","internal_page").replace("visibility: hidden;","");
			exec_internal_page_script=1;
		}
		else if(frame_ele.includes("https://docs.google.com/presentation/") && (frame_ele.includes("/preview") || frame_ele.includes("/embed")))
		{
			l.outerHTML=frame_ele.replace("external_frame_from_doc","external_presentation").replace("visibility: hidden;","");
			exec_presentation_style_script=1;
		}
		else if(frame_ele.includes("https://docs.google.com/document/d/e") && frame_ele.includes("embedded=true"))
		{
			frame_ele="<section data-target-url=\""+doc_text.substring(doc_text.search("{frame_link}https://docs.google.com/document/d/e")+12,doc_text.search("embedded=true{/frame_link}"))+"embedded=true\" class=\"u1 putins\" data-function-name=\"request_gdoc_published_inline_contents\" id=\"doc_frame_"+doc_frame_no+"\" data-parameter-custom=\"doc_frame_"+doc_frame_no+"\"></section>";
			l.outerHTML=frame_ele;
			exec_nested_doc_style_script=1;
			doc_frame_no++;
		}
		else
		{
			l.outerHTML=frame_ele;
			exec_frame_style_script=1;
		}
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
		while(l1.tagName=="HTML" || l1.tagName=="BODY")
		{
			l1=frame_target.iterateNext();
		}
		while(l2.tagName=="HTML" || l2.tagName=="BODY")
		{
			l2=frame_target.iterateNext();
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
			if(l2.nextElementSibling)
			{
				l2.nextElementSibling.style.clear="left";
			}
		}
		dom.documentElement.innerHTML=dom.documentElement.innerHTML.replace(l1.outerHTML,"<section class=\"u1 lg3\">").replace(l2.outerHTML,"</section>");
	}
	while(dom.documentElement.innerText.includes("{noticeboard}") && dom.documentElement.innerText.includes("{/noticeboard}") && dom.documentElement.innerText.includes("{noticeboard_layout}") && dom.documentElement.innerText.includes("{/noticeboard_layout}"))
	{
		doc_text=dom.documentElement.innerText;
		let noticeboard_target=dom.evaluate("//*[contains(.,'"+doc_text.substring(doc_text.search("{noticeboard}"),doc_text.search("{/noticeboard}"))+"{/noticeboard}"+"')]",dom,null, XPathResult.ANY_TYPE,null);
		let l,ltemp=true;
		while(ltemp)
		{
			l=ltemp;
			ltemp=noticeboard_target.iterateNext();
		}
		var notice_script_link=doc_text.substring(doc_text.search("{noticeboard}")+13,doc_text.search("{/noticeboard}"));
		l.outerHTML="";

		let notice_target=dom.evaluate("//*[contains(.,'{noticeboard_layout}')]",dom,null,XPathResult.ANY_TYPE,null),notice_target_end=dom.evaluate("//*[contains(.,'{/noticeboard_layout}')]",dom,null,XPathResult.ANY_TYPE,null);
		let l1,ltemp1=true,l2,ltemp2=true;
		while(ltemp1)
		{
			l1=ltemp1;
			if(l1.innerText)
			{
				if(l1.innerText=="{noticeboard_layout}")
				{
					break;
				}
			}
			ltemp1=notice_target.iterateNext();
		}
		while(ltemp2)
		{
			l2=ltemp2;
			if(l2.innerText)
			{
				if(l2.innerText=="{/noticeboard_layout}")
				{
					break;
				}
			}
			ltemp2=notice_target_end.iterateNext();
		}
		dom.documentElement.innerHTML=dom.documentElement.innerHTML.replace(l1.outerHTML,"<section id=\"notices\" class=\"cont1\">").replace(l2.outerHTML,"</section>");
		exec_noticeboard_script=1;
	}
	while(dom.documentElement.innerText.includes("{notice}") && dom.documentElement.innerText.includes("{/notice}"))
	{
		doc_text=dom.documentElement.innerText;
		let notice_target=dom.evaluate("//*[contains(.,'"+doc_text.substring(doc_text.search("{notice}"),doc_text.search("{/notice}"))+"{/notice}"+"')]",dom,null, XPathResult.ANY_TYPE,null);
		let l,ltemp=true;
		while(ltemp)
		{
			l=ltemp;
			ltemp=notice_target.iterateNext();
		}
		l.outerHTML="<section id=\""+doc_text.substring(doc_text.search("{notice}")+8,doc_text.search("{/notice}"))+"_notices\" class=\"cont1\"><div class=\"media1\" style=\"position: relative;\"><div class=\"u1 loading_half_circle_10px\"></div></div></section>";
		
	}
	while(dom.documentElement.innerText.includes("{html}") && dom.documentElement.innerText.includes("{/html}"))
	{
		doc_text=dom.documentElement.innerText;
		let notice_target=dom.evaluate("//*[contains(.,'"+doc_text.substring(doc_text.search("{html}"),doc_text.search("{/html}"))+"{/html}"+"')]",dom,null, XPathResult.ANY_TYPE,null);
		let l,ltemp=true;
		while(ltemp)
		{
			l=ltemp;
			ltemp=notice_target.iterateNext();
		}
		l.outerHTML="<div class=\"cont1\">"+doc_text.substring(doc_text.search("{html}")+6,doc_text.search("{/html}"))+"</div>";
	}
	while(dom.documentElement.innerText.includes("{function}") && dom.documentElement.innerText.includes("{/function}"))
	{
		doc_text=dom.documentElement.innerText;
		let functions_output=dom.evaluate("//*[contains(.,'"+doc_text.substring(doc_text.search("{function}"),doc_text.search("{/function}"))+"{/function}"+"')]",dom,null,XPathResult.ANY_TYPE,null);
		let l,ltemp=true;
		while(ltemp)
		{
			l=ltemp;
			ltemp=functions_output.iterateNext();
		}
		l.outerHTML=window[doc_text.substring(doc_text.search("{function}")+10,doc_text.search("{/function}"))]();
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
	loading_show();

	if(style_loaded==0)
	{
		while(dom.documentElement.querySelector("style"))
		{
			document.getElementsByTagName("head")[0].insertAdjacentElement("beforeend",dom.documentElement.querySelector("style"));
		}
		style_loaded=1;
	}
	if(exec_noticeboard_script)
	{
		let frame_script=document.createElement("script");
		frame_script.setAttribute("type","text/javascript");
		frame_script.innerHTML=`
		request(\"`+notice_script_link+`\",\"notice_board_process_gs_request\",\"notices\",\"cont1\",\"\");
		`;
		document.getElementsByTagName('html')[0].appendChild(frame_script);
	}
	if(exec_video_style_script)
	{
		setTimeout(function(){
			loading_show();
			let video_drive_script=document.createElement("script");
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
				frame_elements[i].classList.remove(\"request_google_video\");
				i++;
			}
			`;
			document.getElementsByTagName('html')[0].appendChild(video_drive_script);
		},500);
	}
	if(exec_frame_style_script==1)
	{
		setTimeout(function(){
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
					if(frame_elements[i]){frame_elements[i].style.height=(frame_elements[i].offsetWidth*4/3)+"px";}
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
	if(exec_internal_page_script==1)
	{
		setTimeout(function(){
			var frame_script=document.createElement("script");
			frame_script.setAttribute("type","text/javascript");
			frame_script.innerHTML=`
			var internal_page_elements=document.getElementsByClassName('internal_page');
			var i;
			for(i=0;i<internal_page_elements.length;i++)
			{
				console.log(internal_page_elements[i]);
				internal_page_elements[i].style.height=(internal_page_elements[i].offsetWidth*569/960)+"px";
				window.addEventListener("resize",function()
				{
					if(internal_page_elements[i]){internal_page_elements[i].style.height=(internal_page_elements[i].offsetWidth*569/960)+"px";}
				});
			}
			i=internal_page_elements.length-1;
			while(internal_page_elements[i])
			{
				internal_page_elements[i].classList.remove(\"internal_page\");
				i--;
			}
			`;
			document.getElementsByTagName('html')[0].appendChild(frame_script);
		},500);
	}
	if(exec_presentation_style_script==1)
	{
		setTimeout(function(){
			var frame_script=document.createElement("script");
			frame_script.setAttribute("type","text/javascript");
			frame_script.innerHTML=`
			var presentation_elements=document.getElementsByClassName('external_presentation');
			var i;
			for(i=0;i<presentation_elements.length;i++)
			{
				presentation_elements[i].style.height=(presentation_elements[i].offsetWidth*569/960)+"px";
				window.addEventListener("resize",function()
				{
					if(presentation_elements[i]){presentation_elements[i].style.height=(presentation_elements[i].offsetWidth*569/960)+"px";}
				});
			}
			i=presentation_elements.length-1;
			while(presentation_elements[i])
			{
				presentation_elements[i].classList.remove(\"external_presentation\");
				i--;
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
			nested_doc_style_HTML+="{margin: 0;padding: revert;text-indent: revert;border: revert;color: revert;font-size: revert;font-weight: revert;font-family: revert;color: black;background-color: revert;text-decoration: revert;max-width: revert;}";
			nested_doc_style.innerHTML=nested_doc_style_HTML;
			if(!document.getElementsByTagName('head')[0].innerText.includes(nested_doc_style_HTML))
			{
				document.getElementsByTagName('head')[0].appendChild(nested_doc_style);
			}
		},500);
	}

	setTimeout(function(){
		var frame_script=document.createElement("script");
		frame_script.setAttribute("type","text/javascript");
		frame_script.innerHTML=`
		var inpage_a_elements=document.querySelectorAll("#`+doc_ele.getAttribute("id")+` a");
		for(var i of inpage_a_elements)
		{
			i.setAttribute("target","_blank");
		}
		`;
		document.getElementsByTagName('html')[0].appendChild(frame_script);
	},500);

	return;
}