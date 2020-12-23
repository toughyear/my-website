import React from "react";
import {
  AiFillLinkedin,
  AiOutlineTwitter,
  AiOutlineGithub,
  AiOutlineCodepen,
} from "react-icons/ai";

const LandingSection = ({ data }) => {
  //console.log(data);
  return (
    <div className="flex flex-col font-semibold">
      <h1 className="font-ibm-mono text-xl text-brand-blue">
        {data.salutation[0].text}
      </h1>

      <h1 className="landing-font font-bold">{data.name[0].text}</h1>
      <h1 className=" landing-intro font-bold">
        {data["small-intro"][0].text}
      </h1>
      <p className=" max-w-lg mt-5 font-normal about-intro">
        {data.description[0].text}
      </p>
      <div className="mt-16 flex flex-col sm:flex-row items-start items-center">
        <button className="font-ibm-mono flex items-center bg-brand-blue text-bg-color px-6 py-3 rounded-sm sm:mr-6 hover:bg-opacity-75">
          <a href={data.button[0]["button-link"]} target="_blank">
            {data.button[0]["link-info"]}
          </a>
        </button>

        <button className="font-ibm-mono flex items-center bg-opacity-0 border-2 text-brand-blue border-brand-blue px-12 sn:px-10 py-3 rounded-sm hover:hover:border-white hover:opacity-75 mt-4 sm:mt-0">
          <a href={data.button[1]["button-link"]} target="_blank">
            {data.button[1]["link-info"]}
          </a>
        </button>
      </div>
      <div className="flex my-20">
        <a href="https://twitter.com/RajeevSinghN" target="_blank">
          {" "}
          <AiOutlineTwitter className="text-3xl text-gray-600 dark:text-white mr-4 hover:text-brand-blue dark-hover:text-brand-blue cursor-pointer" />
        </a>

        <a href="https://github.com/toughyear" target="_blank">
          {" "}
          <AiOutlineGithub className="text-3xl text-gray-600 dark:text-white mr-4 hover:text-brand-blue dark-hover:text-brand-blue cursor-pointer" />
        </a>
        <a
          href="https://www.linkedin.com/in/rajeevsinghnaruka/"
          target="_blank"
        >
          {" "}
          <AiFillLinkedin className="text-3xl text-gray-600 dark:text-white mr-4 hover:text-brand-blue dark-hover:text-brand-blue cursor-pointer" />
        </a>
        <a href="https://codepen.io/toughyear" target="_blank">
          {" "}
          <AiOutlineCodepen className="text-3xl text-gray-600 dark:text-white mr-4 hover:text-brand-blue dark-hover:text-brand-blue cursor-pointer" />
        </a>
      </div>
    </div>
  );
};

export default LandingSection;
