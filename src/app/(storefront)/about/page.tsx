"use client";

import React from "react";
import { motion } from "framer-motion";
import { fadeUp } from "@/animations/variants";
import Image from "next/image";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-bg-primary pt-navbar">
      <section className="section container">
        <div className="grid grid-cols-1 lg:grid-cols-[0.85fr_1.15fr] gap-16 lg:gap-24 items-center">

          {/* Father Portrait */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: 1,
              ease: [0.22, 1, 0.36, 1] as const,
            }}
            className="relative flex justify-center lg:justify-start"
          >
            {/* Decorative frame */}
            <div className="absolute -inset-4 md:-inset-6 border border-gold/20 rounded-[2rem]" />

            {/* Soft background shape */}
            <div className="absolute -bottom-8 -left-8 w-40 h-40 rounded-full bg-gold/10 blur-3xl" />

            {/* Portrait */}
            <div className="relative w-full max-w-md aspect-[4/5] rounded-[1.75rem] overflow-hidden bg-[#e8e1d7] shadow-2xl">
              <Image
                src="https://i.ibb.co/zHZ13NTF/6-BB20257-0-E44-4-FBB-B9-F6-9-FFABF82-BE2-A.png"
                alt="Shri Ramesh Chand Sharma Ji"
                fill
                priority
                className="object-cover object-center"
                sizes="(max-width: 1024px) 90vw, 420px"
              />

              {/* Subtle bottom gradient */}
              <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/20 to-transparent" />
            </div>

            {/* Caption */}
            <div className="absolute -bottom-7 left-6 md:left-10 bg-bg-primary/95 backdrop-blur-md px-6 py-4 rounded-xl shadow-lg border border-gold/10">
              <p className="text-xs uppercase tracking-[0.25em] text-gold mb-1">
                The Inspiration
              </p>
              <p className="font-serif text-lg text-text">
                Shri Ramesh Chand Sharma Ji
              </p>
            </div>
          </motion.div>

          {/* Tribute Content */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="flex flex-col justify-center"
          >
            <span className="text-sm font-semibold text-gold uppercase tracking-[0.3em] mb-6">
              The Story Behind Lavvyaashi
            </span>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-text mb-10 leading-[1.12]">
              Lavvyaashi is a tribute to{" "}
              <span className="italic">My Beloved Father</span>
              <br />
              <span className="text-3xl md:text-4xl lg:text-5xl">
                Shri Ramesh Chand Sharma Ji
              </span>
            </h1>

            <div className="space-y-6 text-[17px] md:text-lg text-text-muted font-light leading-[1.85]">

              <p>
                Every meaningful journey begins with someone who believes in us
                before we believe in ourselves. For me, that person is my
                beloved father,{" "}
                <strong className="font-medium text-text">
                  Shri Ramesh Chand Sharma Ji
                </strong>
                .
              </p>

              <p>
                His integrity, discipline, humility, unwavering values, and
                tireless dedication have been the guiding light of my life. He
                taught me that true success is not measured by wealth or
                recognition, but by honesty, compassion, perseverance, and the
                courage to stand by what is right.
              </p>

              <p>
                Whatever I have achieved today is a reflection of his
                blessings, his sacrifices, and the values he instilled in me.
                Every dream I have dared to pursue has been strengthened by his
                faith in me.
              </p>

              <p>
                <strong className="font-medium text-text">Lavvyaashi</strong>{" "}
                is more than a brand—it is a heartfelt tribute to my father's
                legacy, principles, and blessings. Every product, every
                milestone, and every success carries a part of his inspiration.
              </p>

              <p>
                With profound love, respect, and eternal gratitude, I dedicate
                this journey to my beloved father,{" "}
                <strong className="font-medium text-text">
                  Shri Ramesh Chand Sharma Ji
                </strong>
                . May I always remain worthy of his blessings and continue to
                honor his name through my work and my purpose.
              </p>

              <p className="text-text font-medium">
                Thank you, Papa, for being my greatest teacher, my strongest
                support, and the everlasting inspiration behind everything I do.
              </p>
            </div>

            {/* Signature */}
            <div className="mt-10 pt-8 border-t border-text/10">
              <p className="font-serif italic text-xl text-text-muted">
                With deepest love and gratitude,
              </p>
              <p className="mt-2 font-serif text-2xl text-text">
                Dr. Nishi Sharma
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}