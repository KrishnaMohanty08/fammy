"use client";
import "./globals.css";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect, useState } from "react";
import Navbar from "../components/navbar";
import Image from "next/image";
import Footer from "@/components/footer";
import { Roboto, Comic_Neue } from "next/font/google";
import { UserGroupIcon, ChatBubbleLeftRightIcon, CalendarDaysIcon, PhotoIcon } from '@heroicons/react/24/outline';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const comic = Comic_Neue({
  weight: "700",
  subsets: ["latin"],
});
const roboto = Roboto({
  weight: "500",
  subsets: ["latin"],
});

const tagLine = [
  `Where every family finds home.`,
  `Sharing stories, growing together.`,
  `The heart of your family moments.`,
  `Connecting generations, one post at a time.`,
  `Your family&apos;s digital table`
];


const testimonials = [
  { name: 'Grandma Lily', text: 'Fammy helped me see my grandkids grow up, even from afar ' },
  { name: 'Uncle Joe', text: 'Our family reunions are better organized than ever.' },
  { name: 'Aunt Maya', text: 'I love sharing photos with everyone in one safe place.' }
];

export default function Home() {
  const [word, setWords] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setWords(prev => (prev + 1) % tagLine.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
    });
  }, []);

  return (
    <>
      {/* Simple Gradient Background */}
      <div className="absolute top-0 -z-10 w-full bg-white">
        <div className="absolute bottom-auto left-auto right-0 top-0 h-[500px] w-[500px] -translate-x-[30%] translate-y-[20%] rounded-full bg-[rgba(173,109,244,0.5)] opacity-50 blur-[80px]"></div>
      </div>

      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <div className="flex flex-col items-center mt-20">
        <span className={`${comic.className} text-4xl text-white mt-8`}>
          Fammy: <span className="text-pink-200">{tagLine[word]}</span>
        </span>
        <div className="mt-6">
          <button
            className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-3 px-8 rounded-full shadow-lg transition-transform hover:scale-105 text-xl"
            onClick={() => window.location.href = '/register'}
          >
            Get Started — Join Your Family!
          </button>
        </div>
        <div className="text-center mt-8 text-lg text-white">
          <span className="font-bold text-2xl text-pink-300">1,245</span> families connected and counting!
        </div>
      </div>

      {/* Testimonials Carousel */}
      <div className="max-w-xl mx-auto mt-10">
        <Carousel
          autoPlay
          infinite
          responsive={{
            desktop: { breakpoint: { max: 3000, min: 1024 }, items: 1 },
            tablet: { breakpoint: { max: 1024, min: 464 }, items: 1 },
            mobile: { breakpoint: { max: 464, min: 0 }, items: 1 }
          }}
          showDots
          arrows={false}
        >
          {testimonials.map((t, i) => (
            <div key={i} className="bg-white/80 rounded-xl shadow p-6 m-4 text-black text-center">
              <p className="italic">&quot;{t.text}&quot;</p>
              <span className="font-bold block mt-2">{t.name}</span>
            </div>
          ))}
        </Carousel>
      </div>

      {/* Features & About Section */}
      <main className="m-7 mt-5">
        <div className="flex flex-col md:flex-row my-5 gap-5 text-black p-4 items-center">
          <div data-aos="fade-right" className="duration-300 flex p-1 m-2 border-b border-r border-black rounded-xl shadow-lg ">
            <Image src='/images/p1.png' width={400} height={300} alt="family photo" className="transform transition duration-100 cursor-pointer hover:scale-105 rounded-xl" />
          </div>
          <div data-aos="flip-left" className="flex-1 flex-row border rounded-xl text-white bg-blur-md shadow-lg p-2 bg-black/80">
            <h4 className={`${comic.className} px-2`}>A private social platform for families to stay connected, share memories, and organize events.</h4>
            <h3 className={`${roboto.className} text-yellow-500 text-3xl px-2 mt-2`}>Why?</h3>
            <h4 className={`${comic.className} px-2`}>Families often struggle to stay in touch across generations or distances. Fammy.com can be a safe, private space for family members to communicate and preserve memories.</h4>
          </div>
        </div>

        <div className="flex flex-col md:flex-row text-gray-200 gap-4">
          {/* Features List */}
          <div data-aos="flip-right" className="flex flex-col border rounded-xl bg-black/80 shadow-lg backdrop-blur-md p-4 min-w-[320px]">
            <h2 className="justify-center mb-2 text-2xl">Features</h2>
            <ol className="list-decimal ml-6 space-y-4">
              <li className="flex items-center gap-2">
                <UserGroupIcon className="w-6 h-6 text-purple-500" />
                <span className={comic.className}>User Profiles: Each family member creates a profile with basic info (name, relation, birthday, etc.).</span>
              </li>
              <li className="flex items-center gap-2">
                <ChatBubbleLeftRightIcon className="w-6 h-6 text-blue-500" />
                <span className={comic.className}>Private Chat: Simple messaging for family members.</span>
              </li>
              <li className="flex items-center gap-2">
                <PhotoIcon className="w-6 h-6 text-green-500" />
                <span className={comic.className}>Photo Albums: Upload and organize family photos in shared albums.</span>
              </li>
              <li className="flex items-center gap-2">
                <CalendarDaysIcon className="w-6 h-6 text-pink-500" />
                <span className={comic.className}>Event Planner: Create and manage family events (e.g., reunions, birthdays) with RSVP functionality.</span>
              </li>
            </ol>
          </div>

          {/* Image Section */}
          <div data-aos="fade-left" className="flex p-1 m-2 border-b border-l shadow-lg border-black rounded-xl items-center">
            <Image
              src="/images/p2.png"
              width={400}
              height={300}
              alt="family photo"
              className="transition-transform duration-300 cursor-pointer hover:scale-105 rounded-xl"
            />
          </div>
        </div>
      </main>

      {/* FAQ Accordion */}
      <div className="max-w-2xl mx-auto my-10">
        <h2 className="text-2xl text-center text-white mb-6">Frequently Asked Questions</h2>
        <Accordion className="my-4">
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            Is Fammy private?
          </AccordionSummary>
          <AccordionDetails>
            Yes! Only your invited family can see your posts and photos.
          </AccordionDetails>
        </Accordion>
        <Accordion className="my-4">
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            Can I invite relatives from anywhere?
          </AccordionSummary>
          <AccordionDetails>
            Absolutely! Fammy works worldwide and is perfect for connecting families across distances.
          </AccordionDetails>
        </Accordion>
        <Accordion className="my-4">
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            Is there a mobile app?
          </AccordionSummary>
          <AccordionDetails>
            Yes, Fammy is available on iOS and Android (coming soon!).
          </AccordionDetails>
        </Accordion>
      </div>

      {/* Footer */}
      <Footer />
    </>
  );
}
