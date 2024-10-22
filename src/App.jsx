import { useState } from 'react';
import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';

import LayOut from './Components/LayOut/LayOut';
import LogIn from './Components/LogIn/LogIn';
import Station from './Components/Station/Station';
import Dispenser from './Components/Dispenser/Dispenser';
import Compressor from './Components/Compressor/Compressor';
import Nozzle from './Components/Nozzle/Nozzle';
import Mapview from './Components/MapView/Mapview';
import ListView from './Components/ListView/ListView';
import DashboardGraph from './Components/DashboardGraph/DashboardGraph';
import StationFinance from './Components/StationFinance/StationFinance';
import StationAlarm from './Components/StationAlarm/StationAlarm';
import StationOperation from './Components/StationOperation/StationOperation';
import NewStation from './Components/NewStation/NewStation';
import NewNozzle from './Components/NewNozzle/NewNozzle';
import NewCompressor from './Components/NewCompressor/NewCompressor';
import NewDispenser from './Components/NewDispenser/NewDispenser';
import FinanceOperation from './Components/FinanceOperation/FinanceOperation';
import NotFound from './Components/NotFounded/NotFounded';

function App() {
  const [stationData, setStationData] = useState([]);
  const [dispenserData, setDispenserData] = useState([]);
  const [nozzleData, setNozzleData] = useState([]);
  const [compressorData, setCompressorData] = useState([]);

  const router = createBrowserRouter([
    {
      path: "",
      element: <LayOut />,
      children: [
        { index: true, element: <LogIn /> },
        { path: 'FinanceOperation', element: <FinanceOperation /> },
        { path: 'StationAlarm', element: <StationAlarm /> },
        { path: 'DashboardGraph', element: <DashboardGraph /> },
        { path: 'ListView', element: <ListView /> },
        { path: 'Mapview', element: <Mapview /> },
        { path: "Station", element: <Station data={stationData} setData={setStationData} /> },
        { path: "Dispenser", element: <Dispenser data={dispenserData} setData={setDispenserData} /> },
        { path: "Compressor", element: <Compressor data={compressorData} setData={setCompressorData} /> },
        { path: "NewStation", element: <NewStation data={stationData} setData={setStationData} /> },
        { path: "NewCompressor", element: <NewCompressor data={compressorData} setData={setCompressorData} /> },
        { path: 'NewNozzle', element: <NewNozzle data={nozzleData} setData={setNozzleData} /> },
        { path: 'NewDispenser', element: <NewDispenser data={dispenserData} setData={setDispenserData} /> },
        { path: "Nozzle", element: <Nozzle data={nozzleData} setData={setNozzleData} /> },
        { path: '*', element: <NotFound /> },
      ],
    },
  ]);

  return (
    <AuthProvider>
      <RouterProvider router={router}></RouterProvider>
    </AuthProvider>
  );
}

export default App;
