import Image from 'next/image';
import Link from 'next/link';
import { Bell, UserCircle } from 'lucide-react';

// futuramente vou passar como prop ou adicionar algo como: const { user } = useAuth()
// por enquanto, muda para 'true' para testar a visão do Dashboard e 'false' para a Landing Page
const isUserLoggedIn = true; 

export default function Navbar() {
  return (
    <nav className="w-full flex items-center justify-between p-4 md:p-6 fixed top-0 left-0 z-50 bg-black/20 backdrop-blur-md border-b border-white/10 shadow-sm transition-all">
      <div className="flex items-center">
        <Link href="/" className="flex items-center gap-1 hover:opacity-90 transition-opacity">
          <Image 
            src="/logo.svg" 
            alt="GoGather Logo" 
            width={40}
            height={35} 
            priority
          />
          <span className="text-white text-2xl md:text-3xl font-bold tracking-tight mt-1">
            gogather
          </span>
        </Link>
      </div>
       
      {/* condicional de se tá logado ou não */}
      {!isUserLoggedIn ? (
        <>
          <div className="hidden md:flex items-center gap-8 text-white/90 font-medium">
            <Link href="/#recursos" className="hover:text-white transition-colors">Recursos</Link>
            <Link href="/#como-funciona" className="hover:text-white transition-colors">Como Funciona</Link>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/login" className="text-white font-bold hover:text-[#fbf2c7] transition-colors">
              Entrar
            </Link>
            <Link href="/cadastro" className="bg-[#fbf2c7] text-[#cc241a] px-6 py-2 rounded-full font-bold hover:bg-white transition-all shadow-md">
              Cadastre-se
            </Link>
          </div>
        </>
      ) : (
        <>
          {/*se tiver logado mostra os itens do app no navbar */}
          <div className="flex items-center gap-6 text-white">
            <button className="hover:text-[#fbf2c7] transition-colors relative">
              <Bell className="w-6 h-6" />
              <span className="absolute -top-1 -right-1 bg-[#cc241a] text-xs font-bold w-4 h-4 rounded-full flex items-center justify-center">
                3
              </span>
            </button>
            <div className="flex items-center gap-2 cursor-pointer hover:text-[#fbf2c7] transition-colors">
              <UserCircle className="w-8 h-8" />
              <span className="font-bold hidden md:block">Flawbert</span>
            </div>
          </div>
        </>
      )}
    </nav>
  );
}