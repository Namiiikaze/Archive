"use client";
import { motion } from "motion/react";
import React, { useState } from "react";
import useUserActivity from "@/hooks/useUserActivity";
import Image from "next/image";

const Nav = () => {
  const navItems = [
    {
      id: 1,
      title: "Archive",
      img: "/img-1.jpeg", // replace with actual path
      link: "#home",
    },
    {
      id: 2,
      title: "Heritage",
      img: "/img-2.jpeg",
      link: "#about",
    },
    {
      id: 3,
      title: "Milestones",
      img: "/img-3.jpeg",
      link: "#projects",
    },
    {
      id: 4,
      title: "Disciplines",
      img: "/img-4.jpeg",
      link: "#contact",
    },
  ];
  const [open, setOpen] = useState<boolean>(false);
  const [mouseHover, setMouseHover] = useState<boolean>(false);
  const activeUser = useUserActivity();
  return (
    <div>
      <div
        onMouseEnter={() => setMouseHover(true)}
        onMouseLeave={() => setMouseHover(false)}
        onClick={() => setOpen(!open)}
        className={`fixed bottom-3 left-1/2 -translate-x-1/2 z-[995] h-12 w-[92%] sm:w-full max-w-xs md:max-w-xl rounded-2xl bg-black text-white px-3 flex items-center ${
          open ? "justify-end z-[1005]" : "justify-between z-[995]"
        } cursor-pointer`}
      >
        <div className={` ${open ? "hidden" : "flex"} gap-2 sm:gap-3 items-center`}>
          {/* logo  */}
          <div className="relative overflow-hidden flex items-center justify-center">
            <motion.img
              src="/scisor.svg"
              alt=""
              animate={!activeUser && !mouseHover ? { y: "100%" } : { y: 0 }}
              transition={{ duration: 0.5, ease: "easeInOut", delay: 0.1 }}
              className="absolute bottom-full left-0   "
            />
            <motion.img
              src="/arrow-up.svg"
              alt=""
              animate={mouseHover && activeUser ? { y: "100%" } : { y: 0 }}
              transition={{ duration: 0.5, ease: "easeInOut", delay: 0.1 }}
              className="absolute bottom-full left-0 scale-125  "
            />
            <motion.img
              src="/logo.svg"
              alt=""
              animate={!mouseHover && activeUser ? { y: 0 } : { y: "130%" }}
              transition={{ duration: 0.5, ease: "easeInOut", delay: 0.1 }}
              className="size-5"
            />
          </div>
          {/* text section  */}
          <motion.div className="relative w-[160px] sm:w-[240px] md:w-[300px] overflow-hidden h-6 text-xs sm:text-sm">
            {/* Default */}
            <motion.div
              animate={!mouseHover && activeUser ? { y: 0 } : { y: "-100%" }}
              transition={{ duration: 0.5, ease: "easeInOut", delay: 0.1 }}
            >
              This is ARCHIVE
            </motion.div>

            {/* Open Menu */}
            <motion.div
              animate={mouseHover && activeUser ? { y: 0 } : { y: "100%" }}
              transition={{ duration: 0.5, ease: "easeInOut", delay: 0.1 }}
              className="absolute top-0 left-0"
            >
              Open Vault
            </motion.div>

            {/* Welcome Back */}
            <motion.div
              animate={!activeUser ? { y: 0 } : { y: "100%" }}
              transition={{ duration: 0.5, ease: "easeInOut", delay: 0.1 }}
              className="absolute top-0 left-0"
            >
              History Never Sleeps
            </motion.div>
          </motion.div>
        </div>

        {/* close btn and current page section  */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            className={`${
              open ? "hidden" : "block"
            } bg-background text-black px-2.5 sm:px-3 py-1 rounded-xl text-xs sm:text-sm`}
          >
            {open ? "close" : "open"}
          </button>{" "}
          <div className="relative w-6 h-6 cursor-pointer">
            {/* Horizontal line */}
            <div
              className={`absolute top-1/2 left-0 h-0.5 w-full bg-white rounded transition-transform duration-300 ${
                open ? "-rotate-90 scale-x-0" : "rotate-0 scale-x-100"
              }`}
            />
            {/* Vertical line */}
            <div
              className={`absolute top-1/2 left-1/2 h-0.5 w-full bg-white rounded transform -translate-x-1/2 -translate-y-1/2 transition-transform duration-300 ${
                open ? "rotate-0 " : "rotate-90  "
              }`}
            />
          </div>
        </div>
      </div>

      {/* content  */}
      <motion.div
        animate={
          open
            ? { maxHeight: 120, zIndex: "1000" }
            : { maxHeight: 50, zIndex: "990" }
        }
        transition={{ duration: 0.8, ease: "easeInOut" }}
        className="fixed bottom-3 left-1/2 -translate-x-1/2 h-[120px] z-[990] w-[92%] sm:w-full max-w-xs md:max-w-xl rounded-2xl bg-black text-white flex flex-col items-start cursor-pointer py-6 px-4 sm:px-8 overflow-hidden"
      >
        <div className="w-full flex justify-between items-center ">
          <h2 className="text-lg sm:text-xl md:text-2xl">We Are ARCHIVE</h2>{" "}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setOpen(false);
              document
                .getElementById("about")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
            className={`bg-background text-black px-3 py-1 rounded-xl cursor-pointer text-xs sm:text-sm`}
          >
            Explore
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default Nav;
