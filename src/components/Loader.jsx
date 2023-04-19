import { loader } from "../assets";
const Loader = ({ title }) => (
  <div className="w-full flex-col items-center justify-center">
    <img src={loader} alt="loader" />
    <h1 className="font-bold text-white text-2xl mt-2">{title || "Loading"}</h1>
  </div>
);

export default Loader;
