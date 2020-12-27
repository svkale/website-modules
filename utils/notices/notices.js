var notices_obj,notices_target_ele_id,notices_classlist;
function notice_board_process_gs_request(request_obj,params)
{
	notices_classlist=undefined;
	notices_obj=JSON.parse(request_obj.response);
	console.log(notices_obj);
	target_ele_id=params[0];
	if(params[1])
	{
		notices_classlist=params[1];
	}
	notice_board_show();
}
function notice_board_show()
{
	document.getElementById(target_ele_id).innerHTML="";
	for(let i in notices_obj)
	{
		if(i.endsWith("_notices"))
		{
			let notices_board=document.createElement("section");
			notices_board.setAttribute("id",i);
			if(notices_classlist)
			{
				notices_board.setAttribute("class",notices_classlist);
			}
			notices_board.classList.add("notice_board");
			notices_board.innerHTML=notice_board_post(i.substring(0,i.length-8));

			document.getElementById(target_ele_id).insertAdjacentElement('afterbegin',notices_board);
		}
	}
	return;
}
function notice_board_post(p)
{
	const notices=notices_obj[p+"_notices"];
	var notices_str="<h4>Notices from "+p[0].toUpperCase()+p.substring(1).replaceAll("_"," ")+"</h4>";
	for(let i=notices.length-1;i>=0;i--)
	{
		notices_str+="<article class='cont1 notice'><big><b onclick='notice_show_with_no(event.target.getAttribute(\"data-notice-group\"),event.target.getAttribute(\"data-notice-number\"));' data-notice-group='"+p+"_notices"+"' data-notice-number='"+i+"'>"+notices[i][4]+"</b></big><hr><span class='notices_author'>by "+notices[i][1]+"</span><span class='notices_date'>on "+notices[i][2].slice(notices[i][2].length-2)+"/"+notices[i][2].slice(notices[i][2].length-4,notices[i][2].length-2)+"/"+notices[i][2].slice(0,notices[i][2].length-4)+"</span><br><span class='notices_for'>The notice is for "+notice_get_students_group(notices[i][5])+".</span></article><hr><hr>";
	}
	return notices_str.substring(0,notices_str.length-4);

}
function notice_show_with_no(notice_group,notice_number)
{
	document.getElementById(target_ele_id).innerHTML="";
	let notice_container=document.createElement("section");
	notice_container.setAttribute("class","u1 notice");
	notice_container.insertAdjacentHTML("beforeend","<big><b onclick='history.pushState(\"\",\"\",\"/\");notice_board_show();'>Back</b></big>");
	let notice_sec=document.createElement("section");
	notice_sec.setAttribute("class","cont1 notice_full");
	notice_sec.insertAdjacentHTML("beforeend","<span class='notices_date'>Date: "+notices_obj[notice_group][notice_number][2].slice(0,2)+"/"+notices_obj[notice_group][notice_number][2].slice(2,4)+"/"+notices_obj[notice_group][notice_number][2].slice(4)+"</span><span class='notices_author'>From "+notices_obj[notice_group][notice_number][1]+"</span><span class='notices_reg_no'>Reg. no.: "+notices_obj[notice_group][notice_number][0]+"</span>");
	let notice_str="<article class='cont1 notice_contents'>";
	for(let i=8;i<8+parseInt(notices_obj[notice_group][notice_number][7]);i++)
	{
		notice_str+=notices_obj[notice_group][notice_number][i];
	}
	notice_str+="</article>";
	notice_sec.insertAdjacentHTML("beforeend",notice_str);
	notice_sec.insertAdjacentHTML("beforeend","<span class='notices_for'>This notice is for "+notice_get_students_group(notices_obj[notice_group][notice_number][5])+" students.</span>");
	notice_container.insertAdjacentElement("beforeend",notice_sec);
	document.getElementById(target_ele_id).insertAdjacentElement("beforeend",notice_container);
	history.pushState("","","/notices/"+notice_group.substring(0,notice_group.length-8).replaceAll("_","-")+"/"+notices_obj["current_year"]+"/"+notices_obj[notice_group][notice_number][0]);
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