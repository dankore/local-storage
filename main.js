 const addItems = document.querySelector('.add-items');
  const itemsList = document.querySelector('.plates');
  const items = JSON.parse(localStorage.getItem('items')) || [];
  
  // Add items
  addItems.addEventListener('submit', addItem);
  
  function addItem(e) {
   // Prevent refresh after every form submission
   e.preventDefault();
   
   const text = (this.querySelector('[name=item]')).value
   const item = {
    text: text, // Or just text (ES6)
    done: false
   }
   
   // Push the submitted items to the items array
   items.push(item);
   populateList(items, itemsList);
   localStorage.setItem('items', JSON.stringify(items));
   this.reset();
  }
  
  function populateList(plates = [], plateList) {
   plateList.innerHTML = plates.map((plate, i) => {
    return `
     <li>
     <input type="checkbox" data-index=${i} id="item${i}" ${plate.done ? 'checked' : ''} />
      <label for="item${i}">${plate.text}</label>
     </li>
    `
   }).join('');
 
  }
  
  populateList(items, itemsList);
  itemsList.addEventListener('click', toggleDone);
  
  function toggleDone(e) {
   if(!e.target.matches('input')) return // Skip unless its input
   const el = e.target;
   const index = el.dataset.index;
   items[index].done = !items[index].done;
   localStorage.setItem('items', JSON.stringify(items));
   populateList(items, itemsList);
  }
 
// Uncheck all checked  
const button1 = document.querySelector('.button1');
button1.addEventListener('click', uncheckAll);

function uncheckAll() {
 items.forEach(item => {
  item.done = false;
   populateList(items, itemsList);
  localStorage.setItem('items', JSON.stringify(items));
 })
}

// Check all items
const button2 = document.querySelector('.button2');
button2.addEventListener('click', checkAll);

function checkAll() {
 items.forEach(item => {
  item.done = true;
  populateList(items, itemsList);
  localStorage.setItem('items', JSON.stringify(items));
console.log(item);
 })
}