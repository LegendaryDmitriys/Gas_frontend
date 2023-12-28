import React, { useState } from "react";
import axios from "axios";

import styles from "./styles/import.module.css"


const ImportData = () => {
  const [file, setFile] = useState(null);
  const [tableName, setTableName] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleTableChange = (e) => {
    setTableName(e.target.value);
  };

  const handleImport = async () => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("table_name", tableName);

    try {
      await axios.post("http://192.168.0.102:8000/import-data/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert("Данные успешно импортированы");
    } catch (error) {
      console.error("Ошибка:", error);
      alert("Произошла ошибка при импорте данных");
    }
  };

  return (
    <div className={styles.div}>
      <input type="file" onChange={handleFileChange} className={styles.input}/>
      <select value={tableName} onChange={handleTableChange} className={styles.select}>
        <option value="">Выберите таблицу</option>
        <option value="brands">Brands</option>
        <option value="cars">Cars</option>
        <option value="customers">customers</option>
        <option value="fuelcolumns"> fuelcolumns</option>
      </select>
      <button onClick={handleImport} className={styles.btn}>Импорт</button>
    </div>
  );
};

export default ImportData;