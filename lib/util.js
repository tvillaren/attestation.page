import QRCode from "qrcode";
const MINUTES_IN_DAYS = 1440;

export function generateQR(text) {
  const opts = {
    errorCorrectionLevel: "M",
    type: "image/png",
    quality: 0.92,
    margin: 1,
  };
  return QRCode.toDataURL(text, opts);
}

export function pad2Zero(str) {
  return String(str).padStart(2, "0");
}

export function getFormattedDate(date) {
  const year = date.getFullYear();
  const month = pad2Zero(date.getMonth() + 1); // Les mois commencent à 0
  const day = pad2Zero(date.getDate());
  return `${year}-${month}-${day}`;
}

export function addSlash(str) {
  return str
    .replace(/^(\d{2})$/g, "$1/")
    .replace(/^(\d{2})\/(\d{2})$/g, "$1/$2/")
    .replace(/\/\//g, "/");
}

export function addVersion() {
  document.getElementById(
    "version"
  ).innerHTML = `${new Date().getFullYear()} - ${process.env.VERSION}`;
}

export function validateState(state) {
  const conditions = {
    birthday: /^([0][1-9]|[1-2][0-9]|30|31)\/([0][1-9]|10|11|12)\/(19[0-9][0-9]|20[0-1][0-9]|2020)/g,
    zipcode: /\d{5}/g,
  };

  const ignoreFields = ["addresses", "persons"];

  return Object.entries(state).every(([key, value]) => {
    try {
      return (
        ignoreFields.indexOf(key) > -1 ||
        (value.length > 1 && (!conditions[key] || value.match(conditions[key])))
      );
    } catch (error) {
      return false;
    }
  });
}

export function openBlob(blob, fileName) {
  const isChrome = /Chrome/i.test(navigator.userAgent);

  const url = URL.createObjectURL(blob);

  if (isChrome) {
    window.open(url);
  } else {
    const link = document.createElement("a");
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
  }
}

export function addTime(initial, addition) {
  console.log(initial);
  const timeSplit = initial.split(":");

  let t = timeSplit[0] * 60 + parseInt(timeSplit[1]);
  t += addition;

  if (t < 0) t += MINUTES_IN_DAYS;
  t = t % MINUTES_IN_DAYS;

  const newValue = pad2Zero(Math.floor(t / 60)) + ":" + pad2Zero(t % 60);
  return newValue;
}
