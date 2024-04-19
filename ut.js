// const down = document.getElementById("link");

let im = document.getElementById("im");
// let inp;

const i = document
  .getElementById("btn11")
  .addEventListener("click", function () {
    let inp = document.getElementById("search1").value;
    // console.log("Input Value:", inp);

    // console.log(inp);
    let que = "";
    for (let i = 0; i < inp.length; i++) {
      if (inp[i] == " ") {
        que += "%20";
      } else {
        que += inp[i];
      }
    }
    // console.log(que);
    fetch(
      `https://youtube-media-downloader.p.rapidapi.com/v2/search/videos?keyword=${que}`,
      (options = {
        method: "GET",
        headers: {
          "X-RapidAPI-Key":
            "1d3d0f8075msh8793a4cb80b7f40p1258b6jsne1e6c585072d",
          "X-RapidAPI-Host": "youtube-media-downloader.p.rapidapi.com",
        },
      })
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        let k = data.items;

        // console.log(k[0]);

        fetch(
          `https://youtube-media-downloader.p.rapidapi.com/v2/video/details?videoId=${k[0].id}`,
          (options = {
            method: "GET",
            headers: {
              "X-RapidAPI-Key":
                "1d3d0f8075msh8793a4cb80b7f40p1258b6jsne1e6c585072d",
              "X-RapidAPI-Host": "youtube-media-downloader.p.rapidapi.com",
            },
          })
        )
          .then((response) => {
            return response.json();
          })
          .then((val) => {
            let j = val.thumbnails;
            let s = val.subtitles;
            if (s) {
              sub = s.items;
            }
            if (j && j[2]) {
              im.innerHTML = `<img src=${j[2].url}>`;
            }
            if (sub && sub[0] && sub[0].url) {
              document
                .getElementById("link")
                .addEventListener("click", function () {
                  const url = sub[0].url; // Replace with your URL
                  const fileName = `${que}.srt`; // Name of the file to be saved

                  fetch(url)
                    .then((response) => response.blob())
                    .then((blob) => {
                      const a = document.createElement("a");
                      a.style.display = "none";
                      document.body.appendChild(a);

                      const url = window.URL.createObjectURL(blob);
                      a.href = url;
                      a.download = fileName;
                      a.click();
                      alert("Your File is Downloading!");
                      window.URL.revokeObjectURL(url);
                      document.body.removeChild(a);
                    })
                    .catch((error) => {
                      console.error("we can not find anything!");
                    });
                });
              // down.innerHTML = `<a href=${sub[0].url}>DOWNLOAD</a>`;
              // console.log(sub[0].url);
            } else {
              setTimeout("alert('sorry!There is no subtitle')", 2000);
            }
          });
      });
  });
