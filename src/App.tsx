import { CustomFlowbiteTheme, Flowbite } from "flowbite-react";
import SearchInput from "./components/SearchInput";

const customTheme: CustomFlowbiteTheme = {
  button: {
    color: {
      primary: 'bg-blue-700 hover:bg-blue-800 focus:ring-blue-300',
    },
  },
};

export default function App() {
  return (
    <Flowbite theme={{ theme: customTheme }}>
      <SearchInput />
    </Flowbite>
  )
}