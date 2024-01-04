function HomePage() {
  return (
    <div>
      <div className="flex justify-center flex-col p-10 items-center">
        <h1 className="text-white font-bold text-2xl py-3 crawl-text">
          Welcome user to a galaxy far far away,{" "}
        </h1>
        <h2 className="text-stone-50 text-lg pb-3 crawl-text">
          register here your tasks that you
        </h2>
        <h3 className="text-stone-50 text-lg pb-3 crawl-text">
          have to do and this way you will not miss any
        </h3>
      </div>
      <div className="flex justify-between">
        <img className="w-36 relative bottom-5" src="halcon.gif" alt="" />
        <img className="w-36 relative bottom-5" src="descarga.gif" alt="" />
      </div>
    </div>
  );
}

export default HomePage;
