import Image from 'next/image';
import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="w-full flex items-center justify-between p-6 absolute top-0 left-0 z-50">
      <div className="flex items-center">
        <Link href="/" className="flex items-center gap-1">
          <Image
            src="/logo.svg"
            alt="GoGather Logo"
            width={45}
            height={40}
            priority
          />
          <span className="text-white text-3xl font-bold tracking-tight mt-1">
            gogather
          </span>
        </Link>
      </div>

      <div className="hidden md:flex items-center gap-8 text-white/90 font-medium">
        <Link href="#recursos" className="hover:text-white transition-colors">Recursos</Link>
        <Link href="#como-funciona" className="hover:text-white transition-colors">Como Funciona</Link>
      </div>

      <div className="flex items-center gap-4">
        <Link
          href="/login"
          className="text-white font-bold hover:text-[#fbf2c7] transition-colors"
        >
          Entrar
        </Link>
        <Link
          href="/register"
          className="bg-[#fbf2c7] text-[#cc241a] px-6 py-2 rounded-full font-bold hover:bg-white transition-all shadow-md"
        >
          Cadastre-se
        </Link>
      </div>
    </nav>
  );
}
