


function put_hitcount(request_obj,params)
{
	params[0].innerHTML=request_gsheet(request_obj)[0].content.$t;
}
for(var i=0;i<document.querySelectorAll("[data-ssheet-url]").length;i++)
{
	request(document.querySelectorAll("[data-ssheet-url]")[i].getAttribute("data-ssheet-url"),"put_hitcount",document.querySelectorAll("[data-ssheet-url]")[i]);
}


function show_gdoc(request_obj,params)
{
	var xmlDoc = new DOMParser().parseFromString(request_gdoc(request_obj),"text/html");
	params[0].insertAdjacentHTML("beforeend",xmlDoc.getElementsByTagName('head')[0].innerHTML);
	params[0].insertAdjacentHTML("beforeend",xmlDoc.getElementsByTagName('body')[0].innerHTML);
}
for(var i=0;i<document.querySelectorAll("[data-doc-url]").length;i++)
{
	request(document.querySelectorAll("[data-doc-url]")[i].getAttribute("data-doc-url"),"request_gdoc_show",document.querySelectorAll("[data-doc-url]")[i]);
}
