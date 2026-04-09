"use client";

import { useState } from "react";
import Dado from "./Dado";

const TOTAL_RODADAS = 5;

function rolarDado() {
  return Math.floor(Math.random() * 6) + 1;
}

function calcularResultado(somaJ1, somaJ2) {
  if (somaJ1 > somaJ2) return "ganhou";
  if (somaJ2 > somaJ1) return "perdeu";
  return "empatou";
}

function ResultadoBadge({ resultado }) {
  if (!resultado) return <span className="text-slate-400 text-sm">Aguardando...</span>;
  const config = {
    ganhou: { text: "Ganhou!", cls: "bg-emerald-100 text-emerald-700 border border-emerald-200" },
    perdeu: { text: "Perdeu", cls: "bg-red-100 text-red-700 border border-red-200" },
    empatou: { text: "Empatou", cls: "bg-amber-100 text-amber-700 border border-amber-200" },
  };
  const { text, cls } = config[resultado];
  return (
    <span className={`px-3 py-1 rounded-full text-sm font-medium ${cls}`}>{text}</span>
  );
}

export default function JogoDados() {
  const [rodadaAtual, setRodadaAtual] = useState(1);
  const [historico, setHistorico] = useState([]);
  const [dadosJ1, setDadosJ1] = useState([1, 1]);
  const [dadosJ2, setDadosJ2] = useState([1, 1]);
  const [turno, setTurno] = useState("j1");
  const [animando, setAnimando] = useState(null);
  const [jogoFinalizado, setJogoFinalizado] = useState(false);
  const [resultadoRodadaAtual, setResultadoRodadaAtual] = useState(null);

  const jogarJ1 = () => {
    setAnimando("j1");
    setTimeout(() => {
      const novos = [rolarDado(), rolarDado()];
      setDadosJ1(novos);
      setAnimando(null);
      setTurno("j2");
    }, 400);
  };

  const jogarJ2 = () => {
    setAnimando("j2");
    setTimeout(() => {
      const novos = [rolarDado(), rolarDado()];
      setDadosJ2(novos);
      setAnimando(null);

      const somaJ1 = dadosJ1[0] + dadosJ1[1];
      const somaJ2 = novos[0] + novos[1];
      const resultado = calcularResultado(somaJ1, somaJ2);

      const rodada = { dadosJ1: [...dadosJ1], dadosJ2: novos, resultado };

      setResultadoRodadaAtual(resultado);

      if (rodadaAtual >= TOTAL_RODADAS) {
        setHistorico((h) => [...h, rodada]);
        setJogoFinalizado(true);
      } else {
        setHistorico((h) => [...h, rodada]);
        setTurno("fim_rodada");
      }
    }, 400);
  };

  const proximaRodada = () => {
    setRodadaAtual((r) => r + 1);
    setDadosJ1([1, 1]);
    setDadosJ2([1, 1]);
    setResultadoRodadaAtual(null);
    setTurno("j1");
  };

  const reiniciar = () => {
    setRodadaAtual(1);
    setHistorico([]);
    setDadosJ1([1, 1]);
    setDadosJ2([1, 1]);
    setTurno("j1");
    setJogoFinalizado(false);
    setResultadoRodadaAtual(null);
  };

  const vitoriasJ1 = historico.filter((r) => r.resultado === "ganhou").length;
  const vitoriasJ2 = historico.filter((r) => r.resultado === "perdeu").length;
  const empates = historico.filter((r) => r.resultado === "empatou").length;

  const vencedorFinal = () => {
    if (vitoriasJ1 > vitoriasJ2) return "Jogador 1 venceu a partida! 🏆";
    if (vitoriasJ2 > vitoriasJ1) return "Jogador 2 venceu a partida! 🏆";
    return "Empate geral! 🤝";
  };

  const somaJ1 = dadosJ1[0] + dadosJ1[1];
  const somaJ2 = dadosJ2[0] + dadosJ2[1];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-start py-10 px-4">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-slate-800 mb-1">🎲 Jogo de Dados</h1>
          {!jogoFinalizado && (
            <p className="text-slate-500 text-sm">
              Rodada <span className="font-semibold text-slate-700">{rodadaAtual}</span> de{" "}
              <span className="font-semibold text-slate-700">{TOTAL_RODADAS}</span>
            </p>
          )}
        </div>

        {/* Placar */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="bg-white rounded-xl border border-slate-200 p-3 text-center shadow-sm">
            <p className="text-xs text-slate-500 mb-1">Jogador 1</p>
            <p className="text-2xl font-bold text-emerald-600">{vitoriasJ1}</p>
            <p className="text-xs text-slate-400">vitórias</p>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 p-3 text-center shadow-sm">
            <p className="text-xs text-slate-500 mb-1">Empates</p>
            <p className="text-2xl font-bold text-amber-500">{empates}</p>
            <p className="text-xs text-slate-400">rodadas</p>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 p-3 text-center shadow-sm">
            <p className="text-xs text-slate-500 mb-1">Jogador 2</p>
            <p className="text-2xl font-bold text-blue-600">{vitoriasJ2}</p>
            <p className="text-xs text-slate-400">vitórias</p>
          </div>
        </div>

        {/* Tela de fim de jogo */}
        {jogoFinalizado ? (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8 text-center">
            <p className="text-2xl font-bold text-slate-800 mb-2">{vencedorFinal()}</p>
            <p className="text-slate-500 mb-6 text-sm">
              J1: {vitoriasJ1} vitória{vitoriasJ1 !== 1 ? "s" : ""} · J2: {vitoriasJ2} vitória{vitoriasJ2 !== 1 ? "s" : ""} · {empates} empate{empates !== 1 ? "s" : ""}
            </p>

            {/* Histórico */}
            <div className="mb-6 text-left">
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-3">Histórico de rodadas</p>
              <div className="space-y-2">
                {historico.map((r, i) => (
                  <div key={i} className="flex items-center justify-between bg-slate-50 rounded-lg px-4 py-2 text-sm">
                    <span className="text-slate-500 w-20">Rodada {i + 1}</span>
                    <span className="text-slate-700">J1: {r.dadosJ1[0] + r.dadosJ1[1]}</span>
                    <span className="text-slate-700">J2: {r.dadosJ2[0] + r.dadosJ2[1]}</span>
                    <ResultadoBadge resultado={r.resultado} />
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={reiniciar}
              className="bg-slate-800 text-white px-8 py-3 rounded-xl font-medium hover:bg-slate-700 active:scale-95 transition-all"
            >
              Jogar Novamente
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Jogador 1 */}
            <div className={`bg-white rounded-2xl border-2 transition-colors shadow-sm p-5 ${turno === "j1" ? "border-emerald-400" : "border-slate-200"}`}>
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 font-bold text-sm">J1</div>
                    <span className="font-semibold text-slate-700">Jogador 1</span>
                    {turno === "j1" && (
                      <span className="text-xs bg-emerald-50 text-emerald-600 border border-emerald-200 px-2 py-0.5 rounded-full">Sua vez!</span>
                    )}
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex gap-2">
                      <Dado valor={dadosJ1[0]} animando={animando === "j1"} />
                      <Dado valor={dadosJ1[1]} animando={animando === "j1"} />
                    </div>
                    {turno !== "j1" && (
                      <div className="ml-2">
                        <p className="text-2xl font-bold text-slate-700">{somaJ1}</p>
                        <p className="text-xs text-slate-400">total</p>
                      </div>
                    )}
                  </div>
                </div>
                <div className="ml-4">
                  <button
                    onClick={jogarJ1}
                    disabled={turno !== "j1"}
                    className="bg-emerald-500 text-white px-5 py-2.5 rounded-xl font-medium text-sm hover:bg-emerald-600 active:scale-95 transition-all disabled:opacity-30 disabled:cursor-not-allowed disabled:active:scale-100"
                  >
                    Jogar
                  </button>
                </div>
              </div>
            </div>

            {/* VS / Resultado */}
            <div className="flex items-center justify-center gap-4 py-1">
              <div className="h-px flex-1 bg-slate-200" />
              <div className="text-center">
                {resultadoRodadaAtual ? (
                  <ResultadoBadge resultado={resultadoRodadaAtual} />
                ) : (
                  <span className="text-xs text-slate-400 px-3">VS</span>
                )}
              </div>
              <div className="h-px flex-1 bg-slate-200" />
            </div>

            {/* Jogador 2 */}
            <div className={`bg-white rounded-2xl border-2 transition-colors shadow-sm p-5 ${turno === "j2" ? "border-blue-400" : "border-slate-200"}`}>
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-sm">J2</div>
                    <span className="font-semibold text-slate-700">Jogador 2</span>
                    {turno === "j2" && (
                      <span className="text-xs bg-blue-50 text-blue-600 border border-blue-200 px-2 py-0.5 rounded-full">Sua vez!</span>
                    )}
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex gap-2">
                      <Dado valor={dadosJ2[0]} animando={animando === "j2"} />
                      <Dado valor={dadosJ2[1]} animando={animando === "j2"} />
                    </div>
                    {turno === "fim_rodada" && (
                      <div className="ml-2">
                        <p className="text-2xl font-bold text-slate-700">{somaJ2}</p>
                        <p className="text-xs text-slate-400">total</p>
                      </div>
                    )}
                  </div>
                </div>
                <div className="ml-4">
                  <button
                    onClick={jogarJ2}
                    disabled={turno !== "j2"}
                    className="bg-blue-500 text-white px-5 py-2.5 rounded-xl font-medium text-sm hover:bg-blue-600 active:scale-95 transition-all disabled:opacity-30 disabled:cursor-not-allowed disabled:active:scale-100"
                  >
                    Jogar
                  </button>
                </div>
              </div>
            </div>

            {/* Próxima rodada */}
            {turno === "fim_rodada" && (
              <button
                onClick={proximaRodada}
                className="w-full bg-slate-800 text-white py-3 rounded-xl font-medium hover:bg-slate-700 active:scale-95 transition-all mt-2"
              >
                Próxima Rodada →
              </button>
            )}

            {/* Progresso */}
            <div className="flex gap-1.5 justify-center pt-2">
              {Array.from({ length: TOTAL_RODADAS }).map((_, i) => (
                <div
                  key={i}
                  className={`h-1.5 rounded-full transition-all w-8 ${
                    i < historico.length
                      ? historico[i].resultado === "ganhou"
                        ? "bg-emerald-400"
                        : historico[i].resultado === "perdeu"
                        ? "bg-blue-400"
                        : "bg-amber-400"
                      : i === rodadaAtual - 1
                      ? "bg-slate-400"
                      : "bg-slate-200"
                  }`}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
