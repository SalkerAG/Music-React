import React from "react";
import ReactPlayer from "react-player";

const Info = ({ info, videoid }) => {
  if (Object.keys(info).length === 0) return null;
  const {
    strArtistThumb,
    strGenre,
    strBiographyES,
    strFacebook,
    strTwitter,
    strLastFMChart,
  } = info;
  return (
    <div className="card border-light">
      <div className="card-header bg-primary text-light font-weigth-bold">
        Información artista
      </div>
      <div className="card-body">
        <ReactPlayer
          url={"https://www.youtube.com/watch?v=" + videoid}
          className="react-player"
          playing
          width="100%"
          height="400px"
        />
        <img src={strArtistThumb} alt="Logo artista" className="mt-5" />
        <p className="card-text">Género: {strGenre}</p>
        <h2 className="card-text">Biografía:</h2>
        <p className="card-text">{strBiographyES}</p>
        {strFacebook === "" ? null : (
          <a
            href={`https://${strFacebook}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fab fa-facebook"></i>
          </a>
        )}

        {strTwitter === "" ? null : (
          <a
            href={`https://${strTwitter}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fab fa-twitter"></i>
          </a>
        )}

        {strLastFMChart === null ? null : (
          <a
            href={`https://${strLastFMChart}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fab fa-lastfm"></i>
          </a>
        )}
      </div>
    </div>
  );
};

export default Info;
