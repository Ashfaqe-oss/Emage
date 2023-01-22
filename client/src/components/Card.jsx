import React from "react";
import { download } from "../assets";

import { downloadImage } from "../utils";

function Card({ name, prompt, photo }) {
  return (
    <div className="rounded-xl group relative hover:shadow-cardhover card">
      <img className="w-full h-auto object-cover rounded-xl" src={photo} alt={prompt} />

      <div  className="group-hover:flex hover:ease-in-out duration-300 flex-col max-h-[94.5%] max-w-7xl bg-transparent hidden absolute bottom-0 left-0 right-0 bg-[#10131f] m-4 p-4 rounded-lg">

        <p className="text-[#b8c4ce] tracking-wide text-sm overflow-y-auto prompt">{prompt}</p>

        <div className="mt-5 flex justify-between items-center gap-2">

          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full object-cover bg-[#6469ff] flex justify-center items-center text-white text-xs font-bold">{name[0]}</div>
            <p className="text-[#b8c4ce] text-sm">{name}</p>
          </div>

          <button type="button" className="outline-none bg-transparent border-none" onClick={() => downloadImage(prompt, photo)}>
            <img src={download} alt="download" className="w-6 h-6 object-contain" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Card;

// const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
