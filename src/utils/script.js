function formateDate(myDate){
    myDate = myDate.split(" ");
    let formatDate = myDate[0].split("/").reverse().join("-");
    return new Date([formatDate, myDate[1]].join("T"));
}

export function filterList(myList, query, filterId){
    query = query.toLowerCase();
    myList = myList.filter(item => 
        item.content.toLowerCase().includes(query) || item.title.toLowerCase().includes(query)    
    )

    switch (filterId){
        case "1":
            return myList.sort((a, b) => a.title < b.title ? -1: 1);
        case "2":
            return myList.sort((a, b) => formateDate(a.publishedAt) > formateDate(b.publishedAt) ? -1: 1);
        case "3":
            return myList.sort((a, b) => formateDate(a.updatedAt) > formateDate(b.updatedAt) ? -1: 1);
        default:
            return myList;
    }
}





    