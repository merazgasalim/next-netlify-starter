import dynamic from "next/dynamic";
import Nav from "./Nav";
import Footer from "./Footer";

const ScrollUp = dynamic(() => import("./ScrollUp"), {
  ssr: false,
});

function Layout({ children }) {
  return (
    <>
      <Nav />

      {children}
      <Footer />

      <ScrollUp />
      <style global jsx>{`
        html {
          scroll-behavior: smooth;
        }
        body {
          overflow-x: hidden;
        }

        /**Custom scroll Bar */
        /* width */
        ::-webkit-scrollbar {
          width: 10px;
        }
        /* Track */
        ::-webkit-scrollbar-track {
          box-shadow: inset 0 0 5px grey;
          border-radius: 10px;
        }

        /* Handle */
        ::-webkit-scrollbar-thumb {
          background: #ccc;
          border-radius: 10px;
        }

        /* Handle on hover */
        ::-webkit-scrollbar-thumb::hover {
          background: #bbb;
        }
        @media screen and (max-width: 600px) {
          /**Custom scroll Bar */
          /* width */
          ::-webkit-scrollbar {
            width: 2px;
          }
          /* Track */
          ::-webkit-scrollbar-track {
            box-shadow: inset 0 0 5px white;
            border-radius: 10px;
          }

          /* Handle */
          ::-webkit-scrollbar-thumb {
            background: #ccc;
            border-radius: 10px;
          }

          /* Handle on hover */
          ::-webkit-scrollbar-thumb::hover {
            background: #bbb;
          }
        }
      `}</style>
    </>
  );
}
export default Layout;
