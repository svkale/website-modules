function form_JSON_send(form)
{
	let form_submit_url=form.getAttribute("data-form-submit-target");
	console.log(form_submit_url,JSON.stringify(form_JSON_string_data(form)));
	request_post_promise(form_submit_url,JSON.stringify(form_JSON_string_data(form)),2)
		.then(
			(res)=>
			{
				if(form.getAttribute("data-custom-JSON-to-send-file"))
				{
					form_JSON_file_data(form)
						.then(
							(file)=>
							{
								var id=JSON.parse(res.response).id,info=JSON.parse(res.response).information_status;
								request_post_promise(form_submit_url,JSON.stringify({...file,...{"id": id,"information_status": info}}),2)
									.then(
										(final_result)=>
										{
											form_finalize(JSON.parse(final_result.response));
										},
										(error)=>
										{
											alert(error);
											console.error(error);
										}
									);
							},
							(error)=>
							{
								alert(error);
								console.error(error);
							}
						);
				}
				else
				{
					var id=JSON.parse(res.response).id,info=JSON.parse(res.response).information_status;
					form_finalize(JSON.parse(JSON.stringify({"id": id,"information_status": info})));
				}
			},
			(error)=>
			{
				alert(error);
				console.error(error);
			}
		);
	return;
}

function form_JSON_string_data(form)
{
	let form_str_JSON={};
	form_str_JSON["select"]={};
	form_str_JSON["textarea"]={};
	form_str_JSON["div"]={};
	form_str_JSON["input"]={};
	form_str_JSON["input"]["text"]={};
	form_str_JSON["input"]["email"]={};
	form_str_JSON["input"]["tel"]={};
	form_str_JSON["input"]["radio"]={};
	form_str_JSON["input"]["checkbox"]={};
	form_str_JSON["input"]["checkbox"]["checked"]=[];
	form_str_JSON["input"]["checkbox"]["unchecked"]=[];
	for(let form_element of form)
	{
		if(form_element.tagName=="SELECT")
		{
			form_str_JSON["select"][form_element.name]=form_element.value;
		}
		else if(form_element.tagName=="TEXTAREA")
		{
			form_str_JSON["textarea"][form_element.name]=form_element.value;
		}
		else if(form_element.tagName=="INPUT")
		{
			if(form_element.type=="text")
			{
				form_str_JSON["input"]["text"][form_element.name]=form_element.value;
			}
			else if(form_element.type=="email")
			{
				form_str_JSON["input"]["email"][form_element.name]=form_element.value;
			}
			else if(form_element.type=="tel")
			{
				form_str_JSON["input"]["tel"][form_element.name]=form_element.value;
			}
			else if(form_element.type=="radio" && form_element.checked==true)
			{
				form_str_JSON["input"]["radio"][form_element.name]=form_element.value;
			}
			else if(form_element.type=="checkbox")
			{
				if(form_element.checked==true)
				{
					form_str_JSON["input"]["checkbox"]["checked"].push(form_element.name);
				}
				else
				{
					form_str_JSON["input"]["checkbox"]["unchecked"].push(form_element.name);
				}
			}
		}
	}
	var form_divs=form.querySelectorAll("div[contenteditable='true']");
	for(let form_div of form_divs)
	{
		form_str_JSON["div"][form_div.getAttribute("name")]=form_div.innerHTML;
	}
	if(form.getAttribute("data-custom-JSON-to-send-string"))
	{
		return {...form_str_JSON,...JSON.parse(form.getAttribute("data-custom-JSON-to-send-string"))};
	}
	else
	{
		return form_str_JSON;
	}
}
function form_JSON_file_data(form)
{
	return new Promise((resolve,reject)=>
	{
		var form_file_JSON={},form_files=form.querySelectorAll('input[type="file"]');
		for(let j=0;j<form_files.length;j++)
		{
			form_file_JSON[form_files[j].name]=[];
			let form_file_all=form_files[j].files;
			if(j==form_files.length-1)
			{
				var count=0,climit=form_file_all.length;
			}
			for(let i=0;i<form_file_all.length;i++)
			{
				form_file_JSON[form_files[j].name][i]={};
				let filereader=new FileReader();
				filereader.readAsArrayBuffer(form_file_all[i]);
				filereader.addEventListener("load",function()
				{
					form_file_JSON[form_files[j].name][i]["file_bytes"]=[...new Int8Array(this.result)];
					form_file_JSON[form_files[j].name][i]["file_mimetype"]=form_file_all[i].type;
					form_file_JSON[form_files[j].name][i]["file_size"]=form_file_all[i].size;
					count++;
					if(count==climit)
					{
						if(form.getAttribute("data-custom-JSON-to-send-file"))
						{
							return resolve({...form_file_JSON,...JSON.parse(form.getAttribute("data-custom-JSON-to-send-file"))});
						}
						else
						{
							return resolve(form_file_JSON);
						}
					}
				});
				filereader.addEventListener("error",function()
				{
					return reject(form_file_JSON);
				});
			}
		}
	});
}

function form_add_input(event,list)
{
	event.preventDefault();
	let number=parseInt(list.getAttribute('data-form-input-number'))+1,html=list.getAttribute('data-form-input-template');
	list.setAttribute('data-form-input-number',number);
	list.getElementsByTagName('button')[0].insertAdjacentHTML("beforebegin",html.replace(/%%num%%/g,number));
	return;
}
function form_remove_input(event,list)
{
	event.preventDefault();
	let number=parseInt(list.getAttribute('data-form-input-number')),min_number=parseInt(list.getAttribute('data-form-input-min-number'));
	if(number==min_number)
	{
		alert("At least "+min_number+" element/s should be present.");
		return;
	}
	list.setAttribute('data-form-input-number',number-1);
	list.querySelectorAll("input[name='"+list.getAttribute('data-form-input-name')+'_'+number+"']")[0].parentElement.outerHTML="";
	return;
}

function form_wait(form)
{
	form.style.display="none";
	var response_div=document.createElement("div");
	response_div.setAttribute("id","form_response");
	form.parentNode.insertBefore(response_div,form.nextSibling);
	var rotating=document.createElement("div");
	rotating.style.width="50%";
	var w=rotating.scrollWidth+"px";
	rotating.style.height=w;
	rotating.style.height=w;
	setTimeout(function(rotating)
	{
		var w=rotating.scrollWidth+"px";
		rotating.style.height=w;
		rotating.style.width=w;
	},100,rotating);
	rotating.style.marginLeft="25%";
	rotating.style.border="3vw solid";
	rotating.style.borderRadius="50%";
	rotating.style.borderColor="red indigo green yellowgreen";
	rotating.style.animation="rotate_z_full 4s infinite";
	response_div.appendChild(rotating);
	response_div.insertAdjacentHTML("beforeend","<h4 align='center'>Please wait!<br>Your form is being processed</h4>");
	return;
}
function form_finalize(response)
{
	var response_div=document.getElementById('form_response');
	console.log(response);
	response_div.innerHTML="The 'id' for your request is: <strong>"+response["id"]+"</strong>.<br>"+response["information_status"];
	if(response["file_status"])
	{
		response_div.insertAdjacentHTML("beforeend","<br>"+response["file_status"]);
	}
	return;
}