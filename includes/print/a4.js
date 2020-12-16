var page=document.querySelectorAll('div.page')[0],header=document.querySelectorAll('header.header_each_page')[0];
if(header)
{
	if(split_to_pages(page))
	{

	}
}

function split_to_pages(page)
{
	if(page.scrollHeight>page.offsetHeight)
	{
		
	}
	else
	{
		return false;
	}
}