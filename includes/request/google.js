
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
	let gsheet_to_page="",exec_video_drive_script=0;
	const page_arr=JSON.parse(response_obj.response)["page_contents"];
	for(let i=0;i<page_arr.length;i++)
	{
		if(page_arr[i][0]=="video_drive")
		{
			gsheet_to_page+="<iframe class=\"media1 request_google_video_drive\" src=\"https://drive.google.com/file/d/"+page_arr[i][1]+"/preview\" style=\"visibility: none;\" allowfullscreen=\"true\"></iframe>";
			exec_video_drive_script=1;
		}
		else if(page_arr[i][0]=="")
		{
			gsheet_to_page+="<div class=\"u1 putins\" data-target-url=\""+page_arr[i][1]+"\" data-function-name=\"request_gdoc_published_inline_contents\"></div>";
		}
	}
	console.log(exec_video_drive_script);
	if(exec_video_drive_script==1)
	{
		setTimeout(function()
		{
			const video_drive_script=document.createElement("script");
			video_drive_script.setAttribute("type","text/javascript");
			video_drive_script.innerHTML=`
			let drive_videos=document.getElementsByClassName('request_google_video_drive');
				for(let i=0;i<drive_videos.length;i++)
				{
					drive_videos[i].onload=function()
					{
						drive_videos[i].style.height=(drive_videos[i].offsetWidth*9/16)+"px";
						drive_videos[i].style.visibility="visible";
					};
					window.addEventListener("resize",function()
					{
						drive_videos[i].style.height=(drive_videos[i].offsetWidth*9/16)+"px";
					});
				}
			`;
			document.getElementsByTagName('html')[0].appendChild(video_drive_script);
		},500);
	}
	return gsheet_to_page;
}