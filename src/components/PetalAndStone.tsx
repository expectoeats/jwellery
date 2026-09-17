"use client";

export default function PetalAndStone() {
  return (
    <section className="py-14 md:py-18 lg:py-20 bg-white">
      <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 overflow-hidden bg-[#f8f5f1]">
          <div className="relative aspect-[4/3] lg:aspect-auto lg:h-[460px]">
            <img
              src="https://cdn.caratlane.com/media/static/images/V4/2026/08_AUG/Banner/TC/01/Square_Desktop.jpg"
              alt="Petal & Stone Collection"
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-6 left-6 md:bottom-8 md:left-8">
              <p className="text-white text-[16px] md:text-[18px] font-serif italic tracking-wide">
                PASSIONE JEWELRY
              </p>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center text-center px-8 py-10 lg:py-14 lg:px-14">
            <h2 className="text-[30px] md:text-[36px] lg:text-[40px] font-serif font-light text-[#2c2420] mb-3">
              Petal &amp; Stone
            </h2>
            <div className="w-[36px] h-[1.5px] bg-[#c5a47e] mb-5" />
            <p className="text-[12px] md:text-[13px] font-sans text-[#6b5e54] leading-[1.8] mb-7 max-w-[340px]">
              A harmony of delicate petals and enduring stone crafted into timeless
              jewelry that blends softness with strength.
            </p>
            <a
              href="#"
              className="inline-flex items-center gap-1.5 text-[12px] font-sans text-[#2c2420] tracking-[0.04em] border-b border-[#2c2420] pb-0.5 hover:text-[#c5a47e] hover:border-[#c5a47e] transition-colors"
            >
              Explore the Collection
              <span className="text-[10px]">&#8594;</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
