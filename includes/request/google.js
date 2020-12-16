
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