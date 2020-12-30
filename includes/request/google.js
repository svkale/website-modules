
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
function request_gsheet_published_single_cell(response_obj)
{
	return JSON.parse(response_obj.responseText.substring(28,response_obj.responseText.length-2)).feed.entry[0].content.$t;
}

// docs
function request_gdoc_published_inline_contents(response_obj)
{
	var response_doc=new DOMParser().parseFromString(response_obj.responseText,"text/html");
	var response_doc_headtags=response_doc.getElementsByTagName('head')[0].children;
	var put_data="";
	response_doc.getElementsByTagName('body')[0].style.backgroundColor="var(--main-color)";
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

//pages
function request_gsheet_page(response_obj)
{
	let gsheet_to_page="<section id=\"sheet_page_contents\" class=\"cont1\">",exec_video_drive_script=0,m="media1",l=0;
	const page_arr=JSON.parse(response_obj.response)["page_contents"];
	for(let i=0;i<page_arr.length;i++)
	{
		if(page_arr[i][0]=="document")
		{
			gsheet_to_page+="<article class=\"u1 putins gdoc_published_contents\" data-target-url=\""+page_arr[i][1]+"\" data-function-name=\"request_gdoc_published_inline_contents\"></article>";
		}
		else if(page_arr[i][0]=="video_youtube" || page_arr[i][0]=="video_drive")
		{
			if(l==1)
			{
				m="media1 media_lg2";
				l=0;
			}
			else if(page_arr[i+1])
			{
				if(page_arr[i+1][0]=="video_youtube" || page_arr[i+1][0]=="video_drive")
				{
					m="media1 media_lg2";
					l=1;
				}
			}
			if(m=="media1" || l==1)
			{
				gsheet_to_page+="<section class=\"u1\">";
			}
			gsheet_to_page+="<iframe class=\""+m+" request_google_video\" src=\""+page_arr[i][1]+"\" style=\"visibility: none;\" allow==\"accelerometer; autoplay; clipborad-white; encrypted-media; gyroscope; picture-in-picture\" allowfullscreen></iframe>";
			if(m=="media1" || l==0)
			{
				gsheet_to_page+="</section>";
			}
			exec_video_drive_script=1;
			m="media1";
		}
	}
	if(exec_video_drive_script==1)
	{
		setTimeout(function()
		{
			const video_drive_script=document.createElement("script");
			video_drive_script.setAttribute("type","text/javascript");
			video_drive_script.innerHTML=`
			let frame_videos=document.getElementsByClassName('request_google_video');
			for(let i=0;i<frame_videos.length;i++)
			{
				frame_videos[i].onload=function()
				{
					frame_videos[i].style.height=(frame_videos[i].offsetWidth*9/16)+"px";
					frame_videos[i].style.visibility="visible";
				};
				window.addEventListener("resize",function()
				{
					frame_videos[i].style.height=(frame_videos[i].offsetWidth*9/16)+"px";
				});
			}
			putins_load("sheet_page_contents");
			`;
			document.getElementsByTagName('html')[0].appendChild(video_drive_script);
		},500);
	}
	gsheet_to_page+="</section>";
	return gsheet_to_page;
}
function request_gsheet_site()
{

}