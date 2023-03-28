import React from "react";
import ab from "../assets/about.jpg";
function About() {
  return (
    <div data-aos="fade-up" id="About" className="dark:bg-white bg-gray-900">
      <div className="py-16 dark:bg-white bg-gray-900 ">
        <div className="container m-auto px-6 dark:text-gray-900 text-gray-600 md:px-12 xl:px-6">
          <div className="space-y-6 md:space-y-0 md:flex md:gap-6 lg:items-center lg:gap-12">
            <div className="md:5/12 lg:w-5/12">
              <img
                className="rounded-lg "
                src={ab}
                alt="image"
                loading="lazy"
                width=""
                height=""
              />
            </div>
            <div className="md:7/12 lg:w-6/12">
              <h2 className="text-2xl dark:text-gray-900 text-gray-400 font-bold md:text-4xl">
                Mood Swinger: Daily Emotional Check-Ins.
              </h2>
              <p className="mt-6 dark:text-gray-900 text-gray-400">
                Mood Swinger is a web-based application designed to help you
                track and manage your moods. Whether you're feeling happy, sad,
                anxious, or something in between, Mood Swinger provides an easy
                and intuitive way to log your emotions and identify patterns in
                your mental health. With Mood Swinger, you can create a
                personalized mood journal, set reminders to check in on your
                feelings throughout the day, and gain valuable insights into
                your emotional well-being over time.
              </p>
              <p className="mt-4 dark:text-gray-900 text-gray-400">
                Whether you're looking to improve your mental health or simply
                want to gain a better understanding of your emotions, it is the
                perfect tool for anyone who wants to take control of their mood
                and live their best life. Overall, Mood Swinger is a powerful
                and empowering tool for anyone who wants to prioritize their
                mental health and well-being, and take control of their emotions
                and their life.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
