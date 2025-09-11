const categoryContainer = document.getElementById("categoryContainer");
const plantsContainer = document.getElementById("plantsContainer");
const cartContainer = document.getElementById("cartContainer");
const plantModal = document.getElementById("plant_modal");
let carts = [];

const loadCategory = () => {
  fetch("https://openapi.programming-hero.com/api/categories")
    .then((res) => res.json())
    .then((data) => showCategory(data.categories))
    .catch((err) => console.log(err));
};
// show categories

const showCategory = (categories) => {
  categoryContainer.innerHTML += `<li id="all-trees" class="hover:bg-[#15803d] cursor-pointer hover:text-white px-3 py-1 category">All Trees</li>`;

  categories.forEach((cat) => {
    categoryContainer.innerHTML += `<li id="${cat.id}" class="hover:bg-[#15803d] name  cursor-pointer hover:text-white px-3 py-1 category">
${cat.category_name}</li>`;
  });

  const allLi = document.querySelectorAll("li");
  loadAllPlants();

  categoryContainer.addEventListener("click", (e) => {
    allLi.forEach((li) => li.classList.remove("bg-[#15803d]", "text-white"));
    if (e.target.localName === "li") {
      e.target.classList.add("bg-[#15803d]", "text-white");
      if (e.target.id === "all-trees") {
        loadAllPlants();
      } else {
        loadPlantsByCategory(e.target.id);
      }
    }
  });
};

// spinner;
const spinner = document.getElementById("spinner");
const showSpinner = () => {
  spinner.classList.remove("hidden");
};

const hideSpinner = () => {
  spinner.classList.add("hidden");
};

// load all plants for all trees

const loadAllPlants = () => {
  showSpinner();
  fetch("https://openapi.programming-hero.com/api/plants")
    .then((res) => res.json())
    .then((data) => {
      showPlantsByCategory(data.plants.slice(0, 6));
      hideSpinner();
    });
  // .catch((err)) => console.log(err)
};

// load plants by category

const loadPlantsByCategory = (categoryId, limit = null) => {
  showSpinner();
  fetch(`https://openapi.programming-hero.com/api/category/${categoryId}`)
    .then((res) => res.json())
    .then((data) => {
      let plants = data.plants;
      if (limit) plants = plants.slice(0, limit);
      showPlantsByCategory(plants);
      hideSpinner();
    })
    .catch((err) => {
      console.log(err);
      hideSpinner();
    });
};

// show plants
const showPlantsByCategory = (plants) => {
  plantsContainer.innerHTML = "";
  plants.forEach((plant) => {
    plantsContainer.innerHTML += `
    <div class=" gap-3  text-justify ">
       <div class=" bg-[#FFFFFF] rounded-lg p-2 m-2 space-y-2 shadow hover:shadow-lg transition">
       <img src="${plant.image}" alt="" class="w-full h-48 sm:h-40 md:h-48 lg:h-56 bg-[#ededed] rounded-lg object-cover" />
              <h3 onclick="loadPlantDetail(${plant.id})" class=" font-semibold cursor-pointer text-lg sm:text-base md:text-lg lg:text-xl">${plant.name}</h3>
              <p>${plant.description}</p>
              <div class="flex justify-between items-center">
                <p><span class="bg-[#cff0dc] px-2 py-1 rounded-full">${plant.category}</span></p>
                <p><i class="fa-solid fa-bangladeshi-taka-sign"></i><span class="font-bold">${plant.price}</span></p>
              </div>
              <button onclick="addToCart('${plant.category}', ${plant.price})" class="btn btn-primary bg-[#15803D] w-full rounded-full mt-2">
                Add to Cart
              </button>
       </div>
    </div>
    `;
  });
};

// cart function
const addToCart = (category, price) => {
  carts.push({ category, price: Number(price) });
  saveCarts();
  showCarts(carts);
};

const showCarts = (carts) => {
  cartContainer.innerHTML = "";
  let total = 0;
  carts.forEach((item, index) => {
    total += item.price;
    cartContainer.innerHTML += `
  <div class="flex justify-between items-center gap-2 bg-[#cff0de] shadow-md p-2 rounded-lg">
  <div>
  <p>${item.category}</p>
  <p class="text-sm"><i class="fa-solid fa-bangladeshi-taka-sign"></i>${
    item.price
  }<span>${" "}<i class="fa-solid fa-xmark"></i>${" "}</span>1</p>
  </div>
  <button onclick="removeFromCart(${index})" class="cursor-pointer"><i class="fa-solid fa-xmark"></i></button>
  </div>
  `;
  });
  if (carts.length > 0) {
    cartContainer.innerHTML += `
    <div class="flex justify-between items-center mt-2 font-bold shadow-md p-2 rounded-lg">
    <p>Total:</p>
    <p><i class="fa-solid fa-bangladeshi-taka-sign"></i><span>${total}</span></p>
    </div>
    
    `;
  }
};
const removeFromCart = (index) => {
  carts.splice(index, 1);
  saveCarts();
  showCarts(carts);
};
const saveCarts = () => localStorage.setItem("carts", JSON.stringify(carts));
const loadCartsFromStorage = () => {
  const stored = localStorage.getItem("carts");
  if (stored) {
    carts = JSON.parse(stored);
    showCarts(carts);
  }
};

const loadPlantDetail = async (id) => {
  const url = `https://openapi.programming-hero.com/api/plant/${id}`;
  console.log(url);
  const res = await fetch(url);
  const plant = await res.json();
  showPlantDetails(plant.plants);
};
const showPlantDetails = (plant) => {
  console.log(plant);
  const detailsBox = document.getElementById("detailContainer");
  detailsBox.innerHTML = `   <div class="space-y-2">
        <h2 class="font-bold text-lg">${plant.name}</h2>
 <img src="${
   plant.image
 }" alt="" class="w-full h-[186px] bg-[#ededed] rounded-lg object-cover" />
  <p ><span class="font-semibold space-x-2">Category:${" "}</span><span>${
    plant.category
  }</span></p>
  <p><span class="font-semibold">Price:${" "}</span><i class="fa-solid fa-bangladeshi-taka-sign"></i><span>${
    plant.price
  }</span></p>
   <p><span class="font-semibold">Description:${" "}</span> ${
    plant.description
  }</p>
    
</div>
`;

  document.getElementById("plant_modal").showModal();
};
// page load
loadCategory();
loadCartsFromStorage();
