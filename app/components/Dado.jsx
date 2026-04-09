import Image from "next/image";

export default function Dado({ valor, animando = false }) {
  return (
    <div
      className={`w-20 h-20 rounded-2xl shadow-md bg-white border-2 border-slate-200 flex items-center justify-center transition-all duration-300 ${
        animando ? "scale-110 rotate-12 opacity-70" : "scale-100 rotate-0 opacity-100"
      }`}
    >
      <Image
        src={`/dados/dado${valor}.svg`}
        alt={`Dado com valor ${valor}`}
        width={64}
        height={64}
        className="select-none"
        priority
      />
    </div>
  );
}
