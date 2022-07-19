
fetch("C:\Users\Isabella Cheong\Documents\learning\web building\My Project\flowers.json") 
.then (response => {
    if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
    }
    return response.json();
})
.then (data => console.log(data))
.catch(err => console.error(`Fetch problem: ${err.message}`));

// function initialise (json) {
//     let flowers = json;
//     for (const flower in flowers) {
//         console.log (flower.name);
//     }
// }

// function initialise(flowers) {
// const selectionFieldset = document.querySelector('fieldset');

// for (const flower in flowers) {
//     console.log (`${flower.name}`);
// }

// let flowersToDisplay = flowers;

// for (const flower in flowersToDisplay) {
//     const para = document.createElement('p');
//     selectionFieldset.appendChild(para);
    
//     const checkbox = document.createElement('input');
//     checkbox.type = 'checkbox';
//     checkbox.value = checkbox.id = `${flower.name}`;
//     console.log(`${flower.name}`);
//     checkbox.name = 'flower';
//     para.appendChild(checkbox);

//     const image = document.createElement('img');
//     image.src = `images/${flower.image}`;
//     para.appendChild(image);
// }

// }













const sect = document.querySelector('section');

function createTable() {
    const costSummary = document.createElement('table');
    const thead = document.createElement('thead');
    const tbody = document.createElement('tbody');
    costSummary.appendChild(thead);
    costSummary.appendChild(tbody);
    sect.appendChild(costSummary);

    const row1 = document.createElement('tr');
    const heading1 = document.createElement('th');
    const heading2 = document.createElement('th');
    const heading3 = document.createElement('th');
    row1.appendChild(heading1);
    row1.appendChild(heading2);
    row1.appendChild(heading3);
    heading1.innerHTML = "Flower";
    heading2.innerHTML = "Price ($)";
    heading3.innerHTML = "Quantity";
    thead.appendChild(row1);
}

function addToTable(flower, price, qty) {
    const newRow = document.createElement('tr');
    const flowerCol = document.createElement('td');
    flowerCol.innerHTML = flower;
    const priceCol = document.createElement('td');
    priceCol.innerHTML = price;
    const qtyCol = document.createElement('td');
    qtyCol.innerHTML = qty;

    const tbody = document.querySelector('tbody');
    tbody.appendChild(newRow);
    newRow.appendChild(flowerCol);
    newRow.appendChild(priceCol);
    newRow.appendChild(qtyCol);
}

function addTotalToTable(total) {
    const totalRow = document.createElement('tr');
    const totalHeader = document.createElement('th');
    totalHeader.innerHTML = 'Total';
    totalHeader.colSpan = 3;
    totalRow.appendChild(totalHeader);

    const totalValueRow = document.createElement('tr');
    const totalCell = document.createElement('td');
    totalValueRow.appendChild(totalCell);
    totalCell.colSpan = 3;
    totalCell.innerHTML = total;

    const tbody = document.querySelector('tbody');
    tbody.appendChild(totalRow)
    tbody.appendChild(totalValueRow);
}

const btn = document.querySelector('button');
btn.addEventListener('click', function (event) {
    //overwrite previous result from click in section element 
    while (sect.firstChild) {
        sect.removeChild(sect.firstChild);
    }

    const buyerName = document.querySelector('input[type=text]');
    const phone = document.querySelector('input[type=tel]');
    const email = document.querySelector('input[type=email]');
    const deliveryDate = document.querySelector('input[type=date]');

    if (buyerName.validity.valid && phone.validity.valid && email.validity.valid && deliveryDate.validity.valid) {
        let total = 0;
        const flowerSelection = document.querySelectorAll('input[type=checkbox]');
        const qtySelected = document.querySelectorAll('input[type=number]')

        createTable();
        for (let i = 0; i < flowerSelection.length; ++i) {
            if (flowerSelection[i].checked) {
                let flower = flowerSelection[i].value;
                flower = flower.replace(flower[0], flower[0].toUpperCase());
                const qty = qtySelected[i].value;
                const price = flowerSelection[i].getAttribute('data-price');
                total += price * qty;

                addToTable(flower, price, qty);
            }
        }
        addTotalToTable(total);
    } else {
        const errorPara = document.createElement('p');
        sect.appendChild(errorPara);
        errorPara.textContent = 'Please fill in the contact details as required';
        event.preventDefault();
    }

})

