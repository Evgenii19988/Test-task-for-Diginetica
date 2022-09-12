document.querySelector("checkout-page").addEventListener("change", addHintText);
function addHintText(event) {
  const radioCtrl = event.target.closest("radio-ctrl");

  if (radioCtrl.querySelector(".title").innerHTML === "Долями") {
    let steer = document.createElement("div");
    steer.classList.add("steer");
    steer.style.marginTop = "0.625rem";

    let price = document.querySelector(".row.total").lastElementChild
      .textContent;
    price = parseInt(price.replace(/[^\d]/g, ""));

    if (price < 30000) {
      const newPrice = price / 4;
      price = formatPrice(newPrice);
      steer.innerHTML = `2 недели: ${price}, 4 недели: ${price}, 6 недель: ${price}, 8 недель: ${price}`;
      radioCtrl.querySelector("a").before(steer);
    } else {
      steer.innerHTML =
        "2 недели: 25% 4 недели: 25% 6 недель: 25% 8 недель: 25%";
    }

    let observer = new MutationObserver(callBack);
    observer.observe(document.querySelectorAll("li")[4], {
      childList: true, // наблюдать за непосредственными детьми
      characterDataOldValue: true, // передавать старое значение в колбэк
      subtree: true
    });

    function callBack(oldVal) {
      document
        .querySelectorAll("li")[4]
        .querySelectorAll(".sub-title")[3]
        .append(steer);

      observer.disconnect();

      if (oldVal.length === 1) {
        let observer = new MutationObserver(callBack);
        observer.observe(document.querySelectorAll("li")[4], {
          childList: true, // наблюдать за непосредственными детьми
          characterDataOldValue: true, // передавать старое значение в колбэк
          subtree: true
        });
        function callBack() {
          document
            .querySelectorAll("li")[4]
            .querySelectorAll(".sub-title")[3]
            .append(steer);

          observer.disconnect();
        }
      }
    }

    function formatPrice(price) {
      return new Intl.NumberFormat("ru-RU", {
        style: "currency",
        currency: "RUB",
        maximumFractionDigits: 0
      }).format(Math.round(price.toFixed(0)));
    }
  }
}
