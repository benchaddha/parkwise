const Navigation = () => {
  const linkCSS = "flex flex-col items-center text-[#333] hover:text-blue-700";

  return (
    <div className="h-[60px] bg-white sticky top-0 text-4xl z-10">
      <div className="h-full flex justify-center items-center align-center ">
        <img className="" src="logos/parkwise-colored-transparent.png" alt="Logo" width={100} height={100}/>
        <ul className="flex flex-row gap-20">
          <li className="flex items-center">
            <a href="" className={linkCSS}>
              Home
            </a>
          </li>
          <li className="flex items-center">
            <a href="#features" className={linkCSS}>
              Features
            </a>
          </li>
          <li className="flex items-center">
            <a href="#about" className={linkCSS}>
              About
            </a>
          </li>
          <li className="flex items-center">
            <a href="#services" className={linkCSS}>
              Services
            </a>
          </li>
          <li className="flex items-center">
            <a href="#portfolio" className={linkCSS}>
              Demo
            </a>
          </li>
          <li className="flex items-center">
            <a href="#team" className={linkCSS}>
              Team
            </a>
          </li>
          <li className="flex items-center">
            <a href="#contact" className={linkCSS}>
              Contact
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Navigation;