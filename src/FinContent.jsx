import { useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import './FinContent.css';

// Chart.js'in modüllerini kaydediyoruz
ChartJS.register(Title, Tooltip, Legend, ArcElement);

const FinContent = () => {
  // Gelir ve gider verileri
  const [income, setIncome] = useState([]);
  const [expenses, setExpenses] = useState([]);

  // Input değerleri
  const [newIncomeAmount, setNewIncomeAmount] = useState('');
  const [newIncomeCategory, setNewIncomeCategory] = useState('');
  const [newIncomeCustomCategory, setNewIncomeCustomCategory] = useState('');
  const [newExpenseAmount, setNewExpenseAmount] = useState('');
  const [newExpenseCategory, setNewExpenseCategory] = useState('');
  const [newExpenseCustomCategory, setNewExpenseCustomCategory] = useState('');

  // Önceden tanımlı kategoriler
  const categories = ['Maaş', 'Yatırım', 'Yardım', 'Diğer'];

  // Grafik verileri
  const getCategorizedData = (items) => {
    const data = {};
    items.forEach(item => {
      const category = item.category === 'Diğer' ? item.customCategory : item.category;
      if (data[category]) {
        data[category] += item.amount;
      } else {
        data[category] = item.amount;
      }
    });
    return data;
  };

  const incomeData = getCategorizedData(income);
  const expenseData = getCategorizedData(expenses);

  const chartData = {
    labels: [...Object.keys(incomeData), ...Object.keys(expenseData)],
    datasets: [
      {
        label: 'Gelir ve Gider',
        data: [
          ...Object.values(incomeData),
          ...Object.values(expenseData),
        ],
        backgroundColor: [
          ...Object.keys(incomeData).map(() => 'rgba(75, 192, 192, 0.2)'),
          ...Object.keys(expenseData).map(() => 'rgba(255, 99, 132, 0.2)'),
        ],
        borderColor: [
          ...Object.keys(incomeData).map(() => 'rgba(75, 192, 192, 1)'),
          ...Object.keys(expenseData).map(() => 'rgba(255, 99, 132, 1)'),
        ],
        borderWidth: 1,
      },
    ],
  };

  // Gelir ve gider toplamlarını hesapla
  const totalIncome = income.reduce((total, item) => total + item.amount, 0);
  const totalExpenses = expenses.reduce((total, item) => total + item.amount, 0);
  const balance = totalIncome - totalExpenses;

  // Gelir ekleme
  const handleAddIncome = () => {
    if (newIncomeAmount && !isNaN(newIncomeAmount) && (newIncomeCategory || newIncomeCustomCategory)) {
      const category = newIncomeCategory === 'Diğer' ? newIncomeCustomCategory : newIncomeCategory;
      setIncome([...income, { amount: parseFloat(newIncomeAmount), category, customCategory: newIncomeCustomCategory }]);
      setNewIncomeAmount('');
      setNewIncomeCategory('');
      setNewIncomeCustomCategory('');
    }
  };

  // Gider ekleme
  const handleAddExpense = () => {
    if (newExpenseAmount && !isNaN(newExpenseAmount) && (newExpenseCategory || newExpenseCustomCategory)) {
      const category = newExpenseCategory === 'Diğer' ? newExpenseCustomCategory : newExpenseCategory;
      setExpenses([...expenses, { amount: parseFloat(newExpenseAmount), category, customCategory: newExpenseCustomCategory }]);
      setNewExpenseAmount('');
      setNewExpenseCategory('');
      setNewExpenseCustomCategory('');
    }
  };

  return (
    <div className="fin-container">
      <div className="fin-section left-section">
        <div className="section-header">Gelirler</div>
        <div className="inputs">
          <input
            type="number"
            value={newIncomeAmount}
            onChange={(e) => setNewIncomeAmount(e.target.value)}
            placeholder="Gelir Tutarı"
            className="input-field"
          />
          <select
            className="select-category"
            value={newIncomeCategory}
            onChange={(e) => {
              setNewIncomeCategory(e.target.value);
              if (e.target.value !== 'Diğer') {
                setNewIncomeCustomCategory('');
              }
            }}
          >
            <option value="">Kategori Seçin</option>
            {categories.map((cat, index) => (
              <option key={index} value={cat}>{cat}</option>
            ))}
          </select>
          {newIncomeCategory === 'Diğer' && (
            <input
              type="text"
              value={newIncomeCustomCategory}
              onChange={(e) => setNewIncomeCustomCategory(e.target.value)}
              placeholder="Özel Kategori"
              className="input-field"
            />
          )}
          <button
            className="add-button"
            onClick={handleAddIncome}
            disabled={newIncomeAmount === '' || (newIncomeCategory === 'Diğer' && newIncomeCustomCategory === '')}
          >
            Gelir Ekle
          </button>
        </div>
        <ul className="item-list">
          {income.map((inc, index) => (
            <li key={index}>₺{inc.amount} - {inc.category}</li>
          ))}
        </ul>
      </div>
      
      <div className="fin-section center-section">
        <div className="chart-container">
          <Pie data={chartData} />
        </div>
        <div className="balance">
          <p>Toplam Gelir: ₺{totalIncome.toFixed(2)}</p>
          <p>Toplam Gider: ₺{totalExpenses.toFixed(2)}</p>
          <p>Bakiye: ₺{balance.toFixed(2)}</p>
        </div>
      </div>

      <div className="fin-section right-section">
        <div className="section-header">Giderler</div>
        <div className="inputs">
          <input
            type="number"
            value={newExpenseAmount}
            onChange={(e) => setNewExpenseAmount(e.target.value)}
            placeholder="Gider Tutarı"
            className="input-field"
          />
          <select
            className="select-category"
            value={newExpenseCategory}
            onChange={(e) => {
              setNewExpenseCategory(e.target.value);
              if (e.target.value !== 'Diğer') {
                setNewExpenseCustomCategory('');
              }
            }}
          >
            <option value="">Kategori Seçin</option>
            {categories.map((cat, index) => (
              <option key={index} value={cat}>{cat}</option>
            ))}
          </select>
          {newExpenseCategory === 'Diğer' && (
            <input
              type="text"
              value={newExpenseCustomCategory}
              onChange={(e) => setNewExpenseCustomCategory(e.target.value)}
              placeholder="Özel Kategori"
              className="input-field"
            />
          )}
          <button
            className="add-button"
            onClick={handleAddExpense}
            disabled={newExpenseAmount === '' || (newExpenseCategory === 'Diğer' && newExpenseCustomCategory === '')}
          >
            Gider Ekle
          </button>
        </div>
        <ul className="item-list">
          {expenses.map((exp, index) => (
            <li key={index}>₺{exp.amount} - {exp.category}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default FinContent;
