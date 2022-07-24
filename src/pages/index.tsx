import type { NextPage } from "next";
import Head from "next/head";
import { trpc } from "../utils/trpc";
import { FaGithub } from "react-icons/fa";
import { signIn, signOut, useSession } from "next-auth/react";

type TechnologyCardProps = {
  name: string;
  description: string;
  documentation: string;
};

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Todo</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar buttons={[<GithubLoginButton key="github-login-btn" />]} />
      <main className="mt-14 container mx-auto flex flex-col items-center justify-center h-screen p-4">
        <h1 className="text-5xl md:text-[5rem] leading-normal font-extrabold text-gray-700">
          Todo
        </h1>
        <CurrentTask />
      </main>
    </>
  );
};

const TechnologyCard = ({
  name,
  description,
  documentation,
}: TechnologyCardProps) => {
  return (
    <section className="flex flex-col justify-center p-6 duration-500 border-2 border-gray-500 rounded shadow-xl motion-safe:hover:scale-105">
      <h2 className="text-lg text-gray-700">{name}</h2>
      <p className="text-sm text-gray-600">{description}</p>
      <a
        className="mt-3 text-sm underline text-violet-500 decoration-dotted underline-offset-2"
        href={documentation}
        target="_blank"
        rel="noreferrer"
      >
        Documentation
      </a>
    </section>
  );
};
const CurrentTask = () => {
  const tasks: String[] = [
    // "Create login authentication. User should see custom message after login.",
    "Commit to Github",
    "Something else",
    "Another thing",
    "This makes the page big",
    "Fix navbar transparency and scrolling problem",
    "Migrate this todo list to be user specific",
    "If not scrolled, then navbar should be fixed"
  ];

  return (
    <div className="mt-2">
      <h1 className="mb-1 text-center font-semibold">Current Tasks</h1>
      <p className="text-center text-xs text-gray-500 mb-2">
        For website developer
      </p>
      <ul className="border border-gray-200 rounded overflow-hidden shadow-md">
        {tasks.map((task, index) => {
          return (
            <li
              key={index + "task"}
              className="px-4 py-2 bg-white hover:bg-purple-100 border-b last:border-none border-gray-200 transition-all ease-in-out"
            >
              {task}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

const GithubLoginButton = () => {
  return (
    <button
      className="flex text-center items-center"
      onClick={() => signIn("github")}
    >
      <FaGithub />
      <span>Login</span>
    </button>
  );
};

type NavbarProps = {
  buttons: [JSX.Element];
};

const Navbar = ({ buttons }: NavbarProps) => {
  const { data } = useSession();

  return (
    <div className="flex w-full max-h-14 fixed top-0 left-0 border-b bg-white border-gray-300 justify-center items-center">
      <div className="flex max-w-screen-md w-11/12 justify-between">
        <div className="flex items-center">
          <p className="text-xl">Todo</p>
        </div>
        <div className="flex items-center gap-1">
          {!data ? (
            buttons.map((button, index) => (
              <div
                key={"login-btn-" + index}
                className="rounded-md p-2 hover:bg-gray-100"
              >
                {button}
              </div>
            ))
          ) : (
            <button
              className="flex text-center items.center rounded-md p-2 hover:bg-gray-100"
              onClick={() => signOut()}
            >
              <span>Sign out</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

// const NavbarLayout = (buttons: [JSX.Element], child: JSX.Element) => {
//     return (
//         <>
//             <Navbar buttons={buttons}/>
//             <div className="mt-14">{child}</div>
//         </>
//     );
// }

export default Home;
