const backColor = document.querySelector(".color");
backColor.addEventListener("mouseover", function () {
  backColor.style = "box-shadow: 0 5px 12px blueviolet;";
});

backColor.addEventListener("mouseout", function () {
  backColor.style = "";
});

const back = document.querySelector(".color1");
back.addEventListener("mouseover", function () {
  back.style = "box-shadow: 0 5px 12px rgb(214, 67, 116);";
});
back.addEventListener("mouseout", function () {
  back.style = "";
});

document.querySelector(".color>*").style = "color: #fff";
document.querySelector(".color1>*").style = "color: #fff";

var prevScroll = 0;
window.onscroll = toggleMenu;
function toggleMenu() {
  if (document.documentElement.scrollTop >= prevScroll) {
    document.querySelector(".sear").style.cssText =
      "top:0px;position:fixed;width:1195px;box-shadow: 0 3px 3px #dcdcdc;border-radius: 20px;z-index: 1;";
  } else {
    document.querySelector(".sear").style.cssText = "position:relative";
  }
  prevScroll = document.documentElement.scrollTop;
}
  
document.addEventListener("DOMContentLoaded", function () {
  
  const basket = document.querySelector(".basket"); // корзина
  const medicine = document.querySelectorAll(".medicine"); // лекарства
  var id = 1;
  // let list = [];
  // let li = document.querySelectorAll(".li .medicine li");
  // console.log(li);
  const getItemsFromLS = () => {
  let listNew;
  if (localStorage.getItem("list")) {
    listNew = JSON.parse(localStorage.getItem("list"));
  } else {
    listNew = [];
  }
  return listNew;
  };

  const addItemToLS = (item1) => {
    let listNew = getItemsFromLS();
    // const itemJs = { id: id, title: title };
    // list.push(itemJs);
    listNew.push(item1);
    id++;
    localStorage.setItem("list", JSON.stringify(listNew));
  }

  const addItem = (id, title) => {
    // console.log(d);
    var item = `<div class="remove"><li data-id="${id}" class=" list-group-item d-flex justify-content-between align-items-center">
    ${title}
    <i class="bicre bi bi-emoji-frown"></i>
    </li></div>`;
    document
    .querySelector(".list-basket")
    .insertAdjacentHTML("beforeend", item);
  };

  const remowItem = (e) => {
    const localStor = getItemsFromLS ();
    // const localStor = JSON.parse(localStorage.getItem("list"));
    // console.log(localStor);
    localStor.forEach((el, ind) => {
      if (e.target.parentElement.dataset.id == el.id) {
        localStor.splice(ind, 1);
      }
    });
    localStorage.setItem("list", JSON.stringify(localStor));
    e.target.parentElement.remove();
    document.querySelector(".basket span").textContent =
    Number(document.querySelector(".basket span").textContent) - 1;
    if (Number(document.querySelector(".hid").textContent) == 0) {
      document.querySelector(".hid").classList.add("visually-hidden");
    }
  };
  // var id = 1;
  medicine.forEach((e) => {
    e.addEventListener("click", function (el) {
      const title = el.target.textContent; // наименования товара для локалсторадж
      if (el.target.matches("a")) {
        let item1 = {id, title};
        addItem(id, title);
        addItemToLS (item1);
        document.querySelector(".basket span").textContent =
        Number(document.querySelector(".basket span").textContent) + 1;
        document.querySelector(".hid").classList.remove("visually-hidden");
        // addItem(id, title);
        document
          .querySelector(".basket")
          .addEventListener("click", function (e) {
            if (e.target.matches(".basket")) {
              // let listNew = getItemsFromLS ();
              document
              .querySelector(".list-basket")
              .classList.toggle("visually-hidden");
              document
                .querySelector(".list-basket")
                .addEventListener("click", function (e) {
                  if (e.target.matches(".remove li i")) {
                    remowItem(e);
                  }
                });
            }
          });
      }
    });
  });
  
  
  let listNew = getItemsFromLS ();
  if (listNew.length > 0) {
    listNew.forEach((elem) => {
      addItem(elem.id, elem.title);
      document.querySelector(".basket span").textContent =
        Number(document.querySelector(".basket span").textContent) + 1;
        document.querySelector(".hid").classList.remove("visually-hdiden");
      id++;
    })
  }

});
