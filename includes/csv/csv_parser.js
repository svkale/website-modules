class csv_parser
{
	constructor()
	{
		return;
	}
	parse_from_string_m1(csv_str,del1,del2,container)
	{
		if(del1==del2 || del1==container || del2==container)
		{
			console.error(del1,del2,del3,"These should be all different.");
			return;
		}
		const csv_array=[];
		var s=csv_str.concat(del2);
		while(s.includes(del2))
		{
			const row=[];
			var c1=true;
			while(c1==true)
			{
				if(s[0]!=container)
				{
					if(s.search(del1)!=-1)
					{
						if(s.search(del1)<s.search(del2))
						{
							row.push(s.substring(0,s.indexOf(del1)));
							s=s.substring(s.indexOf(del1)+1);
						}
						else
						{
							row.push(s.substring(0,s.indexOf(del2)));
							s=s.substring(s.indexOf(del2)+1);
							c1=false;
						}
					}
					else
					{
						row.push(s.substring(0,s.indexOf(del2)));
						s=s.substring(s.indexOf(del2)+1);
						c1=false;
					}
				}
				else
				{
					var c2=true;
					var index_ll=0;
					while(c2==true)
					{	
						if(s[s.indexOf(container,index_ll+1)+1]==container)
						{
							index_ll=s.indexOf(container,index_ll+1)+1;
						}
						else
						{
							if(s[s.indexOf(container,index_ll+1)+1]==del1)
							{
								row.push(s.substring(1,s.indexOf(container,index_ll+1)).replaceAll("\"\"","\""));
								s=s.substring(s.indexOf(del1,index_ll+1)+1);
							}
							else
							{
								row.push(s.substring(1,s.indexOf(container,index_ll+1)).replaceAll("\"\"","\""));
								s=s.substring(s.indexOf(del2,index_ll+1)+1);
								c1=false;
							}
							c2=false;
						}
					}
				}
			}
			csv_array.push(row);
		}
		return csv_array;
	}
}