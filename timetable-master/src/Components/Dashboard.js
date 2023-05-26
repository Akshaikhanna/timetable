import axios from "axios";
import React, { useEffect, useState } from "react";
import Navi from "./Navi";
import { url } from "../App";
import { useNavigate } from "react-router-dom";
function Dashboard() {
  let navigate = useNavigate();
  const [Data, setData] = useState([]);
  useEffect(() => {
    getData();
  }, []);
  async function getData() {
    try {
      let result = await axios.get(`${url}/timetable`, {
      });
      if (result.data.statusCode === 200) {
        setData(result.data.tableData);
      }
      if (result.data.statusCode === 400) {
        navigate("/login");
      }
      if (result.data.statusCode === 404) {
        console.log(result.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <Navi />
      <div className="container-div">
        <table className="table table-bordered table-striped">
          <thead>
            <tr className="text-center">
              <th scope="col"  >
                DAY/PERIOD
                <br />
                (TIME)
              </th>
              <th scope="col" className="table-head" >
                1<br />
                (9:00-9:50)
              </th>
              <th scope="col" className="table-head" >
                2<br />
                (9:50-10:40)
              </th>
              <th scope="col"  >
                Break
                <br />
                (10:40-11:00)
              </th>
              <th scope="col" className="table-head" >
                3<br />
                (11:00-11:50)
              </th>
              <th scope="col" className="table-head" >
                4<br />
                (11:50-12:40)
              </th>
              <th scope="col"  >
                Lunch
                <br />
                (12:40-1:40)
              </th>
              <th scope="col" className="table-head" >
                5<br />
                (1:40-2:30)
              </th>
              <th scope="col" className="table-head" >
                6<br />
                (2:30-3:20)
              </th>
              <th scope="col"  >
                Break
                <br />
                (3:20-3:35)
              </th>
              <th scope="col" className="table-head" >
                7<br />
                (3:35-4:25)
              </th>
              <th scope="col" className="table-head" >
                8<br />
                (4:25-4:55)
              </th>
            </tr>
          </thead>
          <tbody>
            {Data &&
              Data.map((data, index) => {
                return (
                  <>
                    <tr className="text-center" key={index}>
                      <th scope="row" className="days">{data.day}</th>
                      <th scope="row">{data.periods[0]}</th>
                      <th scope="row">{data.periods[1]}</th>
                      <th scope="row"></th>
                      <th scope="row">{data.periods[2]}</th>
                      <th scope="row">{data.periods[3]}</th>
                      <th scope="row"></th>
                      <th scope="row">{data.periods[4]}</th>
                      <th scope="row">{data.periods[5]}</th>
                      <th scope="row"></th>
                      <th scope="row">{data.periods[6]}</th>
                      <th scope="row">{data.periods[7]}</th>
                    </tr>
                  </>
                );
              })}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Dashboard;
