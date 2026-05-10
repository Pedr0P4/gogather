export function GroupBalancePlaceholder() {
  return (
    <div className="border border-gg-beige-extradark/20 rounded-xl p-4 bg-white">
      <h3 className="text-sm font-medium text-gray-500 mb-2">Seu saldo</h3>
      <div className="flex flex-col gap-4">
        <span className="text-2xl font-bold text-gg-red">- R$ 40,00</span>
        <button className="w-full bg-gg-cyan hover:bg-gg-cyan-dark text-white font-medium py-2 px-4 rounded-md transition-colors">
          Pagar João
        </button>
        <div className="flex items-center gap-2 text-xs text-gg-beige-extradark bg-gg-beige-extralight p-2 rounded">
          <span className="flex-1">Aguardando Maria confirmar (R$ 20,00)</span>
        </div>
      </div>
    </div>
  );
}
