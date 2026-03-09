import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Eye } from "lucide-react";
import portfolio1 from "@/assets/portfolio-1.jpg";
import portfolio2 from "@/assets/portfolio-2.jpg";
import portfolio3 from "@/assets/portfolio-3.jpg";
import portfolio4 from "@/assets/portfolio-4.jpg";
import portfolio5 from "@/assets/portfolio-5.jpg";
import portfolio6 from "@/assets/portfolio-6.jpg";

const filters = ["All", "Web Design", "Branding", "SEO", "Marketing"];

const projects = [
  { title: "Luxury Fashion E-Commerce", cat: "Web Design", img: portfolio1, desc: "Premium online store with 180% conversion lift", tall: true },
  { title: "Corporate Identity Suite", cat: "Branding", img: portfolio2, desc: "Gold-standard brand system for Fortune 500", tall: false },
  { title: "Viral Content Campaign", cat: "Marketing", img: portfolio3, desc: "12M+ impressions in 30 days across platforms", tall: true },
  { title: "Enterprise SEO Overhaul", cat: "SEO", img: portfolio4, desc: "From page 5 to #1 rankings in 90 days", tall: false },
  { title: "Fintech Super App", cat: "Web Design", img: portfolio5, desc: "Award-winning mobile banking experience", tall: true },
  { title: "Omnichannel Ad Campaign", cat: "Marketing", img: portfolio6, desc: "4.2x ROAS across Google & Meta platforms", tall: false },
];

const PortfolioSection = () => {
  const [active, setActive] = useState("All");
  const filtered = active === "All" ? projects : projects.filter((p) => p.cat === active);

  return (
    <section id="portfolio" className="section-padding bg-secondary/50">
      <div className="container-wide">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <p className="text-sm font-semibold gradient-text uppercase tracking-widest mb-3">Our Work</p>
          <h2 className="font-heading text-3xl lg:text-5xl font-extrabold text-foreground mb-4">
            Creative <span className="gradient-text">Portfolio</span>
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Explore our award-winning projects that have driven real business results.
          </p>
        </motion.div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-14">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActive(f)}
              className={`px-6 py-2.5 rounded-full text-xs font-bold tracking-wide transition-all duration-300 ${
                active === f
                  ? "gradient-bg text-accent-foreground shadow-lg shadow-accent-purple/20"
                  : "bg-card border border-border text-muted-foreground hover:text-foreground hover:border-foreground/20"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Masonry grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-5 space-y-5">
          <AnimatePresence mode="popLayout">
            {filtered.map((p, i) => (
              <motion.div
                key={p.title}
                layout
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.92 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="break-inside-avoid group relative rounded-2xl overflow-hidden cursor-pointer bg-card border border-border shadow-sm hover:shadow-xl hover:shadow-accent-purple/5 transition-shadow duration-500"
              >
                {/* Image */}
                <div className="relative overflow-hidden">
                  <img
                    src={p.img}
                    alt={p.title}
                    className="w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  />
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-6">
                    <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                      <span className="inline-block text-[10px] font-bold uppercase tracking-widest text-accent-foreground/60 mb-2 gradient-bg-subtle px-3 py-1 rounded-full backdrop-blur-sm">
                        {p.cat}
                      </span>
                      <h3 className="font-heading text-xl font-bold text-accent-foreground leading-tight mb-1">
                        {p.title}
                      </h3>
                      <p className="text-xs text-accent-foreground/70">{p.desc}</p>
                    </div>
                    <div className="flex items-center gap-3 mt-4 translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-75">
                      <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-accent-foreground hover:underline">
                        <Eye size={13} /> View Case Study
                      </span>
                      <ArrowUpRight size={14} className="text-accent-foreground" />
                    </div>
                  </div>
                </div>

                {/* Card info below image */}
                <div className="p-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-heading text-sm font-bold text-foreground group-hover:gradient-text transition-all">
                        {p.title}
                      </h3>
                      <p className="text-xs text-muted-foreground mt-0.5">{p.cat}</p>
                    </div>
                    <div className="w-8 h-8 rounded-full border border-border flex items-center justify-center group-hover:gradient-bg group-hover:border-transparent transition-all duration-300">
                      <ArrowUpRight size={14} className="text-muted-foreground group-hover:text-accent-foreground transition-colors" />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection;
