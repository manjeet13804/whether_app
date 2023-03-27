import './App.css';
import searchIcon from "./images/search.png";
import { useEffect, useLayoutEffect, useState } from 'react';
import { BrowserRouter } from "react-router-dom"
function App() {
  const [searchValue, setSearchValue] = useState("")
  const [data, setData] = useState([])
  const [vehicleType, setVehiclType] = useState("")
  const [popup,setPopup] = useState(-1);
  useLayoutEffect(() => {
    fetch("https://vpic.nhtsa.dot.gov/api/vehicles/getallmanufacturers?format=json")
      .then(response => response.json())
      .then(alldata => setData(alldata.Results))

  }, [])

  const [filtereddata, setFiltereddata] = useState([])
  useEffect(()=>{
    setFiltereddata(data.filter(name =>
      {  if(name.Mfr_CommonName!=""){

        if(name.Mfr_CommonName==(searchValue) ){
          return name;
        }}
        if(name.VehicleTypes.length !=0){
          if(name.VehicleTypes[0].Name==vehicleType){
            return name;
          }
        }
       
      }
    
    ));
    console.log(filtereddata)
  },[searchValue,vehicleType])
  
 const ShowAlert=()=>{
console.log(data[popup])
setPopup(-1);
 }
  return (
    <>
      <header className="head">
        <h1>VEHICLE MENUFACTUTERS</h1>
      </header>
      <section className='search-container'>
        <div className='left-search'>
          <span className="search">Search: </span>
          <span><input type="search" className="search" value={searchValue} onChange={(e) => { setSearchValue(e.target.value) }} /></span>
          {/* <button className='search-icon' onClick={() => searchData()}>
            <img src={searchIcon} alt="search" />
          </button> */}
        </div>
        <div className='right-search'>
          <span className="search">Filter by Vehicle Type </span>
          <span>
            <select name="Vehicle type" className='vehicle-type' onChange={(e) => setVehiclType(e.target.value)} value={vehicleType} >
              <option >All</option>
              <option >Passenger Car</option>
              <option >Truck</option>
              <option >Multipurpose Passenger Vehicle (MPV)</option>
              <option >Motorcycle</option>
              <option>Trailer</option>
              <option>Low Speed Vehicle (SLV)</option>
              <option>Off Road Vehicle</option>
              <option>Bus</option>
              <option>Incomplete Vehicle</option>
            </select>
          </span>
        </div>
      </section>
      {/* {console.log(data)} */}
      <section className='main-data'>
        <table className='data-header'>
          <thead>
            <th>Name</th>
            <th>Country</th>
            <th>Type</th>
          </thead>
          {
            filtereddata.length !=0 ?
            filtereddata.map((item,i)=>{
              
              return<>
              <div  onClick={() => setPopup(i)}>
              <tr >
              <td>{item.Mfr_CommonName}</td>
              <td>{item.Country}</td>
              {item.VehicleTypes.length !=0 ?<td>{item.VehicleTypes[0].Name}</td> :<td></td>}
              {/* {console.log(item.VehicleTypes)} */}
            </tr>
              </div>
            
              </>
            })
            :data.map((item,i)=>{
              
              return<>
              <div  onClick={() => setPopup(i)}>
              <tr >
              <td>{item.Mfr_CommonName}</td>
              <td>{item.Country}</td>
              {item.VehicleTypes.length !=0 ?<td>{item.VehicleTypes[0].Name}</td> :<td></td>}
              {/* {console.log(item.VehicleTypes)} */}
            </tr>
              </div>
            
              </>
            })
          }
           
        </table>
        {popup != -1 &&  <div>{alert(data[popup].Mfr_Name,data[popup].Country,data[popup].Mfr_CommonName)
        }</div>}
      </section>
    </>
  );
}

export default App;



//   <div className="modal" tabIndex="-1" role="dialog">
      //   <div className="modal-dialog" role="document">
      //     <div className="modal-content">
      //       <div className="modal-header">
      //         <h5 className="modal-title">Modal title</h5>
      //         <button type="button" className="close" data-dismiss="modal" aria-label="Close">
      //           <span aria-hidden="true">&times;</span>
      //         </button>
      //       </div>
      //       <div className="modal-body">
      //         <p>hlo</p>
      //       </div>
      //       <div className="modal-footer">
      //         <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
      //       </div>
      //     </div>
      //   </div>
      // </div>
      //   }
