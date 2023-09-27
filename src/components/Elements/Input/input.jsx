import { useEffect, useState } from "react";
import { searchServices } from "../../../services/search.services";

const FormInput = () => {
  const [loading, setLoading] = useState(null);
  const [response, setResponse] = useState([]);

  function handleInputChange(event) {
    event.preventDefault();
    const inputValue = event.target.value;
    if (inputValue.length >= 0) {
      setLoading(null);
    }
    if (inputValue.length > 3) {
      setLoading(1);
      searchServices(inputValue, (res) => {
        setResponse(res);
      });
    }
  }

  // ketika ada perubahan di response makan setloading nya akan null / di hilangkan
  useEffect(() => {
    setLoading(null);
  }, [response]);

  function handleDownloadAudio(audioURL) {
    // Menggunakan API Fetch untuk mengunduh file
    fetch(audioURL)
      .then((response) => response.blob())
      .then((blob) => {
        // Membuat objek URL dari blob
        const blobURL = URL.createObjectURL(blob);

        // Membuat elemen anchor baru untuk memicu unduhan
        const a = document.createElement("a");
        a.href = blobURL;
        a.download = "audio.mp3"; // Nama file yang akan diunduh
        a.style.display = "none";
        document.body.appendChild(a);

        // Memicu klik pada elemen anchor untuk memulai unduhan
        a.click();

        // Menghapus elemen anchor setelah unduhan selesai
        document.body.removeChild(a);
      })
      .catch((error) => {
        console.error("Error downloading audio:", error);
      });
  }

  return (
    <>
      <div className="flex items-center justify-center">
        <div className="flex">
          <input
            type="text"
            className="px-4 py-3 border-2  border-red-500 rounded-1 bg-red-100 focus:border-red-700 focus:ring focus:ring-red-200"
            placeholder="Masukkan sesuatu..."
            onChange={handleInputChange}
          />
          <button className="px-4 py-2 bg-red-500 text-white rounded-r hover:bg-blue-600">
            Start
          </button>
        </div>
      </div>

      {loading && (
        <div className="flex justify-center py-5">Menunggu hasil...</div>
      )}

      <div>
        {response.length > 0 &&
          response.map((item, index) => (
            <div key={index} className="flex flex-col items-strat my-3">
              <img
                src={item.info.thumbnail}
                alt="error images"
                className="px-4 w-64 rounded-lg"
              />
              <div className="ml-4">
                <div className="text-sm font-bold text-gray-900">
                  {item.info.channel}
                </div>
                <div className="text-xl font-semibold">{item.info.title}</div>
                <button
                  onClick={() => handleDownloadAudio(item.urldl_audio.link)}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-3"
                >
                  Download Audio
                </button>
              </div>
            </div>
          ))}
      </div>

      <div className="flex pt-4">
        <div className="text-sm text-gray-500">
          Dengan menggunakan layanan kami, Anda menerima Syarat Penggunaan kami.
        </div>
      </div>
    </>
  );
};

export default FormInput;
