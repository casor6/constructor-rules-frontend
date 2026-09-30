import React, { useState, useEffect } from 'react';
import { Button } from 'primereact/button';
import RulesTable from './components/RulesTable';
import './App.css'

function App() {

  return (
    <>
      <div className="flex flex-column align-items-center pt-5 gap-3">

        <Button label="Agregar Regla" className="h-1rem bg-primary font-bold border-round" />
        <RulesTable />
      </div>
    </>
  )
}

export default App
