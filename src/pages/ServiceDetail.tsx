import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, CheckCircle2, ArrowRight, Palette, BarChart3, Search, Share2, PenTool, Megaphone } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTASection from "@/components/CTASection";

const servicesData: Record<string, {
  icon: React.ElementType;
  title: string;
  tagline: string;
  description: string;
  features: string[];
  process: { step: string; desc: string }[];
  stats: { value: string; label: string }[];
}> = {
  "web-design": {
    icon: Palette,
    title: "Web Design",
    tagline: "Stunning websites that convert visitors into customers",
    description: "We craft pixel-perfect, high-performance websites that blend aesthetics with conversion science. From landing pages to full-scale platforms, our designs are built to impress and perform. Every detail is considered — from micro-interactions to load speed — ensuring your brand delivers a world-class digital experience.",
    features: [
      "Custom UI/UX design tailored to your brand",
      "Fully responsive across all devices",
      "Conversion-optimized landing pages",
      "Lightning-fast load times & Core Web Vitals",
      "CMS integration (WordPress, Webflow, Shopify)",
      "Ongoing support & maintenance packages",
    ],
    process: [
      { step: "Discovery", desc: "We learn your brand, goals, and audience inside out." },
      { step: "Wireframing", desc: "Blueprint the user journey and page architecture." },
      { step: "Visual Design", desc: "High-fidelity mockups with your brand identity." },
      { step: "Development", desc: "Clean, performant code with modern frameworks." },
      { step: "QA & Launch", desc: "Rigorous testing before going live." },
    ],
    stats: [
      { value: "200+", label: "Websites Launched" },
      { value: "98%", label: "Client Satisfaction" },
      { value: "3x", label: "Avg. Conversion Lift" },
    ],
  },
  "digital-marketing": {
    icon: BarChart3,
    title: "Digital Marketing",
    tagline: "Full-funnel strategies that drive measurable growth",
    description: "Our data-driven digital marketing campaigns are engineered to generate qualified leads, increase revenue, and build lasting brand awareness. We combine creative storytelling with performance analytics to deliver campaigns that consistently outperform benchmarks across every channel.",
    features: [
      "Multi-channel campaign strategy",
      "Marketing automation & CRM integration",
      "Content marketing & copywriting",
      "Email marketing sequences",
      "Analytics & performance dashboards",
      "A/B testing & conversion optimization",
    ],
    process: [
      { step: "Audit", desc: "Deep-dive into your current marketing performance." },
      { step: "Strategy", desc: "Build a custom growth roadmap with clear KPIs." },
      { step: "Execution", desc: "Launch campaigns across targeted channels." },
      { step: "Optimize", desc: "Continuous testing and refinement for peak ROI." },
      { step: "Report", desc: "Transparent reporting with actionable insights." },
    ],
    stats: [
      { value: "$12M+", label: "Revenue Generated" },
      { value: "150+", label: "Campaigns Managed" },
      { value: "5.2x", label: "Avg. ROAS" },
    ],
  },
  "seo-optimization": {
    icon: Search,
    title: "SEO Optimization",
    tagline: "Dominate search rankings and own your niche",
    description: "We engineer sustainable organic growth through technical SEO mastery, strategic content, and authoritative link building. Our approach combines algorithmic understanding with creative content strategies to establish your brand as the go-to authority in your industry.",
    features: [
      "Technical SEO audits & implementation",
      "Keyword research & content strategy",
      "On-page & off-page optimization",
      "Local SEO & Google Business Profile",
      "Link building & digital PR",
      "Monthly ranking & traffic reports",
    ],
    process: [
      { step: "Technical Audit", desc: "Identify and fix site health issues." },
      { step: "Keyword Mapping", desc: "Target high-intent, winnable keywords." },
      { step: "Content Plan", desc: "Create search-optimized content calendar." },
      { step: "Authority Building", desc: "Earn high-quality backlinks." },
      { step: "Monitor & Scale", desc: "Track rankings and scale what works." },
    ],
    stats: [
      { value: "500+", label: "Keywords Ranked #1" },
      { value: "10x", label: "Avg. Traffic Growth" },
      { value: "85%", label: "First Page Rankings" },
    ],
  },
  "social-media-marketing": {
    icon: Share2,
    title: "Social Media Marketing",
    tagline: "Build communities that amplify your brand",
    description: "We transform your social presence into a growth engine. From content creation to community management, we craft platform-specific strategies that build authentic connections, drive engagement, and convert followers into loyal customers across every major social network.",
    features: [
      "Platform-specific content strategies",
      "Professional content creation & design",
      "Community management & engagement",
      "Influencer partnership coordination",
      "Social listening & reputation management",
      "Performance analytics & monthly reports",
    ],
    process: [
      { step: "Brand Audit", desc: "Evaluate your current social footprint." },
      { step: "Content Strategy", desc: "Design a content calendar that resonates." },
      { step: "Create & Publish", desc: "Produce scroll-stopping content daily." },
      { step: "Engage", desc: "Actively grow and nurture your community." },
      { step: "Analyze", desc: "Measure impact and refine the approach." },
    ],
    stats: [
      { value: "2M+", label: "Followers Grown" },
      { value: "300%", label: "Avg. Engagement Lift" },
      { value: "50+", label: "Brands Managed" },
    ],
  },
  "branding-graphic-design": {
    icon: PenTool,
    title: "Branding & Graphic Design",
    tagline: "Distinctive identities that tell your story",
    description: "We build brands that people remember. From logo design to complete brand identity systems, our creative team develops visual languages that differentiate you from the competition and create deep emotional connections with your audience across every touchpoint.",
    features: [
      "Logo design & brand identity systems",
      "Brand guidelines & style documentation",
      "Marketing collateral & print design",
      "Packaging & product design",
      "Social media templates & assets",
      "Presentation & pitch deck design",
    ],
    process: [
      { step: "Brand Discovery", desc: "Understand your vision, values, and audience." },
      { step: "Concept Development", desc: "Explore creative directions and moodboards." },
      { step: "Design Execution", desc: "Craft the final visual identity system." },
      { step: "Brand Guidelines", desc: "Document usage rules for consistency." },
      { step: "Asset Delivery", desc: "Provide all files in every format needed." },
    ],
    stats: [
      { value: "300+", label: "Brands Created" },
      { value: "100%", label: "Ownership Transferred" },
      { value: "4.9★", label: "Avg. Client Rating" },
    ],
  },
  "paid-advertising": {
    icon: Megaphone,
    title: "Paid Advertising",
    tagline: "High-performance campaigns that maximize every dollar",
    description: "We build and manage paid advertising campaigns that deliver exceptional returns. From Google Ads to Meta, TikTok, and LinkedIn, we leverage advanced targeting, creative testing, and bid optimization to ensure your ad spend generates maximum revenue and growth.",
    features: [
      "Google Ads (Search, Display, Shopping)",
      "Meta Ads (Facebook & Instagram)",
      "TikTok & LinkedIn advertising",
      "Retargeting & lookalike audiences",
      "Creative ad design & copywriting",
      "Real-time budget optimization",
    ],
    process: [
      { step: "Account Setup", desc: "Configure tracking, pixels, and audiences." },
      { step: "Campaign Build", desc: "Structure campaigns for maximum efficiency." },
      { step: "Creative Testing", desc: "Launch multiple ad variations." },
      { step: "Optimization", desc: "Scale winners and cut underperformers." },
      { step: "Reporting", desc: "Weekly insights with clear ROI metrics." },
    ],
    stats: [
      { value: "$8M+", label: "Ad Spend Managed" },
      { value: "6.8x", label: "Avg. ROAS" },
      { value: "40%", label: "Lower CPA vs Industry" },
    ],
  },
};

const allSlugs = Object.keys(servicesData);

const ServiceDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const service = slug ? servicesData[slug] : null;

  if (!service) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-heading text-3xl font-bold text-foreground mb-4">Service Not Found</h1>
          <Link to="/" className="gradient-text font-semibold hover:underline">← Back to Home</Link>
        </div>
      </div>
    );
  }

  const Icon = service.icon;
  const currentIndex = allSlugs.indexOf(slug!);
  const nextSlug = allSlugs[(currentIndex + 1) % allSlugs.length];
  const nextService = servicesData[nextSlug];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 right-20 w-96 h-96 rounded-full bg-accent blur-[120px]" />
          <div className="absolute bottom-10 left-10 w-72 h-72 rounded-full bg-accent-blue blur-[100px]" />
        </div>

        <div className="container-wide relative z-10 px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Link to="/#services" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8">
              <ArrowLeft size={16} /> Back to Services
            </Link>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <div className="w-16 h-16 rounded-2xl gradient-bg flex items-center justify-center mb-6">
                <Icon size={28} className="text-accent-foreground" />
              </div>
              <h1 className="font-heading text-4xl lg:text-6xl font-extrabold text-foreground mb-4">
                {service.title}
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed mb-8">
                {service.tagline}
              </p>
              <div className="flex flex-wrap gap-4">
                <a href="https://wa.me/923104833310?text=Hi!%20I'm%20interested%20in%20your%20" 
                   target="_blank" rel="noopener noreferrer"
                   className="gradient-bg text-accent-foreground px-8 py-3 rounded-xl text-sm font-semibold hover:opacity-90 transition-opacity">
                  Get Started
                </a>
                <Link to="/hire" className="border border-border text-foreground px-8 py-3 rounded-xl text-sm font-semibold hover:bg-secondary transition-colors">
                  Request Proposal
                </Link>
              </div>
            </motion.div>

            {/* Stats */}
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
              className="grid grid-cols-3 gap-4">
              {service.stats.map((stat, i) => (
                <div key={i} className="glass-card rounded-2xl p-6 text-center">
                  <p className="font-heading text-3xl lg:text-4xl font-extrabold gradient-text">{stat.value}</p>
                  <p className="text-xs text-muted-foreground mt-1 font-medium">{stat.label}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Description + Features */}
      <section className="section-padding bg-secondary/30">
        <div className="container-wide px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <p className="text-sm font-semibold gradient-text uppercase tracking-widest mb-3">Overview</p>
              <h2 className="font-heading text-3xl lg:text-4xl font-extrabold text-foreground mb-6">
                What We Deliver
              </h2>
              <p className="text-muted-foreground leading-relaxed text-lg">
                {service.description}
              </p>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
              <p className="text-sm font-semibold gradient-text uppercase tracking-widest mb-3">Includes</p>
              <h2 className="font-heading text-3xl lg:text-4xl font-extrabold text-foreground mb-6">
                Key Features
              </h2>
              <ul className="space-y-4">
                {service.features.map((f, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 size={20} className="text-accent mt-0.5 shrink-0" />
                    <span className="text-foreground font-medium">{f}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="section-padding">
        <div className="container-wide px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <p className="text-sm font-semibold gradient-text uppercase tracking-widest mb-3">How It Works</p>
            <h2 className="font-heading text-3xl lg:text-4xl font-extrabold text-foreground">
              Our <span className="gradient-text">{service.title}</span> Process
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {service.process.map((p, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="relative glass-card rounded-2xl p-6 text-center group hover-lift">
                <div className="w-10 h-10 rounded-full gradient-bg flex items-center justify-center mx-auto mb-4 text-accent-foreground font-bold text-sm">
                  {i + 1}
                </div>
                <h3 className="font-heading font-bold text-foreground mb-2">{p.step}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
                {i < service.process.length - 1 && (
                  <ArrowRight size={16} className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 text-muted-foreground/40" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Next Service */}
      <section className="section-padding bg-secondary/30">
        <div className="container-wide px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm text-muted-foreground mb-2">Explore More</p>
          <Link to={`/services/${nextSlug}`} className="inline-flex items-center gap-3 font-heading text-2xl lg:text-3xl font-bold text-foreground hover:text-accent transition-colors">
            {nextService.title} <ArrowRight size={24} />
          </Link>
        </div>
      </section>

      <CTASection />
      <Footer />
    </div>
  );
};

export default ServiceDetail;
