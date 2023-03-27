import React from "react";
import {
  MicrophoneIcon,
  ChartBarIcon,
  ChartPieIcon,
  Square3Stack3DIcon,
} from "@heroicons/react/24/outline";
function Features() {
  return (
    <div
      data-aos="fade-up"
      id="Features"
      className=" dark:bg-white bg-gray-900"
    >
      <section className="py-12 dark:bg-white bg-gray-900 sm:py-16 lg:py-20">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold leading-tight dark:text-gray-900  text-gray-400 sm:text-4xl xl:text-5xl font-pj">
              Make every step user-centric
            </h2>
            <p className="mt-4 text-base leading-7 dark:text-gray-600  text-gray-400  sm:mt-8 font-pj">
              Lorem ipsum dolor sit amet, consectetur adipis elit
            </p>
          </div>

          <div className="grid grid-cols-1 mt-10 text-center sm:mt-16 sm:grid-cols-2 sm:gap-x-12 gap-y-12 md:grid-cols-3 md:gap-0 xl:mt-24">
            <div className="md:p-8 lg:p-14">
              <MicrophoneIcon
                className="mx-auto dark:text-gray-900  text-gray-400"
                width="46"
                height="46"
              />
              <h3 className="mt-12 text-xl font-bold dark:text-gray-900 text-gray-400 font-pj">
                Support
              </h3>
              <p className="mt-5 text-base dark:text-gray-600  text-gray-400  font-pj">
                Lorem ipsum dolor sit amet, consectetur adipis elit. Sit enim
                nec, proin faucibus nibh et sagittis a. Lacinia purus ac amet.
              </p>
            </div>

            <div className="md:p-8 lg:p-14 md:border-l md:border-gray-200">
              <ChartBarIcon
                className="mx-auto dark:text-gray-900  text-gray-400"
                width="46"
                height="46"
              />
              <h3 className="mt-12 text-xl font-bold dark:text-gray-900 text-gray-400 font-pj">
                Support
              </h3>
              <p className="mt-5 text-base dark:text-gray-600  text-gray-400  font-pj">
                Lorem ipsum dolor sit amet, consectetur adipis elit. Sit enim
                nec, proin faucibus nibh et sagittis a. Lacinia purus ac amet.
              </p>
            </div>

            <div className="md:p-8 lg:p-14 md:border-l md:border-gray-200">
              <ChartBarIcon
                className="mx-auto dark:text-gray-900  text-gray-400"
                width="46"
                height="46"
              />
              <h3 className="mt-12 text-xl font-bold dark:text-gray-900 text-gray-400 font-pj">
                Support
              </h3>
              <p className="mt-5 text-base dark:text-gray-600  text-gray-400  font-pj">
                Lorem ipsum dolor sit amet, consectetur adipis elit. Sit enim
                nec, proin faucibus nibh et sagittis a. Lacinia purus ac amet.
              </p>
            </div>

            <div className="md:p-8 lg:p-14 md:border-t md:border-gray-200">
              <ChartBarIcon
                className="mx-auto dark:text-gray-900  text-gray-400"
                width="46"
                height="46"
              />
              <h3 className="mt-12 text-xl font-bold dark:text-gray-900 text-gray-400 font-pj">
                Support
              </h3>
              <p className="mt-5 text-base dark:text-gray-600  text-gray-400  font-pj">
                Lorem ipsum dolor sit amet, consectetur adipis elit. Sit enim
                nec, proin faucibus nibh et sagittis a. Lacinia purus ac amet.
              </p>
            </div>

            <div className="md:p-8 lg:p-14 md:border-l md:border-gray-200 md:border-t">
              <ChartBarIcon
                className="mx-auto dark:text-gray-900  text-gray-400"
                width="46"
                height="46"
              />
              <h3 className="mt-12 text-xl font-bold dark:text-gray-900 text-gray-400 font-pj">
                Support
              </h3>
              <p className="mt-5 text-base dark:text-gray-600  text-gray-400  font-pj">
                Lorem ipsum dolor sit amet, consectetur adipis elit. Sit enim
                nec, proin faucibus nibh et sagittis a. Lacinia purus ac amet.
              </p>
            </div>

            <div className="md:p-8 lg:p-14 md:border-l md:border-gray-200 md:border-t">
              <ChartPieIcon
                className="mx-auto dark:text-gray-900  text-gray-400"
                width="46"
                height="46"
              />
              <h3 className="mt-12 text-xl font-bold dark:text-gray-900 text-gray-400 font-pj">
                Support
              </h3>
              <p className="mt-5 text-base dark:text-gray-600  text-gray-400  font-pj">
                Lorem ipsum dolor sit amet, consectetur adipis elit. Sit enim
                nec, proin faucibus nibh et sagittis a. Lacinia purus ac amet.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Features;
