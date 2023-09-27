import axios from "axios";

export const searchServices = async (data, callback) => {
  try {
    const response = await axios.get(
      "https://api.akuari.my.id/downloader/yt1?link=" + data
    );
    const dataArray = Array.isArray(response.data)
      ? response.data
      : [response.data];
    callback(dataArray);
  } catch (err) {
    console.error(err);
  }
};
