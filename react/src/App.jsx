import { useState } from 'react';
import './App.css';

// 1. KOMPONENS: Tic-Tac-Toe (Amőba)
function TicTacToe() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);

  const calculateWinner = (squares) => {
    const lines = [[0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [0,4,8], [2,4,6]];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) return squares[a];
    }
    return null;
  };

  const winner = calculateWinner(squares);
  const status = winner ? `Nyertes: ${winner} 🎉` : (squares.every(s => s) ? "Döntetlen!" : `Következő: ${xIsNext ? 'X' : 'O'}`);

  const handleClick = (i) => {
    if (squares[i] || winner) return;
    const nextSquares = [...squares];
    nextSquares[i] = xIsNext ? 'X' : 'O';
    setSquares(nextSquares);
    setXIsNext(!xIsNext);
  };

  return (
    <div style={{textAlign: 'center'}}>
      <h2>Amőba (3x3)</h2>
      <h3>{status}</h3>
      <div className="board">
        {squares.map((sq, i) => (
          <button key={i} className="square" onClick={() => handleClick(i)}>{sq}</button>
        ))}
      </div>
      <button className="action-btn" onClick={() => {setSquares(Array(9).fill(null)); setXIsNext(true);}}>Új játék</button>
    </div>
  );
}

// 2. KOMPONENS: Kő-Papír-Olló
function RockPaperScissors() {
  const [eredmeny, setEredmeny] = useState('Válassz egyet a kezdéshez!');
  const [pontok, setPontok] = useState({ jatekos: 0, gep: 0 });

  const jatek = (jatekosValasztasa) => {
    const opciok = ['Kő', 'Papír', 'Olló'];
    const gepValasztasa = opciok[Math.floor(Math.random() * 3)];
    let uzenet = `Te: ${jatekosValasztasa} vs Gép: ${gepValasztasa}. `;

    if (jatekosValasztasa === gepValasztasa) {
      setEredmeny(uzenet + "Döntetlen! 🤝");
    } else if (
      (jatekosValasztasa === 'Kő' && gepValasztasa === 'Olló') ||
      (jatekosValasztasa === 'Papír' && gepValasztasa === 'Kő') ||
      (jatekosValasztasa === 'Olló' && gepValasztasa === 'Papír')
    ) {
      setEredmeny(uzenet + "Nyertél! 🎉");
      setPontok(p => ({ ...p, jatekos: p.jatekos + 1 }));
    } else {
      setEredmeny(uzenet + "Vesztettél! 😢");
      setPontok(p => ({ ...p, gep: p.gep + 1 }));
    }
  };

  return (
    <div style={{textAlign: 'center'}}>
      <h2>Kő-Papír-Olló</h2>
      <div style={{display: 'flex', justifyContent: 'center', gap: '20px', margin: '20px 0', fontSize: '1.2em'}}>
        <div><strong>Te:</strong> {pontok.jatekos} pont</div>
        <div><strong>Gép:</strong> {pontok.gep} pont</div>
      </div>
      <h3 style={{color: '#d32f2f'}}>{eredmeny}</h3>
      <div style={{marginTop: '20px'}}>
        <button className="action-btn" style={{margin: '5px'}} onClick={() => jatek('Kő')}>🪨 Kő</button>
        <button className="action-btn" style={{margin: '5px'}} onClick={() => jatek('Papír')}>📄 Papír</button>
        <button className="action-btn" style={{margin: '5px'}} onClick={() => jatek('Olló')}>✂️ Olló</button>
      </div>
      <button onClick={() => setPontok({jatekos: 0, gep: 0})} style={{marginTop: '20px', padding: '5px'}}>Pontok nullázása</button>
    </div>
  );
}

// 3. KOMPONENS: Számkitaláló
function NumberGuesser() {
  const [celSzam, setCelSzam] = useState(Math.floor(Math.random() * 100) + 1);
  const [tipp, setTipp] = useState('');
  const [uzenet, setUzenet] = useState('Gondoltam egy számra 1 és 100 között. Találd ki!');
  const [probalkozasok, setProbalkozasok] = useState(0);
  const [vege, setVege] = useState(false);

  const ellenorzes = () => {
    const szam = parseInt(tipp);
    if (isNaN(szam)) return setUzenet("Kérlek, érvényes számot adj meg!");
    
    setProbalkozasok(p => p + 1);
    if (szam === celSzam) {
      setUzenet(`Gratulálok! Eltaláltad ${probalkozasok + 1} próbálkozásból! 🏆`);
      setVege(true);
    } else if (szam < celSzam) {
      setUzenet('Nagyobb számra gondoltam! ⬆️');
    } else {
      setUzenet('Kisebb számra gondoltam! ⬇️');
    }
    setTipp('');
  };

  return (
    <div style={{textAlign: 'center'}}>
      <h2>Számkitaláló (1-100)</h2>
      <p>Próbálkozások száma: <strong>{probalkozasok}</strong></p>
      <h3 style={{color: vege ? 'green' : '#1976d2'}}>{uzenet}</h3>
      {!vege ? (
        <div>
          <input type="number" value={tipp} onChange={(e) => setTipp(e.target.value)} style={{padding: '10px', width: '100px'}} />
          <br/>
          <button className="action-btn" onClick={ellenorzes}>Tippelek!</button>
        </div>
      ) : (
        <button className="action-btn" onClick={() => {
            setCelSzam(Math.floor(Math.random() * 100) + 1); setTipp(''); setUzenet('Új számra gondoltam!'); setProbalkozasok(0); setVege(false);
        }}>Új Játék</button>
      )}
    </div>
  );
}

// 4. KOMPONENS: Számológép
function Calculator() {
  const [kifejezes, setKifejezes] = useState("");
  const handleClick = (ertek) => setKifejezes(kifejezes + ertek);
  const szamolas = () => {
      try { setKifejezes(eval(kifejezes).toString()); } 
      catch { setKifejezes("Hiba"); }
  };

  return (
      <div className="calc">
          <h2 style={{textAlign: 'center'}}>Számológép</h2>
          <input type="text" className="calc-display" value={kifejezes} readOnly />
          <div className="calc-keys">
              <button onClick={() => handleClick('7')}>7</button>
              <button onClick={() => handleClick('8')}>8</button>
              <button onClick={() => handleClick('9')}>9</button>
              <button className="operator" onClick={() => handleClick('/')}>/</button>
              <button onClick={() => handleClick('4')}>4</button>
              <button onClick={() => handleClick('5')}>5</button>
              <button onClick={() => handleClick('6')}>6</button>
              <button className="operator" onClick={() => handleClick('*')}>*</button>
              <button onClick={() => handleClick('1')}>1</button>
              <button onClick={() => handleClick('2')}>2</button>
              <button onClick={() => handleClick('3')}>3</button>
              <button className="operator" onClick={() => handleClick('-')}>-</button>
              <button onClick={() => handleClick('0')}>0</button>
              <button onClick={() => handleClick('.')}>.</button>
              <button className="operator" onClick={szamolas}>=</button>
              <button className="operator" onClick={() => handleClick('+')}>+</button>
              <button className="clear" onClick={() => setKifejezes("")}>Törlés (C)</button>
          </div>
      </div>
  );
}

// FŐ KOMPONENS: SPA Kezelő (Beépítve a weboldal dizájnjába)
export default function App() {
  const [activeTab, setActiveTab] = useState('tictactoe');

  return (
    <>
      <header>
        <h1>Vízvezeték-szerelők és Karbantartók Hálózata</h1>
      </header>
      
      <nav>
        <ul>
          <li><a href="../index.html">Főoldal</a></li>
          <li><a href="../javascript.html">JS CRUD</a></li>
          <li><a href="../react.html">React CRUD</a></li>
          <li><a href="index.html" className="active-nav">SPA (Játékok)</a></li>
          <li><a href="../fetchapi.html">Fetch API</a></li>
          <li><a href="../axios.html">Axios</a></li>
          <li><a href="../oojs.html">OOJS</a></li>
        </ul>
      </nav>

      <main>
        <h2>React Játékközpont</h2>
        <hr />
        
        <div className="spa-nav">
          <button className={activeTab === 'tictactoe' ? 'active' : ''} onClick={() => setActiveTab('tictactoe')}>Amőba</button>
          <button className={activeTab === 'rps' ? 'active' : ''} onClick={() => setActiveTab('rps')}>Kő-Papír-Olló</button>
          <button className={activeTab === 'guesser' ? 'active' : ''} onClick={() => setActiveTab('guesser')}>Számkitaláló</button>
          <button className={activeTab === 'calc' ? 'active' : ''} onClick={() => setActiveTab('calc')}>Számológép</button>
        </div>

        <div className="tab-content">
          {activeTab === 'tictactoe' && <TicTacToe />}
          {activeTab === 'rps' && <RockPaperScissors />}
          {activeTab === 'guesser' && <NumberGuesser />}
          {activeTab === 'calc' && <Calculator />}
        </div>
      </main>

      <footer>
        {/* IDE ÍRD BE A SAJÁT ADATAIDAT! */}
        <p>Készítette: Kókai Szabolcs | Web-programozás 1. Beadandó</p>
      </footer>
    </>
  );
}