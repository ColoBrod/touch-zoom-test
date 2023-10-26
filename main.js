const square = document.querySelector(".content");
const inner = document.querySelector(".inner");
const output = document.querySelector("pre");
const p = document.querySelector("p");

document.addEventListener("touchstart", handleStart);
document.addEventListener("touchmove", handleMove);
document.addEventListener("touchend", handleEnd);
document.addEventListener("touchcancel", handleCancel);

let initialDistance;
let initialScale = 1;

function handleStart(e) {
  if (e.touches.length === 2) {
    const t1 = e.touches[0];
    const t2 = e.touches[1];
    initialDistance = getDistance(t1, t2);
    initialScale = getScale(inner);
  }
}

function handleMove(e) {
  if (e.touches.length === 2) {
    const t1 = e.touches[0];
    const t2 = e.touches[1];
    const currentDistance = getDistance(t1, t2);
    const scale = (currentDistance / initialDistance) * initialScale;

    output.innerHTML = currentDistance;
    p.innerHTML = scale;

    setScale(inner, scale);
  }
}

function handleEnd(e) {
  initialDistance = null;
}

function handleCancel(e) {
  initialDistance = null;
}

function getDistance(touch1, touch2) {
  const { clientX: x1, clientY: y1 } = touch1;
  const { clientX: x2, clientY: y2 } = touch2;
  return Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2);
}

function getScale(element) {
  const transform = window.getComputedStyle(element).transform;
  if (transform && transform !== "none") {
    const values = transform.split("(")[1].split(")")[0].split(",");
    return parseFloat(values[0]);
  } else {
    return 1;
  }
}

function setScale(element, scale) {
  element.style.transform = `scale(${scale})`;
}

/*
const square = document.querySelector(".content");
const inner = document.querySelector(".inner");
const output = document.querySelector("pre");
const p = document.querySelector("p");

document.addEventListener("touchstart", handleStart);
document.addEventListener("touchend", handleEnd);
document.addEventListener("touchcancel", handleCancel);
document.addEventListener("touchmove", handleMove);

let prevDistance;

function handleStart(e) {
  console.log("Start");
  console.log(e);
  prevDistance = 0;
}

function handleEnd(e) {
  console.log("End");
  console.log(e);
  prevDistance = undefined;
}

function handleCancel(e) {
  console.log("Cancel");
  console.log(e)
  prevDistance = undefined;
}

function handleMove(e) {
  // if (e.touches < 2 || e.touches > 2) return;
  const t1 = e.touches[0];
  const t2 = e.touches[1];
  const { clientX: t1_x, clientY: t1_y } = t1;
  const { clientX: t2_x, clientY: t2_y } = t2;
  const distance = Math.sqrt((t1_x - t2_x)**2 + (t1_y - t2_y)**2);
  output.innerHTML = distance;
  let scale = parseInt(inner.style.scale);
  // let scale = parseInt(getComputedStyle(inner).scale);
  p.innerHTML = scale;
  scale += 0.05
  // if (prevDistance - distance > 1) scale -= 0.05;
  // else if (prevDistance - distance < -1) scale += 0.05;
  inner.style.scale = scale;
}
*/