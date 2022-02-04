import { BsFillFileImageFill } from "react-icons/bs";
import { useEffect, useState } from "react";
import axios from "axios";

export default function ProfileImgPicker({ onChange }) {
  const [state, setState] = useState({
    value: null,
    isValid: true,
    isPristine: true
  });

  useEffect(() => {
    const url = "/api/profile-image";
    const req = axios.get(url, { responseType: "arraybuffer" });
    req.then((res) => {
      const buffer = res.data;
      const mimetype = res.headers["content-type"];
      if (buffer.byteLength > 0) {
        const file = new File([buffer], "profile-image", { type: mimetype });
        setState({ value: file, isValid: true, isPristine: false });
        if (onChange) onChange({ profile_image: { value: file, isValid: true } });
      }
    });
    req.catch((error) => {
      console.error(error);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const _onChange = (event) => {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      if (file.size < 2 ** 21) {
        setState({ value: file, isValid: true, isPristine: false });
        if (onChange) onChange({ profile_image: { value: file, isValid: true } });
      } else {
        alert("The file size is greater than 2MB.");
        setState({ value: null, isValid: false, isPristine: false });
        if (onChange) onChange({ profile_image: { value: null, isValid: false } });
      }
    }
  };

  const imageURL = state.value ? URL.createObjectURL(state.value) : "";

  return (
    <label className="block mb-4">
      <div className="text-gray-500 text-sm mb-4">Profile Image</div>
      <div className="grid grid-cols-1 sm:grid-cols-2 sm:flex">
        <div
          className="w-36 h-36 shadow-md shadow-gray-300 rounded-md mb-4 sm:mb-0 cursor-pointer flex justify-center items-center text-gray-300 text-6xl"
          onClick={null}
        >
          {imageURL ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              className="w-full h-full object-cover rounded-md"
              src={imageURL}
              alt="profile image"
            />
          ) : (
            <BsFillFileImageFill />
          )}
        </div>
        <ul className="list-disc pl-4 sm:pl-12 my-auto items-center text-sm text-gray-400">
          <li>Square images work best.</li>
          <li>Crop your image before you upload.</li>
          <li>Image uploads are limited to 2MB</li>
          <li>Accepted image types: JPG, PNG and SVG.</li>
        </ul>
      </div>
      <input name="profile_image" type="file" accept=".jpg,.png,.svg" onChange={_onChange} hidden />
      {!state.isPristine && !state.isValid && (
        <div className="text-red-400 text-sm mt-1">This value is invalid.</div>
      )}
    </label>
  );
}
