// Apenas um exemplo simples de componente de popup para o mapa
// Iremos personalizar esse componente depois, mas por enquanto ele serve para mostrar como funciona a integração do React com o Mapbox GL JS
interface PopupRoleProps {
  nomeLocal: string;
  horario: string;
}

const PopupRole = ({ nomeLocal, horario }: PopupRoleProps) => {
  return (
    <div className="p-2 w-48">
      <h3 className="text-lg font-bold text-purple-700">{nomeLocal}</h3>
      <p className="text-sm text-gray-600">Começa as {horario}</p>
      <button 
        onClick={() => alert(`Partiu ${nomeLocal}!`)}
        className="mt-3 w-full bg-purple-600 text-white py-1 rounded hover:bg-purple-700 transition"
      >
        Confirmar Presença
      </button>
    </div>
  );
};

export default PopupRole;