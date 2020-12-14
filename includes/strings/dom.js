function string_get_element_from_path(root_element,path)
{
	let required_element=root_element;
	while(path!="")
	{
		if(path.startsWith("parent"))
		{
			required_element=required_element.parentElement;
			path=path.replace("parent_","");
		}
		else if(path.startsWith("previous"))
		{
			required_element=required_element.previousElementSibling;
			path=path.replace("previous_","");
		}
		else if(path.startsWith("next"))
		{
			required_element=required_element.nextElementSibling;
			path=path.replace("next_","");
		}
		else if(path.startsWith("child"))
		{
			required_element=required_element.children[parseInt(path.substr(6,path.substr(6).search("_")))];
			path=path.replace("child_"+path.substr(6,path.substr(6).search("_"))+"_","");
		}
	}
	return required_element;
}