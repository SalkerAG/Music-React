import Formulario from "./components/Formulario";
import Cancion from "./components/Cancion";
import Info from "./components/Info";
import axios from "axios";
import YTSearch from "youtube-api-search";
import { useState, useEffect } from "react";
function App() {
  const [busquedaletra, setBusquedaLetra] = useState({});
  const [letra, setLetra] = useState("");
  const [info, setInfo] = useState([]);
  const [infovideo, setInfoVideo] = useState({
    videos: [],
    displayVideo: null,
  });

  useEffect(() => {
    if (Object.keys(busquedaletra).length === 0) return;
    const API_KEY = process.env.REACT_APP_API_KEY;
    const consultarAPIletra = async () => {
      const { artista, cancion } = busquedaletra;
      YTSearch({ key: API_KEY, term: artista + " " + cancion }, (videos) => {
        setInfoVideo({
          videos: videos,
          displayVideo: videos[0],
        });
      });
      const url = `https://api.lyrics.ovh/v1/${artista}/${cancion}`;
      const url2 = `https://theaudiodb.com/api/v1/json/1/search.php?s=${artista}`;

      const [letra, informacion] = await Promise.all([
        axios.get(url),
        axios.get(url2),
      ]);

      setLetra(letra.data.lyrics);
      setInfo(informacion.data.artists[0]);
    };
    consultarAPIletra();
  }, [busquedaletra]);

  return (
    <>
      <Formulario setBusquedaLetra={setBusquedaLetra} />
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-6">
            {infovideo.displayVideo === null ? null : (
              <Info info={info} videoid={infovideo.displayVideo.id.videoId} />
            )}
          </div>
          <div className="col-md-6">
            <Cancion letra={letra} />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
