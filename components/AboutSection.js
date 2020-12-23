import React, { useState, useEffect } from "react";
import simpleIcons from "simple-icons";
import dynamic from "next/dynamic";
import { config } from "react-spring";

const TextTransition = dynamic(() => import("react-text-transition"), {
  ssr: false,
});

const Icon = ({ stack, style }) => {
  const icon = simpleIcons.get(stack);
  return (
    <div
      data-icon={stack}
      style={{
        fill: `#${icon.hex}`,
        display: "inline-block",
        width: "50px",
        margin: "0 auto",
        ...style,
      }}
      dangerouslySetInnerHTML={{ __html: icon.svg }}
    />
  );
};

export default function AboutSection({ data }) {
  const [index, setIndex] = useState(0);

  const avatar = `https://images.weserv.nl/?url=https://unavatar.now.sh/github/RajeevSinghN`;

  let SKILLS = data.skills.map((ele) => ele.skillname);

  useEffect(() => {
    //console.log(data);
    const intervalId = setInterval(
      () => setIndex((index) => index + 1),
      3000 // every 3 seconds
    );
  }, []);

  return (
    <>
      <div style={{ marginTop: 50 }}>
        <h1 className="font-ibm-mono text-2xl text-brand-blue">
          {" "}
          {data["section-intro"]}
        </h1>
        <h1 className="about-h1 ">
          <span className=" about-name">Rajeev</span>{" "}
          <TextTransition
            text={SKILLS[index % SKILLS.length]}
            springConfig={config.gentle}
            style={{ display: "inline-block" }}
          />
        </h1>

        <div className="about-intro">
          {data.info.map((element, i) => {
            return (
              <div key={`subsection-${i}`} className="mb-5">
                {element["sub-section"]}
              </div>
            );
          })}
          <hr className="my-10" />
          <h3 className="mb-10">What I've worked with so far</h3>
          <div className="grid grid-cols-2  md:grid-cols-4  lg:grid-cols-6 gap-x-5 gap-y-10">
            {data.tools.map((element, i) => {
              let keytext = String(element["tool-name"]);
              return (
                <div className="flex flex-col items-center" key={`tools-${i}`}>
                  <Icon stack={keytext} />{" "}
                  <h1 className="font-ibm-mono text-sm ">{keytext}</h1>
                </div>
              );
            })}
          </div>
          <hr className="my-10" />
        </div>
      </div>
    </>
  );
}
