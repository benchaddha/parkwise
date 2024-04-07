const Navigation = () => {
  const linkCSS = "flex flex-col items-center text-[#333] hover:text-blue-700 hover:text-white";

  return (
    <div className="w-full h-[60px] bg-white sticky top-0 text-4xl z-10">
      <div className="h-full flex justify-center items-center">
        <img className="flex justify-start items-center absolute top-4 left-4" src="/Logo.webp" alt="Logo" width={50} height={50}/>
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