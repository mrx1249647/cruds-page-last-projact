let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let submit = document.getElementById("submit");
let mood = 'create'
let datapro;
let tmp;

if(localStorage.prodact != null){
    datapro = JSON.parse(localStorage.prodact)
}
else {
    datapro = [] ;
}
function getTotal(){
if (price.value != ''){
    let result = (+price.value + +taxes.value + +ads.value) - discount.value;
    total.innerHTML = result;
    total.style.background = '#019c01'
}
else{
    total.innerHTML = '';
    total.style.background = '#a00402'
}
}
submit.onclick = function(){
let newPro = {
    title:title.value,
    price:price.value,
    taxes:taxes.value,
    ads:ads.value,
    discount:discount.value,
    total:total.innerHTML,
    count:count.value,
    category:category.value,
}
if(title.value != `` && price.value != `` && category.value != `` && newPro.count < 100){
  if(mood === 'create'){
    if(newPro.count > 1){
        for( let i = 0 ; i < newPro.count ; i++ ){
            datapro.push(newPro);
        }
        }
        else{
            datapro.push(newPro);
        }
}
else{
    datapro[  tmp  ] = newPro;
    mood = 'create';
    submit.innerHTML = 'create';
    count.style.display = 'block';
}
 clearinput();
}
else{
   alert("your input is empty be carfull")
}
localStorage.setItem('prodact',JSON.stringify(datapro))
showData();
}
function clearinput(){
    title.value = '';
    price.value = '';
    taxes.value = '';
    ads.value = '';
    discount.value = '';
    count.value = '';
    category.value = '';
    total.innerHTML='';
    total.style.background = '#a00402'
}
function showData(){
    getTotal();
    let table = '';
for(let i = 0 ; i < datapro.length ; i++ ){
table += `<tr>
<td>${i+1}</td>
<td>${datapro[i].title}</td>
<td>${datapro[i].price}</td>
<td>${datapro[i].taxes}</td>
<td>${datapro[i].ads}</td>
<td>${datapro[i].category}</td>
<td>${datapro[i].discount}</td>
<td>${datapro[i].total}</td>
<td><button onclick="updateData(${i})" id="update">update</button></td>
<td><button onclick="deleteData(${i})" id="delete">delete</button></td>
</tr>`
}

    document.getElementById('tbody').innerHTML = table;
    let btnDelete = document.getElementById("deleteAll");
    if(datapro.length > 0){
      
        btnDelete.innerHTML = `<button onclick="deleteAll()">Delete All (${datapro.length})</button> `
    }
    else{
        btnDelete.innerHTML = '';

    }
    
}
function deleteData(i){
datapro.splice(i,1);
localStorage.prodact = JSON.stringify(datapro);
showData();
}
function deleteAll(){
    localStorage.clear()
    datapro.splice(0)
    showData()
}

function updateData(i){

   title.value = datapro[i].title;
price.value = datapro[i].price;
taxes.value = datapro[i].taxes;
ads.value = datapro[i].ads;
discount.value = datapro[i].discount;
getTotal();
count.style.display = 'none';
category.value = datapro[i].category;
submit.innerHTML = 'update';
mood = 'update'
tmp = i;
scroll({
    top: 0 ,
    behavior:"smooth",
})
}
function search(searchTerm){
    var cartona = ``;
for(let i = 0 ; i < datapro.length ; i++){
    if(datapro[i].title.toLowerCase().includes(searchTerm.toLowerCase()) == true ){
        cartona += `<tr>
        <td>${i+1}</td>
        <td>${datapro[i].title}</td>
        <td>${datapro[i].price}</td>
        <td>${datapro[i].taxes}</td>
        <td>${datapro[i].ads}</td>
        <td>${datapro[i].category}</td>
        <td>${datapro[i].discount}</td>
        <td>${datapro[i].total}</td>
        <td><button onclick="updateData(${i})" id="update">update</button></td>
        <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
        </tr>`

    }else{
        console.log("no resulte");
    }
    document.getElementById('tbody').innerHTML = cartona ;
}

}
showData();