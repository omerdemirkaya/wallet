import { useState } from "react";
import "./Cuzdan.css";
import FinContent from "./FinContent";

const Cuzdan = () => {
  const [paraBirimi, setParaBirimi] = useState("");

  const handleSelectChange = (event) => {
    setParaBirimi(event.target.value);
  };

  const handleClick = () => {
    // Butona tıklama işlemi (Örneğin, başka bir sayfaya yönlendirme)
    alert(`Seçilen para birimi: ${paraBirimi}`);
  };

  return (
    <div className="container">
      <div className="header">CÜZDAN</div>
      {paraBirimi === "" ? (
        <div className="content-body">
          <div className="enter-birim">
            <div className="enter-birim-header">Para Birimi Seçin</div>
            <div className="enter-birim-body">
              <select
                className="select-para-birimi"
                value={paraBirimi}
                onChange={handleSelectChange}
              >
                <option value="">Para birimi seçin</option>
                <option value="TRY">Türk Lirası (TRY)</option>
                <option value="USD">Amerikan Doları (USD)</option>
                <option value="EUR">Euro (EUR)</option>
                <option value="GBP">İngiliz Sterlini (GBP)</option>
                <option value="JPY">Japon Yeni (JPY)</option>
                <option value="AUD">Avustralya Doları (AUD)</option>
                <option value="CAD">Kanada Doları (CAD)</option>
                <option value="CHF">İsviçre Frangı (CHF)</option>
                <option value="CNY">Çin Yuanı (CNY)</option>
                <option value="SEK">İsveç Kronu (SEK)</option>
              </select>
              <button
                className="devam-butonu"
                onClick={handleClick}
                disabled={paraBirimi === ""}
              >
                Devam
              </button>
            </div>
          </div>
        </div>
      ) : (
        <FinContent />
      )}
    </div>
  );
};

export default Cuzdan;
