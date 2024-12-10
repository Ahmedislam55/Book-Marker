var add = document.querySelector('#addProduct');
var nameProduct = document.querySelector('#nameProduct');
var urlProduct = document.querySelector('#urlProduct');
var productContainer;
var tableBody = document.querySelector('#tbody');
var btnSearch = document.querySelector('#search');
var btnUpdate = document.querySelector('#UpdateProduct');
var currentUpdateIndex = -1; 
if (localStorage.getItem('product') != null) {
    productContainer = JSON.parse(localStorage.getItem('product'));
    displayProduct(productContainer);
} else {
    productContainer = [];
}

function addProduct() {
    if(validationName()==true && validationUrl()==true)
    {
        var product = {
            name: nameProduct.value,
            url: urlProduct.value
        };
        productContainer.push(product);
        localStorage.setItem('product', JSON.stringify(productContainer));
        displayProduct(productContainer);
        clearProduct();

    }

}
add.addEventListener('click', addProduct);

function clearProduct() {
    nameProduct.value = "";
    urlProduct.value = "";
}

function displayProduct(productList) {
    cartoon = ``;
    for (var i = 0; i < productList.length; i++) {
        cartoon += `<tr>
          <td>${i + 1}</td>
          <td>${productList[i].name}</td>
          <td><a href="https://${productList[i].url}" class="btn btn-outline-primary btn-sm" target="_blank">Visit</a>
           <td>
            <button onclick="setFormUpdate(${i})" class="btn btn-outline-warning btn-sm">Update</button>
            <button id="delete" onclick="deleteProduct(${i})" class="btn btn-outline-danger btn-sm">Delete</button>
          </td>
        </tr>`;
    }
    tableBody.innerHTML = cartoon;
}

function searchProduct(searchTerm) {
    var searchResult = [];
    for (var i = 0; i < productContainer.length; i++) {
        if (productContainer[i].name.toLowerCase().includes(searchTerm.trim().toLowerCase())) {
            searchResult.push(productContainer[i]);
        }
    }
    displayProduct(searchResult);
}
btnSearch.addEventListener('input', function () {
    searchProduct(this.value);
});
function deleteProduct(deletedIndex) {
    productContainer.splice(deletedIndex, 1);
    localStorage.setItem('product', JSON.stringify(productContainer));
    displayProduct(productContainer);
}

function setFormUpdate(indexItem) {
    nameProduct.value = productContainer[indexItem].name; 
    urlProduct.value = productContainer[indexItem].url; 
    btnUpdate.classList.remove('d-none');
    add.classList.add('d-none');  
    currentUpdateIndex = indexItem;
}

function updateProduct() {
    if (currentUpdateIndex !== -1) { 
        productContainer[currentUpdateIndex] = { 
            name: nameProduct.value,
            url: urlProduct.value
        };
        localStorage.setItem('product', JSON.stringify(productContainer)); // حفظ التحديث في LocalStorage
        clearProduct(); 
        displayProduct(productContainer);
        btnUpdate.classList.add('d-none'); 
        add.classList.remove('d-none');
        currentUpdateIndex = -1; 
    }
}
btnUpdate.addEventListener('click', function () {
    updateProduct();
});
function validationName() {
    var regex = /^[A-Z][a-z- ]{4,8}$/;
    if (regex.test(nameProduct.value)==true) {
        nameProduct.classList.replace('is-invalid' , 'is-valid');
        return true;
    }
    else
    {
        nameProduct.classList.add('is-invalid');
        return false;
    }

}
nameProduct.addEventListener('input', validationName);
function validationUrl() {
    var regex = /^www\.[a-zA-Z0-9-]+\.[a-z]{2,6}$/;
    if (regex.test(urlProduct.value)==true) {
        urlProduct.classList.replace('is-invalid' , 'is-valid');
        return true;
    }
    else
    {
        urlProduct.classList.add('is-invalid');
        return false;
    }

}
urlProduct.addEventListener('input', validationUrl);