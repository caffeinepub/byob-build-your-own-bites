import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  ChevronDown,
  Instagram,
  MapPin,
  Menu,
  Phone,
  Star,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { SiWhatsapp } from "react-icons/si";
import { Category } from "./backend.d";
import { useBusinessInfo, useMenuItems } from "./hooks/useQueries";

const WHATSAPP_URL =
  "https://wa.me/919999999999?text=Hi%20BYOB!%20I%20want%20to%20order";
const MAPS_URL =
  "https://www.google.com/maps?q=111+Sodepur+Rd,+Basunagar,+Madhyamgram,+Kolkata,+West+Bengal+700129";
const MAPS_EMBED_URL =
  "https://www.google.com/maps?q=111+Sodepur+Rd,+Basunagar,+Madhyamgram,+Kolkata,+West+Bengal+700129&output=embed";
const INSTAGRAM_URL = "https://instagram.com/thebyobman";
const REVIEW_URL =
  "https://search.google.com/local/writereview?placeid=ChIJbyob-madhyamgram";

const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Menu", href: "#menu" },
  { label: "Gallery", href: "#gallery" },
  { label: "Location", href: "#location" },
];

const HOW_IT_WORKS = [
  {
    step: 1,
    emoji: "🍟",
    title: "Pick Your Chips",
    desc: "Choose from Lay's, Doritos, Kurkure, or your favourite crunch",
  },
  {
    step: 2,
    emoji: "🍗",
    title: "Choose Your Filling",
    desc: "Spiced chicken tikka or fresh veggie filling — your call",
  },
  {
    step: 3,
    emoji: "🌶️",
    title: "Select Sauces",
    desc: "Hot chilli, creamy cheese, tangy mayo, or all three!",
  },
  {
    step: 4,
    emoji: "😋",
    title: "Mix & Enjoy!",
    desc: "Watch the magic happen — your custom snack, ready in seconds",
  },
];

const MOCK_REVIEWS = [
  {
    name: "Priya Sharma",
    rating: 5,
    text: "The chicken BYOB with extra cheese is absolutely next level! Best street snack in Madhyamgram. I come here every evening after college.",
    date: "2 weeks ago",
  },
  {
    name: "Arjun Banerjee",
    rating: 5,
    text: "Super customizable, super tasty! The concept is genius. The veg option with hot sauce and Doritos is 🔥. Highly recommend to all my friends.",
    date: "1 month ago",
  },
  {
    name: "Sneha Das",
    rating: 5,
    text: "Best value snack in the area. The bhaiya is so friendly and makes each packet with love. BYOB is our gang's go-to spot every single day!",
    date: "3 weeks ago",
  },
];

const FALLBACK_MENU_MAINS = [
  { name: "Chicken BYOB", price: BigInt(80) },
  { name: "Veg BYOB", price: BigInt(70) },
];

const FALLBACK_MENU_ADDONS = [
  { name: "Extra Cheese", price: BigInt(20) },
  { name: "Extra Chicken", price: BigInt(30) },
  { name: "Extra Sauces", price: BigInt(10) },
];

/* ─── Navbar ─────────────────────────────────────────────────── */
function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNavClick = () => setOpen(false);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/95 backdrop-blur-md border-b border-border shadow-lg"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <a
          href="#hero"
          className="flex items-center gap-2"
          aria-label="BYOB Home"
        >
          <img
            src="/assets/generated/byob-logo-transparent.dim_400x200.png"
            alt="BYOB - Build Your Own Bites"
            className="h-10 w-auto object-contain"
          />
        </a>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-6">
          {NAV_LINKS.map((link, i) => (
            <a
              key={link.href}
              href={link.href}
              data-ocid={`nav.link.${i + 1}`}
              className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors duration-200"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Desktop CTA */}
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:flex items-center gap-2 bg-[#25D366] hover:bg-[#1db954] text-white font-semibold px-4 py-2 rounded-full text-sm transition-all duration-200 hover:scale-105"
        >
          <SiWhatsapp className="h-4 w-4" />
          Order Now
        </a>

        {/* Mobile hamburger */}
        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="md:hidden p-2 text-foreground"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-card border-b border-border px-4 pb-4"
          >
            <div className="flex flex-col gap-3 pt-2">
              {NAV_LINKS.map((link, i) => (
                <a
                  key={link.href}
                  href={link.href}
                  data-ocid={`nav.link.${i + 1}`}
                  onClick={handleNavClick}
                  className="text-base font-medium py-2 border-b border-border/50 text-foreground/80 hover:text-primary transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleNavClick}
                className="flex items-center justify-center gap-2 bg-[#25D366] text-white font-semibold px-4 py-3 rounded-full mt-2"
              >
                <SiWhatsapp className="h-5 w-5" />
                Order on WhatsApp
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

/* ─── Hero ───────────────────────────────────────────────────── */
function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/assets/generated/hero-bg.dim_1200x800.jpg')",
        }}
        aria-hidden="true"
      />
      {/* Dark gradient overlay */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, oklch(0.08 0.01 30 / 0.75) 0%, oklch(0.08 0.01 30 / 0.85) 60%, oklch(0.11 0.015 30) 100%)",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 text-center px-4 max-w-3xl mx-auto pt-24 pb-20">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-4"
        >
          <Badge
            className="text-xs font-semibold px-4 py-1.5 rounded-full"
            style={{
              background: "oklch(0.78 0.18 75 / 0.15)",
              border: "1px solid oklch(0.78 0.18 75 / 0.4)",
              color: "oklch(0.78 0.18 75)",
            }}
          >
            📍 Madhyamgram, Kolkata
          </Badge>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-4xl sm:text-5xl md:text-6xl font-black leading-tight mb-4"
          style={{ fontFamily: "'Bricolage Grotesque', Outfit, sans-serif" }}
        >
          <span className="text-gradient-fire">Build Your Own</span>
          <br />
          <span className="text-foreground">Snack Packet in</span>
          <br />
          <span className="text-gradient-gold">Madhyamgram</span>
        </motion.h1>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="text-base sm:text-lg text-foreground/75 mb-8 max-w-xl mx-auto leading-relaxed"
        >
          Pick your chips. Add veg or chicken fillings. Choose sauces. Enjoy the
          most customizable street snack experience.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            data-ocid="hero.primary_button"
            className="flex items-center justify-center gap-3 bg-[#25D366] hover:bg-[#1db954] text-white font-bold px-8 py-4 rounded-full text-base transition-all duration-200 hover:scale-105 hover:shadow-lg"
          >
            <SiWhatsapp className="h-5 w-5" />
            Order on WhatsApp
          </a>
          <a
            href={MAPS_URL}
            target="_blank"
            rel="noopener noreferrer"
            data-ocid="hero.secondary_button"
            className="flex items-center justify-center gap-3 border-2 font-bold px-8 py-4 rounded-full text-base transition-all duration-200 hover:scale-105"
            style={{
              borderColor: "oklch(0.78 0.18 75)",
              color: "oklch(0.78 0.18 75)",
            }}
          >
            <MapPin className="h-5 w-5" />
            Get Directions
          </a>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="mt-16 flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
          >
            <ChevronDown className="h-7 w-7 text-primary/60" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

/* ─── About ──────────────────────────────────────────────────── */
function AboutSection() {
  return (
    <section id="about" className="py-20 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div
              className="absolute -inset-2 rounded-2xl opacity-40 blur-xl"
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.78 0.18 75), oklch(0.55 0.22 25))",
              }}
              aria-hidden="true"
            />
            <img
              src="/assets/generated/gallery-1.dim_600x600.jpg"
              alt="BYOB custom snack packet being prepared"
              className="relative rounded-2xl w-full object-cover aspect-square shadow-2xl"
              loading="lazy"
            />
            {/* Floating badge */}
            <div
              className="absolute -bottom-4 -right-4 px-4 py-2 rounded-xl text-sm font-bold shadow-lg"
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.78 0.18 75), oklch(0.68 0.20 45))",
                color: "oklch(0.11 0.015 30)",
              }}
            >
              🔥 100% Fresh & Custom
            </div>
          </motion.div>

          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <Badge
              className="mb-4 text-xs font-semibold px-3 py-1 rounded-full"
              style={{
                background: "oklch(0.55 0.22 25 / 0.15)",
                border: "1px solid oklch(0.55 0.22 25 / 0.4)",
                color: "oklch(0.75 0.15 25)",
              }}
            >
              Our Story
            </Badge>
            <h2
              className="text-3xl sm:text-4xl font-black mb-6 leading-tight"
              style={{
                fontFamily: "'Bricolage Grotesque', Outfit, sans-serif",
              }}
            >
              Street Food, <span className="text-gradient-fire">Your Way</span>
            </h2>
            <p className="text-foreground/75 text-base leading-relaxed mb-6">
              BYOB is a unique street snack concept where customers create their
              own snack packet by choosing chips, fillings, and sauces. Every
              packet is freshly prepared and customized to your taste.
            </p>
            <p className="text-foreground/75 text-base leading-relaxed mb-8">
              Born in the lanes of Madhyamgram, we believe every snack lover
              deserves to eat exactly what they want. No compromises — just
              pure, explosive flavour made to order.
            </p>
            <div className="grid grid-cols-3 gap-4 text-center">
              {[
                { value: "100%", label: "Fresh Daily" },
                { value: "₹70+", label: "Starting Price" },
                { value: "∞", label: "Combinations" },
              ].map((stat) => (
                <div key={stat.label} className="step-card rounded-xl p-3">
                  <div className="text-2xl font-black text-gradient-fire">
                    {stat.value}
                  </div>
                  <div className="text-xs text-foreground/60 mt-1">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ─── How It Works ───────────────────────────────────────────── */
function HowItWorksSection() {
  return (
    <section
      id="how-it-works"
      className="py-20 px-4"
      style={{ background: "oklch(0.13 0.018 30)" }}
    >
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <Badge
            className="mb-4 text-xs font-semibold px-3 py-1 rounded-full"
            style={{
              background: "oklch(0.68 0.20 45 / 0.15)",
              border: "1px solid oklch(0.68 0.20 45 / 0.4)",
              color: "oklch(0.78 0.18 75)",
            }}
          >
            Simple & Fun
          </Badge>
          <h2
            className="text-3xl sm:text-4xl font-black leading-tight"
            style={{ fontFamily: "'Bricolage Grotesque', Outfit, sans-serif" }}
          >
            How It Works <span className="text-gradient-fire">in 4 Steps</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {HOW_IT_WORKS.map((item, i) => (
            <motion.div
              key={item.step}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="step-card rounded-2xl p-6 text-center relative overflow-hidden group"
            >
              {/* Step number */}
              <div
                className="absolute top-3 right-3 w-7 h-7 rounded-full flex items-center justify-center text-xs font-black"
                style={{
                  background:
                    "linear-gradient(135deg, oklch(0.78 0.18 75), oklch(0.68 0.20 45))",
                  color: "oklch(0.11 0.015 30)",
                }}
              >
                {item.step}
              </div>
              {/* Emoji */}
              <div className="text-5xl mb-4 transition-transform duration-300 group-hover:scale-110 inline-block">
                {item.emoji}
              </div>
              <h3 className="font-bold text-base mb-2 text-foreground">
                {item.title}
              </h3>
              <p className="text-sm text-foreground/60 leading-relaxed">
                {item.desc}
              </p>
              {/* Connector arrow on desktop */}
              {i < 3 && (
                <div
                  className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 z-10 text-primary text-lg"
                  aria-hidden="true"
                >
                  →
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Menu ───────────────────────────────────────────────────── */
function MenuSection() {
  const { data: menuItems, isLoading, isError } = useMenuItems();

  const mainItems =
    menuItems?.filter((item) => item.category === Category.main) ??
    FALLBACK_MENU_MAINS.map((m) => ({ ...m, category: Category.main }));

  const addOnItems =
    menuItems?.filter((item) => item.category === Category.addOn) ??
    FALLBACK_MENU_ADDONS.map((m) => ({ ...m, category: Category.addOn }));

  return (
    <section id="menu" className="py-20 px-4">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <Badge
            className="mb-4 text-xs font-semibold px-3 py-1 rounded-full"
            style={{
              background: "oklch(0.78 0.18 75 / 0.15)",
              border: "1px solid oklch(0.78 0.18 75 / 0.4)",
              color: "oklch(0.78 0.18 75)",
            }}
          >
            Our Menu
          </Badge>
          <h2
            className="text-3xl sm:text-4xl font-black leading-tight"
            style={{ fontFamily: "'Bricolage Grotesque', Outfit, sans-serif" }}
          >
            What's <span className="text-gradient-fire">Cooking 🔥</span>
          </h2>
        </motion.div>

        {isLoading ? (
          <div
            data-ocid="menu.loading_state"
            className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8"
          >
            {[1, 2].map((n) => (
              <Skeleton key={n} className="h-44 rounded-2xl" />
            ))}
          </div>
        ) : isError ? (
          <div
            data-ocid="menu.error_state"
            className="text-center py-8 text-foreground/50"
          >
            <p>Couldn't load menu. Showing our popular items below!</p>
          </div>
        ) : null}

        {/* Main items */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
          {mainItems.map((item, i) => (
            <motion.div
              key={item.name}
              data-ocid={`menu.item.${i + 1}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="menu-card-main rounded-2xl p-6 transition-all duration-300 cursor-default group"
            >
              {/* Top row */}
              <div className="flex items-start justify-between gap-2 mb-3">
                <div>
                  <h3 className="text-lg font-bold text-foreground">
                    {item.name}
                  </h3>
                  <p className="text-sm text-foreground/50 mt-0.5">
                    Custom made to order
                  </p>
                </div>
                <div
                  className="text-2xl font-black shrink-0"
                  style={{ color: "oklch(0.78 0.18 75)" }}
                >
                  ₹{Number(item.price)}
                </div>
              </div>
              {/* Features */}
              <div className="flex flex-wrap gap-2 mt-4">
                {["Freshly Made", "Pick Your Chips", "Choose Sauces"].map(
                  (tag) => (
                    <span
                      key={tag}
                      className="text-xs px-2 py-1 rounded-full"
                      style={{
                        background: "oklch(0.78 0.18 75 / 0.1)",
                        color: "oklch(0.78 0.18 75 / 0.9)",
                        border: "1px solid oklch(0.78 0.18 75 / 0.2)",
                      }}
                    >
                      {tag}
                    </span>
                  ),
                )}
              </div>
              {/* Bottom CTA */}
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 flex items-center gap-2 text-sm font-semibold transition-colors duration-200"
                style={{ color: "oklch(0.55 0.22 25)" }}
              >
                <SiWhatsapp className="h-4 w-4" />
                Order This →
              </a>
            </motion.div>
          ))}
        </div>

        {/* Add-ons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5 }}
          className="rounded-2xl p-6"
          style={{
            background: "oklch(0.14 0.018 30)",
            border: "1px solid oklch(0.25 0.03 40)",
          }}
        >
          <h3 className="font-bold text-base mb-4 text-foreground/80">
            ➕ Optional Add-ons
          </h3>
          <div className="space-y-3">
            {addOnItems.map((item) => (
              <div
                key={item.name}
                className="flex items-center justify-between text-sm"
              >
                <span className="text-foreground/70">{item.name}</span>
                <span
                  className="font-bold"
                  style={{ color: "oklch(0.68 0.20 45)" }}
                >
                  +₹{Number(item.price)}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Order CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-8 text-center"
        >
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            data-ocid="menu.primary_button"
            className="inline-flex items-center gap-3 bg-[#25D366] hover:bg-[#1db954] text-white font-bold px-8 py-4 rounded-full text-base transition-all duration-200 hover:scale-105 shadow-lg"
          >
            <SiWhatsapp className="h-5 w-5" />
            Order on WhatsApp
          </a>
        </motion.div>
      </div>
    </section>
  );
}

/* ─── Gallery ────────────────────────────────────────────────── */
const GALLERY_IMAGES = [
  {
    src: "/assets/generated/gallery-1.dim_600x600.jpg",
    alt: "Custom snack packet close-up",
  },
  {
    src: "/assets/generated/gallery-2.dim_600x600.jpg",
    alt: "Sauce being poured over chips",
  },
  {
    src: "/assets/uploads/images-byob-1.jpg",
    alt: "BYOB chip display stand",
  },
  {
    src: "/assets/uploads/download-byob-2.jpg",
    alt: "Custom BYOB snack packet close-up",
  },
  {
    src: "/assets/generated/gallery-5.dim_600x600.jpg",
    alt: "Ingredients flat lay",
  },
  {
    src: "/assets/generated/gallery-6.dim_600x600.jpg",
    alt: "Chips with cheese close-up",
  },
];

function GallerySection() {
  return (
    <section
      id="gallery"
      className="py-20 px-4"
      style={{ background: "oklch(0.13 0.018 30)" }}
    >
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2
            className="text-3xl sm:text-4xl font-black leading-tight"
            style={{ fontFamily: "'Bricolage Grotesque', Outfit, sans-serif" }}
          >
            Fresh Every Day 📸
          </h2>
          <p className="mt-3 text-foreground/50 text-sm">
            Real food, real moments, real flavour
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
          {GALLERY_IMAGES.map((img, i) => (
            <motion.div
              key={img.src}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: i * 0.07 }}
              className="gallery-card overflow-hidden rounded-xl aspect-square"
            >
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Instagram ──────────────────────────────────────────────── */
function InstagramSection() {
  return (
    <section id="instagram" className="py-20 px-4">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="relative rounded-3xl overflow-hidden p-px"
          style={{
            background:
              "linear-gradient(135deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)",
          }}
        >
          <div
            className="rounded-3xl p-8 sm:p-12 text-center"
            style={{ background: "oklch(0.14 0.018 30)" }}
          >
            {/* Instagram icon */}
            <div
              className="w-16 h-16 rounded-2xl mx-auto mb-6 flex items-center justify-center"
              style={{
                background:
                  "linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)",
              }}
            >
              <Instagram className="h-8 w-8 text-white" />
            </div>
            <h2
              className="text-2xl sm:text-3xl font-black mb-4"
              style={{
                fontFamily: "'Bricolage Grotesque', Outfit, sans-serif",
              }}
            >
              Follow{" "}
              <span
                style={{
                  background:
                    "linear-gradient(135deg, #f09433, #dc2743, #bc1888)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                @thebyobman
              </span>
            </h2>
            <p className="text-foreground/65 text-base leading-relaxed mb-8 max-w-md mx-auto">
              Daily reels, behind-the-scenes content, new menu drops, and snack
              experiments. Don't miss out on the most flavourful feed in
              Kolkata!
            </p>
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="instagram-gradient inline-flex items-center gap-3 text-white font-bold px-8 py-4 rounded-full text-base transition-all duration-200 hover:scale-105 hover:opacity-90 shadow-xl"
            >
              <Instagram className="h-5 w-5" />
              Follow on Instagram
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ─── Location ───────────────────────────────────────────────── */
function LocationSection() {
  const { data: bizInfo } = useBusinessInfo();
  const address =
    bizInfo?.address ??
    "111, Sodepur Rd, Basunagar, Madhyamgram, Kolkata, West Bengal 700129";
  const phone = bizInfo?.phone ?? "+91 98765 43210";

  return (
    <section
      id="location"
      className="py-20 px-4"
      style={{ background: "oklch(0.13 0.018 30)" }}
    >
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <Badge
            className="mb-4 text-xs font-semibold px-3 py-1 rounded-full"
            style={{
              background: "oklch(0.55 0.22 25 / 0.15)",
              border: "1px solid oklch(0.55 0.22 25 / 0.4)",
              color: "oklch(0.75 0.15 25)",
            }}
          >
            Find Us
          </Badge>
          <h2
            className="text-3xl sm:text-4xl font-black leading-tight"
            style={{ fontFamily: "'Bricolage Grotesque', Outfit, sans-serif" }}
          >
            Come Visit Us <span className="text-gradient-fire">📍</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-5 gap-8 items-start">
          {/* Map */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7 }}
            className="md:col-span-3 rounded-2xl overflow-hidden shadow-2xl"
            style={{ border: "1px solid oklch(0.25 0.03 40)" }}
          >
            <iframe
              src={MAPS_EMBED_URL}
              width="100%"
              height="320"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="BYOB Location - 111 Sodepur Rd, Madhyamgram"
              data-ocid="location.map_marker"
            />
          </motion.div>

          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="md:col-span-2 space-y-4"
          >
            {/* Address */}
            <div
              className="rounded-xl p-4"
              style={{
                background: "oklch(0.16 0.02 30)",
                border: "1px solid oklch(0.25 0.03 40)",
              }}
            >
              <div className="flex items-start gap-3">
                <MapPin
                  className="h-5 w-5 mt-0.5 shrink-0"
                  style={{ color: "oklch(0.78 0.18 75)" }}
                />
                <div>
                  <p className="text-xs text-foreground/50 mb-1">Address</p>
                  <p className="text-sm text-foreground/85 leading-snug">
                    {address}
                  </p>
                </div>
              </div>
            </div>

            {/* Hours */}
            <div
              className="rounded-xl p-4"
              style={{
                background: "oklch(0.16 0.02 30)",
                border: "1px solid oklch(0.25 0.03 40)",
              }}
            >
              <p className="text-xs text-foreground/50 mb-1">Opening Hours</p>
              <p className="text-sm font-semibold text-foreground/85">
                Every Day: 4 PM – 10 PM
              </p>
              <p className="text-xs text-foreground/50 mt-1">
                Best visited in the evenings!
              </p>
            </div>

            {/* Buttons */}
            <div className="flex flex-col gap-3">
              <a
                href={MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                data-ocid="location.primary_button"
                className="flex items-center justify-center gap-2 font-bold px-4 py-3 rounded-xl text-sm transition-all duration-200 hover:scale-[1.02]"
                style={{
                  background:
                    "linear-gradient(135deg, oklch(0.78 0.18 75), oklch(0.68 0.20 45))",
                  color: "oklch(0.11 0.015 30)",
                }}
              >
                <MapPin className="h-4 w-4" />
                Get Directions
              </a>
              <a
                href={`tel:${phone.replace(/\s/g, "")}`}
                data-ocid="location.secondary_button"
                className="flex items-center justify-center gap-2 font-bold px-4 py-3 rounded-xl text-sm border transition-all duration-200 hover:scale-[1.02]"
                style={{
                  borderColor: "oklch(0.25 0.03 40)",
                  color: "oklch(0.85 0.04 60)",
                }}
              >
                <Phone className="h-4 w-4" />
                Call Now — {phone}
              </a>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                data-ocid="location.whatsapp_button"
                className="flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1db954] text-white font-bold px-4 py-3 rounded-xl text-sm transition-all duration-200 hover:scale-[1.02]"
              >
                <SiWhatsapp className="h-4 w-4" />
                Order on WhatsApp
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ─── Reviews ────────────────────────────────────────────────── */
function ReviewsSection() {
  return (
    <section id="reviews" className="py-20 px-4">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <Badge
            className="mb-4 text-xs font-semibold px-3 py-1 rounded-full"
            style={{
              background: "oklch(0.78 0.18 75 / 0.15)",
              border: "1px solid oklch(0.78 0.18 75 / 0.4)",
              color: "oklch(0.78 0.18 75)",
            }}
          >
            ⭐ Customer Love
          </Badge>
          <h2
            className="text-3xl sm:text-4xl font-black leading-tight"
            style={{ fontFamily: "'Bricolage Grotesque', Outfit, sans-serif" }}
          >
            What Our Fans <span className="text-gradient-fire">Are Saying</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {MOCK_REVIEWS.map((review, i) => (
            <motion.div
              key={review.name}
              data-ocid={`reviews.item.${i + 1}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className="rounded-2xl p-6 flex flex-col gap-4"
              style={{
                background: "oklch(0.16 0.02 30)",
                border: "1px solid oklch(0.25 0.03 40)",
              }}
            >
              {/* Stars */}
              <div className="flex gap-1" aria-label={`${review.rating} stars`}>
                {Array.from({ length: review.rating }, (_, j) => (
                  <Star
                    key={`star-${j + 1}`}
                    className="h-4 w-4 fill-current"
                    style={{ color: "oklch(0.78 0.18 75)" }}
                  />
                ))}
              </div>
              {/* Review text */}
              <p className="text-sm text-foreground/75 leading-relaxed flex-1">
                "{review.text}"
              </p>
              {/* Reviewer */}
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-bold text-foreground">
                    {review.name}
                  </p>
                  <p className="text-xs text-foreground/40 mt-0.5">
                    {review.date}
                  </p>
                </div>
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold"
                  style={{
                    background:
                      "linear-gradient(135deg, oklch(0.78 0.18 75), oklch(0.55 0.22 25))",
                    color: "white",
                  }}
                >
                  {review.name[0]}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Leave a review */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <p className="text-foreground/50 text-sm mb-4">
            Had a great experience? Share it with the world!
          </p>
          <a
            href={REVIEW_URL}
            target="_blank"
            rel="noopener noreferrer"
            data-ocid="reviews.primary_button"
            className="inline-flex items-center gap-3 font-bold px-8 py-4 rounded-full text-base transition-all duration-200 hover:scale-105"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.78 0.18 75), oklch(0.55 0.22 25))",
              color: "oklch(0.11 0.015 30)",
            }}
          >
            <Star className="h-5 w-5 fill-current" />
            Leave a Google Review
          </a>
        </motion.div>
      </div>
    </section>
  );
}

/* ─── Footer ─────────────────────────────────────────────────── */
function Footer() {
  const { data: bizInfo } = useBusinessInfo();
  const address =
    bizInfo?.address ??
    "111, Sodepur Rd, Basunagar, Madhyamgram, Kolkata, West Bengal 700129";
  const phone = bizInfo?.phone ?? "+91 98765 43210";
  const year = new Date().getFullYear();
  const utmLink = `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`;

  return (
    <footer
      className="py-12 px-4"
      style={{
        background: "oklch(0.08 0.01 30)",
        borderTop: "1px solid oklch(0.20 0.02 30)",
      }}
    >
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
          {/* Brand */}
          <div>
            <img
              src="/assets/generated/byob-logo-transparent.dim_400x200.png"
              alt="BYOB"
              className="h-12 w-auto mb-4 object-contain"
            />
            <p className="text-sm text-foreground/50 leading-relaxed max-w-xs">
              Madhyamgram's most customizable street snack experience. Every
              bite, your way.
            </p>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-bold text-sm text-foreground/70 uppercase tracking-wider mb-4">
              Contact
            </h3>
            <div className="space-y-3 text-sm text-foreground/55">
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 shrink-0 mt-0.5 text-primary/70" />
                <span>{address}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 shrink-0 text-primary/70" />
                <a
                  href={`tel:${phone.replace(/\s/g, "")}`}
                  className="hover:text-primary transition-colors"
                >
                  {phone}
                </a>
              </div>
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-bold text-sm text-foreground/70 uppercase tracking-wider mb-4">
              Follow Us
            </h3>
            <div className="flex flex-col gap-3">
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-foreground/55 hover:text-foreground transition-colors"
              >
                <Instagram className="h-4 w-4" />
                @thebyobman
              </a>
              <a
                href={MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-foreground/55 hover:text-foreground transition-colors"
              >
                <MapPin className="h-4 w-4" />
                View on Google Maps
              </a>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-foreground/55 hover:text-[#25D366] transition-colors"
              >
                <SiWhatsapp className="h-4 w-4" />
                WhatsApp Order
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-foreground/35"
          style={{ borderTop: "1px solid oklch(0.18 0.02 30)" }}
        >
          <span>
            © {year} BYOB — Build Your Own Bites. All rights reserved.
          </span>
          <a
            href={utmLink}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground/60 transition-colors"
          >
            Built with ❤️ using caffeine.ai
          </a>
        </div>
      </div>
    </footer>
  );
}

/* ─── Floating WhatsApp Button ───────────────────────────────── */
function FloatingWhatsApp() {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      data-ocid="whatsapp.primary_button"
      aria-label="Order on WhatsApp"
      className="wa-float-btn fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center shadow-2xl transition-transform duration-200 hover:scale-110"
      style={{ background: "#25D366" }}
    >
      <SiWhatsapp className="h-7 w-7 text-white" />
    </a>
  );
}

/* ─── App ─────────────────────────────────────────────────────── */
export default function App() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <HowItWorksSection />
        <MenuSection />
        <GallerySection />
        <InstagramSection />
        <LocationSection />
        <ReviewsSection />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
