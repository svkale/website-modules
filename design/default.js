const html_main=document.getElementsByTagName('main')[0],html_header=document.getElementsByTagName('header')[0],html_footer=document.getElementsByTagName('footer')[0];
html_main.style.minHeight=(window.innerHeight-html_header.scrollHeight-html_footer.scrollHeight)+"px";
window.addEventListener("resize",function()
{
	html_main.style.minHeight=(window.innerHeight-html_header.scrollHeight-html_footer.scrollHeight)+"px";
});