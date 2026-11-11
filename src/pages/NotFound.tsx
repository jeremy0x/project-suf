import { useLocation } from "react-router-dom";
import Layout from "../components/Layout";
import { MaskText, Reveal } from "@/components/motion";
import { Btn } from "@/components/site/Btn";

const NotFound = () => {
  const { pathname } = useLocation();

  return (
    <Layout>
      <section className="grain relative flex min-h-[100svh] items-end bg-ink pb-16 pt-32 text-bone">
        <div className="shell relative">
          <Reveal immediate from="left" delay={0.4}>
            <p className="eyebrow mb-8 text-white/50">Error 404 · {pathname}</p>
          </Reveal>
          <MaskText
            as="h1"
            immediate
            delay={0.45}
            lines={["Page not", <span className="text-white/30">found</span>]}
            className="display text-[clamp(4rem,16vw,14rem)]"
          />
          <Reveal immediate delay={0.8} className="mt-12 flex flex-wrap gap-3">
            <Btn to="/">Back home</Btn>
            <Btn to="/contact" variant="outline-light">
              Contact us
            </Btn>
          </Reveal>
        </div>
      </section>
    </Layout>
  );
};

export default NotFound;
