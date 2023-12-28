import React, { useEffect, useState } from "react";
import styles from "./styles/cars.module.css";
import axios from "axios";
import Header from "./components/Header";

const Fuelings = () => {
  const [fuelings, setFuelings] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://192.168.0.102:8000/api/fuels/");
        const fuelingsData = await Promise.all(response.data.map(async (fueling) => {
          const carInfo = await fetchCarInfo(fueling.car);
          const customerInfo = await fetchCustomerInfo(fueling.customer);
          const fuelInfo = await fetchFuelInfo(fueling.fuel);

          return {
            id: fueling.id,
            fueling_date: fueling.fueling_date,
            customerInfo: customerInfo,
            column_number: fueling.column_number,
            fuelInfo: fuelInfo,
            fuel_amount: fueling.fuel_amount,
            total_cost: fueling.total_cost,
            carInfo: carInfo,
          };
        }));
        setFuelings(fuelingsData);
      } catch (error) {
        console.error("Ошибка:", error);
      }
    };

    fetchData();
  }, []);

  const fetchCarInfo = async (carId) => {
    try {
      const response = await axios.get(`http://192.168.0.102:8000/api/car/${carId}/`);
      return response.data;
    } catch (error) {
      console.error("Ошибка при получении информации об автомобиле:", error);
      return null;
    }
  };

  const fetchCustomerInfo = async (customerId) => {
    try {
      const response = await axios.get(`http://192.168.0.102:8000/api/customer/${customerId}/`);
      return response.data;
    } catch (error) {
      console.error("Ошибка при получении информации о заказчике:", error);
      return null;
    }
  };

  const fetchFuelInfo = async (fuelId) => {
    try {
      const response = await axios.get(`http://192.168.0.102:8000/api/fueltype/${fuelId}/`);
      return response.data;
    } catch (error) {
      console.error("Ошибка при получении информации о топливе:", error);
      return null;
    }
  };

  const handlePrint = (fueling) => {
    const printWindow = window.open('', '_blank');
  
    if (printWindow) {
      const printContent = `
        <div style="font-family: Arial, sans-serif; padding: 10px; border: 1px solid #000;">
          <h2 style="text-align: center;">Заправка #${fueling.id}</h2>
          <p><strong>Дата:</strong> ${fueling.fueling_date}</p>
          <p><strong>Заказчик:</strong> ${fueling.customerInfo ? `${fueling.customerInfo.last_name} ${fueling.customerInfo.first_name}` : "Нет данных"}</p>
          <p><strong>Номер заправочной колонки:</strong> ${fueling.column_number}</p>
          <p><strong>Тип топлива:</strong> ${fueling.fuelInfo.fuel_type} (Октановое число ${fueling.fuelInfo.octane_rating})</p>
          <p><strong>Количество топлива:</strong> ${fueling.fuel_amount} литров</p>
          <p><strong>Общая стоимость:</strong> ${fueling.total_cost} Рублей</p>
          ${fueling.carInfo ? `<p><strong>Автомобиль:</strong> ${fueling.carInfo.model} ${fueling.carInfo.registration_number}</p>` : ''}
        </div>
      `;

      printWindow.document.open();
      printWindow.document.write(`
        <html>
          <head>
            <title>Print Document</title>
            <style>
              @media print {
                body {
                  font-family: Arial, sans-serif;
                }
                div {
                  padding: 10px;
                  border: 1px solid #000;
                }
                h2 {
                  text-align: center;
                }
                strong {
                  font-weight: bold;
                }
              }
            </style>
          </head>
          <body>
            ${printContent}
          </body>
        </html>
      `);
      printWindow.document.close();

      printWindow.print();
      printWindow.onafterprint = function () {
        printWindow.close();
      };
    } else {
      console.error('Failed to open print window.');
    };
  };

  return (
    <>
    <Header/>
    <main className={styles.main}>
      <section className={styles.blocks}>
        <article className={styles.fuelings}>
          {fuelings.map((fueling) => (
            <div key={fueling.id}>
              <article className={styles.block}>
                <header>
                  <h2>Заправка #{fueling.id}</h2>
                </header>
                <h3>Дата: {fueling.fueling_date}</h3>
                <p>Заказчик: {fueling.customerInfo ? `${fueling.customerInfo.last_name} ${fueling.customerInfo.first_name}` : "Нет данных"}</p>
                <p>Номер заправочной колонки: {fueling.column_number}</p>
                <p>Тип топлива: {fueling.fuelInfo.fuel_type} (Октановое число {fueling.fuelInfo.octane_rating})</p>
                <p>Количество топлива: {fueling.fuel_amount} литров</p>
                <h4>Общая стоимость: {fueling.total_cost} Рублей</h4>
                {fueling.carInfo && (
                  <div>
                    <p>Автомобиль: {`${fueling.carInfo.model}  ${fueling.carInfo.registration_number}`}</p>
                  </div>
                )}
              </article>
              <button onClick={() => handlePrint(fueling)}>Print to PDF</button>
            </div>
          ))}
        </article>
      </section>
    </main>
    </>
  );
};

export default Fuelings;
