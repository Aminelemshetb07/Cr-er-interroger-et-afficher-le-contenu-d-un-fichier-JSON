myArray = [];
const SORTUP = document.querySelectorAll('.sortUp');
// <=========  response data in json file =============>
let xhttp = new XMLHttpRequest;
xhttp.onreadystatechange = function() {
    if(this.readyState == 4 && this.status == 200){
        myArray = JSON.parse(this.response);
        buildTable(myArray)
    }
}
xhttp.open("GET","employee.json", true);
xhttp.send();
// <=========  builde table data json =============>
function buildTable(data){
    let table = document.getElementById('myTable')
    table.innerHTML = "";
    for (let i = 0; i < data.length; i++){
        let festivals= "";
        let acteurs = "";
        // for loop festivales 
        for(let k = 0;k<data[i].festivale.length;k++){
            festivals += `<p>${data[i].festivale[k]}</p>`;
        }
        // for loop acteurs 
        for(let a = 0; a<data[i].acteur.length; a++){
            acteurs += `<p>${data[i].acteur[a].nom} ${data[i].acteur[a].prénom}, ${data[i].acteur[a].nationalité}</p>`
        }
        let row = `<tr>
                        <td>${data[i].titre}</td>
                        <td>${data[i].réalisateur}</td>
                        <td>${data[i].dureé} minutes</td>
                        <td>${data[i].dateProdaction}</td>
                        <td>
                        <img src="${data[i].image}" alt="image" class="img-fluid" width="100"> 
                        </td>
                        <td>${festivals}</td>
                        <td >${acteurs}</td>
                    </tr>`
        table.innerHTML += row;
    }
}
// <========= function search keyup  in input =======>
$('#searchInput').on('keyup', function(){
    let value = $(this).val();
    console.log('value:', value)
    let data = searchTable(value, myArray)
    buildTable(data)
});
buildTable(myArray)
// <========= function search keyup in table data =======>
function searchTable(value, data){
    let filterData = [];
    for (let i = 0; i < data.length; i++){
        value = value.toLowerCase()
        let titre = data[i].titre.toLowerCase()

        if (titre.includes(value)){
            filterData.push(data[i])
        }
    }
    return filterData
}
// <========= function sort on click any <th>  =======>
$('th').on('click', function(){
    let column = $(this).attr('data-colmun')
    let order = $(this).data('order')
    let text = $(this).html()
    text = text.substring(0, text.length -1)
    if (order == 'desc'){
        $(this).data('order', "asc")
        console.log("UP")
        myArray.sort((a,b) => a[column] > b[column] ? 1 : -1)
        text += '&#9660'
    }else{
        $(this).data('order', "desc")
        console.log("DOWN")
        myArray.sort((a,b) => a[column] < b[column] ? 1 : -1)
        text += '&#9650'
    }
    $(this).html(text)
    console.log(column)
    buildTable(myArray)
})






