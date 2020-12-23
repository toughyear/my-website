import React from "react";
//import { FeaturedProjects, OtherProjects } from "../constants/Projects";
import { AiFillGithub, AiOutlineCode } from "react-icons/ai";
import { FiExternalLink } from "react-icons/fi";
import { GiAstronautHelmet } from "react-icons/gi";

export default function ProjectsSection({ featuredProjects, miniProjects }) {
  function truncate(str, n) {
    return str.length > n ? str.substr(0, n - 1) + "..." : str;
  }

  return (
    <div className="flex flex-col mt-20">
      <h1 className="font-ibm-mono text-2xl text-brand-blue">
        {" "}
        {featuredProjects["section-intro"][0].text}
      </h1>
      <h1 className="about-intro mt-10">{featuredProjects["info"][0].text}</h1>

      {featuredProjects.project.map((project) => (
        <div
          key={project.title[0].text}
          className="flex flex-col md:flex-row mt-10"
        >
          <img
            src={project.image.url}
            alt={project.image.alt ?? "project image"}
            className="w-100 md:w-3/5 shadow-xl"
          />

          <div className="flex flex-col md:text-right justify-center items-start md:items-end md:ml-10">
            <h1 className="text-brand-blue mt-10 md:mt-0 font-bold font-ibm-mono">
              {project["special-info"][0].text}
            </h1>
            <h1 className="font-bold my-2 bg-highlighted">
              {project.title[0].text}
            </h1>
            <p className="mb-4">{truncate(project.description[0].text, 250)}</p>
            <div className="font-ibm-mono text-sm text-brand-blue flex flex-wrap justify-end">
              {project.tags.split(",").map((item) => (
                <span key={item}>{item}&nbsp;</span>
              ))}
            </div>
            <div className="flex md:justify-end text-3xl mt-6">
              {project["github-link"] && (
                <a href={project["github-link"]} target="_blank">
                  <AiFillGithub className="hover:text-brand-blue" />
                </a>
              )}
              {project["live-link"] && (
                <a href={project["live-link"]} target="_blank" className="ml-5">
                  <FiExternalLink className="hover:text-brand-blue" />
                </a>
              )}
            </div>
          </div>
        </div>
      ))}

      <hr className="my-20" />
      <h1 className="font-ibm-mono text-2xl text-brand-blue ">
        {miniProjects["section-intro"][0].text}
      </h1>
      <h1 className="about-intro mt-10">
        {miniProjects["section-info"][0].text}&nbsp;
        <GiAstronautHelmet className="inline text-brand-blue text-2xl" />
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-20">
        {miniProjects.projects.map((project) => (
          <div
            key={project.title[0].text}
            className="mini-project-card flex flex-col items-start py-10 px-5 shadow-xl hover:shadow-2xl push-up"
          >
            <div className="flex text-3xl justify-between w-full">
              <AiOutlineCode />
              <div className="flex">
                {project.github && (
                  <a href={project.github} target="_blank">
                    <AiFillGithub className="hover:text-brand-blue" />
                  </a>
                )}

                {project.live && (
                  <a href={project.live} target="_blank" className="ml-5">
                    <FiExternalLink className="hover:text-brand-blue" />
                  </a>
                )}
              </div>
            </div>
            <h1 className="font-bold my-2 bg-highlighted">
              {project.title[0].text}
            </h1>
            <p className="mb-4">{truncate(project.description[0].text, 250)}</p>
            <h1 className="font-ibm-mono text-sm text-brand-blue flex flex-wrap mt-auto">
              {project.tags.split(",").map((item) => (
                <span key={item}>{item}&nbsp;</span>
              ))}
            </h1>
          </div>
        ))}
      </div>
      <hr />
    </div>
  );
}
