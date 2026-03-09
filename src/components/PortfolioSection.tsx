import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import portfolio1 from "@/assets/portfolio-1.jpg";
import portfolio2 from "@/assets/portfolio-2.jpg";
import portfolio3 from "@/assets/portfolio-3.jpg";
import portfolio4 from "@/assets/portfolio-4.jpg";
import portfolio5 from "@/assets/portfolio-5.jpg";
import portfolio6 from "@/assets/portfolio-6.jpg";

const filters = ["All", "Web Design", "Branding", "SEO", "Marketing"];

const projects = [
  { title: "Luxury E-Commerce", cat: "Web Design", img: portfolio1, tall: true },
  { title: "Corporate Rebrand", cat: "Branding", img: portfolio2, tall: false },
  { title: "Social Media Campaign", cat: "Marketing", img: portfolio3, tall: true },
  { title: "SEO Performance Boost", cat: "SEO", img: portfolio4, tall: false },
  { title: "Fintech App Design", cat: "Web Design", img: portfolio5, tall: true },
  { title: "Paid Ads Dashboard", cat: "Marketing", img: portfolio6, tall: false },
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
          className="text-center mb-12"
        >
          <p className="text-sm font-semibold gradient-text uppercase tracking-widest mb-3">Our Work</p>
          <h2 className="font-heading text-3xl lg:text-5xl font-extrabold text-foreground">
            Creative <span className="gradient-text">Portfolio</span>
          </h2>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActive(f)}
              className={`px-5 py-2 rounded-full text-xs font-semibold transition-all duration-300 ${
                active === f
                  ? "gradient-bg text-accent-foreground"
                  : "bg-card border border-border text-muted-foreground hover:text-foreground"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((p) => (
              <motion.div
                key={p.title}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="break-inside-avoid group relative rounded-2xl overflow-hidden cursor-pointer"
              >
                <img
                  src={p.img}
                  alt={p.title}
                  className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                  <div>
                    <p className="text-xs text-accent-foreground/70 font-medium mb-1">{p.cat}</p>
                    <h3 className="font-heading text-lg font-bold text-accent-foreground">{p.title}</h3>
                    <p className="text-xs text-accent-foreground/60 mt-1">View Case Study →</p>
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
