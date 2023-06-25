import Compressor from "compressorjs";

const url =
  "https://script.google.com/macros/s/AKfycbyLrEJRIIYyndzG-_z6SK3jzMmamWoQyRzZWZ7lCxdNIkx3LPuhJGdJZElVfDLA3Z5blA/exec";

export function uploadFile(file, changeStatus, bash = false) {
  let driveLinks = [];

  return new Promise((resolve, reject) => {
    new Compressor(file, {
      quality: file.size > 1000000 ? 0.5 : file.size > 500000 ? 0.6 : 0.7,
      success(result) {
        changeStatus && changeStatus("Uploading 1/1 files...");
        let fr = new FileReader();
        fr.readAsDataURL(result);
        fr.onloadend = function (e) {
          let res = fr.result;
          let spt = res.split("base64,")[1];
          let obj = {
            base64: spt,
            type: result.type,
            name: result.name,
          };

          fetch(url, {
            method: "POST",
            body: JSON.stringify(obj),
          })
            .then((res) => res.json())
            .then((res) => {
              if (bash) changeStatus && changeStatus("Uploaded 1/1 files");
              driveLinks.push(res.data);
              resolve(driveLinks);
            })
            .catch((err) => {
              reject(err);
            });
        };
      },
      error(err) {
        console.log(err.message);
      },
    });
  });
}

export async function uploadFileArray(fileArray, changeStatus) {
  let driveLinks = [];

  for (let index = 0; index < fileArray.length; index++) {
    changeStatus(`Uploading ${index + 1} of ${fileArray.length} files...`);
    const element = fileArray[index];
    const resp = await uploadFile(element, null, true);
    driveLinks.push(resp[0]);
  }
  changeStatus(`Uploaded ${fileArray.length} files`);
  return driveLinks;
}
