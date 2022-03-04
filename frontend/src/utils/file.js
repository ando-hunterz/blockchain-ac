const makeJsonObject = (data) => {
  const file = new Blob([JSON.stringify(data)], {
    type: "application/json",
  });
  return file;
};

const downloadBlob = (blob, name) => {
  // Convert your blob into a Blob URL (a special url that points to an object in the browser's memory)
  const blobUrl = URL.createObjectURL(blob);

  // Create a link element
  const link = document.createElement("a");

  // Set link's href to point to the Blob URL
  link.href = blobUrl;
  link.download = name;

  // Append link to the body
  document.body.appendChild(link);

  // Dispatch click event on the link
  // This is necessary as link.click() does not work on the latest firefox
  link.dispatchEvent(
    new MouseEvent("click", {
      bubbles: true,
      cancelable: true,
      view: window,
    })
  );

  // Remove link from body
  document.body.removeChild(link);
};

const chunkArrayToJson = function (binArray) {
  let str = "";
  for (let i = 0; i < binArray.length; i++) {
    str += String.fromCharCode(parseInt(binArray[i]));
  }
  return JSON.parse(str);
};

const arrayToBase64 = function (binArray) {
  let binary;
  const len = binArray.byteLength;
    for (let i = 0; i < len; i++) {
        binary += String.fromCharCode( binArray[ i ] );
    }
    return window.btoa( binary );
}

export { makeJsonObject, downloadBlob, chunkArrayToJson, arrayToBase64 };
