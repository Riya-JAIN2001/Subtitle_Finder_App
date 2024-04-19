async function downloadFileFromLink(link) {
  try {
    // Fetch data from the link
    const response = await fetch(link);

    // Read the response data
    const data = await response.blob();

    // Create a temporary anchor element
    const downloadLink = document.createElement("a");

    // Create a Blob URL from the data
    const blobUrl = URL.createObjectURL(data);

    // Set the anchor element attributes
    downloadLink.href = blobUrl;
    downloadLink.download = "downloaded_file.txt"; // Set the desired file name

    // Programmatically trigger the download
    downloadLink.click();

    // Clean up the Blob URL after the download
    URL.revokeObjectURL(blobUrl);
  } catch (error) {
    console.error("Error downloading the file:", error);
  }
}

// Example usage
const linkToDownload =
  "https://www.youtube.com/api/timedtext?v=dQw4w9WgXcQ&ei=kY_PZMW4CJbFsfIP4PKzyAY&caps=asr&opi=112496729&xoaf=5&hl=en&ip=0.0.0.0&ipbits=0&expire=1691349505&sparams=ip,ipbits,expire,v,ei,caps,opi,xoaf&signature=CB49B88D1A7719AB25C3313E174A21D745174E9F.93BE118C8D533D4482A3ABB11D42029513332D4D&key=yt8&kind=asr&lang=en";
downloadFileFromLink(linkToDownload);
