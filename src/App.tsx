import imcImage from "./assets/powered.png";
import styles from "./App.module.css";
import { levels, calculateImc, Level } from "./helpers/imc";
import { useState } from "react";
import { GridItem } from "./components/GridItem";
import leftArrowImage from "./assets/leftarrow.png";

const App = () => {
  const [heightField, setHeightField] = useState<number>(0);
  const [weightField, setWeightField] = useState<number>(0);
  const [showItem, setShowItem] = useState<Level | null>(null);

  const handleCalculateButton = () => {
    if (heightField > 0 && weightField > 0) {
      setShowItem(calculateImc(heightField, weightField));
    } else {
      alert("Digite todos os campos.");
    }
  };

  return (
    <div className={styles.main}>
      <header>
        <div className={styles.headerContainer}>
          <img src={imcImage} alt="Imc" />
        </div>
      </header>
      <div className={styles.container}>
        <div className={styles.leftSide}>
          <h1>Calcule o seu IMC.</h1>
          <p>
            IMC é a sigla para Índice de Massa Corporal, parâmetro adotado pela
            Organização Mundial de Saúde para calcular o peso ideal de cada
            pessoa.
          </p>

          <input
            type="number"
            placeholder="Digite o seu peso. Ex: 75.3 (em kg)"
            value={weightField > 0 ? weightField : ""}
            onChange={(e) => setWeightField(parseFloat(e.target.value))}
          />
          <input
            type="number"
            placeholder="Digite a sua altura. Ex: 1.50 (em metros)"
            value={heightField > 0 ? heightField : ""}
            onChange={(e) => setHeightField(parseFloat(e.target.value))}
          />
          <button onClick={handleCalculateButton}>Calcular</button>
        </div>
        <div className={styles.rightSide}>
          {!showItem && (
            <div className={styles.grid}>
              {levels.map((item, key) => (
                <GridItem key={key} item={item} />
              ))}
            </div>
          )}
          {showItem && (
            <div className={styles.rightBig}>
              <div className={styles.rightArrow}>
                <img
                  src={leftArrowImage}
                  alt="Seta voltar"
                  width={25}
                  onClick={() => setShowItem(null)}
                />
              </div>
              <GridItem item={showItem} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
