import Gun from 'gun';
import { json, LoaderFunction } from 'remix';
import { gun } from '~/utils/db/gun';
import { today } from '~/utils/dates';
interface KeyPair {
  pub: String;
  priv: String;
  epub: String;
  epriv: String;
}
interface User {
  name: String;
  id: keyof KeyPair;
  profile: ProfileData;
}

interface ProfileData {
  url: String;
}

interface TokenData {
  name: String;
  tag_hash: keyof KeyPair['pub'];
  description: String;
  mint_date: String;
  display_name: String;
}

interface Services {
  name: String;
  id: String;
}
export function IconButton() {
  return (
    <button
      id="instagram"
      className="  hover:border-2 border-pink-500 bg-gradient-to-b text-2xl hover:from-indigo-600 hover:via-pink-600 hover:to-yellow-500 hover:text-white bg-white text-pink-600 w-12 h-12  transform hover:-translate-y-3 rounded-full duration-500"
    >
      <i className="fas fa-hashtag "></i>
    </button>
  );
}

export default function TimeLine() {
  return (
    <div>
      <h1 className="text-3xl text-center font-bold text-blue-500">
        Style Test
      </h1>
      <div className="border-l-2 mt-10">
        {/* <!-- Card 1 --> */}
        <div className="transform transition cursor-pointer hover:-translate-y-2 ml-10 relative flex items-center px-6 py-4 bg-blue-600 text-white rounded mb-10 flex-col md:flex-row space-y-4 md:space-y-0">
          {/* <!-- Dot Follwing the Left Vertical Line --> */}
          {/* <div className="w-5 h-5 bg-blue-600 absolute -left-10 transform -translate-x-2/4 rounded-full z-10 mt-2 md:mt-0"></div> */}
          <div className="absolute -left-10 transform -translate-x-2/4 rounded-full z-10 mt-2 md:mt-0">
            <IconButton />
          </div>

          {/* <!-- Line that connecting the box with the vertical line --> */}
          <div className="w-10 h-1 bg-blue-300 absolute -left-10 z-0"></div>

          {/* <!-- Content that showing in the box --> */}
          <div className="flex-auto">
            <h1 className="text-lg">Day 1</h1>
            <h1 className="text-xl font-bold">
              Orientation and Briefing on Uniliver basics
            </h1>
            <h3>Classroom</h3>
          </div>
          <a href="#" className="text-center text-white hover:text-gray-300">
            Download materials
          </a>
        </div>

        {/* <!-- Card 2 --> */}
        <div className="transform transition cursor-pointer hover:-translate-y-2 ml-10 relative flex items-center px-6 py-4 bg-pink-600 text-white rounded mb-10 flex-col md:flex-row space-y-4 md:space-y-0">
          {/* <!-- Dot Follwing the Left Vertical Line --> */}
          <div className="w-5 h-5 bg-pink-600 absolute -left-10 transform -translate-x-2/4 rounded-full z-10 mt-2 md:mt-0"></div>

          {/* <!-- Line that connecting the box with the vertical line --> */}
          <div className="w-10 h-1 bg-pink-300 absolute -left-10 z-0"></div>

          {/* <!-- Content that showing in the box --> */}
          <div className="flex-auto">
            <h1 className="text-lg">Day 1</h1>
            <h1 className="text-xl font-bold">
              Orientation and Briefing on Uniliver basics
            </h1>
            <h3>Classroom</h3>
          </div>
          <a href="#" className="text-center text-white hover:text-gray-300">
            Download materials
          </a>
        </div>

        {/* <!-- Card 3 --> */}
        <div className="transform transition cursor-pointer hover:-translate-y-2 ml-10 relative flex items-center px-6 py-4 bg-green-600 text-white rounded mb-10 flex-col md:flex-row space-y-4 md:space-y-0">
          {/* <!-- Dot Follwing the Left Vertical Line --> */}
          <div className="w-5 h-5 bg-green-600 absolute -left-10 transform -translate-x-2/4 rounded-full z-10 mt-2 md:mt-0"></div>

          {/* <!-- Line that connecting the box with the vertical line --> */}
          <div className="w-10 h-1 bg-green-300 absolute -left-10 z-0"></div>

          {/* <!-- Content that showing in the box --> */}
          <div className="flex-auto">
            <h1 className="text-lg">Day 1</h1>
            <h1 className="text-xl font-bold">
              Orientation and Briefing on Uniliver basics
            </h1>
            <h3>Classroom</h3>
          </div>
          <a href="#" className="text-center text-white hover:text-gray-300">
            Download materials
          </a>
        </div>

        {/* <!-- Card 4 --> */}
        <div className="transform transition cursor-pointer hover:-translate-y-2 ml-10 relative flex items-center px-6 py-4 bg-purple-600 text-white rounded mb-10 flex-col md:flex-row space-y-4 md:space-y-0">
          {/* <!-- Dot Follwing the Left Vertical Line --> */}
          <div className="w-5 h-5 bg-purple-600 absolute -left-10 transform -translate-x-2/4 rounded-full z-10 mt-2 md:mt-0"></div>

          {/* <!-- Line that connecting the box with the vertical line --> */}
          <div className="w-10 h-1 bg-purple-300 absolute -left-10 z-0"></div>

          {/* <!-- Content that showing in the box --> */}
          <div className="flex-auto">
            <h1 className="text-lg">Day 1</h1>
            <h1 className="text-xl font-bold">
              Orientation and Briefing on Uniliver basics
            </h1>
            <h3>Classroom</h3>
          </div>
          <a href="#" className="text-center text-white hover:text-gray-300">
            Download materials
          </a>
        </div>
      </div>
      <aside></aside>
    </div>
  );
}
