import React from 'react'
import { Switch, Route, Redirect } from "react-router-dom"
import asyncComponents from "./utils/asyncComponents"
const Index = asyncComponents(() => import("./pages/Index/Index"))
const Playlist = asyncComponents(() => import("./pages/Playlist/Playlist"))
const Song = asyncComponents(() => import("./pages/Song/Song"))
export default function App() {
  return (
    <Switch>
      <Route path="/index" component={Index}></Route>
      <Route path="/playlist/:id" component={Playlist}></Route>
      <Route path="/playlist/:id" component={Playlist}></Route>
      <Route path="/song/:id" component={Song}></Route>
      <Redirect to="/index"></Redirect>
    </Switch>
  )
}