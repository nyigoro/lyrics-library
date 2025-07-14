import { useEffect, useState } from "react";
import "./index.css"; 

function App() {
  const [lyrics, setLyrics] = useState([]);

  useEffect(() => {
    fetch("https://lyrics.nyigoro.workers.dev/")
      .then(res => res.json())
      .then(setLyrics);
  }, []);

  return (
    <div className="max-w-3xl mx-auto p-6 text-gray-800">
      <h1 className="text-3xl font-bold mb-6">🎵 Lyrics Library</h1>
      {lyrics.map(song => (
        <div key={song.id} className="bg-white rounded shadow p-4 mb-4">
          <h2 className="text-xl font-semibold">{song.title}</h2>
          <p className="whitespace-pre-wrap mt-2">{song.content}</p>
        </div>
      ))}
    </div>
  );
}

export default App;
