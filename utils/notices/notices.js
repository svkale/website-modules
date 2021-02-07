var notices_obj,notices_classlist,target_ele_id;
function notice_board_process_gs_request(request_obj,params)
{
	notices_classlist=undefined;
	notices_obj=JSON.parse(request_obj.response);
	console.log(notices_obj,params);
	target_ele_id=params[0];
	if(params[1])
	{
		notices_classlist=params[1];
	}
	if(params[2]=="")
	{
		notice_board_show_replace();
	}
	else
	{
		document.getElementById(target_ele_id).innerHTML="";
		notice_board_show();
	}
}
function notice_board_show()
{
	for(let i in notices_obj)
	{
		if(i.endsWith("_notices"))
		{
			notice_board_paste(i);
		}
	}
	return;
}
function notice_board_show_replace()
{
	for(let i in notices_obj)
	{
		if(i.endsWith("_notices"))
		{
			notice_board_replace(i);
		}
	}
}

function notice_board_replace(notice_board_heading)
{
	let notices_board=document.getElementById(notice_board_heading);
	console.log(notices_board,notice_board_heading);
	if(notices_classlist)
	{
		notices_board.setAttribute("class",notices_classlist);
	}
	notices_board.classList.add("notice_board");
	notices_board.innerHTML=notice_board_post(notice_board_heading.substring(0,notice_board_heading.length-8));
}
function notice_board_paste(notice_board_heading)
{
	let notices_board=document.createElement("section");
	notices_board.setAttribute("id",notice_board_heading);
	if(notices_classlist)
	{
		notices_board.setAttribute("class",notices_classlist);
	}
	notices_board.classList.add("notice_board");
	let p=notice_board_heading.substring(0,notice_board_heading.length-8);
	if(notices_obj[p+"_page_number"])
	{
		notices_board.insertAdjacentHTML("beforeend","<button><span>Previous Page</span></button><button><span>Next Page</span></button>");
	}
	notices_board.insertAdjacentHTML("beforeend",notice_board_post(p));
	if(notices_obj[p+"_page_number"])
	{
		notices_board.insertAdjacentHTML("beforeend","<div align=\"center\"><button><span>Previous Page</span></button><button><span>Next Page</span></button></div>");
	}
	document.getElementById(target_ele_id).insertAdjacentElement('afterbegin',notices_board);
}
function notice_board_post(p)
{
	const notices=notices_obj[p+"_notices"],notices_count=notices_obj[p+"_notices_count"];
	let notices_str="<h4 style=\"color: var(--main-color);\">Notices ("+p.replaceAll("_"," ")+")</h4>";
	for(let i=notices.length-1;i>=0;i--)
	{
		notices_str+="<article class='cont1 notice'><big><b onclick='notice_show_with_no(event.target.getAttribute(\"data-notice-group\"),event.target.getAttribute(\"data-notice-number\"));' data-notice-group='"+p+"_notices"+"' data-notice-number='"+i+"'>"+notices[i][4]+"</b></big><hr><div class='notices_author'>by "+notices[i][1]+"</div><div class='notices_date'>on "+notices[i][2].slice(notices[i][2].length-2)+"/"+notices[i][2].slice(notices[i][2].length-4,notices[i][2].length-2)+"/"+notices[i][2].slice(0,notices[i][2].length-4)+"</div><br><div class='notices_for'>The notice is for "+notice_get_students_group(notices[i][5])+".</div></article>";
	}
	return notices_str+"<hr style='float: left;'><div class='notices_count'>Total "+notices_count+" notices found.</div>";

}
function notice_show_with_no(notice_group,notice_number)
{
	window.scrollTo(0,0);
	document.getElementById(target_ele_id).style.display="none";
	let notice_container=document.createElement("section");
	notice_container.setAttribute("class","u1 notice");
	notice_container.insertAdjacentHTML("beforeend","<big><b onclick='document.getElementById(\""+target_ele_id+"\").style.display=\"revert\";document.getElementsByClassName(\"notice\")[document.getElementsByClassName(\"notice\").length-1].outerHTML=\"\";'>Back</b></big>");
	let notice_sec=document.createElement("section");
	notice_sec.setAttribute("class","cont1 notice_full");
	notice_sec.insertAdjacentHTML("beforeend","<img class=\"cont1\" src=\""+document.getElementsByTagName('header')[0].getElementsByTagName('img')[0].src+"\">");
	// if(notices_obj["notice_heading"])
	// {
	// 	notice_sec.insertAdjacentHTML("beforeend","<h4 style=\"color: revert;text-align: center;\">"+notices_obj["notice_heading"]+"</h4>");
	// }
	notice_sec.insertAdjacentHTML("beforeend","<hr style=\"float: left;\"><br><div style=\"position: relative;\"><div class='notices_reg_no'>Ref: "+notice_group.split("_")[0]+"/"+notices_obj[notice_group][notice_number][0]+"</div><div class='notices_date'>Date: "+notices_obj[notice_group][notice_number][2].slice(notices_obj[notice_group][notice_number][2].length-2)+"/"+notices_obj[notice_group][notice_number][2].slice(notices_obj[notice_group][notice_number][2].length-4,notices_obj[notice_group][notice_number][2].length-2)+"/"+notices_obj[notice_group][notice_number][2].slice(0,notices_obj[notice_group][notice_number][2].length-4)+"</div></div><div class=\"u1 notice_cent_div\"><b><big>NOTICE</big></b></div><div class=\"u1 notice_cent_div\">"+notice_get_students_group(notices_obj[notice_group][notice_number][5]).toUpperCase()+"</div><div class=\"u1 notice_cent_div\"><b>"+notices_obj[notice_group][notice_number][4]+"</b></div>");
	let notice_str="<article class='cont1 notice_contents'><br>";
	for(let i=8;i<8+parseInt(notices_obj[notice_group][notice_number][7]);i++)
	{
		notice_str+=notices_obj[notice_group][notice_number][i];
	}
	notice_str+="<br><br></article>";
	notice_sec.insertAdjacentHTML("beforeend",notice_str);
	notice_sec.insertAdjacentHTML("beforeend","<div class='notices_author'>From "+notices_obj[notice_group][notice_number][1]+"</div>");
	notice_container.insertAdjacentElement("beforeend",notice_sec);
	notice_container.insertAdjacentHTML("beforeend","<button style=\"float: left;\" onclick=\"var wind=window.open();wind.document.write(document.getElementsByClassName('notice_full')[0].outerHTML+'<style>*{font-size: 1.1em !important;float: none !important;}</style>'+document.getElementById('notices_css').outerHTML+document.getElementById('layout_css').outerHTML+document.getElementById('default_css').outerHTML);wind.print();\"><span>Print Notice</span></button>");
	document.getElementById(target_ele_id).insertAdjacentElement("afterend",notice_container);
	// history.pushState("","","/notices/"+notice_group.substring(0,notice_group.length-8).replaceAll("_","-")+"/"+notices_obj["current_year"]+"/"+notices_obj[notice_group][notice_number][0]);
	return;
}

function notice_get_students_group(student_group)
{
	if(student_group=="all all all")
	{
		return "all students";
	}
	else if(student_group.includes("all"))
	{
		return student_group.replaceAll("all","").replaceAll("  "," ").trim()+" students";
	}
	return student_group.trim()+" students";
}
function notice_get_students_group_streamwise(student_group)
{
	if(student_group=="all all")
	{
		return "all students";
	}
	else if(student_group.includes("all"))
	{
		return student_group.replaceAll("all","").replaceAll("  "," ").trim()+" students";
	}
	return student_group.trim()+" students";
}


function notice_parse(notice)
{
	let notice_container=document.createElement("section");
	notice_container.setAttribute("class","u1 notice");
	let notice_sec=document.createElement("section");
	notice_sec.setAttribute("class","cont1 notice_full");
	console.log(document,window);
	const img_src=document.querySelectorAll('img')[0].getAttribute("src");
	notice_sec.insertAdjacentHTML("beforeend","<img class=\"cont1\" src=\""+img_src+"\"><hr style=\"float: left;\"><br><div style=\"position: relative;\"><div class='notices_reg_no'>Ref: "+location.pathname.split("/")[2]+"/"+notice[0]+"</div><div class='notices_date'>Date: "+notice[2].slice(notice[2].length-2)+"/"+notice[2].slice(notice[2].length-4,notice[2].length-2)+"/"+notice[2].slice(0,notice[2].length-4)+"</div></div><div class=\"u1 notice_cent_div\"><b><big>NOTICE</big></b></div><div class=\"u1 notice_cent_div\">"+notice_get_students_group(notice[5]).toUpperCase()+"</div><div class=\"u1 notice_cent_div\"><b>"+notice[4]+"</b></div>");
	let notice_str="<article class='cont1 notice_contents'><br>";
	for(let i=8;i<8+parseInt(notice[7]);i++)
	{
		notice_str+=notice[i];
	}
	notice_str+="<br><br></article>";
	notice_sec.insertAdjacentHTML("beforeend",notice_str);
	notice_sec.insertAdjacentHTML("beforeend","<div class='notices_author'>From "+notice[1]+"</div>");
	notice_container.insertAdjacentElement("beforeend",notice_sec);
	notice_container.insertAdjacentHTML("beforeend","<button style=\"float: left;\" onclick=\"var wind=window.open();wind.document.write(document.getElementsByClassName('notice_full')[0].outerHTML+'<style>*{font-size: 1.1em !important;float: none !important;}</style>'+document.getElementById('notices_css').outerHTML+document.getElementById('layout_css').outerHTML+document.getElementById('default_css').outerHTML);wind.print();\"><span>Print Notice</span></button>");
	// history.pushState("","","/notices/"+notice_group.substring(0,notice_group.length-8).replaceAll("_","-")+"/"+notices_obj["current_year"]+"/"+notice[0]);
	return notice_container;
}