import "../globals.css";

export default function Login() {
  return (
    <div className="flex items-center h-screen bg-gg-beige-light border border-s-amber-300">
      <div className="
          bg-linear-to-t from-gg-beige via-gg-beige-midlight to-gg-beige-dark
          w-1/4 flex flex-col m-auto p-5 border-2 border-dotted border-gg-beige-extradark
          rounded-md shadow-lg">
        <h1 className="mx-auto text-4xl font-extralight text-gg-cyan-extradark">Login</h1>
        <div>
          <form action="">
            <div className="flex flex-col mb-4">
              <label htmlFor="username" className="text-gg-cyan-extradark">Username</label>
              <input type="text" name="username" className="bg-gg-beige-extralight rounded-xs h-8 border border-dashed border-gg-beige-extradark p-2 focus:outline-none"/>
            </div>
           	<div className="flex flex-col mb-4">
              <label htmlFor="password" className="text-gg-cyan-extradark">Password</label>
              <input type="password" name="password" className="bg-gg-beige-extralight rounded-xs h-8 border border-dashed border-gg-beige-extradark p-2 focus:outline-none"/>
            </div>
           	<div className="flex flex-row items-center">
              <label htmlFor="stayconn" className="text-gg-cyan-extradark mr-4">Manter conectado</label>
              <input
                type="checkbox" name="stayconn"
                className="appearance-none w-5 h-5 rounded-full bg-gg-beige-extralight
                  border border-dashed border-gg-beige-extradark checked:bg-gg-beige-extradark"/>
            </div>
            <button
              type="submit"
              className="bg-gg-beige-extralight w-full mt-5 py-2 px-6 rounded border border-dashed border-gg-beige-extradark
              text-gg-cyan-extradark hover:bg-gg-beige-light hover:cursor-pointer">
                Enter
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
