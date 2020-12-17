if(document.querySelectorAll('body>div.header_each_page')[0])
{
	document.querySelectorAll('body>div.header_each_page>table>thead>tr>td')[0].style.height=document.querySelectorAll('body>div.header_each_page>header')[0].offsetHeight+12+"px";
}
if(document.querySelectorAll('body>div.footer_each_page')[0])
{
	document.querySelectorAll('body>div.footer_each_page>table>tfoot>tr>td')[0].style.height=document.querySelectorAll('body>div.footer_each_page>footer')[0].offsetHeight+12+"px";
}