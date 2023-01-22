import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FormField, Loader } from "../components";
import { preview } from "../assets";
import { getRandomPrompt } from "../utils";

export default function CreatePost() {
  const navigate = useNavigate();
  const [form, setform] = useState({
    name: "",
    prompt: "",
    photo: "",
  });
  const [generatingImage, setgeneratingImage] = useState(false);
  const [uploading, setUploading] = useState(false);

  const generateImage = async () => {
    if (form.prompt) {
      try {
        setgeneratingImage(true);
        const response = await fetch("https://emage-api.onrender.com/v1/ai", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            prompt: form.prompt,
          }),
        });

        const data = await response.json();
        console.log(data);
        setform({ ...form, photo: `data:image/jpeg;base64,${data.photo}` });
      } catch (e) {
        console.log(e);
        alert(e);
      } finally {
        setgeneratingImage(false);
      }
    }
  };

  const handleSurpriseMe = () => {
    const randomPrompt = getRandomPrompt();
    setform({ ...form, prompt: randomPrompt });
    console.log(randomPrompt);
  };
  // https://emage-api.onrender.com/v1/ai
  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.prompt && form.photo) {
      setUploading(true);

      try {
        const response = await fetch("https://emage-api.onrender.com/v1/post", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ...form }),
        });

        const data = await response.json();
        alert('Upload Successful')
        console.log(data);
        navigate(`/`);
      } catch (err) {
        console.log(err);
      } finally {
        setUploading(false);
      }
    } else {
      alert('Generate Image first !')
    }
  };

  return (
    <div className=" max-w-7xl mx-auto">
      <div>
        <h1 className="font-extrabold text-[#b2b9dd] text-[32px]">Create</h1>
        <p className="mt-2 tracking-widest text-[#b8c4ce] font-medium text-[14px] max-w-[500px]">
          Generate images here. Type in a prompt
        </p>
      </div>

      <form className="mt-8 max-w-3xl" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-5">
          <FormField
            labelName="Your Name"
            type="text"
            name="name"
            placeholder="Ash Ketchum"
            value={form.name}
            handleChange={handleChange}
          />
          <FormField
            labelName="Prompt"
            type="text"
            placeholder="Try to be specific and know what you want"
            name="prompt"
            value={form.prompt}
            handleChange={handleChange}
            isSurpriseMe
            handleSurpriseMe={handleSurpriseMe}
          />

          <div className="relative bg-gray-700 border border-gray-500 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-64 p-3 h-64 flex justify-center mb-6 items-center">
            {form.photo ? (
              <img
                src={form.photo}
                alt="photo"
                className="w-full h-full object-contain"
              />
            ) : (
              <img
                src={preview}
                alt="photo"
                className="w-9/12 h-9/12 object-contain opacity-40"
              />
            )}

            {generatingImage && (
              <div className="absolute inset-0 z-0 flex justify-center items-center bg-[rgba(0,0,0,0.5)] rounded-lg">
                {" "}
                <Loader />
              </div>
            )}
          </div>
        </div>

        <div>
          <button
            type="button"
            onClick={generateImage}
            className=" text-white tracking-widest bg-green-700 font-semibold rounded-md text-sm w-full my-4 sm:w-auto px-5 py-2.5 text-center"
          >
            {generatingImage ? "Generating ..." : "Generate"}
          </button>
        </div>

        <div>
          <p className="mt-6 text-[#dadfe2] font-semibold text-[14px]">
            Upload the image to Save it to your collection
          </p>
          <button
            type="submit"
            className="mt-6 text-white tracking-widest bg-[#6469ff] font-semibold rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center"
          >
            {uploading ? "Uploading ..." : "Upload"}
          </button>
        </div>
      </form>
    </div>
  );
}

// Path: https://emage-api.onrender.com/v1/post/
