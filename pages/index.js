import Nav from "../components/nav";
import { Client } from "../prismic-configuration";
import { RichText } from "prismic-reactjs";
import Prismic from "prismic-javascript";
import LandingSection from "../components/LandingSection";
import AboutSection from "../components/AboutSection";
import ProjectsSection from "../components/ProjectsSection";
import Footer from "../components/Footer";
import MyTopTweets from "../components/MyTopTweets";
import Head from "next/head";

export default function IndexPage(props) {
  const metaData = props.metaData.results[0].data;

  const og = {
    title: RichText.asText(metaData.title),
    description: RichText.asText(metaData.description),
    imageURL: metaData.image.url,
  };

  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />

        {/* Primary Meta Tags  */}
        <meta key="description" name="description" content={og.description} />

        {/* Open Graph / Facebook  */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://rajeevnaruka.com/" />
        <meta key="og:title" property="og:title" content={og.title} />
        <meta
          key="og:description"
          property="og:description"
          content={og.description}
        />
        <meta key="og:image" property="og:image" content={og.imageURL} />

        {/* Twitter  */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://rajeevnaruka.com/" />
        <meta key="twitter:title" property="twitter:title" content={og.title} />
        <meta
          key="twitter:description"
          property="twitter:description"
          content={og.description}
        />
        <meta
          key="twitter:image"
          property="twitter:image"
          content={og.imageURL}
        />

        <meta property="og:site_name" content="Rajeev Singh Naruka" />
        <meta name="twitter:site" content="@RajeevSinghN" />

        <script
          async
          src="https://platform.twitter.com/widgets.js"
          charSet="utf-8"
        ></script>

        <title>{og.title}</title>
      </Head>
      <div>
        <Nav />
        <div className="w-full max-w-5xl mx-auto px-8">
          <LandingSection data={props.landingData.results[0].data} />
          <AboutSection data={props.aboutData.results[0].data} />
          <ProjectsSection
            featuredProjects={props.featuredProjects.results[0].data}
            miniProjects={props.miniProjects.results[0].data}
          />
          <MyTopTweets data={props.tweetsData.results[0].data} />
        </div>
        <Footer />
      </div>
    </>
  );
}

// this function is called everytime a request/refresh is made

export async function getStaticProps() {
  const landingData = await Client().query(
    Prismic.Predicates.at("document.type", "landing-page")
  );
  const aboutData = await Client().query(
    Prismic.Predicates.at("document.type", "about-section")
  );
  const featuredProjects = await Client().query(
    Prismic.Predicates.at("document.type", "featured-projects")
  );
  const miniProjects = await Client().query(
    Prismic.Predicates.at("document.type", "mini-projects")
  );
  const tweetsData = await Client().query(
    Prismic.Predicates.at("document.type", "tweets-section")
  );

  const metaData = await Client().query(
    Prismic.Predicates.at("document.type", "metadata")
  );

  return {
    props: {
      landingData,
      aboutData,
      featuredProjects,
      miniProjects,
      tweetsData,
      metaData,
    },
  };
}
