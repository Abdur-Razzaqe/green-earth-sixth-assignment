const categoryContainer = document.getElementById("categoryContainer");

const loadCategory = () => {
  fetch("https://openapi.programming-hero.com/api/categories")
    .then((res) => res.json())
    .then((data) => {
      console.log(data.categories);
      const categories = data.categories;
      showCategory(categories);
    })
    .catch((err) => {
      console.log(err);
    });
};
const showCategory = (categories) => {
  categories.forEach((cat) => {
    categoryContainer.innerHTML += `<li id="${cat.id}" class="hover:bg-[#15803d] cursor-pointer hover:text-white px-3 py-1">
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
    }
  });
};

loadCategory();
