function getMaxDepth(element) {
  let child = element.firstElementChild;
  let childrenDepth = [];

  if (!child) {
    return 1;
  }

  while (child) {
    childrenDepth.push(getMaxDepth(child));
    child = child.nextElementSibling;
  }

  return Math.max(...childrenDepth) + 1;
}
