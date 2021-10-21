import React, { useState } from 'react'
import './App.scss'

export default function App(props) {
  const [price,setprice] = useState(2000000);
  const [term,setterm] = useState(1);
  const [Bet,setBet] = useState(9.5);
  let all_data = {};

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

  

  Total_sum();

  return (
    <>
    <h1>Расчёт Аннуитетных платежей по кредиту</h1>
    <div className="main_block">
        <div onChange={Total_sum} id="form_calc">
          <div id="form_calc_first">
            <span className="span_text">Сумма кредита</span>
            <input type="text" value={price} onInput={(e)=>setprice(+e.target.value)} name="price" placeholder="0" /> 
          </div>
          <div id="form_calc_second">
            <div id="form_calc_second_child_1">
              <span className="span_text">Срок</span>
              <select name="term" value={term} onChange={(e)=>setterm(+e.target.value)}>             
                  <option value="1">1 месяц</option>
                  <option value="3">3 месяца</option>
                  <option value="6">6 месяцев</option>
                  <option value="9">9 месяцев</option>
                  <option value="12">1 год</option>
                  <option value="18">1,5 года</option>
                  <option value="24">2 года</option>
                  <option value="36">3 года</option>
                  <option value="48">4 года</option>
                  <option value="60">5 лет</option>
                  <option value="72">6 лет</option>
                  <option value="84">7 лет</option>
                  <option value="120">10 лет</option>
                  <option value="180">15 лет</option>
                  <option value="240">20 лет</option>
                  <option value="300">25 лет</option>
                  <option value="360">30 лет</option>
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
          <p>Ежемесячный платеж <span className="span_result_money">{all_data.month_pay}</span></p>
          <p>Переплата по кредиту <span className="span_result_money">{all_data.overpayment}</span></p>
          <p>Общая выплата <span className="span_result_money">{all_data.all_pay}</span></p>
        </div>
    </div>
    </>
  )
}
