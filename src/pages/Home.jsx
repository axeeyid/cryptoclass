import React from "react";
import imagehome from "../assets/2.png";
import imageabout from "../assets/4.png";
import IMG1 from "../assets/IMG1.jpg";
import IMG2 from "../assets/IMG2.jpg";
import IMG3 from "../assets/IMG3.jpg";
import IMG4 from "../assets/IMG4.jpg";
import IMG5 from "../assets/IMG5.jpg";
import IMG6 from "../assets/IMG6.jpg";
import IMG7 from "../assets/IMG7.jpg";
import IMG8 from "../assets/IMG8.jpg";
import backgrounda from "../assets/About me.png";

const Home = () => {
  return (
    <section>
      <div className="bg-utama py-10 items-center" id="HomePage">
        <div className="w-full min-h-screen flex">
          <div className="max-w container mx-auto xl:px-8 px-4">
            <div className="header-box flex lg:flex-row flex-col items-center gap-10">
              <div className="box lg:w-1/2 lg:order-1 order-2 lg:text-left text-center">
                <h1 className="text-4xl font-extrabold text-white">
                  Hello Buds
                  <span className="block text-tombol text-4xl">
                    I am <span className="text-white">Axeey Student</span>
                  </span>
                </h1>
                <h2 className="text-tombol text-lg mb-5">Special Forex Analyst</h2>
                <div className="justify-center w-full gap-5 py-5">
                  <a
                    href="#About"
                    className="font-primary font-semibold text-ketiga bg-kempat py-3 px-8 rounded-full hover:shadow-lg hover:opacity-80 transition duration-300 ease-in-out"
                  >
                    About Me
                  </a>
                </div>
              </div>
              <div className="box lg:w-1/2 lg:order-2 order-1">
                <img
                  src={imagehome}
                  alt="contoh"
                  className="xl:w-[500px] lg:w-[400px] md:w-[300px] sm:w-[250px] block ml-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-kempat" id="About">
        <div className="w-full">
          <div className="bg-cover bg-center" style={{ backgroundImage: `url(${backgrounda})` }}>
            <div className="min-h-screen">
              <div className="max-w container mx-auto xl:px-8 px-4">
                <div className="header-box flex lg:flex-row flex-col items-center gap-10">
                  <div className="box lg:w-1/2 lg:order-1 order-2 lg:text-left text-center">
                    <h1 className="text-2xl font-extrabold text-white">
                      ABOUT
                      <span className="block text-tombol text-xl">
                        Hello Selamat Datang Di <span className="text-white">AXEEYBOOTCAMP</span>
                      </span>
                    </h1>
                    <h2 className="text-white text-xl mb-5">
                      Terimakasih sudah berpartisipasi join axeeybootcamp. Semoga adanya program ini bisa membuat kalian lebih semangat dan mengerti. Terimakasih sudah registrasi dan akan bertemu selama 1 bulan kedepan, dan berharap akan mendapat ilmu dari saya.
                    </h2>
                    <div className="justify-center w-full gap-5 py-5">
                      <a
                        href="#project"
                        className="font-primary font-semibold text-ketiga bg-utama py-3 px-8 rounded-full hover:shadow-lg hover:opacity-80 transition duration-300 ease-in-out"
                      >
                        READ MORE
                      </a>
                    </div>
                  </div>
                  <div className="box lg:w-1/2 lg:order-2 order-1 py-32">
                    <img
                      src={imageabout}
                      alt="contoh"
                      className="xl:w-[300px] lg:w-[200px] md:w-[150px] sm:w-[250px] block ml-auto"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-utama py-10" id="project">
        <div className="w-full">
          <div className="min-h-screen flex">
            <div className="container mx-auto px-4">
              <div className="font-primary">
                <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
                  <div className="mx-auto max-w-screen-md text-center mb-8 lg:mb-12">
                    <h2 className="mb-4 text-3xl tracking-tight text-white">Project</h2>
                    <p className="mb-5 text-white text-xl">
                      "Dalam analisis pasar XAU/USD yang berbasis pada profesionalisme, dapat disimpulkan bahwa tren harga emas terhadap dolar AS menunjukkan potensi untuk pertumbuhan lebih lanjut dalam jangka pendek."
                    </p>
                  </div>
                  <div className="space-y-8 lg:grid lg:grid-cols-3 sm:gap-6 xl:gap-10 lg:space-y-0">
                    {[
                      IMG1, IMG2, IMG3, IMG4, IMG5, IMG6, IMG7, IMG8
                    ].map((img, index) => (
                      <div key={index} className="flex flex-col p-6 mx-auto max-w-lg text-center font-bold text-ketiga bg-white rounded-2xl hover:shadow-lg hover:opacity-80 transition duration-300 ease-in-out">
                        <h3 className="mb-4 text-2xl font-semibold text-utama">ANALISA SAYA</h3>
                        <span className="flex gap-5 justify-center">
                          <p className="badge badge-outline text-utama hover:bg-slate-200">after</p>
                          <p className="badge badge-outline text-tombol">xauusd</p>
                        </span>
                        <div className="flex justify-center items-baseline my-8"></div>
                        <div className="flex justify-center gap-5 py-1">
                          <img
                            src={img}
                            alt="contoh"
                            className="w-[600px] h-[280px] rounded-xl border shadow-lg"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                  <p className="lg:w-3/4 w-full text-white mx-auto md:text-white text-xl font-semibold py-5">
                    Ini adalah beberapa hasil analisa saya dan entri saya, masih banyak beberapa lagi, cuman saya tidak bisa menaruh semua di sini. Di sini adalah spesialis pair XAU/USD only. Contoh di atas adalah beberapa analisa news yang kami berhasil analisa dan sesuai pergerakan news.
                  </p>
                  <div className="flex justify-center lg:w-full gap-5 py-1">
                    <button className="font-primary font-semibold text-white bg-tombol py-3 px-8 rounded-full hover:shadow-lg hover:opacity-80 transition duration-300 ease-in-out">
                      Tentang Saya
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
