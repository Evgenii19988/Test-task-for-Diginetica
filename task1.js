function putSharePrice() {
  if (!document.querySelector("product-price")) return false;

  const elemPrice = document.createElement("div");

  if (document.querySelector(".share-price")) return false;

  elemPrice.classList.add("share-price");

  const price = document
    .querySelector("product-price")
    .querySelector(".price.first").firstChild.data;

  if (!price) return false;

  const sharePrice = parseInt(price.replace(/[^\d]/g, "")) / 4;

  if (sharePrice > 30000) return false;

  const formatedPrice = formatPrice(sharePrice);

  elemPrice.style.fontSize = "1.25rem";
  elemPrice.style.marginTop = "1.25rem";

  elemPrice.innerHTML = `${formatedPrice}`;
  document.querySelector("product-price").before(elemPrice);

  function formatPrice(price) {
    return new Intl.NumberFormat("ru-RU", {
      style: "currency",
      currency: "RUB",
      maximumFractionDigits: 0
    }).format(Math.round(price.toFixed(0)));
  }
}
