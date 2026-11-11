import { Link } from "react-router-dom";
import { BsFacebook, BsInstagram, BsTwitterX } from "react-icons/bs";
import { MaskText } from "./motion";
import { Arrow, Roll } from "./site/Btn";

const explore = [
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
  { to: "/pricing", label: "Membership" },
  { to: "/gallery", label: "Gallery" },
  { to: "/shop", label: "Shop" },
  { to: "/pricing#faq", label: "FAQ" },
];

const socials = [
  { href: "https://www.instagram.com/shapeupfitnessonline", label: "Instagram", icon: BsInstagram },
  { href: "https://facebook.com", label: "Facebook", icon: BsFacebook },
  { href: "https://x.com/shapeupfitness6", label: "X", icon: BsTwitterX },
];

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="grain relative overflow-hidden bg-ink text-bone">
      <div className="shell relative pt-20 md:pt-28">
        <div className="grid grid-cols-12 gap-x-6 gap-y-14">
          <div className="col-span-12 lg:col-span-5">
            <p className="eyebrow mb-6 text-white/45">Get started</p>
            <Link
              to="/contact?source=footer"
              className="roll-host group inline-flex items-end gap-4 text-bone"
            >
              <span className="title text-[clamp(2.25rem,5vw,4rem)]">
                <Roll>Book a visit</Roll>
              </span>
              <Arrow
                diagonal
                className="mb-3 h-6 w-6 text-brand-blue transition-transform duration-700 ease-in-out-quart group-hover:rotate-0"
              />
            </Link>
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-white/50">
              Embassy Lodge, FUTA South Gate, Akure, Ondo State. Training Monday to Saturday, three
              sessions a day.
            </p>
          </div>

          <div className="col-span-6 md:col-span-4 lg:col-span-2 lg:col-start-7">
            <p className="eyebrow mb-6 text-white/45">Explore</p>
            <ul className="space-y-3 text-sm">
              {explore.map((l) => (
                <li key={l.label}>
                  <Link to={l.to} className="link-line text-white/80 hover:text-white">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-6 md:col-span-4 lg:col-span-2">
            <p className="eyebrow mb-6 text-white/45">Contact</p>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="tel:08134460609" className="link-line text-white/80 hover:text-white">
                  0813 446 0609
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/2348134460609"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-line text-white/80 hover:text-white"
                >
                  WhatsApp
                </a>
              </li>
              <li>
                <a
                  href="mailto:shapeupfitnessclub326@gmail.com"
                  className="link-line break-all text-white/80 hover:text-white"
                >
                  Email us
                </a>
              </li>
            </ul>
          </div>

          <div className="col-span-12 md:col-span-4 lg:col-span-2">
            <p className="eyebrow mb-6 text-white/45">Follow</p>
            <ul className="flex gap-2">
              {socials.map(({ href, label, icon: Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="flex h-10 w-10 items-center justify-center border border-white/15 text-white/70 transition-colors duration-500 hover:border-bone hover:bg-bone hover:text-ink"
                  >
                    <Icon size={15} />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Oversized wordmark, cut off by the bottom edge */}
        <div aria-hidden className="mt-20 select-none md:mt-28">
          <MaskText
            as="p"
            lines={["Shape Up"]}
            className="display whitespace-nowrap text-[22.5vw] leading-[0.78] text-white/[0.07]"
            lineClassName="pb-0 mb-0"
          />
        </div>

        <div className="flex flex-col gap-4 border-t border-white/10 py-6 font-mono text-[11px] uppercase tracking-[0.14em] text-white/45 md:flex-row md:items-center md:justify-between">
          <p>&copy; {year} Shape Up Fitness &middot; BN 6982554</p>
          <p>
            Built by{" "}
            <a
              href="https://jeremy0x.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="link-line text-bone hover:text-brand-blue"
            >
              jeremy0x
            </a>
          </p>
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="roll-host flex items-center gap-2 self-start text-white/70 hover:text-white md:self-auto"
          >
            <Roll>Back to top</Roll>
            <Arrow className="-rotate-90" />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
