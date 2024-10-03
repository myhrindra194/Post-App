function formateDate(myDate){
    myDate = myDate.split(" ");
    let formatDate = myDate[0].split("/").reverse().join("-");
    return [formatDate, myDate[1]].join("T");
}

export function filterList(myList, query, filterId){
    query = query.toLowerCase();
    myList = myList.filter(item => 
        item.content.toLowerCase().includes(query) ||
        item.title.toLowerCase().includes(query)    
    )

    switch (filterId){
        case "1":
            return myList.sort((a, b) => a.title < b.title ? -1: 1);
        case "2":
            return myList.sort((a, b) => new Date(formateDate(a.publishedAt)) > new Date(formateDate(b.publishedAt)) ? -1: 1);
        case "3":
            return myList.sort((a, b) => new Date(formateDate(a.updatedAt)) > new Date(formateDate(b.updatedAt)) ? -1: 1);
        default:
            return myList;
    }
}





    