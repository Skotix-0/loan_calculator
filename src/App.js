import React, { useState } from 'react'
import './App.scss'

export default function App(props) {
  const [price,setprice] = useState(2000000);
  const [term,setterm] = useState(1);
  const [Bet,setBet] = useState(9.5);
  const [currency, setCurrency] = useState("₽");
  let all_data = {};
  let arr_term = [
    {term: "1 месяц", term_value: "1",},
    {term: "3 месяца", term_value: "3",},
    {term: "6 месяцев", term_value: "6",},
    {term: "9 месяцев", term_value: "9",},
    {term: "1 год", term_value: "12",},
    {term: "1,5 года", term_value: "18",},
    {term: "2 года", term_value: "24",},
    {term: "3 года", term_value: "36",},
    {term: "4 года", term_value: "48",},
    {term: "5 лет", term_value: "60",},
    {term: "6 лет", term_value: "72",},
    {term: "7 лет", term_value: "84",},
    {term: "10 лет", term_value: "120",},
    {term: "15 лет", term_value: "180",},
    {term: "20 лет", term_value: "240",},
    {term: "25 лет", term_value: "300",},
    {term: "30 лет", term_value: "360",},
  ];
  let arr_term_option = [];

  const Total_sum = () =>{
    let msp = Bet / 12 / 100; //Месячная процентная ставка
    let kof = (msp * (1 + msp) ** term / ((1 + msp)**term - 1)); //коэффициент аннуитета
    let evry_month_pay = price * kof;//ежемесячный платеж
    let overpayment = term * Math.round(evry_month_pay,0) - price;
    let all_pay = overpayment + price;

      all_data.month_pay = Math.round(evry_month_pay, 0);
      all_data.overpayment = Math.round(overpayment, 0);
      all_data.all_pay = Math.round(all_pay, 0);
  }

  const list_term = () =>{
    arr_term.map((elem)=>{
      return arr_term_option.push(<option key={elem.term_value} value={elem.term_value}>{elem.term}</option>);
    });
  }

  Total_sum();
  list_term();

  return (
    <>
    <h1>Расчёт Аннуитетных платежей по кредиту</h1>
    <div className="main_block">
        <div onChange={Total_sum} id="form_calc">
          <div id="form_calc_first">
            <span className="span_text">Сумма кредита</span>
            <div>
              <input type="number" value={price} onInput={(e)=>setprice(+e.target.value)} name="price" placeholder="0" />
              <select id="currency" onChange={(e) => setCurrency(e.target.value)}>
                <option value="₽">₽</option>
                <option value="€">€</option>
                <option value="$">$</option>
              </select> 
            </div>
          </div>
          <div id="form_calc_second">
            <div id="form_calc_second_child_1">
              <span className="span_text">Срок</span>
              <select name="term" value={term} onChange={(e)=>setterm(+e.target.value)}>             
                  {arr_term_option}
              </select>
            </div>
            <div id="form_calc_second_child_2">
              <span className="span_text">Ставка, %</span>
              <input type="number" value={Bet} onInput={(e)=>setBet(+e.target.value)} name="bet" placeholder="0" />
            </div>
          </div>
        </div>
        <div>
          <h1>Результаты расчета</h1>
          <p>Ежемесячный платеж <span className="span_result_money">{all_data.month_pay}{currency}</span></p>
          <p>Переплата по кредиту <span className="span_result_money">{all_data.overpayment}{currency}</span></p>
          <p>Общая выплата <span className="span_result_money">{all_data.all_pay}{currency}</span></p>
        </div>
    </div>
    </>
  )
}
