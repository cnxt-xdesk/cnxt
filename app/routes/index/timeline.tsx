import { LoaderFunction } from 'remix';
import { gun, state } from '~/utils/db/gun';
import IconButton from '../../components/ui/icon_buttons';
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
let token = gun.get('tokens/v1').get('token')
export let loader: LoaderFunction = async ({params}:TokenData) => {
  let data: TokenData = {
      name: token.once((data: string) => {
          JSON.stringify(data);
      }),
      tag_hash: keyof, KeyPair, ['pub']: ,
      description: String,
      mint_date: String,
      display_name: String
  };
};

export default function TimeLine() {
  return (
    <div>
      <h1 className="text-3xl text-center font-bold text-blue-500">
        Current Namespaces
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
