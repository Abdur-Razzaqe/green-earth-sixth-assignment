const categoryContainer = document.getElementById("categoryContainer");

const plantsContainer = document.getElementById("plantsContainer");

const loadPlants = () => {
  fetch("https://openapi.programming-hero.com/api/plants")
    .then((res) => res.json())
    .then((data) => console.log(data));
};

const loadCategory = () => {
  fetch("https://openapi.programming-hero.com/api/categories")
    .then((res) => res.json())
    .then((data) => {
      const categories = data.categories;
      showCategory(categories);
    })
    .catch((err) => {
      console.log(err);
    });
};
const showCategory = (categories) => {
  categories.forEach((cat) => {
    categoryContainer.innerHTML += `<li id="${cat.id}" class="hover:bg-[#15803d]  cursor-pointer hover:text-white px-3 py-1">
                  ${cat.category_name}
                </li>`;
  });
  categoryContainer.addEventListener("click", (e) => {
    const allLi = document.querySelectorAll("li");
    allLi.forEach((li) => {
      li.classList.remove("bg-[#15803d]");
    });
    if (e.target.localName === "li") {
      e.target.classList.add("bg-[#15803d]");
      loadPlantsByCategory(e.target.id);
    }
  });
};

const loadPlantsByCategory = (categoryId) => {
  fetch(`https://openapi.programming-hero.com/api/category/${categoryId}`)
    .then((res) => res.json())
    .then((data) => {
      showPlantsByCategory(data.plants);
    })
    .catch((err) => {
      console.log(err);
    });
};
const showPlantsByCategory = (plants) => {
  console.log(plants);
  plants.forEach((plants) => {
    plantsContainer.innerHTML += `
    <div class=" gap-3  text-justify ">
       <div class=" bg-[#FFFFFF] rounded-lg p-2 m-2 space-y-2">
       <img src="${plants.image}" alt="" class="w-full h-[186px] bg-[#ededed] rounded-lg" />
              <h3>${plants.name}</h3>
              <p>${plants.description}</p>
              <div class="flex justify-between items-center">
                <p><span>${plants.category}</span></p>
                <p><span>${plants.price}</span></p>
              </div>
              <button class="btn btn-primary bg-[#15803D] w-full rounded-full">
                Add to Cart
              </button>
       </div>
    </div>
    `;
  });
};
loadCategory();
